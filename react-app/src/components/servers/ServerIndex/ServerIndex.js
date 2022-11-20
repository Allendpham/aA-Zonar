import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { clearServer, getServerThunk, loadServersThunk } from '../../../store/server';
import ServerFormModal from '../ServerFormModal';
import { Link, useHistory } from 'react-router-dom';
import ExploreServersModal from '../ExploreServersModal';
import ServerIndexItem from './ServerIndexItem';
import './index.css'
import { clearChannel } from '../../../store/channel';

function ServerIndex() {
   const dispatch = useDispatch();
   const history = useHistory()
   const user = useSelector(state => state.session.user)
   let servers = useSelector(state => state.server.allServers);
   servers = Object.values(servers).filter(server => server.users?.filter(person => person.id == user.id).length >= 1)
   useEffect(() => {
      dispatch(loadServersThunk())
   }, [dispatch])

   const goHome=()=>{
      dispatch(clearServer())
      dispatch(clearChannel())
      history.push(`/@me`)
   }
   return(
      <div className='server-index-wrapper'>
         <ul className='servers-list-wrapper'>
               <input
                  id='home-button'
                  className='server-index-item'
                  type='image'
                  src='https://res.cloudinary.com/degkakjou/image/upload/v1668750845/Zonar/osDIwkc_xpz4lw.png'
                  onClick={()=> goHome()}
               >
               </input>

            <div className='bar-split'></div>
            {servers?.map(server => (
               <li key={server?.id}>
                  <ServerIndexItem server={server}/>
               </li>
            ))}
         <div className='bar-split'></div>

         <li>
         <ServerFormModal />
         </li>
         <li>
         <ExploreServersModal />
         </li>
         </ul>


      </div>
   );
}

export default ServerIndex
