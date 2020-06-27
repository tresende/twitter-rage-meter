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
    //https://twitter.com/Metropoles/status/1276682873144250368
    const text = 'Mais o interessante é que ela cerca ele para não entrar no carro. Mas senão estava dando certo, porque fazer aquela cena toda. Porque não enfiou a viola dentro saco e não foi embora deixando o jogador a própria sorte. Muito estranho. E tem algo mais, que uma simples briga.!' 
    + 'Com esse video ela tbm se auto incrimina, ela agride ele duas vezes, da dois empurrões sendo o segundo no rosto, DEIXAR CLARO NÉ QUE NÃO COMPACTUO COM NENHUM TIPO DE AGRESSÃO, NÃO TO AQUI JUSTIFICANDO ELE TER AGREDIDO ELA DAQUELA FORMA, APENAS FALANDO O QUE ESTÁ NA GRAVAÇÃO';
    const toneParams = {
        toneInput: {
            text
        },
        contentType: 'application/json',
    };
    const {
        result
    } = await toneAnalyzer.tone(toneParams);
    return result;
}

const getMetter = async (tweets) => {
    const {
        sentences_tone
    } = await analyzeText();
    return {
        result : sentences_tone
    };
};

module.exports = {
    getMetter
};