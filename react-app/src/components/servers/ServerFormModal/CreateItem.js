import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServerThunk, loadServersThunk } from '../../../store/server';
import { useHistory } from 'react-router-dom';

function CreateItem({setShowModal, setPosition, formPosition}) {
  const dispatch = useDispatch();
  useEffect(() => {
  }, [])
const nextbutton = <img id='create-next-button'src='https://res.cloudinary.com/degkakjou/image/upload/v1668738865/Zonar/server_modal_arrow_towgkb.png'/>

let content;
switch(formPosition){
  case 1:

    content =   (<div className="create-item">
                  <button
                  className="create-links"
                  onClick={()=> setPosition(formPosition + 1)}
                  ><img className='create-link-image'src='https://res.cloudinary.com/degkakjou/image/upload/v1668738865/Zonar/server_create_pjx953.png'/><p>Create Your Own</p>{nextbutton}</button>
                  </div>)
    break
  case 2:
    content =   (<div className="create-item">
                    <button
                      className="create-links"
                      onClick={()=> setPosition(formPosition + 1)}
                    ><img className='create-link-image'src='https://res.cloudinary.com/degkakjou/image/upload/v1668738865/Zonar/private_server_aektdu.png'/><p>For a club or community</p>{nextbutton}
                    </button>
                    <button
                      className="create-links"
                      onClick={()=> setPosition(formPosition + 1)}
                      ><img className='create-link-image'src='https://res.cloudinary.com/degkakjou/image/upload/v1668738865/Zonar/public_server_dydel8.png'/><p>For me and my friends</p>{nextbutton}
                    </button>
                    </div>
    )
    break
  default:
    content = <h1>Something went wrong</h1>
    break
}


  return (
   content
  );
}

export default CreateItem
