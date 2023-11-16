const apiKey = "Tasl636VzVxFvH/p4qBkfA==Y3PBU5S1vxBdLA0S",
url = `https://api.api-ninjas.com/v1/quotes`,
quoteText = document.querySelector(".quote-text"),
authorText = document.querySelector(".author-text"),
generateBtn = document.querySelector(".generate"),
copyBtn = document.querySelector(".copy"),
colors = ["rgb(255, 85, 85)", "rgb(255, 117, 18)", "rgb(172, 158, 1)", "rgb(64, 172, 1)", "rgb(75, 180, 133)", "rgb(0, 187, 190)", "rgb(6, 0, 190)", "rgb(167, 52, 255)", "rgb(255, 52, 225)", "rgb(255, 114, 138)", ],
fetchOptions = {
    method: 'GET',
    headers: {
        'X-Api-Key': apiKey
    }
};

let quoteData = {};


generateBtn.addEventListener('click', execute);
window.addEventListener('load', execute);
copyBtn.addEventListener('click', handleCopy)

async function execute() {
    startLoading();
    await fetchQuote();
    displayQuote();
    changeColor();
    stopLoading();
}

async function fetchQuote() {
    try {
        let response = await fetch(url, fetchOptions);
        let fetchedData = await response.json();
        quoteData = fetchedData[0];
        console.log(quoteData);
    }catch(error) {
        console.log(error);
    }
    
}

function changeColor() {
    let col = colors[Math.floor(Math.random()*colors.length)];
    const root = document.documentElement;
    root.style.setProperty('--main-color', col);
}

function displayQuote() {
    quoteText.textContent = quoteData.quote;
    authorText.textContent = quoteData.author;
}

function startLoading() {
    generateBtn.textContent = "Generating...";
    copyBtn.classList.add("disabled");
}

function stopLoading() {
    generateBtn.textContent = "New Quote";
    copyBtn.classList.remove("disabled");
}

function handleCopy() {
    copyBtn.textContent = 'Copied';
    copyBtn.classList.add('disabled');
    writeToClipBoard();
    setTimeout(()=> {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove("disabled");
    }
    , 3000);
}

async function writeToClipBoard(){
    try {
        await navigator.clipboard.writeText(quoteData.quote);
        console.log('copied')
    }catch(error) {
        console.log(error);
    }
}

