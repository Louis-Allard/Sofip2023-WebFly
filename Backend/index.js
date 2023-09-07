const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs-react');
const transporter = require('./transporter');

//REQUETES
const { connexion, etatEnLigne } = require("./Requetes/connexion");
const utilisateur = require('./Requetes/utilisateurs');
const deconnexion = require('./Requetes/deconnexion');
const register = require('./Requetes/register');
const modifProfil = require("./Requetes/modifProfil");
const profil = require("./Requetes/profil");
const changePassword = require('./Requetes/changePassword');
const mail = require('./Requetes/mail');

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

connexion(app, connection);
utilisateur(app, connection);
etatEnLigne(app, connection);
deconnexion(app, connection);
register(app, connection);
profil(app, connection);
modifProfil(app, connection);
changePassword(app, connection, bcrypt);
mail(app, transporter);
