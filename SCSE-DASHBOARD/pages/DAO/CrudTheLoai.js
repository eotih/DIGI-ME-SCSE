const WEB_API = "http://localhost:59360/";
// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)

async function loadData() {
    fetch(WEB_API + "Api/Interface/ListCategory")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                const { IDCat,CategoryName } = response
                return `<tr>
                        <td>${IDCat}</td>
                        <td>${CategoryName}</td>DDD
                        <td><button onclick="return getData(${IDCat})" class="btn btn-outline-primary">View</button>
                        <button onclick="return deleteData(${IDCat})" class="btn btn-outline-primary">Delete</button><td>
                        </tr>`;
            })
            // đây là hàm trả ra tbody
            $('.tbody').html(html);
        })
}
async function getData(IDCat) {
    fetch(WEB_API + "Api/Interface/GetByIdCategory?ID=" + IDCat)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { IDCat,CategoryName} = response;
            $('#IDCat').val(IDCat),
            $('#CategoryName').val(CategoryName)
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
async function addData() {
    var $data = {
        CategoryName: $('#CategoryName').val(),
    };
    fetch(WEB_API + "Api/Interface/AddOrEditCategory", {
        method: 'POST',
        body: JSON.stringify($data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Success') {
                alert('Thêm Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not insert')
            }
        })
}
async function updateData() {
    var $data = {
        IDCat: $('#IDCat').val(),
        CategoryName: $('#CategoryName').val(),
    };
    fetch(WEB_API + "Api/Interface/AddOrEditCategory", {
        method: 'POST',
        body: JSON.stringify($data),
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

async function deleteData(ID) {
    fetch(WEB_API + "Api/Interface/DeletePartner?ID=" + ID, {
        method: 'DELETE',
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Delete') {
                alert('Xoá thành công')
                window.location.reload();
            }
            else {
                alert('Data not delete')
            }
        })
}
function clearTextBox() {
    $('#IDCat').val("");
    $('#CategoryName').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}