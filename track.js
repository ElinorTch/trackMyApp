chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "OPEN_AUTH") {
    chrome.tabs.create({ url: "https://oauth.html" });
  }
});

const loadDataButton = document.getElementById("loadData");
const output = document.getElementById("output");

loadDataButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "getSheetData" }, (response) => {
    if (response.success) {
      output.textContent = JSON.stringify(response.data, null, 2);
    } else {
      output.textContent = "Error: " + response.error;
    }
  });
});
