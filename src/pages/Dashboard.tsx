import React from 'react';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { iduser } = useParams
  
    return (
        <Sidebar iduser={iduser}/>
  );
};

export default Dashboard;