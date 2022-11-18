import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import UpdateServerForm from './UpdateServerForm';
import { useDispatch, useSelector } from 'react-redux';

function ServerSettingsModal() {
  const [showModal, setShowModal] = useState(false);
  const [clicked, setClicked] = useState(false)
  const currServer = useSelector(state => state.server.currentServer.server)
  let clickImage;
  const click = () =>{
    setShowModal(!showModal)
    setClicked(!clicked)
  }
  clicked? clickImage = <i class="fa-solid fa-x"></i>:clickImage = <i class="fa-solid fa-angle-down"></i>

  return (
    <div className="">
      <button id="server-settings-button" onClick={() => {click()}}><p>{currServer?.name}</p>{clickImage}</button>
      {showModal && (
        // <Modal onClose={() => setShowModal(false)}>
          <UpdateServerForm setShowModal={setShowModal}/>
        // {/* </Modal> */}
      )}
    </div>
  );
}

export default ServerSettingsModal;
