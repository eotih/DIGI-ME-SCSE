const BASE_URL = "http://localhost:59360/";
window.addEventListener('load', loadData)
async function loadData() {
    fetch(BASE_URL + "/User/XemDanhSachTaiKhoan")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                let { IDUser, FullName, Email, IsLocked, RoleName } = response;
                if (IsLocked === false) {
                    IsLocked = `<form id="toggleForm" class="form-check form-switch">
                    <input class="form-check-input" data-id="${IDUser}" type="checkbox" name="checkbox">
                  </form>`
                } else {
                    IsLocked = `<form id="toggleForm" class="form-check form-switch">
                    <input class="form-check-input" data-id="${IDUser}" type="checkbox" name="checkbox" checked>
                  </form>`
                }
                return `<tr>
                    <td>${IDUser}</td>
                    <td>${FullName}</td>
                    <td>${Email}</td>
                    <td>${IsLocked}</td>
                    <td>${RoleName}</td>
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
    if (toggleVal === 1) {
        IsLocked = 'True'
    } else {
        IsLocked = 'False'
    }
    let data = {
        IDUser: userID,
        IsLocked,
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
            const { IDUser, FullName, Email, IsActive, RoleName } = response;
            $('#IDUser').val(IDUser);
            $('#FullName').val(FullName);
            $('#Email').val(Email);
            $('#IsActive').val(IsActive);
            $('#IDRole').val(IDRole);
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
async function addData() {
    var dulieu = {
        FullName: $('#FullName').val(),
        Email: $('#Email').val(),
        IsActive: $('#IsActive').val(),
        IDRole: $('#IDRole').val()
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
        FullName: $('#FullName').val(),
        Email: $('#Email').val(),
        IsActive: $('#IsActive').val(),
        IDRole: $('#IDRole').val()
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
    $('#FullName').val("");
    $('#Email').val("");
    $('#IsActive').val("");
    $('#IDRole').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}

