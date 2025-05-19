chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, jobId, jobUrl } = message;

  if (type === "job") {
    const jobInfo = getLinkedinJobDetails(jobId, jobUrl);
    console.log("Job Info:", jobInfo);
    saveJobToDatabase(jobInfo);
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

const saveJobToDatabase = (jobInfo) => {
  // Let us open our database
  const request = window.indexedDB.open("JobsDatabase", 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    // Create an objectStore to hold information about our customers. We're
    // going to use "ssn" as our key path because it's guaranteed to be
    // unique - or at least that's what I was told during the kickoff meeting.
    const objectStore = db.createObjectStore("jobs", { keyPath: "id" });

    // Create an index to search customers by name. We may have duplicates
    // so we can't use a unique index.
    objectStore.createIndex("company", "company", { unique: false });

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = (event) => {
      // Store values in the newly created objectStore.
      const jobObjectStore = db
        .transaction("jobs", "readwrite")
        .objectStore("jobs");
      jobInfo.forEach((job) => {
        jobObjectStore.add(job);
      });
    };
  };

  request.onsuccess = (event) => {
    db = event.target.result;

    const transaction = db.transaction(["jobs"], "readwrite");
    const objectStore = transaction.objectStore("jobs");
    // jobData.forEach((job) => {
    const request = objectStore.add(jobInfo);
    request.onsuccess = (event) => {
      // event.target.result === customer.ssn;
      console.log("Job added to the database:", event.target.result);
    };

    const getAll = objectStore.getAll();
    console.log("All jobs in the database:", getAll);
    // });
  };
};
