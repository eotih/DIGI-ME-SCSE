
var GetToken = parseJwt(localStorage.getItem("token"));

var current = window.location.href;
var Role = "";
if (GetToken.nameid[2] === "Admin") {
    Role = 1;
}
if (GetToken.nameid[2] === "Supporter") {
    Role = 2;
}
if (GetToken.nameid[2] === "Mod") {
    Role = 3;
}
switch (Role) {
    case 2:
        if (current === "https://cms.scse-vietnam.org/pages/Admin/ToChuc/Ban-Giam-Doc.html"
        || current === "https://cms.scse-vietnam.org/pages/Admin/ToChuc/Thembanthanhvien.html"
        || current === "https://cms.scse-vietnam.org/pages/Admin/ToChuc/EditBGD.html"
        || current === "https://cms.scse-vietnam.org/pages/Admin/Bank/Bank.html"
        || current === "https://cms.scse-vietnam.org/pages/Admin/Banner/Banner.html"
        || current === "https://cms.scse-vietnam.org/pages/Admin/QuanLyTaiKhoan.html"
        || current === "https://cms.scse-vietnam.org/pages/Admin/DeleteQuanLyTaiKhoan.html"
        ) {
            window.location.href = "https://cms.scse-vietnam.org/index.html"
        }
        break;
    case 3:
        if (current === "https://cms.scse-vietnam.org/pages/Admin/BaiDang/Baiviet.html"
            || current === "https://cms.scse-vietnam.org/pages/Admin/TinTuc/PostTinTuc.html"
            || current === "https://cms.scse-vietnam.org/pages/ThongTinCaNhan/Thongtincanhan.html"
        ) {

        }
        else {
            window.location.href = "https://cms.scse-vietnam.org/pages/Admin/BaiDang/Baiviet.html"
        }
        break;
}
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};
