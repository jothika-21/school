var list = [];
var valuarry = [];

function validateForm() {
    const firstName = document.getElementById("FirstName").value;
    const lastName = document.getElementById("LastName").value;
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    const confirmPassword = document.getElementById("ConfirmPassword").value;

    let isValid = true;

    function isValidEmail(email) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    if (firstName == "") {
        document.getElementById("fnameerror").innerHTML = "First name is required";
        isValid = false;
    } else {
        document.getElementById("fnameerror").innerHTML = "";
    }

    if (lastName == "") {
        document.getElementById("lnameerror").innerHTML = "Last name is required";
        isValid = false;
    } else {
        document.getElementById("lnameerror").innerHTML = "";
    }

    if (!isValidEmail(email)) {
        document.getElementById("emailerror").innerHTML = "Email is required";
        isValid = false;
    } else {
        document.getElementById("emailerror").innerHTML = "";
    }

    if (password == "") {
        document.getElementById("passworderror").innerHTML = "Password is required";
        isValid = false;
    } else {
        document.getElementById("passworderror").innerHTML = "";
    }

    if (confirmPassword == "") {
        document.getElementById("confirmpassworderror").innerHTML = "Confirm password is required";
        isValid = false;
    } else if (password == confirmPassword) {
        window.location.href = 'http://127.0.0.1:5500/login.html';
    } else {

        document.getElementById("confirmpassworderror").innerHTML = "Passwords do not match";
    }

    if (firstName && lastName && email && password && confirmPassword) {
        list.push(account);
        console.log(valuarry);
        localStorage.setItem("accountvalue", JSON.stringify(list))
    } else {
        console.log("");
    }

    return isValid;

}


