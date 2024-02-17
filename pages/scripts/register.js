const BACKEND_URL = "https://jobtrackr-hicn.onrender.com";

document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.querySelector(".form-name");
    const emailInput = document.querySelector(".form-email");
    const passwordInput = document.querySelector(".form-password");
    const confirmPasswordInput = document.querySelector(
        ".form-confirm-password"
    );
    const registerBtn = document.querySelector(".btn-reg");
    const msg = document.querySelector(".msg");
    const spinner = document.querySelector(".spinner-container");


    registerBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        spinner.classList.remove("d-none");
        displayMessage("Please wait while the server processes your request", "grey");

        if (isValidForm(name, email, password, confirmPassword)) {
            const formData = {
                name: name,
                email: email,
                password: password,
            };

            fetch(`${BACKEND_URL}/api/v1/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("OK");
                        return response.json();
                    } else if (response.status == 422) {
                        throw new Error("User with this email already exists!");
                    } else {
                        throw new Error(
                            "Something went wrong. Try again later!",
                            "red"
                        );
                    }
                })
                .then((data) => {
                    spinner.classList.add("d-none");
                    displayMessage("User created!", "green"); // Temporary success message
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("name", data.user.name);
                    window.location.href =
                        "/pages/protected-pages/dashboard.html";
                })
                .catch((error) => {
                    spinner.classList.add("d-none");
                    displayMessage(error.message, "red");
                });
        }
    });

    function isValidForm(name, email, password, confirmPassword) {
        resetForm();

        if (
            name !== "" &&
            email !== "" &&
            password !== "" &&
            confirmPassword !== ""
        ) {
            if (checkForErrors(email, password, confirmPassword)) {
                return false;
            } else {
                return true;
            }
        } else {
            displayMessage("Please enter the required fields*", "red");
            if (name === "") {
                nameInput.classList.add("form-field-error");
            }

            if (email === "") {
                emailInput.classList.add("form-field-error");
            }

            if (password === "") {
                passwordInput.classList.add("form-field-error");
            }

            if (confirmPassword === "") {
                confirmPasswordInput.classList.add("form-field-error");
            }
            return false;
        }
    }

    function checkForErrors(email, password, confirmPassword) {
        if (!isValidEmail(email)) {
            displayMessage("Invalid email format");
            return true;
        }

        if (!isValidPassword(password, confirmPassword)) {
            return true;
        }
    }

    function isValidEmail(email) {
        const emailRange =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRange.test(email);
    }

    function isValidPassword(password, confirmPassword) {
        const passwordValidator = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (password !== confirmPassword) {
            displayMessage("Passwords do not match!", "red");
            return false;
        }

        if (passwordValidator.test(password)) {
            if (password === confirmPassword) {
                return true;
            }
        } else {
            displayMessage(
                "Your password must be at least eight characters long and contain one upper case letter and a number.",
                "red"
            );
            return false;
        }
    }

    function displayMessage(message, color) {
        msg.textContent = message;
        msg.style.color = color;
    }

    function resetForm() {
        msg.textContent = "";
        passwordInput.value = "";
        confirmPasswordInput.value = "";
        nameInput.classList.remove("form-field-error");
        emailInput.classList.remove("form-field-error");
        passwordInput.classList.remove("form-field-error");
        confirmPasswordInput.classList.remove("form-field-error");
    }

    const setloading = () => {
        loading.classList.toggle("show");
    };
});
