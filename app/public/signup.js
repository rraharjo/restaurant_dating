const signupForm = document.querySelector('form');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirmPassword');
const signupButton = document.getElementById('signupButton');

const errorMessage = document.createElement('p');
errorMessage.className = 'error-message';
signupForm.appendChild(errorMessage);

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    errorMessage.textContent = '';

    const username = usernameField.value.trim();
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    if (!username || !password || !confirmPassword) {
        errorMessage.textContent = 'Please fill in all fields.';
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    const data = { username, password };

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            window.location.href = 'login.html';
        } else {
            errorMessage.textContent = result.message || 'An error occurred';
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred';
    }
});
