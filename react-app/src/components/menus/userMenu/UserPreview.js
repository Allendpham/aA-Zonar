import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createPrivateChatThunk } from '../../../store/privatechat';
import { getServerThunk } from '../../../store/server';

const UserPreviewForm = ({setShowModal, currentServer, user}) => {
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
  )
  }

export default UserPreviewForm
