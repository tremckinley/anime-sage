const animeQuotesURL = "https://yurippe.vercel.app/api/quotes?random=1"
const sageAPIKey = "WE4ahLuQ6u40yIxUQ/d3hA==LpEEmMnPWUZo1DFs"
const sageQuotesURL = "https://api.api-ninjas.com/v2/randomquotes?categories=wisdom,success"

const animeButton = document.getElementById("anime")
const sageButton = document.getElementById("sage")
const quote = document.getElementById("quote")
const result = document.getElementById("result")
const restartButton = document.getElementById("restart")
const toastTitle = document.getElementById("toast-title")
const toastInfo = document.getElementById("toast-info")
const toast = new bootstrap.Toast(document.getElementById('toast'));
let randomNum = Math.floor(Math.random() * 2);
let rightAnswer = randomNum === 1 ? "anime" : "sage";

animeButton.addEventListener("click", () => checkAnswer("anime"))
sageButton.addEventListener("click", () => checkAnswer("sage"))
restartButton.addEventListener("click", () => startRound())

/* TODO:
    Add a toast with quote details (source, anime if from anime, etc.)
    style page
    add score and rank
*/


async function getAnimeQuote() {
    const response = await fetch(animeQuotesURL);
    const data = await response.json();
    console.log(data);
    quote.textContent = data[0].quote;
    result.textContent = ""
    toastTitle.textContent = "Anime Quote"
    toastInfo.textContent = `💡 This is a quote from ${data[0].character} from ${data[0].show}`
}

async function getSageQuote() {
    const response = await fetch(sageQuotesURL, {
        headers: {
            "X-Api-Key": sageAPIKey
        }
    });
    const data = await response.json();
    // console.log(data);
    quote.textContent = data[0].quote;
    quote.style.display = "block";
    result.textContent = ""
    toastTitle.textContent = "Sage Quote"
    toastInfo.textContent = `💡 This is a quote from ${data[0].author}`
}

function checkAnswer(answer) {
    if (rightAnswer == answer) {
        result.textContent = "Correct!"
        result.style.display = "block"
    } else {
        result.textContent = "Not this time!"
        result.style.display = "block"
    }
    toast.show();
}

function startRound() {
    toast.hide();
    result.style.display = "none"
    randomNum = Math.floor(Math.random() * 2);
    rightAnswer = randomNum === 1 ? "anime" : "sage";
    quote.style.display = "none";
    // console.log(randomNum)
    // quote.textContent = "This is a test quote to save on requests."
    // result.textContent = ""
    // toastTitle.textContent = "Test Quote"
    // toastInfo.textContent = "💡 This is a test quote to save on requests."
    // const toast = new bootstrap.Toast(document.getElementById('toast'));
    // toast.show();
    if (randomNum === 1) {
        getAnimeQuote()
    } else {
        getSageQuote()
    }
}

document.addEventListener("restart", () => {
    const toast = new bootstrap.Toast(document.getElementById('toast'));

    toast.hide();
})

startRound()
