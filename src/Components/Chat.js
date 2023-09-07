import React, { useEffect, useState } from 'react';
import smiley from '../assets/icons/smiley.png';
import file from '../assets/icons/file.png';
import calendar from '../assets/icons/calendar.png';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({socket, nom, room}) => {

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

    return (
        <div className='blocChat'>
        {/* HEADER */}
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>

        {/* BODY */}
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
            {messageList.map((messageContent) => {
                return (
                <div className='message' id={nom === messageContent.author ? "you" : "other"}>
                    <div>
                        <div className='message-content'>
                            <p>{messageContent.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p id="time">{messageContent.time}</p>
                            <p id="author">{messageContent.author}</p>
                        </div>
                    </div>
                </div>
                )
            })}
            </ScrollToBottom>
        </div>

        {/*FOOTER*/}
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

        </div>
    );
};

export default Chat;