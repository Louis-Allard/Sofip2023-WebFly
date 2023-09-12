import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const socket = io.connect("http://localhost:3001");

const Join = () => {
    const prenom = useSelector((state) => state.prenom);
    const nom2 = useSelector((state) => state.nom);
    const idDest = useSelector((state) => state.destinataireTchat);
    const id = useSelector((state) => state.idUser);
    const destinataireTchat = useSelector((state) => state.destinataireTchat);
    const [nom, setNom] = useState(prenom + ' ' + nom2);
    const param = useParams();
    const idRoom = param.room;
    const [room, setRoom] = useState('');
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        setRoom(idRoom)
    }, [idRoom]);

    const joinRoom = () => {
        if (nom !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
        if (destinataireTchat !== '') {
            axios.post('http://localhost:3001/addInvite', { idDest, room, id })
                .then((response) => {
                    console.log(response.data);
                    alert('invitation envoyée');
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération", error);
                });
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
                                value={nom}
                            />
                            <input type='text'
                                className='form-control'
                                placeholder='salon'
                                onChange={(event) => {
                                    setRoom(event.target.value);
                                }}
                                value={room}
                            />
                            <button className='btn btn-secondary' onClick={joinRoom} type='submit'>Rejoindre</button>
                        </div>
                    </div>
                </div>
            )
                :
                (
                    <div>
                        <span onClick={() => { setShowChat(false) }} className="material-symbols-outlined close cursor">
                            close
                        </span>
                        <Chat socket={socket} nom={nom} room={room} />
                    </div>
                )}
        </section>
    );
};

export default Join;