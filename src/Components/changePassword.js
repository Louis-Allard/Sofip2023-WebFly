import React, { useState, useEffect, useSelector } from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";
import axios from "axios";

const ChangePassword = () => {
  const userId = useSelector((state) => state.userId);
  // Créez une fonction pour gérer la soumission du formulaire
  const handleSubmit = (values, { setSubmitting }) => {
    values.id = userId;
    // Effectuez la requête Axios pour mettre à jour le mot de passe
    console.log(values);
    axios
      .post("http://localhost:3001/changePassword", values) // Remplacez l'URL par votre endpoint backend
      .then((response) => {
        console.log("Mot de passe changé avec succès");
        // Réinitialisez les champs du formulaire
        setSubmitting(false);
      })
      .catch((error) => {
        console.error("Erreur lors du changement de mot de passe:", error);
        setSubmitting(false);
      });
  };

  // Fonction pour récupérer l'ID de l'utilisateur depuis le backend
  const fetchUserId = async () => {
    try {
      const response = await axios.get("/getUserID"); // Remplacez par votre URL d'endpoint
      const { userId } = response.data; // Assurez-vous de correspondre à la structure de la réponse de votre backend
      setUserId(userId);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'ID de l'utilisateur:",
        error
      );
    }
  };

  // Appelez fetchUserId lorsque le composant est monté (vous pouvez également déclencher cela lorsque vous en avez besoin)
  useEffect(() => {
    fetchUserId();
  }, []);
  return (
    <div>
      <h2>Changer le mot de passe</h2>
      <Formik
        initialValues={{
          AncienPassword: "",
          NouveauPassword: "",
          confirmPassword: "",
          ID: { userId },
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label>Mot de passe actuel :</label>
            <Field
              type="password"
              name="AncienPassword"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Nouveau mot de passe :</label>
            <Field
              type="password"
              name="NouveauPassword"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Confirmer le nouveau mot de passe :</label>
            <Field
              type="password"
              name="confirmPassword"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>id :</label>
            <Field type="password" name="id" className="form-control" />
          </div>
          <Button type="submit">Changer le mot de passe</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
