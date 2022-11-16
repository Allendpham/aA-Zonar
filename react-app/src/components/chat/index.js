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
            setMessages((message) => [...message, chat.message])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])
    useEffect(() =>{
        setMessages([])
        socket.emit('fetch', {channel: channel} )
        socket.emit('join', {channel: channel})

    }, [channel])

    useEffect(() => {
        socket.on('last_100_messages', (data) => {
        const history = data.messages
          setMessages((state) => [...history.slice(-10)]);
        });

        // return () => socket.off('last_100_messages');
      }, []);



    const populateSocket = () => {
        socket.emit('fetch', {channel: channel} )
    }
    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = async (e) => {
        socket.emit('fetch', {channel: channel} )
        e.preventDefault()
        setChatInput("")

        let payload = {
            userId: user.id,
            channelId: channel.id,
            message: chatInput
        }
        let new_message = await dispatch(createChannelMessagesThunk(payload))
        socket.emit("chat", { msg: {...new_message}, room: channel.name});
    }

    return (user && (
        <div>
            <div>
                {messages.map((message, ind) => (
                    <MessageSettingModal populateSocket={populateSocket} key={message.id} message={message} user={user}/>
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
