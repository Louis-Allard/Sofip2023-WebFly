const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const port = 3001;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  }
});


io.on('connection', (socket) => {
  console.log(`User Connected :  ${socket.id}`);

  socket.on('join_conversation', (data) => {
    socket.join(data)
  });
  socket.on('send_message', (data) => {
    
  });
  socket.disconnect('disconnect', ()=> {
    console.log(`User Disconnected : ${socket.id}`)
  })
})



app.use(express.json());

const adressRoutes = require('./routes/adresseRoutes');
app.use("/adresses", adressRoutes);

const entrepriseRoutes = require('./routes/entrepriseRoutes');
app.use("/entreprises", entrepriseRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });