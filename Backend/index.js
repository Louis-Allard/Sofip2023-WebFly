const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const connexion = require("./Requetes/connexion");
const modifProfil = require("./Requetes/modifProfil");
const profil = require("./Requetes/profil");
const utilisateur = require("./Requetes/utilisateurs");

dotenv.config();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.listen(PORT, () => {
  console.log(`Le port de mon backend est le : ${PORT}`);
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
  } else {
    console.log("Connecté à la base de données MySQL !");
  }
});

// CREER UN COMPTE POUR ADMIN
app.post("/register", (req, res) => {
  const mail = req.body.mail;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const entreprise = req.body.entreprise;
  const motdepasse = req.body.mdp;

  connection.query(
    "INSERT INTO utilisateur (EMAIL,NOM,PRENOM,ENTREPRISE,MDP,ROLE_UTILISATEUR,ETAT) VALUES (?,?,?,?,?,?,?)",
    [mail, nom, prenom, entreprise, motdepasse, "user", "Hors ligne"],
    (error, result) => {
      if (error) {
        console.error("Erreur lors de l'insertion", error);
        res.status(500).json({ message: "Erreur lors de la requête" });
      } else {
        console.log("Requête réussie");
        res.status(200).json({ msg: "insertion réussie." });
      }
    }
  );
});

// Endpoint pour la mise à jour du mot de passe
app.put("/changePassword", (req, res) => {
  const { id, AncienPassword, NouveauPassword } = req.body;

  // Requête SQL pour rechercher l'utilisateur
  const sql = "SELECT * FROM utilisateur WHERE ID_UTILISATEUR = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la recherche de l'utilisateur:", err);
      return res
        .status(500)
        .json({ message: "Erreur lors de la recherche de l'utilisateur" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const user = results[0];

    // Vérifiez si l'ancien mot de passe correspond
    if (user.password !== AncienPassword) {
      return res.status(500).json({ message: "Mot de passe actuel incorrect" });
    }

    // Mettez à jour le mot de passe avec le nouveau mot de passe
    const updateSql = "UPDATE utilisateurs SET MDP = ? WHERE EMAIL = ?";

    connection.query(
      updateSql,
      [NouveauPassword, id],
      (updateErr, updateResult) => {
        if (updateErr) {
          console.error(
            "Erreur lors de la mise à jour du mot de passe:",
            updateErr
          );

          res
            .status(500)
            .json({ message: "Erreur lors de la mise à jour du mot de passe" });
        }

        console.log("Mot de passe mis à jour avec succès");
        res
          .status(200)
          .json({ message: "Mot de passe mis à jour avec succès" });
      }
    );
  });
});

connexion(app, connection);
utilisateur(app, connection);
profil(app, connection);
modifProfil(app, connection);
