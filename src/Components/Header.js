import React from "react";
// import '../assets/styles/_Header.scss';
import image from "../assets/1.png";
import { useSelector } from "react-redux";

const Header = () => {
  const connected = useSelector((state) => state.connected);
  console.log(connected);
  return (
    <div className="Header">
      <div className="div-logo">
        <img src={image} alt="" />
      </div>
      <div className="connexion">
        {connected ? (
          <button className="btn btn-danger">Déconnexion</button>
        ) : (
          <button className="btn btn-primary">Connexion</button>
        )}
      </div>
    </div>
  );
};

export default Header;
