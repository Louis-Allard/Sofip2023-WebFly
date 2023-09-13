import { Link } from 'react-router-dom';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import MessageBoard from './MessageBoard';
import '../scss/_sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setBoard } from '../reducers';
import '../scss/_deletemodal.scss';
import logo from '../img/logo.png';
import company from '../img/apartment_FILL0_wght400_GRAD0_opsz48.png';
import user from '../img/person_FILL0_wght400_GRAD0_opsz48.png';
import message from '../img/mail_FILL0_wght400_GRAD0_opsz48.png';
import logout from '../img/logout_FILL0_wght400_GRAD0_opsz48.png';

import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Sidebar = (props) => {
  const id = props.id;
  const dispatch = useDispatch();
  const display = useSelector((state) => state.Reducers.boardOpen);
  const url = window.location.href;
  let cls0 = "";
  let cls1 = "";
  let cls2 = "";

  if (id === "0") {
    cls0 = "selected";
  }
  else if (id === "1") {
    cls1 = "selected";
  }
  else if (display) {
    cls2 = "selected";
  }

  const setBoardOpen = () => {
    if (url === 'http://localhost:3000/dashboard') {
      dispatch(setBoard(true));
      join()
    }
  };
  const join = () => {
      socket.emit('join_conversation', props.iduser);
  }

  const disconnect = () =>{
    socket.emit("disconnect")
  }
  const setBoardClosed = () => {
      dispatch(setBoard(false));
      disconnect()
  }

  return (
    <>
      <div className="sidebarleft">
        <div className='sideleft'>
          <Link className="logo" to={`/dashboard`} onClick={setBoardClosed}><img src={logo} alt="logo" /></Link>
          <Link className={cls0} to={`/companies`} onClick={setBoardClosed}><span className='navLink'>Entreprises</span></Link>
          <Link className={cls1} to={`/users`} onClick={setBoardClosed}><span className='navLink'>Comptes Utilisateurs</span></Link>
          <Collapsible trigger={<div>Messagerie</div>} transitionTime="50" className={`navLinkA ${cls2}`} openedClassName={`navLinkOpened ${cls2}`} onOpening={setBoardOpen} onClosing={setBoardClosed}>
            <div className="overflow">
              {/* <Link className="red" to={`/message/0`}><span className='navLinkSubA'>Entreprise A</span></Link>
              <Link className="red" to={`/message/0`}><span className='navLinkSub'>Entreprise B</span></Link> */}
            </div>
          </Collapsible>
        </div>
        <div className='sidedown'>
          <Link className="red" to={`/logout`} onClick={setBoardClosed}><span className='navLinkLogout'>Déconnection</span></Link>
        </div>
        <div className="responsive">
          <Link className="logo" to={`/dashboard`} onClick={setBoardClosed}><img src={logo} alt="logo" /></Link>
          <Link className={cls0} to={`/companies`}><img src={company} alt="company" /></Link>
          <Link className={cls1} to={`/users`}><img src={user} alt="user" /></Link>
          <Link className={cls2} to={`/dashboard`} onClick={setBoardOpen}><img src={message} alt="message" /></Link>
          <Link className="red" to={`/logout`}><img src={logout} alt="logout" /></Link>
        </div>
      </div>
      {display && <MessageBoard iduser={props.iduser}/>}
    </>
  );
}

export default Sidebar;