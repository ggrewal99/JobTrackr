const BACKEND_URL = "http://localhost:3000";
const viewBtn = document.querySelector(".view-jobs-btn");
const addBtn = document.querySelector(".add-job-btn");
const viewJobsDiv = document.querySelector(".view-jobs-div");
const addJobDiv = document.querySelector(".add-job-div");
const jobCount = document.querySelector(".jobCount");
const pendingCount = document.querySelector(".pendingCount");
const inProgressCount = document.querySelector(".inProgressCount");
const declinedCount = document.querySelector(".declinedCount");
const acceptedCount = document.querySelector(".acceptedCount");
const companyInput = document.querySelector(".company");
const positionInput = document.querySelector(".position");
const statusInput = document.querySelector(".status");
const addBtnForm = document.querySelector(".form-add-btn");
const msg = document.querySelector(".msg");
const updateCardBackdrop = document.querySelector(".update-card-backdrop");

msg.style.display = "none";

/* VIEW JOBS */

const viewJobsData = () => {
    var pendingCounter = 0,
        inProgressCounter = 0,
        declinedCounter = 0,
        acceptedCounter = 0;
    addJobDiv.style.display = "none";
    viewJobsDiv.style.display = "grid";
    viewBtn.style.backgroundColor = "#1c41a7";
    addBtn.style.backgroundColor = "#3661d7";
    console.log(localStorage.getItem("token"));
    axios
        .get(`${BACKEND_URL}/api/v1/jobs`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("OK");
                return response.data;
            } else {
                console.log("Error!!");
                throw new Error("Something went wrong. Try again later!");
            }
        })
        .then((data) => {
            console.log(data);

            jobCount.textContent = data.count;
            // console.log("HERE");
            for (let i = 0; i < data.jobs.length; i++) {
                if (data.jobs[i].status === "Pending") {
                    pendingCounter++;
                } else if (data.jobs[i].status === "In progress") {
                    inProgressCounter++;
                } else if (data.jobs[i].status === "Declined") {
                    declinedCounter++;
                } else {
                    acceptedCounter++;
                }
            }
            pendingCount.textContent = pendingCounter;
            inProgressCount.textContent = inProgressCounter;
            declinedCount.textContent = declinedCounter;
            acceptedCount.textContent = acceptedCounter;

            // console.log("Above populateViewJobs, status:", data.jobs[0].status);
            populateViewJobs(data);
        })
        .catch((error) => {
            console.log(localStorage.getItem("token"));
            if (error.response && error.response.status === 401) {
                console.log("Error");
            } else {
                console.log("Something went wrong");
            }
        });
};

const deleteJob = (jobId) => {
    const toDeleteJob = document.getElementById(jobId);

    const confirmDelete = document.createElement("div");
    const question = document.createElement("p");
    const confirmBtns = document.createElement("div");
    const yesBtn = document.createElement("button");
    const noBtn = document.createElement("button");

    document.body.appendChild(confirmDelete);
    confirmDelete.appendChild(question);
    confirmDelete.appendChild(confirmBtns);
    confirmBtns.appendChild(yesBtn);
    confirmBtns.appendChild(noBtn);

    question.textContent = "Are you sure?";
    yesBtn.textContent = "Yes";
    noBtn.textContent = "No";

    confirmDelete.className = "confirm-delete";
    question.className = "confirm-question";
    confirmBtns.className = "confirm-btns";
    yesBtn.className = "confirm-yes";
    noBtn.className = "confirm-no";

    updateCardBackdrop.style.display = "block";
    updateCardBackdrop.style.zIndex = "101";
    updateCardBackdrop.style.pointerEvents = "none";

    // axios
    //     .delete(`${BACKEND_URL}/api/v1/jobs/${toDeleteJob.id}`, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //     })
    //     .then((response) => {
    //         if (response.status === 200) {
    //             console.log("Deleted successfully");
    //             toDeleteJob.remove();
    //         }
    //     })
    //     .catch((error) => {
    //         console.log("Something went wrong while deleting");
    //     });
};

/* ADD JOBS */

addBtn.addEventListener("click", function () {
    addJobDiv.style.display = "flex";
    viewJobsDiv.style.display = "none";
    addBtn.style.backgroundColor = "#1c41a7";
    viewBtn.style.backgroundColor = "#3661d7";
});

addBtnForm.addEventListener("click", function (e) {
    e.preventDefault();
    const company = companyInput.value.trim();
    const position = positionInput.value.trim();
    const status = statusInput.value;
    console.log(status);

    if (company === "" || position === "" || status === "") {
        displayMessage("*Please fill out all the fields", "red");
        return;
    }

    const jobData = {
        company: company,
        position: position,
        status: status,
    };

    console.log(jobData);
    axios
        .post(`${BACKEND_URL}/api/v1/jobs`, jobData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            if (response.status === 201) {
                console.log("OK");
                displayMessage("Added!", "green");
                return response.data;
            } else {
                console.log("Error!!");
                throw new Error("Something went wrong. Try again later!");
            }
        })
        .catch((error) => {
            if (error.response.status === 401) {
                displayMessage("Not Authorized!", "red");
            } else {
                displayMessage("Something went wrong. Try again later!", "red");
            }
        });
});

