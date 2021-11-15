const WEB_API = "http://localhost:59360/API/";
window.addEventListener('load', loadData);
const getPortfolio = async (url) => {
    return (await fetch(url)).json();
}

async function loadData() {
    var url = WEB_API + "Interface/ShowAllPortfolio";
    await getPortfolio(url).then(response => {
        var html = response.map(function (response) {
            let { ID, FullName, Image1, Image2, Image3, Position, Details } = response;
            if (Position === "Phó Giám Đốc" || Position === "Giám Đốc" || Position === "Phó giám đốc" || Position === "Giám đốc") {
                return `<tr>
                <td>${ID}</td>
                <td>${FullName}</td>
                <td><img src='${Image1}'/><img src='${Image2}'/><img src='${Image3}'/></td>
                <td>${Position}</td>
                <td>${Details.slice(0, 100)}</td>
                <td><button onclick="return getData(${ID})" class="btn btn-outline-primary">Xem chi tiết</button> <button onclick="return getDataImg('${FullName}')" class="btn btn-outline-primary">Sửa hình ảnh</button> <button onclick="return deletePortfolio('${FullName}')" class="btn btn-outline-danger">Xoá</button></td>
                </tr>`;
            }
            else {
                return `<tr>
                <td>${ID}</td>
                <td>${FullName}</td>
                <td><img src='${Image1}'/><img src='${Image2}'/><img src='${Image3}'/></td>
                <td>${Position}</td>
                <td>${Details.slice(0, 300)}</td>
                <td><a href="./EditBGD.html?Slug=${ID}" class="btn btn-outline-primary">Xem chi tiết</a> <button onclick="return getDataImg('${FullName}')" class="btn btn-outline-primary">Sửa hình ảnh</button> <button onclick="return deletePortfolio('${FullName}')" class="btn btn-outline-danger">Xoá</button></td>
                </tr>`;
            }
        })
        $('#tbody').html(html);
    })
}
function deletePortfolio(FullName) {
    if (confirm('Bạn có muốn xoá tài khoản?')) {
        fetch(WEB_API + "Interface/DeletePortfolio?fullname=" + FullName, {
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
    }
}
function clearTextBox() {
    $('#ID').val("");
    $('#Name').val("");
    $('#Position').val("");
    $('#PositionEN').val("");
    $('#getFile').val("");
    $('#Image1').val('');
    $('#Image2').val('');
    $('#Image3').val('');
    $('#Position').val('');
    $('#PositionEN').val('');
    $('#Details').val('');
    $('#ModalChoose').modal('show');
    $('#add').show();
    $('#edit').hide();

}
function openModalAddPortfolio() {
    $('#ModalChoose').modal('hide');
    $('#ModalAddPortfolio').modal('show');
    $('#labelHeader').show();
    $('#labelHeaderEdit').hide();
    $('#fileimg').show();
    $('#add1').show();
    $('#edit1').hide();
}
const fileInput = document.querySelector('input[id="getFilePortfolio"]');
fileInput.addEventListener('change', (e) => {
    const file = fileInput.files;
    if (file.length === 0) {
        alert('Chưa chọn file');
        fileInput.value = '';
    }
    if (file.length > 3) {
        alert('Chỉ được chọn 3 file');
        fileInput.value = '';
    }
    if (file.length === 3) {
        for (let i = 0; i < file.length; i++) {
            if (file[i].type !== 'image/jpeg' && file[i].type !== 'image/png') {
                alert('Chỉ chọn file jpg hoặc png');
            }
            else {
                const reader = new FileReader();
                reader.onloadend = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.id = 'Image' + i;
                    img.value = e.target.result;
                    img.style.width = '100px';
                    document.querySelector('#fileimg').appendChild(img);
                }
                reader.readAsDataURL(file[i]);
            }
        }
    }
    else {
        alert('Chỉ được chọn 3 file');
        fileInput.value = '';
    }
});
function addPortfolio() {
    const data = {
        FullName: $('#Name').val(),
        Position: $('#Position').val(),
        PositionEN: $('#PositionEN').val(),
        Details: $('#Details').val(),
        DetailsEN: $('#DetailsEN').val(),
        Image1: $('#Image0').val(),
        Image2: $('#Image1').val(),
        Image3: $('#Image2').val(),
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
}
async function getData(ID) {
    fetch(WEB_API + "Interface/GetByIdPortfolios?id=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { ID, FullName, Position, PositionEN, Details, DetailsEN } = response;
            $('#ID').val(ID);
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
function editDataBGD() {
    const data = {
        ID: $('#ID').val(),
        FullName: $('#Name').val(),
        Position: $('#Position').val(),
        PositionEN: $('#PositionEN').val(),
        Details: $('#Details').val(),
        DetailsEN: $('#DetailsEN').val(),
    };
    console.log(data);
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
            if (data.Status === 'Updated') {
                alert('Sửa Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not insert')
            }
        })
}