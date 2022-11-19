import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './index.css'
import UserSettings from '../users/userSettings';
import { clearChat, getOnePrivateChatThunk, loadPrivateChatsThunk } from "../../store/privatechat";
import ServerSettingsModal from '../servers/ServerSettingsModal';
import { clearServer } from '../../store/server';
import { getChannelThunk } from '../../store/channel';


const ChannelBar = () => {
const dispatch = useDispatch()
const server = useSelector(state => state.server.currentServer)
const liveChats = useSelector((state) => Object.values(state.privatechat.allPrivateChats));
const currUser = useSelector((state) => state.session.user);
const channels = useSelector((state) => Object.values(state.channel.allChannels))
const [title, setTitle] = useState('')
const [location, setLocation] = useState('')
const [chatId, setChatId] = useState('')

useEffect(() =>{
  server.server? setTitle(<h3>{server.server.name}</h3>): setTitle(<h3>Direct Messages</h3>)
  server.server? setLocation('server'):setLocation('home')
},[server])


const getChat =async (id)=>{
  setChatId(id)
  dispatch(clearServer())
  await dispatch(getOnePrivateChatThunk(chatId))
}
const showChannel = async (channel) => {
  dispatch(clearChat())
  await dispatch(getChannelThunk(channel.id))
}
let content;
if(location === 'server'){
  content = (
    <div id='channel-bar'>
      <ServerSettingsModal/>
    <div><p>Text Channels</p><i className="fa-solid fa-plus"></i></div>
    <ul className="channel-list-wrapper">
        {channels?.map((channel) => (
          <li key={channel?.id}
              className="channel-links"
              onClick={() => showChannel(channel)}>
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
              onClick={() => getChat(chat.id)}
            >
              {chat.users.map(user => user.username).filter(username => username != currUser.username)}
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
