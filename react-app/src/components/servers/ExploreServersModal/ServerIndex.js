import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadServersThunk } from '../../../store/server';
import { Link } from 'react-router-dom';

function ServerIndex() {
   const dispatch = useDispatch();
   let servers = useSelector(state => Object.values(state.server.allServers));

   useEffect(() => {
      dispatch(loadServersThunk())
   }, [dispatch])

   if(!servers.length) return(<h2>Loading...</h2>);
   //Need to filter servers for only servers that the user is a part of
   return(
      <div className='server-index-wrapper'>
         <ul className='servers-list-wrapper'>
            {servers?.map(server => (
               <li key={server?.id}>
                  {/* {server?.name} */}
                  {/* <ServerIndexItem key={server.id} /> */}
                  <Link className='server-links' to={`/servers/${server.id}`}>{server.name}</Link>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default ServerIndex
