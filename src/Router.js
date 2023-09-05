import React from 'react';
import { Route, Routes } from 'react-router-dom';
import home from './Components/main/home';
import register from './Components/main/register';


const Router = () => {
  return (
    <div>
      <Routes>
        <Route path='/' Component={home} />
        <Route path='/register' Component={register} />
      </Routes>
    </div>
  );
};

export default Router;