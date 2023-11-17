const BACKEND_URL = "https://jobtrackr-hicn.onrender.com";

document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector(".form-email");
    const passwordInput = document.querySelector(".form-password");
    const loginBtn = document.querySelector(".btn-log");
    const msg = document.querySelector(".msg");
    const spinner = document.querySelector(".spinner-container");

    const body = document.body;

    loginBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        spinner.classList.remove("d-none");
        displayMessage("Please wait while the server processes your request", "grey");

        if (isValidForm(email, password)) {
            const formData = {
                email: email,
                password: password,
            };

            axios
                .post(`${BACKEND_URL}/api/v1/auth/login`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log("OK");
                        return response.data;
                    } else {
                        console.log("Error!!");
                        throw new Error(
                            "Something went wrong. Try again later!"
                        );
                    }

                })
                .then((data) => {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("name", data.user.name);
                    displayMessage("Success!", "green"); // Temporary success message
                    window.location.href =
                        "/pages/protected-pages/dashboard.html";
                    resetForm();
                    spinner.classList.add("d-none");
                })
                .catch((error) => {
                    spinner.classList.add("d-none");
                    if (error.response && error.response.status === 401) {
                        displayMessage("Invalid email or password!", "red");
                    } else {
                        displayMessage(
                            "Something went wrong. Try again later!",
                            "red"
                        );
                    }
                });
        }
    });

    passwordInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            loginBtn.click();
        }
    });

    function isValidForm(email, password) {
        // resetForm();

        if (email !== "" && password !== "") {
            if (checkForErrors(email)) {
                return false;
            } else {
                return true;
            }
        } else {
            displayMessage("Please enter the required fields*", "red");
            if (email === "") {
                emailInput.classList.add("form-field-error");
            }
            if (password === "") {
                passwordInput.classList.add("form-field-error");
            }
            return false;
        }
    }

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
