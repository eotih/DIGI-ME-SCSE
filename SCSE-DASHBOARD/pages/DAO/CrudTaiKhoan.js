const BASE_URL = "http://localhost:59360/";

async function updateLocked(toggleVal, userID) {
    let data = {
        IDUser: userID,
        StateName,
    }
    console.log(JSON.stringify(data))
    fetch(BASE_URL + "/User/ThemTaiKhoan", {
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
async function getData(ID) {
    fetch(BASE_URL + "/User/GetByIdTaiKhoan?iduser=" + ID)
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
    $('#add').hide();
    $('#edit').show();
}
async function addData() {
    var dulieu = {
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
    fetch(BASE_URL + "/User/ThemTaiKhoan", {
        method: 'POST',
        body: JSON.stringify(dulieu),
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
    var dulieu = {
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
    fetch(BASE_URL + "/User/ThemTaiKhoan", {
        method: 'POST',
        body: JSON.stringify(dulieu),
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
    fetch(BASE_URL + "/User/GetByIdTaiKhoan?iduser=" + IDUser)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { IDUser} = response;
            $('#ID').val(IDUser);
            $('#State').val("4");
        })
    $('#exampleModal').modal('show');
    $('#edit').show();
}

async function updateDelete() {
    var dulieu = {
        IDUser: $('#ID').val(),
        IDState: $('#State').val(),
    };
    fetch(BASE_URL + "/User/EditState", {
        method: 'POST',
        body: JSON.stringify(dulieu),
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
        fetch(BASE_URL + "User/XemDanhSachTaiKhoan")
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
                    if(IDState === 1){
                        StateName = '<div class="badge badge-opacity-warning">Pending</div>'
                    }
                    if(IDState === 2){
                        StateName = '<div class="badge badge-opacity-success">Approved</div>'
                    }
                    if(IDState === 3){
                        StateName = '<div class="badge badge-opacity-danger">NotApproved</div>'
                    }
                    if(IDState === 4){
                        StateName = '<div class="badge badge-opacity-danger">Deleted</div>'
                    }
                    return `<tr>
                    <td>${IDUser}</td>
                    <td>${FullName}</td>
                    <td>${Email}</td>
                    <td>${StateName}</td>
                    <td>${RoleName}</td>
                    <td><img src='${Image}'/></td>
                    <td><button onclick="return getData(${IDUser})" class="btn btn-outline-primary">View</button> <button onclick="return deleteData(${IDUser})" class="btn btn-outline-danger">Xoá</button></td>
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