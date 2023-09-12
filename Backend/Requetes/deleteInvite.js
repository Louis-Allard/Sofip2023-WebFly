const deleteInvite = (app, connection) => {

    app.delete("/deleteInvite/:id", (req, res) => {
        const id = req.params.id;
        const sql = "DELETE FROM invitation WHERE ID_INVITATION = ?";
        connection.query(sql, [id], (err, result) => {
            if (err) {
                console.error("Erreur lors de la suppression de l'invitation' : ", err);
                res.status(500).send("Erreur de suppression");
            } else {
                res.status(200).send(true);
            }
        });
    });

}

module.exports = deleteInvite;