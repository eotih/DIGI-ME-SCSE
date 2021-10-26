const WEB_API = "https://api.scse-vietnam.org/API/";
var getToken = parseJwt(localStorage.getItem("token"));
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
                    <a href="./Edit.html?Slug=${IDNews}"" class="btn btn-outline-primary">Xem chi tiết</a>
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
                    <a href="./EditEN.html?Slug=${IDNewsEN}" class="btn btn-outline-primary">Xem chi tiết</a>
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
                notify(3)
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
                notify(3)
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
        $dataNoti.Title = 'Tin tức mới',
        $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
        $dataNoti.Decription = 'Người dùng ' +getToken.nameid[3]+' đã đăng tải 1 tin tức mới',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if(numb === 2){
        $dataNoti.Title = 'Chỉnh sửa tin tức',
        $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
        $dataNoti.Decription = 'Người dùng ' +getToken.nameid[3]+' đã chỉnh sửa 1 bài đăng',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if(numb === 3){
        $dataNoti.Title = 'Xóa tin tức',
        $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
        $dataNoti.Decription = 'Người dùng ' +getToken.nameid[3]+' đã xóa 1 tin tức',
        $dataNoti.Status = 'Chưa Xem',
        $dataNoti.Url = 'https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html'
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