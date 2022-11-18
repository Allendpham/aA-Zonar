import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ServerForm from './ServerForm';
import './index.css'
import CreateServerPopup from './CreateServerPopup';
function ServerFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div >
      <button className="server-index-create" onClick={() => {setShowModal(true)}}><i className="fa-solid fa-plus"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateServerPopup setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default ServerFormModal;
