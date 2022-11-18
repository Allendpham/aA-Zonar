import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadServersThunk } from '../../../store/server';
import { Link } from 'react-router-dom';
import ExploreItem from './ExploreItem';
import './index.css'
function ExploreServerIndex({setShowModal}) {
   const dispatch = useDispatch();
   const user = useSelector(state => state.session.user)

   let servers = useSelector(state => Object.values(state.server.allServers));
   servers = servers?.filter(server => server['users'].filter(person => person.id == user.id).length == 0)

   useEffect(() => {
      // dispatch(loadServersThunk())
   }, [dispatch])

   if(!servers.length) return(<h2>Loading...</h2>);
   //Need to filter servers for only servers that the user is a part of
   return (
     <div className="explore-list-wrapper">
      <h2>Find your community on Zonar</h2>
      <p>From gaming, to music, to learning there's a place for you.</p>
       <ul className="explore-list">
       {servers?.map(server => (
               <li key={server?.id}>
                  <ExploreItem server={server}/>
               </li>
            ))}
       </ul>
     </div>
   );
         }

export default ExploreServerIndex
