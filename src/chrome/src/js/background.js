const sampleBackgroundGlobal = {
    message: 'This object comes from background.js'
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('background.js - received message from in-content.js:', message);
    sendResponse('👍');
});

window.sampleBackgroundGlobal = sampleBackgroundGlobal;
