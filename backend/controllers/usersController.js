const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

exports.findAll = (req, res) => {
  User.findAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur s'est produite lors de la récupération des utilisateurs.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  User.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la récupération de l'utilisateur avec l'ID ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu de la requête ne peut pas être vide.",
    });
  }

  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    is_admin: req.body.is_admin,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    postal: req.body.postal,
    avatar: req.body.avatar,
    website: req.body.website,
    id_adress: req.body.id_adress,
  });

  User.create(newUser, (err, data) => {
    if (err) {
      res.send({
        message:
          err.Error ||
          "Une erreur s'est produite lors de la création de l'utilisateur.",
      });
    } else {
      res.send({ Status: "Success", Data: data });
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu de la requête ne peut pas être vide.",
    });
  }

  const id = req.params.id;

  const updated = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    is_admin: req.body.is_admin,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    postal: req.body.postal,
    avatar: req.body.avatar,
    website: req.body.website,
    id_adress: req.body.id_adress,
  });

  User.update(id, updated, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la mise à jour de l'utilisateur avec l'ID ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.updateInfo = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu de la requête ne peut pas être vide.",
    });
  }

  const id = req.params.id;

  const updated = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
  });

  User.updateInfo(id, updated, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la mise à jour de l'utilisateur avec l'ID ${id}.`,
        });
      }
    } else {
      res.send({ data, Status: "OK" });
    }
  });
};

exports.updatePass = async (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu de la requête ne peut pas être vide.",
    });
  } else {
    if (req.body.password === "" || req.body.password < 3) {
      res.status(400).send({
        message: "Le mot de passe est trop court.",
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const updated = new User({
        password: hashedPassword,
      });
      User.updatePass(id, updated, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Utilisateur avec l'ID ${id} non trouvé.`,
            });
          } else {
            res.status(500).send({
              message: `Erreur lors de la mise à jour de l'utilisateur avec l'ID ${id}.`,
            });
          }
        } else {
          res.send({ data, Status: "OK" });
        }
      });
    }
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.delete(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la suppression de l'utilisateur avec l'ID ${id}.`,
        });
      }
    } else {
      res.send({ message: "Utilisateur supprimé avec succès !" });
    }
  });
};

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.login(username, password, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.cookie("token", data.Token);
      res.send(data.Status);
    }
  });
};
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ status: "Success" });
};
