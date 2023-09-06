import React from 'react'
import Navbar from './Navbar';
import Ajouter_utilisateur from './Ajouter_utilisateur';

function ConnexionAdminOk() {
    return (
        <div className='home_admin'>
            <Navbar/>
            <Ajouter_utilisateur/>
        </div>
    )
}
export default ConnexionAdminOk;