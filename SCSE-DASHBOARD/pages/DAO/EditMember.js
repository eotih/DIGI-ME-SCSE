const WEB_API = "http://localhost:59360/API/";
window.addEventListener('load', getDataEditMember)
//EDIT THÀNH VIÊN KHÁC
async function getDataEditMember() {
    const urlParams = new URLSearchParams(window.location.search);
    const slugResult = urlParams.get('Slug');
    fetch(WEB_API + "Interface/GetByIdPortfolios?id=" + slugResult)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { ID, FullName, Position, Details} = response;
            $('#ID').val(ID),
                $('#FullName').val(FullName),
                $('#Position').val(Position),
                $('#summernote').summernote('code', Details)
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}

async function updateOtherMember() {
    var data = {
        ID: $('#ID').val(),
        FullName: $('#FullName').val(),
        Position: $('#Position').val(),
        Details: $('#summernote').val(),
    };
    debugger;
    fetch(WEB_API + "Interface/AddOrEditPortfolios", {
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
                alert('Sửa Thành Công')
                window.location.href = "./Ban-Giam-Doc.html"
            }
            else {
                alert('Data not update')
            }
        })
}
