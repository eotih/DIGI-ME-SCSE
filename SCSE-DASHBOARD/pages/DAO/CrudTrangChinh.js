const URL_API = "https://api.scse-vietnam.org/API/";

window.addEventListener('load', loadData)
function loadData() {
    loadTinTuc();
    loadPost();
    loadTinTucEN();
    loadPostEn();
    loadAllTinTucVN();
    loadAllTinTucEN();
    loadTNV();
    loadBaiDangVN();
    loadBaiDangEN();
    loadTaiKhoan();
}
async function loadTinTuc(){
    fetch(URL_API + "Management/ShowAllNewsVN")
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        var result = response.filter(v => v.IDState === 2)
        var GBDG = result.filter(v => v.IdField === 1)
        $('#GBDG').text(GBDG.length + ' bài');
        var KHMT = result.filter(v => v.IdField === 2)
        $('#KHMT').text(KHMT.length + ' bài');
        var TTS = result.filter(v => v.IdField === 3)
        $('#TTS').text(TTS.length + ' bài');
        var NCDT = result.filter(v => v.IdField === 4)
        $('#NCDT').text(NCDT.length + ' bài');
    })
}
async function loadPost(){
    fetch(URL_API + "Management/ShowAllPost")
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        var result = response.filter(v => v.IDState === 2)
        var DA = result.filter(v => v.IDCat === 1)
        $('#DA').text(DA.length + ' bài');
        var HTNC = result.filter(v => v.IDCat === 2)
        $('#HTNC').text(HTNC.length + ' bài');
        var HDTN = result.filter(v => v.IDCat === 3)
        $('#HDTN').text(HDTN.length + ' bài');
    })
}
async function loadTinTucEN(){
    fetch(URL_API + "Management/ShowAllNewsEN")
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        var result = response.filter(v => v.IDState === 2)
        var GBDG = result.filter(v => v.IdField === 1)
        $('#GBDGEN').text(GBDG.length + ' bài');
        var KHMT = result.filter(v => v.IdField === 2)
        $('#KHMTEN').text(KHMT.length + ' bài');
        var TTS = result.filter(v => v.IdField === 3)
        $('#TTSEN').text(TTS.length + ' bài');
        var NCDT = result.filter(v => v.IdField === 4)
        $('#NCDTEN').text(NCDT.length + ' bài');
    })
}
async function loadPostEn(){
    fetch(URL_API + "Management/ShowAllPostEN")
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        var result = response.filter(v => v.IDState === 2)
        var DA = result.filter(v => v.IDCat === 1)
        $('#DAEN').text(DA.length + ' bài');
        var HTNC = result.filter(v => v.IDCat === 2)
        $('#HTNCEN').text(HTNC.length + ' bài');
        var HDTN = result.filter(v => v.IDCat === 3)
        $('#HDTNEN').text(HDTN.length + ' bài');
    })
}
async function loadBaiDangVN(){
    fetch(URL_API + "Management/ShowAllPost")
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var result = response.filter(v => v.IDState === 1)
        $('#BaiDangVNPending').text('Có ' + result.length + ' bài hiện đang chờ duyệt')
    })
}
async function loadBaiDangEN(){
    fetch(URL_API + "Management/ShowAllPostEN")
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var result = response.filter(v => v.IDState === 1)
        $('#BaiDangENPending').text('Có ' + result.length + ' bài hiện đang chờ duyệt')
    })
}
async function loadTNV(){
    fetch(URL_API + "Management/ShowAllVolunteers")
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var result = response.filter(v => v.IDState === 1)
        $('#TNVPending').text('Có ' + result.length + ' tình nguyện viên hiện đang chờ duyệt')
    })
}
async function loadAllTinTucVN(){
    fetch(URL_API + "Management/ShowAllNewsVN")
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var result = response.filter(v => v.IDState === 1)
        $('#TinTucVNPending').text('Có ' + result.length + ' bài hiện đang chờ duyệt')
    })
}
async function loadAllTinTucEN(){
    fetch(URL_API + "Management/ShowAllNewsEN")
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var result = response.filter(v => v.IDState === 1)
        $('#TinTucENPending').text('Có ' + result.length + ' bài hiện đang chờ duyệt')
    })
}
async function loadTaiKhoan(){
    fetch(URL_API + "User/ShowAllAccount")
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var result = response.filter(v => v.IDState === 1)
        $('#TaiKhoanPending').text('Có ' + result.length + ' tài khoản hiện đang chờ duyệt')
    })
}