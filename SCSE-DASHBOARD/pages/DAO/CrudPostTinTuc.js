const WEB_API = "https://api.scse-vietnam.org/";
var GetToken = parseJwt(localStorage.getItem("token"));
// ------------------------ TIẾNG VIỆT ------------------------ //

async function addPost() {
    var data = {
        Title: $('#tieude').val(),
        Details: $('#summernote').summernote('code'),
        IDField: $('#theloai').val(),
        Image: $('#hinhanh').val(),
        Author: GetToken.nameid[3],
    };
    fetch(WEB_API + "Management/AddOrEditNewsVN", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": "Bearer "+localStorage.getItem('token'),
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Success') {
                addNoti(1);
                alert('Thêm Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not insert')
            }
        })
}
// ------------------------ TIẾNG ANH ------------------------ //

window.addEventListener('load', getData)
function getData() {
    fetch(WEB_API + "Management/ListNewsNotVersionEN")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var Category = document.createElement("option");
            Category.innerHTML = "Vui lòng chọn";
            Category.value = 0;
            document.getElementById("PostVN").appendChild(Category);
            for (var i = 0; i < response.length; i++) {
                var ele = document.createElement("option");
                ele.value = response[i].IDNews;
                ele.innerHTML = response[i].Title;
                document.getElementById("PostVN").appendChild(ele);
            }
        })
}


async function addPostEN() {
    var data = {
        IDNewsEN: $('#PostVN').val(),
        IDField: $('#Category').val(),
        Title: $('#Title').val(),
        Details: $('#ENGPOST').summernote('code'),
        Image: $('#img').val(),
        Author: GetToken.nameid[3],
    };
    fetch(WEB_API + "Management/AddNewsEN", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": "Bearer "+localStorage.getItem('token'),
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Success') {
                addNoti(1);
                alert('Thêm Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not insert')
            }
        })
}
function addNoti(numb){
    var $dataNoti = {};
    if(numb === 1){
        $dataNoti.Title = 'Tin tức mới',
        $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
        $dataNoti.Decription = 'Người dùng ' +GetToken.nameid[3]+' đã đăng tải 1 tin tức mới',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if(numb === 2){
        $dataNoti.Title = 'Chỉnh sửa tin tức',
        $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
        $dataNoti.Decription = 'Người dùng ' +GetToken.nameid[3]+' đã chỉnh sửa 1 bài đăng',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if(numb === 3){
        $dataNoti.Title = 'Xóa tin tức',
        $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
        $dataNoti.Decription = 'Người dùng ' +GetToken.nameid[3]+' đã xóa 1 tin tức',
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