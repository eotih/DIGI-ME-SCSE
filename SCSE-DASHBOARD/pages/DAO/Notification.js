const NOTI_API = "http://localhost:59360/API/";

function notifyMe() {
  fetch(NOTI_API + "Management/ListNotification?status=" + "Chưa Xem")
    .then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.length > 0) {
        document.getElementById("Moi").innerText = "Bạn có " + response.length + " thông báo mới";
      }
      else {
        document.getElementById("Moi").innerText = "Bạn không có thông báo mới";
      }
      var html = response.map(function (response) {
        let { Decription, Url, Title, Image, CreatedByDate, ID } = response;
        return `<a class="dropdown-item preview-item" onclick="EditStatus(${ID})" href="${Url}">
                <div class="preview-thumbnail">
                  <img src="${Image}" alt="image" class="img-sm profile-pic">
                </div>
                <div class="preview-item-content flex-grow py-2">
                  <p class="preview-subject ellipsis font-weight-medium text-dark">${Title}</p>
                  <p class="fw-light small-text mb-0"> ${Decription} </p>
                </div>
              </a>`;
      })
      $('#tnoti').html(html);
    })
}
async function EditStatus(ID) {
  var $dataNoti = {};
  $dataNoti.ID = ID,
    $dataNoti.Status = 'Đã Xem',
    fetch(NOTI_API + "Management/Notification", {
      method: 'POST',
      body: JSON.stringify($dataNoti),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then(function (response) {
      return response.json()
    })

}
async function ClearNoti() {
  fetch(NOTI_API + "Management/ListNotification?status=" + "Chưa Xem")
    .then(function (response) {
      return response.json();
    }).then(function (response) {
      response.map(function (response) {
        console.log(response)
        EditStatus(response.ID)
      })
    })
}