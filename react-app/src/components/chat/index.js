import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { getChannelMessagesThunk, createChannelMessagesThunk, getPrivateChatMessagesThunk, createPrivateChatMessagesThunk } from '../../store/message';
import MessageSettingModal from '../menus/messageMenu/index';
import { store } from '../../index';
let socket;

const Chat = ({channel, chat = null}) => {
    const dispatch = useDispatch();
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [currRoom, setCurrRoom] = useState("")
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
            socket.emit('fetch', {channel: channel} )
            socket.emit('join', {channel: channel})
        } else {
            dispatch(getPrivateChatMessagesThunk(chat))
            socket.emit('fetch', {chat: chat} )
            socket.emit('join', {chat: chat} )
        }

    }, [channel, chat])

    useEffect(() => {
        socket.on('last_100_messages', (data) => {
        const history = data.messages
            setMessages((state) => [...history.slice(-10)]);
        });

        // return () => socket.off('last_100_messages');
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
