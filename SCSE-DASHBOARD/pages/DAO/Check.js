var jwtdata = localStorage.getItem("token");
if (jwtdata == null) {
    window.location.href = "../samples/login.html"
}
else {
    var role = parseJwt(localStorage.getItem("token"));
    if (role.nameid[1] === "Admin") {
        loadData()
    }
    else {
        alert('Cútttttttttttttttt')
        window.location.href = "../QuanLy/DangBai/Index.html"
    }
}
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};