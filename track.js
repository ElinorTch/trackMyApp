document.getElementById('login').addEventListener('click', function () {
  chrome.runtime.sendMessage({ type: "START_AUTH" }, (response) => {
    if (response?.token) {
      console.log("Token reçu :", response.token);
    } else {
      console.error("Erreur d'auth:", response?.error);
    }
  });
});

window.onload = function () {
  if (localStorage.getItem("accessToken")) {
    document.getElementById('signin-button').style.display = 'none';
    document.getElementById('signout-button').style.display = 'block';
    document.getElementById('signout-button').addEventListener('click', function () {
      localStorage.removeItem("accessToken");
    });
  } else {
    document.getElementById('signin-button').style.display = 'block';
    document.getElementById('signout-button').style.display = 'none';
    document.getElementById('signin-button').addEventListener('click', function () {
      chrome.identity.getAuthToken({ interactive: true }, function (token) {
        localStorage.setItem("accessToken", token);
      });
    });
  }
};
