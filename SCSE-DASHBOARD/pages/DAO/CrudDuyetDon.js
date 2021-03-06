const WEB_API = "https://api.scse-vietnam.org/";
(function ($) {
  "use strict";
  $(function () {
    fetch(WEB_API + "Management/ShowAllVolunteers")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        var deleted = response.filter((v) => v.IDState === 4);
        $("#deleteCount").text(deleted.length);
        var result = response.filter((v) => v.IDState !== 4);
        var html = result.map(function (response) {
          let {
            ID,
            FirstName,
            LastName,
            DOB,
            Phone,
            Email,
            Address,
            Project,
            Purpose,
            IDState,
          } = response;
          if (IDState === 1) {
            IDState = '<div class="badge badge-opacity-warning">Pending</div>';
          }
          if (IDState === 2) {
            IDState = '<div class="badge badge-opacity-success">Approved</div>';
          }
          if (IDState === 3) {
            IDState =
              '<div class="badge badge-opacity-danger">NotApproved</div>';
          }
          if (IDState === 4) {
            IDState = '<div class="badge badge-opacity-danger">Deleted</div>';
          }
          return `<tr>
                    <td>${ID}</td>
                    <td>${FirstName}</td>
                    <td>${LastName}</td>
                    <td>${convertDate(DOB)}</td>
                    <td>${Phone}</td>
                    <td>${Email}</td>
                    <td>${Address}</td>
                    <td>${Project}</td>
                    <td>${Purpose}</td>
                    <td>${IDState}</td>
                    <td><button onclick="return getData(${ID})" class="btn btn-outline-primary">View</button>
                   <button onclick="Delete(${ID})" class="btn btn-danger">Delete</button>

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
function Delete(ID) {
  $("#ID2").val(ID);
  $("#State").val("4");
  $("#Delete").modal("show");
}
function convertDate(input) {
  var result = new Date(input);
  return result.toLocaleDateString();
}
async function getData(ID) {
  fetch(WEB_API + "Management/GetByIdVolunteer?id=" + ID)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const {
        ID,
        FirstName,
        LastName,
        DOB,
        Phone,
        Email,
        Address,
        Project,
        Purpose,
      } = response;
      $("#ID").val(ID);
      $("#FirstName").val(FirstName);
      $("#LastName").val(LastName);
      $("#DOB").val(DOB);
      $("#Phone").val(Phone);
      $("#Email").val(Email);
      $("#Address").val(Address);
      $("#Project").val(Project);
      $("#Purpose").val(Purpose);
      $("#Purpose").val(Purpose);
    });
  $("#exampleModal-2").modal("show");
  $("#add").hide();
  $("#edit").show();
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
            FirstName: $("#FirstName").val(),
            LastName: $("#LastName").val(),
            DOB: $("#DOB").val(),
            Phone: $("#Phone").val(),
            Email: $("#Email").val(),
            Address: $("#Address").val(),
            Project: $("#Project").val(),
            Purpose: $("#Purpose").val(),
          };
          fetch(WEB_API + "Management/RegisterVolunteer", {
            method: "POST",
            body: JSON.stringify($data),
            headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer "+localStorage.getItem('token'),
    },
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              if (data.Status === "Success") {
                alert("Th??m Th??nh C??ng");
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
    ID: $("#ID").val(),
    IDState: $("#IDState").val(),
  };
  fetch(WEB_API + "Management/EditState", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer "+localStorage.getItem('token'),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.Status === "Updated") {
        alert("S???a Th??nh C??ng");
        window.location.reload();
      } else {
        alert("Data not update");
      }
    });
}
async function deleteData() {
  var data = {
    ID: $("#ID2").val(),
    IDState: $("#State").val(),
  };
  fetch(WEB_API + "/Management/EditState", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer "+localStorage.getItem('token'),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.Status === "Updated") {
        alert("Xo?? Th??nh C??ng");
        window.location.reload();
      } else {
        alert("Data not update");
      }
    });
}
function clearTextBox() {
  $("#ID").val("");
  $("#FirstName").val("");
  $("#LastName").val("");
  $("#DOB").val("");
  $("#Phone").val("");
  $("#Email").val("");
  $("#Address").val("");
  $("#Project").val("");
  $("#Purpose").val("");
  $("#exampleModal-2").modal("show");
  $("#add").show();
  $("#edit").hide();
}
