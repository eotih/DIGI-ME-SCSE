const WEB_API = "http://localhost:59360/API/";
(function ($) {
    'use strict';
    $(function () {
        fetch(WEB_API + "User/ShowAllAccount")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var html = response.map(function (response) {
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
                    <td><button onclick="return getData(${IDUser})" class="btn btn-outline-primary">View</button>
                    <button onclick="return getDataPass(${IDUser})" class="btn btn-outline-warning">Reset Password</button>
                    <button onclick="return deleteData(${IDUser})" class="btn btn-outline-danger">Xoá</button></td>
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