let list = []
let teachers = []

function validate() {

    const names = document.getElementById("Name").value;
    const DateOfBirth = document.getElementById("DateOfBirth").value;
    const number = document.getElementById("PhoneNumber").value;
    const email = document.getElementById("Email").value;
    const qualification = document.getElementById("Qualification").value;
    const experience = document.getElementById("Experience").value;
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
    if (DateOfBirth == "") {
        document.getElementById("DateOfBirtherror").innerHTML = "You must enter a valid date";
    } else {
        document.getElementById("DateOfBirtherror").innerHTML = "";
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
    if (qualification == "") {
        document.getElementById("Qualificationerror").innerHTML = "You must enter a valid qualification ";
    } else {
        document.getElementById("Qualificationerror").innerHTML = "";
    }
    if (experience == "") {
        document.getElementById("Experienceerror").innerHTML = "You must enter a valid experience";
    } else {
        document.getElementById("Experienceerror").innerHTML = "";
    }


    let teacher = { 'id': id, 'name': names, 'DateOfBirth': DateOfBirth, 'email': email, 'PhoneNumber': number, 'Qualification': qualification, 'Experience': experience }

    teachers.push(teacher);

    if (names && DateOfBirth && email && number && qualification && experience) {
        if (id != "") {
            $.ajax({
                type: "PUT",
                dataType: 'JSON',
                data: { 'id': id, 'name': names, 'DateOfBirth': DateOfBirth, 'email': email, 'PhoneNumber': number, 'Qualification': qualification, 'Experience': experience },
                url: "https://63a165e9a543280f775523cb.mockapi.io/teacher/" + id,
                success: function (data) {
                    console.log(data)
                alert("edit the data")
                }
            })
        }
        else {
            $.post("https://63a165e9a543280f775523cb.mockapi.io/teacher", { 'name': names, 'DateOfBirth': DateOfBirth, 'email': email, 'PhoneNumber': number, 'Qualification': qualification, 'Experience': experience },
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
        url: "https://63a165e9a543280f775523cb.mockapi.io/teacher/" + id,
        method: 'GET',
        dataType: 'json',
        success: function (result) {
            console.log(result)
            $('#Name').val(result.name);
            $('#DateOfBirth').val(result.DateOfBirth);
            $('#Email').val(result.email);
            $('#PhoneNumber').val(result.PhoneNumber);
            $('#Qualification').val(result.Qualification);
            $('#Experience').val(result.Experience);
            edit_id = result.id
            $("#id").val(result.id)
        }
    });

}

function myFunction(id) {

    if (confirm("Are you sure you want to delete this item?")) {

        $.ajax({
            type: "DELETE",
            url: "https://63a165e9a543280f775523cb.mockapi.io/teacher/" + id,
            success: function (response) {

            }
        });
    } else {

    }
}
function buildTable() {
    $(document).ready(function () {

        $.ajax({
            url: "https://63a165e9a543280f775523cb.mockapi.io/teacher ",
            type: "GET",

            success: function (response) {

                var trHTML = '';

                $.each(response, function (i, item) {
                    trHTML +=
                        '<tr><td>' + item.id +
                        '</td><td>' + item.name +
                        '</td><td>' + item.DateOfBirth +
                        '</td><td>' + item.PhoneNumber +
                        '</td><td>' + item.email +
                        '</td><td>' + item.Qualification +
                        '</td><td>' + item.Experience +
                        '</td><td><button class="btn btn-primary" ><a style="color:white; text-decoration: none;" id="editbtn" href="http://127.0.0.1:5500/tform.html?id=' + item.id + '">Edit</a></button>' +
                        '</td><td><button  class="deletebtn btn btn-danger" onclick="myFunction(' + item.id + ')">Delete</td>' +
                        '</td></tr>';
                });
                $('#myTable').append(trHTML);
            }
        });

    });
}

