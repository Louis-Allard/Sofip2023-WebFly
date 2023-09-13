import React from 'react';
import '../scss/_display.scss';

const Display = (props) => {
    return (
        <>
            <p>{props.text || "J'ai besoin d'une phrase assez longue pour ce display."}</p>
            <div>
                <button className="modify">Modifier</button>
                <button className="delete">Supprimer</button>
            </div>
        </>
    );
}

export default Display;