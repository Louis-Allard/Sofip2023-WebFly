// import { Link } from 'react-router-dom';
// import axios from 'axios';
import Collapsible from 'react-collapsible';
import '../scss/_sidebar.scss'

function Sidebar() {
  return (
    <div className="sidebarleft">
      <div className='sideleft'>
        <a href="/"><span className='navLink'>Entreprises</span></a>
        <a href="/"><span className='navLink'>Comptes Utilisateurs</span></a>
        <Collapsible trigger="Messagerie" transitionTime="50" className="navLinkA" openedClassName="navLinkOpened">
          <div className="overflow">
            <a href="/"><span className='navLinkSubA'>Entreprise A</span></a>
            <a href="/"><span className='navLinkSub'>Entreprise B</span></a>
            <a href="/"><span className='navLinkSub'>Entreprise C</span></a>
            <a href="/"><span className='navLinkSub'>Entreprise D</span></a>
            <a href="/"><span className='navLinkSub'>Entreprise E</span></a>
            <a href="/"><span className='navLinkSub'>Entreprise F</span></a>
            <a href="/"><span className='navLinkSub'>Entreprise G</span></a>
            <a href="/"><span className='navLinkSub'>Entreprise H</span></a>
            <a href="/"><span className='navLinkSub'>Entreprise I</span></a>
            <a href="/"><span className='navLinkSub'>Entreprise J</span></a>
          </div>
        </Collapsible>
      </div>
      <div className='sidedown'>
        <a href="/"><span className='navLinkLogout'>Déconnexion</span></a>
        {/* <Link className="routNav" to={`http://localhost:3000/market`}><span className='isConnected'>Messagerie</span></Link>
        <Link className="routNav" to={`http://localhost:3000/openwork`}><span className='isConnected'>Entreprises</span></Link>
        <Link className="routNav" to={`http://localhost:3000/friends/#`}><span className='isConnected'>Comptes Utilisateurs</span></Link>
        <Link className="routNav" to={`http://localhost:3000/ded`}>Déconnexion</Link> */}
      </div>
    </div>
  );
}

export default Sidebar;