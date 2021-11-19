const WEB_API = "http://localhost:59360/";
var getToken = parseJwt(localStorage.getItem("token"));
window.addEventListener('load', getData)
async function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const slugResult = urlParams.get('Slug');
    fetch(WEB_API + "Management/GetByIdPosts?ID=" + slugResult)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { IDPost, IDCat, Title, IDField, Slug, Image, IDState, Details } = response;
            $('#IDPost').val(IDPost),
                $('#Category').val(IDCat),
                $('#linhvuc').val(IDField),
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
    var $data = {
        IDPost: $('#IDPost').val(),
        IDCat: $('#Category').val(),
        IDField: $('#linhvuc').val(),
        IDState: $('#State').val(),
        Title: $('#Title').val(),
        Details: $('#summernote').summernote('code'),
        Image: document.getElementById('img').src,
        Author: getToken.nameid[3],
    }
    fetch(WEB_API + "Management/AddOrEditPost", {
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
                window.location.href = "https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html"
            }
            else {
                alert('Data not update')
            }
        })
}

function addNoti(numb) {
    var $dataNoti = {};
    if (numb === 1) {
        $dataNoti.Title = 'Đăng Tải Bài Viết',
            $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
            $dataNoti.Decription = 'Người dùng ' + getToken.nameid[3] + ' đã thêm 1 bài viết',
            $dataNoti.Status = 'Chưa Xem',
            $dataNoti.Url = 'https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if (numb === 2) {
        $dataNoti.Title = 'Sửa Bài Viết',
            $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
            $dataNoti.Decription = 'Người dùng ' + getToken.nameid[3] + ' đã sửa 1 bài viết',
            $dataNoti.Status = 'Chưa Xem',
            $dataNoti.Url = 'https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if (numb === 3) {
        $dataNoti.Title = 'Xóa Bài Viết',
            $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
            $dataNoti.Decription = 'Người dùng ' + getToken.nameid[3] + ' đã xóa 1 bài viết',
            $dataNoti.Status = 'Chưa Xem',
            $dataNoti.Url = 'https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    fetch(WEB_API + "Management/Notification", {
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
