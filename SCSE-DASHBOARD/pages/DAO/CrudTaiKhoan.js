const BASE_URL = "http://localhost:59360/";
window.addEventListener('load', loadData)
async function loadData() {
    fetch(BASE_URL + "/User/XemDanhSachTaiKhoan")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                let { IDUser, FullName, Email, StateName, RoleName, Image } = response;
                
                return `<tr>
                    <td>${IDUser}</td>
                    <td>${FullName}</td>
                    <td>${Email}</td>
                    <td>${StateName}</td>
                    <td>${RoleName}</td>
                    <td><img src="${Image}"></td>
                    <td><button onclick="return getData(${IDUser})" class="btn btn-outline-primary">View</button></td>
                    </tr>`;
            })
            $('.tbody').html(html);
            var checkbox = document.querySelector("input[name=checkbox]");
            var userID = checkbox.getAttribute('data-id');
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    updateLocked(1, userID)
                } else {
                    updateLocked(0, userID)
                }
            });
        })
}
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
            const { IDUser, Username, Password, Image , FullName, Email, Phone, IDState, IDRole , Sex } = response;
            $('#IDUser').val(IDUser);
            $('#UserName').val(Username);
            $('#Password').val(Password);
            document.getElementById('img').src=Image;
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
function clearTextBox() {
    $('#IDUser').val("");
    $('#UserName').val("");
    $('#Password').val("");
    $('#img').val("");
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

