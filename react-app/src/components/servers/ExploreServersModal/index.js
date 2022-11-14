import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ServerIndex from './ServerIndex';

function ExploreServersModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <button id="explore-button" onClick={() => {setShowModal(true)}}>Explore Servers</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ServerIndex setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default ExploreServersModal;
