chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "START_AUTH") {
    chrome.tabs.create({
      url: "localhost:3001/google/auth",
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("linkedin.com")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParams = new URLSearchParams(queryParameters);

    if (changeInfo.status === "complete") {
      chrome.tabs.sendMessage(tabId, {
        type: "job",
        jobId: urlParams.get("currentJobId"),
        jobUrl: tab.url,
      });
    }
  }
});
