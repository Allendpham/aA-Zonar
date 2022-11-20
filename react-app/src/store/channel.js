// action constants
const LOAD_SERVER_CHANNELS = 'channels/LOAD_SERVER_CHANNELS'
const GET_CHANNEL = 'channels/GET_CHANNEL'
const UPDATE_CHANNEL = 'channels/UPDATE_CHANNEL'
const DELETE_CHANNEL = 'channels/DELETE_CHANNEL'
const CLEAR_CHANNEL = 'channels/CLEAR_CHANNEL'

/// actions
const loadServerChannels = (channels) => ({
    type: LOAD_SERVER_CHANNELS,
    channels
})

const getChannel = (channel) => ({
    type: GET_CHANNEL,
    channel
})

const updateChannel = (channel) => ({
    type: UPDATE_CHANNEL,
    channel
})

const deleteChannel = (id) => ({
    type: DELETE_CHANNEL,
    id
})

export const clearChannel = () =>( {
type: CLEAR_CHANNEL
})


/// thunks
export const loadServerChannelsThunk =(id) => async (dispatch) =>{
  const response = await fetch(`/api/servers/${id}/channels`)

    if(response.ok){
        const data = await response.json();
        dispatch(loadServerChannels(data))
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

export const getChannelThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/channels/${id}`)

    if(response.ok){
        const data = await response.json();
        await dispatch(getChannel(data))
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

export const createChannelThunk = (payload, serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels`,
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })

    if(response.ok){
        const data = await response.json();
        dispatch(updateChannel(data))
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

export const updateChannelThunk = (payload, id) => async (dispatch) => {

    const response = await fetch(`/api/channels/${id}`,
    {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
    if(response.ok){
        const data = await response.json();
        dispatch(updateChannel(data))
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

export const deleteChannelThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/channels/${id}`,{
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(deleteChannel(id))
        return;
      }else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}



/// reducer
const initialState = {allChannels:{}, currentChannel:{}}
export default function channelReducer(state = initialState, action){
  switch (action.type){
    case LOAD_SERVER_CHANNELS:
        const allChannels = normalizeArray(action.channels.channels);
        return {...state, allChannels:{...allChannels}}
    case GET_CHANNEL:
        const currentChannel = {...state, currentChannel: {...action.channel}}
        return currentChannel
    case UPDATE_CHANNEL:
        if (!state[action.channel.id]) {
            const newState = {
              ...state, allChannels:{...state.allChannels,
              [action.channel.id]: action.channel}
            };
            return newState;
          }
          return {
            ...state, allChannels:{...state.allChannels,
            [action.channel.id]: {
              ...state[action.channel.id],
              ...action.channel}
            }
          };
    case DELETE_CHANNEL:
          const deleteState = {...state}
          delete deleteState.allChannels[action.id]
          return deleteState
    case CLEAR_CHANNEL:
      return {
        ...state, allChannels:{...state.allChannels}, currentChannel:{}}
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
