import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const id = useSelector((state) => state.idUser);
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3001/profil/${id}`) // Remplacez "123" par l'ID de l'offre souhaitée
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
    console.log(id);
  }, [id]);

  const history = useNavigate();
  const onSubmit = (values) => {
    axios
      .put(`http://localhost:3001/profil/utilisateur/${id}`, values) // Remplacez "id" par l'ID de l'utilisateur actuel
      .then((response) => {
        console.log("Données mises à jour avec succès");
        history("/profil");
        // Vous pouvez également mettre à jour les données localement dans le state si nécessaire
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des données:", error);
      });
  };
  return (
    <div className="editProfil">
      <h2>Modifier le profil</h2>
      <Formik
        initialValues={{
          nom: data.NOM,
          prenom: data.PRENOM,
          email: data.EMAIL,
          entreprise: data.ENTREPRISE,
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="form-group">
            <label>Nom :</label>
            <Field type="text" name="NOM" className="form-control" />
          </div>
          <div className="form-group">
            <label>Prénom :</label>
            <Field type="text" name="PRENOM" className="form-control" />
          </div>
          <div className="form-group">
            <label>Adresse e-mail :</label>
            <Field type="email" name="EMAIL" className="form-control" />
          </div>
          <div className="form-group">
            <label>Entreprise :</label>
            <Field type="text" name="ENTREPRISE" className="form-control" />
          </div>
          <Button type="submit" onClick={onSubmit}>
            Enregistrer
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProfile;
