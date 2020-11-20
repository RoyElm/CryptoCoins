/// <reference path="jquery-3.5.1.js" />

//Switch Button Event.

//Creating global variable to use Local storage saved items. 
let onSwitchArray = [];
let tempSwitchId;

//checking if there any items in local storage by the key "switchArray";
if (localStorage.getItem("switchArray") != null) {
    onSwitchArray = localStorage.getItem("switchArray").split(",");
}

//click event on the switch button.
$(".card-group").on("click", "input.custom-control-input", function (event) {

    //checking if there any 5 !on! switch;
    if (onSwitchArray.length >= 5 && $(this).prop("checked")) {
        event.preventDefault()
        addingModal(onSwitchArray)
        $(".popover-body").show("slow");
        tempSwitchId = $(this);
        return;
    }
    
    //checking if the button has been turn on or turn off
    if ($(this).prop("checked")) {
        settingSwitchedArray($(this).attr("id"));
        return;
    }
    removingFromArray($(this).attr("id"));
})

//Popover event panels :

//event on close button
$(".popover-body").on("click", ".close", function () {
    $(".popover-body").hide("slow");
})

//event on id button
$(".popover-body").on("click", ".buttonSwitch", function () {
    const idToUnCheck = $(this).val();
    $(`#${idToUnCheck}`).prop("checked", false);
    $(".popover-body").hide("slow");
    $(tempSwitchId).prop("checked", true);
    removingFromArray(idToUnCheck);
    settingSwitchedArray($(tempSwitchId).attr("id"));

});

//Adding modal to the screen with the coins
function addingModal(switchedCoins) {
    const idArray = switchedCoins.map(coin => `<li><button class="buttonSwitch" value=${coin}>${coin}</button></li>`);
    $(".popover-body").html(" ").append(
        `<div class="pop-inner">
            <button class="close">X</button>
            <h4>You can choose only 5 coins. </h4>
            Do you want delete one of them??
            <ul>
                ${idArray.join("")}
            </ul>
        </div>`
    );
}

//Adding switched on button to onSwitchArray
function settingSwitchedArray(checked) {
    onSwitchArray.push(checked);
    localStorage.setItem("switchArray", onSwitchArray);
}

//Removing switched off button from onSwitchArray
function removingFromArray(unChecked) {
    const buttonIndex = onSwitchArray.indexOf(unChecked);
    onSwitchArray.splice(buttonIndex, 1);
    if (onSwitchArray.length === 0) {
        localStorage.clear();
        return;
    }
    localStorage.setItem("switchArray", onSwitchArray);
}

