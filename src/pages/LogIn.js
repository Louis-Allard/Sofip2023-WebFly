import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../scss/_login.scss';

const LogIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [iduser, setIdUser] = useState();

  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/users/login", values)
      .then((res) => {
        console.log(res.data)
        if (res.data.Status === "Success") {
          navigate(`/dashboard/${res.data.id}`);
          window.location.reload();
          
          
        } else {
          console.log(res.data);
          alert(res.data.error);
        }
      })
      .then((err) => console.log(err));

  };

  return (

    <div className="login">
      <form action="/login" method='post' onSubmit={handleSubmit} className="login_form">
        <h1 className='TitreLogin'>Connection</h1>
        <label className='champForm' htmlFor="lastname">E-mail : </label>
        <input className="champCox" name='Mail' onChange={(e) => setValues({...values, email: e.target.value})} placeholder='E-mail' />

        <label className='champForm' htmlFor="firstname">Mot de passe : </label>
        <input className="champCox" type="password" name='mdp' onChange={(e) => setValues({...values, password: e.target.value})} placeholder='Mot de passe' />
        <div className='placeBtn'>
          <button type='submit' className='forgotten'>Mot de passe oublié</button>
          <button type='submit' className='confirm'>Connection</button>
          {/* <Link to="/"><Button2 textIn="Retourner à l'accueil" /></Link> */}
        </div>
      </form>
    </div>
  );
};

export default LogIn;
