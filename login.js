function validateForm() {
    var emailPhone = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;
    let isValid = true;
    var regex = new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$');

    if (emailPhone) {
        if (!regex.test(emailPhone)) {
            $("#emailPhoneError").text("Please enter valid email address or phone number.")
            isValid = false;
        } else {
            $("#emailPhoneError").text('')
        }
    } else {
        $("#emailPhoneError").text('Email/PhoneNo is required.')
    }

    if (password == "") {
        document.getElementById("passwordError").innerHTML = "Password is required";
        isValid = false;
    } else {
        document.getElementById("passwordError").innerHTML = "";
    }

    var login = { 'Email/PhoneNo': emailPhone, 'Password': password };
    console.log(login);

    return isValid;

}



