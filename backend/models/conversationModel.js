const sql = require("../db/db.config");

const Conversation = function (conversation){
    this.cm = conversation.cm;
    this.client = conversation.client;
}

Conversation.findAll = result => {
    sql.query('SELECT id, cm, client FROM conversations', (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(null, err);
            return;
        }

        console.log('Conversation :', res);
        result(null, res);
    });
};

Conversation.findById = (id, result) => {
    sql.query('SELECT cm, client FROM conversations WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('Conversation trouvé :', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

Conversation.findByClient = (client, result) => {
    sql.query('SELECT id, cm FROM conversations WHERE client = ?', client, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('Conversation trouvé :', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
}

Conversation.create = (newConversation, result) => {
    sql.query('INSERT INTO conversations SET ?', newConversation, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        console.log('Conversation créé :', { id: res.insertId, ...newConversation });
        result(null, { id: res.insertId, ...newConversation });
    });
};

Conversation.update = (id, conversation, result) => {
    sql.query(
        'UPDATE conversations SET cm = ? , client = ? WHERE id = ?',
        [ conversation.cm, conversation.client, id],
        (err, res) => {
            if (err) {
                console.log('Erreur :', err);
                result(err, null);
                return;
            }

            if (res.affectedRows === 0) {
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('Conversation mis à jour :', { id: id, ...conversation });
            result(null, { id: id, ...conversation });
        }
    );
};

Conversation.delete = (id, result) => {
    sql.query('DELETE FROM conversations WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Conversation supprimé avec ID :', id);
        result(null, res);
    });
};


module.exports = Conversation