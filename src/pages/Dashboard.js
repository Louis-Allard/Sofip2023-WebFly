import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar';


const Dashboard = () => {
  const { iduser } = useParams()
  
  console.log(iduser);
    return (
      <Sidebar iduser={iduser}/>
  );
};

export default Dashboard;