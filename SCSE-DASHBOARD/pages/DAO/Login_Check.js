const CHECK = "http://localhost:59360/";

var getToken = parseJwt(localStorage.getItem("token"));

window.addEventListener('load', loadData)
function loadData() {
    try {
        fetch(CHECK + "/API/User/GetByIdTaiKhoan?iduser=" + getToken.nameid[6])
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                const { IDUser, Username, Password, FullName, Email, IDState, IDRole } = response;
                var Roles = "";
                if (getToken.nameid[2] === "Admin") {
                    Roles = 1;
                }
                if (getToken.nameid[2] === "Supporter") {
                    Roles = 2;
                }
                if (getToken.nameid[2] === "Mod") {
                    Roles = 3;
                }
                if (getToken.nameid[6] !== IDUser.toString()
                    || getToken.nameid[1] !== Username
                    || Roles !== IDRole
                    || getToken.nameid[3] !== FullName
                    || getToken.nameid[4] !== Password
                    || getToken.nameid[5] !== Email
                    || getToken.nameid[0] !== IDState.toString()) {
                    localStorage.removeItem("token");
                    window.location.href = "http://127.0.0.1:5502/login.html"
                }
            })
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
