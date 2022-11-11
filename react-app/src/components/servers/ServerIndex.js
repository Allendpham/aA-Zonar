import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadServersThunk } from '../../store/server';

function ServersIndex() {
   const dispatch = useDispatch();
   let servers = useSelector(state => Object.values(state.server.allServers));
   console.log(servers)
   useEffect(() => {
      dispatch(loadServersThunk())
   }, [dispatch])

   if(!servers.length) return(<h2>Loading...</h2>);

   return(
      <div className='server-index-wrapper'>
         <ul className='servers-list-wrapper'>
            {servers?.map(server => (
               <li key={server.id}>
                  {server.name}
                  {/* <ServerIndexItem key={server.id} server={server}> */}
               </li>
            ))}
         </ul>

         <div><button>Create a Server</button></div>
         <div><button>Explore Servers</button></div>
      </div>
   );
}

export default ServersIndex
