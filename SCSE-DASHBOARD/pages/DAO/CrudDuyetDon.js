const WEB_API = "http://localhost:59360/";
// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)

async function loadData() {
    fetch(WEB_API + "/Management/XemDanhSachDangKy")
        .then(function (response) {
            return response.json();
            // Sẽ trả dữ liệu về dạng json
        })
        .then(function (response) {
            var html = response.map(function (response) {
                // Sẽ return ra hàm tbody
                return `<tr>
        <td>${response.ID}</td>
        <td>${response.FirstName}</td>
        <td>${response.LastName}</td>
        <td>${response.DOB}</td>
        <td>${response.Phone}</td>
        <td>${response.Email}</td>
        <td>${response.Address}</td>
        <td>${response.Project}</td>
        <td>${response.Purpose}</td>
        <td><button onclick="return getData(${response.ID})" class="btn btn-outline-primary">View</button></td>
        <td><button onclick="return deleteData(${response.ID})" class="btn btn-outline-primary">Delete</button><td>
        </tr>`;
            })
            // đây là hàm trả ra tbody
            $('.tbody').html(html);
        })
}
async function getData(ID) {
    fetch(WEB_API + "/Management/GetByIdNguoiDangKy?id=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            $('#ID').val(response.ID);
            $('#FirstName').val(response.FirstName);
            $('#LastName').val(response.LastName);
            $('#DOB').val(response.DOB);
            $('#Phone').val(response.Phone);
            $('#Email').val(response.Email);
            $('#Address').val(response.Address);
            $('#Project').val(response.Project);
            $('#Purpose').val(response.Purpose);
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
async function addData() {
    var $data = {
        FirstName: $('#FirstName').val(),
        LastName: $('#LastName').val(),
        DOB: $('#DOB').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        Project: $('#Project').val(),
        Purpose: $('#Purpose').val(),
    };
    fetch(WEB_API + "Management/DangKiThamGia", {
        method: 'POST',
        body: JSON.stringify($data),
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
        FirstName: $('#FirstName').val(),
        LastName: $('#LastName').val(),
        DOB: $('#DOB').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        Project: $('#Project').val(),
        Purpose: $('#Purpose').val(),
    };
    fetch(WEB_API + "/User/ThemTaiKhoan", {
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
async function deleteData(ID) {
    fetch(WEB_API + "Management/XoaNguoiDangKy?id="+ID,{
        method: 'DELETE',
    }).then(function (response){
        return response.json()
    })
        .then(function (data){
            if(data.Status === 'Delete') {
                alert('Xoá thành công')
                window.location.reload();
            }
            else {
                alert('Data not delete')
            }
        })
}
function clearTextBox() {
    $('#ID').val("");
    $('#FirstName').val("");
    $('#LastName').val("");
    $('#DOB').val("");
    $('#Phone').val("");
    $('#Email').val("");
    $('#Address').val("");
    $('#Project').val("");
    $('#Purpose').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}