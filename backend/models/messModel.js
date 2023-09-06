const sql = require("../db/db");


const Mess = function (messages) {
  this.text = messages.text;
  this.created_at = messages.created_at;
  this.id_tickets = messages.id_tickets;
  this.looked = messages.looked;
};

Mess.findById = (id, result) => {
    sql.query(
      "SELECT id, id_users, text, created_at, id_tickets, looked FROM messages WHERE id = ?",
      [id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
  
        if (res.length === 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        result(null, res[0]);
      }
    );
  };

  Mess.findAllByTicket = (id,result) => {
    sql.query(
        "SELECT * from messages INNER JOIN tickets ON messages.id_users = tickets.id_users AND messages.id_users = ?",
        [id], // ( affiche les messages en fonction de l'ID) 
      (err, res) => {
        if (err) {
          console.log("Erreur :", err);
          result(null, err);
          return;
        }
  
        console.log("Utilisateurs :", res);
        result(null, res);
      }
    );
  };

  module.exports = Mess;