import React, { useEffect, useState } from 'react';
import smiley from '../assets/icons/smiley.png';
import file from '../assets/icons/file.png';
import calendar from '../assets/icons/calendar.png';
import ScrollToBottom from 'react-scroll-to-bottom';
    //DEBUT APP.JS
import io from 'socket.io-client';

const Chat = ({socket, nom, room}) => {
    const [nom, setNom] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const joinRoom = () =>{
        if(nom !== "" && room !== ""){
            socket.emit("join_room", room);
            setShowChat(true);
        }
    }
    //FIN APP.JS
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([])
    const sendMessage = async () => {
    if (currentMessage !== ""){
        const messagedata = {
            room: room,
            author: nom,
            message: currentMessage,
            time: 
            new Date(Date.now()).getHours() +
            ":" + 
            new Date(Date.now()).getMinutes()
        };
        await socket.emit("send_message", messagedata);
        setMessageList((list) => [...list, messagedata]);
        setCurrentMessage("")
    }
    };
useEffect(() => {
    socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
    });
},[socket])
const socket = io.connect("http://localhost:3001");

    return (
        <div className='blocChat'>
            {!showChat ? (
            <div>
                <input type='text' 
                placeholder='nom' 
                onChange={(event) => {
                    setNom(event.target.value);
                }}
                />
                <input type='text' 
                placeholder='room' 
                onChange={(event) => {
                    setRoom(event.target.value);
                }}
                />
                <button onClick={joinRoom} type='submit'>Rejoindre</button>
            </div>
            ) : (
            <div className='body-message'>
                <ScrollToBottom className='message-container'>
                {messageList.map((messageContent) => {
                    return <div className='message' id={nom === messageContent.author ? "you" : "other"}>
                                <div>
                                    <div className='message-content'>
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className='message-meta'>
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>;
                })}
                </ScrollToBottom>
            </div>

            <div className='form'>
                <form className='formAnswer' id="form" action='#'>
                    <input type='text'
                    className='form-control'
                    value={currentMessage} 
                    onChange={(event) => {setCurrentMessage(event.target.value);}} 
                    onKeyDown={(event) => {event.key === "enter" && sendMessage();}} 
                    placeholder='Votre message ...' id="input" autoComplete="off" />
                    <button onClick={sendMessage} className='btn btn-secondary ms-1'>Envoyer</button>
                    <img className='ms-2' src={smiley} alt='smiley'/>
                    <img className='ms-2' src={file} alt='fichier'/>
                    <img className='ms-2' src={calendar} alt='calendrier'/>
                </form>
            </div>
            )}
        </div>
    );
};

export default Chat;