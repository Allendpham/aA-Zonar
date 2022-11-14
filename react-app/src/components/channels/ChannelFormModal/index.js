import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ChannelForm from './ChannelForm';

function ChannelFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <button id="create-button" onClick={() => {setShowModal(true)}}>+</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default ChannelFormModal;
