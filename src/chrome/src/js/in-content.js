const INTERVAL = 3000;
let port = null;

const sendPortMessage = data => port.postMessage(data);

const popupMessageHandler = message => console.log('in-content.js - message from popup:', message);

chrome.extension.onConnect.addListener(popupPort => {
    popupPort.onMessage.addListener(popupMessageHandler);
    popupPort.onDisconnect.addListener(() => {
        console.log('in-content.js - disconnected from popup');
    });
    port = popupPort;
    sendPortMessage('message from in-content.js');
});

const handleBackgroundResponse = response => {
    console.log('in-content.js - Received response:', response);
}

const isTwitter = window.location.href.includes('twitter.com');

const isNumber = (text) => {
    const number = parseInt(text);
    return !isNaN(number);
}

const isValidTweet = (text) => {
    if(!text) return false;
    const minutesLabel = text[text.length - 1] == 'm';
    const minutesValue = isNumber(text[text.length - 2]);
    return !(minutesLabel && minutesValue);
}

const start = () => {
    if (!isTwitter) return;
    let allTweets = [];
    setInterval(() => {
        const tweets = [...document.querySelectorAll('article > div > div > div > div')].map(item => item.innerText)
            .filter(text => isValidTweet(text))
            .map(text => text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ''));
        const concatened = allTweets.concat(tweets)
        allTweets = concatened.filter((item, pos) => concatened.indexOf(item) === pos);
    }, INTERVAL);
}

chrome.runtime.sendMessage('Message from in-content.js!', handleBackgroundResponse);
start();