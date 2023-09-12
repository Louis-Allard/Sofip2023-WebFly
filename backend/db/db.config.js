const mysql = require("mysql2");
const dotenv = require("dotenv");

// Configurez votre connexion à la base de données MySQLco
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "webfly",
});
 
connection.connect((error) => { 
  if (error) throw error;
  console.log("Connected to the database.");
});

module.exports = connection;