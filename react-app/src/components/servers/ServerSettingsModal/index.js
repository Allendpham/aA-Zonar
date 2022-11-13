import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import UpdateServerForm from './UpdateServerForm';

function ServerSettingsModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <button id="server-settings-button" onClick={() => {setShowModal(true)}}>Server Settings</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateServerForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default ServerSettingsModal;
