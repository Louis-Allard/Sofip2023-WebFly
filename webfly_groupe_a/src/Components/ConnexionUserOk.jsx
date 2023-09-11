import React,{useState} from 'react'
import Messagerie from './Messagerie';
import Navbar from './Navbar';


function ConnexionUserOk() {
        const [selectedComponent, setSelectedComponent] = useState(null);

    const renderComponent = () => {
        switch (selectedComponent) {
            case "Messagerie":
                return <Messagerie />;
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
export default ConnexionUserOk;