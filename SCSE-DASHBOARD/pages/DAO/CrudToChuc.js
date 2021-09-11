const WEB_API = "http://localhost:59360/";
window.addEventListener('load', loadData)

async function loadData() {
    fetch(WEB_API + "/Api/Interface/GetbyIdInfoOrganization?ID=1")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            $('#tbody').append(
            "<td>"+response.ID+"</td>",
            "<td>"+response.Name+"</td>",
            "<td>"+response.Field+"</td>",
            "<td>"+response.Phone+"</td>",
            "<td>"+response.Email+"</td>",
            "<td>"+response.Address+"</td>",
            "<img width='120px' height='86px' src='"+response.Logo+"'/>",
            "<td>"+response.Fanpage+"</td>",
            "<td>"+response.Youtube+"</td>",
            "<td>"+response.IDBank+"</td>",
            "<button type='button' onclick='getData("+response.ID+")' class='btn btn-primary'>Primary</button>",
            "</tr>"
            )
        })
}

async function getData(ID) {
   alert(ID)
}

async function updateData() {
    var $data = {
        IDUser: $('#IDUser').val(),
        FullName: $('#FullName').val(),
        Email: $('#Email').val(),
        IsActive: $('#IsActive').val(),
        IDRole: $('#IDRole').val()
    };
    fetch(WEB_API + "Api/Interface/EditInfoOrganization", {
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
function clearTextBox() {
    $('#IDUser').val("");
    $('#FullName').val("");
    $('#Email').val("");
    $('#IsActive').val("");
    $('#IDRole').val("");
    $('#exampleModalLabel').modal('show');
    $('#add').show();
    $('#edit').hide();
}