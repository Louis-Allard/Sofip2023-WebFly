import { Route, Routes } from "react-router-dom";
import Connexion from "./Components/Connexion";
import ConnexionAdminOk from "./Components/ConnexionAdminOk";
import ConnexionUserOk from "./Components/ConnexionUserOk";
import AjouterUtilisateur from "./Components/AjouterUtilisateur";
import ListerUtilisateur from "./Components/ListerUtilisateur";

function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Connexion />} />
            <Route path="/ConnexionAdminOk" element={<ConnexionAdminOk />} />
            <Route path="/ConnexionUserOk" element={<ConnexionUserOk />} />
            <Route
                path="/AjouterUtilisateur"
                element={<AjouterUtilisateur />}
            />
            <Route path="/ListerUtilisateur" element={<ListerUtilisateur />} />
        </Routes>
    );
}

export default Routers;
