import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import bcrypt from "bcryptjs-react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {

  const userId = useSelector((state) => state.idUser);
  console.log(userId);
  const [errMdp, setErrMdp] = useState(false);
  const [errConfirm, setErrConfirm] = useState(false);
  const navigate = useNavigate();

  // Créez une fonction pour gérer la soumission du formulaire
  const handleSubmit = async (values, { setSubmitting }) => {
    values.id = userId;

    if (values.NouveauPassword === values.confirmPassword) {
      console.log('Valeurs identiques');
      const saltRounds = 10;

      try {
        // Attendre le hachage du mot de passe
        const hashed = await bcrypt.hash(values.NouveauPassword, saltRounds);
        values.NouveauPassword = hashed;
        console.log(values);

        // Effectuez la requête Axios pour mettre à jour le mot de passe
        await axios.post("http://localhost:3001/changePassword", values); // Remplacez l'URL par votre endpoint backend
        console.log("Mot de passe changé avec succès");

        // Réinitialisez les champs du formulaire
        setSubmitting(false);
        navigate('/profil');
      } catch (error) {
        console.error("Erreur lors du changement de mot de passe:", error);
        setSubmitting(false);
        values.NouveauPassword = '';
        values.confirmPassword = '';
        setErrMdp(true);
      }
    } else {
      console.log('erreur de confirmation');
      setErrConfirm(true);
    }

  };

  return (
    <div>
      <h2>Changer le mot de passe</h2>
      <Formik
        initialValues={{
          AncienPassword: "",
          NouveauPassword: "",
          confirmPassword: "",
          id: userId
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
            <Field type="text" name="id" className="form-control" />
          </div>
          {errMdp && (
            <p className="text-danger">Le mot de passe saisi est incorrect</p>
          )}
          {errConfirm && (
            <p className="text-danger">La confirmation du mot de passe est incorrect</p>
          )}
          <Button type="submit">Changer le mot de passe</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
