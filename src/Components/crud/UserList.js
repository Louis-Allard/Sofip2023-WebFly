import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/utilisateurs") // Utilisez l'URL relative correspondante
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des utilisateurs depuis le frontend :",
          error
        );
      });
  }, []);

  const handleDeleteUser = (userId) => {
    axios
      .delete(`/api/utilisateurs/${userId}`) // Assurez-vous que l'URL correspond à votre backend
      .then((response) => {
        // Mettez à jour l'état des utilisateurs après la suppression
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.ID_UTILISATEUR !== userId)
        );
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error
        );
      });
  };

  return (
    <div className="list-container">
      <h2>Liste des utilisateurs inscrits</h2>

      {users.map((user) => (
        <div className="user-info" key={user.ID_UTILISATEUR}>
          <p>{user.NOM}</p>
          <p>{user.PRENOM}</p>
          <button
            className="btn btn-warning"
            onClick={() => handleDeleteUser(user.ID_UTILISATEUR)}
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserList;
