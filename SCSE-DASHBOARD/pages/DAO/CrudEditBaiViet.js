<<<<<<< HEAD
const WEB_API = "http://localhost:59360/";
var getToken = parseJwt(localStorage.getItem("token"));

=======
const WEB_API = "http://localhost:59360/API/";
>>>>>>> c247a2b6fbff74c8c11708a9f237940a29b39791
window.addEventListener('load', getData)
async function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const slugResult = urlParams.get('Slug');
<<<<<<< HEAD
    fetch(WEB_API + "API/Management/GetBySlugPost?slug=" + slugResult)
=======
    fetch(WEB_API + "Management/GetBySlugPost?slug=" + slugResult)
>>>>>>> c247a2b6fbff74c8c11708a9f237940a29b39791
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
async function updateData() {
    var $data = {
        IDPost: $('#IDPost').val(),
        IDCat: $('#Category').val(),
        IDState: $('#State').val(),
        Title: $('#Title').val(),
        Details: $('#summernote').summernote('code'),
        Image: document.getElementById('img').src,
        Author: $('#Author').val(),
    }
<<<<<<< HEAD
    console.log(dulieu)
    fetch(WEB_API + "API/Management/AddOrEditPost", {
=======
    fetch(WEB_API + "Management/AddOrEditPost", {
>>>>>>> c247a2b6fbff74c8c11708a9f237940a29b39791
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
                addNoti(2);
                alert('Sửa Thành Công')
                window.location.href = "http://127.0.0.1:5502/pages/Admin/BaiDang/QuanLyBaiDang.html"
            }
            else {
                alert('Data not update')
            }
        })
<<<<<<< HEAD
}

function addNoti(numb){
    var $dataNoti = {};
    if(numb === 1){
        $dataNoti.Title = 'Đăng Tải Bài Viết',
        $dataNoti.Image = 'http://127.0.0.1:5500/images/faces/dangbai.jpg',
        $dataNoti.Decription = 'Người dùng ' +getToken.nameid[3]+' đã thêm 1 bài viết',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'http://127.0.0.1:5500/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if(numb === 2){
        $dataNoti.Title = 'Sửa Bài Viết',
        $dataNoti.Image = 'http://127.0.0.1:5500/images/faces/dangbai.jpg',
        $dataNoti.Decription = 'Người dùng ' +getToken.nameid[3]+' đã sửa 1 bài viết',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'http://127.0.0.1:5500/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if(numb === 3){
        $dataNoti.Title = 'Xóa Bài Viết',
        $dataNoti.Image = 'http://127.0.0.1:5500/images/faces/dangbai.jpg',
        $dataNoti.Decription = 'Người dùng ' +getToken.nameid[3]+' đã xóa 1 bài viết',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'http://127.0.0.1:5500/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    fetch(WEB_API + "API/Management/Notification", {
        method: 'POST',
        body: JSON.stringify($dataNoti),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(function (response) {
        return response.json()
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
=======
}
>>>>>>> c247a2b6fbff74c8c11708a9f237940a29b39791
