const WEB_API = "http://localhost:59360/API/";

window.addEventListener('load', loadData)
async function loadData() {
    fetch(WEB_API + "Interface/ShowAllPorfolio")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                let { ID, FullName, IDImg, Hinhanh, Position, Details } = response;
                const Hinh = Hinhanh.filter(v => v.ImagePortfolio)
                let img = [];
                const HinhA = Hinh.map(function (response) {
                    img.push(response.ImagePortfolio)
                })
                return `<tr>
                    <td>${ID}</td>
                    <td>${FullName}</td>
                    <td>${IDImg}</td>
                    <td><img src='${img[0]}'/><img src='${img[1]}'/><img src='${img[2]}'/></td>
                    <td>${Position}</td>
                    <td>${Details}</td>
                    <td><button onclick="return getData(${ID})" class="btn btn-outline-primary">View</button> <button onclick="return getDataImg(${IDImg})" class="btn btn-outline-primary">View Img</button> <button onclick="return deleteData(${ID})" class="btn btn-outline-danger">Xoá</button></td>
                    </tr>`;
            })
            $('#tbody').html(html);
        })
}
async function getData(ID) {
    fetch(WEB_API + "Interface/GetByIdPortfolios?id=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { ID, FullName, IDImg, Position, Details } = response;
            $('#ID').val(ID);
            $('#FullName').val(FullName);
            $('#IDImg').val(IDImg);
            $('#Position').val(Position);
            $('#Details').val(Details);
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
async function getDataImg(IDImg) {
    var data =IDImg;
    fetch(WEB_API + "/Api/Interface/GetbyIdimgPortfolios?IDimg=" + IDImg)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var img = [];
            var result = response.filter(object => {
                console.log(object)
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
        IDImg: $('#IDImg').val(),
        Position: $('#Position').val(),
        Details: $('#Details').val(),
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
                clearTextBox2();
            }
            else {
                alert('Data not insert')
            }
        })
}
async function updateData() {
    var data = {
        ID: $('#ID').val(),
        FullName: $('#FullName').val(),
        IDImg: $('#IDImg').val(),
        Position: $('#Position').val(),
        Details: $('#Details').val(),
    };
    console.table(data)
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
        IDImg: $('#IDImgadd').val(),
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