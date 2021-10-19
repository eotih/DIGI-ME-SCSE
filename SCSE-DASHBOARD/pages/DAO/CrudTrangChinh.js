const URL_API = "https://api.scse-vietnam.org/API/";

window.addEventListener('load', loadData)
function loadData() {
    loadTinTuc();
}
async function loadTinTuc(){
    fetch(URL_API + "Management/ShowAllNewsVN")
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        var result = response.filter(v => v.IDState === 2)
        var GBDG = result.filter(a => a.IdField === 1)
        $('#GBDG').text(GBDG.length + ' bài');
        var KHMT = result.filter(v => v.IdField === 2)
        $('#KHMT').text(KHMT.length + ' bài');
        var TTS = result.filter(v => v.IdField === 3)
        $('#TTS').text(TTS.length + ' bài');
        var NCDT = result.filter(v => v.IdField === 4)
        $('#NCDT').text(NCDT.length + ' bài');
    })
}