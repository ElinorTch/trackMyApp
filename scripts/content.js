(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { type, jobId } = message;

    if (type === "job") {
    }
  })
});
