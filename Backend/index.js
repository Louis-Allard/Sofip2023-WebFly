const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

//REQUETES
const { connexion, etatEnLigne } = require("./Requetes/connexion");
const utilisateur = require('./Requetes/utilisateurs');
const deconnexion = require('./Requetes/deconnexion');
const register = require('./Requetes/register');

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

connexion(app, connection);
utilisateur(app, connection);
etatEnLigne(app, connection);
deconnexion(app, connection);
register(app, connection);