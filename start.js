const { Client, Location, Poll, List, Buttons, LocalAuth } = require('./index');
const fs = require('fs')
const qrcode = require('qrcode-terminal');

var client = '123456'
var sessionPath = 'C:/Users/rezza/OneDrive/Documents/shopmatic/whatsapp/' + client
var client = new Client({
    // authStrategy: new LocalAuth(),
    // proxyAuthentication: { username: 'username', password: 'password' },
    puppeteer: {
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            // '--single-process',
            '--disable-gpu'
        ],
    },
    authStrategy: new LocalAuth({ clientId: client, dataPath: sessionPath })
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('ready', async (percent, message) => {
    console.log('READY', percent, message);

    var state = await client.getState()
    console.log(state)

    // var chat = await client.getChatsByLabelId(1)
    // console.log(chat)

    // var messages = await client.getMessagesStarred()
    // console.log(messages)

    // var messageLabels = await messages[0].getLabels()
    // console.log(messageLabels)

    // var chat = await messages[0].getChat()
    // console.log(chat)

    // var chatLabels = await chat.getLabels()
    // console.log(chatLabels)

    // var label = await this.client.getLabelById("1")
    // console.log(label)
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.

    // console.log('QR RECEIVED', qr);

    // qrcode.generate(qr, function (qrcode) {
    //     console.log(qrcode);
    // });
});

client.on('message', async msg => {
    // console.log('MESSAGE RECEIVED', msg);
    if (msg.body == 'getLabels') {
        var labels = await client.getLabels()
        labels.forEach((label) => {
            console.log(label)
        })
    }
    if (msg.body.includes('getChatsByLabelId')) {
        var labelId = msg.body.split(' ').length > 1 ? msg.body.split(' ')[1] : 0
        var chat = await client.getChatsByLabelId(labelId)
        console.log(chat)
    }
});

client.on('chat_labeling', async chat => {
    console.log(chat)
});

client.on('message_labeling', async msg => {
    console.log(msg)
});

client.on('message_starred', async msg => {
    console.log(msg)
});