import { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getServerThunk, loadServersThunk } from '../../store/server';
import ServerSettingsModal from './ServerSettingsModal';
import { loadServerChannelsThunk, getChannelThunk } from '../../store/channel';
import ChannelFormModal from '../channels/ChannelFormModal';
import ChannelSettingsModal from '../channels/ChannelSettingsModal';
import Chat from '../chat';
import UsersList from '../users/usersList';
import { getChannelMessagesThunk } from '../../store/message';

const ServerIndexItem = () => {
   const dispatch = useDispatch();
   const {serverId} = useParams();
   const servers = useSelector(state => Object.values(state.server.allServers))
   const singleServer = useSelector(state => state.server.currentServer.server)
   const allChannels = useSelector(state => Object.values(state.channel.allChannels))
   const singleChannel = useSelector(state => state.channel?.currentChannel)
   // const channel_messages = useSelector(state => (Object.values(state.message), () => true))
   const currUser = useSelector(state => state.session.user)
   let content;

   useEffect(()=> {
      dispatch(getServerThunk(serverId))
      dispatch(loadServerChannelsThunk(serverId))
   }, [dispatch, serverId])

   useEffect(() => {
      dispatch(loadServersThunk())
   }, [dispatch])

   const showChannel = (channel) => {
      dispatch(getChannelThunk(channel.id))
   }


   singleChannel && singleChannel?.channel?.serverId == serverId ?
   content = (<div>Single Channel: {singleChannel.channel.name} <Chat channelId={singleChannel.channel.id}/> </div>): content=(<div></div>)

   if(!singleServer) {
      return null;
   }
   let addChannel;
   currUser?.id == singleServer.ownerId ||
      singleServer.admins.filter(user=> user.id == currUser?.id).length ?
         addChannel = <ChannelFormModal/> :
            addChannel = <div></div>
   return(
      <div className='server-index-item-wrapper'>
         <h1>Hello from Server {singleServer?.name}</h1>
         <ul className='servers-list-wrapper'>
            {servers?.map(server => (
               <li key={server?.id}>
                  {/* {server?.name} */}
                  {/* <ServerIndexItem key={server.id} /> */}
                  <Link className='server-links' to={`/servers/${server.id}`} onClick={() => dispatch(getServerThunk(server.id))}>{server.name}</Link>
               </li>
            ))}
         </ul>
         <ServerSettingsModal />
         <h2>TEXT CHANNELS
            {/* <ChannelFormModal/> */}
            {addChannel}
         </h2>
         <ul>{allChannels?.map(ele => (
            <li key={ele.id} onClick={() => showChannel(ele)}>{ele.name}<ChannelSettingsModal channelId={ele?.id}/></li>
         ))}</ul>
         {content}
         <UsersList currentServer={singleServer}/>
      </div>
   )
}

export default ServerIndexItem;
