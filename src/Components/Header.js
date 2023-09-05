import React from 'react';
// import '../assets/styles/_Header.scss';
import image from '../assets/CodeConnect.ico';

const Header = () => {
    return (
        <div className='Header'>
            <div className='div-logo'>
                <img src={image} alt="" />
                <h1>WebFly</h1>
            </div>
            <div className='connexion'>
                <button className='btn btn-danger'>Déconnexion</button>
            </div>
        </div>
    );
};

export default Header;