const BACKEND_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function () {
    const viewBtn = document.querySelector(".view-jobs-btn");
    const addBtn = document.querySelector(".add-job-btn");
    const viewJobsDiv = document.querySelector(".view-jobs-div");
    const addJobDiv = document.querySelector(".add-job-div");
    const jobCount = document.querySelector(".jobCount");
    const pendingCount = document.querySelector(".pendingCount");
    const inProgressCount = document.querySelector(".inProgressCount");
    const declinedCount = document.querySelector(".declinedCount");
    const acceptedCount = document.querySelector(".acceptedCount");

    var pendingCounter = 0,
        inProgressCounter = 0,
        declinedCounter = 0,
        acceptedCounter = 0;

    viewBtn.addEventListener("click", function () {
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
                for (let i = 0; i < data.jobs.length; i++) {
                    if (data.jobs[i].status === "Pending") {
                        pendingCounter++;
                    } else if (jobs[i].status === "In progress") {
                        inProgressCounter++;
                    } else if (jobs[i].status === "Declined") {
                        declinedCounter++;
                    } else {
                        acceptedCounter++;
                    }
                }
                pendingCount.textContent = pendingCounter;
                inProgressCount.textContent = inProgressCounter;
                declinedCount.textContent = declinedCounter;
                acceptedCount.textContent = acceptedCounter;
            })
            .catch((error) => {
                console.log(localStorage.getItem("token"));
                if (error.response && error.response.status === 401) {
                    console.log("Error");
                } else {
                    console.log("Something went wrong");
                }
            });
    });

    addBtn.addEventListener("click", function () {
        addJobDiv.style.display = "flex";
        viewJobsDiv.style.display = "none";
        addBtn.style.backgroundColor = "#1c41a7";
        viewBtn.style.backgroundColor = "#3661d7";
    });
});
