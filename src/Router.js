import React from "react";
import { Route, Routes } from "react-router-dom";
import home from "./Components/Home";
import Header from "./Components/Header";
import login from "./main/login";
import profil from "./main/profil";
import editprofil from "./Components/EditProfil";
import ChangePassword from "./Components/changePassword";

const Router = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" Component={home} />
        <Route path="/login" Component={login} />
        <Route path="/profil" Component={profil} />
        <Route path="/editprofil" Component={editprofil} />
        <Route path="/changePassword" Component={ChangePassword} />
      </Routes>
    </div>
  );
};

export default Router;
