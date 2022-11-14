import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import UpdateChannelForm from './UpdateChannelForm';

function ChannelSettingsModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <button id="channel-settings-button" onClick={() => {setShowModal(true)}}>Channel Settings</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateChannelForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default ChannelSettingsModal;
