const express = require("express");
const PORT = process.env.PORT || 3001;
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//conexion a la db
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "webfly",
});


con.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
    } else {
        console.log("Connexion à la base de données réussie");
    }
});

// test pour recuperer des donne de la bas
app.get('/user', (req, res) => {
    const sql = `SELECT * FROM webfly.utilisateur;`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err)
            return res.json(err);
        }
        return res.json(data);

    })
})

//verifier la conection admin
const bcrypt = require('bcrypt'); // Importez le module bcrypt

app.post("/Connexion", (req, res) => {
    const { email, password } = req.body;

    let tableName = "";

    if (email === "md@webfly.fr") {
        tableName = "admin";
    } else if (email != "md@webfly.fr") {
        tableName = "utilisateur";
    } else {
        return res.status(400).json({
            success: false,
            message: "Type d'utilisateur invalide",
        });
    }

    const sql = `SELECT * FROM ${tableName} WHERE email = ?`;

    con.query(sql, [email], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erreur de connexion à la base de données",
            });
        }

        if (result.length === 1) {
            const user = result[0];

            // Comparer le mot de passe entré avec le mot de passe haché en utilisant bcrypt
            bcrypt.compare(password, user.mot_de_passe, (err, passwordMatch) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Erreur de comparaison de mot de passe",
                    });
                }

                if (passwordMatch) {
                    const userId = user.id;
                    const token = jwt.sign({ userId }, "RANDOM_TOKEN_SECRET", {
                        expiresIn: "24h",
                    });

                    if (tableName === "admin") {
                        return res.json({ success: true, message: "Connexion admin réussie", token, admin: true });
                    } else {
                        return res.json({ success: true, message: "Connexion utilisateur réussie", token, admin: false });
                    }
                } else {
                    return res.json({
                        success: false,
                        message: "Mot de passe incorrect",
                    });
                }
            });
        } else {
            return res.json({
                success: false,
                message: "Adresse e-mail non trouvée",

            });
        }
    });
});



app.post('/login', (req, res) => {
    const { email } = req.body;

    // Vérifier si l'e-mail se trouve dans la table "admin"
    db.query('SELECT * FROM admin WHERE email = ?', [email], (err, adminResults) => {
        if (err) {
            console.error('Erreur lors de la recherche dans la table "admin" :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }

        // Si l'e-mail se trouve dans la table "admin"
        if (adminResults.length > 0) {
            return res.status(200).json({ message: 'Connecté en tant qu\'administrateur' });
        }

        // Si l'e-mail n'est pas dans la table "admin", vérifiez la table "utilisateur"
        db.query('SELECT * FROM utilisateur WHERE email = ?', [email], (err, userResults) => {
            if (err) {
                console.error('Erreur lors de la recherche dans la table "utilisateur" :', err);
                return res.status(500).json({ message: 'Erreur serveur' });
            }

            // Si l'e-mail se trouve dans la table "utilisateur"
            if (userResults.length > 0) {
                return res.status(200).json({ message: 'Connecté en tant qu\'utilisateur' });
            }

            // Si l'e-mail n'est pas trouvé dans les deux tables
            return res.status(404).json({ message: 'E-mail non trouvé' });
        });
    });
});



app.listen(PORT, () => {
    console.log(`mon backend : ${PORT}`);
});