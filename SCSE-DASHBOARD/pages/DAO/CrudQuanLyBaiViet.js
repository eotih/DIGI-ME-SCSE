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
                const { IDPost, IDCat, Title, Slug, Details, Image, Video, Author, Status } = response;
                return `<tr>
                    <td>${IDPost}</td>
                    <td>${IDCat}</td>
                    <td>${Title}</td>
                    <td>${Slug}</td>
                    <td>${Details}</td>
                    <td><img src='${Image}'/><td>
                    <td>${Video}</td>
                    <td>${Author}</td>
                    <td>${Status}</td>
                    <td><button onclick="return getData(${IDPost})" class="btn btn-outline-primary">View</button></td>
                    <td><button onclick="return deleteData(${IDPost})" class="btn btn-outline-primary">Delete</button></td>
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
            const { IDPost, IDCat, Title, Slug, Details, Image, Video, Author, Status } = response;
            $('#IDPost').val(IDPost), document.getElementById("Image1").src = Image;
            $('#IDCat').val(IDCat);
            $('#Title').val(Title);
            $('#Slug').val(Slug);
            $('#Details').val(Details);
            $('#Video').val(Video);
            $('#Author').val(Author);
            $('#Status').val(Status);
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
        Image: baseString,
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
async function deleteData(IDPost) {
    fetch(url + "/Management/XoaBaiViet?idposts=" + IDPost, {
        method: 'DELETE',
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Delete') {
                alert('Xoá thành công')
                window.location.reload();
            }
            else {
                alert('Data not delete')
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