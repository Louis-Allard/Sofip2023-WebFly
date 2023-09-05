import React from 'react'
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

function Connexion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/connexion",
                { email, password }
            );
            const { success, message, token, admin } = response.data;
            setMessage(message);
            if (success && admin) {
                navigate("/ConnexionAdminOk", { state: { token: token } });
            } else if (success && !admin){
                navigate("/ConnexionUserOk", { state: { token: token } });
            } else {
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="connect_inscript">
            <div className="connect_inscript_title">
                <h1>Connexion</h1>
            </div>
            <form className="connexion" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">E-mail</label>
                    

                    <input
                        id="email"
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Mot de passe</label>
                    

                    <input
                        id="password"
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <input
                    className="connect_inscript_button"
                    type="submit"
                    value="Connexion"
                />
            </form>
            {message && <p>{message}</p>}
        </main>
    );
}
export default Connexion;
