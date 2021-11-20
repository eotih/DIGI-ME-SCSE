const URL_API = "http://localhost:59360/API/";
window.addEventListener('load', getNew);
let NewsVN, NewsEN, PostVN, PostEN, Volunteers, PendingAccount = [];
const getAllData = async (url) => {
    return (await fetch(url)).json();
}
const c = "Có "
const n = " bài"
const ns =" bài viết hiện đang chờ duyệt"
async function getNew() {
    CountVI = await getAllData(URL_API + "Management/GetCountForHomeCMS");
    CountEN = await getAllData(URL_API + "Management/GetCountForHomeCMSEN");
    $('#ApprovedTinTuc').text(c + CountVI.CountNewsVnAll + n)
    $('#ApprovedDuAn').text(c + CountVI.CountDuAn + n)
    $('#ApprovedHDTN').text(c + CountVI.CountHDTNAll + n)
    $('#ApprovedHTNC').text(c + CountVI.CountHTNCAll + n)
    $('#PendingTinTuc').text(c + CountVI.CountNewsPending + n)
    $('#PendingDuAn').text(c + CountVI.CountDuAnPending + n)
    $('#PendingHDTN').text(c + CountVI.CountHDTNPending + n)
    $('#PendingHTNC').text(c + CountVI.CountHTNCPending + n)
    $('#ApprovedTinTucEN').text(c + CountEN.CountNewsEnAll + n)
    $('#ApprovedDuAnEN').text(c + CountEN.CountDuAn + n)
    $('#ApprovedHDTNEN').text(c + CountEN.CountHDTNAll + n)
    $('#ApprovedHTNCEN').text(c + CountEN.CountHTNCAll + n)
    $('#PendingTinTucEN').text(c + CountEN.CountNewsPending + n)
    $('#PendingDuAnEN').text(c + CountEN.CountDuAnPending + n)
    $('#PendingHDTNEN').text(c + CountEN.CountHDTNPending + n)
    $('#PendingHTNCEN').text(c + CountEN.CountHTNCPending + n)
    $('#BaiDangVNPending').text(c + Number(CountVI.CountDuAnPending + CountVI.CountHDTNPending + CountVI.CountHTNCPending) + ns)
    $('#BaiDangENPending').text(c + Number(CountEN.CountDuAnPending + CountEN.CountHDTNPending + CountEN.CountHTNCPending) + ns)
    $('#TNVPending').text(c + CountVI.CountVolunteerPending + ' tình nguyện viên chờ duyệt')
    $('#TinTucVNPending').text(c + CountVI.CountNewsPending + ns)
    $('#TinTucENPending').text(c + CountEN.CountNewsPending + ns)
    $('#TaiKhoanPending').text(c + CountVI.CountAccountPending + ' tài khoản đang chờ duyệt')
}