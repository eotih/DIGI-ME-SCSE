function notifyMe() {
    fetch("http://localhost:59360/API/Management/ListNotification?status="+"Chưa Xem")
      .then(function (response) {
        return response.json();
      }).then(function (response) {
        if(response.length > 0){
          document.getElementById("Moi").innerText = "Bạn có "+response.length+" thông báo mới";
        }
        else{
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
                  $('#tbody').html(html);
      })
    //Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Xin Chào 500 anh em đang xem stream!");
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    }
  }
  async function EditStatus(ID){
    var $dataNoti = {};
        $dataNoti.ID = ID,
        $dataNoti.Status = 'Đã Xem',
    fetch("http://localhost:59360/API/Management/Notification", {
        method: 'POST',
        body: JSON.stringify($dataNoti),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(function (response) {
        return response.json()
    }) 
}