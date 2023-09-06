import React from 'react';

function Navbar({ setSelectedComponent }) {

    return (
        <div className='sidebar'>
            <button onClick={() => setSelectedComponent('Messagerie')}>Messagerie</button>
            <button onClick={() => setSelectedComponent('Ajouter_TMA')}>Ajouter TMA</button>
            <button onClick={() => setSelectedComponent('Liste_TMA')}>Liste TMA</button>
        </div>
    );
}

export default Navbar;

