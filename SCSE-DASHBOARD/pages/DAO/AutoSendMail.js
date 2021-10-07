const WEB_API = "http://localhost:59360/";

function getQuantityPendingAccount() {
    fetch(WEB_API + "User/GetByStateUser?IDState=1")
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        let data = {
            Name: 'Thành viên',
            Count: response.length
        }
        sendEmail(data)
    })
}
function sendEmail(dulieu) {
    let data = {
        To: 'eotihvn@gmail.com',
        Subject: 'Đây là email tự động, vui lòng không trả lời',
        Body: `Hi anh Giang, </br> Hiện tại đang có <b> ${dulieu.Count} - ${dulieu.Name}</b> đang chờ duyệt. 
        <a href="https://github.com/eotih/DIGI-ME-SCSE/issues"> Xem ngay </a>`
    }
    fetch(WEB_API + "send-email", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(function (response) {
        if (response.status === 200) {
            alert("Gửi mail thành công")
        }
    })
}