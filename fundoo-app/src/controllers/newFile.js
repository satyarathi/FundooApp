const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '944951631361-u4fja9hnaoia6567cgvn66qu4uqjm7hb.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04zomNNDzoKmWCgYIARAAGAQSNwF-L9IraffNSvoeEaF_8Cp5FUV-Oozm7ag3j9i24v2UoljkrdxNsx9Ezpyt899Ze17hKyXOrQY';


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'jitendrasatyarathi@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'Jitendra Satyarathi <jitendrasatyarathi@gmail.com>',
            to: 'jitendrasatyarathi@gmail.com',
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API',
            html: '<h1>Hello from gmail email using API</h1>',
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));