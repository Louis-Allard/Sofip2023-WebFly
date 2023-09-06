const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const {Server} = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
});
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} join room: ${data}`);
    })
    socket.on("send_message"), (data) =>{
        socket.to(data.room).emit("receive_message",data);
    }
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    })
})
//REQUETES
const connexion = require("./Requetes/connexion");
const utilisateur = require('./Requetes/utilisateurs');

dotenv.config();
app.use(express.json());

server.listen(PORT, () => {
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
app.post('/register', (req, res) => {
    const mail = req.body.mail;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const entreprise = req.body.entreprise
    const motdepasse = req.body.mdp;

    connection.query(
        "INSERT INTO utilisateur (EMAIL,NOM,PRENOM,ENTREPRISE,MDP,ROLE_UTILISATEUR,ETAT) VALUES (?,?,?,?,?,?,?)",
        [mail, nom, prenom, entreprise, motdepasse, 'user', 'Hors ligne'],
        (error, result) => {
            if (error) {
                console.error('Erreur lors de l\'insertion', error);
                res.status(500).json({ message: 'Erreur lors de la requête' });
            } else {
                console.log('Requête réussie');
                res.status(200).json({ msg: 'insertion réussie.' });
            }
        }
    );
});
// })


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