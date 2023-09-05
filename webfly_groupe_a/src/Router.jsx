import { Route, Routes } from "react-router-dom";
import Connexion from "./Components/Connexion";
import ConnexionAdminOk from "./Components/ConnexionAdminOk";
import ConnexionUserOk from "./Components/ConnexionUserOk";

function Routers() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Connexion />} />
                <Route path="/ConnexionAdminOk" element={<ConnexionAdminOk />} />
                <Route path="/ConnexionUserOk" element={<ConnexionUserOk />} />
            </Routes>
        </div>
    );
}

export default Routers;
