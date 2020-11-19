/// <reference path="jquery-3.5.1.js" />


$("#liveReportsLink").on("click", function () {

    $(".card-group").hide();
    $(".about").hide();
    $(".progressLoading").show();

    if (onSwitchArray.length > 0) {
        addingDataToCanvas(onSwitchArray);
    } else {
        $(".liveReports").show();
        $(".progressLoading").hide();
        $(".liveReports").html("").append(`
            <h2>There is no coins that have been turn on, <br>
                to get started please turn on some coins at Home page
            </h2>
        `)
    }

});

let IntervalId;
async function getCoinsMarketPrice() {
    try {

        const currentMarketPrice = await getDataFromApi("https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + onSwitchArray + "&tsyms=USD,EUR,ils&api_key=f8bfe4e6c990c21bad7099379235490dff486a220eb8f28062b02fda317de645")
        addingCurrentMarketPrice(currentMarketPrice);

    } catch (error) {
        console.log(error.message);
    }

}

window.onload = renderCanvas;
let options;

function renderCanvas() {

    options = {
        exportEnabled: false,
        animationEnabled: false,
        title: {
            text: "Market Price Of Switched Coins"
        },
        axisX: {
            title: "Check Time"
        },
        axisY: {
            title: "USD Market Value",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "Profit in USD",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        }
    };

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

}

function addingDataToCanvas(switchedCoins) {

    $(".liveReports").show();
    $(".progressLoading").hide();

    const coinsData = [];

    for (const item of switchedCoins) {
        const data =
        {
            type: "line",
            name: item,
            showInLegend: true,
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,##0 $",
            dataPoints: []
        };
        coinsData.push(data);
    }

    options.data = coinsData;

    $(".liveReports").CanvasJSChart(options);

    getCoinsMarketPrice();

    IntervalId = setInterval(() => {
        getCoinsMarketPrice();
    }, 2000);

}

function addingCurrentMarketPrice(currentMarketPrice) {
    let index = 0;
    
    for (const item in currentMarketPrice) {
        options.data[index].dataPoints.push(
            { x: new Date(), y: currentMarketPrice[item].USD }
        );
        index++;
    }
    $(".liveReports").CanvasJSChart(options);
}

