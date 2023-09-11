import { Route, Routes } from "react-router-dom";
import Connexion from "./Components/Connexion";
import ConnexionAdminOk from "./Components/ConnexionAdminOk";
import ConnexionUserOk from "./Components/ConnexionUserOk";
import AjouterUtilisateur from "./Components/AjouterUtilisateur";
import ListerUtilisateur from "./Components/ListerUtilisateur";
import Messagerie from "./Components/Messagerie";


function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Connexion />} />
            <Route path="/ConnexionAdminOk" element={<ConnexionAdminOk />} />
            <Route path="/ConnexionUserOk" element={<ConnexionUserOk />} />
            <Route path="/AjouterUtilisateur" element={<AjouterUtilisateur />}/>
            <Route path="/ListerUtilisateur" element={<ListerUtilisateur />} />
            <Route path="/Messagerie" element={<Messagerie/>} />
        </Routes>
    );
}

export default Routers;
