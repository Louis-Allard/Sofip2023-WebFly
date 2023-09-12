import React from 'react';
import { useLocation } from 'react-router-dom';

function Navbar({ setSelectedComponent }) {
    const location = useLocation()
    return (
        <div className='sidebar'>
            <button onClick={() => setSelectedComponent('Messagerie')}>Messagerie</button>
            {location.pathname === "/ConnexionAdminOk" ? (
            <>
                <button onClick={() => setSelectedComponent('Ajouter_TMA')}>Ajouter TMA</button>
                <button onClick={() => setSelectedComponent('Liste_TMA')}>Liste TMA</button>
            </>
            ) : null}
        </div>
    );
}

export default Navbar;

