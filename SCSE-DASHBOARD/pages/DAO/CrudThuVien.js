const url = "http://localhost:59360/";
//đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)

async function loadData() {
    fetch(url + "/Api/Interface/ListPhoto")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                let { ID, Title, IDCat, Image, Slug } = response;
                if (IDCat === 1) {
                    IDCat = "Tin tức";
                }
                if (IDCat === 2) {
                    IDCat = "Dự án";
                }
                if (IDCat === 3) {
                    IDCat = "Hợp tác nghiên cứu";
                }
                // Sẽ return ra hàm tbody
                return `<tr>
                    <td>${ID}</td>
                    <td>${Title}</td>
                    <td>${IDCat}</td>
                    <td><img src='${Image}'></td>
                    <td><button onclick="return getData(${ID})" class="btn btn-outline-primary">View</button></td>
                    </tr>`;
            })
            // đây là hàm trả ra tbody
            $('#tbody').html(html);
            $(document).ready(function () {
                $('#dataTable').DataTable({
                    "order": [[0, "asc"]]
                });
            });

        })
} (jQuery);
async function getData(ID) {
    fetch(url + "Api/Interface/GetByIDPhotoGalary?id=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { ID, Title, IDCat, Image } = response;
            $('#ID').val(ID),
                document.getElementById("Image1").src = Image;
            $('#Title').val(Title);
            $('#IDCat').val(IDCat);
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
function addData(base64) {
    let dulieu = {
        IDCat: $('#IDCat').val(),
        Title: $('#Title').val(),
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
function AlertAdd() {
    var file = document.querySelector('input[type=file]')['files'];
    for (let i = 0; i < file.length; i++) {
        (function (file) {
            let name = file.name
            var reader = new FileReader();
            reader.onload = function () {
                var text = reader.result;
                addData(text)
            }
            reader.readAsDataURL(file);
        })(file[i]);
    }
}
async function updateData() {
    var dulieu = {
        ID: $('#ID').val(),
        IDCat: $('#IDCat').val(),
        Title: $('#Title').val(),
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
    fetch(url + "Api/Interface/AddOrEditPhotoGallery", {
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