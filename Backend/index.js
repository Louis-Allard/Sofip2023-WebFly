const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

//REQUETES
const connexion = require("./Requetes/connexion");
const utilisateur = require('./Requetes/utilisateurs');

dotenv.config();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(PORT, () => {
    console.log(`Le port de mon backend est le : ${PORT}`);
});

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connecté à la base de données MySQL !');
    }
});

// CREER UN COMPTE POUR ADMIN
app.post('/register', (req, res) => {
    const mail = req.body.mail;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const entreprise = req.body.entreprise
    const motdepasse = req.body.mdp;
    const role = req.body.ROLE_UTILISATEUR;
    const etat = req.body.ETAT;
    // HASH LE MOT DE PASSE
    // bcrypt.hash(motdepasse, saltRounds, (err, hash) => {
    // 	if(err){
    // 		console.log("erreur dans le hash");
    // 	}
    // REQUETE
    connection.query(
        "INSERT INTO utilisateur (EMAIL,NOM,PRENOM,ENTREPRISE,MDP,ROLE_UTILISATEUR,ETAT) VALUES (?,?,?,?,?,'user','hors ligne')",
        [mail, nom, prenom, entreprise, motdepasse, role, etat],
        (err, result) => {
            if (err) return res.json({ Error: "Problème de requête" });
            return res.redirect('/');
        }
    );
});
// })

connexion(app, connection);
utilisateur(app, connection);

