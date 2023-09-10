import React, { useEffect, useState } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs-react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Register() {
  // INITIALISATION DES VALEURS
  // const role = useSelector((state) => state.role);
  const [mailReg, setMailReg] = useState('');
  const [nomReg, setNomReg] = useState('');
  const [prenomReg, setPrenomReg] = useState('');
  const [entrepriseReg, setEntrepriseReg] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (role !== 'admin') {
  //     navigate('/');
  //   }
  // }, [role, navigate])

  const handleChangePassword = async (e) => {
    const saltRounds = 10; // Nombre de "tours" pour renforcer le hachage
    const hashed = await bcrypt.hash(e.target.value, saltRounds);
    setHashedPassword(hashed);
  }

  const register = (event) => {
    event.preventDefault();
    //console.log(hashedPassword, mailReg, nomReg);
    axios
      .post("http://localhost:3001/register", {
        mail: mailReg,
        nom: nomReg,
        prenom: prenomReg,
        entreprise: entrepriseReg,
        mdp: hashedPassword,
      })
      .then((response) => {
        console.log("Insertion réussie");
        navigate("/");
      })
      .catch((error) => {
        console.error("Erreur lors de l'insertion", error);
      });
  };

  return (
    <section>
      <div className="register-container">
        <h2 className="text-center">Enregistrer un utilisateur</h2>
        <form method="POST" className=" text-center  p-3 " onSubmit={register}>
          <div className="mb-1">
            <label htmlFor="Input" className="form-label">
              Adresse mail
            </label>
            <input
              onChange={(e) => {
                setMailReg(e.target.value);
              }}
              type="mail"
              className="form-control"
              id="mail"
              name="mail"
              autoComplete="off"
            />
          </div>
          <div className="mb-1">
            <label htmlFor="Input" className="form-label">
              Nom
            </label>
            <input
              onChange={(e) => {
                setNomReg(e.target.value);
              }}
              type="text"
              className="form-control"
              id="nom"
              name="nom"
              autoComplete="off"
            />
          </div>
          <div className="mb-1">
            <label htmlFor="Input" className="form-label">
              Prénom
            </label>
            <input
              onChange={(e) => {
                setPrenomReg(e.target.value);
              }}
              type="text"
              className="form-control"
              id="prenom"
              name="prenom"
              autoComplete="off"
            />
          </div>
          <div className="mb-1">
            <label htmlFor="Input" className="form-label">
              Entreprise
            </label>
            <input
              onChange={(e) => {
                setEntrepriseReg(e.target.value);
              }}
              type="text"
              className="form-control"
              id="entreprise"
              name="entreprise"
              autoComplete="off"
            />
          </div>
          <div className="mb-1">
            <label htmlFor="Input" className="form-label">
              Mot de passe
            </label>
            <input
              onChange={handleChangePassword}
              type="password"
              className="form-control"
              id="mdp"
              name="mdp"
              autoComplete="off"
            />
          </div>
          <button
            className="btn btn-success mt-1"
            type="submit"
            value="Confirmer l'inscription"
          >
            Confirmer l'inscription
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
