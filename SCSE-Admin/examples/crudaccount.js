var form = document.getElementById('form')
  form.addEventListener('submit',function(e)
  {
    e.preventDefault()
    var obj = {};
    obj.IDUser = 0;
    obj.IdRole = 1;
    obj.Email = $('#Email').val();
    obj.Username = $('#Username').val();
    obj.Password = $('#Password').val();
    fetch("http://localhost:59360/User/ThemTaiKhoan",{
      method : 'POST',
      body :JSON.stringify({
        IDUser: obj.IDUser,
        Username: obj.Username,
        Password: obj.Password,
        Email: obj.Email,
        IdRole:  obj.IdRole
      }),
      headers:{
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
    .then(function(response){
        return response.json()
      })
      .then(function(data)
      {
        if(data.Status === 'Success'){
            alert('Thêm Thành Công')
            window.location.reload();
        }
        else
        {
            alert('Data not insert')
        }
      })
  })
  function getdata(IDUser){
    var $dt = $('#dt');
  $.ajax({
      url: "http://localhost:59360/User/GetByIdTaiKhoan?iduser="+IDUser,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      dt: JSON.stringify({}),
      success: function(dt){
          console.log(dt)
          console.log(dt.IDUser)
            $dt.append("<tr>","<td>"+dt.IDUser+"</td>",
              "<td>"+dt.FullName+"</td>",
          "<td>"+dt.Email+"</td>",
          "<td>"+dt.Username+"</td>",
          "<td>"+dt.IDRole+"</td>",
          "</tr>"
          // "<td>"+data.Position+"</td>",
          // "<td>"+data.Details+"</td>"
          );
      }
  });
}
