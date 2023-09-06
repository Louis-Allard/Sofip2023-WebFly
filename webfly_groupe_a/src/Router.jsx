import { Route, Routes } from "react-router-dom";
import Connexion from "./Components/Connexion";
import ConnexionAdminOk from "./Components/ConnexionAdminOk";
import ConnexionUserOk from "./Components/ConnexionUserOk";
import Ajouter_utilisateur from "./Components/Ajouter_utilisateur";

function Routers() {
    return (
            <Routes>
                <Route path="/" element={<Connexion />} />
                <Route path="/ConnexionAdminOk" element={<ConnexionAdminOk />} />
                <Route path="/ConnexionUserOk" element={<ConnexionUserOk />} />
                <Route path="/Ajouter_utilisateur" element={<Ajouter_utilisateur />} />
            </Routes>
    );
}

export default Routers;
