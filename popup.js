document.addEventListener('DOMContentLoaded', function () {
    var dropdown = document.getElementById('dropdown');
    var textbox = document.getElementById('textbox');
    var loginButton = document.getElementById('loginButton');
    dropdown.addEventListener('change', function (event) {
        var selectedValue = event.target.value;
        textbox.value = "You selected: ".concat(selectedValue);
    });
    loginButton.addEventListener('click', function () {
        chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError);
                return;
            }
            // Use the token to fetch user's Google profile
            fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data); // This will log user's Google profile information
                // Here, you can update the UI to show the user's name, email, or profile picture.
            })
                .catch(function (error) {
                console.error('Error fetching user data:', error);
            });
        });
    });
});
