const register = (app, connection) => {

    // CREER UN COMPTE POUR ADMIN
    app.post('/register', (req, res) => {
        const mail = req.body.mail;
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const entreprise = req.body.entreprise
        const motdepasse = req.body.mdp;

        connection.query(
            "INSERT INTO utilisateur (EMAIL,NOM,PRENOM,ENTREPRISE,MDP,ROLE_UTILISATEUR,ETAT) VALUES (?,?,?,?,?,?,?)",
            [mail, nom, prenom, entreprise, motdepasse, 'user', 'Hors ligne'],
            (error, result) => {
                if (error) {
                    console.error('Erreur lors de l\'insertion', error);
                    res.status(500).json({ message: 'Erreur lors de la requête' });
                } else {
                    console.log('Requête réussie');
                    res.status(200).json({ msg: 'insertion réussie.' });
                }
            }
        );
    });

}

module.exports = register