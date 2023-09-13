
let stockMarket = document.querySelector('.stock-market')
const stocksList = ["AAPL", "TSLA", "NVDA", "AMD"]

let apikey = "pub_291137aaa00155fda9a367b9da4d72320d381"

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
            const rate = parseFloat((localStorage.getItem(stockValue)) / parseFloat(localStorage.getItem(`prev${stockValue}`)) - 1) * 100
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

const newsDiv = document.querySelector('.news')

var url = 'https://newsdata.io/api/1/news?apikey=pub_291137aaa00155fda9a367b9da4d72320d381&q=intelligence artificielle OR bourse&country=fr'

const getNews = (url) => {
    var req = new Request(url);

    fetch(req)
        .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let news = []
        console.log(data.results);
        for (let range = 0; range < data.results.length; range++) {
            let title = data.results[range].title;
            let img = data.results[range].image_url;
            let link = data.results[range].link;
            let article = {title: title, img: img, link: link}
            news = [...news, article]
        }
        news = news.filter(item => item.img !== null);
        console.log(news)
        displayNews(news)
    })
    .catch(function(error) {
        console.error('Fetch error:', error);
    });
}
const displayNews = (news) => {
    for (let i = 0; i < news.length; i++) {
        let newArticle = document.createElement("div")
        let newTitle = document.createElement("h5")
        newTitle.textContent = news[i].title
        let newLink = document.createElement('a')
        newLink.href = news[i].link
        newLink.target = "_blank"
        let newImg = document.createElement("img")
        newImg.src = news[i].img;
        newLink.appendChild(newImg)
        newArticle.appendChild(newTitle);
        newArticle.appendChild(newLink);
        newsDiv.appendChild(newArticle);
    }
}

let news = getNews(url)