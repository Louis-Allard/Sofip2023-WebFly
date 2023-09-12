import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DeleteModal from '../components/DeleteModal';
import { useDispatch } from 'react-redux';
import { setModal } from '../reducers';
import '../scss/_accounts.scss';

const Accounts = () => {
    const [data, setData] = React.useState(null);
    const dispatch = useDispatch();

    const setModalOpen = () => {
        dispatch(setModal(true));
    };

    React.useEffect(() => {
        axios.get('http://localhost:3001/users').then((res) => {
            console.log(res.data);
            setData(res.data);
        });
    }, []);

    return (
        <div className="accounts">
            <Sidebar id="1" />
            <DeleteModal />
            <div className='account_list'>
                <div className='account_map'>
                    {!data ? `Vous n'avez aucun contact enregistré.` : data.map((item, index) => (
                        <div className="user_map" key={index}>
                            <Link className="color" to={`/accounts/${item.ID}`}>
                                <div className='user'>
                                    <span className='names'>{item.NAME} {item.FIRSTNAME}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Accounts;