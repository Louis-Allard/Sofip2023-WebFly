const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config("/.env");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3001;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

const usersRoute = require("./routes/usersRoute");
app.use("/users", usersRoute);

const ticketsRoute = require("./routes/ticketsRoute");
app.use("/tickets", ticketsRoute);

const messageRoute = require("./routes/messageRoute");
app.use("/messages", messageRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
