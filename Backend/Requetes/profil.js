const profil = (app, connection) => {
  app.get("/profil/:id", (req, res) => {
    const query =
      "SELECT `ID_UTILISATEUR`, `EMAIL`, `NOM`, `PRENOM`, `ENTREPRISE` FROM `utilisateur` WHERE ID_UTILISATEUR =?";

    const ID_UTILISATEUR = req.params.id;

    connection.query(query, [ID_UTILISATEUR], (error, result) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Erreur lors de la récupération du profil" });
      } else {
        if (result.length === 0) {
          res.status(404).json({ message: "Profil non trouvé" });
        } else {
          const profileData = result[0];
          res.json(profileData);
        }
      }
    });
  });
};

module.exports = profil;
