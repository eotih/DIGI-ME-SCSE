const WEB_API = "https://api.scse-vietnam.org/";
//đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)
window.addEventListener('load', loadTitleToDropdown)
window.addEventListener('load', loadTitleToAdd)
let count = 0;
function convertCategory(category) {
    if (category === 1) {
        return 'Dự án'
    }
    else if (category === 2) {
        return 'Hợp tác nghiên cứu'
    }
    else if (category === 3) {
        return 'Hoạt động thiện nguyện'
    }
}
function convertField(field) {
    if (field === 1) {
        return 'Giới và bình đẳng giới'
    }
    else if (field === 2) {
        return 'Biến đổi khí hậu môi trường'
    }
    else if (field === 3) {
        return 'Thực tập sinh'
    }
    else if (field === 4) {
        return 'Nghiên cứu và đào tạo'
    }
}
function unique(arr) {
    var newArr = []
    for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i])
        }
    }
    return newArr
}
async function loadTitleToDropdown() {
    fetch(WEB_API + "Interface/ListPhoto")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const map = response.map(x => x.Title);
            const getOne = unique(map)
            for (var i = 0; i < getOne.length; i++) {
                $('#dropdown').append(`<option id="abc" value="${getOne[i]}">${getOne[i]}</option>`)
            }
        })
        .catch(function (error) {
        })
}
async function loadTitleToAdd() {
    fetch(WEB_API + "Interface/ListPhoto")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const map = response.map(x => x.Title);
            const map1 = response.map(x => x.TitleEN);
            const getOne = unique(map)
            const getOne1 = unique(map1)
            for (var i = 0; i < getOne.length; i++) {
                $('#Titleforalbum').append(`<option id="abc" value="${getOne[i]}">${getOne[i]}</option>`)
                $('#TitleENforalbum').append(`<option id="abc" value="${getOne1[i]}">${getOne1[i]}</option>`)
            }
        })
        .catch(function (error) {
        })
}
function deleteNow() {
    const title = $('#dropdown').val()
    fetch(WEB_API + "Interface/DeletePhotosByTitle?title=" + title, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.Status === 'Delete') {
                alert('Xoá thành công')
                window.location.reload();
            }
            else {
                alert('Data not deleted')
            }
        })
}
async function loadData() {
    fetch(WEB_API + "Management/ListImageTitle")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                let { ID, Title, TitleEN, IDField, IDCat, Image, Slug } = response;
                return `<tr>
                    <td>${ID}</td>
                    <td>${Title.slice(0, 50)}</td>
                    <td>${TitleEN.slice(0, 50)}</td>
                    <td>${convertCategory(IDCat)}</td>
                    <td>${convertField(IDField)}</td>
                    <td><img src='${WEB_API}/${Image}'></td>
                    <td><a href="./ChiTietThuVien.html?Slug=${Slug}"" class="btn btn-outline-primary">Xem chi tiết</a>
                    <button onclick="return deletePhoto('${Title}')" class="btn btn-outline-danger">Xoá</button></td>
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
    fetch(WEB_API + "Interface/GetByIDPhotoGallery?ID=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { ID, Title, IDField, TitleEN, IDCat, Image } = response;
            $('#ID').val(ID),
                document.getElementById("Image1").src = Image;
            $('#Title').val(Title);
            $('#TitleEN').val(TitleEN);
            $('#IDCat').val(IDCat);
            $('#IDField').val(IDField);
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
function uploadImgToAPI(files) {
    var formData = new FormData();
    formData.append('file', files);
    formData.append('IDCat', $('#IDCat').val());
    formData.append('IDField', $('#IDField').val());
    formData.append('Title', $('#Title').val());
    formData.append('TitleEN', $('#TitleEN').val());
    fetch(WEB_API + "Interface/UploadAlbum", {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
        body: formData,
    }).then(function (response) {
        window.location.reload();
        return response.json()
    }
    ).then(function (data) {
        console.log(data);
    }
    ).catch(function (error) {
        console.log(error);
    }
    );
}
async function AlertAdd() {
    const fileInput = document.querySelector('input[id="getFile"]');
    const file = fileInput.files;
    for (let i = 0; i < file.length; i++) {
        (function (file) {
            setTimeout(function () {
                uploadImgToAPI(file)
            }, 3000);
        })(file[i]);
    }
    alert("Thêm thành công")
}
function deletePhoto(Title) {
    if (confirm("Bạn có muốn xoá ảnh này?")) {
        fetch(WEB_API + "Interface/DeletePhotosByTitle?title=" + Title, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.Status === "Delete") {
                    alert("Xoá thành công");
                    window.location.reload();
                } else {
                    alert("Data not deleted");
                }
            });
    }
}
async function updateData() {
    var data = {
        ID: $('#ID').val(),
        IDCat: $('#IDCat').val(),
        TitleEN: $('#TitleEN').val(),
        IDField: $('#IDField').val(),
        Title: $('#Title').val(),
        Image: base64
    };
    fetch(WEB_API + "Interface/AddOrEditPhotoGallery", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + localStorage.getItem('token'),
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
        IDField: $('#IDField').val(),
        Title: $('#Title').val(),
        TitleEN: $('#TitleEN').val(),
        Slug: $('#Slug').val(),
        Image: baseString
    }
    fetch(WEB_API + "Interface/AddOrEditPhotoGallery", {
        method: 'POST',
        body: JSON.stringify($data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + localStorage.getItem('token'),
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
    $('#IDField').val("");
    $('#Title').val("");
    $('#Slug').val("");
    $('#Image').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}
function deleteData() {
    $('#exampleModal').modal('show');
}