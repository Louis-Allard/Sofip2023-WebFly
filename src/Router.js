import React from 'react';
import { Route, Routes } from 'react-router-dom';
import home from './Components/main/home';
import Header from './Components/Header';


const Router = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' Component={home} />
      </Routes>
    </div>
  );
};

export default Router;