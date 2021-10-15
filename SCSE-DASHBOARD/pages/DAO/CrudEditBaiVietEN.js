const WEB_API = "http://localhost:59360/";
window.addEventListener('load', getData)
async function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const slugResult = urlParams.get('Slug');
    fetch(WEB_API + "/Management/GetBySlugBaiVietEN?slugen=" + slugResult)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { IDPostEN, IDCat, Title, Slug, Image, Author, IDState, Details } = response;
            $('#IDPost').val(IDPostEN),
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

async function updateData() {
    var dulieu = {
        IDPostEN: $('#IDPost').val(),
        IDCat: $('#Category').val(),
        IDState: $('#State').val(),
        Title: $('#Title').val(),
        Details: $('#summernote').summernote('code'),
        Image: $('#img').val(),
        Author: $('#Author').val(),
    }
    console.log(dulieu)
    fetch(WEB_API + "Management/SuaBaiVietEN", {
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