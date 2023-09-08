import { Link } from 'react-router-dom';
import axios from 'axios';
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
        <Link className={cls0} to={`/companies`}><span className='navLink'>Entreprises</span></Link>
        <Link className={cls1} to={`/users`}><span className='navLink'>Comptes Utilisateurs</span></Link>
        <Collapsible trigger={<div>Messagerie</div>} transitionTime="50" className={`navLinkA ${cls2}`} openedClassName={`navLinkOpened ${cls2}`}>
          <div className="overflow">
          <Link className="red" to={`/message/0`}><span className='navLinkSubA'>Entreprise A</span></Link>
          <Link className="red" to={`/message/0`}><span className='navLinkSub'>Entreprise B</span></Link>
          </div>
        </Collapsible>
      </div>
      <div className='sidedown'>
        <Link className="red" to={`/logout`}><span className='navLinkLogout'>Déconnection</span></Link>
      </div>
      <div className="responsive">
          <Link className={cls0} to={`/companies`}><img src={company} alt="company" /></Link>
          <Link className={cls1} to={`/users`}><img src={user} alt="user" /></Link>
          <Link className={cls2} to={`/message/0`}><img src={message} alt="message" /></Link>
          <Link className="red" to={`/logout`}><img src={logout} alt="logout" /></Link>
      </div>
    </div>
  );
}

export default Sidebar;