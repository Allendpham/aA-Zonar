import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateChannelMessageThunk, deleteChannelMessageThunk, updatePrivateChatMessageThunk, deletePrivateChatMessageThunk } from '../../../store/message';
import { getChannelThunk } from '../../../store/channel';
import { getServerThunk } from '../../../store/server';

const MessageSettingOptions = ({message, user, populateSocket, chat}) => {
   let updateContent;
   let deleteContent;
   const dispatch = useDispatch()
   const [currmessage, setMessage] = useState(message.message)
   const [settings, setSettings] = useState(false)
   const serverId = useSelector(state => state?.channel?.currentChannel?.channel?.serverId)
   const server = useSelector(state => state?.server?.currentServer?.server)

   useEffect(() => {
      // dispatch(getChannelThunk(message.channelId))
      dispatch(getServerThunk(serverId))
   }, [dispatch])

   const handleDelete = async () => {
      if(!chat){
         dispatch(deleteChannelMessageThunk(message.id))
      } else {
         dispatch(deletePrivateChatMessageThunk(message.id))
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
         dispatch(updateChannelMessageThunk(payloadChannelMessages, message.id))
      } else {
         dispatch(updatePrivateChatMessageThunk(payloadChatMessages, message.id))
      }
      setSettings(!settings)
      populateSocket()
   }

   // const deleteButton = (<button onClick={() => dispatch(deleteChannelMessageThunk(message.id))}>Delete</button>)

   let updateForm;
   settings ?
   updateForm =
      (<form className='update-message-form' onSubmit={handleSubmit}
      onKeyPress={(e) => e === 'ENTER' ? handleSubmit() : null}>
         <input
             type='text'
             value={currmessage}
             onChange={(e)=> setMessage(e.target.value)}
             />
         <button type='submit'>Submit</button>
      </form>) : updateForm = null




   let deleteButt;
   for(const person in server?.admins){
      if(server?.admins[person].id === user.id || user.id === server.ownerId){
         deleteButt = (<button onClick={() => handleDelete()}>delete</button>)
      }
   }


   let setSettingsButt
   message.userId === user.id ?
      setSettingsButt = (<button onClick={() => setSettings(!settings)}>edit</button>) :
         setSettingsButt = null


   return (
   <div>
      {setSettingsButt}
      {updateForm}
      {deleteButt}
   </div>
   );
}

export default MessageSettingOptions
