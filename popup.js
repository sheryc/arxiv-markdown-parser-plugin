document.addEventListener("DOMContentLoaded", function () {
  const convertBtn = document.getElementById("convertBtn");
  const markdownOutput = document.getElementById("markdownOutput");
  const errorDiv = document.getElementById("error");

  convertBtn.addEventListener("click", function () {
    errorDiv.textContent = "";
    markdownOutput.value = "Loading...";

    const removeTable = document.getElementById("removeTable").checked;
    const removeRefs = document.getElementById("removeRefs").checked;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs || !tabs.length) {
        errorDiv.textContent = "No active tab found.";
        return;
      }
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(
        activeTab.id,
        {
          action: "getMarkdown",
          removeTable: removeTable,
          removeRefs: removeRefs
        },
        function (response) {
          if (!response) {
            errorDiv.textContent =
              "No response (are you sure this is an arXiv page?)";
            markdownOutput.value = "";
            return;
          }
          if (response.success) {
            markdownOutput.value = response.markdown;
          } else {
            errorDiv.textContent = response.error || "Unknown error";
            markdownOutput.value = "";
          }
        }
      );
    });
  });
});
