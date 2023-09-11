const Entreprise = require('../models/entrepriseModel')

exports.findAll = (req, res) => {
    Entreprise.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la récupération des entreprises.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    Entreprise.findById(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Adress avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la récupération de l'entreprise avec l'ID ${id}.`
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

    const newEntreprise = new Entreprise({
        nom: req.body.nom,
        siret: req.body.siret,
        adresse: req.body.adresse
        
    });

    Entreprise.create(newEntreprise, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la création de l\'entreprise.'
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

    const updated = new Entreprise({
        nom: req.body.nom,
        siret: req.body.siret,
        adresse: req.body.adresse
        
    });

    Entreprise.update(id, updated, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `l'entreprise avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la mise à jour de l'entreprise avec l'ID ${id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Entreprise.delete(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Entreprise avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la suppression de l'entreprise avec l'ID ${id}.`
                });
            }
        } else {
            res.send({ message: 'Entreprise supprimé avec succès !' });
        }
    });
};