const WEB_API = "http://localhost:59360/API/";
(function ($) {
    'use strict';
    $(function () {
        fetch(WEB_API + "/Management/XemDanhSachDangKy")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var result = response.filter(v => v.IDState === 4);
                var html = result.map(function (response) {
                    let { ID, FirstName, LastName, DOB, Phone, Email, Address, Project, Purpose, IDState } = response;
                    if (IDState === 1) {
                        IDState = '<div class="badge badge-opacity-warning">Pending</div>'
                    }
                    if (IDState === 2) {
                        IDState = '<div class="badge badge-opacity-success">Approved</div>'
                    }
                    if (IDState === 3) {
                        IDState = '<div class="badge badge-opacity-danger">NotApproved</div>'
                    }
                    if (IDState === 4) {
                        IDState = '<div class="badge badge-opacity-danger">Deleted</div>'
                    }
                    return `<tr>
                    <td>${ID}</td>
                    <td>${FirstName}</td>
                    <td>${LastName}</td>
                    <td>${DOB}</td>
                    <td>${Phone}</td>
                    <td>${Email}</td>
                    <td>${Address}</td>
                    <td>${Project}</td>
                    <td>${Purpose}</td>
                    <td>${IDState}</td>
                    <td><button onclick="return getData(${ID})" class="btn btn-success">Khôi phục</button> <button onclick="return deleteData(${ID})" class="btn btn-outline-primary">Xoá</button></td>

                    </tr>`;
                })
                $('#tbody').html(html);
                $(document).ready(function () {
                    $('#dataTable').DataTable({
                        "order": [[0, "desc"]]
                    });
                });
            })
            .catch(error => {
                throw error;
            })
    });
})(jQuery);
async function getData(ID) {
    fetch(WEB_API + "Management/GetByIdVolunteer?id=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { ID} = response;
            $('#ID2').val(ID);
            $('#State').val("1");
        })
    $('#Delete').modal('show');
    $('#add').hide();
    $('#edit').show();
}
async function restoreData(ID) {
    var data = {
        ID: $('#ID2').val(),
        IDState: $('#State').val(),
    };
    fetch(WEB_API + "Management/EditState", {
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
                alert('Khôi phục Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
async function deleteData(ID) {
    if(confirm('Bạn có muốn xoá đơn này?')){

        fetch(WEB_API + "Management/DeleteVolunteer?id="+ ID,{
            method: "DELETE",
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.Status === 'Delete'){
                    alert('Xoá thành công')
                    window.location.reload();
                }
                else{
                    alert('Data not deleted')
                }
            })
    } else{

    }
}