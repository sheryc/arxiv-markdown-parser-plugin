console.log("[DEBUG] contentScript.js loaded!");

async function parseArxiv(arxivId, removeRefs = false, removeTable = false) {
  const url = `https://arxiv.org/html/${arxivId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch arxiv HTML for ${arxivId}. Status: ${response.status}`);
  }
  const htmlText = await response.text();

  // parse into DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");

  // replace <math> with inline $...$
  convertAllMathMLtoLatex(doc);

  // fix tabular tables
  fixTabularTables(doc);

  // setup Turndown with GFM plugin
  const turndownService = new TurndownService();
  turndownService.use(turndownPluginGfm.gfm);

  // turn LaTeX equation tables into $$ block equations $$
  turndownService.addRule("latexEquationTables", {
    filter: function (node) {
      if (node.nodeName === "TABLE") {
        const cls = node.getAttribute("class") || "";
        // If it has ltx_tabular, we do NOT treat it as an equation
        if (/\bltx_tabular\b/.test(cls)) return false;
        // If it has ltx_equationgroup, ltx_eqn_align, or ltx_eqn_table => treat as block equation
        return /ltx_equationgroup|ltx_eqn_align|ltx_eqn_table/.test(cls);
      }
      return false;
    },
    replacement: function (content, node) {
      // We'll use the node's textContent as the equation text
      let eqnText = node.textContent.trim();
      // Collapse multiple spaces/newlines into a single space
      eqnText = eqnText.replace(/\s+/g, " ");
      return `$$ ${eqnText} $$`;
    },
  });

  // convert the DOM to md
  let markdown = turndownService.turndown(doc.documentElement.innerHTML);

  // reformat paragraphs vs. table lines
  markdown = removeLineBreaksOutsideTables(markdown);

  // unescape double backslashes for correct LaTeX
  markdown = unescapeDoubleBackslashes(markdown);

  if (removeRefs) {
    markdown = removeReferences(markdown);
  }

  if (removeTable) {
    markdown = removeContentTable(markdown);
  }
  
  return markdown;
}

function removeAllAttributes(elem) {
  // Repeatedly remove the first attribute until none remain
  while (elem.attributes && elem.attributes.length > 0) {
    elem.removeAttribute(elem.attributes[0].name);
  }
}

function fixTabularTables(root) {
  // Select all <table> elements that have class="ltx_tabular"
  const tables = root.querySelectorAll("table.ltx_tabular");
  tables.forEach((table) => {
    removeAllAttributes(table);

    table.querySelectorAll("tbody, thead, tfoot, tr, td, th").forEach((el) => {
      removeAllAttributes(el);
    });
  });
}

function convertAllMathMLtoLatex(root) {
  const mathElements = root.querySelectorAll("math");
  mathElements.forEach((math) => {
    const annotation = math.querySelector('annotation[encoding="application/x-tex"]');
    if (annotation && annotation.textContent) {
      const latexSource = annotation.textContent.trim();
      math.replaceWith(`$${latexSource}$`);
    } else {
      math.replaceWith(math.textContent);
    }
  });
}

function removeReferences(markdown) {
  const refMarkers = ["References ----------", "###### References"];
  const paragraphs = markdown.split("\n\n");

  const refIndex = paragraphs.findIndex(para =>
    refMarkers.some(marker => para.includes(marker))
  );

  if (refIndex === -1) {
    return markdown;
  }

  paragraphs.splice(refIndex, 1);

  if (refIndex < paragraphs.length) {
    paragraphs.splice(refIndex, 1);
  }

  return paragraphs.join("\n\n");
}

function removeLineBreaksOutsideTables(markdown) {
  let blocks = markdown.split(/\n\s*\n/);

  const processedBlocks = blocks.map((block) => {
    const lines = block.split("\n");
    const firstNonBlank = lines.find((l) => l.trim().length > 0);
    if (firstNonBlank && firstNonBlank.trim().startsWith("|")) {
      return lines.join("\n");
    } else {
      return lines.map((l) => l.trim()).join(" ");
    }
  });

  return processedBlocks.join("\n\n");
}

function unescapeDoubleBackslashes(text) {
  let old;
  do {
    old = text;
    text = text.replace(/\\\\/g, "\\");
  } while (text !== old);
  return text;
}

function removeContentTable(markdown) {
  const paragraphs = markdown.split("\n\n");
  if (paragraphs.length > 2) {
    // Remove the first 2 paragraphs (title + content table)
    paragraphs.splice(0, 2);
  }
  return paragraphs.join("\n\n");
}

function removeLastTwoLines(markdown) {
  const lines = markdown.split("\n");
  if (lines.length > 2) {
    lines.splice(-2, 2);
  }
  return lines.join("\n");
}

(function () {
  const arxivId = extractArxivId(window.location.href);

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getMarkdown") {
      if (!arxivId) {
        sendResponse({
          success: false,
          markdown: "",
          error: "No arXiv ID detected on this page.",
        });
        return true;
      }

      parseArxiv(arxivId, request.removeRefs)
        .then((md) => {
          let finalMD = md;
          finalMD = removeLastTwoLines(finalMD);
          if (request.removeTable) {
            finalMD = removeContentTable(finalMD);
          }
          sendResponse({ success: true, markdown: finalMD });
        })
        .catch((err) => {
          sendResponse({ success: false, markdown: "", error: err.toString() });
        });

      return true; // async
    }
  });

  function extractArxivId(url) {
    const match = url.match(/arxiv\.org\/(abs|pdf|html)\/([^?#]+)/);
    if (!match) return null;
    let id = match[2];
    id = id.replace(/\.pdf$/, "");
    id = id.replace(/v\d+$/, "");
    return id;
  }
})();
