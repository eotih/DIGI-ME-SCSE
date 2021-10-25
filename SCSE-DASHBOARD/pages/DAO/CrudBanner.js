const WEB_API = "https://api.scse-vietnam.org/API/";
// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}
async function loadData() {
    fetch(WEB_API + "Interface/ListBanner")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                const { ID, Name, Image, CreatedByUser, CreatedByDate, UpdateByUser, UpdatedByDate } = response
                return `<tr>
                        <td>${ID}</td>
                        <td>${Name}</td>DDD
                        <td><img src="${Image}"/></td>
                        <td>${convertDate(CreatedByDate)}</td>
                        <td>${convertDate(UpdatedByDate)}</td>
                        <td><a onclick="return getData(${ID})" class="btn btn-outline-primary">Xem chi tiết</a>
                        <a onclick="return deleteData(${ID})" class="btn btn-outline-danger">Xóa</a></td>
                        </tr>`;
            })
            // đây là hàm trả ra tbody
            $('#tbody').html(html);
            
        })
}
async function getData(ID) {
    fetch(WEB_API + "Interface/GetByIdBanner?ID=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { Image, Name, CreatedByUser, CreatedByDate, UpdateByUser, UpdatedByDate } = response;
            $('#ID').val(ID),
                document.getElementById("Image").src = Image;
            $('#Name').val(Name);
            $('#CreatedByUser').val(CreatedByUser);
            $('#CreatedByDate').val(CreatedByDate);
            $('#UpdateByUser').val(UpdateByUser);
            $('#UpdatedByDate').val(UpdatedByDate);
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
function getBaseUrl() {
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    reader.onloadend = function () {
        baseString = reader.result;
        $('#Img').val(baseString);
        document.getElementById("Image").src = baseString;
        // return autoUpdate(baseString);
    };
    reader.readAsDataURL(file);
}
async function addData() {
    var $data = {
        Name: $('#Name').val(),
        Image: $('#Img').val(),
        CreatedByUser: $('#CreatedByUser').val(),
        CreatedByDate: $('#CreatedByDate').val(),
        UpdateByUser: $('#UpdateByUser').val(),
        UpdatedByDate: $('#UpdatedByDate').val(),
    };
    fetch(WEB_API + "Interface/AddOrEditBanner", {
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
    var $data = {
        ID: $('#ID').val(),
        Name: $('#Name').val(),
        Image: $('#Img').val(),
        CreatedByUser: $('#CreatedByUser').val(),
        CreatedByDate: $('#CreatedByDate').val(),
        UpdateByUser: $('#UpdateByUser').val(),
        UpdatedByDate: $('#UpdatedByDate').val(),
    };
    fetch(WEB_API + "Interface/AddOrEditBanner", {
        method: 'POST',
        body: JSON.stringify($data),
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
    if (confirm('Bạn có muốn xoá tài khoản?')) {
    fetch(WEB_API + "Interface/DeleteBanner?ID=" + ID, {
        method: 'DELETE',
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Delete') {
                alert('Xoá thành công')
                window.location.reload();
            }
            else {
                alert('Data not delete')
            }
        })
    }
}
function clearTextBox() {
    $('#ID').val("");
    $('#Name').val("");
    $('#Img').val("");
    $('#CreatedByUser').val("");
    $('#CreatedByDate').val("");
    $('#UpdateByUser').val("");
    $('#UpdatedByDate').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}