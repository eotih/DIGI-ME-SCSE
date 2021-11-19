const WEB_API = "http://localhost:59360/";
var getToken = parseJwt(localStorage.getItem("token"));

(function ($) {
  "use strict";
  $(function () {
    fetch(WEB_API + "User/ShowAllAccount")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        var deleted = response.filter((v) => v.IDState === 4);
        $("#deleteCount").text(deleted.length);
        var result = response.filter((v) => v.IDState !== 4);
        var html = result.map(function (response) {
          let { IDUser, FullName, Email, IDState, RoleName, Image } = response;
          var StateName = "";
          if (IDState === 1) {
            StateName =
              '<div class="badge badge-opacity-warning">Pending</div>';
          }
          if (IDState === 2) {
            StateName =
              '<div class="badge badge-opacity-success">Approved</div>';
          }
          if (IDState === 3) {
            StateName =
              '<div class="badge badge-opacity-danger">NotApproved</div>';
          }
          if (IDState === 4) {
            StateName = '<div class="badge badge-opacity-danger">Deleted</div>';
          }
          return `<tr>
                    <td>
                      <div class="form-check form-check-flat mt-0">
                        <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" aria-checked="false"><i class="input-helper"></i></label>
                      </div>
                    </td>
                    <td>
                        <div class="d-flex ">
                            <img class="me-3" style="height:60px;width:60px" src='${Image}'/>
                            <div>
                              <h6>${FullName}</h6>
                              <p>${Email}</p>
                              <p><b>${RoleName}</b></p>
                            </div>
                        </div>
                    </td>
                    <td>${StateName}</td>
                    <td><button onclick="return getData(${IDUser})" class="btn btn-outline-primary">Xem chi tiết</button>
                    <button onclick="return getDataPass(${IDUser})" class="btn btn-outline-warning">Đổi mật khẩu</button>
                    <button onclick="return deleteData(${IDUser})" class="btn btn-outline-danger">Xoá</button></td>
                    </tr>`;
        });
        $("#tbody").html(html);
        $(document).ready(function () {
          $("#dataTable").DataTable({
            order: [[0, "desc"]],
          });
        });
      })
      .catch((error) => {
        throw error;
      });
  });
})(jQuery);

async function getData(ID) {
  fetch(WEB_API + "User/GetByIdAccount?iduser=" + ID)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const {
        IDUser,
        Username,
        Password,
        Image,
        FullName,
        Email,
        Phone,
        IDState,
        IDRole,
        Sex,
      } = response;
      $("#IDUser").val(IDUser);
      $("#UserName").val(Username);
      $("#Password").val(Password);
      document.getElementById("img").src = Image;
      $("#FullName").val(FullName);
      $("#Email").val(Email);
      $("#Phone").val(Phone);
      $("#IDState").val(IDState);
      $("#IDRole").val(IDRole);
      $("#Sex").val(Sex);
    });
  $("#exampleModal-2").modal("show");
  $("#formPassword").hide();
  $("#add").hide();
  $("#edit").show();
}
function getDataPass(ID) {
  $("#IDReset").val(ID);
  $("#Modal").modal("show");
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
        var data = {
          Username: $("#UserName").val(),
          Password: $("#Password").val(),
          Image: $("#img").val(),
          FullName: $("#FullName").val(),
          Email: $("#Email").val(),
          Phone: $("#Phone").val(),
          IDState: $("#IDState").val(),
          IDRole: $("#IDRole").val(),
          Sex: $("#Sex").val(),
        };
        fetch(WEB_API + "User/AddOrEditAccount", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (data.Status === "Success") {
              addNoti(1);
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
  var data = {
    IDUser: $("#IDUser").val(),
    Username: $("#UserName").val(),
    Password: $("#Password").val(),
    Image: document.getElementById("img").src,
    FullName: $("#FullName").val(),
    Email: $("#Email").val(),
    Phone: $("#Phone").val(),
    IDState: $("#IDState").val(),
    IDRole: $("#IDRole").val(),
    Sex: $("#Sex").val(),
  };
  fetch(WEB_API + "User/AddOrEditAccount", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.Status === "Updated") {
        addNoti(2);
        alert("Sửa Thành Công");
        window.location.reload();
      } else {
        alert("Data not update");
      }
    });
}
async function resetPassword() {
    const Password = $('#PasswordReset').val()
  if (Password === "") {
  } else {
    let data = {
      IDUser: $("#IDReset").val(),
      Password: $("#PasswordReset").val(),
    };
    fetch(WEB_API + "User/EditPasswordAccount", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
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
}
async function deleteData(IDUser) {
  $("#ID").val(IDUser);
  $("#State").val("4");
  $("#exampleModal").modal("show");
  $("#edit").show();
}

async function updateDelete() {
  var data = {
    IDUser: $("#ID").val(),
    IDState: $("#State").val(),
  };
  fetch(WEB_API + "User/EditStateAccount", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.Status === "Updated") {
        addNoti(3);
        alert("Xoá Thành Công");
        window.location.reload();
      } else {
        alert("Data not update");
      }
    });
  clearDelete();
}
function clearDelete() {
  $("#IDReset").val("");
  $("#PasswordReset").val("");
}
function clearTextBox() {
  $("#IDUser").val("");
  $("#UserName").val("");
  $("#Password").val("");
  document.getElementById("img").src = "";
  $("#FullName").val("");
  $("#Email").val("");
  $("#Phone").val("");
  $("#IDState").val("");
  $("#IDRole").val("");
  $("#Sex").val("");
  $("#exampleModal-2").modal("show");
  $("#add").show();
  $("#edit").hide();
}
function addNoti(numb) {
  var $dataNoti = {};
  if (numb === 1) {
    ($dataNoti.Title = "Cập nhật tài khoản"),
      ($dataNoti.Image = "https://cms.scse-vietnam.org/images/faces/LOA.jpg"),
      ($dataNoti.Decription =
        "Người dùng " + getToken.nameid[3] + " đã thêm 1 tài khoản"),
      ($dataNoti.Status = "Chưa Xem"),
      ($dataNoti.Url =
        "https://cms.scse-vietnam.org/pages/Admin/QuanLyTaiKhoan.html");
  } else if (numb === 2) {
    ($dataNoti.Title = "Sửa thông tin tài khoản"),
      ($dataNoti.Image = "https://cms.scse-vietnam.org/images/faces/LOA.jpg"),
      ($dataNoti.Decription =
        "Người dùng " + getToken.nameid[3] + " đã sửa 1 tài khoản"),
      ($dataNoti.Status = "Chưa Xem"),
      ($dataNoti.Url =
        "https://cms.scse-vietnam.org/pages/Admin/QuanLyTaiKhoan.html");
  } else if (numb === 3) {
    ($dataNoti.Title = "Xóa Tài khoản"),
      ($dataNoti.Image = "https://cms.scse-vietnam.org/images/faces/LOA.jpg"),
      ($dataNoti.Decription =
        "Người dùng " + getToken.nameid[3] + " đã xóa 1 tài khoản"),
      ($dataNoti.Status = "Chưa Xem"),
      ($dataNoti.Url =
        "https://cms.scse-vietnam.org/pages/Admin/QuanLyTaiKhoan.html");
  }
  fetch(WEB_API + "Management/Notification", {
    method: "POST",
    body: JSON.stringify($dataNoti),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  }).then(function (response) {
    return response.json();
  });
}
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
