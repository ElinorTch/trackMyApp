authButton = document.getElementById('auth-button');
authButton.addEventListener('click', async () => {
  // chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const authUrl = 'http://localhost:3001/google/auth';

  chrome.windows.create({
    url: authUrl,
    type: 'popup',
    width: 500,
    height: 600
  }, (win) => {
    console.log('Popup auth window opened', win.id);
  });

});
// });