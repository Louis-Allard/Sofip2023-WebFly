import React from 'react';
import { Route, Routes } from 'react-router-dom';
import home from './main/home';
import Header from './Components/Header';
import login from './main/login';
import register from './main/register';


const Router = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' Component={home} />
        <Route path='/login' Component={login} />
        <Route path='/register' Component={register} />
      </Routes>
    </div>
  );
};

export default Router;