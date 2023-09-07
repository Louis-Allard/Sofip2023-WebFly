import React, { useState } from "react";
import Navbar from "./Navbar";
import AjouterUtilisateur from "./AjouterUtilisateur";
import ListerUtilisateur from "./ListerUtilisateur";

function ConnexionAdminOk() {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const renderComponent = () => {
        switch (selectedComponent) {
            case "Ajouter_TMA":
                return <AjouterUtilisateur />;
            case "Liste_TMA":
                return <ListerUtilisateur />;
            default:
                return null;
        }
    };

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
