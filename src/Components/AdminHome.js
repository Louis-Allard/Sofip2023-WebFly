import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    
    return (
        <section>
            <div className='buttonCrud'>
                <Link to="/register"><button className='btn btn-primary p-3' type='submit'>Créer un utilisateur</button></Link>
                <Link to="/userlist"><button className='btn btn-secondary p-3' type='submit'>Lire et supprimer un utilisateur</button></Link>
            </div>

        </section>
    );
};

export default AdminHome;