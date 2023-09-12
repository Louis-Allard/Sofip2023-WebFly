import React, { useState } from 'react';
import axios from 'axios';
import '../scss/_companyreg.scss';

const CompanyRegister = () => {
  const [companyName, setCompanyName] = useState('');
  const [siret, setSiret] = useState('');
  const [address, setAddress] = useState({
    id: 0,
    numero_rue: "",
    nom_rue: "",
    ville: "",
    codepostal: ""
  });

  const handleChangeCompanyName = (event) => {
    setCompanyName(event.target.value);
  };

  const handleChangeSiret = (event) => {
    setSiret(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Envoyer une requête POST à votre endpoint d'insertion
    postAdresse()
  }

  function postAdresse(callback){
    axios.post('http://localhost:3001/adresses/adresse', address)
      .then((res) => {
        console.log('Insertion réussie');
        let update = {id: res.data.id}
        console.log("update :" , update)
        setAddress(address => ({...address, ...update}))
        console.log("adresse " , address);
        postEntreprise()
      })
      .catch((error) => {
        console.error('Erreur lors de l\'insertion', error);
      });
      
  }

  function postEntreprise(){
    
    const data = {
      nom: companyName,
      siret: siret,
      adresse: address
    };
    console.log(data);

      // Envoyer une requête POST à votre endpoint d'insertion
    axios.post('http://localhost:3001/entreprises/entreprise', data)
      .then(response => {
        console.log('Insertion réussie');
      })
      .catch(error => {
        console.error('Erreur lors de l\'insertion', error);
      });
  }

  return (
    <div className="signup">
      <form method="post" onSubmit={handleSubmit} className="signup_form">
        <h1>Saisie des informations de l'entreprise</h1>
        <div className="trivial">
          <div className="element_company">
            <label className='champForm' htmlFor="company">Nom : </label>
            <input className='txtmailpass' type="text" name="fill_company" value={companyName} onChange={handleChangeCompanyName} />
          </div>

          <div className="element_address">
            <label className='champForm' htmlFor="address">N° : </label>
            <input className='txtmailpass' type="text" name="fill_address" onChange={(e) => setAddress({ ...address, numero_rue: e.target.value })} />
          </div>

          <div className="element_street">
            <label className='champForm' htmlFor="street">Voie : </label>
            <input className='txtmailpass' type="text" name="fill_street" onChange={(e) => setAddress({ ...address, nom_rue: e.target.value })} />
          </div>

          <div className="element_code">
            <label className='champForm' htmlFor="code">Code Postal : </label>
            <input className='txtmailpass' type="text" name="fill_code" onChange={(e) => setAddress({ ...address, codepostal: e.target.value })} />
          </div>

          <div className="element_city">
            <label className='champForm' htmlFor="city">Ville : </label>
            <input className='txtmailpass' type="text" name="fill_city" onChange={(e) => setAddress({ ...address, ville: e.target.value })} />
          </div>

          <div className="element_siret">
            <label className='champForm' htmlFor="siret">SIRET : </label>
            <input className='txtmailpass' type="text" name="fill_siret" value={siret} onChange={handleChangeSiret} />
          </div>

          <div className='element_button'>
            <input type="submit" value="Confirmer" name="confirm" className="confirm_company" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CompanyRegister;