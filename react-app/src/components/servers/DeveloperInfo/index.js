import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DevCard from './DevCard';
import './index.css'

function DeveloperModal() {
  const [showModal, setShowModal] = useState(false);
  const devs = [
    {name: "Allen Pham", img:'https://res.cloudinary.com/degkakjou/image/upload/v1672794180/100661010_ppq9kx.jpg', linkedin: 'https://www.linkedin.com/in/allen-pham/', portfolio:'https://allendpham.github.io/'},
    {name: "Ben Thai", img: 'https://res.cloudinary.com/degkakjou/image/upload/v1672794157/105961078_mohcdk.jpg', linkedin: 'https://www.linkedin.com/in/ben-thai-6a1285127/', portfolio:'https://benties.github.io/'},
    {name: "Brin Hoover", img:'https://res.cloudinary.com/degkakjou/image/upload/v1672794063/IMG_20221211_214931783_processed_brc0di.jpg', linkedin: 'https://www.linkedin.com/in/brin-hoover-6a3584251/', portfolio:'https://brinhoover.com/'},
    {name: "Kyle Solano", img:'https://res.cloudinary.com/degkakjou/image/upload/v1672794182/95837496_utwloy.jpg', linkedin: 'https://www.linkedin.com/in/kylesolano/', portfolio:'https://kylesolano.netlify.app/'}
  ]

  return (
    <div className="explore-list-wrapper">
      <button id="explore-button" className= 'server-index-create' onClick={() => {setShowModal(true)}}><i class="fa-solid fa-people-group"></i>
      <span class="tooltiptext">Meet the devs!</span>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='dev-info-wrapper'>
            <h2>Meet the devs!</h2>
          <div className='dev-card-container'>
            {devs.map(dev => (
              <DevCard dev={dev} />
            ) )}
          </div>
            <div
              className='project-repo-card'
              onClick={()=>  window.open('https://github.com/Allendpham/aA-Zonar')}>
              <img
                  className='repo-image'
                  src='https://res.cloudinary.com/degkakjou/image/upload/v1668750845/Zonar/osDIwkc_xpz4lw.png'
               />
              <h4>Code Repository</h4>
            </div>

          </div>
        </Modal>
      )}
    </div>
  );
}

export default DeveloperModal;
