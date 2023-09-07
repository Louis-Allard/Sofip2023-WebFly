import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../scss/_companies.scss'

const Companies = () => {
    const [data, setData] = React.useState(null);

    // React.useEffect(() => {
    //     axios.get('http://localhost:3001/companies').then((res) => {
    //         console.log(res.data);
    //         setData(res.data);
    //     });
    // }, []);

    return (
        <div className="companies">
            <Sidebar id="1" />
            <div className='company_list'>
                <div className="company_map">
                    {!data ? `Vous n'avez aucune entreprise enregistrée.` : data.map((item, index) => (
                        <div className="comp_map" key={index}>
                            <Link className="color" to={`/companies/${item.ID}`}>
                                <div className='company'>
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

export default Companies;