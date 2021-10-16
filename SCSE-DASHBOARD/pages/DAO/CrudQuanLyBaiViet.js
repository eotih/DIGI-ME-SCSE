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
                
                var deleted = response.filter(v => v.IDState === 4)
                $('#deleteCount').text(deleted.length);
                var result = response.filter(v => v.IDState !== 4)
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
                    <td><button onclick="return approveData(${IDPost})" class="btn btn-success">Duyệt bài</button>
                    <a href="./Edit.html?Slug=${Slug}"" class="btn btn-outline-primary">View</a>
                    <button onclick="return deleteData(${IDPost})" class="btn btn-outline-danger">Xoá</button></td>
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
                
                var deletedEN = response.filter(v => v.IDState === 4)
                $('#deleteCountEN').text(deletedEN.length);
                var result = response.filter(v => v.IDState !== 4)
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
                    <td><button onclick="return approveDataEN(${IDPostEN})" class="btn btn-success">Approve</button>
                    <a href="./EditEN.html?Slug=${SlugEN}" class="btn btn-outline-primary">View</a>
                    <button onclick="return deleteDataEN(${IDPostEN})" class="btn btn-outline-danger">Xoá</button></td>
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

function deleteData(ID){
    $('#IDPost').val(ID);
    $('#IDState').val("4");
    $('#exampleModal-2').modal('show');
    $('#showform').hide();
    $('#HeaderApprove').hide();
    $('#HeaderDelete').show();
    $('#approveVN').hide();
    $('#deleteVN').show();
}
function deleteDataEN(ID){
    $('#IDPostEN').val(ID);
    $('#IDStateEN').val("4");
    $('#exampleModal').modal('show');
    $('#showformEN').hide();
    $('#HeaderApproveEN').hide();
    $('#HeaderDeleteEN').show();
    $('#approveEN').hide();
    $('#deleteEN').show();
}
function approveData(ID){
    $('#IDPost').val(ID);
    $('#IDState').val("");
    $('#exampleModal-2').modal('show');
    $('#showform').show();
    $('#HeaderApprove').show();
    $('#HeaderDelete').hide();
    $('#approveVN').show();
    $('#deleteVN').hide();
}
function approveDataEN(ID){
    $('#IDPostEN').val(ID);
    $('#IDStateEN').val("");
    $('#exampleModal').modal('show');
    $('#showformEN').show();
    $('#HeaderApproveEN').show();
    $('#HeaderDeleteEN').hide();
    $('#approveEN').show();
    $('#deleteEN').hide();
}
async function deleteTamThoi(){
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
                alert('Cập nhật Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
async function deleteTamThoiEN(){
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
                alert('Cập nhật Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}