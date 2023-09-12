import React from 'react';
import { useSelector } from 'react-redux';

const CardHeader = () => {
    const connected = useSelector((state) => state.connected);
    const role = useSelector((state) => state.role);
    const prenom = useSelector((state) => state.prenom);
    const nom = useSelector((state) => state.nom);
    return (
        <div className='cardHeader d-flex'>
            <p className='text-danger'>{role === 'admin' ? role : ''}</p>
            <p>{prenom} {nom}</p>
            <p>{connected ? 'En Ligne' : ''}</p>
        </div>
    );
};

export default CardHeader;