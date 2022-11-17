import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ServerForm from './ServerForm';
import './index.css'
function ServerFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <button className="server-index-create" onClick={() => {setShowModal(true)}}><i class="fa-solid fa-plus"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ServerForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default ServerFormModal;
