import React from 'react';
import etat from '../assets/icons/etat.png';

const Collab = () => {
    return (
        <div className='collab'>
            <div className='interlocuteur'>
                <p>Jean-Vincent Delattre</p>
            </div>
            <div className='listCollab text-center'>
                <h4 className='text-center titreCollab'>Collaborateurs</h4>
                <p>Cyril Garcia<img className='ms-2' src={etat} alt='etat'/></p>
                <p>Frédéric Delannoy<img className='ms-2' src={etat} alt='etat'/></p>
                <p>Nicolas Dupont<img className='ms-2' src={etat} alt='etat'/></p>
            </div>
        </div>
    );
};

export default Collab;