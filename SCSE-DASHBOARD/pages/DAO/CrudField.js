const WEB_API = "https://api.scse-vietnam.org/API/";
window.addEventListener('load', loadData)
async function loadData() {
    fetch(WEB_API + "Interface/ShowAllField")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                let { IdField, FieldName } = response;
                console.log(response)
                return `<tr>
                <td>${IdField}</td>
                <td>${FieldName}</td>
                </tr>`;
            })
            $('#tbody').html(html);
        })
}