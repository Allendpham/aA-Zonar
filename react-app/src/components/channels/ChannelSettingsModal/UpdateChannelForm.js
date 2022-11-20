import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getChannelThunk, updateChannelThunk, deleteChannelThunk, loadServerChannelsThunk } from '../../../store/channel';
import './index.css'
const UpdateChannelForm = ({setShowModal, channelId}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const channels = useSelector(state => state.channel.allChannels)
  const chosenChannel = channels[channelId]
  const [errors, setErrors] = useState([]);

  const [name, setName] = useState(chosenChannel?.name)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const updateName = (e) => setName(e.target.value);


  // useEffect(()=>{
  //   dispatch(getServerThunk(serverId))
  // }, [dispatch])

  if(!chosenChannel) return null;


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      serverId: chosenChannel.serverId
    };
    let channel = await dispatch(updateChannelThunk(payload, channelId))
    if(channel.errors){
      setErrors(channel.errors)
      return
    }
    if(channel){
      setShowModal(false)
    }
    dispatch(loadServerChannelsThunk(chosenChannel.serverId))
    dispatch(getChannelThunk(chosenChannel.id))
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowModal(false)
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    if(!confirmDelete){
      alert(`Deleting this channel will remove all access to past messages.\nPlease click the DELETE button again to confirm.`)
      setConfirmDelete(true)
      return
    }

    //Display some type of modal/confirmation message where user has to confirm and input name of server to confirm delete
    dispatch(deleteChannelThunk(channelId))
    setShowModal(false)
    dispatch(loadServerChannelsThunk(chosenChannel.serverId))
    history.push(`/servers/${chosenChannel?.serverId}`)
  }

  return(
    <form className='update-channel-form' onSubmit={handleSubmit}>
            <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      <input
        type='text'
        placeholder='Channel Name'
        value={name}
        onChange={updateName}/>
      <button type='submit'>Submit</button>
      {/* <button type='button' onClick={handleCancelClick}>Cancel</button> */}
      <button type='button' id='update-channel-delete' onClick={handleDeleteClick}>Delete Channel</button>
    </form>
  )
}

export default UpdateChannelForm
