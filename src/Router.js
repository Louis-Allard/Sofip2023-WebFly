import register from './main/register';
import React from "react";
import { Route, Routes } from "react-router-dom";
// import home from "./Components/Home";
import Header from "./Components/Header";
import login from "./main/login";
import profil from "./main/profil";
import editprofil from "./Components/EditProfil";
import ChangePassword from "./Components/changePassword";
import chat from './main/chat';

const Router = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' Component={login} />
        {/* <Route path='/home' Component={home} /> */}
        <Route path='/register' Component={register} />
        <Route path="/profil" Component={profil} />
        <Route path="/editprofil" Component={editprofil} />
        <Route path="/changePassword" Component={ChangePassword} />
        <Route path="/chat" Component={chat}/>
      </Routes>
    </div>
  );
};

export default Router;
