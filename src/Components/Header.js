import React from "react";
import image from "../assets/3.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setConnected,
  setEntreprise,
  setIdUser,
  setNom,
  setPrenom,
  setRole,
} from "../store";
import axios from "axios";
import CardHeader from "./CardHeader";

const Header = () => {
  const connected = useSelector((state) => state.connected);
  const idUser = useSelector((state) => state.idUser);
  const dispatch = useDispatch();
  console.log(connected);

  const disconnect = async () => {
    // Effectuez des opérations asynchrones ici
    try {
      dispatch(setConnected(false));
      dispatch(setIdUser(0));
      dispatch(setEntreprise(""));
      dispatch(setNom(""));
      dispatch(setPrenom(""));
      dispatch(setRole(""));

      await axios.put(`/deconnexion/${idUser}`);
      // Redirigez l'utilisateur vers la page de connexion
      window.location.href = "/login";
    } catch (error) {
      // Gérez les erreurs ici en cas d'échec des opérations asynchrones
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div className="Header">
      <div className="div-logo">
        <img src={image} alt="" />
        <h1>WebFly</h1>
      </div>
      <div className="card-header">
        <CardHeader />
      </div>
      <div className="connexion">
        {connected ? (
          <Link to="/">
            <button className="btn btn-danger" onClick={disconnect}>
              Déconnexion
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary">Connexion</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
