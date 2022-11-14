import { useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getServerThunk } from '../../store/server';
import ServerSettingsModal from './ServerSettingsModal';

const ServerIndexItem = () => {
   const dispatch = useDispatch();
   const {serverId} = useParams();
   const singleServer = useSelector(state => state.server.currentServer.server)

   useEffect(()=> {
      dispatch(getServerThunk(serverId))
   }, [dispatch])

   if(!singleServer) return null;

   return(
      <div className='server-index-item-wrapper'>
         <h1>Hello from Server {singleServer?.name}</h1>
         <ServerSettingsModal />
      </div>
   )
}

export default ServerIndexItem;
