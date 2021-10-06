const WEB_API = "http://localhost:59360/";

window.addEventListener('load', getData())
function getData() {
    fetch(WEB_API + "Api/Interface/ListCategory")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var Category = document.createElement("option");
            Category.innerHTML = "Vui lòng chọn";
            Category.value = 0;
            document.getElementById("Category").appendChild(Category);
            for (var i = 0; i < response.length; i++) {
                var ele = document.createElement("option");
                ele.value = response[i].IDCat;
                ele.innerHTML = response[i].CategoryName;
                document.getElementById("Category").appendChild(ele);
            }
        })

}
async function addData() {
    var $data = {
        Title: $('#Title').val(),
        Details: $('#summernote').summernote('code'),
        IDCat: $('#Category').val(),
        Image: $('#img').val(),
        Author: $('#Author').val(),
        IDState: $('#State').val(),

    };
    fetch(WEB_API + "Management/ThemBaiViet", {
        method: 'POST',
        body: JSON.stringify($data),
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
