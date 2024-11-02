document.addEventListener("DOMContentLoaded", () => {
    const addAlertBtn = document.getElementById("addAlertBtn");
    const alertList = document.getElementById("alertList");
    let userName;
    let activeUser = JSON.parse(localStorage.getItem("activeUser")) || {fullName: "Unknown User"};

    // Load alerts from localStorage on page load
    loadAlertsFromStorage();

    function createAlert(title, details, status, editedBy) {
        const alertItem = document.createElement("li");
        alertItem.classList.add("alert-item");
    
        alertItem.innerHTML = `
            <p style="text-transform: uppercase; font-family: 'Times New Roman'; text-align:center; border-bottom:dashed #087d7d; padding:5px; color:#087d7d; background-color:#fff; border-radius:8px 8px 0 0; margin-top:0;"><strong>${title}</strong></p>
            <div style="padding:5px 10px; margin-top:-6px; border-bottom:dashed #087d7d;">
                <p>Details: ${details}</p>
                <p class="alert-status">Status: ${status}</p>
                <p>Last Edited By: ${editedBy}</p>
            </div>
            <div style="display: flex; align-content: center; justify-content: space-evenly;">
                <button id="editBtn">Edit</button>
                <button id="deleteBtn">Delete</button>
            </div>
        `;
    
        alertList.appendChild(alertItem);
    
        const editBtn = alertItem.querySelector("#editBtn");
        const deleteBtn = alertItem.querySelector("#deleteBtn");
    
        if (activeUser.userType === "instructor") {
            if (editBtn && deleteBtn) { // Check if buttons exist
                editBtn.classList.add("edit-btn");
                deleteBtn.classList.add("delete-btn");
                editBtn.onclick = () => editAlert(alertItem, title);
                deleteBtn.onclick = () => deleteAlert(alertItem, title);
            }
        } else {
            if (editBtn && deleteBtn) { // Check if buttons exist
                editBtn.classList.add("passiveButton");
                deleteBtn.classList.add("passiveButton");
            }
        }
    }
    

    addAlertBtn.onclick = () => {
        const title = document.getElementById("emergencyTitle").value;
        const details = document.getElementById("emergencyDetails").value;
        const status = document.getElementById("emergencyStatus").value;
        userName = activeUser.fullName;
        if (title && details) {
            createAlert(title, details, status, userName);
            saveAlertToStorage(title, details, status, userName); // Save to localStorage
            document.getElementById("emergencyTitle").value = "";
            document.getElementById("emergencyDetails").value = "";
            userName = "";
            activeUser = "";
        }
    };

    function editAlert(alertItem, oldTitle) {
        const titleElement = alertItem.querySelector("strong");
        const detailsElement = alertItem.querySelector("div").querySelector("p");
        const statusElement = alertItem.querySelector(".alert-status");

        const newTitle = prompt("Edit Title:", titleElement.innerText);
        const newDetails = prompt("Edit Details:", detailsElement.innerText.slice(9)); 
        const newStatus = prompt("Edit Status:", statusElement.innerText.split(": ")[1]);

        if (newTitle && newDetails && newStatus) {
            activeUser = JSON.parse(localStorage.getItem("activeUser")) || {fullName: "Unknown User"};
            userName = activeUser.fullName;
            titleElement.innerText = newTitle;
            detailsElement.innerText = "Details: " + newDetails;
            statusElement.innerText = "Status: " + newStatus;
            alertItem.querySelector("p:nth-child(3)").innerText = "Last Edited By: " + userName;
            updateAlertInStorage(oldTitle, { title: newTitle, details: newDetails, status: newStatus, editedBy: userName });
        }
    }

    function deleteAlert(alertItem, title) {
        alertList.removeChild(alertItem);
        deleteAlertFromStorage(title);
    }

    function saveAlertToStorage(title, details, status, editedBy) {
        let alerts = JSON.parse(localStorage.getItem("alerts")) || [];
        alerts.push({ title, details, status, editedBy });
        localStorage.setItem("alerts", JSON.stringify(alerts));
    }

    function updateAlertInStorage(oldTitle, updatedAlert) {
        let alerts = JSON.parse(localStorage.getItem("alerts")) || [];
        const alertIndex = alerts.findIndex(alert => alert.title === oldTitle);

        if (alertIndex !== -1) {
            alerts[alertIndex] = updatedAlert;
            localStorage.setItem("alerts", JSON.stringify(alerts));
        }
    }

    function deleteAlertFromStorage(title) {
        let alerts = JSON.parse(localStorage.getItem("alerts")) || [];
        alerts = alerts.filter(alert => alert.title !== title);
        localStorage.setItem("alerts", JSON.stringify(alerts));
    }

    function loadAlertsFromStorage() {
        const alerts = JSON.parse(localStorage.getItem("alerts")) || [];
        alerts.forEach(alert => createAlert(alert.title, alert.details, alert.status, alert.editedBy));
    }
});
