const mail = (app, transporter) => {

    app.post('/mail', (req, res) => {

        const mailOptions = {
            from: 'nicolas.dupontnew@gmail.com',
            to: 'nicolas.dupont59176@gmail.com',
            subject: 'TEST',
            text: 'TEST',
        };

        // Envoyez l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('ERREUR');
                console.error(error);
                res.status(500).send(`Erreur lors de l'envoi de l'e-mail : ${error.message}`);
            } else {
                console.log('E-mail envoyé : ' + info.response);
                res.status(200).send('E-mail envoyé avec succès');
            }
        });

    })


}

module.exports = mail;