const BASE_URL = "http://localhost:59360/";

window.addEventListener('load', loadData)
async function loadData() {
    fetch(BASE_URL + "/Api/Interface/ShowAllPorfolio")
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
                    <td><button onclick="return getData(${ID})" class="btn btn-outline-primary">View</button> <button onclick="return getDatas(${IDImg})" class="btn btn-outline-primary">View Img</button> <button onclick="return deleteData(${ID})" class="btn btn-outline-danger">Xoá</button></td>
                    </tr>`;
            })
            $('#tbody').html(html);
        })
}
async function getData(ID) {
    fetch(BASE_URL + "/Api/Interface/GetbyIdPortfolios?id=" + ID)
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
async function getDatas(IDImg) {
    var data =IDImg;
    fetch(BASE_URL + "/Api/Interface/GetbyIdimgPortfolios?IDimg=" + IDImg)
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
    var dulieu = {
        ID: $('#ID').val(),
        FullName: $('#FullName').val(),
        IDImg: $('#IDImg').val(),
        Position: $('#Position').val(),
        Details: $('#Details').val(),
    };
    fetch(BASE_URL + "/Api/Interface/AddorEditPortfolios", {
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
async function updateData() {
    var dulieu = {
        ID: $('#ID').val(),
        FullName: $('#FullName').val(),
        IDImg: $('#IDImg').val(),
        Position: $('#Position').val(),
        Details: $('#Details').val(),
    };
    console.table(dulieu)
    fetch(BASE_URL + "/Api/Interface/AddorEditPortfolios", {
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
async function updateImg() {
    window.location.reload();
}
async function updateImg1() {
    var dulieu = {
        ID: $('#ID1').val(),
        IDImg: $('#IDImg1').val(),
        ImagePortfolio: document.getElementById('img1').src,
    };
    fetch(BASE_URL + "/Api/Interface/EditImagePortfolios", {
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
            }
            else {
                alert('Data not update')
            }
        })
}
async function updateImg2() {
    var dulieu = {
        ID: $('#ID2').val(),
        IDImg: $('#IDImg2').val(),
        ImagePortfolio: document.getElementById('img2').src,
    };
    fetch(BASE_URL + "/Api/Interface/EditImagePortfolios", {
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
            }
            else {
                alert('Data not update')
            }
        })
}
async function updateImg3() {
    var dulieu = {
        ID: $('#ID3').val(),
        IDImg: $('#IDImg3').val(),
        ImagePortfolio: document.getElementById('img3').src,
    };
    fetch(BASE_URL + "/Api/Interface/EditImagePortfolios", {
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
            }
            else {
                alert('Data not update')
            }
        })
}
function addDatas(base64) {
    let dulieu = {
        IDImg: $('#IDImgadd').val(),
        ImagePortfolio: base64
    };
    fetch(BASE_URL + "Api/Interface/EditImagePortfolios", {
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
                addDatas(text)
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