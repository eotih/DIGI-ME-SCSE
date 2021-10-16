const WEB_API = "http://localhost:59360/API/";
// đây là hàm khi vào trang sẽ auto chạy hàm loadData đầu tiên
window.addEventListener('load', loadData)

async function loadData() {
    fetch(WEB_API + "Interface/ViewAllContact")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                const { ID, FullName,Subtitle,LastName, Phone, Email, Details, CreatedByDate } = response
                return `<tr>
                        <td>${ID}</td>
                        <td>${FullName}</td>
                        <td>${Subtitle}</td>
                        <td>${Phone}</td>
                        <td>${Email}</td>
                        <td>${Details}</td>
                        <td>${CreatedByDate}</td>
                        <td><button onclick="return deleteData(${ID})" class="btn btn-outline-primary">Delete</button><td>
                        </tr>`;
            })
            // đây là hàm trả ra tbody
            $('.tbody').html(html);
        })
}


async function deleteData(ID) {
    fetch(WEB_API + "Interface/DeleteContact?ID=" + ID, {
        method: 'DELETE',
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Delete') {
                alert('Xoá thành công')
                window.location.reload();
            }
            else {
                alert('Data not delete')
            }
        })
}
