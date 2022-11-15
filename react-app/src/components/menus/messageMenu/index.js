import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import MessageSettingOptions from './messageSettings';

function MessageSettingModal({message, user}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="message-settings-wrapper">
      <button id="message-settings-button" onMouseOver={() => {setShowModal(true)}}>{message.user}: {message.msg}</button>
      {showModal && (
        <Modal onMouseOut={() => setShowModal(false)}>
          <MessageSettingOptions setShowModal={setShowModal} message={message} user={user}/>
        </Modal>
      )}
    </div>
  );
}

export default MessageSettingModal;
