import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateChannelMessageThunk, deleteChannelMessageThunk, updatePrivateChatMessageThunk, deletePrivateChatMessageThunk } from '../../../store/message';
import { getChannelThunk } from '../../../store/channel';
import { getServerThunk } from '../../../store/server';
import '../../chat/chat.css'

const MessageSettingOptions = ({message, user,users, populateSocket, chat}) => {
   const dispatch = useDispatch()
   const [currmessage, setMessage] = useState(message.message)
   const [settings, setSettings] = useState(false)
   const [shown, setShown] = useState(false)
   const serverId = useSelector(state => state?.channel?.currentChannel?.channel?.serverId)
   const server = useSelector(state => state?.server?.currentServer?.server)
   const poster = Object.values(users).find(member => member.id == message?.userId)
   const dayjs = require('dayjs')
   console.log(dayjs().$d)


   useEffect(() => {
      dispatch(getServerThunk(serverId))
   }, [dispatch])
   const updateMessage = (e) => {
      setMessage(e.target.value)
  };
   const handleDelete = async () => {
      if(!chat){
         await dispatch(deleteChannelMessageThunk(message.id))
      } else {
        await dispatch(deletePrivateChatMessageThunk(message.id))
      }
      populateSocket()
   }

   const handleSubmit = async (e) => {
      e.preventDefault();


      let payloadChannelMessages = {
         userId: user.id,
         channelId: message.channelId,
         message: currmessage
      }

      let payloadChatMessages = {
         userId: user.id,
         privateChatId: message.privateChatId,
         message: currmessage
      }
      if(!chat){
         await dispatch(updateChannelMessageThunk(payloadChannelMessages, message.id))
      } else {
         await dispatch(updatePrivateChatMessageThunk(payloadChatMessages, message.id))
      }
      setSettings(!settings)
      populateSocket()
   }

   let messageInput;
   settings?
      messageInput =
      (<form id='update-message-form'
         onSubmit={handleSubmit}
         onKeyPress={(e) => e === 'ENTER' ? handleSubmit() : null}>
      <input
         type='text'
         value={currmessage}
         onChange={updateMessage}
      />
   </form>) :messageInput = (message.message)


   let deleteButt;
   for(const person in server?.admins){
      if(server?.admins[person].id === user.id || user.id === server.ownerId){
         deleteButt = (<button onClick={() => handleDelete()}>delete</button>)
      }
   }
if(message.userId === user.id){
   deleteButt = (<button onClick={() => handleDelete()}>delete</button>)

}
   let deleteContent
   shown ? deleteContent = deleteButt : deleteContent = null

   let setSettingsButt
   message.userId === user.id ?
      setSettingsButt = (<button onClick={() => setSettings(!settings)}>edit</button>) :
         setSettingsButt = null

   let updateContent
   shown ? updateContent = setSettingsButt : updateContent = null

   return (
     <div
       onMouseEnter={() => setShown(true)}
       onMouseLeave={() => setShown(false)}
     >
       <div id="message-settings-button" className="chat-message">
         <div className="message-header">
           <div className="chat-profile-pic"></div>
           <h4 className="chat-name">{poster?.username}</h4>
         </div>
         <div className='message-text'>{messageInput}</div>
       </div>
       {updateContent}
       {deleteContent}
     </div>
   );
}

export default MessageSettingOptions
