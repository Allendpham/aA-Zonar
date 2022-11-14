import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import UpdateChannelForm from './UpdateChannelForm';

function ChannelSettingsModal({channelId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="channel-settings-wrapper">
      <button id="channel-settings-button" onClick={() => {setShowModal(true)}}>Channel Settings</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateChannelForm setShowModal={setShowModal} channelId={channelId}/>
        </Modal>
      )}
    </div>
  );
}

export default ChannelSettingsModal;
