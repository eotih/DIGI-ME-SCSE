const WEB_API = "http://localhost:59360/API/";

window.addEventListener('load', loadData)
async function loadData() {
    fetch(WEB_API + "Interface/ShowAllPortfolio")
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
                if (Position === "Phó Giám Đốc" || Position === "Giám Đốc") {
                    return `<tr>
                    <td>${ID}</td>
                    <td>${FullName}</td>
                    <td><img src='${HinhA[0]}'/><img src='${HinhA[1]}'/><img src='${HinhA[2]}'/></td>
                    <td>${Position}</td>
                    <td>${Details.slice(0, 100)}</td>
                    <td><button onclick="return getData(${ID})" class="btn btn-outline-primary">Xem chi tiết</button> <button onclick="return getDataImg('${FullName}')" class="btn btn-outline-primary">Sửa hình ảnh</button> <button onclick="return deletePortfolio('${FullName}')" class="btn btn-outline-danger">Xoá</button></td>
                    </tr>`;
                }
                else {
                    return `<tr>
                    <td>${ID}</td>
                    <td>${FullName}</td>
                    <td><img src='${HinhA[0]}'/><img src='${HinhA[1]}'/><img src='${HinhA[2]}'/></td>
                    <td>${Position}</td>
                    <td>${Details.slice(0, 200)}</td>
                    <td><a href="./EditBGD.html?Slug=${ID}" class="btn btn-outline-primary">Xem chi tiết</a> <button onclick="return getDataImg('${FullName}')" class="btn btn-outline-primary">Sửa hình ảnh</button> <button onclick="return deletePortfolio('${FullName}')" class="btn btn-outline-danger">Xoá</button></td>
                    </tr>`;
                }
            })
            $('#tbody').html(html);
        })
}

function deletePortfolio(Id) {
    if (confirm('Bạn có muốn xoá tài khoản?')) {

        fetch(WEB_API + "Interface/DeletePortfolio?fullname=" + Id, {
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
async function getData(ID) {
    fetch(WEB_API + "Interface/GetByIdPortfolios?id=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { ID, FullName, Position,PositionEN, Details,DetailsEN } = response;
            $('#ID1').val(ID);
            $('#Name').val(FullName);
            $('#Position').val(Position);
            $('#PositionEN').val(PositionEN);
            $('#Details').val(Details);
            $('#DetailsEN').val(DetailsEN);
        })
    $('#ModalAddPortfolio').modal('show');
    $('#labelHeader').hide();
    $('#labelHeaderEdit').show();
    $('#fileimg').hide();
    $('#add1').hide();
    $('#edit1').show();
}
async function getDataImg(FullName) {
    fetch(WEB_API + "Interface/GetByFullNameImgPortfolios?FullName=" + FullName)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var img = [];
            var result = response.filter(object => {
                img.push(object.ID);
                img.push(object.FullName);
                img.push(object.ImagePortfolio);
            })
            console.log(img)
            $('#ID1').val(img[0]);
            $('#IDImg1').val(FullName);
            document.getElementById("imgEdit1").src = img[2];
            $('#ID2').val(img[3]);
            $('#IDImg2').val(FullName);
            document.getElementById("imgEdit2").src = img[5];
            $('#ID3').val(img[6]);
            $('#IDImg3').val(FullName);
            document.getElementById("imgEdit3").src = img[8];
        })
    $('#ModalEditImg').modal('show');
    $('#add1').hide();
    $('#edit1').show();
}

// Thêm Ban Giám Đốc
async function addDataBGD() {
    
    var data = {
        ID: $('#ID').val(),
        FullName: $('#Name').val(),
        Position: $('#Position').val(),
        PositionEN: $('#PositionEN').val(),
        Details: $('#Details').val(),
        DetailsEN: $('#DetailsEN').val(),
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

// Thêm thành viên step1
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

//Thêm thành viên step2 
async function addPortfolioEN() {
    var data = {
        ID: $('#ID').val(),
        FullName: $('#FullName').val(),
        Position: $('#PositionEN').val(),
        Details: $('#DetailsEN').val(),
    };
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
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
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
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
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
        FullName: $('#Name').val(),
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
    console.log(file.length)
    if (file.length < 3) {
        for (let i = 0; i < file.length; i++) {
            (function (file) {
                var reader = new FileReader();
                reader.onload = function () {
                    var text = reader.result;
                    addDataImg(text)
                }
                reader.readAsDataURL(file);
            })(file[i]);
        }
        for (let numb = 0; numb < 3 - file.length; numb++) {
            var text = "data:image/png;base64,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"
            addDataImg(text)
        }
    }
    else {
        for (let i = 0; i < file.length; i++) {
            (function (file) {
                var reader = new FileReader();
                reader.onload = function () {
                    var text = reader.result;
                    addDataImg(text)
                }
                reader.readAsDataURL(file);
            })(file[i]);
        }
    }
}
function clearTextBox() {
    $('#ID').val("");
    $('#Name').val("");
    $('#Position').val("");
    $('#PositionEN').val("");
    $('#getFile').val("");
    $('#Details').val("");
    $('#DetailsEN').val("");
    $('#ModalChoose').modal('show');
    $('#add').show();
    $('#edit').hide();
}
function clearTextBox1() {
    $('#ModalChoose').modal('hide');
    $('#ModalAddPortfolio').modal('show');
    $('#labelHeader').show();
    $('#labelHeaderEdit').hide();
    $('#fileimg').show();
    $('#add1').show();
    $('#edit1').hide();
}
function clearTextBox2() {
    $('#IDImgadd').val("");
    $('#files').val("");
    $('#Modal').modal('show');
}




