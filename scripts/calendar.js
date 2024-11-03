// Month and year tracking
let currentDate = new Date();
let monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Initialize calendar
function initializeCalendar() {
    document.getElementById("monthYearDisplay").innerText = getMonthYearDisplay(currentDate);
    renderCalendarDays();
}

// Month and Year display
function getMonthYearDisplay(date) {
    const month = monthNames[date.getMonth()]; // Get month name in English
    const year = date.getFullYear();
    return `${month} - ${year}`;
}

// Render days in calendar grid
function renderCalendarDays() {
    const calendarGrid = document.getElementById("calendarGrid");
    calendarGrid.innerHTML = '';
    
    // Get start day of the month
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Fill initial empty days
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("day-cell", "empty");
        calendarGrid.appendChild(emptyCell);
    }

    // Fill days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day-cell");
        dayCell.textContent = day;
        
        const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
        const isFullDay = checkIfFullDay(dateStr);

        if (isFullDay) {
            dayCell.classList.add("full-day");
            addTooltip(dayCell, dateStr);
        }

        dayCell.addEventListener("click", () => openDutyModal(dateStr));
        calendarGrid.appendChild(dayCell);
    }
}

// Check if a day has assigned duties
function checkIfFullDay(dateStr) {
    return storedUsers.some(user => user.dutyDate === dateStr);
}

// Add tooltip to show duty details on hover
function addTooltip(dayCell, dateStr) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");

    const dutyUsers = storedUsers.filter(user => user.dutyDate === dateStr);
    tooltip.innerHTML = dutyUsers.map(user => `<strong>${user.fullName}</strong> (${user.dutyDepartment})`).join('<br>');

    dayCell.appendChild(tooltip);
    dayCell.addEventListener("mouseenter", () => tooltip.style.display = "block");
    dayCell.addEventListener("mouseleave", () => tooltip.style.display = "none");
}

const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Open modal for viewing or assigning duties
function openDutyModal(dateStr) {
    const modal = document.getElementById("dutyModal");
    const dutyDetails = document.getElementById("dutyDetails");
    const instructorControls = document.getElementById("instructorControls");

    const [year, month, day] = dateStr.split('-').map(Number);
    const formattedDate = `${shortMonthNames[month-1]} ${day}, ${year}`;
    modal.style.display = "block";
    document.getElementById("modalTitle").innerHTML = `<h2>Duties for ${formattedDate}</h2>`;
    
    const dutyUsers = storedUsers.filter(user => user.dutyDate === dateStr);
    dutyDetails.innerHTML = dutyUsers.length ? dutyUsers.map(user => 
        `<p><strong>${user.fullName}</strong> <i class="fa-solid fa-arrow-right"></i> ${user.dutyDepartment}</p>`).join('') 
        : "<p>No assistants on duty</p>";

    // Show instructor controls if the user is an instructor
    if (activeUser.userType === "instructor") {
        instructorControls.style.display = "block";
        populateAssistantsDropdown();
        document.getElementById("assignDuty").onclick = () => assignDuty(dateStr);
    } else {
        instructorControls.style.display = "none";
    }
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Populate assistants dropdown
function populateAssistantsDropdown(filterText = '') {
    const assistantSelect = document.getElementById("assistantSelect");
    assistantSelect.innerHTML = ''; // Clear the existing options

    // Filter assistants based on userType and search text
    const filteredUsers = storedUsers
        .filter(user => user.userType === "assistant" && user.fullName.toLowerCase().includes(filterText.toLowerCase()));

    // Populate the dropdown with filtered users
    filteredUsers.forEach(user => {
        const option = document.createElement("option");
        option.value = user.username;
        option.innerText = user.fullName;
        assistantSelect.appendChild(option);
    });
}

// Function to handle input and filter dropdown
function filterAssistants() {
    const filterText = document.getElementById("assistantSearch").value;
    populateAssistantsDropdown(filterText);
}
// Event listener to update the search bar with the selected assistant's name
document.getElementById("assistantSelect").addEventListener("change", function() {
    const selectedOption = this.options[this.selectedIndex];
    document.getElementById("assistantSearch").value = selectedOption.text; // Set selected assistant name in search bar
});

document.addEventListener("DOMContentLoaded", () => populateAssistantsDropdown());

// Assign duty to assistant
function assignDuty(dateStr) {
    const selectedAssistant = document.getElementById("assistantSelect").value;
    const selectedDepartment = document.getElementById("departmentSelect").value;

    const assistant = storedUsers.find(user => user.username === selectedAssistant);
    if (assistant) {
        assistant.dutyDate = dateStr;
        assistant.dutyDepartment = selectedDepartment;
        if(selectedDepartment === "None"){
            assistant.dutyDepartment = "";
            assistant.dutyDate = "";
        }
        localStorage.setItem('storedUsers', JSON.stringify(storedUsers));
        console.log(assistant.dutyDepartment);
        renderCalendarDays();
        document.getElementById("dutyModal").style.display = "none";
    }
    document.getElementById("assistantSearch").value = "";
    document.getElementById("departmentSelect").value = "None";
}

// Event listeners
document.getElementById("prevMonth").addEventListener("click", () => changeMonth(-1));
document.getElementById("nextMonth").addEventListener("click", () => changeMonth(1));
document.querySelector(".close").addEventListener("click", () => document.getElementById("dutyModal").style.display = "none");
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    initializeCalendar();
}

// Initialize calendar on page load
document.addEventListener("DOMContentLoaded", initializeCalendar);
