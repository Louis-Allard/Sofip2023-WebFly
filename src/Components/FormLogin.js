import axios from 'axios';
import React, { useState } from 'react';
import bcrypt from "bcryptjs-react";
import { useDispatch } from 'react-redux';
import { setConnected } from '../store';
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [dbPassword, setDbPassword] = useState('');
    const [msg, setMsg] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(dbPassword);

    const changeMail = (e) => {
        setMail(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(mail, password);

        const data = {
            dataMail: mail,
            dataPassword: password
        };
        console.log(data);

        if (data) {
            // Envoyer une requête POST à votre endpoint d'insertion
            axios.post('http://localhost:3001/connexion', data)
                .then(response => {
                    // setMail('');
                    // setPassword('');
                    console.log('Réponse de la requête: ', response.data);
                    setDbPassword(response.data);
                    setMsg(false);
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi', error);
                    setMsg(!msg);
                });
        } else {
            console.error('Erreur : valeur non définie');
        }

        const passwordMatch = await bcrypt.compare(password, dbPassword);

        if (passwordMatch) {
            // Authentification réussie
            console.log('Authentification réussie');
            dispatch(setConnected(true));
            navigate('/');
        } else {
            // Authentification échouée
            console.log('Authentification échouée');
            dispatch(setConnected(false));
        }
    }

    return (
        <div className='form-login'>
            <h1 className='text-center'>Connexion</h1>
            <form className='border mt-5 p-3' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Adresse email:</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={mail} onChange={changeMail} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Mot de passe:</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={changePassword} />
                </div>
                {msg && (
                    <p className='msg-erreur'>Identifiants Incorrects</p>
                )}
                <button type="submit" className="btn btn-secondary">Connexion</button>
            </form>
        </div>
    );
};

export default FormLogin;