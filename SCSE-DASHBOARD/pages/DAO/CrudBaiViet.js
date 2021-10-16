const WEB_API = "http://localhost:59360/API/";
// ------------------------ TIẾNG VIỆT ------------------------ //

async function addPost() {
    var data = {
        Title: $('#tieude').val(),
        Details: $('#summernote').summernote('code'),
        IDCat: $('#theloai').val(),
        Image: $('#hinhanh').val(),
        Author: $('#tacgia').val(),
    };
    fetch(WEB_API + "Management/AddOrEditPost", {
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
// ------------------------ TIẾNG ANH ------------------------ //\

window.addEventListener('load', getData)
function getData() {
    fetch(WEB_API + "Management/ShowAllPostENNeedPost")
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
        IDPostEN: $('#PostVN').val(),
        IDCat: $('#Category').val(),
        Title: $('#Title').val(),
        Details: $('#ENGPOST').summernote('code'),
        Image: $('#img').val(),
        Author: $('#Author').val(),
    };
    fetch(WEB_API + "Management/AddPostEN", {
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