import React, { useState, useEffect } from 'react';
import { Modal } from '../../../context/Modal';
import UpdateServerForm from './UpdateServerForm';
import { useDispatch, useSelector } from 'react-redux';

function ServerSettingsModal() {
  const [showMenu, setShowMenu] = useState(false);
  const [clicked, setClicked] = useState(false)
  const currServer = useSelector(state => state.server.currentServer.server)
  let clickImage;
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  
  const click = () =>{
    setShowMenu(!showMenu)
    setClicked(!clicked)
  }
  clicked? clickImage = <i className="fa-solid fa-x"></i>:clickImage = <i className="fa-solid fa-angle-down"></i>

  return (
    <div className="">
      <button id="server-settings-button" onClick={() => {click()}}><p>{currServer?.name}</p>{clickImage}</button>
      {showMenu && (
          <UpdateServerForm setShowMenu={setShowMenu}/>
      )}
    </div>
  );
}

export default ServerSettingsModal;
