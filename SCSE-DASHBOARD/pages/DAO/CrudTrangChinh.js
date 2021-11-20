const URL_API = "http://localhost:59360/API/";
window.addEventListener('load', getNew);
let NewsVN, NewsEN, PostVN, PostEN, Volunteers, PendingAccount = [];
const getAllData = async (url) => {
    return (await fetch(url)).json();
}
async function getNew() {
    CountVI = await getAllData(URL_API + "Management/GetCountForHomeCMS");
    CountEN = await getAllData(URL_API + "Management/GetCountForHomeCMSEN");
    $('#ApprovedTinTuc').text('Có ' + CountVI.CountNewsVnAll + ' bài')
    $('#ApprovedDuAn').text('Có ' + CountVI.CountDuAn + ' bài')
    $('#ApprovedHDTN').text('Có ' + CountVI.CountHDTNAll + ' bài')
    $('#ApprovedHTNC').text('Có ' + CountVI.CountHTNCAll + ' bài')
    $('#PendingTinTuc').text('Có ' + CountVI.CountNewsPending + ' bài')
    $('#PendingDuAn').text('Có ' + CountVI.CountDuAnPending + ' bài')
    $('#PendingHDTN').text('Có ' + CountVI.CountHDTNPending + ' bài')
    $('#PendingHTNC').text('Có ' + CountVI.CountHTNCPending + ' bài')
    $('#ApprovedTinTucEN').text('Có ' + CountEN.CountNewsEnAll + ' bài')
    $('#ApprovedDuAnEN').text('Có ' + CountEN.CountDuAn + ' bài')
    $('#ApprovedHDTNEN').text('Có ' + CountEN.CountHDTNAll + ' bài')
    $('#ApprovedHTNCEN').text('Có ' + CountEN.CountHTNCAll + ' bài')
    $('#PendingTinTucEN').text('Có ' + CountEN.CountNewsPending + ' bài')
    $('#PendingDuAnEN').text('Có ' + CountEN.CountDuAnPending + ' bài')
    $('#PendingHDTNEN').text('Có ' + CountEN.CountHDTNPending + ' bài')
    $('#PendingHTNCEN').text('Có ' + CountEN.CountHTNCPending + ' bài')
    $('#BaiDangVNPending').text('Có ' + Number(CountVI.CountDuAnPending + CountVI.CountHDTNPending + CountVI.CountHTNCPending) + ' bài viết hiện đang chờ duyệt')
    $('#BaiDangENPending').text('Có ' + Number(CountEN.CountDuAnPending + CountEN.CountHDTNPending + CountEN.CountHTNCPending) + ' bài viết hiện đang chờ duyệt')
    $('#TNVPending').text('Có ' + CountVI.CountVolunteerPending + ' tình nguyện viên chờ duyệt')
    $('#TinTucVNPending').text('Có ' + CountVI.CountNewsPending + ' bài viết hiện đang chờ duyệt')
    $('#TinTucENPending').text('Có ' + CountEN.CountNewsPending + ' bài viết hiện đang chờ duyệt')
    $('#TaiKhoanPending').text('Có ' + CountVI.CountAccountPending + ' tài khoản đang chờ duyệt')
}