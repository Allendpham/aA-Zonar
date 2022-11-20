import { createChannelThunk, clearChannel } from "./channel"

//CONSTANTS
const LOAD_SERVERS = 'servers/LOAD_SERVER'
const GET_SERVER = 'servers/GET_SERVER'
const ADD_SERVER = 'servers/ADD_SERVER'
const REMOVE_SERVER = 'servers/REMOVE_SERVER'
const CLEAR_SERVER = 'server/CLEAR_SERVER'
//ACTIONS
const loadServers = (servers) =>({
  type: LOAD_SERVERS,
  servers
});

const getServer =(server, allServers) =>({
  type: GET_SERVER,
  server,
  allServers
})

const addServer = (server) => ({
  type: ADD_SERVER,
  server
})

const removeServer = (server) => ({
  type: REMOVE_SERVER,
  server
})

export const clearServer = () =>({
  type: CLEAR_SERVER
})


//THUNKS
export const loadServersThunk = ()=> async (dispatch) => {
  const response  = await fetch('/api/servers')

  if(response.ok){
    const data = await response.json();
    dispatch(loadServers(data))
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

export const getServerThunk = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`)
  const Nextresponse  = await fetch('/api/servers')

  if(response.ok){
    const data = await response.json();
    const allServersData = await Nextresponse.json();
    dispatch(getServer(data, allServersData))
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

export const addServerThunk = (server) => async (dispatch) =>{
  const response = await fetch('/api/servers',{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(server),
  })

  if(response.ok){
    const data = await response.json();
    dispatch(addServer(data))

    const general_chat = {
      name: 'General',
      serverId: data.server.id
    }

    dispatch(createChannelThunk(general_chat, data.server.id))

    return data;
  }else if (response.status < 500) {
    const data = await response.json();
    if (data) {
      return data;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updateServerThunk = (server, id) => async (dispatch) =>{

  const response = await fetch(`/api/servers/${id}`,{
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(server),
  })


  if(response.ok){
    const data = await response.json();
    dispatch(addServer(data.server))
    return data;
  }else if (response.status < 500) {
    const data = await response.json();
    if (data) {
      console.log(data)
      return data;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const removeServerThunk = (serverId) => async (dispatch) =>{
  const response = await fetch(`/api/servers/${serverId}`,{
    method: "DELETE"
  })

  if(response.ok){
    dispatch(removeServer(serverId))
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


//REDUCER
const initialState = {allServers:{}, currentServer:{}}
export default function serverReducer(state = initialState, action){
  switch (action.type){
    case LOAD_SERVERS:
      const allServers = normalizeArray(action.servers.servers);
      return {...state, allServers:{...allServers}}
    case GET_SERVER:
      const allServersforRender = normalizeArray(action.allServers.servers);
      const currentServer = {allServers: {...allServersforRender}, currentServer:{...action.server}}
      return currentServer
    case ADD_SERVER:
        if (!state[action.server.id]) {
          const newState = {
            ...state, allServers:{...state.allServers,
            [action.server.id]: action.server}
          };
          return newState;
        }
        return {
          ...state, allServers:{...state.allServers,
          [action.server.id]: {
            ...state[action.server.id],
            ...action.server}
          }
        };
    case REMOVE_SERVER:
      const deleteState = { ...state };
      delete deleteState.allServers[action.serverId];
      return deleteState;
    case CLEAR_SERVER:
      return {
        ...state, allServers:{...state.allServers}, currentServer:{}}
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
