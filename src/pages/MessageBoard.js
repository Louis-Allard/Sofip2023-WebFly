import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DeleteModal from '../components/DeleteModal';
import { useDispatch } from 'react-redux';
import { setModal } from '../reducers';
import '../scss/_messageboard.scss';

const MessageBoard = () => {
    const [data, setData] = React.useState(null);
    const dispatch = useDispatch();

    const setModalOpen = () => {
        dispatch(setModal(true));
    };

    // React.useEffect(() => {
    //     axios.get('http://localhost:3001/messages').then((res) => {
    //         console.log(res.data);
    //         setData(res.data);
    //     });
    // }, []);

    return (
        <div className="messages">
            <Sidebar id="2" />
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