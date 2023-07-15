
let stockMarket = document.querySelector('.stock-market')
const stocksList = ["AAPL", "TSLA", "NVDA", "AMD"]

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
                rates[stockValue] = rate
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
            localStorage.getItem(stockValue) ? stockElement.innerHTML += `${localStorage.getItem(stockValue)} <div class="rate">&nbsp${rates[stockValue]}%</div>` : ""
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
            console.log(JSON.stringify(json.results[0].o));

                if (localStorage.getItem(json.ticker) !== JSON.stringify(json.results[0].o)) {
                    const previousStock = localStorage.getItem(json.ticker)
                    localStorage.setItem(`prev${json.ticker}`, previousStock)
                    localStorage.setItem(json.ticker, json.results[0].o)
                } else {
                    console.log('still the same');
                }
            console.log(json);
		}

	}
     
    calculateStocksRate()

