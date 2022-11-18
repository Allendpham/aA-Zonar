import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addServerThunk, loadServersThunk } from '../../../store/server';

const ServerForm = ({setShowModal}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const [name, setName] = useState('')
  const [previewImg, setImage] = useState('') //default image
  const updateName = (e) => setName(e.target.value);
  const updateImage = (e) => setImage(e.target.value);

  useEffect(()=>{
  }, [dispatch, user])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ownerId:user.id,
      name,
      preview_img: previewImg
    };
    let server = await dispatch(addServerThunk(payload))

    if(server){
      setShowModal(false)
      dispatch(loadServersThunk())
    }
  }


  return(
    <form className='server-form' onSubmit={handleSubmit}>
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
      <button className='create-server-submit' type='submit'>Create</button>

    </form>
  )
}

export default ServerForm
