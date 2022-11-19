import React, { useState } from 'react';
import { Modals } from '../../../context/userMenuModal';
import UserPreviewForm from './UserPreview';
import './userMenu.css'

function UserPreviewModal({currentServer, user}) {
  const [showModal, setShowModal] = useState(false);

  let isOwner
  currentServer.ownerId === user.id ? isOwner = 'Crown' : isOwner = null

  let isAdmin
  for(const admins of currentServer.admins){
    if(admins.id === user.id) {
      isAdmin = 'admin'
    }
  }


  return (
    <div className="user-preview-wrapper">
      <button id="user-preview-button" onClick={() => {setShowModal(true)}}>
        <p id='user-butt-text'>
          {user.username} {isOwner} {isAdmin}
        </p>
      </button>
      {showModal && (
        <Modals onClose={() => setShowModal(false)}>
          <UserPreviewForm setShowModal={setShowModal} currentServer={currentServer} user={user}/>
        </Modals>
      )}
    </div>
  );
}

export default UserPreviewModal;
