// import { Link } from 'react-router-dom';
// import axios from 'axios';
import Collapsible from 'react-collapsible';
import '../scss/_sidebar.scss'

const Sidebar = (props) => {
  const id = props.id;
  let cls0 = "";
  let cls1 = "";
  let cls2 = "";

  if (id === "0") {
    cls0 = "selected";
  }
  else if (id === "1") {
    cls1 = "selected";
  }
  else if (id === "2") {
    cls2 = "selected";
  }


  return (
    <div className="sidebarleft">
      <div className='sideleft'>
        <a href="/" className={cls0}><span className='navLink'>Entreprises</span></a>
        <a href="/" className={cls1}><span className='navLink'>Comptes Utilisateurs</span></a>
        <Collapsible trigger={<div>Messagerie</div>} transitionTime="50" className={`navLinkA ${cls2}`} openedClassName={`navLinkOpened ${cls2}`}>
          <div className="overflow">
            <a href="/" className="red"><span className='navLinkSubA'>Entreprise A</span></a>
            <a href="/" className="red"><span className='navLinkSub'>Entreprise B</span></a>
            <a href="/" className="red"><span className='navLinkSub'>Entreprise C</span></a>
            <a href="/" className="red"><span className='navLinkSub'>Entreprise D</span></a>
            <a href="/" className="red"><span className='navLinkSub'>Entreprise E</span></a>
            <a href="/" className="red"><span className='navLinkSub'>Entreprise F</span></a>
            <a href="/" className="red"><span className='navLinkSub'>Entreprise G</span></a>
            <a href="/" className="red"><span className='navLinkSub'>Entreprise H</span></a>
            <a href="/" className="red"><span className='navLinkSub'>Entreprise I</span></a>
            <a href="/" className="red"><span className='navLinkSub'>Entreprise J</span></a>
          </div>
        </Collapsible>
      </div>
      <div className='sidedown'>
        <a href="/" className="red"><span className='navLinkLogout'>Déconnection</span></a>
        {/* <Link className="routNav" to={`http://localhost:3000/market`}><span className='isConnected'>Messagerie</span></Link>
        <Link className="routNav" to={`http://localhost:3000/openwork`}><span className='isConnected'>Entreprises</span></Link>
        <Link className="routNav" to={`http://localhost:3000/friends/#`}><span className='isConnected'>Comptes Utilisateurs</span></Link>
        <Link className="routNav" to={`http://localhost:3000/ded`}>Déconnexion</Link> */}
      </div>
    </div>
  );
}

export default Sidebar;