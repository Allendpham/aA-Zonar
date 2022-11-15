import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateChannelMessageThunk, deleteChannelMessageThunk } from '../../../store/message';
import { getChannelThunk } from '../../../store/channel';
import { getServerThunk } from '../../../store/server';

const MessageSettingOptions = ({message, user}) => {
   let updateContent;
   let deleteContent;
   const dispatch = useDispatch()
   const [currmessage, setMessage] = useState(message.msg)
   const serverId = useSelector(state => state.channel.currentChannel.channel.serverId)
   const server = useSelector(state => state.server.currentServer.server)

   useEffect(() => {
      dispatch(getChannelThunk(message.channelId))
      dispatch(getServerThunk(serverId))
   }, [dispatch])

   const handleSubmit = async (e) => {
      e.preventDefault();


      let payload = {
         userId: user.id,
         channelId: message.channelId,
         message
      }

      dispatch(updateChannelMessageThunk(payload, message.id))
   }

   const deleteButton = (<button onClick={() => dispatch(deleteChannelMessageThunk(message.id))}>Delete</button>)

   const updateForm = (<form className='update-message-form' onSubmit={handleSubmit}>
   <input
       type='text'
       value={currmessage}
       onClick={(e)=> setMessage(e.target.value)}
       />
   </form>)


   //Check if user is admin
   let isAdmin = false;

   for(let person in server.admins){
      if(person.id === user.id){
         isAdmin = true;
      }
   }

   const content = () => {
      message.userId === user.id ? updateContent = updateForm : updateContent = null;
      message.userId === user.id || isAdmin ? deleteContent = deleteButton : deleteContent = null;
   }

   return (
      <div>
         <button onClick={() => content()}>...</button>
      </div>
   )
}

export default MessageSettingOptions
