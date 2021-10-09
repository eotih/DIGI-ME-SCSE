const url = "http://localhost:59360/";

// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)

async function loadData() {
    fetch(url + "api/XemDanhSachTaiLieu")
        .then(function (response) {
            return response.json();
            // Sẽ trả dữ liệu về dạng json

        })
        .then(function (response) {
            var html = response.map(function (response) {
                console.log(response)
                const { ID, NamePDF, Iframe } = response;
                // Sẽ return ra hàm tbody

                return `<tr>
        <td>${ID}</td>
        <td>${NamePDF}</td>
        <td>
        <button onclick="deleteData(${ID})" class="btn btn-outline-primary">Delete</button></td>
        </tr>`;
            })
            // đây là hàm trả ra tbody
            $('.tbody').html(html);
        })
}

async function addData() {
    var dulieu = {
        Title: $('#Title').val(),
        Details: $('#summernote').summernote('code'),

    };
    fetch(url + "Api/Interface/AddOrEditDocument", {
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
async function getData(Slug) {
    fetch(url + "Api/Interface/GetBySlugDocument?slug=" + Slug)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { ID, Title, Slug, Details, CreatedByDate, UpdatedByDate } = response;
            $('#ID').val(ID);
            $('#Title').val(Title);
            $('#Slug').val(Slug);
            $('#Details').val(Details);
            $('#CreatedByDate').val(CreatedByDate);
            $('#UpdatedByDate').val(UpdatedByDate);
        })

    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();

}
async function updateData() {
    var dulieu = {
        ID: $('#ID').val(),
        Title: $('#Title').val(),
        Details: $('#Details').val(),
    };
    fetch(url + "Api/Interface/AddOrEditDocument", {
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
function getBaseUrl() {
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    reader.onloadend = function () {
        baseString = reader.result;
        $('#Image').val(baseString);
        document.getElementById("Image1").src = baseString;
    };
    reader.readAsDataURL(file);
    //console.log(baseString)
}

async function deleteData(ID) {
    fetch(url + "api/DeleteFile?id=" + ID, {
        method: 'DELETE',
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Success') {
                alert('Xoá thành công')
                window.location.reload();
            }
            else {
                alert('Data not delete')
            }
        })
}
function clearTextBox() {
    $('#IDPost').val("");
    $('#IDCat').val("");
    $('#Title').val("");
    $('#Slug').val("");
    $('#Details').val("");
    $('#Image').val("");
    $('#Video').val("");
    $('#Author').val("");
    $('#Status').val("");

    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}