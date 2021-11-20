const WEB_API = "http://localhost:59360/";
(function ($) {
    'use strict';
    $(function () {
        fetch(WEB_API + "User/ShowAllAccount")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var result = response.filter(v => v.IDState === 4);
                var html = result.map(function (response) {
                    let { IDUser, FullName, Email, IDState, RoleName, Image } = response;
                    var StateName = "";
                    if (IDState === 1) {
                        StateName = '<div class="badge badge-opacity-warning">Pending</div>'
                    }
                    if (IDState === 2) {
                        StateName = '<div class="badge badge-opacity-success">Approved</div>'
                    }
                    if (IDState === 3) {
                        StateName = '<div class="badge badge-opacity-danger">NotApproved</div>'
                    }
                    if (IDState === 4) {
                        StateName = '<div class="badge badge-opacity-danger">Deleted</div>'
                    }
                    return `<tr>
                    <td>
                      <div class="form-check form-check-flat mt-0">
                        <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" aria-checked="false"><i class="input-helper"></i></label>
                      </div>
                    </td>
                    <td>
                        <div class="d-flex ">
                            <img class="me-3" style="height:60px;width:60px" src='${Image}'/>
                            <div>
                              <h6>${FullName}</h6>
                              <p>${Email}</p>
                            <p><b>${RoleName}</b></p>
                            </div>
                        </div>
                    </td>
                    <td>${StateName}</td>
                    <td><button onclick="return getData(${IDUser})" class="btn btn-success">Khôi phục</button> <button onclick="return deleteData(${IDUser})" class="btn btn-outline-primary">Xoá</button></td>
                    </tr>`;
                })
                $('#tbody').html(html);
                $(document).ready(function () {
                    $('#dataTable').DataTable({
                        "order": [[0, "desc"]]
                    });
                });
            })
    });
})(jQuery);
async function getData(ID) {
    fetch(WEB_API + "User/GetByIdAccount?iduser=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { IDUser } = response;
            $('#IDUser').val(IDUser);
            $('#IDState').val("1");
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
async function restoreData(IDUser) {
    var data = {
        IDUser: $('#IDUser').val(),
        IDState: $('#IDState').val(),
    };
    fetch(WEB_API + "User/EditStateAccount", {
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
                alert('Khôi phục Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
async function deleteData(IDUser) {
    if (confirm('Bạn có muốn xoá tài khoản?')) {

        fetch(WEB_API + "User/DeleteAccount?iduser=" + IDUser, {
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
    } else {

    }
}
function clearTextBox() {
    $('#IDUser').val("");
    $('#UserName').val("");
    $('#Password').val("");
    document.getElementById('img').src = "";
    $('#FullName').val("");
    $('#Email').val("");
    $('#Phone').val("");
    $('#IDState').val("");
    $('#IDRole').val("");
    $('#Sex').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}

