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
