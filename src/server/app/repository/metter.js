const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const {
    IamAuthenticator
} = require('ibm-watson/auth');
const url = 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/17e76ef6-b636-443f-bbbb-62989a7e6844';

const getClient = () => {
    return new ToneAnalyzerV3({
        version: '2017-09-21',
        authenticator: new IamAuthenticator({
            apikey: process.env.API_KEY,
        }),
        url
    });
}

const analyzeText = async () => {
    const toneAnalyzer = getClient();
    const text = 'VAI TOMAR NO CU!';
    const toneParams = {
        toneInput: { text },
        contentType: 'application/json',
    };
    return await toneAnalyzer.tone(toneParams);
}

const getMetter = async (tweets) => {
    const result = await analyzeText();
    return {
        result
    };
};

module.exports = {
    getMetter
};