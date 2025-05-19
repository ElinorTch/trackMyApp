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

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

async function getAccessTokenInteractive() {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve(token);
    });
  });
}

async function fetchSheetData(token) {
  const spreadsheetId = "1oHMdFVrQB-CJGmX0UHAiotTnuHgGHA3GGgrWidcOFGE";
  const range = "Sheet1!A1:E10";

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSheetData") {
    getAccessTokenInteractive()
      .then((token) => fetchSheetData(token))
      .then((data) => sendResponse({ success: true, data }))
      .catch((error) => sendResponse({ success: false, error: error.message }));
    return true; // Indique que la réponse sera asynchrone
  }
});
