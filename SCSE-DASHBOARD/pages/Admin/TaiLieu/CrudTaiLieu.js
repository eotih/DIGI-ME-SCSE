const url = "http://localhost:59360/";
async function addData() {
    var dulieu = {
        IDCat: $('#IDCat').val(),
        Title: $('#Title').val(),
        Slug: $('#Slug').val(),
        Details: $('#Details').val(),
        Image: $('#Image').val(),
        Video: $('#Video').val(),
        Author: $('#Author').val(),
        Status: $('#Status').val()
    };
    fetch(url + "/Management/ThemBaiViet", {
        method: 'POST',
        body: JSON.stringify(dulieu),
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
async function getData(ID) {
    fetch(url + "/api/GetByIDTaiLieu?id=" + ID)
        .then(function (response) {
            return response.json();
        })
            .then(function (response) {
                $('#ID').val(response.ID)
                $('#NamePDF').val(response.NamePDF);
                $('#Iframe').val(response.Iframe);
            })
            
}

