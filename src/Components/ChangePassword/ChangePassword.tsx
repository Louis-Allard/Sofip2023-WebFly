import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import MessagePopup from "../MessagePopup/MessagePopup";

const ChangePassword = () => {
  const [popupMessage, setPopupMessage] = useState();
  const initialValues = {
    id: 1,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/users/password",
        values
      );
      setPopupMessage({ message: response.data.message, color: "green" });
    } catch (error) {
      setPopupMessage({ message: error.response.data.error, color: "red" });
      console.error("Erreur lors de l'appel à l'API:", error);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.currentPassword) {
      errors.currentPassword = "Le mot de passe actuel est requis.";
    }

    if (values.confirmPassword === values.currentPassword) {
      errors.newPassword =
        "Le mot de passe actuel dois être différent du nouveau mot de passe.";
    }

    if (!values.newPassword) {
      errors.newPassword = "Le nouveau mot de passe est requis.";
    } else if (values.newPassword.length < 6) {
      errors.newPassword =
        "Le nouveau mot de passe doit comporter au moins 6 caractères.";
    }

    if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    return errors;
  };

  return (
    <div>
      {popupMessage && (
        <MessagePopup
          message={popupMessage.message}
          onClose={() => setPopupMessage("")}
          color={popupMessage.color}
        />
      )}
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="currentPassword" className="font-semibold">
              Mot de passe actuel
            </label>
            <Field
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="border text-black rounded-md px-3 py-2 w-full"
            />
            <ErrorMessage
              name="currentPassword"
              component="div"
              className="text-red-500"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="font-semibold">
              Nouveau mot de passe
            </label>
            <Field
              type="password"
              id="newPassword"
              name="newPassword"
              className="border text-black rounded-md px-3 py-2 w-full"
            />
            <ErrorMessage
              name="newPassword"
              component="div"
              className="text-red-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="font-semibold">
              Confirmer le nouveau mot de passe
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="border text-black rounded-md px-3 py-2 w-full"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Changer le mot de passe
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
