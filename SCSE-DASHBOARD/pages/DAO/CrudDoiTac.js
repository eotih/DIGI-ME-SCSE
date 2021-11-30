const WEB_API = "https://api.scse-vietnam.org/";
// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)
window.addEventListener('load', loadDataPending)

async function loadData() {
    fetch(WEB_API + "Interface/ListPartner")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const filterData = response.filter(v => v.IDState ===2)
            const data = filterData.map(function (response) {
                const { ID, OrganizationName, Image, OrganizationProgrames,ContactPerson, Phone, Email, Address, Link,LinkFile, IDState } = response
                const State = changeIdState(IDState);
                return `<tr>
                        <td>${ID}</td>
                        <td>${OrganizationName}</td>
                        <td>${ContactPerson}</td>
                        <td>${OrganizationProgrames}</td>
                        <td><img src="${Image}"/></td>
                        <td>${Phone}</td>
                        <td>${Email}</td>
                        <td>${Address}</td>
                        <td>${Link}</td>
                        <td><a href="${WEB_API}${LinkFile}">Xem</td>
                        <td>${State}</td>
                        <td><a onclick="return getData(${ID})" class="btn btn-outline-primary">Xem chi tiết</a>
                        <a onclick="return deleteData(${ID})" class="btn btn-outline-danger">Xóa</a></td>
                        </tr>`;
            })
            // đây là hàm trả ra tbody
            $('#tbodyApproved').html(data);
            $(document).ready(function () {
                $('#dataTableApproved').DataTable({
                    "order": [[0, "desc"]]
                });
            });
        })
}(jQuery);
async function loadDataPending() {
    fetch(WEB_API + "Interface/ListPartner")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const filterData = response.filter(v => v.IDState ===1)
            const data = filterData.map(function (response) {
                const { ID, OrganizationName, Image, OrganizationProgrames,ContactPerson, Phone, Email, Address, Link,LinkFile, IDState } = response
                const State = changeIdState(IDState);
                return `<tr>
                        <td>${ID}</td>
                        <td>${OrganizationName}</td>
                        <td>${ContactPerson}</td>
                        <td>${OrganizationProgrames}</td>
                        <td>${Phone}</td>
                        <td>${Email}</td>
                        <td>${Address}</td>
                        <td><a href="${WEB_API}${LinkFile}">Xem</td>
                        <td>${State}</td>
                        <td><a onclick="return getData(${ID})" class="btn btn-outline-primary">Xem chi tiết</a>
                        <a onclick="return deleteData(${ID})" class="btn btn-outline-danger">Xóa</a></td>
                        </tr>`;
            })
            // đây là hàm trả ra tbody
            $('#tbodyPending').html(data);
            $(document).ready(function () {
                $('#dataTable').DataTable({
                    "order": [[0, "desc"]]
                });
            });
        })
}(jQuery);
const changeIdState = (id) => {
    if (id === 1) {
        return 'Pending'
    }
    if (id === 2) {
        return 'Approved'
    }
    if (id === 3) {
        return 'NotApproved'
    }
    if (id === 4) {
        return 'Deleted'
    }
}
async function getData(ID) {
    fetch(WEB_API + "Interface/GetByIdPartner?ID=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { ID, OrganizationName, Image, OrganizationProgrames,ContactPerson, Phone, Email, Address, Link,LinkFile, IDState } = response
            const State = changeIdState(IDState);
            $('#ID').val(ID),
                document.getElementById("Image").src = Image;
            $('#OrganizationName').val(OrganizationName);
            $('#OrganizationProgrames').val(OrganizationProgrames);
            $('#ContactPerson').val(ContactPerson);
            $('#Phone').val(Phone);
            $('#Email').val(Email);
            $('#Address').val(Address);
            $('#Link').val(Link);
            $('#IDState').val(IDState);
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
function getBaseUrl() {
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    reader.onloadend = function () {
        baseString = reader.result;
        $('#Img').val(baseString);
        document.getElementById("Image").src = baseString;
        // return autoUpdate(baseString);
    };
    reader.readAsDataURL(file);
}
async function addData() {
    var $data = {
        Name: $('#Name').val(),
        Image: document.getElementById("Image").src,
        Field: $('#Field').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        Link: $('#Link').val(),
    };
    fetch(WEB_API + "Interface/AddOrEditPartner", {
        method: 'POST',
        body: JSON.stringify($data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": "Bearer "+localStorage.getItem('token'),
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
        ID: $('#ID').val(),
        OrganizationName: $('#OrganizationName').val(),
        Image: document.getElementById("Image").src,
        OrganizationProgrames: $('#OrganizationProgrames').val(),
        ContactPerson: $('#ContactPerson').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        Link: $('#Link').val(),
        IDState: $('#IDState').val(),
    };
    fetch(WEB_API + "Interface/AddOrEditPartner", {
        method: 'POST',
        body: JSON.stringify($data),
        headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer "+localStorage.getItem('token'),
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
    if(confirm('Bạn có muốn xoá đối tác này?')){
    fetch(WEB_API + "Interface/DeletePartner?ID=" + ID, {
        method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
            }
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
    else{
        
    }
}
function clearTextBox() {
    $('#ID').val("");
    $('#Name').val("");
    $('#Img').val("");
    $('#Field').val("");
    $('#Phone').val("");
    $('#Email').val("");
    $('#Address').val("");
    $('#Link').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}