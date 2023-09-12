import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux'; // Importez le connect pour utiliser le store Redux
import { setConversationParams } from '../store'; // Importez l'action setConversationParams depuis votre store

function ListeMessage({ setShowMessagerie, dispatch }) {
    const [toutlesmessage, setToutlesmessage] = useState([]); 
    const location = useLocation();
    console.log(location);

    useEffect(() => {
        axios.get('http://localhost:3001/toutLesMessage')
        .then((response) => {
            setToutlesmessage(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);
    const discussionsFiltrees = toutlesmessage.filter((discussion) => discussion.utilisateur_id === location.state.userId);


    const handleMessageClick = (message) => {
        const discutionId = message.discution_id;
        const utilisateurId = message.utilisateur_id;
        
        // Utilisez le store Redux pour mettre à jour les valeurs
        dispatch(setConversationParams(discutionId, utilisateurId));

        // Vous pouvez maintenant utiliser setShowMessagerie pour montrer la messagerie
        setShowMessagerie(true);
    };

    return (
        <div className='listemessage'>
        {location.pathname === "/ConnexionUserOk" ?(
        discussionsFiltrees.map((message) => (
            <div
            key={message.utilisateur_id}
            className='messageparclient'
            onClick={() => handleMessageClick(message)}
            >
            <h3>{message.nom_utilisateur}</h3>
            <p>{message.message_text}</p>
            </div>
        ))
        ) : (
        toutlesmessage.map((message) => (
            <div
            key={message.utilisateur_id}
            className='messageparclient'
            onClick={() => handleMessageClick(message)}
            >
            <h3>{message.nom_utilisateur}</h3>
            <p>{message.message_text}</p>
            </div>
        ))
        )}
        
        </div>
    );
}

export default connect()(ListeMessage);
