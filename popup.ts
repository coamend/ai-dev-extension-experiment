document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('dropdown') as HTMLSelectElement;
    const textbox = document.getElementById('textbox') as HTMLTextAreaElement;
    const loginButton = document.getElementById('loginButton') as HTMLButtonElement;

    dropdown.addEventListener('change', (event) => {
        const selectedValue = (event.target as HTMLSelectElement).value;
        textbox.value = `You selected: ${selectedValue}`;
    });

    loginButton.addEventListener('click', () => {
        chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
            if (chrome.runtime.lastError) {
                showError('Error getting auth token');
                return;
            }
            // Use the token to fetch user's Google profile
            fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token)
            .then(response => response.json())
            .then(data => {
                console.log(data); // This will log user's Google profile information
                // Here, you can update the UI to show the user's name, email, or profile picture.
            })
            .catch(error => {
                showError('Error fetching user data: ' + error);
            });
        });
    });
});

function showError(message) {

    const errorEl = document.createElement('div');
    errorEl.textContent = message;
    errorEl.classList.add('error');
  
    document.body.appendChild(errorEl);
}
