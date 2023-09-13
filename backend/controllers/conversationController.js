const Conversation = require('../models/conversationModel')

exports.findAll = (req, res) => {
    Conversation.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la récupération des conversations.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    Conversation.findById(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Conversation avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la récupération de la conversation avec l'ID ${id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.findByClient = (req, res) => {
    const client = req.params.client;

    Conversation.findByClient(client, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Conversation avec le client ${client} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la récupération de la conversation avec le client ${client}.`
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

    const newConversation = new Conversation({
        cm: req.body.cm,
        client: req.body.client,
        
    });

    Conversation.create(newConversation, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Une erreur s\'est produite lors de la création de la conversation.'
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

    const updated = new Conversation({
        cm: req.body.cm,
        client: req.body.client,
        
    });

    Conversation.update(id, updated, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Conversation avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la mise à jour de la conversation avec l'ID ${id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Conversation.delete(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Conversation avec l'ID ${id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Erreur lors de la suppression de la conversation avec l'ID ${id}.`
                });
            }
        } else {
            res.send({ message: 'Conversation supprimé avec succès !' });
        }
    });
};