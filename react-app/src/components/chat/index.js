import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { getChannelMessagesThunk, createChannelMessagesThunk } from '../../store/message';
import MessageSettingModal from '../menus/messageMenu/index';
import { store } from '../../index';
let socket;

const Chat = ({channel}) => {
    const dispatch = useDispatch();
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        socket = io();
        // open socket connection
        // create websocket
        dispatch(getChannelMessagesThunk(channel.id))
        socket.on("chat", (chat) => {
            setMessages((message) => [...message, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])
    useEffect(() =>{
        setMessages([])
        socket.emit('join', {channel: channel})

    }, [channel])
    useEffect(() => {
        socket.on('last_100_messages', (last100Messages) => {
          setMessages((state) => [...last100Messages.messages, ...state]);
        });

        return () => socket.off('last_100_messages');
      }, []);




    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { msg: {userId: user.id, message: chatInput }, room: channel.name});
        setChatInput("")

        let payload = {
            userId: user.id,
            channelId: channel.id,
            message: chatInput
        }
        dispatch(createChannelMessagesThunk(payload))
    }
    // if(!channel_messages) return (<h1>loading...</h1>)

    return (user && (
        <div>
            <div>
                {messages.map((message, ind) => (
                    // <MessageSettingModal key={message.id} message={message} user={user}/>
                    <div key={ind}>{`${message.userId}: ${message.message}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
    )
};


export default Chat;
