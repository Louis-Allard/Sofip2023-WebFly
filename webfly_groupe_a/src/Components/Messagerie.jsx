import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Messagerie() {
    const [messageData, setMessageData] = useState([]);
    const [catData, setCatData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [messageText, setMessageText] = useState('');
    const [message, setMessage] = useState(''); // Ajout de l'état message
    const [refreshKey, setRefreshKey] = useState(0); // Clé de rafraîchissement
    const location = useLocation();
    const adminID = location.state.userId;
    const utilisateurID = '3';
    const discutionID = '1';

    useEffect(() => {
        // Récupérer les données de la messagerie depuis l'API
        axios.get('http://localhost:3001/messagerie')
            .then((response) => {
                setMessageData(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [refreshKey]); // Rafraîchir lorsque la clé de rafraîchissement change
    console.log(messageData)
    useEffect(() => {
        // Récupérer les données des catégories depuis l'API
        axios.get('http://localhost:3001/categorie')
            .then((response) => {
                setCatData(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        if (event.target.value === 'Autre') {
            setCustomCategory('');
        }
    };

    const handleCustomCategoryChange = (event) => {
        setCustomCategory(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Préparez les données à envoyer au backend
        const messageDataToSend = {
            adminID,
            utilisateurID,
            categorieId: messageData.length === 0 ? selectedCategory : messageData[0].categorie_id,
            message: messageText,
            emetteur: 'admin', // Vous pouvez définir l'émetteur ici
            discutionID,
        };

        // Envoyer les données au backend
        axios.post('http://localhost:3001/ajouterMessage', messageDataToSend)
            .then((response) => {
                const { success, message, admin } = response.data;
                setMessage(message); // Mettre à jour l'état message

                // Rafraîchir la div de messagerie en changeant la clé de rafraîchissement
                setRefreshKey((prevKey) => prevKey + 1);

                // Réinitialiser le textarea
                setMessageText('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className='messagerie_container'>
            <div className='messagerie'>
                {messageData.length === 0 ?
                    <h3>{selectedCategory}</h3> : <h3> {messageData[0].nom_categorie} </h3>
                }
                <div className='chats'>
                    {messageData.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${
                                message.emetteur === 'admin' ? 'message-recepteur' : 'message-emetteur'
                            }`}
                        >
                            {message.emetteur === 'admin' ? `${message.nom_admin} ${message.prenom_admin}` : message.nom_utilisateur}
                            <br />
                            {message.message_text}
                        </div>
                    ))}
                </div>
            </div>
            <div className='catMessagerWrite'>
                <form onSubmit={handleSubmit}>
                    {messageData.length === 0 && (
                        <div>
                            <select
                                className='selectcat'
                                name='categorie'
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value=''>Sélectionnez une catégorie</option>
                                {catData.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nom_categorie}
                                    </option>
                                ))}
                                <option value='Autre'>Autre</option>
                            </select>
                            {selectedCategory === 'Autre' && (
                                <input
                                    type='text'
                                    className='selectcat'
                                    placeholder='Entrez la catégorie personnalisée'
                                    value={customCategory}
                                    onChange={handleCustomCategoryChange}
                                />
                            )}
                        </div>
                    )}
                    <textarea
                        className='messageWriteArea'
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        cols='30'
                        rows='10'
                    ></textarea>
                    <button type='submit'>Envoyer</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default Messagerie;
