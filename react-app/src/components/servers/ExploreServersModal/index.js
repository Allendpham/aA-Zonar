import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ExploreServerIndex from './ExploreServerIndex';

function ExploreServersModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="explore-list-wrapper">
      <button id="explore-button" className= 'server-index-create' onClick={() => {setShowModal(true)}}><i className="fa-solid fa-compass"></i>
      <span class="tooltiptext">Explore Public Servers</span>

      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ExploreServerIndex  setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default ExploreServersModal;
