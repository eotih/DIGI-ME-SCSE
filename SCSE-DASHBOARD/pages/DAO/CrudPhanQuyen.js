const BASE_URL = "http://localhost:59360/";

var GetToken = parseJwt(localStorage.getItem("token"));

var current = window.location.href;
var Role="";
if(GetToken.nameid[2] === "Admin"){
    Role=1;
}
if(GetToken.nameid[2] === "Supporter"){
    Role=2;
}
if(GetToken.nameid[2] === "Mod"){
    Role=3;
}
console.log(Role);
switch(Role){
    case 2:
        if(current === "http://127.0.0.1:5502/pages/Admin/ToChuc/index.html"){
            window.location.href = "http://127.0.0.1:5502/index.html"
        }
        break;
    case 3:
        if(current !== "http://127.0.0.1:5502/QuanLy/DangBai/Index.html"){
            window.location.href = "http://127.0.0.1:5502/QuanLy/DangBai/Index.html"
        }
        if(current === "http://127.0.0.1:5502/pages/ThongTinCaNhan/index.html")
            window.location.href = "http://127.0.0.1:5502/pages/ThongTinCaNhan/index.html"
        break;
}
// if(GetToken.nameid[2] !== "Admin" && current === "http://127.0.0.1:5502/pages/Admin/ToChuc/index.html") {
//     window.location.href = "http://127.0.0.1:5502/index.html"
// }
// if(GetToken.nameid[2] === "Mod" && current !== "http://127.0.0.1:5502/QuanLy/DangBai/Index.html"){
//     window.location.href = "http://127.0.0.1:5502/QuanLy/DangBai/Index.html"
// }
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};
    