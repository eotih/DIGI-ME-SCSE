const WEB_API = "http://localhost:59360/API/";

// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)

async function loadData() {
    fetch(WEB_API + "ShowAllDocument")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
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
    var data = {
        Title: $('#Title').val(),
        Details: $('#summernote').summernote('code'),

    };
    fetch(WEB_API + "Interface/AddOrEditDocument", {
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
async function getData(Slug) {
    fetch(WEB_API + "Interface/GetBySlugDocument?slug=" + Slug)
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
    var data = {
        ID: $('#ID').val(),
        Title: $('#Title').val(),
        Details: $('#Details').val(),
    };
    fetch(WEB_API + "Interface/AddOrEditDocument", {
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
function getBaseWEB_API() {
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    reader.onloadend = function () {
        baseString = reader.result;
        $('#Image').val(baseString);
        document.getElementById("Image1").src = baseString;
    };
    reader.readAsDataWEB_API(file);
    //console.log(baseString)
}

async function deleteData(ID) {
    fetch(WEB_API + "Interface/DeleteDocument?id=" + ID, {
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