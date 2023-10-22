const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
const chart = LightweightCharts.createChart(document.getElementById('chart1'));
const btn = document.getElementById("click")

const candlestickSeries = chart.addCandlestickSeries({
    upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
    wickUpColor: '#26a69a', wickDownColor: '#ef5350',
});
let quote = 60;
let variate = 5
let ballence = 100

let data2 = []

let openQuote = quote
var app = new Vue({
    el: '#app',
    data: {
        count: quote
    }
})

let response1 = await fetch('/data');
let data1 = await response1.json();
let k = 0;
for (let i = 0; i < data1.length; i++) {
    data2.push({ time: data1[i].time, open: data1[i].open, high: data1[i].high, low: data1[i].low, close: data1[i].close })
}
if (data2[0] == null) {
    k = 0
    openQuote = quote
} else {
    k = data2[data2.length - 1].time
    openQuote = data2[data2.length - 1].close
}
candlestickSeries.setData(data2);

let timeframe = setInterval(async function () {

    let maxOpenQuote = openQuote
    let minOpenQuote = openQuote

    for (let i = 0; i < 1000; i++) {
        let random = Math.floor(Math.random() * 10)
        if (random < 5) {
            quote++

            if (quote > maxOpenQuote) maxOpenQuote = quote

        } else {
            quote--
            if (quote < openQuote && quote < minOpenQuote) minOpenQuote = quote
        }
    }
    k++
    if (quote < 10) quote = 10
    data2.push({ time: k, open: openQuote, high: maxOpenQuote, low: minOpenQuote, close: quote })
    fetch('/createData', {
        'method': 'POST',
        'body': JSON.stringify({
            time: k,
            open: openQuote,
            high: maxOpenQuote,
            low: minOpenQuote,
            close: quote
        }),
        'headers': {
            'Content-Type': 'application/json',
        }
    }).then((response) => 
    { 
      
    });
    
    
    candlestickSeries.setData(data2);

    openQuote = quote

    if (data2.length == 2000) {
        data2.shift()
        candlestickSeries.setData(data2);
    }
    app.count = quote

}, 100)

chart.timeScale().fitContent();