/* UPDATE POPUP */

const updateJob = (jobId) => {
    const updateCard = document.querySelector(".update-card-popup");
    const companyUpdateInput = document.querySelector(".company-update");
    const positionUpdateInput = document.querySelector(".position-update");
    const statusUpdateInput = document.querySelector(".status-update");
    var jobData;
    var formUpdated = false;

    const updateBtn = document.querySelector(".update-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    const deleteBtn = document.querySelector(".delete-btn");

    updateCard.style.display = "flex";
    updateCardBackdrop.style.display = "block";

    updateCardBackdrop.addEventListener("click", function () {
        updateCard.style.display = "none";
        updateCardBackdrop.style.display = "none";

        companyUpdateInput.value = "";
        positionUpdateInput.value = "";
        statusUpdateInput.value = "";
    });

    axios
        .get(`${BACKEND_URL}/api/v1/jobs/${jobId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("OK");
                return response.data;
            } else {
                console.log("Error!!");
                throw new Error("Something went wrong. Try again later!");
            }
        })
        .then((data) => {
            jobData = data;
            populateUpdatePopup(jobData);

            const checkFormChange = () => {
                console.log("gdsags");
                if (
                    companyUpdateInput.value !== jobData.job.company ||
                    positionUpdateInput.value !== jobData.job.position ||
                    statusUpdateInput.value !== jobData.job.status
                ) {
                    console.log("sdgagas");
                    formUpdated = true;
                    updateBtn.disabled = false;
                    updateBtn.style.backgroundColor = "#3661d7";
                    updateBtn.style.color = "white";
                } else {
                    formUpdated = false;
                    updateBtn.disabled = true;
                    updateBtn.style.backgroundColor = "#f5f5f5";
                    updateBtn.style.color = "black";
                }
            };
            companyUpdateInput.addEventListener("input", checkFormChange);
            positionUpdateInput.addEventListener("input", checkFormChange);
            statusUpdateInput.addEventListener("input", checkFormChange);
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                console.log("Error");
            } else {
                console.log("Something went wrong");
            }
        });

    const populateUpdatePopup = (jobData) => {
        companyUpdateInput.value = jobData.job.company;
        positionUpdateInput.value = jobData.job.position;
        statusUpdateInput.value = jobData.job.status;
        return true;
    };

    cancelBtn.addEventListener("click", function () {
        updateCardBackdrop.click();
    });
    deleteBtn.addEventListener("click", function () {
        deleteJob(jobId);
    });
};

/* HELPER FUNCTIONS */

const populateViewJobs = (data) => {
    var container = document.querySelector(".job-cards");
    container.innerHTML = "";
    for (var i = 0; i < data.jobs.length; i++) {
        var div = document.createElement("div");
        var h1 = document.createElement("h1");
        var h2 = document.createElement("h2");
        var p = document.createElement("p");
        var editIcon = document.createElement("img");

        div.classList.add("card");
        div.id = data.jobs[i]._id;
        div.style.display = "block";
        h1.className = "company-name";
        h2.className = "position-name";
        p.className = "status";

        editIcon.className = "edit-icon";
        editIcon.src = "../../assets/icons/icons8-edit-64.png";
        editIcon.style.display = "none";

        div.appendChild(h1);
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(editIcon);

        container.appendChild(div);

        h1.textContent = data.jobs[i].company;
        h2.textContent = data.jobs[i].position;
        p.innerHTML = `Status: <span class="statusText">${data.jobs[i].status}</span>`;
        if (data.jobs[i].status === "Pending") {
            var statusText = div.querySelector(".statusText");
            statusText.style.color = "orange";
        } else if (data.jobs[i].status === "In progress") {
            var statusText = div.querySelector(".statusText");
            statusText.style.color = "yellow";
        } else if (data.jobs[i].status === "Declined") {
            var statusText = div.querySelector(".statusText");
            statusText.style.color = "red";
        } else if (data.jobs[i].status === "Accepted") {
            var statusText = div.querySelector(".statusText");
            statusText.style.color = "#22f28e";
        }

        (function (currentEditIcon) {
            div.addEventListener("mouseenter", function () {
                this.classList.add("card-hovered");
                currentEditIcon.style.display = "block";
            });

            div.addEventListener("mouseleave", function () {
                this.classList.remove("card-hovered");
                currentEditIcon.style.display = "none";
            });
            div.addEventListener("click", function () {
                updateJob(this.id);
            });
        })(editIcon);
    }
};

function displayMessage(text, color) {
    msg.textContent = text;
    msg.style.color = color;
    msg.style.display = "block";
}

document.addEventListener("DOMContentLoaded", viewJobsData);
