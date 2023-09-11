const createToken = (app, connection, jwt) => {

    app.put('/createToken/:id', (req, res) => {

        const id = req.params.id;

        const token = jwt.sign({ userID: id }, 'secretKey', { expiresIn: '1h' });

        connection.query(
            "UPDATE utilisateur SET JETON = ? WHERE ID_UTILISATEUR = ?",
            [token, id],
            (error, result) => {
                if (error) {
                    console.error('Erreur lors de l\'insertion', error);
                    res.status(500).send('Erreur lors de la requête');
                } else {
                    console.log('Requête réussie');
                    res.status(200).json({ token, msg: 'Ajout du token réussi' });
                }
            }
        );
    })
};

module.exports = createToken;