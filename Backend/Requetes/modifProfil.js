const modifprofil = (app, connection) => {
  // Modifier mon profil
  app.put("/profil/utilisateur/:id", (req, res) => {
    const ID_UTILISATEUR = req.params.id;
    const { EMAIL, NOM, PRENOM, ENTREPRISE } = req.body;
    const query =
      "UPDATE utilisateur SET EMAIL = ?, NOM = ?, PRENOM = ?, ENTREPRISE = ? WHERE ID_UTILISATEUR = ?";
    connection.query(
      query,
      [EMAIL, NOM, PRENOM, ENTREPRISE, ID_UTILISATEUR],
      (err, result) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .json({
              message: "Erreur lors de la mise à jour de l'utilisateur",
            });
        } else {
          res
            .status(200)
            .json({ message: "Utilisateur mis à jour avec succès" });
        }
      }
    );
  });
};

module.exports = modifprofil;
