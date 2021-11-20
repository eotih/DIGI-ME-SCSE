const WEB_API = "https://api.scse-vietnam.org/";
var getToken = parseJwt(localStorage.getItem("token"));
function convertDate(input) {
    var result = new Date(input)
    return result.toLocaleDateString()
}
function convertState(input) {
    if (input === 1) {
        return '<div class="badge badge-opacity-warning">Pending</div>'
    }
    else if (input === 2) {
        return '<div class="badge badge-opacity-success">Approved</div>'
    }
    else if (input === 3) {
        return '<div class="badge badge-opacity-danger">NotApproved</div>'
    }
    else if (input === 4) {
        return '<div class="badge badge-opacity-danger">Deleted</div>'
    }
}
function convertCategory(category) {
    if (category === 1) {
        return 'Dự án'
    }
    else if (category === 2) {
        return 'Hợp tác nghiên cứu'
    }
    else if (category === 3) {
        return 'Hoạt động thiện nguyện'
    }
}
function convertField(field) {
    console.log(field)
    if (field === 1) {
        return 'Giới và bình đẳng giới'
    }
    else if (field === 2) {
        return 'Biến đổi khí hậu môi trường'
    }
    else if (field === 3) {
        return 'Thực tập sinh'
    }
    else if (field === 4) {
        return 'Nghiên cứu và đào tạo'
    }
    else if (field === undefined) {
        return ''
    }
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
                    const { IDPost, IDCat, IDField, Title, Slug, Image, Author, IDState } = response;
                    return `<tr>
                    <td>${IDPost}</td>
                    <td>${convertCategory(IDCat)}</td>
                    <td>${convertField(IDField)}</td>
                    <td>${Title}</td>
                    <td><img src='${Image}'/></td>
                    <td>${Author}</td>
                    <td>${convertState(IDState)}</td>
                    <td><button onclick="return approveData(${IDPost})" class="btn btn-success">Duyệt bài</button>
                    <a href="./Edit.html?Slug=${IDPost}"" class="btn btn-outline-primary">Xem chi tiết</a>
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
                    let { IDPostEN, IDCat, IDField, Title, SlugEN, Image, Author, IDState } = response;
                    return `<tr>
                    <td>${IDPostEN}</td>
                    <td>${convertCategory(IDCat)}</td>
                    <td>${convertCategory(IDField)}</td>
                    <td>${Title}</td>
                    <td><img src='${Image}'/></td>
                    <td>${Author}</td>
                    <td>${convertState(IDState)}</td>
                    <td><button onclick="return approveDataEN(${IDPostEN})" class="btn btn-success">Approve</button>
                    <a href="./EditEN.html?Slug=${IDPostEN}" class="btn btn-outline-primary">Xem chi tiết</a>
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

function deleteData(ID) {
    $('#IDPost').val(ID);
    $('#IDState').val("4");
    $('#exampleModal-2').modal('show');
    $('#showform').hide();
    $('#HeaderApprove').hide();
    $('#HeaderDelete').show();
    $('#approveVN').hide();
    $('#deleteVN').show();
}
function deleteDataEN(ID) {
    $('#IDPostEN').val(ID);
    $('#IDStateEN').val("4");
    $('#exampleModal').modal('show');
    $('#showformEN').hide();
    $('#HeaderApproveEN').hide();
    $('#HeaderDeleteEN').show();
    $('#approveEN').hide();
    $('#deleteEN').show();
}
function approveData(ID) {
    $('#IDPost').val(ID);
    $('#IDState').val("");
    $('#exampleModal-2').modal('show');
    $('#showform').show();
    $('#HeaderApprove').show();
    $('#HeaderDelete').hide();
    $('#approveVN').show();
    $('#deleteVN').hide();
}
function approveDataEN(ID) {
    $('#IDPostEN').val(ID);
    $('#IDStateEN').val("");
    $('#exampleModal').modal('show');
    $('#showformEN').show();
    $('#HeaderApproveEN').show();
    $('#HeaderDeleteEN').hide();
    $('#approveEN').show();
    $('#deleteEN').hide();
}
async function updateState() {
    var data = {
        IDPost: $('#IDPost').val(),
        IDState: $('#IDState').val(),
    };
    fetch(WEB_API + "Management/EditStatePost", {
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
                addNoti(3);
                alert('Cập nhật Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
async function updateStateEN() {
    var data = {
        IDPostEN: $('#IDPostEN').val(),
        IDState: $('#IDStateEN').val(),
    };
    fetch(WEB_API + "Management/EditStatePostEN", {
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
                addNoti(3);
                alert('Cập nhật Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}

function addNoti(numb) {
    var $dataNoti = {};
    if (numb === 1) {
        $dataNoti.Title = 'Đăng Tải Bài Viết',
            $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
            $dataNoti.Decription = 'Người dùng ' + getToken.nameid[3] + ' đã thêm 1 bài viết',
            $dataNoti.Status = 'Chưa Xem',
            $dataNoti.Url = 'https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if (numb === 2) {
        $dataNoti.Title = 'Sửa Bài Viết',
            $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
            $dataNoti.Decription = 'Người dùng ' + getToken.nameid[3] + ' đã sửa 1 bài viết',
            $dataNoti.Status = 'Chưa Xem',
            $dataNoti.Url = 'https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html'
    }
    else if (numb === 3) {
        $dataNoti.Title = 'Xóa Bài Viết',
            $dataNoti.Image = 'https://cms.scse-vietnam.org/images/faces/LOA.jpg',
            $dataNoti.Decription = 'Người dùng ' + getToken.nameid[3] + ' đã xóa 1 bài viết',
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