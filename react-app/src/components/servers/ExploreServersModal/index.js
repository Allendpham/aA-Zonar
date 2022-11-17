import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ServerIndex from './ServerIndex';

function ExploreServersModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <button id="explore-button" className= 'server-index-create' onClick={() => {setShowModal(true)}}><i class="fa-solid fa-compass"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ServerIndex setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default ExploreServersModal;
