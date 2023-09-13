import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setModal } from '../reducers';
import '../scss/_messageboard.scss';

const MessageBoard = ({socket, username, conversation}) => {
    const { iduser } = useParams()
    const [data, setData] = useState(null);
    const [currentMessage, setCurrentMessage] = useState();
    const [messageList, setMessageList] = useState([]);
    const dispatch = useDispatch();

    const setModalOpen = () => {
        dispatch(setModal(true));
    };

    // const sendMessage = async () => {
    //     if (currentMessage !== "") {
    //       const messageData = {
    //         conversation: conversation,
    //         author: username,
    //         message: currentMessage,
    //         time:
    //           new Date(Date.now()).getHours() +
    //           ":" +
    //           new Date(Date.now()).getMinutes(),
    //       };
    
    //       await socket.emit("send_message", messageData);
    //       setMessageList((list) => [...list, messageData]);
    //       setCurrentMessage("");
    //     }
    //   };

    //   useEffect(() => {
    //     socket.on("receive_message", (data) => {
    //       setMessageList((list) => [...list, data]);
    //     });
    //   }, [socket]);


    // React.useEffect(() => {
    //     axios.get('http://localhost:3001/messages').then((res) => {
    //         console.log(res.data);
    //         setData(res.data);
    //     });
    // }, []);

    return (
        <div className="messages">
            <DeleteModal />
            <div className='message_list'>
                <div className="messages_map">
                    {!data ? `Vous n'avez reçu aucun message.` : data.map((item, index) => (
                        <div className="message_map" key={index}>
                            <Link className="color" to={`/messages/${item.ID}`}>
                                <div className='message'>
                                    <span className='name'>{item.NAME} {item.FIRSTNAME}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MessageBoard;