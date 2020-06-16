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

const handleBackgroundResponse = response =>
    console.log('in-content.js - Received response:', response);

chrome.runtime.sendMessage('Message from in-content.js!', handleBackgroundResponse);
