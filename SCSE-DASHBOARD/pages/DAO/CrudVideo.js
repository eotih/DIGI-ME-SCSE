const WEB_API = "http://localhost:59360/API/";
window.addEventListener('load', loadData)
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}
async function loadData() {
    fetch(WEB_API + "Interface/ShowAllVideo")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                let { ID, Title, IDCat, Image, UpdateByDate, CreatedByDate, LinkYTB } = response;
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
                    <td>${IDCat}</td>
                    <td>${Title}</td>
                    <td><img src='${Image}'></td>
                    <td>${LinkYTB}</td>
                    <td>${convertDate(CreatedByDate)}</td>
                    <td>${convertDate(UpdateByDate)}</td>
                    <td><button onclick="return getData(${ID})" class="btn btn-outline-primary">View</button>
                    <button onclick="return showDeletePopUp(${ID})" class="btn btn-outline-danger">Delete</button></td>
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
function showDeletePopUp(ID) {
    $('#IDDuPhong').val(ID);
    $('#Delete').modal('show');
}
function splitLink() {
    var dataInput = $('#LinkYTB').val();
    var WEB_API = dataInput.split('v=')[1];
    var result = WEB_API.indexOf('&')
    if (result != -1) {
        WEB_API = WEB_API.substring(0, result);
    }
    return WEB_API
}
function getImage(input) {
    const BASE_WEB_API = "https://img.youtube.com/vi/"
    var result = BASE_WEB_API + input + '/sddefault.jpg';
    return result
}

function addData() {
    let data = {
        IDCat: $('#IDCat').val(),
        Title: $('#Title').val(),
        Image: getImage(splitLink($('#LinkYTB').val())),
        LinkYTB: $('#LinkYTB').val(),
        VideoID: splitLink($('#LinkYTB').val())
    };
    fetch(WEB_API + "Interface/AddOrEditVideo", {
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
function getData(ID) {
    fetch(WEB_API + "Interface/GetByIDVideo?id=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { ID, Title, IDCat, LinkYTB, Image } = response;
            $('#ID').val(ID),
                $('#Title').val(Title);
            $('#LinkYTB').val(LinkYTB);
            $('#IDCat').val(IDCat);
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}

function updateData() {
    let data = {
        ID: $('#ID').val(),
        IDCat: $('#IDCat').val(),
        Title: $('#Title').val(),
        Image: getImage(splitLink($('#LinkYTB').val())),
        LinkYTB: $('#LinkYTB').val(),
        VideoID: splitLink($('#LinkYTB').val())
    };
    console.log(data)
    fetch(WEB_API + "Interface/AddOrEditVideo", {
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
function deleteData() {
    var ID = $('#IDDuPhong').val()
    fetch(WEB_API + "Interface/DeleteVideo?id=" + ID, {
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
    $('#ID').val("");
    $('#IDCat').val("");
    $('#Title').val("");
    $('#LinkYTB').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}
