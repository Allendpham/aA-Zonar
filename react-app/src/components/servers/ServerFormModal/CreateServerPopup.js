import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateItem from './CreateItem';
import './index.css'
import ServerForm from './ServerForm';
function CreateServerPopup({setShowModal}) {
   const dispatch = useDispatch();
   const [formPosition, setPosition ] = useState(1)

   useEffect(() => {
      // dispatch(loadServersThunk())
   }, [dispatch])
   let content;
   let backButton = <button className='create-server-back-button'onClick={()=> setPosition(formPosition -1)}>Back</button>

   switch(formPosition){
    case 1:
        content = (  <div className="create-list-wrapper">
        <h2>Create a server</h2>
        <p>Your server is where you and your friends hang out. Make yours and start talking.</p>
        <CreateItem setPosition={setPosition}formPosition={formPosition}/>
        <div className='create-server-footer'>
          <h4 className='create-server-footer-title'>Have an invite already?</h4>
          <button className='create-server-join'>Join a Server</button>
        </div>
        </div>)
      break
    case 2:
      content = (  <div className="create-list-wrapper">
        <h2>Tell us more about your server</h2>
        <p>In order to help you with your setup, is your new server for just a few friends or a larger community?</p>
        <CreateItem setPosition={setPosition} formPosition={formPosition}/>
        <div className='create-server-footer'>
          {backButton}
        </div>
        </div>)
      break
    case 3:
      content = (  <div className="create-list-wrapper">
        <h2>Customize your server</h2>
        <p>Give your new server a personality with a name and icon. You can always change it later.</p>
        <ServerForm setShowModal={setShowModal}/>
        <div className='create-server-footer'>
        {backButton}
        </div>
        </div>)
      break
    default:
      content = (<h1>Something went wrong</h1>)



   }
   //Need to filter servers for only servers that the user is a part of
   return (
    content
   );
         }

export default CreateServerPopup
