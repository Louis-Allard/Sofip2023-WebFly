const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs-react");
const transporter = require("./transporter");
const jwt = require("jsonwebtoken");

const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// GESTION DE CONNECTION SOCKET IO
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  // GESTION D'ENVOI DE MESSAGE
  socket.on("send_message", (data) => {
    // INSERER DANS LA BASE DONNEE
    const { message, author } = data;
    const sql = "INSERT INTO message (CONTENU, ID_UTILISATEUR) VALUES (?, ?)";
    connection.query(sql, [message, author], (err, result) => {
      if (err) {
        console.error("Erreur lors de l'insertion du message :", err);
      } else {
        console.log("Message inséré dans la base de données");
        io.emit("send_message", data);
      }
    });
    socket.to(data.room).emit("receive_message", data);
  });
  // GESTION D'ENVOI D'EMOJI

  // GESTION DE DECONNEXION
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});
//REQUETES
const { connexion, etatEnLigne } = require("./Requetes/connexion");
const utilisateur = require("./Requetes/utilisateurs");
const deconnexion = require("./Requetes/deconnexion");
const register = require("./Requetes/register");
const modifProfil = require("./Requetes/modifProfil");
const profil = require("./Requetes/profil");
const changePassword = require("./Requetes/changePassword");
const mail = require("./Requetes/mail");
const checkEmail = require("./Requetes/checkEmail");
const verifyToken = require("./Requetes/tokenVerif");
const createToken = require("./Requetes/createToken");
const resetMdp = require("./Requetes/resetMdp");
const event = require("./Requetes/event");

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

// Route pour récupérer la liste des utilisateurs
app.get("/api/utilisateurs", (req, res) => {
  const sql = "SELECT * FROM utilisateur"; // Assurez-vous que la table s'appelle "utilisateur" dans votre base de données
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des utilisateurs depuis la base de données : ",
        err
      );
      res.status(500).send("Erreur serveur");
    } else {
      res.status(200).json(result);
    }
  });
});

// Route pour supprimer un utilisateur par ID
app.delete("/api/utilisateurs/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = "DELETE FROM utilisateur WHERE ID_UTILISATEUR = ?";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de l'utilisateur : ", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.status(200).send("Utilisateur supprimé avec succès");
    }
  });
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
checkEmail(app, connection);
verifyToken(app, jwt);
createToken(app, connection, jwt);
resetMdp(app, connection);
event(app, connection);
