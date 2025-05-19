chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, jobId, jobUrl } = message;

  if (type === "job") {
    const jobInfo = getLinkedinJobDetails(jobId, jobUrl);
    console.log("Job Info:", jobInfo);
  }
});

const getLinkedinJobDetails = (jobId, jobURL) => {
  const companyElement = document.querySelector(
    ".job-details-jobs-unified-top-card__company-name a"
  );
  const jobTitleElement = document.querySelector(
    ".job-details-jobs-unified-top-card__job-title"
  );

  const companyName = companyElement?.textContent?.trim();
  const jobTitle = jobTitleElement?.textContent?.trim();
  const appliedDate = new Date().toISOString();
  const lastUpdated = new Date().toISOString();

  return {
    id: jobId,
    url: jobURL,
    company: companyName,
    title: jobTitle,
    status: "applied",
    source: "linkedIn",
    appliedDate,
    lastUpdated,
  };
};

const saveJobToDatabase = (jobInfo) => {};
