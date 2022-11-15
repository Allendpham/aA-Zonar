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

   // const deleteButton = (<button onClick={() => dispatch(deleteChannelMessageThunk(message.id))}>Delete</button>)

   const updateForm = (<form className='update-message-form' onSubmit={handleSubmit}>
   <input
       type='text'
       value={currmessage}
       onClick={(e)=> setMessage(e.target.value)}
       />
   </form>)

// console.log("this id delete button", deleteButton)
// console.log("this is update form", updateForm)

   //Check if user is admin
   let isAdmin = false;

   for(let person in server.admins){
      if(person.id === user.id || user.id === server.ownerId){
         isAdmin = true;
      }
   }
   
   message.userId === user.id ? updateContent = updateForm : updateContent = null;
   // message.userId === user.id || isAdmin ? deleteContent = deleteButton : deleteContent = null;
   // const content = () => {
   //    // (<div>{updateContent} {deleteContent}</div>)
   //    return (<div>hello</div>)
   //    // console.log("this is the message user id", message.userId)
   //    // console.log("this is the user id", user.id)
   //    // console.log("this is delte content", deleteContent)
   //    // console.log("this is update content", updateContent)
   // }
console.log("this is message id", message.id)
   return (
   <div>
      <button onClick={() => updateForm}>edit</button>
      <button onClick={() => dispatch(deleteChannelMessageThunk(message.id))}>
         delete
      </button>
   </div>
   );
}

export default MessageSettingOptions
