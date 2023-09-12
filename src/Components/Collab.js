import React, { useEffect, useState } from 'react';
import etat from '../assets/icons/etat.png';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setDestinataireTchat } from '../store';

const Collab = () => {

    const entreprise = useSelector((state) => state.entreprise);
    const idUser = useSelector((state) => state.idUser);
    const [data, setData] = useState('');
    const [destinataire, setDestinataire] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:3001/users/${entreprise}/${idUser}`)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des utilisateurs depuis le frontend :",
                    error
                );
            });
    }, [entreprise, idUser])

    const changeDest = (prenom, nom, id) => {
        setDestinataire(prenom + ' ' + nom);
        dispatch(setDestinataireTchat(id));
    }

    return (
        <div className='collab'>
            <div className='interlocuteur'>
                <p>{destinataire}</p>
            </div>
            <div className='listCollab text-center'>
                <h4 className='text-center titreCollab'>Collaborateurs</h4>
                {data && data.map((item, index) => (
                    <p className='pointer' onClick={() => changeDest(item.PRENOM, item.NOM, item.ID_UTILISATEUR)} key={index}>{item.PRENOM} {item.NOM}<img className={`ms-2 ${item.ETAT === 'En Ligne' ? 'online' : 'offline'}`} src={etat} alt='etat' /></p>
                ))}
            </div>
        </div>
    );
};

export default Collab;