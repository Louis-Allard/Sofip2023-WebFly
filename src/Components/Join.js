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
        <div className='pageJoin'>
            <div className='blocJoin'>
                    <h3>Rejoindre un salon</h3>                
                    <div className='join'>

                    <input type='text' 
                        className='form-control'
                        placeholder='nom' 
                        onChange={(event) => {
                        setNom(event.target.value);
                    }}
                    />
                    <input type='text'
                        className='form-control' 
                        placeholder='salon' 
                        onChange={(event) => {
                        setRoom(event.target.value);
                    }}
                    />
                    <button className='btn btn-secondary' onClick={joinRoom} type='submit'>Rejoindre</button>
                </div>
            </div>
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