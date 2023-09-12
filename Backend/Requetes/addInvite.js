const addInvite = (app, connection) => {

    app.post('/addInvite', (req, res) => {
        const { idDest, room, id } = req.body;

        connection.query(
            "INSERT INTO invitation (ID_SENDER, ID_RECEIVER, ROOM) VALUES (?,?,?)",
            [id, idDest, room],
            (error, result) => {
                if (error) {
                    console.error('Erreur lors de l\'invitation', error);
                    res.status(500).json({ message: 'Erreur lors de la requête' });
                } else {
                    console.log('Requête réussie');
                    res.status(200).send('Invitation envoyé');
                }
            }
        );
    });

}

module.exports = addInvite;