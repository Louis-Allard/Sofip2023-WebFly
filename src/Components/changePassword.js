import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";

const ChangePassword = ({ onSubmit }) => {
  return (
    <div>
      <h2>Changer le mot de passe</h2>
      <Formik
        initialValues={{
          AncienPassword: "",
          NouveauPassword: "",
          confirmPassword: "",
        }}
        onSubmit={onSubmit}
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
          <Button type="submit">Changer le mot de passe</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
