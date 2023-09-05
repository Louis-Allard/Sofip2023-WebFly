const sql = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.roles = user.roles;
  this.name = user.name;
  this.avatar = user.avatar;
};

User.findAll = (result) => {
  sql.query(
    "SELECT id, username, password, roles, name, avatar FROM users",
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
User.findOne = (username, result) => {
  sql.query(
    "SELECT id, username, password, roles, name, avatar FROM users WHERE username = ?",
    username,
    (err, res) => {
      if (err) {
        console.log("Erreur :", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Utilisateur trouvé :", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

User.findById = (id, result) => {
  sql.query(
    "SELECT id, username, password, roles, name, avatar FROM users WHERE id = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("Erreur :", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Utilisateur trouvé :", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

User.create = (newUser, result) => {
  bcrypt.hash(newUser.password.toString(), 10, (err, hash) => {
    if (err) {
      result({ Error: "Error during hashing" }, null);
      return;
    }
    if (newUser.password === "") {
      result({ Error: "Error : Password must not be empty" }, null);
      return;
    }
    if (newUser.password < 3) {
      result({ Error: "Error : Password must be 3 or more character" }, null);
      return;
    }
    if (newUser.username.length < 3) {
      result({ Error: "Error : Username must be more than 3 character" }, null);
      return;
    }
    if (newUser.email.length < 3) {
      result({ Error: "Error : Email must not be empty" }, null);
      return;
    }
    newUser.password = hash;
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("Error :", err);
        result(err, null);
        return;
      }

      console.log("User created :", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  });
};

User.update = (id, user, result) => {
  bcrypt.hash(user.password.toString(), 10, (err, hash) => {
    if (err) {
      console.log("Erreur hashing:", err);
      result(err, null);
      return;
    }
    user.password = hash;
    sql.query(
      "UPDATE users SET username = ?, password = ? , email = ?, is_admin = ?, firstname = ?, lastname = ?, phone = ?, postal = ?, avatar = ?, website = ?, id_adress = ?  WHERE id = ?",
      [
        user.username,
        user.password,
        user.email,
        user.is_admin,
        user.firstname,
        user.lastname,
        user.phone,
        user.postal,
        user.avatar,
        user.website,
        user.id_adress,
        id,
      ],
      (err, res) => {
        if (err) {
          console.log("Erreur :", err);
          result(err, null);
          return;
        }
        if (res.affectedRows === 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Utilisateur mis à jour :", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  });
};

User.updateInfo = (id, user, result) => {
  sql.query(
    "UPDATE users SET email = ?, firstname = ?, lastname = ?, phone = ?  WHERE id = ?",
    [user.email, user.firstname, user.lastname, user.phone, id],
    (err, res) => {
      if (err) {
        console.log("Erreur :", err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Utilisateur mis à jour :", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.updatePass = (id, newUser, result) => {
  sql.query(
    "UPDATE users SET password = ?  WHERE id = ?",
    [newUser.password, id],
    (err, res) => {
      if (err) {
        console.log("Error :", err);
        result(err, null);
        return;
      }

      console.log("Utilisateur mise à jour :", {
        id: res.insertId,
        ...newUser,
      });
      result(null, { id: res.insertId, ...newUser });
    }
  );
};

User.delete = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Erreur :", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Utilisateur supprimé avec ID :", id);
    result(null, res);
  });
};

User.login = (username, password, result) => {
  sql.query("SELECT * FROM users WHERE username = ?", username, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length > 0) {
      const username = res[0].username;
      const role = res[0].is_admin;
      const id = res[0].id;
      bcrypt.compare(password, res[0].password, (err, res) => {
        if (err) {
          result({ error: "PASSWORD compare error" }, null);
          return;
        }
        if (res) {
          const token = jwt.sign(
            { username, role, id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          result(null, { Status: "Success", Token: token });
          return;
        } else {
          result({ error: "Password Incorrect" }, null);
          return;
        }
      });
    } else {
      result({ error: "USERNAME INCORRECT" }, null);
    }
  });
};

module.exports = User;
