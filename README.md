# ArXiv Markdown Parser - Chrome / Edge Extension

![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/pgklmbjeooblkfcgbibhkjpbbhoabbbo) ![GitHub License](https://img.shields.io/github/license/sheryc/arxiv-markdown-parser-plugin) ![GitHub Repo stars](https://img.shields.io/github/stars/sheryc/arxiv-markdown-parser-plugin) < Please leave a 🌟 if you find this plugin useful :D

**🔥 Update: The plugin is now live on Chrome Web Store: [Chrome Web Store Link](https://chromewebstore.google.com/detail/arxiv-markdown-parser/pgklmbjeooblkfcgbibhkjpbbhoabbbo)**

**Turn ArXiv Papers into Markdown with One Click**

Are you tired of wrestling with PDFs when you need to analyze or excerpt research papers? In the age of LLMs, having clean, accessible text is more important than ever. The ArXiv Markdown Parser Chrome extension is built to streamline your research workflow by converting arXiv papers into clean, readable Markdown with a single click.

> Note: Currently the extension only supports papers with an HTML version. Most of the new papers have an HTML version but some are not. [It's a beta feature of ArXiv](https://info.arxiv.org/about/accessible_HTML.html) and more papers will be supported in the future.

## Table of Contents

- [ArXiv Markdown Parser - Chrome / Edge Extension](#arxiv-markdown-parser---chrome--edge-extension)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Why Markdown Matters](#why-markdown-matters)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Overview

The ArXiv Markdown Parser is designed to simplify the process of extracting content from arXiv papers. Whether you're conducting literature reviews, performing detailed analyses, or integrating research into LLM workflows, this extension helps you bypass the cumbersome process of PDF extraction. Instead, it converts the entire paper—including equations, tables, figures, and internal references—into well-structured Markdown, making it easier to read, share, and annotate.

### Why Markdown Matters

- **LLM Integration:** Markdown text is much easier to feed into LLMs like ChatGPT. By bypassing the messy PDF extraction process, you ensure that models receive clean, structured input—ideal for summarization, translation, or analysis.
- **Fast Table & Equation Copying:** Research papers often contain complex tables and equations. Converting to Markdown allows you to quickly copy and paste these elements into your notes or LLM prompts without formatting issues.
- **Seamless Collaboration:** Markdown is one of the most popular formats for academic and technical documentation. Its compatibility with version control systems (like Git) makes it perfect for group research settings, collaborative wikis, or shared repositories.

## Features

- **One-Click Conversion:** Simply open any arXiv paper (abs, pdf, or html) and click the extension icon to instantly convert the content into Markdown.
- **Customizable Output:** Choose whether to include a table of contents and references in your Markdown output.
- **Enhanced Research Workflow:** Quickly extract and organize key components of research papers for rapid summarization, annotation, or further analysis.
- **Improved Equation Handling:** Easily obtain LaTeX or Markdown versions of equations for use in your notes, presentations, or LLM prompts.

## Installation

### Through Chrome Web Store

The extension is live on [Chrome Web Store](https://chromewebstore.google.com/detail/arxiv-markdown-parser/pgklmbjeooblkfcgbibhkjpbbhoabbbo). I recommend installing from here if you're using Chrome or Edge.

### Manual Installation

#### Prerequisites

- [Google Chrome](https://www.google.com/chrome/) or any Chromium-based browser.

#### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/sheryc/arxiv-markdown-parser-plugin.git
   ```

   or alternatively, download the zip or tarball file in the latest release and unzip it.

2. **Load the Extension in Chrome:**

   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer Mode** (toggle in the top-right corner).
   - Click **Load unpacked** and select the directory where you cloned the repository or unzipped the zipfile / tarball.

3. **Installation Complete:**  
   The extension should now appear in your Chrome toolbar. You are ready to convert arXiv papers into Markdown with a single click.

## Usage

1. **Open an arXiv Paper:**  
   Navigate to any arXiv paper page (abstract, PDF, or HTML view).

2. **Activate the Extension:**  
   Click on the ArXiv Markdown Parser icon in your browser toolbar.

3. **Configure Output Options:**  
   Choose whether you want to include a table of contents and references in the generated Markdown.

4. **Get Your Markdown:**  
   The extension will instantly convert the paper into Markdown format, including all equations, tables, figures, and internal references as links.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **LaTeXML** and **Turndown** for powering the conversion process.

*Happy Researching!* (=・ω・=)
