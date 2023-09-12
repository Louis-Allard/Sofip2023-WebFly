const getInvite = (app, connection) => {

    app.get("/getInvite/:id", (req, res) => {
        const query = "SELECT invitation.*, utilisateur.NOM AS NOM, utilisateur.PRENOM as PRENOM FROM invitation JOIN utilisateur ON invitation.ID_SENDER = utilisateur.ID_UTILISATEUR WHERE invitation.ID_RECEIVER = ?";

        const ID_RECEIVER = req.params.id;

        connection.query(query, [ID_RECEIVER], (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).send("Erreur lors de la récupération du profil");
            }
            res.status(200).json(result);
        });
    });

}

module.exports = getInvite;