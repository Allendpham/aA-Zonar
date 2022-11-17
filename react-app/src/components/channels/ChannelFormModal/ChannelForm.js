import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createChannelThunk, loadServerChannelsThunk } from '../../../store/channel';

const ChannelForm = ({setShowModal}) => {
  const dispatch = useDispatch()
  const { serverId } = useParams()
  const user = useSelector(state => state.session.user)
  const [name, setName] = useState('')

  const updateName = (e) => setName(e.target.value);


  useEffect(()=>{
  }, [dispatch, user])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      serverId
    };

    let server = await dispatch(createChannelThunk(payload, serverId))

    if(server){
      setShowModal(false)
      dispatch(loadServerChannelsThunk(serverId))
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
  };

  return(
    <form className='channel-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Channel Name'
        value={name}
        onChange={updateName}/>
      <button type='submit'>Submit</button>
      <button type='button' onClick={handleCancelClick}>Cancel</button>
    </form>
  )
}

export default ChannelForm
