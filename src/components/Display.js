import React from 'react';
import axios from 'axios';
import '../scss/_display.scss';

const Display = (props) => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        axios.get('http://localhost:3001/users').then((res) => {
            console.log(res.data);
            setData(res.data);
        });
    }, []);

    return (
        <>
            {data && data.map((item, index) => (
                <div className="user" key={index}>
                    <p>{props.text || "J'ai besoin d'une phrase assez longue pour ce display."}</p>
                    <div>
                        <button className="modify">Modifier</button>
                        <button className="delete">Supprimer</button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Display;