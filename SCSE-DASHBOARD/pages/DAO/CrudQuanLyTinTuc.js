const WEB_API = "https://api.scse-vietnam.org/API/";
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
                
                var deleted = response.filter(v => v.IDState === 4)
                $('#deleteCount').text(deleted.length);
                var result = response.filter(v => v.IDState !== 4)
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
                    <td><button onclick="return approveData(${IDNews})" class="btn btn-success">Duyệt bài</button>
                    <a href="./Edit.html?Slug=${IDNews}"" class="btn btn-outline-primary">View</a>
                    <button onclick="return deleteData(${IDNews})" class="btn btn-outline-danger">Xoá</button></td>
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
                var deletedEN = response.filter(v => v.IDState === 4)
                $('#deleteCountEN').text(deletedEN.length);
                var result = response.filter(v => v.IDState !== 4)
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
                    <td><button onclick="return approveDataEN(${IDNewsEN})" class="btn btn-success">Approve</button>
                    <a href="./EditEN.html?Slug=${IDNewsEN}" class="btn btn-outline-primary">View</a>
                    <button onclick="return deleteDataEN(${IDNewsEN})" class="btn btn-outline-danger">Xoá</button></td>
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
    $('#IDNews').val(ID);
    $('#IDState').val("4");
    $('#exampleModal-2').modal('show');
    $('#showform').hide();
    $('#HeaderApprove').hide();
    $('#HeaderDelete').show();
    $('#approveVN').hide();
    $('#deleteVN').show();
}
function deleteDataEN(ID){
    $('#IDNewsEN').val(ID);
    $('#IDStateEN').val("4");
    $('#exampleModal').modal('show');
    $('#showformEN').hide();
    $('#HeaderApproveEN').hide();
    $('#HeaderDeleteEN').show();
    $('#approveEN').hide();
    $('#deleteEN').show();
}
function approveData(ID){
    $('#IDNews').val(ID);
    $('#IDState').val("");
    $('#exampleModal-2').modal('show');
    $('#showform').show();
    $('#HeaderApprove').show();
    $('#HeaderDelete').hide();
    $('#approveVN').show();
    $('#deleteVN').hide();
}
function approveDataEN(ID){
    $('#IDNewsEN').val(ID);
    $('#IDStateEN').val("");
    $('#exampleModal').modal('show');
    $('#showformEN').show();
    $('#HeaderApproveEN').show();
    $('#HeaderDeleteEN').hide();
    $('#approveEN').show();
    $('#deleteEN').hide();
}
async function updateState(){
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
                alert('Cập nhật Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
async function updateStateEN(){
    var data = {
        IDNewsEN: $('#IDNewsEN').val(),
        IDState: $('#IDStateEN').val(),
    };
    fetch(WEB_API + "Management/ShowAllNewsEN", {
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
                alert('Cập nhật Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}