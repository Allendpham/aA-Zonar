import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getChannelThunk, updateChannelThunk, deleteChannelThunk, loadServerChannelsThunk } from '../../../store/channel';

const UpdateChannelForm = ({setShowModal, channelId}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const channels = useSelector(state => state.channel.allChannels)
  const chosenChannel = channels[channelId]

  const [name, setName] = useState(chosenChannel?.name)

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
    let server = await dispatch(updateChannelThunk(payload, channelId))

    if(server){
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


    //Display some type of modal/confirmation message where user has to confirm and input name of server to confirm delete
    dispatch(deleteChannelThunk(channelId))
    setShowModal(false)
    dispatch(loadServerChannelsThunk(chosenChannel.serverId))
    history.push(`/servers/${chosenChannel?.serverId}`)
  }

  return(
    <form className='update-channel-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Channel Name'
        value={name}
        onChange={updateName}/>
      <button type='submit'>Submit</button>
      <button type='button' onClick={handleCancelClick}>Cancel</button>
      <button type='button' onClick={handleDeleteClick}>Delete Channel</button>
    </form>
  )
}

export default UpdateChannelForm
