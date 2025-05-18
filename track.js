document.getElementById("track-button").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log("Tab URL:", tab.url);

  const response = await chrome.tabs.sendMessage(tab.id, { action: "track-job" });
  console.log("Status Code:", response);
});