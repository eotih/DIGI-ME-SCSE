const WEB_API = "http://localhost:59360/API/";
var getToken = parseJwt(localStorage.getItem("token"));
// ------------------------ TIẾNG VIỆT ------------------------ //
async function addPost() {
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
            Title: $("#tieude").val(),
            Details: $("#summernote").summernote("code"),
            IDCat: $("#theloai").val(),
            IDField: $("#linhvuc").val(),
            Image: $("#hinhanh").val(),
            Author: getToken.nameid[3],
          };
          fetch(WEB_API + "Management/AddOrEditPost", {
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
}
// ------------------------ TIẾNG ANH ------------------------ //

window.addEventListener("load", getData);
function getData() {
  fetch(WEB_API + "Management/ShowAllPostENNeedPost")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var Category = document.createElement("option");
      Category.innerHTML = "Vui lòng chọn";
      Category.value = 0;
      document.getElementById("PostVN").appendChild(Category);
      for (var i = 0; i < response.length; i++) {
        var ele = document.createElement("option");
        ele.value = response[i].IDPost;
        ele.innerHTML = response[i].Title;
        document.getElementById("PostVN").appendChild(ele);
      }
    });
}

async function addPostEN() {
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
            IDPostEN: $("#PostVN").val(),
            IDCat: $("#Category").val(),
            IDField: $("#field").val(),
            Title: $("#Title").val(),
            Details: $("#ENGPOST").summernote("code"),
            Image: $("#img").val(),
            Author: getToken.nameid[3],
          };
          fetch(WEB_API + "Management/AddPostEN", {
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
                alert("Thêm Thành Công");
                addNoti(1);
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
}
async function addNoti(numb) {
  var $dataNoti = {};
  if (numb === 1) {
    ($dataNoti.Title = "Đăng Tải Bài Viết"),
      ($dataNoti.Image = "https://cms.scse-vietnam.org/images/faces/LOA.jpg"),
      ($dataNoti.Decription =
        "Người dùng " + getToken.nameid[3] + " đã thêm 1 bài viết"),
      ($dataNoti.Status = "Chưa Xem"),
      ($dataNoti.Url =
        "https://cms.scse-vietnam.org/pages/Admin/BaiDang/QuanLyBaiDang.html");
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
