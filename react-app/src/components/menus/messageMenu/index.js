import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import MessageSettingOptions from './messageSettings';

function MessageSettingModal({message, user, populateSocket, chat}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="message-settings-wrapper">
      <div id="message-settings-button" onClick={() => {setShowModal(true)}}>User: {message?.userId} - {message?.message}</div>
      {showModal && (
        <Modal onClose={() => setShowModal()}>
          <MessageSettingOptions populateSocket={populateSocket} setShowModal={setShowModal} message={message} user={user} chat={chat}/>
        </Modal>
      )}
    </div>
  );
}

export default MessageSettingModal;
