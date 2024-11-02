const activeUser = JSON.parse(localStorage.getItem("activeUser"));
let oldActiveUser = activeUser;

// Function to redirect to login page
function redirectToLogin() {
    localStorage.removeItem('activeUser'); // Clear activeUser from storage
    //localStorage.setItem('storedUsers', JSON.stringify(storedUsers));
    window.location.href = "login.html"; // Redirect to login page
}
document.getElementById("toggleSidebar").addEventListener("click", function() {
    const sidebar = document.getElementById("sidebar");
    const app = document.getElementById("app");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px"; // Hide sidebar
        app.classList.remove("app-slide"); // Remove sliding effect
        this.classList.toggle("rotated");
    } else {
        sidebar.style.left = "0px"; // Show sidebar
        app.classList.add("app-slide"); // Add sliding effect
        this.classList.toggle('rotated');
    }
});
document.addEventListener("DOMContentLoaded", function() {
    var userClass;
    var userStyles;
    if (activeUser) {
        if(activeUser.userType === "instructor"){
            userClass = "fa-solid fa-user-doctor userIcon";
        }
        else{
            userClass = "fa-solid fa-user userIcon";
        }
        document.getElementById("userIcon").classList = userClass;
        document.getElementById("fullName").textContent = activeUser.fullName;
        document.getElementById("organization").textContent = activeUser.organization;
    } else
        window.redirectToLogin();
});

// Show the edit profile popup and populate it with the current user information
function showEditProfilePopup() {
    document.getElementById("editProfilePopup").style.display = "flex";

    // Set the input fields to the current user information
    document.getElementById("fullName-edit").value = activeUser.fullName;
    document.getElementById("organization-edit").value = activeUser.organization;
    document.getElementById("email-edit").value = activeUser.email;
    document.getElementById("phone-edit").value = activeUser.phone;
    document.getElementById("username-edit").value = activeUser.username;
    document.getElementById("password-edit").value = activeUser.password;
    // Add a class to blur the background
    document.body.classList.add("blur-background");
}
let newActiveUser = JSON.parse(localStorage.getItem("activeUser"));
// Handle the form submission
document.getElementById("editProfileForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally
    const userIndex = storedUsers.findIndex(user => user.username === activeUser.username);
    oldActiveUser = storedUsers[userIndex];
    // Update user information with the input values from the popup form
    activeUser.fullName = document.getElementById("fullName-edit").value;
    activeUser.organization = document.getElementById("organization-edit").value;
    activeUser.email = document.getElementById("email-edit").value;
    activeUser.phone = document.getElementById("phone-edit").value;
    activeUser.username = document.getElementById("username-edit").value;
    activeUser.password = document.getElementById("password-edit").value;
    localStorage.setItem("activeUser", JSON.stringify(activeUser));
    document.getElementById("fullName").innerText = activeUser.fullName;
    document.getElementById("organization").innerText = activeUser.organization;
    if(userIndex !== -1){
        storedUsers[userIndex].fullName = document.getElementById("fullName-edit").value;
        storedUsers[userIndex].organization = document.getElementById("organization-edit").value;
        storedUsers[userIndex].email = document.getElementById("email-edit").value;
        storedUsers[userIndex].phone = document.getElementById("phone-edit").value;
        storedUsers[userIndex].username = document.getElementById("username-edit").value;
        storedUsers[userIndex].password = document.getElementById("password-edit").value;
        localStorage.setItem("storedUsers", JSON.stringify(storedUsers));
    }
    else
        console.log("Couldn't find the user");
    newActiveUser = JSON.parse(localStorage.getItem("activeUser"));
    // Close the popup after saving changes
    closeEditProfilePopup();
});

// JavaScript to Open and Close the Modal
document.addEventListener('DOMContentLoaded', () => {
    const editProfileButton = document.getElementById('editProfile');
    const modal = document.getElementById('editProfilePopup');
    const closeModal = document.getElementById('closeModal');

    // Open the modal when clicking "Edit Profile"
    editProfileButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        modal.style.display = 'block';
        showEditProfilePopup();
    });

    // Close the modal when clicking the "X" button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Optional: handle form submission
    const form = document.getElementById('editProfileForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload
        modal.style.display = 'none';
    });
});
// Close the popup and remove the blur effect
function closeEditProfilePopup() {
    document.getElementById("editProfilePopup").style.display = "none";
    document.body.classList.remove("blur-background");
}
