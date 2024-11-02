// Get the context of the canvas element we just added
const ctx = document.getElementById('statisticsChart').getContext('2d');

// Create the chart
const statisticsChart = new Chart(ctx, {
    type: 'bar', // Choose the type of chart
    data: {
        labels: ['Beds', 'Patients', 'Emergency Rooms', 'Staff', 'Assistants'],
        datasets: [{
            label: 'Units',
            data: [16, 101, 50, 90, 15], // Replace with your actual data
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(128, 0, 128, 0.6)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(128, 0, 128, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
// Add event listeners to service cards for navigation to specific departments
document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("click", function () {
        const serviceName = this.querySelector("h3").textContent;

        // Map service name to the respective department
        let targetDepartment;
        if (serviceName === "Emergency Care") {
            targetDepartment = "emergency";
        } else if (serviceName === "Intensive Care") {
            targetDepartment = "intensive";
        } else if (serviceName === "Oncology & Hematology") {
            targetDepartment = "hematology";
        } else {
            console.error("Unknown service selected!");
            return;
        }

        // Store department ID in local storage to retrieve on the departments page
        localStorage.setItem("selectedDepartment", targetDepartment);
        console.log(localStorage.getItem("selectedDepartment"));
        // Navigate to the departments page
        window.location.href = "../html/departments.html";
    });
});


// Existing map toggle functionality for the 'View Location on Map' button
document.getElementById("mapButton").addEventListener("click", function () {
    const mapContainer = document.getElementById("mapContainer");
    const buttonText = this.querySelector("h3");
    const buttonIcon = this.querySelector("h3").querySelector("i");

    if (mapContainer.style.display === "none") {
        mapContainer.style.display = "block";
        buttonIcon.classList.remove("fa-location-dot");
        buttonIcon.classList.add("fa-eye-slash");
        buttonText.innerHTML = '<i class="fa-solid fa-eye-slash" style="margin-right: 5px; color: #fff;"></i> Hide the map';
    } else {
        mapContainer.style.display = "none";
        buttonIcon.classList.remove("fa-eye-slash");
        buttonIcon.classList.add("fa-location-dot");
        buttonText.innerHTML = '<i class="fa-solid fa-location-dot" style="margin-right: 5px; color: #fff;"></i> View location on map';
    }
});
