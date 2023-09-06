const sql = require("../db/db");

const Tickets = function (tickets) {
  this.id_users = tickets.username;
  this.title = tickets.password;
};

Tickets.findAll = (result) => {
  sql.query("SELECT id, id_users, title FROM tickets", (err, res) => {
    if (err) {
      console.log("Erreur :", err);
      result(null, err);
      return;
    }

    console.log("Utilisateurs :", res);
    result(null, res);
  });
};

Tickets.find = (id, result) => {
  sql.query(
    "SELECT id, id_users, title  FROM tickets WHERE id_users = ?",
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

      result(null, res);
    }
  );
};

Tickets.findById = (id, result) => {
  sql.query(
    "SELECT id, id_users, title  FROM tickets WHERE id = ?",
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

module.exports = Tickets;
