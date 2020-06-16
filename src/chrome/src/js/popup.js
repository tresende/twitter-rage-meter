const initPopupScript = () => {
    const backgroundWindow = chrome.extension.getBackgroundPage();
    console.log(backgroundWindow.sampleBackgroundGlobal);

    let port = null;

    const sendPortMessage = message => port.postMessage(message);

    const getTab = () =>
        new Promise(resolve => {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                tabs => resolve(tabs[0])
            );
        });

    const messageHandler = message => {
        console.log('popup.js - received message:', message);
    };

    getTab().then(tab => {
        port = chrome.tabs.connect(tab.id, { name: 'chrome-extension-template' });
        port.onMessage.addListener(messageHandler);
        sendPortMessage('Message from popup!');
    });
};

document.addEventListener('DOMContentLoaded', initPopupScript);
