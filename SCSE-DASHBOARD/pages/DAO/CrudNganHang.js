const WEB_API = "http://localhost:59360/API/";

(function ($) {
    'use strict';
    $(function () {
        fetch(WEB_API + "Interface/ShowAllBankInfo")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var html = response.map(function (response) {
                    let { ID, ImageQR, BankName } = response;
                    return `<tr>
                    <td>
                          <img style="height:100px;width:100px" src='${ImageQR}'/>
                          <h4>${BankName}</h4>
                    </td>
                    <td>
                    <button onclick="return getData(${ID})" class="btn btn-outline-danger">Xoá</button></td>
                    </tr>`;
                })
                $('#tbody').html(html);
                $(document).ready(function () {
                    $('#dataTable').DataTable({
                        "order": [[0, "asc"]]
                    });
                });
            })
            .catch(error => {
                throw error;
            })
    });
})(jQuery);