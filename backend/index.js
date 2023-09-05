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
    const sql = `SELECT * FROM webfly.admin;`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err)
            return res.json(err);
        }
        return res.json(data);

    })
})


app.listen(PORT, () => {
    console.log(`mon backend : ${PORT}`);
});