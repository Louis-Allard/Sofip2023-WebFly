const deleteUser = (app, connection) => {

    // Route pour supprimer un utilisateur par ID
    app.delete("/api/utilisateurs/:userId", (req, res) => {
        const userId = req.params.userId;
        const sql = "DELETE FROM utilisateur WHERE ID_UTILISATEUR = ?";
        connection.query(sql, [userId], (err, result) => {
            if (err) {
                console.error("Erreur lors de la suppression de l'utilisateur : ", err);
                res.status(500).send("Erreur serveur");
            } else {
                res.status(200).send("Utilisateur supprimé avec succès");
            }
        });
    });

};

module.exports = deleteUser;