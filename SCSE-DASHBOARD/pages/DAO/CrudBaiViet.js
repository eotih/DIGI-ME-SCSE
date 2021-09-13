const WEB_API = "http://localhost:59360/";
async function addData(){
    var $data = {
        Title: $('#Title').val(),
        Detail: $('#summernote').summernote('code'),
        IDCat: $('#IDCat').val(),
        Author: $('#Author').val()
    };
    debugger;
    
    fetch(WEB_API + "Management/ThemBaiViet", {
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