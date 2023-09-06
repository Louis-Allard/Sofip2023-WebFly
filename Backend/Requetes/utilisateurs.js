const utilisateur = (app, connection) => {

    app.get('/users', (req, res) => {
        // Utilisation d'une requête préparée pour sécuriser la requête
        const sql = 'SELECT * FROM utilisateur';

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            // Traitez les résultats ici et renvoyez-les au client
            res.json(results);
        });
    });

}

module.exports = utilisateur;