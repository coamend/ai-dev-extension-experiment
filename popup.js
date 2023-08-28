document.addEventListener('DOMContentLoaded', () => {
  var dropdown = document.getElementById('dropdown');
    var textbox = document.getElementById('textbox');
    var loginButton = document.getElementById('loginButton');
    dropdown.addEventListener('change', (event) => {
  var selectedValue = event.target.value;
        textbox.value = "You selected: ".concat(selectedValue);
});
    loginButton.addEventListener('click', () => {
  chrome.identity.getAuthToken({ 'interactive': true }, (token) => {
  if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError);
                return;
            }
            // Use the token to fetch user's Google profile
            fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token)
                .then((response) => {
  return response.json();
})
                .then((data) => {
  console.log(data);
})
                .catch((error) => {
  console.error('Error fetching user data:', error);
});
});
});
});
