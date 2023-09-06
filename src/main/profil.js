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
    <div>
      <h2>Profil de l'utilisateur</h2>
      <p>Nom : {data.NOM}</p>
      <p>Prénom : {data.PRENOM}</p>
      <p>Adresse e-mail : {data.EMAIL}</p>
      <p>Entreprise : {data.ENTREPRISE}</p>
      <Link to="/EditProfil">
        <button className="editProfilButton">Modif profil</button>
      </Link>
    </div>
  );
};

export default Profil;
