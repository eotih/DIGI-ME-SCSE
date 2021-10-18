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
        fetch(WEB_API + "Management/ShowAllPostEN")
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
async function updateState(){
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
                addNoti(3);
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
                addNoti(3);
                alert('Cập nhật Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}

function addNoti(numb){
    var $dataNoti = {};
    if(numb === 1){
        $dataNoti.Title = 'Đăng Tải Bài Viết',
        $dataNoti.Image = 'http://127.0.0.1:5500/images/faces/dangbai.jpg',
        $dataNoti.Decription = 'Người dùng ' +getToken.nameid[3]+' đã thêm 1 bài viết',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'http://127.0.0.1:5500/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if(numb === 2){
        $dataNoti.Title = 'Sửa Bài Viết',
        $dataNoti.Image = 'http://127.0.0.1:5500/images/faces/dangbai.jpg',
        $dataNoti.Decription = 'Người dùng ' +getToken.nameid[3]+' đã sửa 1 bài viết',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'http://127.0.0.1:5500/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if(numb === 3){
        $dataNoti.Title = 'Xóa Bài Viết',
        $dataNoti.Image = 'http://127.0.0.1:5500/images/faces/dangbai.jpg',
        $dataNoti.Decription = 'Người dùng ' +getToken.nameid[3]+' đã xóa 1 bài viết',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'http://127.0.0.1:5500/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    fetch(WEB_API + "Management/Notification", {
        method: 'POST',
        body: JSON.stringify($dataNoti),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(function (response) {
        return response.json()
    }) 
}
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};