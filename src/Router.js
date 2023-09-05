import React from 'react';
import { Route, Routes } from 'react-router-dom';
import home from './main/home';
import Header from './Components/Header';
import login from './main/login';


const Router = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' Component={home} />
        <Route path='/login' Component={login} />
      </Routes>
    </div>
  );
};

export default Router;