import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../scss/_login.scss';
const LogIn = () => {

  // const navigate = useNavigate();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [msgPassword, setMsgPassword] = useState('');


  const handleChangeMail = (event) => {
    setMail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(mail);
    console.log(password);


    // Insérer la valeur dans la base de données ici
    const data2 = {
      vMail: mail,
    };
    console.log(data2);

    if (data2) {
      // Envoyer une requête POST à votre endpoint d'insertion
      axios.post('http://localhost:3001/auth', data2)
        .then(response => {
          setMail('');
          setPassword('');
          console.log('Réponse de la requête: ', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.userID);
          setMsgPassword(response.data.message);
          // navigate('/');
        })
        .catch(error => {
          console.error('Erreur lors de l\'envoi', error);
          setMsgPassword('Mot de passe Incorrect');
        });
    } else {
      console.error('Erreur : valeur non définie');
    }

  };

  return (

    <div className="login">
      <form action="/login" method='post' onSubmit={handleSubmit} className="login_form">
        <h1 className='TitreLogin'>Connection</h1>
        <label className='champForm' htmlFor="lastname">E-mail : </label>
        <input className="champCox" name='Mail' value={mail} onChange={handleChangeMail} placeholder='E-mail' />

        <label className='champForm' htmlFor="firstname">Mot de passe : </label>
        <input className="champCox" type="password" name='mdp' value={password} onChange={handleChangePassword} placeholder='Mot de passe' />
        <p>{msgPassword}</p>
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
