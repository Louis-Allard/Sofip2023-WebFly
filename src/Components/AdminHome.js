import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {

    return (
        <section>
            <div className='buttonCrud'>
                <Link to="/register"><button className='btn btn-primary p-3' type='submit'>Créer un utilisateur</button></Link>
                <Link to="/userlist"><button className='btn btn-secondary p-3' type='submit'>Lire et supprimer un utilisateur</button></Link>
                <Link to={`/join/${Math.floor(Math.random() * 1000)}`} className="btn btn-outline-primary  mt-3"><i className="bi bi-chevron-left"></i> Retour</Link>
            </div>

        </section>
    );
};

export default AdminHome;