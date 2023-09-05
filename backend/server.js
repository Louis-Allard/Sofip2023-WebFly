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

const knex = require('knex')({
    client: 'mysql2',
    connection: {
    host: 'localhost',
    port: 3306,
    user: 'webfly',
    password: 'bLJ-9v7UFrhp(wdo',
    database: 'webfly'
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });