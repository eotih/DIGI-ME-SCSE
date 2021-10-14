var getToken = parseJwt(localStorage.getItem("token"));

window.addEventListener('load', loadData)
function loadData() {
    try {
        var Roles = "";
        if (GetToken.nameid[2] === "Admin") {
            Roles = 1;
        }
        if (GetToken.nameid[2] === "Supporter") {
            Roles = 2;
        }
        if (GetToken.nameid[2] === "Mod") {
            Roles = 3;
        }
    }
    catch (e) {
        alert("Vui lòng đăng nhập")
        localStorage.removeItem("token");
        window.location.href = "http://127.0.0.1:5502/login.html"
    }
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
        localStorage.removeItem("token");
        window.location.href = "http://127.0.0.1:5502/login.html"
    }
};
