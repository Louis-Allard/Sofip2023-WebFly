const changePassword = (app, connection, bcrypt) => {

    // Endpoint pour la mise à jour du mot de passe
    app.post("/changePassword", (req, res) => {
        const { id, AncienPassword, NouveauPassword } = req.body;
        console.log(id, NouveauPassword);

        // Requête SQL pour rechercher l'utilisateur
        const sql = "SELECT * FROM utilisateur WHERE ID_UTILISATEUR = ?";

        connection.query(sql, [id], async (err, results) => {
            if (err) {
                console.error("Erreur lors de la recherche de l'utilisateur:", err);
                return res
                    .status(500)
                    .json({ message: "Erreur lors de la recherche de l'utilisateur" });
            }

            if (results.length === 0) {
                return res.status(400).json({ message: "Utilisateur non trouvé" });
            }

            const user = results[0];
            console.log(user);

            try {
                // Attendre que la comparaison du mot de passe soit résolue
                const passwordMatch = await bcrypt.compare(AncienPassword, user.MDP);
                console.log(passwordMatch);

                // Vérifiez si l'ancien mot de passe correspond
                if (!passwordMatch) {
                    return res.status(500).json({ message: "Mot de passe actuel incorrect" });
                } else {
                    console.log('MDP CORRECT');
                    // Le mot de passe correspond, vous pouvez continuer ici pour mettre à jour le mot de passe
                }
            } catch (error) {
                console.error("Erreur lors de la comparaison des mots de passe:", error);
                return res
                    .status(500)
                    .json({ message: "Erreur lors de la comparaison des mots de passe" });
            }

            // Mettez à jour le mot de passe avec le nouveau mot de passe
            const updateSql = "UPDATE utilisateur SET MDP = ? WHERE ID_UTILISATEUR = ?";

            connection.query(updateSql, [NouveauPassword, id], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error("Erreur lors de la mise à jour du mot de passe:", updateErr);

                    res.status(500).json({ message: "Erreur lors de la mise à jour du mot de passe" });
                }

                console.log("Mot de passe mis à jour avec succès");
                res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
            }
            );
        });
    });

}

module.exports = changePassword;