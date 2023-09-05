import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import MessagePopup from "../MessagePopup/MessagePopup";

const Login = () => {
  const [popupMessage, setPopupMessage] = useState();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState(false);
  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  axios.defaults.withCredentials = true;
  const [userData, setUserData] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users`);
        setUserData(response.data);
        setIsAuth(true);
      } catch (error) {
        setUserData(null);
        setIsAuth(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login",
        values
      );
      setPopupMessage({ message: response.data.message, color: "green" });
      console.log("Login response:", response.data);
    } catch (error) {
      setShowMessage(true);
      setPopupMessage({ message: error.response.data.error, color: "red" });
      console.error("Login error:", error.response.data);
    }
  };

  const validate = (values: any) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Le mot de passe est requis.";
    }

    return errors;
  };
  return (
    <div
      className={`min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8`}
    >
      {showMessage && (
        <MessagePopup
          message={popupMessage.message}
          onClose={handleCloseMessage}
          color={"green"}
        />
      )}
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold `}>
            Connexion à votre compte
          </h2>
        </div>
        <Formik
          initialValues={formData}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="username"
                className={`block text-sm font-medium `}
              >
                Adresse e-mail
              </label>
              <Field
                type="text"
                name="username"
                autoComplete="username"
                required
                className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium `}
              >
                Mot de passe
              </label>
              <Field
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Se connecter
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
