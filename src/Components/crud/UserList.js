import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users") // Utilisez l'URL relative correspondante
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
      .delete(`http://localhost:3001/users/${userId}`) // Assurez-vous que l'URL correspond à votre backend
      .then((response) => {
        // Mettez à jour l'état des utilisateurs après la suppression
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error
        );
      });
  };

  return (
    <div>
      <h2>Liste des utilisateurs inscrits</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
