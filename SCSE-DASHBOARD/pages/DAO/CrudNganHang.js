const WEB_API = "http://localhost:59360/API/";

(function ($) {
    'use strict';
    $(function () {
        fetch(WEB_API + "Interface/ShowAllBankInfo")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var html = response.map(function (response) {
                    let { ID, ImageQR, BankName } = response;
                    return `<tr>
                    <td>
                    <div class="d-flex">
                          <img style="height:300px;width:300px" src='${ImageQR}'/>
                          <h4>${BankName}</h4>
                    </div>
                    </td>
                    <td>
                    <button onclick="return getData(${ID})" class="btn btn-outline-primary">Xem chi tiết</button>
                    <button onclick="return deleteData(${ID})" class="btn btn-outline-danger">Xóa</button>
                    </td>
                    </tr>`;
                })
                $('#tbody').html(html);
                $(document).ready(function () {
                    $('#dataTable').DataTable({
                        "order": [[0, "asc"]]
                    });
                });
            })
            .catch(error => {
                throw error;
            })
    });
})(jQuery);

async function getData(ID){
    fetch(WEB_API + "Interface/GetByIdBankInfo?ID=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { ID, ImageQR, BankName } = response;
            $('#ID').val(ID);
            $('#Name').val(BankName);
            document.getElementById('img').src = ImageQR;
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}

async function addData() {
    var data = {
        BankName: $('#Name').val(),
        ImageQR: $('#img').val(),
    };
    console.log(data);
    fetch(WEB_API + "Interface/AddOrEditBankInfo", {
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
async function updateData(ID) {
    var data = {
        ID: $('#ID').val(),
        BankName: $('#Name').val(),
        ImageQR: $('#img').val(),
    };
    console.log(data);
    fetch(WEB_API + "Interface/AddOrEditBankInfo", {
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
                alert('Data not update')
            }
        })
}
async function deleteData(ID){
    if (confirm('Bạn có muốn xoá ngân hàng?')) {

        fetch(WEB_API + "Interface/DeleteBankInfo?ID=" + ID, {
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
function clearTextBox(){
    $('#ID').val('');
    $('#Name').val('');
    $('#img').val('');
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}