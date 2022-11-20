import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../../../context/Modal';
import UpdateServerForm from './UpdateServerForm';
import { useDispatch, useSelector } from 'react-redux';

function ServerSettingsModal() {
  const [showMenu, setShowMenu] = useState(false);
  const [clicked, setClicked] = useState(false)
  const currServer = useSelector(state => state.server.currentServer.server)
  const servMenu = useRef(null)
  let clickImage;
  const closeOpenMenus = (e)=>{
    if(servMenu.current && showMenu && !servMenu.current.contains(e.target)){
      setShowMenu(false)
      setClicked(false)
    }
}

  useEffect(() => {
    document.addEventListener('click', closeOpenMenus);
    return () => document.removeEventListener("click", closeOpenMenus);
  }, [showMenu]);

  const click = () =>{
    setShowMenu(!showMenu)
    setClicked(!clicked)
  }
  clicked? clickImage = <i className="fa-solid fa-x"></i>:clickImage = <i className="fa-solid fa-angle-down"></i>

  return (
    <div ref={servMenu} className="">
      <button id="server-settings-button" onClick={() => {click()}}><p>{currServer?.name}</p>{clickImage}</button>
      {showMenu && (
          <UpdateServerForm setShowMenu={setShowMenu} setClicked={setClicked}/>
      )}
    </div>
  );
}

export default ServerSettingsModal;
