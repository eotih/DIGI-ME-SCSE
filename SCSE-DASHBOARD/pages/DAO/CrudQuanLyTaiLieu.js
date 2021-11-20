const url = "https://api.scse-vietnam.org/";
window.addEventListener('load', loadData)
window.addEventListener('load', getListDocumentNotVersionEN)
async function loadData() {
    fetch(url + "Interface/ListDocument")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                const { ID, Title, Slug, Details } = response;
                // Sẽ return ra hàm tbody
                return `<tr>
                <td>${ID}</td>
                <td>${Title}</td>
                <td>${Slug}</td>
                <td>
                <button onclick="deleteData(${ID})" class="btn btn-outline-primary">Delete</button></td>
                </tr>`;
            })
            // đây là hàm trả ra tbody
            $('#tbody').html(html);
        })
}
(function ($) {
    'use strict';
    $(function () {
        fetch(url + "Interface/ListDocument")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var html = response.map(function (response) {
                    const { ID, Title, Slug, Details } = response;
                    return `<tr>
                    <td>${ID}</td>
                <td>${Title}</td>
                <td>${Slug}</td>
                <td>
                <button onclick="deleteData(${ID})" class="btn btn-outline-primary">Delete</button></td>
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
// -------------------------------- TIẾNG ANH -------------------------------- //
(function ($) {
    'use strict';
    $(function () {
        fetch(url + "Interface/ListDocumentEN")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var html = response.map(function (response) {
                    const { IDEN, Title, SlugEN, Details } = response;
                    return `<tr>
                    <td>${IDEN}</td>
                <td>${Title}</td>
                <td>${SlugEN}</td>
                <td>
                <button onclick="deleteData(${IDEN})" class="btn btn-outline-primary">Delete</button></td>
                </tr>`;
                })
                $('#tbodyENG').html(html);
                $(document).ready(function () {
                    $('#dataTableENG').DataTable({
                        "order": [[0, "asc"]]
                    });
                });
            })
            .catch(error => {
                throw error;
            })
    });
})(jQuery);
function getListDocumentNotVersionEN() {
    fetch(url + "Interface/ListDocumentNotVersionEN")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var Category = document.createElement("option");
            Category.innerHTML = "Vui lòng chọn";
            Category.value = 0;
            document.getElementById("IDEN").appendChild(Category);
            for (var i = 0; i < response.length; i++) {
                var ele = document.createElement("option");
                ele.value = response[i].ID;
                ele.innerHTML = response[i].Title;
                document.getElementById("IDEN").appendChild(ele);
            }
        })
}
async function addData() {
    var data = {
        Title: $('#Title').val(),
        Details: $('#summernote').summernote('code'),

    };
    fetch(url + "Interface/AddOrEditDocument", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Success') {
                alert('Thêm Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not insert')
            }
        })
}
async function addDataEN() {
    var data = {
        IDEN: $('#IDEN').val(),
        Title: $('#chude').val(),
        Details: $('#ENGPOST').summernote('code'),

    };
    fetch(url + "Interface/AddDocumentEN", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Success') {
                alert('Thêm Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not insert')
            }
        })
}
async function getData(Slug) {
    fetch(url + "Interface/GetBySlugDocument?slug=" + Slug)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { ID, Title, Slug, Details, CreatedByDate, UpdatedByDate } = response;
            $('#ID').val(ID);
            $('#Title').val(Title);
            $('#Slug').val(Slug);
            $('#Details').val(Details);
            $('#CreatedByDate').val(CreatedByDate);
            $('#UpdatedByDate').val(UpdatedByDate);
        })

    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();

}
async function updateData() {
    var data = {
        ID: $('#ID').val(),
        Title: $('#Title').val(),
        Details: $('#Details').val(),
    };
    fetch(url + "Interface/AddOrEditDocument", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
    }).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            if (data.Status === 'Updated') {
                alert('Sửa Thành Công')
                window.location.reload();
            }
            else {
                alert('Data not update')
            }
        })
}
function getBaseWEB_API() {
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    reader.onloadend = function () {
        baseString = reader.result;
        $('#Image').val(baseString);
        document.getElementById("Image1").src = baseString;
    };
    reader.readAsDataWEB_API(file);
}

async function deleteData(ID) {
    fetch(url + "Interface/DeleteDocument?id=" + ID, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
        }
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
async function deleteData(IDEN) {
    fetch(url + "Interface/DeleteDocumentEN?id=" + IDEN, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
        }
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
function clearTextBox() {
    $('#IDPost').val("");
    $('#IDCat').val("");
    $('#Title').val("");
    $('#Slug').val("");
    $('#Details').val("");
    $('#Image').val("");
    $('#Video').val("");
    $('#Author').val("");
    $('#Status').val("");

    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}

