const usersEntreprise = (app, connection) => {

    app.get("/users/:entreprise/:id", (req, res) => {
        const entreprise = req.params.entreprise;
        const id = req.params.id;

        const query =
            "SELECT * FROM utilisateur WHERE ENTREPRISE = ? AND ID_UTILISATEUR != ? ORDER BY ETAT ASC";

        connection.query(query, [entreprise, id], (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).send("Erreur lors de la récupération du profil");
            }
            res.json(result);
        });
    });

};

module.exports = usersEntreprise;