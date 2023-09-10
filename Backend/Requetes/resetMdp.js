const resetMdp = (app, connection) => {

    app.post('/reset', (req, res) => {

        const id = req.body.idUser;
        const mdp = req.body.hashed;

        const updateSql = "UPDATE utilisateur SET MDP = ? WHERE ID_UTILISATEUR = ?";

        connection.query(updateSql, [mdp, id], (err, result) => {
            if (err) {
                console.error("Erreur lors de la mise à jour du mot de passe:", err);

                res.status(500).json({ message: "Erreur lors de la mise à jour du mot de passe" });
            }

            //console.log("Mot de passe mis à jour avec succès");
            res.status(200).send("Mot de passe mis à jour avec succès");
        }
        );

    })

}

module.exports = resetMdp;