const URL_API = "https://api.scse-vietnam.org/API/Management/";
window.addEventListener('load', getNew);
let NewsVN,NewsEN,PostVN,PostEN,Volunteers,PendingAccount = [];
const getAllData = async (url) => {
    return (await fetch(url)).json();
}
async function getNew(){
    NewsEN = await getAllData(URL_API + "ShowAllNewsEN");
    NewsVN = await getAllData(URL_API + "ShowAllNewsVN");
    PostVN = await getAllData(URL_API + "ShowAllPost");
    PostEN = await getAllData(URL_API + "ShowAllPostEN");
    Volunteers = await getAllData(URL_API + "ShowAllVolunteers");
    PendingAccount = await getAllData("https://api.scse-vietnam.org/API/User/ShowAllAccount")
}
