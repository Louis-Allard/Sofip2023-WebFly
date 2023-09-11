const mail = (app, transporter) => {
  app.post("/mail", (req, res) => {
    const mail = req.body.mail2;
    const token = req.body.token;

    const mailOptions = {
      from: "freddelan59450@gmail.com",
      to: mail,
      subject: "Réinitialisation de votre mot de passe",
      text: `Bonjour, suivez le lien suivant pour réinitialiser votre mot de passe : http://localhost:3000/reset/${token}`,
    };

    // Envoyez l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("ERREUR");
        console.error(error);
        res
          .status(500)
          .send(`Erreur lors de l'envoi de l'e-mail : ${error.message}`);
      } else {
        console.log("E-mail envoyé : " + info.response);
        res.status(200).send("E-mail envoyé avec succès");
      }
    });
  });
};

module.exports = mail;
