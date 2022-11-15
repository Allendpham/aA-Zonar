import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { getChannelMessagesThunk, createChannelMessagesThunk } from '../../store/message';
import MessageSettingModal from '../menus/messageMenu/index';
let socket;

const Chat = ({channelId}) => {
    const dispatch = useDispatch();
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const channel_messages = useSelector(state => state.message)

    useEffect(() => {
        dispatch(getChannelMessagesThunk(channelId))
    }, [dispatch])

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.username, msg: chatInput });
        setChatInput("")

        let payload = {
            userId: user.id,
            channelId,
            message: chatInput
        }

        dispatch(createChannelMessagesThunk(payload))
    }

    return (user && (
        <div>
            <div>
                {channel_messages.map((message, ind) => (
                    <MessageSettingModal message={message} user={user}/>
                    // <div key={ind}>{`${message.user}: ${message.msg}`}</div>
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
