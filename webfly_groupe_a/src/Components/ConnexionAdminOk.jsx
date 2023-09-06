import React, { useState } from 'react';
import Navbar from './Navbar';
import Ajouter_utilisateur from './Ajouter_utilisateur';
import Lister_utilisateur from './Lister_utilisateur';

function ConnexionAdminOk() {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Ajouter_TMA':
                return <Ajouter_utilisateur />;
            case 'Liste_TMA':
                return <Lister_utilisateur />;
            default:
                return null;
        }
    };

    return (
        <div className='home_admin'>
            <div className='left'>
                <Navbar setSelectedComponent={setSelectedComponent} />
            </div>
            <div className='right'>
                {renderComponent()}
            </div>
        </div>
    );
}

export default ConnexionAdminOk;