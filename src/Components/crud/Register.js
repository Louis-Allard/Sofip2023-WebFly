import React, { useState } from "react";
import axios from 'axios';

function Register() {
      // INITIALISATION DES VALEURS
      const [mailReg, setMailReg] = useState('');
      const [nomReg, setNomReg] = useState('');
      const [prenomReg, setPrenomReg] = useState('');
      const [entrepriseReg, setEntrepriseReg] = useState('');
      const [motdepasseReg, setMotdepasseReg] = useState('');
  
      const register = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/register', 
        {mail: mailReg, nom: nomReg, prenom: prenomReg, entreprise: entrepriseReg, motdepasse: motdepasseReg})
        .then(res => console.log("c'est good"))
        .catch(err => console.log(err))
    }
    return (
        <section>
            <div className='border border-dark'>
                <h1>HEADER</h1>
            </div>
            <div className='register'>
                <h3 className='text-center'>Enregistrer un utilisateur</h3>
                <form method="POST" className="formRegister text-center border border-dark p-3 rounded">
                    <div className="mb-1">
                        <label htmlFor="Input" className="form-label">Adresse mail</label>
                        <input onChange={(e) => {setMailReg(e.target.value);}} type="mail" className="form-control" id="mail" name="mail" autoComplete="off"/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="Input" className="form-label">Nom</label>
                        <input onChange={(e) => {setNomReg(e.target.value);}} type="text" className="form-control" id="nom" name="nom" autoComplete="off"/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="Input" className="form-label">Prénom</label>
                        <input onChange={(e) => {setPrenomReg(e.target.value);}} type="text" className="form-control" id="prenom" name="prenom" autoComplete="off"/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="Input" className="form-label">Entreprise</label>
                        <input onChange={(e) => {setEntrepriseReg(e.target.value);}} type="text" className="form-control" id="entreprise" name="entreprise" autoComplete="off"/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="Input" className="form-label">Mot de passe</label>
                        <input onChange={(e) => {setMotdepasseReg(e.target.value);}} type="password" className="form-control" id="motdepasse" name="motdepasse" autoComplete="off"/>
                    </div>
                    <button onClick={register} className="btn btn-dark mt-1" type="submit" value="Confirmer l'inscription">Confirmer l'inscription</button>
                </form>
            </div>
        </section>
    );
};

export default Register;