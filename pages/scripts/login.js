document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.querySelector(".form-name");
    const emailInput = document.querySelector(".form-email");
    const passwordInput = document.querySelector(".form-password");
    const confirmPasswordInput = document.querySelector(
        ".form-confirm-password"
    );
    const loginBtn = document.querySelector(".btn-log");
    const registerBtn = document.querySelector(".btn-reg");
    const msg = document.querySelector(".msg");

    loginBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        resetForm();

        if (email !== "" && password !== "") {
            checkForErrors(email);
        } else {
            displayMessage("Please enter the required fields*", "red");
            if (email === "") {
                emailInput.classList.add("form-field-error");
            }
            if (password === "") {
                passwordInput.classList.add("form-field-error");
            }
        }
    });

    function checkForErrors(email) {
        if (!isValidEmail(email)) {
            displayMessage(
                "Invalid email or password. Please try again.",
                "red"
            );
        }
    }

    function isValidEmail(email) {
        const emailRange =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRange.test(email);
    }

    function displayMessage(message, color) {
        msg.textContent = message;
        msg.style.color = color;
    }

    function resetForm() {
        msg.textContent = "";
        emailInput.value = "";
        passwordInput.value = "";
        emailInput.classList.remove("form-field-error");
        passwordInput.classList.remove("form-field-error");
    }
});
