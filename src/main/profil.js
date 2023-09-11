import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profil = () => {
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

  return (
    <div className="modifPro-container">
      <h2>Profil de l'utilisateur</h2>
      <div className="containerProf">
        <p>
          Nom : <span className="span">{data.NOM}</span>
        </p>
        <p>
          Prénom : <span className="span">{data.PRENOM}</span>
        </p>
        <p>
          Adresse e-mail : <span className="span">{data.EMAIL}</span>
        </p>
        <p>
          Entreprise : <span className="span">{data.ENTREPRISE}</span>
        </p>
        <Link to="/EditProfil">
          <button className="btn btn-outline-success">Modif profil</button>
        </Link>
        <Link to="/changePassword">
          <button className="btn btn-outline-primary">Modif password</button>
        </Link>
      </div>
    </div>
  );
};

export default Profil;
