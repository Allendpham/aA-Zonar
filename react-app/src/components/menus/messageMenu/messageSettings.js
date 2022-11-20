import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateChannelMessageThunk, deleteChannelMessageThunk, updatePrivateChatMessageThunk, deletePrivateChatMessageThunk } from '../../../store/message';
import { getChannelThunk } from '../../../store/channel';
import { getServerThunk } from '../../../store/server';
import '../../chat/chat.css'

const dayjs = require("dayjs");
let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const MessageSettingOptions = ({message, user,users, populateSocket, chat}) => {
   const dispatch = useDispatch()
   const [currmessage, setMessage] = useState(message.message)
   const [settings, setSettings] = useState(false)
   const serverId = useSelector(state => state?.channel?.currentChannel?.channel?.serverId)
   const server = useSelector(state => state?.server?.currentServer?.server)
   const poster = Object.values(users).find(member => member.id == message?.userId)
   const date = dayjs(message?.updatedAt).fromNow(false);
   console.log(date)


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
   settings
     ? (messageInput = (
         <form
           id="update-message-form"
           onSubmit={handleSubmit}
           onKeyPress={(e) => (e === "ENTER" ? handleSubmit() : null)}
         >
           <input
             className="edit-form"
             type="text"
             value={currmessage}
             onChange={updateMessage}
            //  onKeyPress={(e) => (e.key === "27" ? messageInput = message.message : null)}
           />
           <br />
         <button onClick={() => {messageInput = message.message}}>escape to cancel</button>
           <p className='edit-text'>press enter to save</p>
         </form>
       ))
     : (messageInput = message.message);


   let deleteButt;
   for(const person in server?.admins){
      if(server?.admins[person].id === user.id || user.id === server.ownerId){
         deleteButt = (
           <button className="msg-setting" onClick={() => handleDelete()}>
             <i className="fa-solid fa-trash-can"></i>
           </button>
         );
      }
   }
if(message.userId === user.id){
   deleteButt = (
     <button className="msg-setting" onClick={() => handleDelete()}>
       <i className="fa-solid fa-trash-can"></i>
     </button>
   );

}

   let setSettingsButt = (
         <button className="msg-setting" onClick={() => setSettings(!settings)}>
           <i className="fa-solid fa-pen"></i>
         </button>
   )

   return (
     <div

     >
       <div id="message-settings-button" className="chat-message">
         <div className="message-header">
            <div>

           <div className="chat-profile-pic">
            <img src={poster?.profile_pic}/>
           </div>
           <h4 className="chat-name">{poster?.username}</h4>{" "}
           <p className="timestamp">{date}</p>
            </div>
            {  message.userId === user.id &&
            <div className='message-modal'>
               {setSettingsButt}
               {deleteButt}
            </div>
            }
         </div>
         <div className="message-text">
            <p>
              {messageInput}
              </p>
            </div>
       </div>
     </div>
   );
}

export default MessageSettingOptions
