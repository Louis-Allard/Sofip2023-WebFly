import React, { useEffect, useState } from 'react';
import file from '../assets/icons/file.png';
import calendar from '../assets/icons/calendar.png';
import { useSelector } from 'react-redux';

const Chat = ({ socket, nom, room }) => {

    const id = useSelector((state) => state.idUser);
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
                    new Date(Date.now()).getMinutes()
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


    // AJOUTER UN FICHIER
    const [fileName, setFileName] = useState("Aucun fichier sélectionné");

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const newFileName = files[0].name;
      setFileName("Nom du fichier: " + newFileName);
    } else {
      setFileName("Aucun fichier sélectionné");
    }
  };

    return (
        <div className='blocChat'>
            {/* HEADER */}
            <div className='chat-header'>
                <p>Chat</p>
            </div>

            {/* BODY */}
            <div className='chat-body'>
                {messageList.map((messageContent, index) => {
                    return (
                        <div className='message' key={index} id={nom === messageContent.author ? "you" : "other"}>
                            <div>
                                <div className='message-meta'>
                                    <p id="author">{messageContent.author}</p>
                                    <p id="time">{messageContent.time}</p>
                                </div>
                                <div className='message-content'>
                                    <p>{messageContent.message}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/*FOOTER*/}
            <div className='chat-footer'>
                <div className='form'>
                    <form className='formAnswer' id="form" action='#'>
                        <textarea type='text'
                            className='form-control'
                            rows="2" cols="50" maxLength="200"
                            value={currentMessage}
                            onChange={(event) => { setCurrentMessage(event.target.value); }}
                            onKeyDown={(event) => { event.key === "enter" && sendMessage(); }}
                            placeholder='Votre message ...' id="input" autoComplete="off" />
                        <button onClick={sendMessage} className='btn btn-secondary ms-2'>Envoyer</button>
                        <div className='ms-2'>
                            <label htmlFor='fileInput'>
                                <img src={file} alt='upload file'/>                            
                                <span id='fileName'>{fileName}</span>
                            </label>
                            <input type='file' id='fileInput' onChange={handleFileChange} accept="image/png, image/jpeg"/>
                        </div>
                        <img className='ms-2' src={calendar} alt='calendrier' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;
