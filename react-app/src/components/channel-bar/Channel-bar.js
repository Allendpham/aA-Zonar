import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './index.css'
import UserSettings from '../users/userSettings';
import { clearChat, getOnePrivateChatThunk, loadPrivateChatsThunk } from "../../store/privatechat";
import ServerSettingsModal from '../servers/ServerSettingsModal';
import { clearServer } from '../../store/server';
import { getChannelThunk, clearChannel } from '../../store/channel';
import ChannelSettingsModal from '../channels/ChannelSettingsModal';
import ChannelFormModal from '../channels/ChannelFormModal';


const ChannelBar = () => {
const dispatch = useDispatch()
const server = useSelector(state => state.server.currentServer)
const liveChats = useSelector((state) => Object.values(state.privatechat.allPrivateChats));
const currUser = useSelector((state) => state.session.user);
const channels = useSelector((state) => Object.values(state.channel.allChannels))
const currChannel = useSelector(state => state.channel.currentChannel.channel)
const [title, setTitle] = useState('')
const [location, setLocation] = useState('')
const [chatId, setChatId] = useState('')
const [selected, setSelected] = useState(currChannel)

useEffect(() =>{
  server.server? setTitle(<h3>{server.server.name}</h3>): setTitle(<h3>Direct Messages</h3>)
  server.server? setLocation('server'):setLocation('home')
},[server, currChannel])


const getChat =async (id)=>{
  dispatch(clearServer())
  dispatch(clearChannel())
  setChatId(id)
  dispatch(getOnePrivateChatThunk(id))
}

const showChannel = async (channel) => {
  dispatch(clearChat())
  dispatch(getChannelThunk(channel.id))

}

let content;
if(location === 'server'){
  content = (
    <div id='channel-bar'>
      <ServerSettingsModal/>
    <div className="channel-list-wrapper">
    <div className='text-channel-header'><p>TEXT CHANNELS</p>
    {server.server?.admins.map(admin => admin.id).includes(currUser?.id) &&
<ChannelFormModal/>}</div>
        {channels?.map((channel) => (
          <div className='channel-list-item'>
          <button
              id={`${channel.id}${channel.name}`}
              key={channel?.id}
              className="channel-links"
              onClick={() => showChannel(channel)}>
              <div>
                <i class="fa-regular fa-hashtag"></i> {channel.name}
                </div>
          </button>
              {server.server?.admins.map(admin => admin.id).includes(currUser?.id) &&

              <div className="channel-settings-button-wrapper" key={channel.id} onClick={() => showChannel(channel)}><ChannelSettingsModal channelId={channel?.id}/></div>

              }
          </div>
        ))}
      </div>
    <div id='user-bar'>

    <UserSettings/>
    </div>
    </div>

  )
}else{
  content = (
    <div id='channel-bar'>
      <button id='server-settings-button' className='direct-msg-title'>Direct Messages</button>

    <div className="channel-list-wrapper">
        {liveChats?.map((chat) => (
          <button key={chat?.id}
              id={`${chat.id}${chat.users.map(user => user.username).join('')}`}
              className="channel-links"
              onClick={() => getChat(chat.id)}
            >
              {chat.users.map(user => user.username).filter(username => username != currUser.username)}
          </button>
        ))}
      </div>
    <div id='user-bar'>

    <UserSettings/>
    </div>
    </div>
  )
}



  return (
    content
  );
}

export default ChannelBar;
