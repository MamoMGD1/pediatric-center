document.addEventListener("DOMContentLoaded", () => {
    const departments = [
        {
            name: "Emergency",
            patientCount: 48,
            bedCount: 3,
            issues: ["Staff shortage", "High wait times"]
        },
        {
            name: "Intensive Care",
            patientCount: 32,
            bedCount: 8,
            issues: ["Equipment maintenance"]
        },
        {
            name: "Oncology",
            patientCount: 21,
            bedCount: 5,
            issues: []
        }
    ];

    const departmentNames = departments.map(d => d.name);
    const patientCounts = departments.map(d => d.patientCount);
    const bedCounts = departments.map(d => d.bedCount);
    const issuesCounts = departments.map(d => d.issues.length);

    // Patient Count Chart
    const patientChartCtx = document.getElementById("patientChart").getContext("2d");
    new Chart(patientChartCtx, {
        type: "bar",
        data: {
            labels: departmentNames,
            datasets: [{
                label: "Patient Count",
                data: patientCounts,
                backgroundColor: [
                    "rgba(255, 99, 132, 1)",   // Soft Red
                    "rgba(54, 162, 235, 1)",   // Soft Blue
                    "rgba(255, 206, 86, 1)",   // Soft Yellow
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });

    // Bed Availability Chart
    const bedChartCtx = document.getElementById("bedChart").getContext("2d");
    new Chart(bedChartCtx, {
        type: "doughnut",
        data: {
            labels: departmentNames,
            datasets: [{
                label: "Bed Availability",
                data: bedCounts,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                borderColor: "#ffffff",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });

    // Issues Count Chart
    const issuesChartCtx = document.getElementById("issuesChart").getContext("2d");
    new Chart(issuesChartCtx, {
        type: "polarArea",
        data: {
            labels: departmentNames,
            datasets: [{
                label: "Number of Issues",
                data: issuesCounts,
                backgroundColor: ["#FF6F61", "#6B5B95", "#88B04B"],
                borderColor: "#ffffff",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });
});
// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const detailsButtons = document.querySelectorAll(".details-btn");
    const popupModal = document.getElementById("popupModal");
    const closeBtn = document.getElementById("modalClose");

    // Fetch user data from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("storedUsers")) || [];

    // Department-specific additional data
    const departmentInfo = {
        emergency: {
            specialEquipments: "Defibrillator, Ventilator",
            doctor: getDepartmentInstructor("Emergency"),
            assistants: getDepartmentStaff("Emergency")
        },
        intensive: {
            specialEquipments: "Pediatric Ventilators, ICU Beds",
            doctor: getDepartmentInstructor("Intensive Care"),
            assistants: getDepartmentStaff("Intensive Care")
        },
        hematology: {
            specialEquipments: "Chemotherapy Machines, Blood Analyzers",
            doctor: getDepartmentInstructor("Oncology"),
            assistants: getDepartmentStaff("Oncology")
        }
    };

    // Function to get assistants by department
    function getDepartmentStaff(department) {
        // Get today's date in 'YYYY-MM-DD' format
        const today = new Date();
        const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1)}-${String(today.getDate())}`;
    
        return storedUsers
            .filter(user => 
                user.userType === "assistant" && 
                user.dutyDepartment === department && 
                user.dutyDate === formattedToday
            )
            .map(user => user.fullName);
    }
    
    function getDepartmentInstructor(department) {
        return storedUsers
            .find(user => user.userType === "instructor" && user.dutyDepartment === department)?.fullName || "No instructor assigned";
    }

    // Event listener for each "Details" button
    detailsButtons.forEach(button => {
        button.addEventListener("click", () => {
            const departmentId = button.parentNode.id;
            const department = departmentInfo[departmentId];
    
            // Populate modal with department-specific details
            document.getElementById("modalTitle").textContent = capitalize(departmentId);
            document.getElementById("modal-patient-count").textContent = button.parentNode.querySelector(".patient-count").textContent;
            document.getElementById("modal-bed-count").textContent = button.parentNode.querySelector(".bed-count").textContent;
            document.getElementById("special-equipments").textContent = department.specialEquipments;
    
            // Add doctor link with dynamic hash
            const doctorLink = `<a href="../html/educators.html#${encodeURIComponent(department.doctor)}" style="cursor: pointer; font-weight: bold; color: inherit;">${department.doctor}</a>`;
            document.getElementById("modal-doctor").innerHTML = doctorLink;
    
            // Add assistants
            document.getElementById("modal-assistants").innerHTML = department.assistants.map(name => `<a href="../html/assistants.html?name=${encodeURIComponent(name)}" class="assistant-link" data-name="${name}">${name}</a>`).join(" | ");
            document.getElementById("modal-assistants").style.fontWeight = "bold";
    
            // Show the modal
            popupModal.classList.remove("hidden");
            popupModal.style.display = "block";
        });
    });
    

    // Close the popup modal
    closeBtn.addEventListener("click", () => {
        popupModal.classList.add("hidden");
        popupModal.style.display = "none";
    });

    // Capitalize department names for display
    function capitalize(word) {
        return word.toUpperCase()+" DEPARTMENT";
    }

    // Close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === popupModal) {
            popupModal.classList.add("hidden");
            popupModal.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the selected department ID from local storage
    setTimeout(() => {
        const targetDepartment = localStorage.getItem("selectedDepartment");
        if (targetDepartment) {
            const targetElement = document.getElementById(targetDepartment);

            // Apply smooth scroll and highlight effect if the target element exists
            if (targetElement) 
                targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
            localStorage.removeItem("selectedDepartment");
        }
    }, 500);
});
