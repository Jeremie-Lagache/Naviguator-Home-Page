
let stockMarket = document.querySelector('.stock-market')
const stocksList = ["Apple", "Tesla", "AMD", "Nvidia"]

const urlList = ['https://api.polygon.io/v2/aggs/ticker/AAPL/prev?adjusted=true&apiKey=L9XIBrgn9yTylyVIYHLgJoAy5COP2HnQ', 
                 'https://api.polygon.io/v2/aggs/ticker/TSLA/prev?adjusted=true&apiKey=L9XIBrgn9yTylyVIYHLgJoAy5COP2HnQ',
                 'https://api.polygon.io/v2/aggs/ticker/NVDA/prev?adjusted=true&apiKey=L9XIBrgn9yTylyVIYHLgJoAy5COP2HnQ',
                 'https://api.polygon.io/v2/aggs/ticker/AMD/prev?adjusted=true&apiKey=L9XIBrgn9yTylyVIYHLgJoAy5COP2HnQ',
                ]

    for (const url in urlList) {
        requestFile( urlList[url] );
    }

    const calculateStocksRate = () => {
        const rates = {
            Apple: "",
            Tesla: "",
            Nvidia: "",
            AMD: "",
        }
        for (const stock in stocksList) {
            const stockValue = stocksList[stock]
            console.log(stockValue);
            const rate = parseFloat(localStorage.getItem(stockValue)) / parseFloat(localStorage.getItem(`prev${stockValue}`)) - 1
            if (rate === 0) {
                rates[stockValue] = "0.0"
            } else {
                rates[stockValue ]= rate
            }
        }
        console.log(rates);
        displayStocks(rates)
    }

    const displayStocks = (rates) => {
        for (const stock in stocksList) {
            const stockValue = stocksList[stock]
            const stockElement = document.querySelector(`.${stockValue}`);
            rates[stockValue] < 0 ? undefined : rates[stockValue] = `+${rates[stockValue]}`
            localStorage.getItem(stockValue) ? stockElement.innerHTML += `${localStorage.getItem(stockValue)} <div class="rate">&nbsp${rates[stockValue]}</div>` : ""
            let ratedivs = document.querySelectorAll('.rate')
            ratedivs.forEach((ratediv) => {
                const ratedivValue = parseFloat(ratediv.innerHTML.trim().replace(/[^\d.-]/g, ''));
                console.log(ratedivValue);
                ratedivValue < 0  ? ratediv.style.color = "red" : ratediv.style.color = "green"
              });
        }
        stockMarket.style.display = "flex"
    }

	function requestFile( url ) {

		const xhr = new XMLHttpRequest();
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		xhr.onload = callback;
		xhr.send( null );

		function callback( xhr ) {

			let response, json, lines;

			response = xhr.target.response;

			json = JSON.parse( response );

            if (json.ticker === "AAPL") {
                const previousStock = localStorage.getItem('Apple')
                localStorage.setItem('prevApple', previousStock)
                localStorage.setItem("Apple", json.results[0].o)
            } 
            else if (json.ticker === "TSLA") {
                const previousStock = localStorage.getItem('Tesla')
                localStorage.setItem('prevTesla', previousStock)
                localStorage.setItem("Tesla", json.results[0].o)
            } 
            else if (json.ticker === "NVDA") {
                const previousStock = localStorage.getItem('Nvidia')
                localStorage.setItem('prevNvidia', previousStock)
                localStorage.setItem("Nvidia", json.results[0].o)
            } 
            else if (json.ticker === "AMD") {
                const previousStock = localStorage.getItem('AMD')
                localStorage.setItem('prevAMD', previousStock)
                localStorage.setItem("AMD", json.results[0].o)
            }

            console.log(json);
		}

	}
     
    calculateStocksRate()

