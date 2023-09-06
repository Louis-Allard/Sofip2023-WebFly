const sql = require("../db/db.config");

const Adresse = function (adresse){
    this.numero_rue = adresse.numero_rue;
    this.nom_rue = adresse.nom_rue;
    this.ville = adresse.ville;
    this.codepostal = adresse.codepostal;
}

Adresse.findAll = result => {
    sql.query('SELECT id, numero_rue, nom_rue, ville, codepostal FROM adresses', (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(null, err);
            return;
        }

        console.log('Adresse :', res);
        result(null, res);
    });
};

Adresse.findById = (id, result) => {
    sql.query('SELECT numero_rue, nom_rue, ville, codepostal FROM adresses WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('Adresse trouvé :', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

Adresse.create = (newAdress, result) => {
    sql.query('INSERT INTO adresses SET ?', newAdress, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        console.log('Adresse créé :', { id: res.insertId, ...newAdress });
        result(null, { id: res.insertId, ...newAdress });
    });
};

Adresse.update = (id, adress, result) => {
    sql.query(
        'UPDATE adresses SET numero_rue = ? , nom_rue = ?, ville = ?, codepostal = ? WHERE id = ?',
        [ adress.numero_rue, adress.nom_rue, adress.ville, adress.codepostal, id],
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

            console.log('Adresse mis à jour :', { id: id, ...adress });
            result(null, { id: id, ...adress });
        }
    );
};

Adresse.delete = (id, result) => {
    sql.query('DELETE FROM adresses WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Adress supprimé avec ID :', id);
        result(null, res);
    });
};


module.exports = Adresse