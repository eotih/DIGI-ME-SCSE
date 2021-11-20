const URL_API = "http://localhost:59360/API/";
window.addEventListener('load', getNew);
let NewsVN, NewsEN, PostVN, PostEN, Volunteers, PendingAccount = [];
const getAllData = async (url) => {
    return (await fetch(url)).json();
}
const n = " bài"
const ns =" bài viết hiện đang chờ duyệt"
async function getNew() {
    CountVI = await getAllData(URL_API + "Management/GetCountForHomeCMS");
    CountEN = await getAllData(URL_API + "Management/GetCountForHomeCMSEN");
    $('#ApprovedTinTuc').text('Có ' + CountVI.CountNewsVnAll + n)
    $('#ApprovedDuAn').text('Có ' + CountVI.CountDuAn + n)
    $('#ApprovedHDTN').text('Có ' + CountVI.CountHDTNAll + n)
    $('#ApprovedHTNC').text('Có ' + CountVI.CountHTNCAll + n)
    $('#PendingTinTuc').text('Có ' + CountVI.CountNewsPending + n)
    $('#PendingDuAn').text('Có ' + CountVI.CountDuAnPending + n)
    $('#PendingHDTN').text('Có ' + CountVI.CountHDTNPending + n)
    $('#PendingHTNC').text('Có ' + CountVI.CountHTNCPending + n)
    $('#ApprovedTinTucEN').text('Có ' + CountEN.CountNewsEnAll + n)
    $('#ApprovedDuAnEN').text('Có ' + CountEN.CountDuAn + n)
    $('#ApprovedHDTNEN').text('Có ' + CountEN.CountHDTNAll + n)
    $('#ApprovedHTNCEN').text('Có ' + CountEN.CountHTNCAll + n)
    $('#PendingTinTucEN').text('Có ' + CountEN.CountNewsPending + n)
    $('#PendingDuAnEN').text('Có ' + CountEN.CountDuAnPending + n)
    $('#PendingHDTNEN').text('Có ' + CountEN.CountHDTNPending + n)
    $('#PendingHTNCEN').text('Có ' + CountEN.CountHTNCPending + n)
    $('#BaiDangVNPending').text('Có ' + Number(CountVI.CountDuAnPending + CountVI.CountHDTNPending + CountVI.CountHTNCPending) + ns)
    $('#BaiDangENPending').text('Có ' + Number(CountEN.CountDuAnPending + CountEN.CountHDTNPending + CountEN.CountHTNCPending) + ns)
    $('#TNVPending').text('Có ' + CountVI.CountVolunteerPending + ' tình nguyện viên chờ duyệt')
    $('#TinTucVNPending').text('Có ' + CountVI.CountNewsPending + ns)
    $('#TinTucENPending').text('Có ' + CountEN.CountNewsPending + ns)
    $('#TaiKhoanPending').text('Có ' + CountVI.CountAccountPending + ' tài khoản đang chờ duyệt')
}