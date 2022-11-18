import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {io} from 'socket.io-client';
import { createPrivateChatThunk } from '../../../store/privatechat';
import { getServerThunk } from '../../../store/server';
import {createChannelMessagesThunk, getPrivateChatMessagesThunk} from '../../store/message';


let socket;

const UserPreviewForm = ({setShowModal, currentServer, user}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [adminRole, setAdminRole] = useState(false)
  const [isOwner, setOwner] = useState(false)
  const [chatInput, setChatInput] = useState("");
  const [currRoom, setCurrRoom] = useState("")
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([])
  const currUser = useSelector(state => state.session.user)
  const currentChats = useSelector(state => Object.values(state.privatechat.allPrivateChats))


  useEffect(() => {
    socket = io();
    socket.on('chat', (chatId) => {
      setMessages((message) => [...message, chatId.message])
    })
    return (() => {
      socket.disconnect()
    })
  },[])

  useEffect(() => {
    setMessages([])
    dispatch(getPrivateChatMessagesThunk(chatId))
    socket.emit('join', {chat: chatId} )
    socket.emit('fetch', {chat: chatId} )

    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [chatId])

  useEffect(() => {
    socket.on('last_100_messages', (data) => {
    const history = data.messages
        setMessages((state) => [...history.slice(-10)]);
    });
    }, []);

    const populateSocket = () => {
      socket.emit('fetch', {chat: chatId})
    }

    const updateChatInput = (e) => {
      setChatInput(e.target.value)
  };

  const sendChat = async (e) => {
    e.preventDefault()
    socket.emit("fetch", { chat: chatId });

    let payload = {
        userId: user.id,
        channelId: channel.id,
        message: chatInput
    }
    let new_message = await dispatch(createChannelMessagesThunk(payload))
    socket.emit("chat", { msg: {...new_message}, room: currRoom});

  setChatInput("")
}


  useEffect(() =>{
    if(currentServer?.ownerId === currUser?.id) setOwner(true)
    if(currentServer.admins.filter(admin => admin.id === user.id).length > 0){
      setAdminRole(true)
    }
  },[])

  const matchedChats = currentChats.map(chat => chat.users.map(mbr => mbr.id)).filter(item => item.includes(user.id))

  useEffect(()=>{
    dispatch(getServerThunk(currentServer.id))
  }, [adminRole])

    if(!currentServer) return (<h1>Loading</h1>)

  const submitRole = async (e) => {

    setAdminRole(!adminRole)
    const payload = {
      serverId: currentServer.id,
      userId: user.id
    }

    if(adminRole){
      const response = await fetch(`/api/servers/admins`,{
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    }else{
      const response = await fetch(`/api/servers/admins`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    }

  }

  //Needs to send a thunk to the backend to hit an endpoint that will store the user in admin join table


const startChat = async () =>{
  let payload = {
    userId: user.id
  }
  if(matchedChats.length > 0){
    history.push('/@me')
    return
  }
  let chat = await dispatch(createPrivateChatThunk(payload))
  if(chat){
    history.push('/@me')
  }
}
  //form should only display if the user is the owner of the server




  return(
    <div>
      <form className='user-preview-form'>
          <label>AdminRole</label>
          <input
              type='checkbox'
              checked={adminRole}
              onClick={()=> submitRole()}
              disabled={!isOwner || currentServer.ownerId === user.id}
              />
            <button
            onClick={()=> startChat()}
            >Direct Message</button>
      </form>
      <form onSubmit={sendChat}>
            <input
                placeholder={`Message @${user.id}`}
                value={chatInput}
                onChange={updateChatInput}
            />
      </form>


    </div>
  )
  }

export default UserPreviewForm
