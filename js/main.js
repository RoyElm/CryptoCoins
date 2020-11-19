/// <reference path="jquery-3.5.1.js" />

$(".card-group").show();
$(".liveReports").hide();
$(".about").hide();

//Deleting Live Server Message from Session Storage..
sessionStorage.clear()

//getting coins from api
async function getCoins() {
    try {
        const coinsFromApi = await getDataFromApi("https://api.coingecko.com/api/v3/coins/list");
        addingCoins(coinsFromApi);
        
    } catch (err) {
        alert(err.message);
    }
}

getCoins();

if ($('.card-group:empty')) {
    showProgressLoading();
}

//Progress bar!
function showProgressLoading() {
    $(".progressLoading").append(
        `<div class="spinner-border text-light" role="status">
            <span class="sr-only">Loading...</span>
        </div>`);
}

//Timer 
function getMinutes() {
    const d = new Date();
    return d.getSeconds();
}

//Set Info In Local Storage
function setSessionStorage(key, info) {
    const newInfo = JSON.stringify(info);
    sessionStorage.setItem(key, newInfo);
}

//Delete Item After 2 minutes
let keyTimeOut;
function getWithExpiry(key) {
    keyTimeOut = setTimeout(() => {
        sessionStorage.removeItem(key);
    }, 120000)
}

//Getting Data from Api using Ajax
function getDataFromApi(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            error: err => reject(err),
            success: response => resolve(response)
        });
    });
};