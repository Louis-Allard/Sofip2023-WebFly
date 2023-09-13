import React from 'react';
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const { iduser } = useParams()

    return (
      <Sidebar iduser={iduser}/>
  );
};

export default Dashboard;