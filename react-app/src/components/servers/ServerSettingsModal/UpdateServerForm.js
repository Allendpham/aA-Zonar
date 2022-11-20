import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateServerThunk, getServerThunk, removeServerThunk, loadServersThunk } from '../../../store/server';
import ErrorDisplay from '../../auth/ErrorDisplay';
import './index.css'
const UpdateServerForm = ({setShowMenu, setClicked, update = null}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {serverId} = useParams();
  const user = useSelector(state => state.session.user)
  const currServer = useSelector(state => state.server.currentServer.server)
  const [name, setName] = useState(currServer?.name)
  const [previewImg, setImage] = useState(currServer?.preview_img) //default image
  const [showSettings, setShowSettings] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [errors, setErrors] = useState([]);

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
    if(server.errors){
      setErrors(server.errors)
      return
    }
    if(server){
      setClicked(false)
      setShowMenu(false)
    }
    dispatch(getServerThunk(serverId))
    dispatch(loadServersThunk())
  }


  const handleDeleteClick = async  (e) => {
    e.preventDefault();
    if(!confirmDelete){
      alert(`Deleting this server will remove all access to all channels and past messages.\nPlease click the DELETE button again to confirm.`)
      setConfirmDelete(true)
      return
    }

    //Display some type of modal/confirmation message where user has to confirm and input name of server to confirm delete
    await dispatch(removeServerThunk(serverId))
    setShowMenu(false)
    setClicked(false)
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

  const exitImage = <img id='exit-image'src='https://res.cloudinary.com/degkakjou/image/upload/v1668832853/Zonar/exiticon-removebg-preview_o5r0hu.png'/>

  return(
    <div className='server-dropdown'>
    {user.id === currServer.ownerId &&
    <button
      className='update-form-button'
      onClick={()=>{setShowSettings(!showSettings)}}
      ><p>Server Settings</p> <i className="fa-solid fa-gear"></i></button>
    }
    {showSettings &&
      <form className='update-form' onSubmit={handleSubmit}>
      <div>
      <ErrorDisplay id={'server-error-list'} errors={errors}/>
        </div>
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
      (<button className='update-form-button delete-server' type='button' onClick={handleDeleteClick}><p>Delete Server</p>{exitImage}</button>)
      }
      {user.id !== currServer.ownerId &&
      (<button className='update-form-button delete-server'type='button' onClick={handleLeaveClick}><p>Leave Server</p>{exitImage}</button>)
      }
    </div>
  )
}

export default UpdateServerForm
