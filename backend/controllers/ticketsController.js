const Tickets = require("../models/ticketsModel");

exports.findAll = (req, res) => {
  Tickets.findAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur s'est produite lors de la récupération des tickets.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  Tickets.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `tickets avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la récupération du l'tickets avec l'ID ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.find = (req, res) => {
  const id = req.params.id;

  Tickets.find(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `tickets de l'utilisateur ID : ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la récupération des tickets de l'utilisitateur ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};
