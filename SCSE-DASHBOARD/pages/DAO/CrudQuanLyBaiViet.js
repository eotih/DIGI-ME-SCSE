const WEB_API = "http://localhost:59360/";
(function ($) {

    'use strict';
    $(function () {
        fetch(WEB_API + "Management/XemDanhSachBaiViet")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
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
                    <td><a href="./Edit.html?Slug=${Slug}"" class="btn btn-outline-primary">View</a></td>
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
async function deleteTamThoi() {
    var dulieu = {
        IDPost: $('#IDPost').val(),
        IDCat: $('#IDCat').val(),
        IDState: 4,
        Title: $('#Title').val(),
        Slug: $('#Slug').val(),
        Details: $('#Details').val(),
        Image: $('#Image').val(),
        Author: $('#Author').val(),
    };
    fetch(WEB_API + "Management/ThemBaiViet", {
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
                alert('Sửa Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
