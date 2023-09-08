
import React, { useState } from 'react';
import axios from 'axios';
// import { SHA256 } from 'crypto-js';
import '../scss/_personreg.scss';

const PersonRegister = () => {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  // const [selectedValue, setSelectedValue] = useState('');

  const handleChangeLastname = (event) => {
    setLastname(event.target.value);
  };

  const handleChangeFirstname = (event) => {
    setFirstname(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  // const handleSelectChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Insérer la valeur dans la base de données ici
    const data = {
      v1: lastname,
      v2: firstname,
      v3: password,
      v4: passwordConfirm,
      v5: email,
      // v6: selectedValue
    };
    console.log(data);

    if (data) {
      // Envoyer une requête POST à votre endpoint d'insertion
      axios.post('http://localhost:3001/signup', data)
        .then(response => {
          console.log('Insertion réussie');
          setPassword('');
        })
        .catch(error => {
          console.error('Erreur lors de l\'insertion', error);
        });
    } else {
      console.error('Erreur : valeur non définie');
    }
  };

  return (
    <div className="signup">
      <form action="http://localhost:3001/signup" method="post" onSubmit={handleSubmit} className="signup_form_pers">
        <h1>Modification informations contact</h1>
        <div className="trivial_pers">
          <div className="element_lastname">
            <label className='champForm' htmlFor="lastname">Nom : </label>
            <input className='txtmailpass' type="text" name="fill_lastname" value={lastname} onChange={handleChangeLastname} required />
          </div>

          <div className="element_firstname">
            <label className='champForm' htmlFor="firstname">Prénom : </label>
            <input className='txtmailpass' type="text" name="fill_firstname" value={firstname} onChange={handleChangeFirstname} required />
          </div>

          <div className="element_email">
            <label className='champForm' htmlFor="email">Adresse e-mail : </label>
            <input className='txtmailpass' type="text" name="fill_email" value={email} onChange={handleChangeEmail} required />
          </div>

          <div className="element_password">
            <label className='champForm' htmlFor="password">Mot de passe : </label>
            <input className='txtmailpass' type="text" name="fill_password" value={password} onChange={handleChangePassword} required />
          </div>

          <div className="element_confirm">
            <label className='champForm' htmlFor="password">Confirmation : </label>
            <input className='txtmailpass' type="text" name="confirm_password" value={passwordConfirm} onChange={handleChangePasswordConfirm} required />
          </div>

          <div className="element_company">
            <label className='champForm' htmlFor="levelStudy">Entreprise : </label>
            <select className='txtmailpass' value="{selectedValue}" onChange="{handleSelectChange}">
              <option value="">1</option>
              {/* {dataStudy && dataStudy.map((option) => (
                <option key={option.ID_LEVELSTUDY} value={option.ID_LEVELSTUDY}>
                  {option.WORDING_LEVELSTUDY}
                </option>
              ))} */}
            </select>
          </div>

          <div className="element_button">
            <input type="submit" value="Modifier" name="confirm" className="confirm" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default PersonRegister;

