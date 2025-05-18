chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("linkedin.com")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParams = new URLSearchParams(queryParameters);
    console.log("UrlSearchParams", urlParams);

    chrome.tabs.sendMessage(tabId, {
      type: "job",
      jobId: urlParams.get("currentJobId"),
    })
  }
});