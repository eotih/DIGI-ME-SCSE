const WEB_API = "https://api.scse-vietnam.org/API/";

var GetToken = parseJwt(localStorage.getItem("token"));
window.addEventListener('load', getData)
async function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const slugResult = urlParams.get('Slug');
    fetch(WEB_API + "Management/GetBySlugNewsEN?slugEN=" + slugResult)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { IDNewsEN, IdField, Title, Slug, Image, IDState, Details } = response;
            $('#IDNews').val(IDNewsEN),
                $('#IdField').val(IdField),
                $('#IDState').val(IDState),
                $('#Title').val(Title),
                $('#Slug').val(Slug),
                $('#summernote').summernote('code', Details),
                document.getElementById('img').src = Image;
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}

async function updateData() {
    var data = {
        IDNewsEN: $('#IDNews').val(),
        IdField: $('#Category').val(),
        IDState: $('#State').val(),
        Title: $('#Title').val(),
        Details: $('#summernote').summernote('code'),
        Image: document.getElementById('img').src,
        Author: GetToken.nameid[3],
    }
    console.log(data)
    fetch(WEB_API + "Management/EditNewsEN", {
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
                window.location.href = "http://127.0.0.1:5502/pages/Admin/TinTuc/Index.html"
            }
            else {
                alert('Data not update')
            }
        })
}
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};