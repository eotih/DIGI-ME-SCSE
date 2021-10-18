const API_GetUser = "http://localhost:59360/API/";
var GetToken = parseJwt(localStorage.getItem("token"));
window.addEventListener('load', loadData)
async function loadData() {
    fetch(API_GetUser + "User/GetByIdAccount?iduser=" + GetToken.nameid[6])
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { Username, Password, Image, FullName, Email, Phone, IDRole, Sex } = response;
            document.getElementById('imguser').src =Image;
            document.getElementById('avataruser').src = Image;
            $('#NameUser').text(FullName);
            $('#user-name').text(Username);
            switch (IDRole) {
                case 1:
                    $('#RoleName').text("Admin");
                    break;
                case 2:
                    $('#RoleName').text("Supporter");
                    break;
                case 3:
                    $('#RoleName').text("Mod");
                    break;
                default:
                    $('#RoleName').text("none");
            }
            $('#IDRole').val(IDRole);
            $('#Sexs').text(Sex);
            $('#Phones').text(Phone);
            $('#MailUser').text(Email);
           
        })
}
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};