var getToken = parseJwt(localStorage.getItem("token"));
// // Hàm này còn phải check dữ liệu coi có đúng người không!
// // Để tránh trường hợp chỉ cần add new token là xong
// // Trong lúc check xem kiểm tra token đưa vào có đúng chuẩn hay không !
// if (getToken.nameid.length !== 7) {
//     alert("Vui lòng đăng nhập")
//     window.location.href = "http://127.0.0.1:5502/login.html"
// }
try{
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
}
catch (e) {
    alert("Vui lòng đăng nhập")
    window.location.href = "http://127.0.0.1:5502/login.html"
}

function parseJwt(token) {
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
    catch (e) {
        window.location.href = "http://127.0.0.1:5502/login.html"
    }
};
