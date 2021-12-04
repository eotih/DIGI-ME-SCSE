const WEB_API = "https://api.scse-vietnam.org/";
window.addEventListener("load", getData);
async function getData() {
  const urlParams = new URLSearchParams(window.location.search);
  const slugResult = urlParams.get("Slug");
  fetch(WEB_API + "Interface/GetBySlugPhotoGallery?slug=" + slugResult)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
        var html = response.map(function (response) {
            let { ID, Title, TitleEN, IDField, IDCat, Image, Slug } = response;
            
            return `<tr>
                <td>${ID}</td>
                <td><img src='${WEB_API}/${Image}'></td>
                <td>
                <button onclick="return deletePhoto('${ID}')" class="btn btn-outline-danger">Xoá</button></td>
                </tr>`;
        })
        // đây là hàm trả ra tbody
        $('#tbody').html(html);
        $(document).ready(function () {
            $('#dataTable').DataTable({
                "order": [[0, "asc"]]
            });
        });

    })
}

function uploadImgToAlbumAPI(files) {
    var formData = new FormData();
    formData.append('file', files);
    formData.append('IDCat', $('#IDCat').val());
    formData.append('IDField', $('#IDField').val());
    formData.append('Title', $('#Title').val());
    formData.append('TitleEN', $('#TitleEN').val());
    fetch(WEB_API + "Interface/UploadAlbum", {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
        body: formData,
    }).then(function (response) {
        window.location.reload();
        return response.json()
    }
    ).then(function (data) {
        console.log(data);
    }
    ).catch(function (error) {
        console.log(error);
    }
    );
}
async function AlertAdd() {
    const fileInput = document.querySelector('input[id="getFile"]');
    const file = fileInput.files;
    for (let i = 0; i < file.length; i++) {
        (function (file) {
            setTimeout(function () {
                uploadImgToAlbumAPI(file)
            }, 3000);
        })(file[i]);
    }
    alert("Thêm thành công")
}
function deletePhoto(ID) {
    if (confirm("Bạn có muốn xoá ảnh này?")) {
        fetch(WEB_API + "Interface/DeletePhoto?id=" + ID, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.Status === "Delete") {
                    alert("Xoá thành công");
                    window.location.reload();
                } else {
                    alert("Data not deleted");
                }
            });
    }
}

async function getData1() {
    const urlParams = new URLSearchParams(window.location.search);
    const slugResult = urlParams.get("Slug");
    fetch(WEB_API + "Interface/GetPostBySlugToAdd?slug=" + slugResult)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        let { Title, TitleEN, IDField, IDCat } =
          response;
          console.log(response);
          $("#IDCat").val(IDCat),
          $("#IDField").val(IDField),
          $("#Title").val(Title),
          $("#TitleEN").val(TitleEN)
      });
    $("#exampleModal-3").modal("show");
    $('#add1').show();
    $('#edit1').hide();
  }