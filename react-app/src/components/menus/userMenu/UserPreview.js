import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createPrivateChatThunk, getOnePrivateChatThunk } from '../../../store/privatechat';
import { getServerThunk } from '../../../store/server';
import './userPreview.css'

const UserPreviewForm = ({currentServer, user}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [adminRole, setAdminRole] = useState(false)
  const [isOwner, setOwner] = useState(false)
  const currUser = useSelector(state => state.session.user)
  const currentChats = useSelector(state => Object.values(state.privatechat.allPrivateChats))

  useEffect(() =>{
    if(currentServer?.ownerId === currUser?.id) setOwner(true)
    if(currentServer.admins.filter(admin => admin.id === user.id).length > 0){
      setAdminRole(true)
    }
  },[])

  const matchedChats = currentChats.map(chat => chat.users.map(mbr => mbr.id)).filter(item => item.includes(user.id))
  let targetChat;
  for(const chats in currentChats){
    for(const users in currentChats[chats].users){
        if(currentChats[chats].users[users].id === user.id){
          targetChat = currentChats[chats]
        }
    }
  }
  console.log(targetChat)
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
    dispatch(getOnePrivateChatThunk(targetChat.id))
    history.push('/@me')
    return
  }
  let chat = await dispatch(createPrivateChatThunk(payload))
  if(chat){
    dispatch(getOnePrivateChatThunk(chat.id))
    history.push('/@me')
  }
}
  //form should only display if the user is the owner of the server
let dmButton;
currUser.id !== user.id ?
  dmButton = (<button id='startDm'
              onClick={()=> startChat()}
              >Message @{user.username}</button>)
              :
  dmButton = null




  return(
    <div id='userPreviewContainer'>
      <div id='userPreviewHeader'></div>
      <div id='userPreviewCard'>
        <h2>{user.username}</h2>
        <form className='user-preview-form'>
            <label id='userRole'>Admin</label>
            <input
                type='checkbox'
                checked={adminRole}
                onClick={()=> submitRole()}
                disabled={!isOwner || currentServer.ownerId === user.id}
                />
              {dmButton}
        </form>
      </div>
    </div>
  )
  }

export default UserPreviewForm
