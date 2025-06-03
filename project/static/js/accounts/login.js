document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.getElementById('id_username');
    const passwordInput = document.getElementById('id_password');
    const loginButton = document.querySelector('.login-button');

    function updateLoginButtonState() {
        const isFilled = usernameInput.value.trim() !== '' && passwordInput.value.trim() !== '';
        loginButton.disabled = !isFilled;
        loginButton.classList.toggle('active', isFilled);
    }

    usernameInput.addEventListener('input', updateLoginButtonState);
    passwordInput.addEventListener('input', updateLoginButtonState);

    updateLoginButtonState();
});
