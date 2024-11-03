function checkTheUser() {
    const assistantList = document.getElementById("mainContent");
    const notAuthorizedMessage = document.createElement("p");
    let content = '<p><i class="fa-solid fa-triangle-exclamation" style="margin-right: 5px; font-size: 30px; color: #880000;"></i> You are not authorized to view this content!</p>';
    notAuthorizedMessage.innerHTML = content;
    notAuthorizedMessage.style.backgroundColor = "#ffffff55";
    notAuthorizedMessage.style.borderRadius = "5px";
    notAuthorizedMessage.style.textAlign = "center";
    notAuthorizedMessage.style.fontWeight = "bold";
    notAuthorizedMessage.style.fontSize = "25px";
    notAuthorizedMessage.style.padding = "20px";
    notAuthorizedMessage.id = "notAuthorizedMessage";

    if (activeUser.userType === "instructor") {
        document.querySelector(".contentWarning").style.marginBottom = "0";
        displayAssistantCards(); // Function to load assistant cards
    } else {
        assistantList.style.display = "none";
        document.querySelector(".contentWarning").appendChild(notAuthorizedMessage);
    }
}
function delayedDisplayAssistantCards() {
    setTimeout(() => {
        displayAssistantCards();
    }, 100);
}
// Function to redirect to login page
function redirectToLogin() {
    localStorage.removeItem('activeUser'); // Clear activeUser from storage
    window.location.href = "login.html"; // Redirect to login page
}
function displayAssistantCards() {
    const assistantList = document.getElementById('assistantList');
    assistantList.innerHTML = ""; // Clear any existing content
    // Assuming storedUsers is an array of assistant objects

    JSON.parse(localStorage.getItem("storedUsers")).forEach((user) => {
        if(user.userType === "assistant"){
            const card = document.createElement('div');
            card.classList.add('assistant-card');
            card.setAttribute('data-name', user.fullName); // Ensure the property name matches your stored data
            card.setAttribute('data-organization', user.organization);
            card.setAttribute('data-email', user.email);
            card.setAttribute('data-phone', user.phone);
            card.setAttribute('data-experience', user.experience);
            card.setAttribute('data-dutyDepartment', user.dutyDepartment);
    
            // Populate card content
            card.innerHTML = `
                <i class="fa-solid fa-user-circle" style="margin: 0; margin-top:5px;" id="userIcon"></i>
                <p style="font-weight: bold;">${user.fullName}</p>
                <p>${user.organization}</p>
            `;
    
            // Set up click event to show detailed info in a modal
            card.onclick = () => showAssistantInfo(card);
            assistantList.appendChild(card);
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    // Get the doctor name from the hash
    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const assistantName = urlParams.get("name");
        
        if (assistantName) {
            const assistantCards = document.querySelectorAll(".assistant-card");
            assistantCards.forEach(card => {
                const cardName = card.getAttribute("data-name");
                if (cardName === assistantName) {
                    card.scrollIntoView({ behavior: "smooth", block: "center" });
                    setTimeout(() => {
                        card.classList.add("highlight-animation");
                    }, 500);
                    setTimeout(() => {
                        card.classList.remove("highlight-animation");
                    }, 1500);
                }
            });
        }
    }, 500);
});
// Function to filter assistants
function filterAssistants() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const assistantList = document.getElementById('assistantList');
    const cards = assistantList.getElementsByClassName('assistant-card');

    let hasVisibleCard = false;

    for (let card of cards) {
        const name = card.getAttribute('data-name').toLowerCase();
        if (name.indexOf(filter) > -1) {
            card.style.display = "";
            hasVisibleCard = true;
            card.onclick = () => showAssistantInfo(card);
        } else {
            card.style.display = "none";
        }
    }

    assistantList.style.display = hasVisibleCard ? "flex" : "none";
}
// Function to show assistant info in a pop-up
function showAssistantInfo(card) {
    const name = card.getAttribute('data-name');
    const organization = card.getAttribute('data-organization');
    const email = card.getAttribute('data-email');
    const phone = card.getAttribute('data-phone');
    const experience = card.getAttribute('data-experience');
    const dutyDepartment = card.getAttribute('data-dutyDepartment');

    document.getElementById('popupFullName').innerText = name;
    document.getElementById('popupOrganization').innerText = organization;
    document.getElementById('popupEmail').innerText = email;
    document.getElementById('popupPhone').innerText = phone;
    document.getElementById('popupExperience').innerText = experience;
    document.getElementById('popupDutyDepartment').innerText = dutyDepartment;
    document.getElementById('assistantPopup').style.display = "block";
}
// Close modal when the user clicks on (x)
document.getElementById('closeModal2').onclick = function() {
    document.getElementById('assistantPopup').style.display = "none";
}

// Close modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    const modal = document.getElementById('assistantPopup');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}


function addAssistant() {
    const newAssistant = promptAssistantDetails();
    if (!newAssistant) return; // If form was not filled, exit
    storedUsers.push(newAssistant);
    localStorage.setItem('storedUsers', JSON.stringify(storedUsers));
}

// Helper function to prompt user for new assistant details
function promptAssistantDetails() {
    const fullName = prompt("Enter Full Name:");
    const organization = prompt("Enter Organization:");
    const email = prompt("Enter Email:");
    const phone = prompt("Enter Phone Number:");
    const experience = prompt("Enter Experience:");
    const dutyDepartment = prompt("Enter Duty Department:");

    // Ensure all fields are filled
    if (!fullName || !organization || !email || !phone || !experience || !dutyDepartment) {
        alert("All fields are required.");
        return null;
    }

    return {
        fullName,
        organization,
        email,
        phone,
        experience,
        dutyDepartment,
        userType: "assistant",
        username: email, // Assuming username is the email for simplicity
        password: "default123" // Assign a default password for new assistant
    };
}

// Function to delete an assistant
function deleteAssistant() {
    const assistantName = document.getElementById('popupFullName').innerText;
    const confirmation = confirm(`Are you sure you want to delete ${assistantName}?`);

    if (!confirmation) return;
    const assistantIndex = storedUsers.findIndex(user => user.fullName === assistantName);
    
    // If assistant is found, delete from the array
    if (assistantIndex > -1) {
        //const deletedUser = storedUsers.splice(assistantIndex, 1)[0];
        const deletedUser = storedUsers.splice(assistantIndex, 1)[0];
        localStorage.setItem('storedUsers', JSON.stringify(storedUsers));
        // Check if the deleted user is the active user
        if (deletedUser.username === activeUser.username) {
            alert("You have deleted your own account. Redirecting to login page.");
            window.redirectToLogin();
        } else {
            delayedDisplayAssistantCards();
            document.getElementById('assistantPopup').style.display = "none";
        }
    } else {
        alert("Assistant not found.");
    }
}