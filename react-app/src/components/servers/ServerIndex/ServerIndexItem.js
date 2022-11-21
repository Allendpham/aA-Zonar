import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link, useHistory} from 'react-router-dom';
import { getServerThunk, loadServersThunk } from '../../../store/server';
import './index.css'

function ServerIndexItem({server}) {
   const history = useHistory()
   const dispatch = useDispatch();
   const [clicked, setClicked] = useState(false)
   const bg_img = server.preview_img? server.preview_img:null
   const intials = server?.name.split(' ').map(word => word[0]).join('').slice(0,3)
   useEffect(() => {
    // dispatch(loadServersThunk())
   }, [dispatch])

  const goToServer = () =>{
    dispatch(getServerThunk(server.id))
    setClicked(true)
    setTimeout(()=>{
      setClicked(false)
    }, 200)
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
    onClick={()=> goToServer()}
    disabled={clicked}

    >
    {intials}
    </button>

   );
}

export default ServerIndexItem
