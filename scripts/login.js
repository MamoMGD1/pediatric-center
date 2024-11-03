localStorage.removeItem("activeUser");
const submit = document.getElementById("submit");
const username = document.getElementById("username");
const password = document.getElementById("password");
const error = document.getElementById("error");
document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const foundUsername = storedUsers.find(user => user.username === username);
    const foundUser = storedUsers.find(user => user.username === username && user.password === password);
    if(!foundUsername){
        error.textContent = "Invalid username";
    }
    else if(!foundUser){
        error.textContent = "The Password is incorrect.";
    }
    else{
        error.textContent = "";
        localStorage.setItem("activeUser", JSON.stringify(foundUser));
        window.location.href = "main.html";
    }
});
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const loginContainer = document.querySelector(".loginContainer");
const forgotPasswordContainer = document.getElementById("forgotPasswordContainer");
const sendResetLink = document.getElementById("sendResetLink");
const resetMessage = document.getElementById("resetMessage");
const resetUsername = document.getElementById("resetUsername");
forgotPasswordLink.addEventListener("click", function(event){
    event.preventDefault();
    loginContainer.style.display = "none";
    forgotPasswordContainer.style.display = "block";
});
sendResetLink.addEventListener("click", function(){
    const foundUser = storedUsers.find(user => user.username === resetUsername.value)
    if(foundUser){
        resetMessage.textContent = `A reset password link has been sent to ${foundUser.email}`;
        resetMessage.style.color = "black";
    }else{
        resetMessage.textContent = "Username not found";
        resetMessage.style.color = "red";
    }
});