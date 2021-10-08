const WEB_API = "http://localhost:59360/";
(function ($) {
    const fields = [
        { name: 'IDPost', title: 'IDPost' },
        { name: 'IDCat', title: 'IDCat' },
        { name: 'Title', title: 'Title' },
        { name: 'Details', title: 'Details' },
        { name: 'Image', title: 'Image' },
        { name: 'Author', title: 'Author' },
        { name: 'State', title: 'State' },
        { name: 'Action', title: 'Action' }
    ]
    'use strict';
    $(function () {
        fetch(WEB_API + "Management/XemDanhSachBaiViet")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var result = response.filter(v => v.IDState !== 4)
                var html = result.map(function (response) {
                    let a = response.Details.substring(0, 200)
                    let { IDPost, IDCat, Title, Slug, Image, Author, IDState } = response;
                    if (IDState === 1) {
                        IDState = 'Pending'
                    }
                    if (IDState === 2) {
                        IDState = 'Approved'
                    }
                    if (IDState === 3) {
                        IDState = 'NotApproved'
                    }
                    if (IDState === 4) {
                        IDState = 'Deleted'
                    }
                    return `<tr>
                    <td>${IDPost}</td>
                    <td>${IDCat}</td>
                    <td>${Title}</td>
                    <td>${a}</td>
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
