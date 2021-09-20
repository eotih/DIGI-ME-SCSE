const WEB_API = "http://localhost:59360/";
// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)

async function loadData() {
    fetch(WEB_API + "/Api/Interface/ListPartner")
        .then(function (response) {
            return response.json();
            // Sẽ trả dữ liệu về dạng json
        })
        .then(function (response) {
            var html = response.map(function (response) {
                // Sẽ return ra hàm tbody
                return `<tr>
        <td>${response.ID}</td>
        <td>${response.Name}</td>
        <td><img src="${response.Image}"/></td>
        <td>${response.Field}</td>
        <td>${response.Phone}</td>
        <td>${response.Email}</td>
        <td>${response.Address}</td>
        <td>${response.Link}</td>
        <td><button onclick="return getData(${response.ID})" class="btn btn-outline-primary">View</button></td>
        <td><button onclick="return deleteData(${response.ID})" class="btn btn-outline-primary">Delete</button><td>
        </tr>`;
            })
            // đây là hàm trả ra tbody
            $('.tbody').html(html);
        })
}
async function getData(ID) {
    fetch(WEB_API + "Api/Interface/GetByIdPartner?ID=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            $('#ID').val(response.ID),document.getElementById("Image").src = response.Image;
            $('#Name').val(response.Name);
            $('#Field').val(response.Field);
            $('#Phone').val(response.Phone);
            $('#Email').val(response.Email);
            $('#Address').val(response.Address);
            $('#Link').val(response.Link);
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
        // console.log(baseString)
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
        Field: $('#Field').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        Link: $('#Link').val(),
    };
    fetch(WEB_API + "Api/Interface/AddOrEditPartner", {
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
        Field: $('#Field').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        Link: $('#Link').val(),
    };
    fetch(WEB_API + "Api/Interface/AddOrEditPartner", {
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
    fetch(WEB_API + "Api/Interface/DeletePartner?ID="+ID,{
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
    $('#Name').val("");
    $('#Img').val("");
    $('#Field').val("");
    $('#Phone').val("");
    $('#Email').val("");
    $('#Address').val("");
    $('#Link').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}