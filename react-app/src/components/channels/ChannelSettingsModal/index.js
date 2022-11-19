import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import UpdateChannelForm from './UpdateChannelForm';

function ChannelSettingsModal({channelId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div >
      <button id="channel-settings-button" className={`channel-settings${channelId}`} onClick={() => {setShowModal(true)}}><i className="fa-solid fa-gear"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateChannelForm setShowModal={setShowModal} channelId={channelId}/>
        </Modal>
      )}
    </div>
  );
}

export default ChannelSettingsModal;
