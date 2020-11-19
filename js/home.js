/// <reference path="jquery-3.5.1.js" />

//Home Link event click
$("#homeLink").on("click", function () {
    
    getCoins();
    $(".card-group").show();
    $(".liveReports").hide();
    clearInterval(IntervalId);
    $(".about").hide();

})

//Event Click On More Info
$(".card-group").on("click", "a.infoButton", async function () {

    try {

        const cardId = $(this).attr('id');
        const getItemFromStorage = sessionStorage.getItem(cardId);

        //removing old info div. to add next time when the coin have been click. 
        if ($(this).next().hasClass("infoCard")) {
            getWithExpiry(cardId);
            $(this).next().remove();
            return;
        }

        //check if there info at the session storage
        if (getItemFromStorage != null) {
            const parseItem = JSON.parse(getItemFromStorage);
            clearTimeout(keyTimeOut);
            $(this).parent().append(parseItem);
            setSessionStorage(cardId, parseItem);
            return;
        }

        const infoAboutTheCoin = await getDataFromApi("https://api.coingecko.com/api/v3/coins/" + cardId);
        showingInfoAndSavingInStorage(infoAboutTheCoin, $(this));

    } catch (error) {
        console.log(error.message);
    }

});

//Search button event
$("form button").on("click", function () {

    const inputSearch = $("form input").val().toLowerCase();

    if (inputSearch.length > 0 && $(".card-group").css("display") != "none") {
        //SymbolCarNames global variable that hold symbols of starting array. [created in cardMaker.js]
        const inputEqualToSymbolCard = symbolCardNames.filter(word => word === inputSearch);
        const resultOfSearch = inputEqualToSymbolCard.map(symbol => getEqual(symbol, symbolCardArray));
        const resultNewCards = $(resultOfSearch).closest(".card");
        $("form input").val("");
        if (resultNewCards.length > 0) {
            addingCards(resultNewCards);
        } else {
            alert("There is no coin with that symbol,\n Please try again.\n thank you");
        }
    } else if ($(".card-group").css("display") === "none") {
        alert("Did you try to search? \nThe function only available in home page\nThank you");
    } else {
        alert("Did you try to search? \nplease write the symbol you want. ");
    }
})

//checking equal research.
function getEqual(symbolInCard, classOfCard) {
    for (let i = 0; i < classOfCard.length; i++) {
        if (symbolInCard === classOfCard[i].innerHTML) {
            return classOfCard[i];
        }
    }
}

//Adding Info to card
function showingInfoAndSavingInStorage(infoFromApi, thisButton) {

    let infoAboutTheCoin;
    const cardId = $(thisButton).attr('id');
    const marketPrice = infoFromApi.market_data.current_price;

    //checking if the coin have marketPrice.
    if (marketPrice.usd === undefined) {
        console.log("Im here");
        infoAboutTheCoin =
            `<div class="infoCard" id="${cardId}-info">
                <div class="card card-body">
                    We Don't have the current Price at this moment,<br>
                    Please try again later Ty for the understanding :) <br>
                    <image class="img-fluid" src=${infoFromApi.image.small} />
                </div>
            </div>`;
    } else {
        infoAboutTheCoin =
            `<div class="infoCard" id="${cardId}-info">
                <div class="card card-body">
                    ILS: ${marketPrice.ils}₪, <br>
                    USD: ${marketPrice.usd}$, <br>
                    Euro: ${marketPrice.eur}€, <br>
                    <image class="img-fluid" src=${infoFromApi.image.small} />
                </div>
            </div>`;
    }

    $(thisButton).parent().append(infoAboutTheCoin);
    setSessionStorage(cardId, infoAboutTheCoin);
}

