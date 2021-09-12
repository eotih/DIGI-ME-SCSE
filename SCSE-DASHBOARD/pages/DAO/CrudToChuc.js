const WEB_API = "http://localhost:59360/";
window.addEventListener('load', loadData)
window.addEventListener('load', getBankInfo)

async function loadData() {
    fetch(WEB_API + "Api/Interface/GetbyIdInfoOrganization?ID=1")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            document.getElementById("imgLogo").src = response.Logo;
            $('#TenCongTy').text(response.Name);
            $('#lv1').text(response.Field);
            $('#SoDienThoai').text(response.Phone);
            $('#mail').text(response.Email);
            $('#Fanpage2').text(response.Fanpage);
            $('#Youtube2').text(response.Youtube);


            $('#ID').val(response.ID);
            document.getElementById("LogoToChuc").src = response.Logo;
            $('#Name').val(response.Name);
            $('#Field').val(response.Field);
            $('#Phone').val(response.Phone);
            $('#Email').val(response.Email);
            $('#Address').val(response.Address);
            $('#Fanpage').val(response.Fanpage);
            $('#Youtube').val(response.Youtube);
        })
}

async function updateData() {
    var $data = {
        ID: $('#ID').val(),
        Name: $('#Name').val(),
        Field: $('#Field').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        Fanpage: $('#Fanpage').val(),
        Youtube: $('#Youtube').val(),
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

async function getBankInfo() {
    fetch(WEB_API + "Api/Interface/GetbyIdBankInfo?idbank=1")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var res = response.map(function (res) {
                return `
                    <div class="card-body">
                          <div class="container text-center pt-5">
                            <div class="row pricing-table">
                              <div  class="col-md-4 col-xl-4 grid-margin stretch-card pricing-card">
                                <div class="card border-primary border pricing-card-body">
                                  <div class="text-center pricing-card-head">
                                    <img alt="profile" src="${res.ImageQR}" class="img-lg rounded-circle mb-3" />
                                  </div>
                                  <div class="wrapper">
                                    <button onclick="return getData(${res.ID})" class="btn btn-outline-primary btn-block">Chỉnh sửa</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>`;
            });
            document.getElementById("moi").innerHTML = res.join('');

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

