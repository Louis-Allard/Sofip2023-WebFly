import register from "./main/register";
import React from "react";
import { Route, Routes } from "react-router-dom";
// import home from "./Components/Home";
import Header from "./Components/Header";
import login from "./main/login";
import profil from "./main/profil";
import editprofil from "./Components/EditProfil";
import ChangePassword from "./Components/changePassword";
import reset from "./main/reset";
import Join from "./main/join";
import UserList from "./Components/crud/UserList";
import Agenda from "./Components/Agenda";
import homeadmin from "./main/homeadmin";

const Router = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" Component={login} />
        <Route path="/register" Component={register} />
        <Route path="/profil" Component={profil} />
        <Route path="/editprofil" Component={editprofil} />
        <Route path="/changePassword" Component={ChangePassword} />
        <Route path="/join/:room" Component={Join} />
        <Route path="/reset/:token" Component={reset} />
        <Route path="/userlist" Component={UserList} />
        <Route path="/agenda" Component={Agenda} />
        <Route path="/home-admin" Component={homeadmin} />

      </Routes>
    </div>
  );
};

export default Router;
