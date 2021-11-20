const WEB_API = "https://api.scse-vietnam.org/";
window.addEventListener('load', loadData)
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}
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
async function loadData() {
    fetch(WEB_API + "Interface/ShowAllVideo")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                const { ID, Title, TitleEN, Description, DescriptionEN, IDCat, IDField, Image, LinkYTB } = response;
                // Sẽ return ra hàm tbody
                return `<tr>
                    <td>${ID}</td>
                    <td>${convertCategory(IDCat)}</td>
                    <td>${convertField(IDField)}</td>
                    <td>${Title}</td>
                    <td>${TitleEN}</td>
                    <td>${Description}</td>
                    <td>${DescriptionEN}</td>
                    <td><img src='${Image}'></td>
                    <td>${LinkYTB}</td>
                    <td><button onclick="return getData(${ID})" class="btn btn-outline-primary">Xem chi tiết</button>
                    <button onclick="return showDeletePopUp(${ID})" class="btn btn-outline-danger">Xóa</button></td>
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
    //check validationForm
    let data = {
        IDCat: $('#IDCat').val(),
        IDField: $('#IDField').val(),
        Title: $('#Title').val(),
        TitleEN: $('#TitleEN').val(),
        Description: $('#Description').val(),
        DescriptionEN: $('#DescriptionEN').val(),
        Image: getImage(splitLink($('#LinkYTB').val())),
        LinkYTB: $('#LinkYTB').val(),
        VideoID: splitLink($('#LinkYTB').val())
    };
    fetch(WEB_API + "Interface/AddOrEditVideo", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": "Bearer "+localStorage.getItem('token'),
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
            let { ID,IDField, Title, IDCat, TitleEN, DescriptionEN, Description, LinkYTB, Image } = response;
            $('#ID').val(ID),
                $('#Title').val(Title);
            $('#Title').val(Title);
            $('#TitleEN').val(TitleEN);
            $('#Description').val(Description);
            $('#DescriptionEN').val(DescriptionEN);
            $('#LinkYTB').val(LinkYTB);
            $('#IDCat').val(IDCat);
            $('#IDField').val(IDField);
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}

function updateData() {
    let data = {
        ID: $('#ID').val(),
        IDCat: $('#IDCat').val(),
        IDField: $('#IDField').val(),
        Title: $('#Title').val(),
        TitleEN: $('#TitleEN').val(),
        Description: $('#Description').val(),
        DescriptionEN: $('#DescriptionEN').val(),
        Image: getImage(splitLink($('#LinkYTB').val())),
        LinkYTB: $('#LinkYTB').val(),
        VideoID: splitLink($('#LinkYTB').val())
    };
    fetch(WEB_API + "Interface/AddOrEditVideo", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer "+localStorage.getItem('token'),
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
        method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
            }
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
    $('#IDField').val("");
    $('#IDCat').val("");
    $('#Title').val("");
    $('#LinkYTB').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}
function validateFormOnChange() {
    $('#IDCat').click(function () {
        if ($('#IDCat').val() === '') {
            $('#IDCat').css('border-color', 'red');
        }
        else {
            $('#IDCat').removeClass('border-color');
        }
    });
    $('#IDField').click(function () {
        if ($('#IDField').val() === '') {
            $('#IDField').css('border-color', 'red');
        }
        else {
            $('#IDField').removeClass('border-color');
        }
    });
    $('#Title').click(function () {
        if ($('#Title').val() == '') {
            $('#Title').css('border-color', 'red');
        }
        else {
            $('#Title').removeAttr('border-color');
        }
    });
    $('#TitleEN').click(function () {
        if ($('#TitleEN').val() === '') {
            $('#TitleEN').css('border-color', 'red');
        }
        else {
            $('#TitleEN').removeClass('border-color');
        }
    });
    $('#Description').click(function () {
        if ($('#Description').val() === '') {
            $('#Description').css('border-color', 'red');
        }
        else {
            $('#Description').removeClass('border-color');
        }
    });
    $('#DescriptionEN').click(function () {
        if ($('#DescriptionEN').val() === '') {
            $('#DescriptionEN').css('border-color', 'red');
        }
        else {
            $('#DescriptionEN').removeClass('border-color');
        }
    });
    $('#LinkYTB').click(function () {
        if ($('#LinkYTB').val() == '') {
            $('#LinkYTB').css('border-color', 'red');
        } else {
            $('#LinkYTB').removeClass('border-color');
        }
    });
}