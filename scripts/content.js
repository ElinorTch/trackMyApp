chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);
  sendResponse({ success: true, company: "Elinor" });
});