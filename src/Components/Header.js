import React, { useEffect } from "react";
import image from "../assets/3.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  setConnected,
  setDestinataireTchat,
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
  const navigate = useNavigate();
  const location = useLocation();
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
      dispatch(setDestinataireTchat(''))

      await axios.put(`/deconnexion/${idUser}`);
      // Redirigez l'utilisateur vers la page de connexion
      window.location.href = "/";
    } catch (error) {
      // Gérez les erreurs ici en cas d'échec des opérations asynchrones
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getInvite/${idUser}`);
        const inviteData = response.data;
        console.log(inviteData);

        for (const invite of inviteData) {
          const confirmation = window.confirm(`Vous avez une invitation de : ${invite.PRENOM} ${invite.NOM} à rejoindre la room ${invite.ROOM}`);

          if (confirmation) {
            // Si l'utilisateur clique sur "OK" dans la boîte de dialogue, alors envoyez la demande de suppression.
            const response = await axios.delete(`http://localhost:3001/deleteInvite/${invite.ID_INVITATION}`);
            console.log("Invitation supprimée");

            if (response.data) {
              navigate(`/join/${invite.ROOM}`);
            }

          } else {
            await axios.delete(`http://localhost:3001/deleteInvite/${invite.ID_INVITATION}`);
            console.log("Invitation supprimée");
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération ou suppression de l'invitation", error);
      }
    };

    fetchData();
  }, [idUser, navigate]);

  useEffect(() => {
    const currentUrl = location.pathname;
    console.log(currentUrl);
    const splitUrl = currentUrl.split('/');
    console.log(splitUrl);
    if (splitUrl[1] !== 'join') {
      dispatch(setDestinataireTchat(''));
    }
  }, [location, dispatch]);

  return (
    <div className="Header">
      <div className="div-logo">
        <img src={image} alt="" />
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
          <Link to="/">
            <button className="btn btn-primary">Connexion</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
