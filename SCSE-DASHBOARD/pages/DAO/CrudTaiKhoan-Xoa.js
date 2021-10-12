const BASE_URL = "http://localhost:59360/";
window.addEventListener('load', loadData)
async function loadData() {
    fetch(BASE_URL + "/User/XemDanhSachTaiKhoan")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var result = response.filter(v => v.StateName === "Deleted");
            var html = result.map(function (response) {
                let { IDUser, FullName, Email, StateName, RoleName, Image } = response;
                console.log(response);
                return `<tr>
                    <td>${IDUser}</td>
                    <td>${FullName}</td>
                    <td>${Email}</td>
                    <td>${StateName}</td>
                    <td>${RoleName}</td>
                    <td><img src="${Image}"></td>
                    <td><button onclick="return getData(${IDUser})" class="btn btn-danger">Khôi phục</button> <button onclick="return deleteData(${IDUser})" class="btn btn-outline-primary">Xoá</button></td>
                    </tr>`;
            })
            $('#tbody').html(html);
        })
}
async function getData(ID) {
    fetch(BASE_URL + "/User/GetByIdTaiKhoan?iduser=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { IDUser} = response;
            $('#IDUser').val(IDUser);
            $('#IDState').val("1");
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
async function restoreData(IDUser) {
    var dulieu = {
        IDUser: $('#IDUser').val(),
        IDState: $('#IDState').val(),
    };
    fetch(BASE_URL + "User/EditState", {
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
                alert('Khôi phục Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
async function deleteData(IDUser) {
    if(confirm('Bạn có muốn xoá tài khoản?')){

        fetch(BASE_URL + "User/XoaTaiKhoan?iduser="+ IDUser,{
            method: "DELETE",
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.Status === 'Delete'){
                    alert('Xoá thành công')
                    window.location.reload();
                }
                else{
                    alert('Data not deleted')
                }
            })
    } else{

    }
}
function clearTextBox() {
    $('#IDUser').val("");
    $('#UserName').val("");
    $('#Password').val("");
    document.getElementById('img').src="";
    $('#FullName').val("");
    $('#Email').val("");
    $('#Phone').val("");
    $('#IDState').val("");
    $('#IDRole').val("");
    $('#Sex').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}

