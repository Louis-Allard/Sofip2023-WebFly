const deconnexion = (app, connection) => {

    app.put('/deconnexion/:id', (req, res) => {
        const idUser = req.params.id;
        console.log(idUser);
        connection.query("UPDATE utilisateur SET ETAT = ?  WHERE ID_UTILISATEUR = ?", ['Hors Ligne', idUser], function (err, result) {
            if (err) {
                console.error('Erreur lors de la modification', err);
                res.status(500).json({ message: 'Erreur lors de la modification' });
            } else {
                console.log('Requête réussie');
                res.status(200).json({ message: "Modification de l'état réussie." })
            }
        });
    })
};

module.exports = deconnexion;