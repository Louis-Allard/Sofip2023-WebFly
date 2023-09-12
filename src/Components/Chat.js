import React, { useEffect, useState } from "react";
// import smiley from "../assets/icons/smiley.png";
import file from "../assets/icons/file.png";
import calendar from "../assets/icons/calendar.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
const Chat = ({ socket, nom, room }) => {
  const id = useSelector((state) => state.idUser);
  // Déclarez une fonction pour gérer l'upload de fichiers
  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0]; // Obtenez le premier fichier sélectionné
  //   // Faites quelque chose avec le fichier, par exemple, téléchargez-le vers votre serveur
  //   // Vous pouvez utiliser une bibliothèque comme axios ou fetch pour envoyer le fichier vers votre serveur
  //   // Assurez-vous de gérer les erreurs et les réussites de l'upload
  // };
  console.log(id);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async (event) => {
    event.preventDefault();
    if (currentMessage !== "") {
      const messagedata = {
        room: room,
        id: id,
        author: nom,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      console.log(messagedata);
      await socket.emit("send_message", messagedata);
      setMessageList((list) => [...list, messagedata]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        // Créez une instance FormData pour envoyer le fichier au serveur
        const formData = new FormData();
        formData.append("file", file);

        // Envoyez le fichier au serveur
        const response = await axios.post("/upload", formData);

        // Si le fichier est correctement envoyé, vous pouvez afficher le résultat ou effectuer d'autres actions nécessaires.
        console.log("Fichier envoyé avec succès :", response.data);

        // Réinitialisez le champ d'entrée de fichier si nécessaire
        event.target.value = null;
      } catch (error) {
        // Gérez les erreurs ici
        console.error("Erreur lors de l'envoi du fichier :", error);
      }
    }
  };

  return (
    <div className="blocChat">
      {/* HEADER */}
      <div className="chat-header">
        <p>Chat</p>
      </div>

      {/* BODY */}
      <div className="chat-body">
        {messageList.map((messageContent, index) => {
          return (
            <div
              className="message"
              key={index}
              id={nom === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-meta">
                  <p id="author">{messageContent.author}</p>
                  <p id="time">{messageContent.time}</p>
                </div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/*FOOTER*/}
      <div className="chat-footer">
        <div className="form">
          <form className="formAnswer" id="form" action="#">
            <textarea
              type="text"
              className="form-control"
              rows="2"
              cols="50"
              maxLength="200"
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyDown={(event) => {
                event.key === "enter" && sendMessage();
              }}
              placeholder="Votre message ..."
              id="input"
              autoComplete="off"
            />
            <button onClick={sendMessage} className="btn btn-secondary ms-1">
              Envoyer*
            </button>
            {/* <img className="ms-2" src={smiley} alt="smiley" /> */}
            <label htmlFor="fileInput">
              <img className="ms-2" src={file} alt="fichier" />
            </label>
            <input
              type="file"
              style={{ display: "none" }}
              id="fileInput"
              onChange={handleFileUpload}
            />

            <Link to="/agenda">
              <img className="ms-2" src={calendar} alt="calendrier" />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
