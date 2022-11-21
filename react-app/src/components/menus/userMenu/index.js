import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import { Modals } from '../../../context/userMenuModal';
import UserPreviewForm from './UserPreview';
import './userMenu.css'
import { useSelector } from 'react-redux';
import { getServerThunk } from '../../../store/server';

function UserPreviewModal({currentServer, user}) {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);

  let isOwner
  let isAdmin
  useEffect(() => {
    dispatch(getServerThunk(currentServer.id))
  },[])

  currentServer.ownerId === user.id ? isOwner = '👑' : isOwner = null
  for(const admins of currentServer.admins){
    if(admins.id === user.id) {
      isAdmin = '🔹'
    }
  }

  return (
    <div className="user-preview-wrapper">
      <button id="user-preview-button" onClick={() => {setShowModal(true)}}>
        <img id='member-list-icon' src={user.profile_pic}/>
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
