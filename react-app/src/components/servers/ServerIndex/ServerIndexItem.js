import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory} from 'react-router-dom';
import { getServerThunk, loadServersThunk } from '../../../store/server';
import './index.css'

function ServerIndexItem({server}) {
   const history = useHistory()
   const dispatch = useDispatch();
   const bg_img = server.preview_img? server.preview_img:null
   var isAlpha = function(ch){
    return /^[A-Z]$/i.test(ch);
  }
   const intials = server?.name.split(' ').map(word => word[0]).join('').slice(0,3)
   useEffect(() => {
    // dispatch(loadServersThunk())
   }, [dispatch])

  const goToServer = () =>{
    dispatch(getServerThunk(server.id))
    history.push(`/servers/${server.id}`)
  }
  if(bg_img){
    return(
      <input
        className='server-index-item'
        type='image'
        src={bg_img}
        onClick={()=> goToServer()}
      />
    )
  }
   return(
    <button
    className='server-index-item'
    onClick={()=> goToServer()}>
    {intials}
    </button>

   );
}

export default ServerIndexItem
