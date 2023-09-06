import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import MessagePopup from "../MessagePopup/MessagePopup";
import axios from "axios";
import TabItem from "../Tabitem/TabItem";

const Profil = ({ id, activeTab, onTabChange }) => {
  const initialValues = {
    firstname: "",
    lastname: "",
    phone: "",
  };

  const [popupMessage, setPopupMessage] = useState();
  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const response = await axios.put(
        `http://localhost:3001/users/user/${id}`,
        {
          firstname: values.firstname,
          lastname: values.lastname,
          phone: values.phone,
        }
      );
      setPopupMessage({ message: response.data.message, color: "green" });
    } catch (error) {
      setPopupMessage({ message: error.response.data.error, color: "red" });
      console.error("Erreur lors de l'appel à l'API:", error);
    }
  };
  const validate = (values) => {
    const errors = {};

    if (!values.firstname) {
      errors.firstname = "Le prénom est requis.";
    }

    if (!values.lastname) {
      errors.lastname = "Le nom est requis.";
    }

    if (!values.phone) {
      errors.phone = "Le numéro de téléphone est requis.";
    } else if (!/^[0-9]{10}$/.test(values.phone)) {
      errors.phone = "Le numéro de téléphone est incorrect.";
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
        enableReinitialize
        onSubmit={handleSubmit}
        validate={validate}
      >
        <Form>
          <div>
            <label htmlFor="firstname" className="font-semibold">
              Prénom
            </label>
            <Field
              type="text"
              id="firstname"
              name="firstname"
              className="border text-black rounded-md px-3 py-2 w-full"
            />
            <ErrorMessage
              name="firstname"
              component="div"
              className="text-red-500"
            />
          </div>

          <div>
            <label htmlFor="lastname" className="font-semibold">
              Nom
            </label>
            <Field
              type="text"
              id="lastname"
              name="lastname"
              className="border text-black rounded-md px-3 py-2 w-full"
            />
            <ErrorMessage
              name="lastname"
              component="div"
              className="text-red-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              value={""}
              readOnly
              className="border text-black rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="username" className="font-semibold">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={""}
              readOnly
              className="border text-black rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="phone" className="font-semibold">
              Numéro de téléphone
            </label>
            <Field
              type="tel"
              id="phone"
              name="phone"
              className="border text-black rounded-md px-3 py-2 w-full"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Enregistrer
          </button>
        </Form>
      </Formik>
      <TabItem
        label="Mon mot de passe"
        isActive={activeTab === "password"}
        onClick={() => onTabChange("password")}
      />
    </div>
  );
};

export default Profil;
