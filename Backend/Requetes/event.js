const event = (app, connection) => {
  // Créer un événement
  app.post("/agenda", (req, res) => {
    const { title, date, id } = req.body;
    connection.query(
      "INSERT INTO calendrier (TITLE, DATE_CALENDRIER, ID_UTILISATEUR ) VALUES (?, ?, ?)",
      [title, date, id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Erreur lors de la création de l'événement");
        } else {
          res.status(201).send("Événement créé avec succès");
        }
      }
    );
  });

  // Obtenir tous les événements
  app.get("/agenda", (req, res) => {
    connection.query("SELECT * FROM calendrier", (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des événements");
      } else {
        res.status(200).json(results);
      }
    });
  });
};

module.exports = event;
