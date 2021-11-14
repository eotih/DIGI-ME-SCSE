const WEB_API = "http://localhost:59360/API/";
// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)

async function loadData() {
    fetch(WEB_API + "User/ViewAllState")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                const { Id, StateName } = response
                return `<tr>
                        <td>${Id}</td>
                        <td>${StateName}</td>DDD

                        </tr>`;
            })
            // đây là hàm trả ra tbody
            $('.tbody').html(html);
        })
}
async function getData(IdState) {
    fetch(WEB_API + "User/GetByIdState?IdState=" + IdState)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { Id, StateName } = response;
            $('#Id').val(Id),
                $('#StateName').val(StateName)
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
async function addData() {
    var $data = {
        StateName: $('#StateName').val(),
    };
    fetch(WEB_API + "User/AddState", {
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
        Id: $('#Id').val(),
        StateName: $('#StateName').val(),
    };
    fetch(WEB_API + "User/AddState", {
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
    fetch(WEB_API + "User/DeleteState?IDState=" + ID, {
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
