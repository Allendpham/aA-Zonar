import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import MessageSettingOptions from './messageSettings';

function MessageSettingModal({message, user,users, populateSocket, chat}) {
  const [showModal, setShowModal] = useState(false);
  const poster = Object.values(users).find(member => member.id == message?.userId)

  return (
    <div className="message-settings-wrapper">
      <div id="message-settings-button" onClick={() => {setShowModal(true)}}>{poster?.username} - {message?.message}</div>
      {showModal && (
        <Modal onClose={() => setShowModal()}>
          <MessageSettingOptions populateSocket={populateSocket} setShowModal={setShowModal} message={message} user={user} chat={chat}/>
        </Modal>
      )}
    </div>
  );
}

export default MessageSettingModal;
