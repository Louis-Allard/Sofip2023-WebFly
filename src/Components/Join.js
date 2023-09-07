import React, {useState} from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
const socket = io.connect("http://localhost:3001");

const Join = () => {
    const [nom, setNom] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);


    const joinRoom = () =>{
        if(nom !== "" && room !== ""){
            socket.emit("join_room", room);
            setShowChat(true);
        }
    }
    return (
        <section>
            {!showChat ? (
            <div>
            <h3>Join a chat</h3>
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
            )
            :
            (
            <Chat socket={socket} nom={nom} room={room}/>
            )}
        </section>
    );
};

export default Join;