const checkEmail = (app, connection) => {

    app.post('/checkEmail', (req, res) => {
        const email = req.body.dataMail

        const query = "SELECT `ID_UTILISATEUR` FROM `utilisateur` WHERE EMAIL = ?";

        connection.query(query, [email], (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: "Erreur lors de la récupération du profil" });
            } else {
                console.log(result);
                if (result.length === 0) {
                    res.status(200).send(false);
                } else {
                    const profileData = result[0].ID_UTILISATEUR;
                    res.status(200).json(profileData);
                }
            }
        });

    })

}

module.exports = checkEmail;