const WEB_API = "http://localhost:59360/";
window.addEventListener('load', getData)
async function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const slugResult = urlParams.get('Slug');
    fetch(WEB_API + "/Management/GetBySlugBaiViet?slug=" + slugResult)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { IDPost, IDCat, Title, Slug, Image, Author, IDState, Details } = response;
            $('#IDPost').val(IDPost),
                $('#IDCat').val(IDCat),
                $('#IDState').val(IDState),
                $('#Title').val(Title),
                $('#Slug').val(Slug),
                $('#summernote').summernote('code', Details),
                document.getElementById('img').src = Image;
            $('#Author').val(Author)
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
async function deleteTamThoi() {
    var dulieu = {
        IDPost: $('#IDPost').val(),
        IDCat: $('#Category').val(),
        IDState: 4,
        Title: $('#Title').val(),
        Slug: $('#Slug').val(),
        Details: $('#summernote').summernote('code'),
        Image: $('#img').val(),
        Author: $('#Author').val(),
    };
    console.table(dulieu)
    fetch(WEB_API + "Management/ThemBaiViet", {
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
                alert('Xóa Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
async function updateData() {
    var dulieu = {
        IDPost: $('#IDPost').val(),
        IDCat: $('#Category').val(),
        IDState: $('#State').val(),
        Title: $('#Title').val(),
        Slug: $('#Slug').val(),
        Details: $('#summernote').summernote('code'),
        Image: $('#img').val(),
        Author: $('#Author').val(),
    }
    fetch(WEB_API + "Management/ThemBaiViet", {
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