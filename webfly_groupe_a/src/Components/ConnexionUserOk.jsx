import React,{useState} from 'react'
import Messagerie from './Messagerie';
import Navbar from './Navbar';
import ListeMessage from './ListeMessage';


function ConnexionUserOk() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [showMessagerie, setShowMessagerie] = useState(false);
    
    const renderComponent = () => {
        if (showMessagerie) {
            return <Messagerie setShowMessagerie={setShowMessagerie}  />;
        } else {
            switch (selectedComponent) {
                case "Messagerie":
                    return <ListeMessage setShowMessagerie={setShowMessagerie} />;
                default:
                    return null;
            }
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