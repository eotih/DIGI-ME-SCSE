const WEB_API = "http://localhost:59360/API/";

async function getData(ID) {
    fetch(WEB_API + "User/GetByIdAccount?iduser=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { IDUser, Username, Password, Image, FullName, Email, Phone, IDState, IDRole, Sex } = response;
            $('#IDUser').val(IDUser);
            $('#UserName').val(Username);
            $('#Password').val(Password);
            document.getElementById('img').src = Image;
            $('#FullName').val(FullName);
            $('#Email').val(Email);
            $('#Phone').val(Phone);
            $('#IDState').val(IDState);
            $('#IDRole').val(IDRole);
            $('#Sex').val(Sex);
        })
    $('#exampleModal-2').modal('show');
    $('#formPassword').hide();
    $('#add').hide();
    $('#edit').show();
}
function getDataPass(ID) {
    $('#IDReset').val(ID);
    $('#Modal').modal('show');
}
async function addData() {
    var data = {
        Username: $('#UserName').val(),
        Password: $('#Password').val(),
        Image: $('#img').val(),
        FullName: $('#FullName').val(),
        Email: $('#Email').val(),
        Phone: $('#Phone').val(),
        IDState: $('#IDState').val(),
        IDRole: $('#IDRole').val(),
        Sex: $('#Sex').val(),
    };
    fetch(WEB_API + "User/AddOrEditAccount", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Success') {
                alert('Thêm Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not insert')
            }
        })
}
async function updateData() {
    var data = {
        IDUser: $('#IDUser').val(),
        Username: $('#UserName').val(),
        Password: $('#Password').val(),
        Image: document.getElementById('img').src,
        FullName: $('#FullName').val(),
        Email: $('#Email').val(),
        Phone: $('#Phone').val(),
        IDState: $('#IDState').val(),
        IDRole: $('#IDRole').val(),
        Sex: $('#Sex').val(),
    };
    fetch(WEB_API + "User/AddOrEditAccount", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Updated') {
                alert('Sửa Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
async function resetPassword() {
    let data = {
        IDUser: $('#IDReset').val(),
        Password: $('#PasswordReset').val(),
    }
    fetch(WEB_API + "User/EditPasswordAccount", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Updated') {
                alert('Sửa Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
async function deleteData(IDUser) {
    fetch(WEB_API + "User/DeleteAccount?iduser=" + IDUser)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { IDUser } = response;
            $('#ID').val(IDUser);
            $('#State').val("4");
        })
    $('#exampleModal').modal('show');
    $('#edit').show();
}

async function updateDelete() {
    var data = {
        IDUser: $('#ID').val(),
        IDState: $('#State').val(),
    };
    fetch(WEB_API + "/User/EditState", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Updated') {
                alert('Xoá Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
    clearDelete();
}
function clearDelete() {
    $('#User').val("");
    $('#Name').val("");
    $('#Pass').val("");
    document.getElementById('Stock').src = "";
    $('#Name').val("");
    $('#Mail').val("");
    $('#Phones').val("");
    $('#State').val("");
    $('#Role').val("");
    $('#Gender').val("");
}
function clearTextBox() {
    $('#IDUser').val("");
    $('#UserName').val("");
    $('#Password').val("");
    document.getElementById('img').src = "";
    $('#FullName').val("");
    $('#Email').val("");
    $('#Phone').val("");
    $('#IDState').val("");
    $('#IDRole').val("");
    $('#Sex').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}

(function ($) {
    'use strict';
    $(function () {
        fetch(WEB_API + "User/ShowAllAccount")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var deleted = response.filter(v => v.IDState === 4);
                $('#deleteCount').text(deleted.length);
                var result = response.filter(v => v.IDState !== 4)
                var html = result.map(function (response) {
                    let { IDUser, FullName, Email, IDState, RoleName, Image } = response;
                    var StateName = "";
                    if (IDState === 1) {
                        StateName = '<div class="badge badge-opacity-warning">Pending</div>'
                    }
                    if (IDState === 2) {
                        StateName = '<div class="badge badge-opacity-success">Approved</div>'
                    }
                    if (IDState === 3) {
                        StateName = '<div class="badge badge-opacity-danger">NotApproved</div>'
                    }
                    if (IDState === 4) {
                        StateName = '<div class="badge badge-opacity-danger">Deleted</div>'
                    }
                    return `<tr>
                    <td>${IDUser}</td>
                    <td>${FullName}</td>
                    <td>${Email}</td>
                    <td>${StateName}</td>
                    <td>${RoleName}</td>
                    <td><img src='${Image}'/></td>
                    <td><button onclick="return getData(${IDUser})" class="btn btn-outline-primary">View</button>
                    <button onclick="return getDataPass(${IDUser})" class="btn btn-outline-warning">Reset Password</button>
                    <button onclick="return deleteData(${IDUser})" class="btn btn-outline-danger">Xoá</button></td>
                    </tr>`;
                })
                $('#tbody').html(html);
                $(document).ready(function () {
                    $('#dataTable').DataTable({
                        "order": [[0, "desc"]]
                    });
                });
            })
            .catch(error => {
                throw error;
            })
    });
})(jQuery);