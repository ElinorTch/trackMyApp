() => {
  console.log("Content script loaded");
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { type, jobId } = message;

    if (type === "job") {
      currentJobId = jobId;
      getJobDetails();
    }
  });

  const getJobDetails = () => {
    console.log("Fetching job details...");
  };
};
