const WEB_API = "http://localhost:59360/";
window.addEventListener('load', loadData)

async function loadData() {
    fetch(WEB_API + "/Management/XemDanhSachDangKy")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var html = response.map(function (response) {
                let { ID, FirstName, LastName, DOB, Phone, Email, Address, Project, Purpose, IDState } = response;
                if(IDState === 1){
                    IDState = 'Pending'
                }
                if(IDState === 2){
                    IDState = 'Approved'
                }
                if(IDState === 3){
                    IDState = 'NotApproved'
                }
                if(IDState === 4){
                    IDState = 'Deleted'
                }
                return `<tr>
                    <td>${ID}</td>
                    <td>${FirstName}</td>
                    <td>${LastName}</td>
                    <td>${DOB}</td>
                    <td>${Phone}</td>
                    <td>${Email}</td>
                    <td>${Address}</td>
                    <td>${Project}</td>
                    <td>${Purpose}</td>
                    <td>${IDState}</td>
                    <td><button onclick="return getData(${ID})" class="btn btn-outline-primary">View</button>
                    <button onclick="return deleteData(${ID})" class="btn btn-outline-primary">Delete</button><td>
                    </tr>`
            })
            $('.tbody').html(html);
            //Thiếu IDState
        })
}
async function getData(ID) {
    fetch(WEB_API + "/Management/GetByIdNguoiDangKy?id=" + ID)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const { ID, FirstName, LastName, DOB, Phone, Email, Address, Project, Purpose , IDState } = response;
            $('#ID').val(ID);
            $('#FirstName').val(FirstName);
            $('#LastName').val(LastName);
            $('#DOB').val(DOB);
            $('#Phone').val(Phone);
            $('#Email').val(Email);
            $('#Address').val(Address);
            $('#Project').val(Project);
            $('#Purpose').val(Purpose);
            $('#IDState').val(IDState);
        })
    $('#exampleModal-2').modal('show');
    $('#add').hide();
    $('#edit').show();
}
(function($) {
    'use strict';
    $(function() {
      $('#order-listing').DataTable({
        "aLengthMenu": [
          [5, 10, 15, -1],
          [5, 10, 15, "All"]
        ],
        "iDisplayLength": 10,
        "language": {
          search: ""
        }
      });
      $('#order-listing').each(function() {
        var datatable = $(this);
        // SEARCH - Add the placeholder for Search and Turn this into in-line form control
        var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
        search_input.attr('placeholder', 'Search');
        search_input.removeClass('form-control-sm');
        // LENGTH - Inline-Form control
        var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
        length_sel.removeClass('form-control-sm');
      });
    });
  })(jQuery);
async function addData() {
    var $data = {
        FirstName: $('#FirstName').val(),
        LastName: $('#LastName').val(),
        DOB: $('#DOB').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val(),
        Project: $('#Project').val(),
        Purpose: $('#Purpose').val(),
        IDState: $('#IDState').val(),
    };
    fetch(WEB_API + "Management/DangKiThamGia", {
        method: 'POST',
        body: JSON.stringify($data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
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
async function updateData() {
    var data = {
        ID: $('#ID').val(),
        IDState: $('#IDState').val(),
    };
    debugger
    fetch(WEB_API + "Management/DangKiThamGia", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
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
async function deleteData(ID) {
    fetch(WEB_API + "Management/XoaNguoiDangKy?id=" + ID, {
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
function clearTextBox() {
    $('#ID').val("");
    $('#FirstName').val("");
    $('#LastName').val("");
    $('#DOB').val("");
    $('#Phone').val("");
    $('#Email').val("");
    $('#Address').val("");
    $('#Project').val("");
    $('#Purpose').val("");
    $('#IDState').val("");
    $('#exampleModal-2').modal('show');
    $('#add').show();
    $('#edit').hide();
}