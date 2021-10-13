var getToken = parseJwt(localStorage.getItem("token"));
if (getToken.nameid.length !== 7) {
    alert("Vui lòng đăng nhập")
    window.location.href = "http://127.0.0.1:5502/login.html"
}
function parseJwt(token) {
    try{
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
