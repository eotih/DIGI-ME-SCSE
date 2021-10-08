const WEB_API = "http://localhost:59360/";
// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)

async function loadData() {
    fetch(WEB_API + "Api/Interface/ListPartner")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                const { ID, Name, Image, Field, Phone, Email, Address, Link } = response
                return `<tr>
                        <td>${ID}</td>
                        <td>${Name}</td>DDD
                        <td><img src="${Image}"/></td>
                        <td>${Field}</td>
                        <td>${Phone}</td>
                        <td>${Email}</td>
                        <td>${Address}</td>
                        <td>${Link}</td>
                        <td><a onclick="return getData(${ID})" class="btn btn-outline-primary">View</a>
                        <a onclick="return deleteData(${ID})" class="btn btn-outline-danger">Delete</a></td>
                        </tr>`;
            })
            // đây là hàm trả ra tbody
            $('#tbody').html(html);
            $(document).ready(function () {
                $('#dataTable').DataTable({
                    "order": [[0, "desc"]]
                });
            });
        })
}(jQuery);
async function getData(ID) {
    fetch(WEB_API + "Api/Interface/GetByIdPartner?ID=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { Image, Name, Field, Phone, Email, Address, Link } = response;
            $('#ID').val(ID),
                document.getElementById("Image").src = Image;
            $('#Name').val(Name);
            $('#Field').val(Field);
            $('#Phone').val(Phone);
            $('#Email').val(Email);
            $('#Address').val(Address);
            $('#Link').val(Link);
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
    fetch(WEB_API + "Api/Interface/DeletePartner?ID=" + ID, {
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