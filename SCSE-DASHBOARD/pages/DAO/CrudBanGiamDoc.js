const BASE_URL = "http://localhost:59360/";

window.addEventListener('load', loadData)
async function loadData() {
    fetch(BASE_URL + "/User/XemDanhSachQuyen")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { Username, Password, Image, FullName, Email, Phone, IDRole, Sex } = response;
            document.getElementById('avatar').src = Image;
            document.getElementById('img').src =Image;
            $('#Full-Name').text(FullName);
            $('#FullName').val(FullName);
            $('#user-name').text(Username);
            $('#OldPassword').val(Password);
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
            $('#Sex').val(Sex);
            $('#Phones').text(Phone);
            $('#Phone').val(Phone);
            $('#Mail').text(Email);
            $('#Email').val(Email);
        })
}