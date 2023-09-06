const Adresse = require('../models/adresseModel');

exports.findAll = (req, res) => {
    Adresse.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la récupération des adress.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    Adresse.findById(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Adress avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la récupération de l'adress avec l'ID ${id}.`
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
            message: 'Le contenu de la requête ne peut pas être vide.'
        });
    }

    const newAdress = new Adresse({
        numero_rue: req.body.numero_rue,
        nom_rue: req.body.nom_rue,
        ville: req.body.ville,
        codepostal: req.body.codepostal,
        
    });

    Adresse.create(newAdress, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la création de l\'adress.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne peut pas être vide.'
        });
    }

    const id = req.params.id;

    const updated = new Adresse({
        numero_rue: req.body.numero_rue,
        nom_rue: req.body.nom_rue,
        ville: req.body.ville,
        codepostal: req.body.codepostal,
        
    });

    Adresse.update(id, updated, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Adresse avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la mise à jour de l'adresse avec l'ID ${id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Adresse.delete(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Adresse avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la suppression de l'adresse avec l'ID ${id}.`
                });
            }
        } else {
            res.send({ message: 'Adresse supprimé avec succès !' });
        }
    });
};