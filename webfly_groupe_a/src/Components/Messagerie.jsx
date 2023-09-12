import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation} from 'react-router-dom';
import { connect } from 'react-redux'; 

const mapStateToProps = (state) => {
    const { discutionId, utilisateurId } = state.conversation;
    return {
        discutionId,
        utilisateurId,
    };
};

function Messagerie({ setShowMessagerie, discutionId, utilisateurId }) {
    const [messageData, setMessageData] = useState([]);
    const [catData, setCatData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [messageText, setMessageText] = useState('');
    const [message, setMessage] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);
    const location = useLocation()
    
    const adminID = "1";
    const utilisateurID = utilisateurId;
    const discutionID = discutionId;

    useEffect(() => {
        axios
            .get(`http://localhost:3001/messagerie?discution_id=${discutionID}`)
            .then((response) => {
                setMessageData(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [refreshKey, discutionID]);

    useEffect(() => {
        axios
            .get('http://localhost:3001/categorie')
            .then((response) => {
                setCatData(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [[discutionId, utilisateurId]]);

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
        const messageDataToSend = {
            adminID,
            utilisateurID,
            categorieId: messageData.length === 0 ? selectedCategory : messageData[0].categorie_id,
            message: messageText,
            emetteur: location.pathname === "/ConnexionUserOk" ? 'utilisateur' : 'admin',
            discutionID,
        };

        axios
            .post('http://localhost:3001/ajouterMessage', messageDataToSend)
            .then((response) => {
                const { success, message, admin } = response.data;
                setMessage(message);
                setRefreshKey((prevKey) => prevKey + 1);
                setMessageText('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleMessageClick = () => {
        setShowMessagerie(false);
    };
    return (
        <div className='messagerie_container'>
            <div className='messagerie'>
                {messageData.length === 0 ? (
                    <h3>{messageData.nom}</h3>
                ) : (
                    <h3> {messageData[0].nom_categorie} </h3>
                )}
                <div className='chats'>
                    {messageData.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${
                                message.emetteur === 'admin' ? 'message-recepteur' : 'message-emetteur'
                            }`}
                        >
                            {message.emetteur === 'admin'
                                ? `${message.nom_admin} ${message.prenom_admin}`
                                : message.nom_utilisateur}
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
                    <button onClick={handleMessageClick}>retour</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

// Connectez le composant au store Redux
export default connect(mapStateToProps)(Messagerie);
