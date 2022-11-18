import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { getChannelMessagesThunk, createChannelMessagesThunk, getPrivateChatMessagesThunk, createPrivateChatMessagesThunk } from '../../store/message';
import MessageSettingOptions from '../menus/messageMenu/messageSettings';
import { store } from '../../index';
import './chat.css'

let socket;

const Chat = ({channel, chat = null}) => {
    const dispatch = useDispatch();
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [currRoom, setCurrRoom] = useState("")
    const [users, setUsers] = useState([])
    const user = useSelector(state => state.session.user)
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

        if (chat === null) {
            dispatch(getChannelMessagesThunk(channel.id))
            socket.emit('join', {channel: channel})
            socket.emit('fetch', {channel: channel} )
        } else {
            dispatch(getPrivateChatMessagesThunk(chat))
            socket.emit('join', {chat: chat} )
            socket.emit('fetch', {chat: chat} )
        }
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
          }
          fetchData();

    }, [channel, chat])

    useEffect(() => {
        socket.on('last_100_messages', (data) => {
        const history = data.messages
            setMessages((state) => [...history.slice(-10)]);
        });
        }, []);



    const populateSocket = () => {
         if (chat === null) {
             socket.emit('fetch', {channel: channel} )
         } else {
             socket.emit("fetch", { chat: chat });
         }
    }

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = async (e) => {
        e.preventDefault()
        if (chat !== null) {
            socket.emit('fetch', {channel: channel} )

            let payload = {
                userId: user.id,
                privateChatId: chat,
                message: chatInput,
            };
            let new_message = await dispatch(
                createPrivateChatMessagesThunk(payload)
            );
            socket.emit("chat", {
                msg: { ...new_message },
                room: currRoom,
            });
        } else {
            socket.emit("fetch", { chat: chat });

            let payload = {
                userId: user.id,
                channelId: channel.id,
                message: chatInput
            }
            let new_message = await dispatch(createChannelMessagesThunk(payload))
            socket.emit("chat", { msg: {...new_message}, room: currRoom});
        }
        setChatInput("")
    }


    return (user && (
        <div className='chat-div'>
            <div className='all-messages-div'>
                {messages?.map((message, ind) => (
                    <MessageSettingOptions populateSocket={populateSocket} key={message?.id} message={message} user={user} users={users} chat={chat}/>
                ))}
            </div>
            <form className='message-bar-div' onSubmit={sendChat}>
                <input
                    className='message-bar'
                    value={chatInput}
                    // placeholder={channel.name}
                    onChange={updateChatInput}
                    // type='submit'
                />
                <button className='message-submit-btn' type="submit"></button>
            </form>
        </div>
    )
    )
};


export default Chat;
