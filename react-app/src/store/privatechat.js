// Action Constants
const LOAD_PRIVATE_CHATS = 'privatechats/LOAD_PRIVATE_CHATS'
const GET_ONE_PRIVATE_CHAT = 'privatechats/GET_ONE_PRIVATE_CHAT'
const CREATE_PRIVATE_CHAT = 'privatechats/CREATE_PRIVATE_CHAT'

// Action Creators
const loadPrivateChats = (privatechats) => ({
   type: LOAD_PRIVATE_CHATS,
   privatechats
})

const getOnePrivateChat = (privatechat) => ({
   type: GET_ONE_PRIVATE_CHAT,
   privatechat
})

const createPrivateChat = (privatechat) => ({
   type: CREATE_PRIVATE_CHAT,
   privatechat
})


// Thunks
export const loadPrivateChatsThunk = () => async (dispatch) => {
   const response = await fetch(`/api/private_chat/current`)
   //When receiving response: please include the users of all those private chats
   if(response.ok){
     const data = await response.json();
      dispatch(loadPrivateChats(data))
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

export const getOnePrivateChatThunk = (privateChatId) => async (dispatch) => {
   const response = await fetch(`/api/private_chat/${privateChatId}`)
   //Are we able to load all of the associated messages along with the private chat
   if(response.ok){
      const data = await response.json();
      dispatch(getOnePrivateChat(data))
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

export const createPrivateChatThunk = (payload) => async (dispatch) => {
   const response = await fetch(`/api/private_chat`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
  })
  //This is really only going to append the existing current user and the given userId to a newly created private chat instance
  //Return the server along with the associated users
      if(response.ok){
        const data = await response.json();
        dispatch(createPrivateChat(data))
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

// Reducer
const initialState = {allPrivateChats:{}, currentPrivateChat:{}}
export default function privateChatReducer(state = initialState, action){
   switch (action.type){
      case LOAD_PRIVATE_CHATS:
         const allChats = normalizeArray(action.privatechats.privatechats)
         return {...state, allPrivateChats:{...allChats}}
      case GET_ONE_PRIVATE_CHAT:
         return {...state, currentPrivateChat: {...action.privatechat.privatechat}}
      case CREATE_PRIVATE_CHAT:
         return {...state, allPrivateChats:{...state.allPrivateChats,
            [action.privatechat.id]: action.privatechat}}
      default:
         return state
   }
}

function normalizeArray(dataArray){
   if (!dataArray instanceof Array) throw new Error('Normalize problem: data invalid')
   const obj = {}
   dataArray.forEach(element => {
     obj[element.id] = element
   })
   return obj
 }
