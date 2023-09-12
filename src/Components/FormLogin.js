import axios from "axios";
import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs-react";
import { useDispatch, useSelector } from "react-redux";
import {
    setConnected,
    setEntreprise,
    setIdUser,
    setNom,
    setPrenom,
    setRole,
} from "../store";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
    const connected = useSelector((state) => state.connected);
    const [mail2, setMail2] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [errMail, setErrMail] = useState(false);

    useEffect(() => {
        if (connected) {
            navigate("/join");
        }
    }, [connected, navigate]);

    const changeMail = (e) => {
        setMail(e.target.value);
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(mail, password);

        const data = {
            dataMail: mail,
            dataPassword: password,
        };
        //console.log(data);

        if (data) {
            try {
                const response = await axios.post(
                    "http://localhost:3001/connexion",
                    data
                );
                console.log("Réponse de la requête: ", response.data);
                console.log(response.data[0].MDP);
                console.log(password);

                const passwordMatch = await bcrypt.compare(
                    password,
                    response.data[0].MDP
                );
                console.log(passwordMatch);

                if (passwordMatch) {
                    // Authentification réussie
                    console.log("Authentification réussie");
                    dispatch(setConnected(true));
                    dispatch(setIdUser(response.data[0].ID_UTILISATEUR));
                    dispatch(setEntreprise(response.data[0].ENTREPRISE));
                    dispatch(setNom(response.data[0].NOM));
                    dispatch(setPrenom(response.data[0].PRENOM));
                    dispatch(setRole(response.data[0].ROLE_UTILISATEUR));
                    const connexion = await axios.put(
                        `http://localhost:3001/connexion/${response.data[0].ID_UTILISATEUR}`
                    );
                    console.log(connexion.data);
                    navigate("/join");
                } else {
                    // Authentification échouée
                    console.log("Authentification échouée");
                    dispatch(setConnected(false));
                    setMsg(true);
                }
            } catch (error) {
                console.error("Erreur lors de l'envoi", error);
                setMsg(!msg);
            }
        } else {
            console.error("Erreur : valeur non définie");
        }
    };

    const submitMail = async (e) => {
        e.preventDefault();
        console.log(mail2);
        const data = {
            dataMail: mail2
        };
        //console.log(data);

        if (data) {
            try {
                const response = await axios.post('http://localhost:3001/checkEmail', data);
                console.log(response.data);
                const id = response.data;

                if (response.data === false) {
                    setErrMail(true);
                } else {
                    setErrMail(false);
                    const response2 = await axios.put(`http://localhost:3001/createToken/${id}`)
                    console.log(response2.data);
                    const token = response2.data.token;

                    const response3 = await axios.post(`http://localhost:3001/mail`, { mail2, token })
                    console.log(response3.data);
                }

            } catch (error) {
                console.error('Erreur lors de l\'envoi', error);
            }
        } else {
            console.error('Erreur : valeur non définie');
        }
    }

    return (
        <div className='form-login'>
            <div className="login-container">
                <h1 className='text-center'>Connexion</h1>
                <form className='mt-5 p-3 form-connexion' onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary mb-2">Connexion</button><br />
                </form>
                <button className="btn btn-secondary mb-3" onClick={() => { setModal(true) }}>mot de passe oublié?</button>

                {modal && (
                    <div className="page-shadow">
                        <div className='modal-reset border text-center rounded'>
                            <span onClick={() => { setModal(false) }} className="material-symbols-outlined close">
                                close
                            </span>
                            <form action="" onSubmit={submitMail}>
                                <label htmlFor="inputmail" className="form-label">Adresse mail:</label>
                                <input type="email" className="form-control mb-3" id="inputmail" onChange={(e) => { setMail2(e.target.value) }} />
                                {errMail && (
                                    <p className="text-danger">Adresse mail Inconnue</p>
                                )}
                                <button type="submit" className="btn btn-secondary mb-2">envoyer</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormLogin;
