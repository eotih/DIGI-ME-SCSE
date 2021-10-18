const WEB_API = "https://api.scse-vietnam.org/API/";
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}

(function ($) {
    'use strict';
    $(function () {
        fetch(WEB_API + "Management/ShowAllPost")
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
                    if (IDCat === 1) {
                        IDCat = 'Dự án'
                    }
                    if (IDCat === 2) {
                        IDCat = 'Hợp tác nghiên cứu'
                    }
                    if (IDCat === 3) {
                        IDCat = 'Hoạt động thiện nguyện'
                    }
                    return `<tr>
                    <td>${IDPost}</td>
                    <td>${IDCat}</td>
                    <td>${Title}</td>
                    <td><img src='${Image}'/></td>
                    <td>${Author}</td>
                    <td>${IDState}</td>
                    <td><button onclick="return restoreData(${(IDPost)})" class="btn btn-success">Khôi phục</button> <button onclick="return deleteData(${IDPost})" class="btn btn-outline-danger">Xoá</button></td>
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
        fetch(WEB_API + "Management/ShowAllPostEN")
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
                    if (IDCat === 1) {
                        IDCat = 'Dự án'
                    }
                    if (IDCat === 2) {
                        IDCat = 'Hợp tác nghiên cứu'
                    }
                    if (IDCat === 3) {
                        IDCat = 'Hoạt động thiện nguyện'
                    }
                    return `<tr>
                    <td>${IDPostEN}</td>
                    <td>${IDCat}</td>
                    <td>${Title}</td>
                    <td><img src='${Image}'/></td>
                    <td>${Author}</td>
                    <td>${IDState}</td>
                    <td><a onclick="return restoreDataEN(${(IDPostEN)})" class="btn btn-success">Restore</a> <button onclick="return deleteDataEN(${IDPostEN})" class="btn btn-outline-danger">Xoá</button></td>
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
    var data = {
        IDPost: $('#IDPost').val(),
        IDState: $('#IDState').val(),
    };
    fetch(WEB_API + "Management/EditStatePost", {
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
async function updateRestoreEN() {
    var data = {
        IDPostEN: $('#IDPostEN').val(),
        IDState: $('#IDStateEN').val(),
    };
    fetch(WEB_API + "Management/EditStatePostEN", {
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
async function deleteData(IDPost) {
    if (confirm('Bạn có muốn xoá bài viết?')) {
        fetch(WEB_API + "Management/DeletePost?ID=" + IDPost, {
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
async function deleteDataEN(IDPostEN) {
    if (confirm('Are you sure you want to delete?')) {
        fetch(WEB_API + "Management/DeletePostEN?ID=" + IDPostEN, {
            method: "DELETE",
        })
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                debugger;
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