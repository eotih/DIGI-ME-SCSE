const WEB_API = "http://localhost:59360/API/";
async function loadData() {
    fetch(WEB_API + "Interface/ShowAllField")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                let { IdField, FieldName } = response;
                return `<tr>
                    <td>
                      <div class="form-check form-check-flat mt-0">
                        <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" aria-checked="false"><i class="input-helper"></i></label>
                      </div>
                    </td>
                    <td>${FieldName}</td>
                    <td><button onclick="return getData(${IdField})" class="btn btn-outline-primary">View</button></td>
                    </tr>`;
            })
            $('#tbody').html(html);
        })
}