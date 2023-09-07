
import React, { useState } from 'react';
import axios from 'axios';
// import { Link } from "react-router-dom";
// import { SHA256 } from 'crypto-js';
import '../scss/_companyreg.scss';

const CompanyRegister = () => {
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [code, setCode] = useState('');
  const [city, setCity] = useState('');
  const [siret, setSiret] = useState('');

  const handleChangeCompanyName = (event) => {
    setCompanyName(event.target.value);
  };

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleChangeStreet = (event) => {
    setStreet(event.target.value);
  };

  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const handleChangeSiret = (event) => {
    setSiret(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Insérer la valeur dans la base de données ici
    const data = {
      v1: companyName,
      v2: address,
      v3: street,
      v4: code,
      v5: city,
      v6: siret
    };
    console.log(data);

    if (data) {
      // Envoyer une requête POST à votre endpoint d'insertion
      axios.post('http://localhost:3001/signup', data)
        .then(response => {
          console.log('Insertion réussie');
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
      <form action="http://localhost:3001/signup" method="post" onSubmit={handleSubmit} className="signup_form">
        <h1>Modification informations entreprise</h1>
        <div className="trivial">
          <div className="element_company">
            <label className='champForm' htmlFor="company">Nom : </label>
            <input className='txtmailpass' type="text" name="fill_company" value={companyName} onChange={handleChangeCompanyName} required />
          </div>

          <div className="element_address">
            <label className='champForm' htmlFor="address">N° : </label>
            <input className='txtmailpass' type="text" name="fill_address" value={address} onChange={handleChangeAddress} required />
          </div>

          <div className="element_street">
            <label className='champForm' htmlFor="street">Voie : </label>
            <input className='txtmailpass' type="text" name="fill_street" value={street} onChange={handleChangeStreet} required />
          </div>

          <div className="element_code">
            <label className='champForm' htmlFor="code">Code Postal : </label>
            <input className='txtmailpass' type="text" name="fill_code" value={code} onChange={handleChangeCode} required />
          </div>

          <div className="element_city">
            <label className='champForm' htmlFor="city">Ville : </label>
            <input className='txtmailpass' type="text" name="fill_city" value={city} onChange={handleChangeCity} required />
          </div>

          <div className="element_siret">
            <label className='champForm' htmlFor="siret">SIRET : </label>
            <input className='txtmailpass' type="text" name="fill_siret" value={siret} onChange={handleChangeSiret} required />
          </div>

          <div className='element_button'>
            <input type="submit" value="Modifier" name="confirm" className="confirm_company" />
            {/* <Link to="/"><Button2 textIn="Retourner à l'accueil" /></Link> */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CompanyRegister;