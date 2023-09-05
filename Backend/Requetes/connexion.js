const connexion = (app, connection) => {

    app.post('/connexion', (req, res) => {
        let mail = req.body.dataMail;
        let password = req.body.dataPassword; // Récupérez la valeur depuis la requête
        console.log(mail);
        console.log(password);

        // Requête SQL d'insertion
        const sql = "SELECT ID_UTILISATEUR FROM utilisateur WHERE EMAIL = ?";

        // Exécutez la requête
        connection.query(sql, [mail], (error, rows, fields) => {
            if (error) {
                console.error('Erreur lors de la recherche', error);
                res.status(500).json({ message: 'Erreur lors de la requête' });
            } else {
                console.log('Requête réussie');
                console.log(rows);
                if (rows.length === 0) {
                    console.log('Aucun résultat');
                    res.status(500).json({ message: 'Aucun Résultat' });
                } else {
                    console.log("Un resultat a été trouvé");

                    connection.query("SELECT MDP FROM utilisateur WHERE ID_UTILISATEUR = ?", [rows[0].ID_UTILISATEUR], (error, results, fields) => {
                        if (error) {
                            console.error('Erreur lors de l\'insertion', error);
                            res.status(500).json({ message: 'Erreur lors de la requête' });
                        } else {
                            console.log('Requête réussie');
                            res.status(200).json(results[0].MDP);
                            console.log(results[0].MDP);
                        }
                    })
                }
            }
        })
    });

};

module.exports = connexion;