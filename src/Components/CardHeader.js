import React from 'react';
import { useSelector } from 'react-redux';

const CardHeader = () => {
    const connected = useSelector((state) => state.connected);
    const role = useSelector((state) => state.role);
    const prenom = useSelector((state) => state.prenom);
    const nom = useSelector((state) => state.nom);
    return (
        <div className='cardHeader d-flex'>
            <div className='mx-2'>{role}</div>
            <div className='mx-2'>{prenom} {nom}</div>
            <div className='mx-2'>{connected ? 'En Ligne' : ''}</div>
        </div>
    );
};

export default CardHeader;