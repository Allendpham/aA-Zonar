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
import '../chat/chat.css'

const ServerPage = () => {
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
   }, [dispatch, serverId])

   const showChannel = (channel) => {

      dispatch(getChannelThunk(channel.id))
   }


   singleChannel && singleChannel?.channel?.serverId == serverId
     ? (content = (
         <div className="server-parent">
           <div className="server-title">
             <h3>#{singleChannel.channel.name}</h3>
           </div>
           <Chat channel={singleChannel.channel} />
         </div>
       ))
     : (content = <div></div>);

   if(!singleServer) {
      return null;
   }
   let addChannel;
   currUser?.id == singleServer.ownerId ||
      singleServer.admins.filter(user=> user.id == currUser?.id).length ?
         addChannel = <ChannelFormModal/> :
            addChannel = <div></div>
   return(
      <div className='server-content-wrapper'>

         <div className='server-index-item-wrapper'>
         <h1>{singleServer?.name}</h1>
         <ServerSettingsModal />
         </div>
         <div className='text-channels'>
            <h2>TEXT CHANNELS
               {/* <ChannelFormModal/> */}
               {addChannel}
            </h2>
         <ul>{allChannels?.map(ele => (
            <li key={ele.id} onClick={() => showChannel(ele)}>{ele.name}<ChannelSettingsModal channelId={ele?.id}/></li>
         ))}</ul>
         </div>
         {content}
         <UsersList currentServer={singleServer}/>
      </div>
   )
}

export default ServerPage;
