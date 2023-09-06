import React,{useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

function Ajouter_utilisateur() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");

    const initialValues = {
        nom: "", // Correction : Utiliser "nom" au lieu de "nomtma"
        email: "",
        password: "",
        repeatPassword: "",
    };

    const validationSchema = Yup.object({
        nom: Yup.string() // Correction : Utiliser "nom" au lieu de "nomtma"
            .min(2, "Le nom doit avoir plus de 2 caractères")
            .max(30, "Le nom doit faire moins de 30 caractères")
            .required("Champ requis"),
        email: Yup.string()
            .email("Adresse email non valide")
            .min(5, "L'email doit avoir plus de 5 caractères")
            .max(100, "L'email doit faire moins de 100 caractères")
            .required("Champ requis"),
        password: Yup.string()
            .min(6, "Le mot de passe doit avoir plus de 6 caractères")
            .max(100, "Le mot de passe doit faire moins de 100 caractères")
            .matches(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]/,
                "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial (!@#$%^&*-)."
            )
            .required("Champ requis"),
        repeatPassword: Yup.string()
            .oneOf(
                [Yup.ref("password"), null],
                "Les mots de passe doivent être identiques"
            )
            .required("Champ requis"),
    });

    const handleSubmit = async (values) => {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(values.password, saltRounds);

            const response = await axios.post(
                "http://localhost:3001/ajouterUtilisateur",
                { nom: values.nom, email: values.email, password: hashedPassword }
            );
            
            const { success } = response.data;
            
            if (success) {
                setSuccessMessage("la TMA a bien été ajouter")
            } else {
                setSuccessMessage("")
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>

            <h2>Inscription</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="nom">Nom:</label>
                        <Field type="text" id="nom" name="nom" />
                        <ErrorMessage
                            name="nom"
                            component="div"
                            className="error"
                            style={{ color: "red" }}
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="error"
                            style={{ color: "red" }}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Mot de passe:</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="error"
                            style={{ color: "red" }}
                        />
                    </div>

                    <div>
                        <label htmlFor="repeatPassword">Répéter le mot de passe:</label>
                        <Field
                            type="password"
                            id="repeatPassword"
                            name="repeatPassword"
                        />
                        <ErrorMessage
                            name="repeatPassword"
                            component="div"
                            className="error"
                            style={{ color: "red" }}
                        />
                    </div>

                    <button type="submit">S'inscrire</button>
                </Form>
            </Formik>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}

export default Ajouter_utilisateur;
