import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
const EditProfile = ({ onSubmit }) => {
  const [data, setData] = useState("");
  useEffect(() => {
    axios

      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
    console.log();
  }, []);
  return (
    <div>
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
          <Button type="submit">Enregistrer</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProfile;
