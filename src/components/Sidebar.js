// import { Link } from 'react-router-dom';
// import axios from 'axios';
import Collapsible from 'react-collapsible';
import '../scss/_sidebar.scss';
import company from '../img/apartment_FILL0_wght400_GRAD0_opsz48.png';
import user from '../img/person_FILL0_wght400_GRAD0_opsz48.png';
import message from '../img/mail_FILL0_wght400_GRAD0_opsz48.png';
import logout from '../img/logout_FILL0_wght400_GRAD0_opsz48.png';

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
      <div className="responsive">
          <a href="/" className={cls0}><img src={company} alt="company" /></a>
          <a href="/" className={cls1}><img src={user} alt="user" /></a>
          <a href="/" className={cls2}><img src={message} alt="message" /></a>
          <a href="/" className="red"><img src={logout} alt="logout" /></a>
      </div>
    </div>
  );
}

export default Sidebar;