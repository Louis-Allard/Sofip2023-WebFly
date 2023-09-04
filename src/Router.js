import React from 'react';
import { Route, Routes } from 'react-router-dom';
import home from './Components/main/home';


const Router = () => {
  return (
    <div>
      <Routes>
        <Route path='/' Component={home} />
      </Routes>
    </div>
  );
};

export default Router;