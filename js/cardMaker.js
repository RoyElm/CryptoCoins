
let symbolCardArray;
let symbolCardNames;

//Adding to Card!
function addingCoins(coinsResponse) {
    $(".card-group").html("");
    for (let i = 0; i < 300; i++) {
        $(".card-group").append(`
        <div class="card">

            <div class="card-body">
                <div class="cardHeader">
                    <h5 class="card-title">${coinsResponse[i].symbol}</h5>
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="${coinsResponse[i].symbol}">
                        <label class="custom-control-label" for="${coinsResponse[i].symbol}"></label>
                    </div>
                </div>
                <p class="card-text">${coinsResponse[i].name}</p>
                <p>
                    <a class="btn btn-primary infoButton" id=${coinsResponse[i].id} data-toggle="collapse" href="#${coinsResponse[i].id}-info" role="button" aria-expanded="false" aria-controls="collapseExample">
                        More Info
                    </a>
                </p>
            </div>
        </div> `);
    };

    //the adding cards have finished make cards. now we can hide the progress loading.
    $(".progressLoading").hide();
    
    //Adding the titles of Card to array and getting there symbols.
    //adding it to global variable to get equal for research in the future.

    symbolCardArray = $(".card-title").toArray();
    symbolCardNames = symbolCardArray.map(e => e.innerHTML);

    const switchingButtons = localStorage.getItem("switchArray");
    if (switchingButtons != null) {
        switchingButtonsFromLocalStorage(switchingButtons)
    }

}

//Switching choosing Cards from Local Storage
function switchingButtonsFromLocalStorage(SwitchButtons) {
    const switchingButtonsArray = SwitchButtons.split(",");
    for (const key of switchingButtonsArray) {
        $(`#${key}`).prop("checked", true)
    }
}

//Adding new Cards that I got from search input!
function addingCards(newCards) {
    $(".card-group").html("");
    for (let i = 0; i < newCards.length; i++) {
        $(".card-group").append(newCards[i]);
    }
}