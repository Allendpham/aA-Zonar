import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateServerThunk, getServerThunk, removeServerThunk } from '../../../store/server';

const UpdateServerForm = (setShowModal) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {serverId} = useParams();
  const user = useSelector(state => state.session.user)
  const currServer = useSelector(state => state.server.currentServer)
  const [name, setName] = useState('')
  const [previewImg, setImage] = useState('') //default image
  const updateName = (e) => setName(e.target.value);
  const updateImage = (e) => setImage(e.target.value);

  useEffect(()=>{
    dispatch(getServerThunk(serverId))
  }, [dispatch])

  if(!Object.keys(currServer).length) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ownerId:user.id,
      name,
      preview_img: previewImg
    };
    let server = await dispatch(updateServerThunk(payload))

    if(server){
      setShowModal(false)
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowModal(false)
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();


    //Display some type of modal/confirmation message where user has to confirm and input name of server to confirm delete
    dispatch(removeServerThunk(serverId))
    setShowModal(false)
    history.push('/@me')
  }

  return(
    <form className='server-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Server Image'
        value={currServer.preview_img}
        onChange={updateImage}/>
      <input
        type='text'
        placeholder='Server Name'
        value={currServer.name}
        onChange={updateName}/>
      <button type='submit'>Submit</button>
      <button type='button' onClick={handleCancelClick}>Cancel</button>
      <button type='button' onClick={handleDeleteClick}>Delete Server</button>
    </form>
  )
}

export default UpdateServerForm
