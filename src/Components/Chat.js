import React from 'react';
import smiley from '../assets/icons/smiley.png';
import file from '../assets/icons/file.png';
import calendar from '../assets/icons/calendar.png';

const Chat = () => {
    return (
        <div className='blocChat'>
            <ul id="messages"></ul>
            <div className='form'>
                <form className='formAnswer' id="form" action='#'>
                    <input className='form-control' placeholder='Votre message ...' id="input" autoComplete="off" />
                    <button className='btn btn-secondary ms-1'>Envoyer</button>
                    <img className='ms-2' src={smiley} alt='smiley'/>
                    <img className='ms-2' src={file} alt='fichier'/>
                    <img className='ms-2' src={calendar} alt='calendrier'/>
                </form>
            </div>
        </div>
    );
};

export default Chat;