document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector(".form-email");
    const passwordInput = document.querySelector(".form-password");
    const loginBtn = document.querySelector(".btn-log");
    const msg = document.querySelector(".msg");

    loginBtn.addEventListener("click", function () {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (isValidEmail(email) && isValidPassword(password)) {
            displayMessage("Login successful!", "green");
        } else {
            displayMessage(
                "Invalid email or password. Please try again.",
                "red"
            );

            emailInput.value = "";
            passwordInput.value = "";
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPassword(password) {
        return password.length >= 8;
    }

    function displayMessage(message, color) {
        msg.textContent = message;
        msg.style.color = color;

        setTimeout(function () {
            msg.textContent = "";
        }, 3000);
    }
});
