const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3001;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

const adressRoutes = require('./routes/adresseRoutes');
app.use("/adresses", adressRoutes);

const entrepriseRoutes = require('./routes/entrepriseRoutes');
app.use("/entreprises", entrepriseRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });