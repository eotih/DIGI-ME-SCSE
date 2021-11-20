const WEB_API = "https://api.scse-vietnam.org/";

var GetToken = parseJwt(localStorage.getItem("token"));
window.addEventListener('load', getData)
async function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const slugResult = urlParams.get('Slug');
    fetch(WEB_API + "Management/GetByIdNewsVN?ID=" + slugResult)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { IDNews, IdField, Title, Slug, Image, IDState, Details } = response;
            $('#IDNews').val(IDNews),
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
    var $data = {
        IDNews: $('#IDNews').val(),
        IdField: $('#Category').val(),
        IDState: $('#State').val(),
        Title: $('#Title').val(),
        Details: $('#summernote').summernote('code'),
        Image: document.getElementById('img').src,
        Author: GetToken.nameid[3],
    }
    fetch(WEB_API + "Management/AddOrEditNewsVN", {
        method: 'POST',
        body: JSON.stringify($data),
        headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer "+localStorage.getItem('token'),
    },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Updated') {
                addNoti(2)
                alert('Sửa Thành Công')
                window.location.href = "https://cms.scse-vietnam.org/pages/Admin/TinTuc/Index.html"
            }
            else {
                alert('Data not update')
            }
        })
}


function addNoti(numb){
    var $dataNoti = {};
    if(numb === 1){
        $dataNoti.Title = 'Tin tức mới',
        $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
        $dataNoti.Decription = 'Người dùng ' +getToken.nameid[3]+' đã đăng tải 1 tin tức mới',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if(numb === 2){
        $dataNoti.Title = 'Chỉnh sửa tin tức',
        $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
        $dataNoti.Decription = 'Người dùng ' +getToken.nameid[3]+' đã chỉnh sửa 1 bài đăng',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if(numb === 3){
        $dataNoti.Title = 'Xóa tin tức',
        $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
        $dataNoti.Decription = 'Người dùng ' +getToken.nameid[3]+' đã xóa 1 tin tức',
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