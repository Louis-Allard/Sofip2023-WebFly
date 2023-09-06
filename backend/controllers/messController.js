const Mess = require("../models/messModel");

exports.findAllByTicket = (req, res) => {
    const id = req.params.id;
    Mess.findAllByTicket(id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Conv avec l'utilisateur possèdant l'ID ${id} non trouvé.`,
            });
          } else {
            res.status(500).send({
              message: `Erreur lors de la récupération de la conv avec l'utilisateur  avec l'ID ${id}.`,
            });
          }
        } else {
          res.send(data);
        }
      });
    };

exports.findById = (req, res) => {
    const id = req.params.id;
  
    Mess.findById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Message avec l'ID ${id} non trouvé.`,
          });
        } else {
          res.status(500).send({
            message: `Erreur lors de la récupération du message avec l'ID ${id}.`,
          });
        }
      } else {
        res.send(data);
      }
    });
  };