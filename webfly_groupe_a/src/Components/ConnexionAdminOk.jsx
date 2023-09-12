import React, { useState } from "react";
import Navbar from "./Navbar";
import AjouterUtilisateur from "./AjouterUtilisateur";
import ListerUtilisateur from "./ListerUtilisateur";
import ListeMessage from "./ListeMessage";
import Messagerie from "./Messagerie";

function ConnexionAdminOk() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [showMessagerie, setShowMessagerie] = useState(false);

    const renderComponent = () => {
        if (showMessagerie) {
            return <Messagerie setShowMessagerie={setShowMessagerie}  />;
        } else {
            switch (selectedComponent) {
                case "Messagerie":
                    return <ListeMessage setShowMessagerie={setShowMessagerie} />;
                case "Ajouter_TMA":
                    return <AjouterUtilisateur />;
                case "Liste_TMA":
                    return <ListerUtilisateur />;
                default:
                    return null;
            }
        }
    };
    console.log(selectedComponent)
    console.log(showMessagerie)
    return (
        <div className="home_admin">
            <div className="left">
                <Navbar setSelectedComponent={setSelectedComponent} />
            </div>
            <div className="right">{renderComponent()}</div>
        </div>
    );
}

export default ConnexionAdminOk;
