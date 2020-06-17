
const sampleBackgroundGlobal = {
    message: 'This object comes from background.js'
};

// Listen to short lived messages from in-content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('background.js - received message from in-content.js:', message);
    sendResponse('👍');
});

window.sampleBackgroundGlobal = sampleBackgroundGlobal;
