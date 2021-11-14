const URL_API = "http://localhost:59360/API/";

window.addEventListener('load', loadData)
async function loadData() {
    const ShowAllPost = await getLength('Management/ShowAllPost')
    const ShowAllPostEN = await getLength('Management/ShowAllPostEN')
    const ShowAllVolunteers = await getLength('Management/ShowAllVolunteers')
    const ShowAllNewsVN = await getLength('Management/ShowAllNewsVN')
    const ShowAllNewsEN = await getLength('Management/ShowAllNewsEN')
    const ShowAllAccount = await getLength('User/ShowAllAccount')
    const GBDG = await getLengthByIdField(1, 'Management/ShowAllNewsVN')
    const KHMT = await getLengthByIdField(2, 'Management/ShowAllNewsVN')
    const TTS = await getLengthByIdField(3, 'Management/ShowAllNewsVN')
    const NCDT = await getLengthByIdField(4, 'Management/ShowAllNewsVN')

    const GBDGEN = await getLengthByIdField(1, 'Management/ShowAllNewsEN')
    const KHMTEN = await getLengthByIdField(2, 'Management/ShowAllNewsEN')
    const TTSEN = await getLengthByIdField(3, 'Management/ShowAllNewsEN')
    const NCDTEN = await getLengthByIdField(4, 'Management/ShowAllNewsEN')

    const DA = await getLengthByIdIDCate(1, 'Management/ShowAllPost')
    const HTNC = await getLengthByIdIDCate(2, 'Management/ShowAllPost')
    const HDTN = await getLengthByIdIDCate(3, 'Management/ShowAllPost')

    const DAEN = await getLengthByIdIDCate(1, 'Management/ShowAllPostEN')
    const HTNCEN = await getLengthByIdIDCate(2, 'Management/ShowAllPostEN')
    const HDTNEN = await getLengthByIdIDCate(3, 'Management/ShowAllPostEN')


    $('#BaiDangVNPending').text('Có ' + ShowAllPost + ' bài hiện đang chờ duyệt')
    $('#TNVPending').text('Có ' + ShowAllVolunteers + ' tình nguyện viên hiện đang chờ duyệt')
    $('#BaiDangENPending').text('Có ' + ShowAllPostEN + ' bài hiện đang chờ duyệt')
    $('#TinTucVNPending').text('Có ' + ShowAllNewsVN + ' bài hiện đang chờ duyệt')
    $('#TinTucENPending').text('Có ' + ShowAllNewsEN + ' bài hiện đang chờ duyệt')
    $('#TaiKhoanPending').text('Có ' + ShowAllAccount + ' tài khoản hiện đang chờ duyệt')

    $('#DAEN').text(DA + ' bài');
    $('#HTNCEN').text(HTNC + ' bài');
    $('#HDTNEN').text(HDTN + ' bài');

    $('#DA').text(DA + ' bài');
    $('#HTNC').text(HTNC + ' bài');
    $('#HDTN').text(HDTN + ' bài');

    $('#GBDG').text(GBDG + ' bài');
    $('#KHMT').text(KHMT + ' bài');
    $('#TTS').text(TTS + ' bài');
    $('#NCDT').text(NCDT + ' bài');

    $('#GBDGEN').text(GBDGEN + ' bài');
    $('#KHMTEN').text(KHMTEN + ' bài');
    $('#TTSEN').text(TTSEN + ' bài');
    $('#NCDTEN').text(NCDTEN + ' bài');
}
const getLength = async (input) => {
    const res = await fetch(URL_API + input)
    const json = await res.json();
    const result = json.filter(res => res.IDState === 1)
    return result.length
}
const getLengthByIdField = async (IDField, input) => {
    if (input === 'Management/ShowAllNewsVN') {
        const res = await fetch(URL_API + input)
        const json = await res.json();
        const result = json.filter(res => res.IDState === 2)
        const filtered = result.filter(res => res.IdField === IDField)
        return filtered.length
    } else {
        const res = await fetch(URL_API + input)
        const json = await res.json();
        const result = json.filter(res => res.IDState === 2)
        const filtered = result.filter(res => res.IdField === IDField)
        return filtered.length
    }
}
const getLengthByIdIDCate = async (IDCate, input) => {
    if (input === 'Management/ShowAllPost') {
        const res = await fetch(URL_API + "Management/ShowAllPost")
        const json = await res.json();
        const result = json.filter(res => res.IDState === 2)
        const filtered = result.filter(res => res.IDCat === IDCate)
        return filtered.length
    } else {
        const res = await fetch(URL_API + "Management/ShowAllPostEN")
        const json = await res.json();
        const result = json.filter(res => res.IDState === 2)
        const filtered = result.filter(res => res.IDCat === IDCate)
        return filtered.length
    }
}

