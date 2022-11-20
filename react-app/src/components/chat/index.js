import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { getChannelMessagesThunk, createChannelMessagesThunk, getPrivateChatMessagesThunk, createPrivateChatMessagesThunk } from '../../store/message';
import MessageSettingOptions from '../menus/messageMenu/messageSettings';
import { store } from '../../index';
import './chat.css'

let socket;
const Chat = ({channel}) => {
  const dispatch = useDispatch();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [currRoom, setCurrRoom] = useState("")
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState([]);
  const [currentConvo, setConvo] = useState('')
  const user = useSelector(state => state.session.user)
  const currentChat = useSelector(state => state.privatechat.currentPrivateChat)
  const currentChannel = useSelector(state => state.channel.currentChannel)

  let end = useRef(null)

    useEffect(() => {
        socket = io();
        // open socket connection
        // create websocket

        socket.on("currRoom", (currRoomName) => {
            setCurrRoom(currRoomName.room)
        })


        socket.on("chat", (chat) => {
            setMessages((message) => [...message, chat.message])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, []) // if browser gets angry put chat and channel inside dependency

    useEffect(() =>{
        setMessages([])
        if (channel != null)  {
            setConvo(channel.name)
            dispatch(getChannelMessagesThunk(channel.id))
            socket.emit('join', {channel: channel})
            socket.emit('fetch', {channel: channel} )
            //Finds selected channel link in side bar and highlights item + settings button
            let nodes = document.getElementsByClassName('channel-links')
            let settingsButtons = document.getElementsByClassName(`channel-settings-button`)
            for(let node of nodes){
              node.id == `${channel.id}${channel.name}`?
                node.classList.add('selected-link') : node.classList.remove('selected-link')
              }
            for(let node of settingsButtons){
              node.id == `settings${channel.id}`?
              node.classList.add('selected-settings'):node.classList.remove('selected-settings')
              console.log(node)
            }
          } else {
            dispatch(getPrivateChatMessagesThunk(currentChat.id))
            socket.emit('join', {chat: currentChat.id} )
            socket.emit('fetch', {chat: currentChat.id} )
            let nodes = document.getElementsByClassName('channel-links')
            for(let node of nodes){
              if(node.id == `${currentChat.id}${currentChat.users?.map(user => user.username).join('')}`){
                node.classList.add('selected-link')
              }else{
                node.classList.remove('selected-link')
              }
            }
            setConvo(currentChat.users?.map(user => user.username).filter(names => names != user.username))
        }
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
          }
          fetchData();



    }, [channel, currentChat, currentChannel])

    useEffect(() => {
        socket.on('last_100_messages', (data) => {
        const history = data.messages
            setMessages((state) => [...history]);
        });


        }, []);

    useEffect(()=>{
      end.current.scrollIntoView({behavior:'smooth'})
    },[messages])


    const populateSocket = () => {
         if (channel != null) {
             socket.emit('fetch', {channel: channel} )
         } else {
             socket.emit("fetch", { chat: currentChat.id });
         }
    }

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = async (e) => {
        e.preventDefault()
        end.current.scrollIntoView({behavior:'smooth'})

        let inputBar = document.querySelector('.message-bar')
        inputBar.classList.remove('error-placeholder')



        if (channel == null) {
            socket.emit("fetch", { chat: currentChat.id });

            let payload = {
                userId: user.id,
                privateChatId: currentChat.id,
                message: chatInput,
            };
            let new_message = await dispatch(
                createPrivateChatMessagesThunk(payload)
            );
            if(new_message.errors){
              setErrors(new_message.errors)
              inputBar.classList.add('error-placeholder')

              return
            }
            socket.emit("chat", {
                msg: { ...new_message },
                room: currRoom,
            });
        } else {

            socket.emit('fetch', {channel: channel})

            let payload = {
                userId: user.id,
                channelId: channel.id,
                message: chatInput
            }
            let new_message = await dispatch(createChannelMessagesThunk(payload))
            if(new_message.errors){
              setErrors(new_message.errors)
              inputBar.classList.add('error-placeholder')

              return
            }
            socket.emit("chat", { msg: {...new_message}, room: currRoom});
        }
        setChatInput("")
        setErrors([])
    }


    return (
      user && (
        <div className="chat-div">
          <div className="chat-message-div">
            <div className="all-messages-div">
              {messages?.map((message, ind) => (
                <MessageSettingOptions
                  populateSocket={populateSocket}
                  key={message?.id}
                  message={message}
                  user={user}
                  users={users}
                  chat={currentChat.id}
                />
              ))}
              <div ref={end}></div>
            </div>
          </div>
          <div className='message-form'>
            <form className="message-bar-div" onSubmit={sendChat}>

            <div>

        </div>

              <input
                className="message-bar"
                value={chatInput}
                placeholder={errors.length? errors:`Message: ${currentConvo}`}
                onChange={updateChatInput}
              />
              <button className="message-submit-btn" type="submit"></button>
            </form>
          </div>
        </div>
      )
    );
};


export default Chat;
