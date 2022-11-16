import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import MessageSettingOptions from './messageSettings';

function MessageSettingModal({message, user}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="message-settings-wrapper">
      <div id="message-settings-button" onClick={(e) => {{setShowModal(true)} e.stopPropagation()}}>User: {message.userId} - {message.message}</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MessageSettingOptions setShowModal={setShowModal} message={message} user={user}/>
        </Modal>
      )}
    </div>
  );
}

export default MessageSettingModal;
