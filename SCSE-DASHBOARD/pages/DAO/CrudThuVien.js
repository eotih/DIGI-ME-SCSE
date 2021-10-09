const url = "http://localhost:59360/";
// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)

async function loadData() {
    fetch(url + "/Api/Interface/ListPhoto")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                const { ID, IDCat, Title, Slug, Image } = response;
                // Sẽ return ra hàm tbody
                return `<tr>
                    <td>${ID}</td>
                    <td>${IDCat}</td>
                    <td>${Title}</td>
                    <td>${Slug}</td>
                    <td><img src='${Image}'/><td>
                    </tr>`;
            })
            // đây là hàm trả ra tbody
            $('.tbody').html(html);
        })
}
async function addData(base64) {
    var dulieu = {
        IDCat: $('#IDCat').val(),
        Title: $('#Title').val(),
        Slug: $('#Slug').val(),
        Image: base64
    };
    fetch(url + "Api/Interface/AddOrEditPhotoGallery", {
        method: 'POST',
        body: JSON.stringify(dulieu),
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

function getBaseUrl() {
    var file = document.querySelector('input[type=file]')['files'];
    for (let i = 0; i < file.length; i++) {
        (function (file) {
            // var name = file.name; Đây là để lấy ra tên file nhập vào
            var reader = new FileReader();
            reader.onload = function () {
                var text = reader.result;

                addData(text)
            }
            reader.readAsDataURL(file);
        })(file[i]);
    }

    //console.log(baseString)
}
async function updateData() {
    var dulieu = {
        ID: $('#ID').val(),
        IDCat: $('#IDCat').val(),
        Title: $('#Title').val(),
        Slug: $('#Slug').val(),
        Image: $('#Image').val()
    };
    fetch(url + "api/UploadImage", {
        method: 'POST',
        body: JSON.stringify(dulieu),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Updated') {
                alert('Sửa Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
async function autoUpdate(baseString) {
    var $data = {
        ID: $('#ID').val(),
        IDCat: $('#IDCat').val(),
        Title: $('#Title').val(),
        Slug: $('#Slug').val(),
        Image: baseString
    }
    fetch(WEB_API + "Api/Interface/AddOrEditPhotoGallery", {
        method: 'POST',
        body: JSON.stringify($data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Updated') {
                alert('Sửa Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })

}
function clearTextBox() {
    $('#ID').val("");
    $('#IDCat').val("");
    $('#Title').val("");
    $('#Slug').val("");
    $('#Image').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}
