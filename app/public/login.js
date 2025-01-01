const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('nameField').value.trim();
    const password = document.getElementById('passField').value;

    errorMessage.textContent = '';

    if (!username || !password) {
        errorMessage.textContent = 'Please enter your username and password.';
        return;
    }

    const data = { username, password };

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            window.location.href = '/create.html';
        } else {
            errorMessage.textContent = result.message;
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred';
    }
});
