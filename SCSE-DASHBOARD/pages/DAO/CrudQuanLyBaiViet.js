const url = "http://localhost:59360/";

// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)

async function loadData() {
    fetch(url + "Management/XemDanhSachBaiViet")
        .then(function (response) {
            return response.json();
            // Sẽ trả dữ liệu về dạng json
        })
        .then(function (response) {
            var html = response.map(function (response) {
                // Sẽ return ra hàm tbody
                return `<tr>
        <td>${response.IDPost}</td>
        <td>${response.IDCat}</td>
        <td>${response.Title}</td>
        <td>${response.Slug}</td>
        <td>${response.Details}</td>
        <td><img src='${response.Image}'/><td>
        <td>${response.Video}</td>
        <td>${response.Author}</td>
        <td>${response.Status}</td>
        <td><button onclick="return getData(${response.IDPost})" class="btn btn-outline-primary">View</button></td>
        </tr>`;
            })
            // đây là hàm trả ra tbody
            debugger;
            $('.tbody').html(html);
        })
}

async function addData() {
    var dulieu = {
        IDCat: $('#IDCat').val(),
        Title: $('#Title').val(),
        Slug: $('#Slug').val(),
        Details: $('#Details').val(),
        Image: $('#Image').val(),
        Video: $('#Video').val(),
        Author: $('#Author').val(),
        Status: $('#Status').val()
    };
    fetch(url + "/Management/ThemBaiViet", {
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
async function getData(IDPost) {
    fetch(url + "/Management/GetByIdBaiViet?idposts=" + IDPost)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            
                return response.json();
            })
            .then(function (response) {
                $('#IDpót').val(response.IDPost),document.getElementById("Image1").src = response.Image;
                $('#IDCat').val(response.IDCat);
                $('#Title').val(response.Title);
                $('#Slug').val(response.Slug);
                $('#Details').val(response.Details);
                $('#Video').val(response.Video);
                $('#Author').val(response.Author);
                $('#Status').val(response.Status);
            })
        $('#exampleModal-2').modal('show');
        $('#add').hide();
        $('#edit').show();
            
     
}
async function updateData() {
    var dulieu = {
        IDPost: $('£IDPost').val(),
        IDCat: $('#IDCat').val(),
        Title: $('#Title').val(),
        Slug: $('#Slug').val(),
        Details: $('#Details').val(),
        Image: $('#Image').val(),
        Video: $('#Video').val(),
        Author: $('#Author').val(),
        Status: $('#Status').val()
    };
    fetch(url + "/User/ThemTaiKhoan", {
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
function getBaseUrl() {
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    reader.onloadend = function () {
        baseString = reader.result;
        $('#Image').val(baseString);
        document.getElementById("Image1").src = baseString;
    };
    reader.readAsDataURL(file);
    //console.log(baseString)
}
async function autoUpdate(baseString) {
    var $data = {
        IDPost: $('£IDPost').val(),
        IDCat: $('#IDCat').val(),
        Title: $('#Title').val(),
        Slug: $('#Slug').val(),
        Details: $('#Details').val(),
        Image :baseString,
        Video: $('#Video').val(),
        Author: $('#Author').val(),
        Status: $('#Status').val()
    }
    fetch(WEB_API + "Management/ThemBaiViet", {
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
    $('#IDPost').val("");
    $('#IDCat').val("");
    $('#Title').val("");
    $('#Slug').val("");
    $('#Details').val("");
    $('#Image').val("");
    $('#Video').val("");
    $('#Author').val("");
    $('#Status').val("");

    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}