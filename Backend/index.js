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
    const { id, message } = data;
    const sql = 'INSERT INTO message (CONTENU, ID_AUTHOR) VALUES (?, ?)';
    connection.query(sql, [message, id], (err, result) => {
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
const deleteUser = require("./Requetes/deleteUser");
const usersEntreprise = require("./Requetes/usersEntreprise");
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
deleteUser(app, connection);
usersEntreprise(app, connection);
event(app, connection);