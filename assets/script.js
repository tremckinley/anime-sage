/*
    Anime or Sage - A quote guessing game
    Players guess whether a quote is from an anime character or a historical wise person
*/

// API CONFIGURATION
//==================

// Anime quotes API - returns random anime character quotes
const animeQuotesURL = "https://yurippe.vercel.app/api/quotes?random=1"

// Sage quotes API - returns wisdom/success quotes from historical figures
const sageAPIKey = "WE4ahLuQ6u40yIxUQ/d3hA==LpEEmMnPWUZo1DFs"
const sageQuotesURL = "https://api.api-ninjas.com/v2/randomquotes?categories=wisdom,success"

// DOM ELEMENTS
//==============

// Game buttons
const animeButton = document.getElementById("anime")
const sageButton = document.getElementById("sage")
const restartButton = document.getElementById("restart")

// Text elements
const quote = document.getElementById("quote")
const result = document.getElementById("result")

// Modal
const modalInfo = document.getElementById("modal-info")
const modalTitle = document.getElementById("modal-title")
const modalElement = document.getElementById("modal");
const modalRestartBtn = document.getElementById("modal-restart");

// Container elements
const resultContainer = document.getElementById("result-container");
const buttonContainer = document.getElementById("button-container");

// GAME STATE
// ==========

let modal = null;  // Bootstrap modal instance
let randomNum = Math.floor(Math.random() * 2);  // 0 = sage, 1 = anime
let rightAnswer = randomNum === 1 ? "anime" : "sage";  // The correct answer for current round

// EVENT LISTENERS
// ===============

// Answer button clicks
animeButton.addEventListener("click", () => checkAnswer("anime"))
sageButton.addEventListener("click", () => checkAnswer("sage"))

// Restart button click
restartButton.addEventListener("click", () => startRound())

// Modal restart button click
modalRestartBtn.addEventListener("click", () => {
    modal.hide();
    startRound();
})

// API FUNCTIONS
// =============

/*
    Fetches a random anime quote from the API
    Updates the quote display and prepares modal content
*/
async function getAnimeQuote() {
    // Show loading state
    quote.style.display = "block";
    quote.textContent = "⏳ Loading...";

    // Fetch quote from API
    const response = await fetch(animeQuotesURL);
    const data = await response.json();
    console.log(data);

    // Update display with quote
    quote.textContent = data[0].quote;
    result.textContent = "";

    // Prepare modal for answer
    modalTitle.textContent = "Anime Quote Details";
    modalInfo.textContent = `💡 This is a quote from ${data[0].character} from ${data[0].show}`;
}

/*
    Fetches a random sage/wisdom quote from the API
    Updates the quote display and prepares modal content
*/
async function getSageQuote() {
    // Show loading state
    quote.style.display = "block";
    quote.textContent = "⏳ Loading...";

    // Fetch quote from API
    const response = await fetch(sageQuotesURL, {
        headers: {
            "X-Api-Key": sageAPIKey
        }
    });
    const data = await response.json();
    console.log(data);

    // Update display with quote
    quote.textContent = data[0].quote;
    result.textContent = ""

    // Prepare modal for answer
    modalTitle.textContent = "Sage Quote Details"
    modalInfo.textContent = `💡 This is a quote from ${data[0].author}`
}

// GAME FUNCTIONS
// ==============

/*
    Checks if the player's answer is correct
    Shows result and displays modal with quote details
*/
function checkAnswer(answer) {
    // Check if answer matches and display result
    if (rightAnswer == answer) {
        result.textContent = "Correct!"
    } else {
        result.textContent = "Not this time!"
    }

    // Toggle UI: hide answer buttons, show result
    buttonContainer.style.display = "none";
    resultContainer.style.display = "flex";

    // Create modal on first use, then show it
    if (!modal) {
        modal = new bootstrap.Modal(modalElement);
    }
    modal.show();
}

/* 
    Starts a new round of the game
    Resets UI, generates new random quote type, and fetches a quote
*/
function startRound() {
    // Reset UI state
    resultContainer.style.display = "none";
    buttonContainer.style.display = "flex";
    quote.style.display = "none";

    // Generate new random answer (0 = sage, 1 = anime)
    randomNum = Math.floor(Math.random() * 2);
    rightAnswer = randomNum === 1 ? "anime" : "sage";

    // Fetch appropriate quote based on random selection
    if (randomNum === 1) {
        getAnimeQuote()
    } else {
        getSageQuote()
    }

    // ----------------------------------------
    // Test content -Uncomment below to use static test quote
    // (Saves API requests during development)
    // Comment out if statement above
    // ----------------------------------------
    /*
    console.log(randomNum)
    quote.textContent = "This is a test quote to save on requests."
    result.textContent = ""
    modalTitle.textContent = "Test Quote"
    modalInfo.textContent = "💡 This is a test quote to save on requests."
    */
}
// LET'S PLAY!
// ===========

// Start the first round when page loads
startRound()
