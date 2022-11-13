import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadServersThunk } from '../../store/server';
import ServerFormModal from './ServerFormModal';
import ServerIndexItem from './ServerIndexItem';
import { Link } from 'react-router-dom';

function ServersIndex() {
   const dispatch = useDispatch();
   let servers = useSelector(state => Object.values(state.server.allServers));
   console.log(servers)
   useEffect(() => {
      dispatch(loadServersThunk())
   }, [dispatch])

   if(!servers.length) return(<h2>Loading...</h2>);
   //Need to filter servers for only servers that the user is a part of
   return(
      <div className='server-index-wrapper'>
         <ul className='servers-list-wrapper'>
            {servers?.map(server => (
               <li key={server.id}>
                  {server.name}
                  {/* <ServerIndexItem key={server.id} server={server}> */}
                  {/* <Link className='server-links' to={`/servers/${server.id}`}><img src=server.preview_img className='server-index-imgs'></Link> */}
               </li>
            ))}
         </ul>

         <ServerFormModal />
         <div><button>Explore Servers</button></div>
      </div>
   );
}

export default ServersIndex
