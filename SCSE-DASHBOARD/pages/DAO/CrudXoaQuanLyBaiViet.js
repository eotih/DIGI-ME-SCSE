const WEB_API = "http://localhost:59360/";
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}

(function ($) {
    'use strict';
    $(function () {
        fetch(WEB_API + "Management/XemDanhSachBaiViet")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var result = response.filter(v => v.IDState === 4)
                var html = result.map(function (response) {
                    let { IDPost, IDCat, Title, Slug, Image, Author, IDState } = response;
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
                    <td>${IDPost}</td>
                    <td>${IDCat}</td>
                    <td>${Title}</td>
                    <td><img src='${Image}'/></td>
                    <td>${Author}</td>
                    <td>${IDState}</td>
                    <td><button onclick="return restoreData(${(IDPost)})" class="btn btn-success">Khôi phục</button> <button onclick="return deleteData(${Slug})" class="btn btn-outline-danger">Xoá</button></td>
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
// -------------------------------- TIẾNG ANH -------------------------------- //
(function ($) {
    'use strict';
    $(function () {
        fetch(WEB_API + "Management/XemDanhSachBaiVietEN")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {

                var result = response.filter(v => v.IDState === 4)
                var html = result.map(function (response) {
                    let { IDPostEN, IDCat, Title, SlugEN, Image, Author, IDState } = response;
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
                    <td>${IDPostEN}</td>
                    <td>${IDCat}</td>
                    <td>${Title}</td>
                    <td><img src='${Image}'/></td>
                    <td>${Author}</td>
                    <td>${IDState}</td>
                    <td><a onclick="return restoreDataEN(${(IDPostEN)})" class="btn btn-success">Restore</a> <button onclick="return deleteDataEN(${SlugEN})" class="btn btn-outline-danger">Xoá</button></td>
                    </tr>`;
                })
                $('#tbodyENG').html(html);
                $(document).ready(function () {
                    $('#dataTableENG').DataTable({
                        "order": [[0, "asc"]]
                    });
                });
            })
            .catch(error => {
                throw error;
            })
    });
})(jQuery);

function restoreData(ID) {
    $('#IDPost').val(ID);
    $('#IDState').val("1");
    $('#exampleModal-2').modal('show');
    $('#edit').show();
}
function restoreDataEN(ID) {
    $('#IDPostEN').val(ID);
    $('#IDStateEN').val("1");
    $('#exampleModal').modal('show');
    $('#edit').show();
}
async function updateRestore() {
    var dulieu = {
        IDPost: $('#IDPost').val(),
        IDState: $('#IDState').val(),
    };
    fetch(WEB_API + "/Management/EditStatePost", {
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
                alert('Khôi phục Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
async function updateRestoreEN() {
    var dulieu = {
        IDPostEN: $('#IDPostEN').val(),
        IDState: $('#IDStateEN').val(),
    };
    fetch(WEB_API + "/Management/EditStatePostEN", {
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
                alert('Khôi phục Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
async function deleteData(Slug) {
    if (confirm('Bạn có muốn xoá tài khoản?')) {
        fetch(WEB_API + "Management/XoaBaiViet?slug=" + Slug, {
            method: "DELETE",
        })
        then(function (response) {
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
async function deleteDataEN(SlugEN) {
    console.log(SlugEN)
    if (confirm('Are you sure you want to delete?')) {
        fetch(WEB_API + "Management/XoaBaiVietEN?slugen=" + SlugEN, {
            method: "DELETE",
        })
        then(function (response) {
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