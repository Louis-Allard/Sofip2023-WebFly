const express = require("express");
const PORT = process.env.PORT || 3001;
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs-react");

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
app.get("/user", (req, res) => {
    const sql = `SELECT * FROM webfly.utilisateur;`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err);
            return res.json(err);
        }
        return res.json(data);
    });
});

//verifier la conection admin
app.post("/connexion", (req, res) => {
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

    const sql = `SELECT * FROM ${tableName} WHERE email = '${email}'`;

    con.query(sql, [email], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err,
            });
        }
        if (result.length === 1) {
            const user = result[0];
            if (!bcryptjs.compareSync(password, user.mot_de_passe)) {
                return res.json({
                    success: false,
                    message: "Mot de passe incorrect",
                });
            } else {
                const adminId = user.id;
                const token = jwt.sign({ adminId }, "RANDOM_TOKEN_SECRET", {
                    expiresIn: "24h",
                });
                //
                if (tableName === "admin") {
                    return res.json({
                        success: true,
                        message: "Connexion admin réussie",
                        token,
                        adminId,
                        admin: true,
                    });
                } else {
                    return res.json({
                        success: true,
                        message: "Connexion utilisateur réussie",
                        token,
                        admin: false,
                    });
                }
            }
        } else {
            return res.json({
                success: false,
                message: "Adresse e-mail non trouvée",
            });
        }
    });
});

//ajouter utilisateur
app.post("/ajouterUtilisateur", async (req, res) => {
    const { nom, email, password } = req.body;
    console.log(req.body);

    try {
        const sql = `INSERT INTO utilisateur (nom_utilisateur, email, mot_de_passe) VALUES (?, ?, ?)`;
        con.query(sql, [nom, email, password], (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion des données :", err);
                res.json({
                    success: false,
                    message: "Erreur lors de l'enregistrement de l'utilisateur",
                });
            } else {
                res.json({
                    success: true,
                    message: "Utilisateur enregistré avec succès",
                });
            }
        });
    } catch (error) {
        console.error("Erreur lors du hachage du mot de passe :", error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de l'enregistrement de l'utilisateur",
        });
    }
});

//liste utilisateur
app.get("/lister_utilisateur", (req, res) => {
    const sql = `SELECT id,nom,email FROM webfly.utilisateur;`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err);
            return res.json(err);
        }
        console.log(data);
        return res.json(data);
    });
});

//supprimer utilisateur
app.delete("/sup_utilisateur/:userId", (req, res) => {
    const userId = req.params.userId;

    if (!userId || isNaN(userId)) {
        return res.status(400).json({ error: "ID d'utilisateur invalide" });
    }

    const sql = `DELETE FROM utilisateur WHERE id = ${userId};`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err);
            return res.status(500).json({ error: "Erreur de base de données" });
        }
        console.log(data);
        return res.json({ message: "Utilisateur supprimé avec succès" });
    });
});

//modifier utilisateur
app.post("/update_User/:userId", async (req, res) => {
    const { nom, email } = req.body;
    const userId = req.params.userId;

    if (!userId || isNaN(userId)) {
        return res.status(400).json({ error: "ID d'utilisateur invalide" });
    }

    try {
        const sql = `UPDATE utilisateur SET nom = "${nom}", email = "${email}" where id = ${userId}`;
        con.query(sql, [nom, email], (err, result) => {
            if (err) {
                console.error(
                    "Erreur lors de la modification des données :",
                    err
                );
                res.json({
                    success: false,
                    message: "Erreur lors de la modification de l'utilisateur",
                });
            } else {
                res.json({
                    success: true,
                    message: "Utilisateur modifier avec succès",
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la modification de l'utilisateur",
        });
    }
});

//recuperrer les message en fonction de la discution
app.get("/messagerie", (req, res) => {
    const sql = `select message_id,admin_id,utilisateur_id,categorie_id,message_text,date_envoi,lu,emetteur,discution_id,nom_categorie,admin.nom_admin,admin.prenom_admin,utilisateur.nom_utilisateur from messages 
    INNER JOIN admin on admin_id = admin.id 
    INNER JOIN utilisateur ON utilisateur_id = utilisateur.id 
    INNER JOIN categorie ON categorie_id = categorie.id
    ORDER BY date_envoi ASC`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err);
            return res.json(err);
        }
        return res.json(data);
    });
});

//recuperre les categorie 
app.get("/categorie", (req, res) => {
    const sql = `SELECT * FROM webfly.categorie;`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err);
            return res.json(err);
        }
        return res.json(data);
    });
});

//ajouter un message
app.post("/ajouterMessage", async (req, res) => {
    const {
        adminID,
        utilisateurID,
        categorieId,
        message,
        emetteur,
        discutionID,
    } = req.body;
    console.log(req.body)
    try {
        const sql = `INSERT INTO messages (admin_id, utilisateur_id, categorie_id, message_text, emetteur, discution_id) VALUES (?, ?, ?, ?, ?, ?)`;

        con.query(
            sql,
            [adminID, utilisateurID, categorieId, message, emetteur, discutionID],
            (err, result) => {
                if (err) {
                    console.error("Erreur lors de l'insertion des données :", err);
                    res.status(500).json({
                        success: false,
                        message: "Erreur lors de l'enregistrement du message",
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Message enregistré avec succès",
                    });
                }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de l'enregistrement du message",
        });
    }
});



app.listen(PORT, () => {
    console.log(`mon backend : ${PORT}`);
});
