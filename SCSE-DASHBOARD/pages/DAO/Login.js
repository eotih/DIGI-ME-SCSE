const WEB_API = "http://localhost:59360/";
function loginAdmin() {
    var Username = $('#Username').val();
    var Password = $('#Password').val();
    fetch(WEB_API + "User/Login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Username: Username,
            Password: Password
        })
    }).then((Response) => Response.json())
        .then((result) => {
            if (result.Status === 'Success') {
                var resultInfo = parseJwt(result.Message)
                console.log(resultInfo);
                if (resultInfo.nameid[0] === '2') {
                    localStorage.setItem('token', result.Message);
                    if (resultInfo.nameid[2] === "Admin" || resultInfo.nameid[2] === "Supporter") {
                        alert('Đăng nhập thành công !!!');
                        window.location.href = "./index.html"
                    }
                    else {
                        alert('Đăng nhập thành công !!!');
                        window.location.href = "../pages/Admin/BaiDang/Baiviet.html"
                    }
                }
                else {
                    alert("Vui lòng liên hệ Admin để cấp quyền truy cập")
                }

            } else {
                alert('Sai thông tin tài khoản');
            }
        })
};

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};