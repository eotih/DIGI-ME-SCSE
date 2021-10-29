const WEB_API = "https://api.scse-vietnam.org/API/";

window.addEventListener('load', loadData)
window.addEventListener('load', selectFullName)
async function loadData() {
    fetch(WEB_API + "Interface/ShowAllPorfolio")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                let { ID, FullName, Hinhanh, Position, Details } = response;
                const Hinh = Hinhanh.filter(v => v.ImagePortfolio)
                const HinhA = Hinh.map(function (response) {
                    return response.ImagePortfolio
                })
                return `<tr>
                    <td>${ID}</td>
                    <td>${FullName}</td>
                    <td><img src='${HinhA[0]}'/><img src='${HinhA[1]}'/><img src='${HinhA[2]}'/></td>
                    <td>${Position}</td>
                    <td>${Details.slice(0, 200)}</td>
                    <td><button onclick="return getData(${ID})" class="btn btn-outline-primary">Xem chi tiết</button> <button onclick="return getDataImg('${FullName}')" class="btn btn-outline-primary">Sửa hình ảnh</button> <button onclick="return deletePortfolio(${ID})" class="btn btn-outline-danger">Xoá</button></td>
                    </tr>`;
            })
            $('#tbody').html(html);
        })
}
function deletePortfolio(Id) {
    if (confirm('Bạn có muốn xoá tài khoản?')) {

        fetch(WEB_API + "Interface/DeletePortfolio?id=" + Id, {
            method: "DELETE",
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
    } else {

    }
}
function selectFullName() {
    fetch(WEB_API + "Interface/ImageForPortfolio")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var Category = document.createElement("option");
            Category.innerHTML = "Vui lòng chọn";
            Category.value = 0;
            document.getElementById("SelectFullName").appendChild(Category);
            for (var i = 0; i < response.length; i++) {
                var ele = document.createElement("option");
                ele.value = response[i].FullName;
                ele.innerHTML = response[i].FullName;
                document.getElementById("SelectFullName").appendChild(ele);
            }
        })

}
async function getData(ID) {
    fetch(WEB_API + "Interface/GetByIdPortfolios?id=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { ID, FullName, Position, Details } = response;
            $('#ID').val(ID);
            $('#FullName').val(FullName);
            $('#Position').val(Position);
            $('#Details').val(Details);
        })
    $('#exampleModal-2').modal('show');
    $('#SelectFullName').hide();
    $('#add').hide();
    $('#edit').show();
}
async function getDataImg(FullName) {
    var data = FullName;
    fetch(WEB_API + "Interface/GetByFullNameImgPortfolios?FullName=" + FullName)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var img = [];
            var result = response.filter(object => {
                img.push(object.ID);
                img.push(object.IDImg);
                img.push(object.ImagePortfolio);
            })
            let { IDImg, ImagePortfolio } = response;
            $('#ID1').val(img[0]);
            $('#IDImg1').val(data);
            document.getElementById("img1").src = img[2];
            $('#ID2').val(img[3]);
            $('#IDImg2').val(data);
            document.getElementById("img2").src = img[5];
            $('#ID3').val(img[6]);
            $('#IDImg3').val(data);
            document.getElementById("img3").src = img[8];
        })
    $('#exampleModal').modal('show');
    $('#add1').hide();
    $('#edit1').show();
}
async function addData() {
    var data = {
        ID: $('#ID').val(),
        FullName: $('#FullName').val(),
        Position: $('#Position').val(),
        Details: $('#summernote').summernote('code'),
    };
    fetch(WEB_API + "Interface/AddOrEditPortfolios", {
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
    AlertAdd();
}
async function updateData() {
    var data = {
        ID: $('#ID').val(),
        FullName: $('#FullName').val(),
        Position: $('#Position').val(),
        Details: $('#Details').val(),
    };
    var file = document.querySelector('input[type=file]')['files'];
    for (let i = 0; i < file.length; i++) {
        (function (file) {
            let name = file.name
            var reader = new FileReader();
            reader.onload = function () {
                var text = reader.result;
                addDataImg(text)
            }
            reader.readAsDataURL(file);
        })(file[i]);
    }
    fetch(WEB_API + "Interface/AddOrEditPortfolios", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Updated') {
                alert('Sửa Thành Công')
            }
            else {
                alert('Data not update')
            }
        })
}
async function updateImg() {
    window.location.reload();
}
async function updateImg1() {
    var data = {
        ID: $('#ID1').val(),
        IDImg: $('#IDImg1').val(),
        ImagePortfolio: document.getElementById('img1').src,
    };
    fetch(WEB_API + "Interface/EditImagePortfolios", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Updated') {
                alert('Sửa Thành Công')
            }
            else {
                alert('Data not update')
            }
        })
}
async function updateImg2() {
    var data = {
        ID: $('#ID2').val(),
        IDImg: $('#IDImg2').val(),
        ImagePortfolio: document.getElementById('img2').src,
    };
    fetch(WEB_API + "Interface/EditImagePortfolios", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Updated') {
                alert('Sửa Thành Công')
            }
            else {
                alert('Data not update')
            }
        })
}
async function updateImg3() {
    var data = {
        ID: $('#ID3').val(),
        IDImg: $('#IDImg3').val(),
        ImagePortfolio: document.getElementById('img3').src,
    };
    fetch(WEB_API + "Interface/EditImagePortfolios", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Updated') {
                alert('Sửa Thành Công')
            }
            else {
                alert('Data not update')
            }
        })
}
function addDataImg(base64) {
    let data = {
        FullName: $('#FullName').val(),
        ImagePortfolio: base64
    };
    fetch(WEB_API + "Interface/EditImagePortfolios", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
        })
}
function AlertAdd(file) {
    var file = document.querySelector('#getFile')['files'];
    for (let i = 0; i < file.length; i++) {
        (function (file) {
            let name = file.name
            var reader = new FileReader();
            reader.onload = function () {
                var text = reader.result;
                addDataImg(text)
            }
            reader.readAsDataURL(file);
        })(file[i]);
    
    }
}
function clearTextBox() {
    $('#ID').val("");
    $('#FullName').val("");
    $('#IDImg').val("");
    $('#Position').val("");
    $('#Details').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}
function clearTextBox2() {
    $('#IDImgadd').val("");
    $('#files').val("");
    $('#Modal').modal('show');
}