import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './index.css'
import UserSettings from '../users/userSettings';
import { getOnePrivateChatThunk, loadPrivateChatsThunk } from "../../store/privatechat";
import ServerSettingsModal from '../servers/ServerSettingsModal';


const ChannelBar = () => {
const dispatch = useDispatch()
const server = useSelector(state => state.server.currentServer)
const liveChats = useSelector((state) => Object.values(state.privatechat.allPrivateChats));
const user = useSelector((state) => state.session.user);
const channels = useSelector((state) => Object.values(state.channel.allChannels))
const [title, setTitle] = useState('')
const [location, setLocation] = useState('')
const [chatId, setChatId] = useState('')

useEffect(() =>{
  server.server? setTitle(<h3>{server.server.name}</h3>): setTitle(<h3>Direct Messages</h3>)
  server.server? setLocation('server'):setLocation('home')
},[server])

const getChannel = (id) => {
  setChatId(id)
  dispatch(getOnePrivateChatThunk(chatId))
}

let content;
if(location === 'server'){
  content = (
    <div id='channel-bar'>
      <ServerSettingsModal/>
    <ul className="channel-list-wrapper">
        {channels?.map((channel) => (
          <li key={channel?.id}
              className="channel-links"
            >
              {channel.name}
          </li>
        ))}
      </ul>
    <div id='user-bar'>

    <UserSettings/>
    </div>
    </div>

  )
}else{
  content = (
    <div id='channel-bar'>
      <button id='server-settings-button' className='direct-msg-title'>Direct Messages</button>

    <ul className="chat-list-wrapper">
        {liveChats?.map((chat) => (
          <li key={chat?.id}
              className="chat-links"
              onClick={() => getChannel(chat.id)}
            >
              {chat.users?.filter(users => users.username != user.username ).map(name => name.username).join(' ')}
          </li>
        ))}
      </ul>
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
