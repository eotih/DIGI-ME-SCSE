const WEB_API = "http://localhost:59360/API/";
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
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Success') {
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
                ele.value = response[i].IDPost;
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
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Success') {
                alert('Thêm Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not insert')
            }
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