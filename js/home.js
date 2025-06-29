var userName = localStorage.getItem("username")
var userNameInput = document.getElementById("userName")
var logoutBtn = document.getElementById("logoutBtn")

userNameInput.innerHTML = userName

function logout(){
    localStorage.removeItem("userName")
    window.location.href = "../index.html"
}