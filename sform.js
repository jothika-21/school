let list = []
let students = []

function validate() {

    const names = document.getElementById("Name").value;
    const fatherName = document.getElementById("FatherName").value;
    const DateOfBirth = document.getElementById("DateOfBirth").value;
    const standard = document.getElementById("Standard").value;
    const email = document.getElementById("email").value;
    const number = document.getElementById("PhoneNumber").value;
    const gender = document.getElementById("Gender").value;
    const address = document.getElementById("address").value;
    let id = document.getElementById("id").value;

    var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    function isValidEmail(email) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }


    if (names == "") {
        document.getElementById("nameerror").innerHTML = "You must enter a valid name";
    } else {
        document.getElementById("nameerror").innerHTML = "";
    }
    if (fatherName == "") {
        document.getElementById("FatherNameerror").innerHTML = "You must enter a valid name";
    } else {
        document.getElementById("FatherNameerror").innerHTML = "";
    }
    if (DateOfBirth == "") {
        document.getElementById("DateOfBirtherror").innerHTML = "You must enter a valid date";
    } else {
        document.getElementById("DateOfBirtherror").innerHTML = "";
    }
    if (standard == "") {
        document.getElementById("Standarderror").innerHTML = "You must enter a valid Class";
    } else {
        document.getElementById("Standarderror").innerHTML = "";
    }
    if (!isValidEmail(email)) {
        document.getElementById("emailerror").innerHTML = "You must enter a valid email";
    } else {
        document.getElementById("emailerror").innerHTML = "";
    }
    if (number.match(phoneNum)) {
        document.getElementById("PhoneNumbererror").innerHTML = "";
    } else {
        document.getElementById("PhoneNumbererror").innerHTML = "You must enter a valid number";
    }
    if (gender == "") {
        document.getElementById("Gendererror").innerHTML = "You must select a gender";
    } else {
        document.getElementById("Gendererror").innerHTML = "";
    }
    if (address == "") {
        document.getElementById("addresserror").innerHTML = "You must enter a valid address";
    } else {
        document.getElementById("addresserror").innerHTML = "";
    }


    let student = { 'id': id, 'name': names, 'fathername': fatherName, 'DateOfBirth': DateOfBirth, 'Standard': standard, 'email': email, 'PhoneNumber': number, 'Gender': gender, 'Address': address }

    students.push(student);

    if (names && fatherName && DateOfBirth && standard && email && number && gender && address) {
        if (id != "") {
            alert("D" + id)
            $.ajax({
                type: "PUT",
                dataType: 'JSON',
                data: { 'id': id, 'name': names, 'fathername': fatherName, 'DateOfBirth': DateOfBirth, 'Standard': standard, 'email': email, 'PhoneNumber': number, 'Gender': gender, 'Address': address },
                url: "https://63a165e9a543280f775523cb.mockapi.io/student/" + id,
                success: function (data) {
                    console.log(data)
                    alert("edit the data")
                }
            })
        }

        else {
            $.post("https://63a165e9a543280f775523cb.mockapi.io/student", { 'name': names, 'fathername': fatherName, 'DateOfBirth': DateOfBirth, 'Standard': standard, 'email': email, 'PhoneNumber': number, 'Gender': gender, 'Address': address },
                function (data) {
                    buildTable();
                })
            alert("data is stored")
        }
    }
    else {
        console.log("");
    }
}

function getUrlParameter(names) {
    names = names.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + names + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var qsp = 'id',
    para = getUrlParameter(qsp);
alert(para);

myResult(para)
function myResult(id) {

    $.ajax({
        url: "https://63a165e9a543280f775523cb.mockapi.io/student/" + id,
        method: 'GET',
        dataType: 'json',
        success: function (result) {
            console.log(result)
            $('#Name').val(result.name);
            $('#FatherName').val(result.fathername);
            $('#DateOfBirth').val(result.DateOfBirth);
            $('#Standard').val(result.Standard);
            $('#email').val(result.email);
            $('#PhoneNumber').val(result.PhoneNumber);
            $('#Gender').val(result.Gender);
            $('#address').val(result.Address);
            edit_id = result.id
            $("#id").val(result.id)
        }
    });

}

function myFunction(id) {

    if (confirm("Are you sure you want to delete this item?")) {

        $.ajax({
            type: "DELETE",
            url: "https://63a165e9a543280f775523cb.mockapi.io/student/" + id,
            success: function (response) {
            }
        });
    } else {

    }
}




function buildTable() {
    $(document).ready(function () {

        $.ajax({
            url: "https://63a165e9a543280f775523cb.mockapi.io/student ",
            type: "GET",

            success: function (response) {

                var trHTML = '';

                $.each(response, function (i, item) {
                    trHTML +=
                        '<tr><td>' + item.id +
                        '</td><td>' + item.name +
                        '</td><td>' + item.fathername +
                        '</td><td>' + item.DateOfBirth +
                        '</td><td>' + item.Standard +
                        '</td><td>' + item.email +
                        '</td><td>' + item.PhoneNumber +
                        '</td><td>' + item.Gender +
                        '</td><td>' + item.Address +
                        '</td><td><button class="btn btn-primary" ><a style="color:white; text-decoration: none;" id="editbtn" href="http://127.0.0.1:5500/sform.html?id=' + item.id + '">Edit</a></button>' +
                        '</td><td><button  class="deletebtn btn btn-danger" onclick="myFunction(' + item.id + ')">Delete</td>' +
                        '</td></tr>';
                });
                $('#myTable').append(trHTML);
            }
        });

    });
}

