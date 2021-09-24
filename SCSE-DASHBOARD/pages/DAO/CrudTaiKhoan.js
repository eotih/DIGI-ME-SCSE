
const url = "http://localhost:59360/";
// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)
async function loadData() {
    fetch(url + "/User/XemDanhSachTaiKhoan")
        .then(function (response) {
            return response.json();
            // Sẽ trả dữ liệu về dạng json
        })
        .then(function (response) {
            var html = response.map(function (response) {
                const { IDUser, FullName, Email, IsActive, RoleName } = response;
                // Sẽ return ra hàm tbody
                return `<tr>
                    <td>${IDUser}</td>
                    <td>${FullName}</td>
                    <td>${Email}</td>
                    <td>${IsActive}</td>
                    <td>${RoleName}</td>
                    <td><button onclick="return getData(${IDUser})" class="btn btn-outline-primary">View</button></td>
                    </tr>`;
            })
            // đây là hàm trả ra tbody
            $('.tbody').html(html);
        })
}
async function getData(ID) {
    fetch(url + "/User/GetByIdTaiKhoan?iduser=" + ID)
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
    fetch(url + "/User/ThemTaiKhoan", {
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
    fetch(url + "/User/ThemTaiKhoan", {
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

