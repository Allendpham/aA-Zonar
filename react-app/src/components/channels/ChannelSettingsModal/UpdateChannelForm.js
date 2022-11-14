import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getChannelThunk, updateChannelThunk, deleteChannelThunk, loadServerChannelsThunk } from '../../../store/channel';

const UpdateChannelForm = ({setShowModal}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const channel = useSelector(state => state.currentChannel.channel)

  const [name, setName] = useState(channel?.name)

  const updateName = (e) => setName(e.target.value);


  // useEffect(()=>{
  //   dispatch(getServerThunk(serverId))
  // }, [dispatch])

  if(!channel) return null;


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name
    };
    let server = await dispatch(updateChannelThunk(payload, channel.id))

    if(server){
      setShowModal(false)
    }
    dispatch(getChannelThunk(channel.id))
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowModal(false)
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();


    //Display some type of modal/confirmation message where user has to confirm and input name of server to confirm delete
    dispatch(deleteChannelThunk(channel.id))
    setShowModal(false)
    dispatch(loadServerChannelsThunk())
    history.push(`/servers/${channel.serverId}`)
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
      <button type='button' onClick={handleDeleteClick}>Delete Server</button>
    </form>
  )
}

export default UpdateChannelForm
