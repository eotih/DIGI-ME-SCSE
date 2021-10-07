const WEB_API = "http://localhost:59360/";
window.addEventListener('load', loadData)
window.addEventListener('load', getBankInfo)

async function loadData() {
    fetch(WEB_API + "Api/Interface/GetbyIdInfoOrganization?ID=3")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const {Name,Field,Phone,Email,Fanpage,Youtube,ID,Logo,Address} = response;
            document.getElementById("imgLogo").src = Logo;
            $('#TenCongTy').text(Name);
            $('#lv1').text(Field);
            $('#SoDienThoai').text(Phone);
            $('#mail').text(Email);
            $('#Fanpage2').text(Fanpage);
            $('#Youtube2').text(Youtube);
            $('#ID').val(ID);
            $('#Name').val(Name);
            $('#Phone').val(Phone);
            $('#Email').val(Email);
            $('#Address').val(Address);
            $('#Fanpage').val(Fanpage);
            $('#Youtube').val(Youtube);
        })
}

async function updateData() {
    const file='AAAA'
    var $data = {
        ID: $('#ID').val(),
        Name: $('#Name').val(),
        Field: file,
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        Fanpage: $('#Fanpage').val(),
        Youtube: $('#Youtube').val(),
    };
    debugger;
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

async function getBankInfo() {
    fetch(WEB_API + "Api/Interface/GetbyIdBankInfo?idbank=1")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (posts) {
                return `
                <div class="col-lg grid-margin stretch-card pricing-card">
                    <div class="card border-primary border pricing-card-body">
                        <div class="text-center pricing-card-head">
                            <img src="${posts.ImageQR}" class="img-lg rounded-circle mb-3" />
                            <tr>
                            <td>${BankName}</td>
                            </tr>
                        </div>
                        <div class="wrapper">
                        <button onclick="return getData(${posts.ID})" class="btn btn-outline-primary btn-block">Chỉnh sửa</button>
                        </div>
                    </div>
                </div>
                `;
            });
            document.getElementById("moi").innerHTML = html.join('');

        })
}
async function getData(ID) {
    fetch(WEB_API + "Api/Interface/GetByID?id=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            $('#ID3').val(response.ID),
                document.getElementById("img").src = response.ImageQR;
                $()
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}

function getBaseUrl() {
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    var baseString;
    reader.onloadend = function () {
        baseString = reader.result;
        return autoUpdate(baseString)
    };
    reader.readAsDataURL(file);
    //console.log(baseString)
}
async function autoUpdate(baseString) {
    var $data = {
        ID: $('#ID3').val(),
        ImageQR: baseString
    }
    fetch(WEB_API + "Api/Interface/AddOrEditBankInfo", {
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

