import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bcrypt from 'bcryptjs-react';

const FormReset = () => {
    const params = useParams();
    const navigate = useNavigate();
    const token = params.token;
    const [idUser, setIdUser] = useState('');
    const [error, setError] = useState(false);
    const [mdp, setMdp] = useState('');
    const [confirmMdp, setConfirmMdp] = useState('');
    const [errMdp, setErrMdp] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/verify-token', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log(response.data);
                if (!response.data) {
                    setError(true);
                }
                console.log(response.data.userID);
                setIdUser(response.data.userID)
            })
            .catch(error => {
                // Token invalide ou expiré, l'utilisateur n'est pas authentifié
                console.log('TOKEN INVALIDE', error)
            });
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mdp !== confirmMdp) {
            setErrMdp(true);
        } else {
            const saltRounds = 10;
            try {
                // Attendre le hachage du mot de passe
                const hashed = await bcrypt.hash(mdp, saltRounds);
                //console.log(hashed);

                // Effectuez la requête Axios pour mettre à jour le mot de passe
                const response = await axios.post(`http://localhost:3001/reset`, { idUser, hashed });
                console.log(response.data);
                alert('Mot de passe réinitialisé avec succès');
                navigate('/');

            } catch (error) {
                console.error("Erreur lors du changement de mot de passe:", error);
            }
        }
    }

    return (
        <div>
            {error ? (
                <h1>Lien Invalide ou expiré</h1>
            ) : (
                <div>
                    <h1>Réinitialisation du mot de passe</h1>

                    <form method="POST" className=" text-center  p-3" onSubmit={handleSubmit}>

                        <div className="mb-1">
                            <label htmlFor="Input" className="form-label">
                                Nouveau mot de passe:
                            </label>
                            <input type="password" className="form-control" id="mdp" name="mdp" autoComplete="off" value={mdp} onChange={(e) => {
                                setMdp(e.target.value)
                            }} />
                        </div>

                        <div className="mb-1">
                            <label htmlFor="Input" className="form-label">
                                Confirmer nouveau mot de passe:
                            </label>
                            <input type="password" className="form-control" id="confirmMdp" name="ConfirmMdp" autoComplete="off" value={confirmMdp} onChange={(e) => { setConfirmMdp(e.target.value) }} />
                        </div>
                        {errMdp && (
                            <p className='text-danger'>Les champs saisis ne sont pas identiques</p>
                        )}
                        <button className="btn btn-success mt-1" type="submit">
                            Réinitialiser
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default FormReset;