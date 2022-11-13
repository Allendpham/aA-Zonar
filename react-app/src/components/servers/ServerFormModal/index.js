import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ServerForm from './ServerForm';

function ServerFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <button id="create-button" onClick={() => {setShowModal(true)}}>Create</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ServerForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default ServerFormModal;
