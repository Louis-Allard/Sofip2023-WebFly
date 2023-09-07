import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../scss/_accounts.scss'

const Accounts = () => {
    const [data, setData] = React.useState(null);

    // React.useEffect(() => {
    //     axios.get('http://localhost:3001/accounts').then((res) => {
    //         console.log(res.data);
    //         setData(res.data);
    //     });
    // }, []);

    return (
        <div className="accounts">
            <Sidebar id="0" />
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