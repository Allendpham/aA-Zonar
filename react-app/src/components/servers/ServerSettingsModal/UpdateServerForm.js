import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateServerThunk, getServerThunk, removeServerThunk, loadServersThunk } from '../../../store/server';
import './index.css'
const UpdateServerForm = ({setShowModal, update = null}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {serverId} = useParams();
  const user = useSelector(state => state.session.user)
  const currServer = useSelector(state => state.server.currentServer.server)
  const [name, setName] = useState(currServer?.name)
  const [previewImg, setImage] = useState(currServer?.preview_img) //default image
  const [showSettings, setShowSettings] = useState(false)
  const updateName = (e) => setName(e.target.value);
  const updateImage = (e) => setImage(e.target.value);
  useEffect(()=>{
    dispatch(loadServersThunk())

  }, [dispatch])

  if(!currServer) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      serverId: serverId,
      ownerId:user.id,
      name,
      preview_img: previewImg
    };
    let server = await dispatch(updateServerThunk(payload, serverId))

    if(server){
      setShowModal(false)
    }
    dispatch(getServerThunk(serverId))
    dispatch(loadServersThunk())
  }

  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   setShowModal(false)
  // };

  const handleDeleteClick = async  (e) => {
    e.preventDefault();


    //Display some type of modal/confirmation message where user has to confirm and input name of server to confirm delete
    await dispatch(removeServerThunk(serverId))
    setShowModal(false)
    dispatch(loadServersThunk())
    history.push('/@me')
  }

  const handleLeaveClick = async (e) => {
    e.preventDefault()

    const leave_server = await fetch(`/api/servers/${currServer.id}/users`)
    dispatch(loadServersThunk());
    history.push("/@me");
    return leave_server
  }

  const exitImage = <img id='exit-image'src='https://res.cloudinary.com/degkakjou/image/upload/v1668802855/Zonar/exiticon_bkbhme.png'/>

  return(
    <div className='server-dropdown'>
    <button
      className='update-form-button'
      onClick={()=>{setShowSettings(!showSettings)}}
      ><p>Server Settings</p> <i className="fa-solid fa-gear"></i></button>
    {showSettings &&
      <form className='update-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Server Image'
        value={previewImg}
        onChange={updateImage}/>
      <input
        type='text'
        placeholder='Server Name'
        value={name}
        onChange={updateName}/>
      <button type='submit'>Submit</button>
      {/* <button type='button' onClick={handleCancelClick}>Cancel</button> */}
    </form>}
      {user.id === currServer.ownerId &&
      (<button className='update-form-button' type='button' onClick={handleDeleteClick}><p>Delete Server</p>{exitImage}</button>)
      }
      {user.id !== currServer.ownerId &&
      (<button className='update-form-button delete-server'type='button' onClick={handleLeaveClick}><p>Leave Server</p>{exitImage}</button>)
      }
    </div>
  )
}

export default UpdateServerForm
