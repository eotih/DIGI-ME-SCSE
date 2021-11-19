const WEB_API = "http://localhost:59360/";
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}

(function ($) {
    'use strict';
    $(function () {
        fetch(WEB_API + "Management/ShowAllNewsVN")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var result = response.filter(v => v.IDState === 4)
                var html = result.map(function (response) {
                    let { IDNews, IdField, Title, Slug, Image, Author, IDState } = response;
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
                    if (IdField === 1) {
                        IdField = 'Giới và bình đăng giới'
                    }
                    if (IdField === 2) {
                        IdField = 'Biến đổi khí hậu môi trường'
                    }
                    if (IdField === 3) {
                        IdField = 'Thực tập sinh'
                    }
                    if (IdField === 4) {
                        IdField = 'Nghiên cứu Đào tạo'
                    }
                    return `<tr>
                    <td>${IDNews}</td>
                    <td>${IdField}</td>
                    <td>${Title}</td>
                    <td><img src='${Image}'/></td>
                    <td>${Author}</td>
                    <td>${IDState}</td>
                    <td><button onclick="return restoreData(${(IDNews)})" class="btn btn-success">Khôi phục</button> <button onclick="return deleteData(${IDNews})" class="btn btn-outline-danger">Xoá</button></td>
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
        fetch(WEB_API + "Management/ShowAllNewsEN")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {

                var result = response.filter(v => v.IDState === 4)
                var html = result.map(function (response) {
                    let { IDNewsEN, IdField, Title, SlugEN, Image, Author, IDState } = response;
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
                    if (IdField === 1) {
                        IdField = 'Giới và bình đăng giới'
                    }
                    if (IdField === 2) {
                        IdField = 'Biến đổi khí hậu môi trường'
                    }
                    if (IdField === 3) {
                        IdField = 'Thực tập sinh'
                    }
                    if (IdField === 4) {
                        IdField = 'Nghiên cứu Đào tạo'
                    }
                    return `<tr>
                    <td>${IDNewsEN}</td>
                    <td>${IdField}</td>
                    <td>${Title}</td>
                    <td><img src='${Image}'/></td>
                    <td>${Author}</td>
                    <td>${IDState}</td>
                    <td><a onclick="return restoreDataEN(${(IDNewsEN)})" class="btn btn-success">Restore</a> <button onclick="return deleteDataEN(${IDNewsEN})" class="btn btn-outline-danger">Xoá</button></td>
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
    $('#IDNews').val(ID);
    $('#IDState').val("1");
    $('#exampleModal-2').modal('show');
    $('#edit').show();
}
function restoreDataEN(ID) {
    $('#IDNewsEN').val(ID);
    $('#IDStateEN').val("1");
    $('#exampleModal').modal('show');
    $('#edit').show();
}
async function updateRestore() {
    var data = {
        IDNews: $('#IDNews').val(),
        IDState: $('#IDState').val(),
    };
    fetch(WEB_API + "Management/EditStateNewsVN", {
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
        IDNewsEN: $('#IDNewsEN').val(),
        IDState: $('#IDStateEN').val(),
    };
    fetch(WEB_API + "Management/EditStateNewsEN", {
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
async function deleteData(IDNews) {
    if (confirm('Bạn có muốn xoá tin tức này?')) {
        fetch(WEB_API + "Management/DeleteNewsVN?ID=" + IDNews, {
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
async function deleteDataEN(IDNewsEN) {
    if (confirm('Are you sure you want to delete?')) {
        fetch(WEB_API + "Management/DeleteNewsEN?ID=" + IDNewsEN, {
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