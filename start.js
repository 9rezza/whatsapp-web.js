const { Client, Location, Poll, List, Buttons, LocalAuth } = require('./index');
const fs = require('fs')
const qrcode = require('qrcode-terminal');

var sessionPath = 'C:/Users/rezza/OneDrive/Documents/shopmatic/whatsapp/1234'
var client = new Client({
    // authStrategy: new LocalAuth(),
    // proxyAuthentication: { username: 'username', password: 'password' },
    puppeteer: {
        webVersion: '2.2412.50',
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
    authStrategy: new LocalAuth({ clientId: '1234', dataPath: sessionPath })
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('ready', async (percent, message) => {
    console.log('READY', percent, message);

    // var chat = await client.getChatsByLabelId(1)
    // console.log(chat)

    // var messages = await client.getStarredMessages()
    // console.log(messages)
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
    if (msg.body == 'restart') {
        const pages = await client.pupBrowser.pages()
        await Promise.all(pages.map((page) => page.close()))
        await client.pupBrowser.close()

        sessionPath = 'C:/Users/rezza/OneDrive/Documents/shopmatic/whatsapp/1234'
        client = new Client({
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
            authStrategy: new LocalAuth({ clientId: '1234', dataPath: sessionPath })
        });

        client.initialize();
    }
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