import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import UserPreviewForm from './UserPreview';

function UserPreviewModal({currentServer, user}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="user-preview-wrapper">
      <button id="user-preview-button" onClick={() => {setShowModal(true)}}>{user.username}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserPreviewForm setShowModal={setShowModal} currentServer={currentServer} user={user}/>
        </Modal>
      )}
    </div>
  );
}

export default UserPreviewModal;
