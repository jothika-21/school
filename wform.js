let list = []
let workers = []

function validate() {

    const names = document.getElementById("Name").value;
    const email = document.getElementById("Email").value;
    const number = document.getElementById("PhoneNumber").value;
    const work = document.getElementById("Work").value;
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
    if (work == "") {
        document.getElementById("workerror").innerHTML = "You must enter a valid work name ";
    } else {
        document.getElementById("workerror").innerHTML = "";
    }
    if (address == "") {
        document.getElementById("addresserror").innerHTML = "You must enter a valid address";
    } else {
        document.getElementById("addresserror").innerHTML = "";
    }


    let worker = { 'id': id, 'name': names, 'email': email, 'PhoneNumber': number, 'Work': work, 'Address': address }

    workers.push(worker);

    if (names && email && number && work && address) {
        if (id != "") {
            $.ajax({
                type: "PUT",
                dataType: 'JSON',
                data: { 'id': id, 'name': names, 'email': email, 'PhoneNumber': number, 'Work': work, 'Address': address },
                url: "https://63a165e9a543280f775523cb.mockapi.io/worker/" + id,
                success: function (data) {
                    console.log(data)
                    alert("edit the data")
                }
            })
        }
        else {
            $.post("https://63a165e9a543280f775523cb.mockapi.io/worker", { 'name': names, 'email': email, 'PhoneNumber': number, 'Work': work, 'Address': address },
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
        url: "https://63a165e9a543280f775523cb.mockapi.io/worker/" + id,
        method: 'GET',
        dataType: 'json',
        success: function (result) {
            console.log(result)
            $('#Name').val(result.name);
            $('#Email').val(result.email);
            $('#PhoneNumber').val(result.PhoneNumber);
            $('#Work').val(result.Work);
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
            url: "https://63a165e9a543280f775523cb.mockapi.io/worker/" + id,
            success: function (response) {

            }
        });
    } else {

    }
}
function buildTable() {
    $(document).ready(function () {

        $.ajax({
            url: "https://63a165e9a543280f775523cb.mockapi.io/worker ",
            type: "GET",

            success: function (response) {

                var trHTML = '';

                $.each(response, function (i, item) {
                    trHTML +=
                        '<tr><td>' + item.id +
                        '</td><td>' + item.name +
                        '</td><td>' + item.email +
                        '</td><td>' + item.PhoneNumber +
                        '</td><td>' + item.Work +
                        '</td><td>' + item.Address +
                        '</td><td><button class="btn btn-primary" ><a style="color:white; text-decoration: none;" id="editbtn" href="http://127.0.0.1:5500/wform.html?id=' + item.id + '">Edit</a></button>' +
                        '</td><td><button  class="deletebtn btn btn-danger" onclick="myFunction(' + item.id + ')">Delete</td>' +
                        '</td></tr>';
                });
                $('#myTable').append(trHTML);
            }
        });

    });
}