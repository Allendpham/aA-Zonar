import { useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getServerThunk } from '../../store/server';
import ServerSettingsModal from './ServerSettingsModal';
import { loadServerChannelsThunk } from '../../store/channel';
import ChannelFormModal from '../channels/ChannelFormModal';

const ServerIndexItem = () => {
   const dispatch = useDispatch();
   const {serverId} = useParams();
   const singleServer = useSelector(state => state.server.currentServer.server)
   const allChannels = useSelector(state => Object.values(state.channels.allChannels.channels))

   useEffect(()=> {
      dispatch(getServerThunk(serverId))
      dispatch(loadServerChannelsThunk(serverId))
   }, [dispatch])


   if(!singleServer) return null;

   return(
      <div className='server-index-item-wrapper'>
         <h1>Hello from Server {singleServer?.name}</h1>
         <ServerSettingsModal />
         <h2>TEXT CHANNELS
            <ChannelFormModal/>
         </h2>
         <ul>{allChannels.map(ele => (
            <li key={ele.id}>{ele.name}</li>
         ))}</ul>
      </div>
   )
}

export default ServerIndexItem;
