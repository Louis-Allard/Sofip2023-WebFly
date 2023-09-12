import React, { useEffect, useState } from "react";
import axios from "axios";

function ListerUtilisateur() {
    const [userData, setUserData] = useState([]);
    const [SuccessMessage, setSuccessMessage] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedValues, setEditedValues] = useState({ nom: "", email: "" });

    useEffect(() => {
        fetch("http://localhost:3001/lister_utilisateur")
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(
                `http://localhost:3001/sup_utilisateur/${userId}`
            );

            const response = await fetch(
                "http://localhost:3001/lister_utilisateur"
            );
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                console.error(
                    "Erreur lors de la récupération des données après la suppression"
                );
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const handleEditUser = (userId) => {
        setEditingUserId(userId);
        const userToEdit = userData.find((user) => user.id === userId);
        setEditedValues({ nom: userToEdit.nom, email: userToEdit.email });
    };

    const handleUpdateUser = async (userId) => {
        try {
            const response = await axios.post(
                `http://localhost:3001/update_User/${userId}`,
                { nom: editedValues.nom, email: editedValues.email }
            );

            const { success } = response.data;

            if (success) {
                setSuccessMessage("La TMA a bien été modifiée");
                // Mettre à jour userData avec les nouvelles données du serveur
                const updatedUserData = userData.map((user) => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            nom: editedValues.nom,
                            email: editedValues.email,
                        };
                    }
                    return user;
                });
                setUserData(updatedUserData);
                setEditingUserId(null); // Sortir du mode d'édition
            } else {
                setSuccessMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelEdit = () => {
        setEditingUserId(null);
        setEditedValues({ nom: "", email: "" });
    };

    return (
        <div className="lister_utilisateur">
            <table>
                <thead>
                    <tr>
                        <th colspan="1">Nom TMA</th>
                        <th colspan="1">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <tr className="user" key={user.id}>
                            {editingUserId === user.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            name="nom"
                                            value={editedValues.nom}
                                            onChange={(e) =>
                                                setEditedValues({
                                                    ...editedValues,
                                                    nom: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedValues.email}
                                            onChange={(e) =>
                                                setEditedValues({
                                                    ...editedValues,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleUpdateUser(user.id)
                                            }
                                        >
                                            Envoyer la modification
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={handleCancelEdit}>
                                            Annuler
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{user.nom_utilisateur}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleEditUser(user.id)
                                            }
                                        >
                                            Modifier
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDeleteUser(user.id)
                                            }
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>{SuccessMessage}</p>
        </div>
    );
}

export default ListerUtilisateur;
