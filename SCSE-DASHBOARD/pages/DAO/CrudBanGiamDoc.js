const BASE_URL = "http://localhost:59360/";

window.addEventListener('load', loadData)
async function loadData() {
    fetch(BASE_URL + "/Api/Interface/ShowAllPorfolio")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let { ID, FullName, IDImg, Position, Details} = response;
                    return `<tr>
                    <td>${ID}</td>
                    <td>${FullName}</td>
                    <td>${IDImg}</td>
                    <td>${Position}</td>
                    <td>${Details}</td>
                    <td><button onclick="return getData(${IDUser})" class="btn btn-outline-primary">View</button> <button onclick="return deleteData(${IDUser})" class="btn btn-outline-danger">Xoá</button></td>
                    </tr>`;
                })
                $('#tbody').html(html);
                $(document).ready(function () {
                    $('#dataTable').DataTable({
                        "order": [[0, "desc"]]
                    });
                });
}