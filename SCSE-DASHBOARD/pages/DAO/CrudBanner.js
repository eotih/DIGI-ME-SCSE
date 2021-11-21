const WEB_API = "https://api.scse-vietnam.org/";
const getTaoken = parseJwt(localStorage.getItem("token"));
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener("load", loadData);
function convertDate(input) {
  var result = new Date(input);
  return result.toLocaleDateString();
}
async function loadData() {
  fetch(WEB_API + "Interface/ListBanner")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var html = response.map(function (response) {
        const {
          ID,
          Name,
          Image,
          CreatedByUser,
          CreatedByDate,
          UpdateByUser,
          UpdatedByDate,
        } = response;
        return `<tr>
                        <td>${ID}</td>
                        <td>${Name}</td>DDD
                        <td><img src="${Image}"/></td>
                        <td>${convertDate(CreatedByDate)}</td>
                        <td>${convertDate(UpdatedByDate)}</td>
                        <td><a onclick="return getData(${ID})" class="btn btn-outline-primary">Xem chi tiết</a></td>
                        </tr>`;
      });
      // đây là hàm trả ra tbody
      $("#tbody").html(html);
    });
}
async function getData(ID) {
  fetch(WEB_API + "Interface/GetByIdBanner?ID=" + ID)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const {
        Image,
        Name,
        CreatedByUser,
        CreatedByDate,
        UpdateByUser,
        UpdatedByDate,
      } = response;
      $("#ID").val(ID), (document.getElementById("Image").src = Image);
      $("#Name").val(Name);
    });
  $("#exampleModal-2").modal("show");
  $("#add").hide();
  $("#edit").show();
}
function getBaseUrl() {
  var file = document.querySelector("input[type=file]")["files"][0];
  var reader = new FileReader();
  reader.onloadend = function () {
    baseString = reader.result;
    $("#Img").val(baseString);
    document.getElementById("Image").src = baseString;
    // return autoUpdate(baseString);
  };
  reader.readAsDataURL(file);
}
var forms = document.querySelectorAll(".needs-validation");

// Loop over them and prevent submission
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        var $data = {
          Name: $("#Name").val(),
          Image: $("#Img").val(),
          CreatedByUser: getTaoken.nameid[3],
        };
        fetch(WEB_API + "Interface/AddOrEditBanner", {
          method: "POST",
          body: JSON.stringify($data),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + localStorage.getItem('token'),
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (data.Status === "Success") {
              alert("Thêm Thành Công");
              window.location.reload();
            } else {
              alert("Data not insert");
            }
          });
      }
      form.classList.add("was-validated");
    },
    false
  );
});

async function updateData() {
  var $data = {
    ID: $("#ID").val(),
    Name: $("#Name").val(),
    Image: $("#Img").val(),
    UpdateByUser: getTaoken.nameid[3],
  };
  fetch(WEB_API + "Interface/AddOrEditBanner", {
    method: "POST",
    body: JSON.stringify($data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer " + localStorage.getItem('token'),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.Status === "Updated") {
        alert("Sửa Thành Công");
        window.location.reload();
      } else {
        alert("Data not update");
      }
    });
}

async function deleteData(ID) {
  if (confirm("Bạn có muốn xoá không?")) {
    fetch(WEB_API + "Interface/DeleteBanner?ID=" + ID, {
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
          alert("Data not delete");
        }
      });
  }
}
function clearTextBox() {
  $("#ID").val("");
  $("#Name").val("");
  $("#Img").val("");
  $("#CreatedByUser").val("");
  $("#CreatedByDate").val("");
  $("#UpdateByUser").val("");
  $("#UpdatedByDate").val("");
  $("#exampleModal-2").modal("show");
  $("#add").show();
  $("#edit").hide();
}
function Close() {
  $(".modal").modal("hide");
}
