import { scrapeLinkedIn } from "./scrapeLinkedIn.js";

document.addEventListener("DOMContentLoaded", function () {
  const trackButton = document.getElementById("track-button");
  trackButton?.addEventListener("click", async () => {
    // Get the current active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    // Check if the current tab is a LinkedIn page
    // and call the scrape function associated with it
    if (tab.url.includes("linkedin.com")) {
      return scrapeLinkedIn();
    } else {
      return;
    }
  });
});
