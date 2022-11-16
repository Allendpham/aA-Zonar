//CONSTANTS
const LOAD_CHANNEL_MESSAGES = 'messages/LOAD_CHANNEL_MESSAGES'
const ADD_CHANNEL_MESSAGE = 'messages/ADD_CHANNEL_MESSAGE'
const DELETE_CHANNEL_MESSAGE = 'messages/DELETE_CHANNEL_MESSAGE'

//ACTIONS
const loadChannelMessages = (messages) => ({
   type: LOAD_CHANNEL_MESSAGES,
   messages
})

const addChannelMessage = (message) => ({
   type: ADD_CHANNEL_MESSAGE,
   message
})

const deleteChannelMessage = (messageId) => ({
   type: DELETE_CHANNEL_MESSAGE,
   messageId
})

//THUNKS
export const getChannelMessagesThunk = (channelId) => async (dispatch) => {

   const response = await fetch(`/api/channels/${channelId}/messages`)

   if(response.ok){
      const data = await response.json();
      dispatch(loadChannelMessages(data))
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
}

export const createChannelMessagesThunk = (payload) => async (dispatch) => {
   const response = await fetch(`/api/channels/${payload.channelId}/messages`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if(response.ok){
      const data = await response.json();
      dispatch(addChannelMessage(data.message))
      return data;
    }else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
}

export const updateChannelMessageThunk = (payload, messageId) => async(dispatch) => {
  // console.log('im hereeeeeeeeeeeeeeeee')
  const response = await fetch(`/api/channel_messages/${messageId}`,{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    console.log('I AMMM PAYLOAD', payload)
    if(response.ok){
      const data = await response.json();
      console.log(data)
      dispatch(addChannelMessage(data))
      return data;
    }else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
}

export const deleteChannelMessageThunk = (messageId) => async(dispatch) => {
  const response = await fetch(`/api/channel_messages/${messageId}`,{
      method: 'DELETE'
    })
    console.log("i'm delete", response)
    if(response.ok){
      dispatch(deleteChannelMessage(messageId))
      return;
    }else if (response.status < 500) {
      const data = await response.json();
      console.log("this is data", data)
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
}

//REDUCER
const initialState = {}
export default function messageReducer(state = initialState, action){
   switch(action.type){
      case LOAD_CHANNEL_MESSAGES:
         const channelMessages = normalizeArray(action.messages.messages);
         return {...state, ...channelMessages}
      case ADD_CHANNEL_MESSAGE:
         if (!state[action.message.id]) {
            const newState = {
              ...state,
              [action.message.id]: action.message
            };
            return newState;
          }
          return {
            ...state,
            [action.message.id]: {
              ...state[action.message.id],
              ...action.message}
          };
      case DELETE_CHANNEL_MESSAGE:
         const deleteState = { ...state };
         delete deleteState[action.messageId]
         return deleteState;
      default:
         return state;
   }
  }

//HELPERS
function normalizeArray(dataArray){
   if (!dataArray instanceof Array) throw new Error('Normalize problem: data invalid')
   const obj = {}
   dataArray.forEach(element => {
     obj[element.id] = element
   })
   return obj
 }
