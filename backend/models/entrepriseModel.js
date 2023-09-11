const sql = require("../db/db.config");

const Entreprise = function (entreprise){
    this.nom = entreprise.nom;
    this.siret = entreprise.siret;
    this.adresse = entreprise.adresse;
}

Entreprise.findAll = (result) => {
    sql.query("SELECT id, nom, siret, adresse FROM entreprises", (err, res) => {
      if (err) {
        console.log("Erreur :", err);
        result(null, err);
        return;
      }
  
      console.log("Entreprises :", res);
      result(null, res);
    });
};

Entreprise.findById = (id, result) => {
    sql.query("SELECT nom, siret, adresse FROM entreprises WHERE id = ?", id, (err, res) => {
        if (err) {
        console.log("Erreur :", err);
        result(err, null);
        return;
        }
        if (res.length) {
        console.log("Entreprise trouvé :", res[0]);
        result(null, res[0]);
        return;
        }
        result({ kind: "not_found" }, null);
    });
};

Entreprise.create = (newEntreprise, result) => {
    sql.query('INSERT INTO entreprises SET ?', newEntreprise, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        console.log('Entreprise créé :', { id: res.insertId, ...newEntreprise });
        result(null, { id: res.insertId, ...newEntreprise });
    });
};

Entreprise.update = (id, entreprise, result) => {
    sql.query(
        'UPDATE adresses SET nom = ? , siret = ?, adresse = ? WHERE id = ?',
        [ entreprise.nom, entreprise.siret, entreprise.adresse, id],
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

            console.log('Entreprise mis à jour :', { id: id, ...entreprise });
            result(null, { id: id, ...entreprise });
        }
    );
};

Entreprise.delete = (id, result) => {
    sql.query('DELETE FROM entreprises WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erreur :', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Entreprise supprimé avec ID :', id);
        result(null, res);
    });
};


module.exports = Entreprise