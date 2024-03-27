const { Client, Location, Poll, List, Buttons, LocalAuth } = require('./index');
const fs = require('fs')
const qrcode = require('qrcode-terminal');

var sessionPath = 'C:/Users/rezza/OneDrive/Documents/shopmatic/whatsapp/1234'
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
    authStrategy: new LocalAuth({ clientId: '1234', dataPath: sessionPath })
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    qrcode.generate(qr, function (qrcode) {
        console.log(qrcode);
    });
    console.log('QR RECEIVED', qr);
});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);
    if (msg.body == 'restart') {
        console.log(client.pupBrowser)
        console.log(client.pupPage)


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
});