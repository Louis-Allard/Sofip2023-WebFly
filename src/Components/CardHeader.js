import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CardHeader = () => {
    const connected = useSelector((state) => state.connected);
    const role = useSelector((state) => state.role);
    const prenom = useSelector((state) => state.prenom);
    const nom = useSelector((state) => state.nom);
    return (
        <div className='cardHeader d-flex'>
            <Link to="/home-admin"><p className='text-danger'>{role === 'admin' ? role : ''}</p></Link>
            <Link to="/profil"><p className='text-primary'>{prenom} {nom}</p></Link>
            <p>{connected ? 'En Ligne' : ''}</p>
        </div>
    );
};

export default CardHeader;