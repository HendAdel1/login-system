var isLogin = true;
var formTitle = document.getElementById("formTitle");
var formSubtitle = document.getElementById("formSubtitle");
var submitBtn = document.getElementById("submitBtn");
var toggleText = document.getElementById("toggleText");

var userNameInput = document.getElementById("userNameInput");
var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");
var confirmPasswordInput = document.getElementById("confirmPasswordInput");

var userNameErrorMsg = document.getElementById("userNameErrorMsg");
var emailErrorMsg = document.getElementById("emailErrorMsg");
var passwordErrorMsg = document.getElementById("passwordErrorMsg");
var confirmPasswordErrorMsg = document.getElementById("confirmPasswordErrorMsg");
var errorMsg = document.getElementById("errorMsg");

var allUsers = [];
var isValid = true;

var validationPatterns = {
  name: /^[a-zA-Z0-9]{3,}$/,
  email: /^[\w\-\.]+@[\w\-]+\.(com|net)$/i,
  password: /^.{6,}$/
};

function validateField(element, type) {
  var value = element.value;
  if (!validationPatterns[type].test(value)) {
    return false;
  }
  return true;
}

if (localStorage.getItem("allUsers") !== null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}

function toggleForm() {
  isLogin = !isLogin;

  formTitle.innerHTML = isLogin ? "SECURE LOGIN" : "ACCESS REQUEST";
  formSubtitle.innerHTML = isLogin ? "Authentication required" : "Register new credentials";
  submitBtn.innerHTML = isLogin ? "INITIATE LOGIN" : "REQUEST ACCESS";
  toggleText.innerHTML = isLogin
    ? `No access credentials? <a href="#" onclick="toggleForm()">REQUEST ACCESS</a>`
    : `Already registered? <a href="#" onclick="toggleForm()">LOGIN</a>`;

  document.getElementById('usernameGroup').style.display = isLogin ? "none" : "block";
  document.getElementById('confirmPasswordGroup').style.display = isLogin ? "none" : "block";

  resetErrors();
  clearForm();
}

document.getElementById('submitBtn').addEventListener('click', function(){
  handleSubmit();
});

function handleSubmit() {
  resetErrors();
  var isValid = true;

  var password = passwordInput.value;
  var confirmPassword = confirmPasswordInput.value;

  var newUser = {
    userName: userNameInput.value,
    email: emailInput.value,
    password: password
  };

  if (!isLogin && !validateField(userNameInput, "name")) {
    userNameErrorMsg.innerHTML = "Username must be at least 3 characters";
    isValid = false;
  }

  if (!validateField(emailInput, "email")) {
    emailErrorMsg.innerHTML = "Enter a valid email ending with .com or .net";
    isValid = false;
  }

  if (!validateField(passwordInput, "password")) {
    passwordErrorMsg.innerHTML = "Password must be at least 6 characters";
    isValid = false;
  }

  if (!isLogin && password !== confirmPassword) {
    confirmPasswordErrorMsg.innerHTML = "Passwords do not match";
    isValid = false;
  }

  if (!isValid) return;

  if (!isLogin) {
    if (isExist()) {
      errorMsg.innerHTML = "Email already exists. Try another.";
      return;
    }

    allUsers.push(newUser);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    // alert("Registered successfully!");
    toggleForm();
  } else {
    if (isExist()) {
      window.location.href = "home.html";
    } else {
      errorMsg.innerHTML = "Incorrect email or password";
    }
  }
}

function isExist() {
  if (!isLogin) {
    for (var i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email == emailInput.value) {
        return true;
      }
    }
    return false;
  } else {
    for (var i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email == emailInput.value && allUsers[i].password == passwordInput.value) {
        localStorage.setItem("username", allUsers[i].userName);
        return true;
      }
    }
    return false;
  }
}

function clearForm() {
  document.getElementById("authForm").reset();
}

function resetErrors() {
  userNameErrorMsg.innerHTML = "";
  emailErrorMsg.innerHTML = "";
  passwordErrorMsg.innerHTML = "";
  confirmPasswordErrorMsg.innerHTML = "";
  errorMsg.innerHTML = "";
}