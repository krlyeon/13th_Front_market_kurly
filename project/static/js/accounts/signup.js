document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const password2Input = document.getElementById('password2');
    const submitBtn = document.querySelector('.submit');
    const errorMessage = document.getElementById('password-mismatch');

    let validation = {
        username: false,
        password: false,
        passwordMatch: false,
        passwordFormat: false
    };

    function validatePasswordFormat(password) {
        const hasLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[@!?\-_]/.test(password);

        return hasLength && hasUpper && hasLower && hasNumber && hasSpecial;
    }
    
    function updateSubmitButton() {
        const allValid = Object.values(validation).every(v => v);
        submitBtn.classList.toggle('active', allValid);
        submitBtn.disabled = !allValid;
    }

    usernameInput.addEventListener('input', function () {
        validation.username = this.value.length > 0;
        updateSubmitButton();
    });

    passwordInput.addEventListener('input', function () {
        validation.password = this.value.length > 0;
        validation.passwordFormat = validatePasswordFormat(this.value);

        if (password2Input.value) {
            checkPasswordMatch();
        }

        updateSubmitButton();
    });

    password2Input.addEventListener('input', function () {
        checkPasswordMatch();
        updateSubmitButton();
    });

    function checkPasswordMatch() {
        const password1Value = passwordInput.value;
        const password2Value = password2Input.value;

        if (password2Value.length > 0) {
            if (password1Value === password2Value) {
                validation.passwordMatch = true;
                errorMessage.classList.remove('show');
            } else {
                validation.passwordMatch = false;
                errorMessage.classList.add('show');
            }
        } else {
            validation.passwordMatch = false;
            errorMessage.classList.remove('show');
        }
    }
});