const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cyrilgdev@gmail.com',
        pass: 'fiyfkevwegskskom',
    },
    tls: {
        rejectUnauthorized : false,
    }
});

module.exports = transporter;