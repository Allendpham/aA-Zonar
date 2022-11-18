import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './index.css'
import UserSettings from '../users/userSettings';

const ChannelBar = () => {
const server = useSelector(state => state.server.currentServer)
const [title, setTitle] = useState('')
const [location, setLocation] = useState('')
console.log('currentserver',server)
useEffect(() =>{
  server.server? setTitle(<h3>{server.server.name}</h3>): setTitle(<h3>Direct Messages</h3>)
  server.server? setLocation('server'):setLocation('home')
},[server])

let content;
if(location === 'server'){
  content = (
    <div id='channel-bar'>
    <div id='channel-bar-title-container'>
      {title}
    </div>
    <div id='user-bar'>

    <UserSettings/>
    </div>
    </div>

  )
}else{
  content = (
    <div id='channel-bar'>
    <div id='channel-bar-title-container'>
      {title}
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
