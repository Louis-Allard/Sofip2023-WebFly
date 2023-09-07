const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nicolas.dupontnew@gmail.com',
        pass: 'rqsyysntkhdhehrz',
    },
});

module.exports = transporter;