window.addEventListener('load', loadData)

async function loadData() {
  fetch("http://localhost:3333")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var html = response.map(function (response) {
        const { _id, title, description, content, slug } = response
        return `<div class="card mb-5">
                <div class="card">
                  <div class="card-body">
                  <a href="/pages/Admin/chitietbaiviet.html?slug=${slug}">
                    <h5>${title}</h5>
                    </a>
                   ${description}
                  </div>
                </div>
              </div>`;
      })
      $('#tbody').html(html);
    })
}
