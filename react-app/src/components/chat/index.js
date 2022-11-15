import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { getChannelMessagesThunk, createChannelMessagesThunk } from '../../store/message';
import MessageSettingModal from '../menus/messageMenu/index';
import { store } from '../../index';
let socket;

const Chat = ({channelId}) => {
    const dispatch = useDispatch();
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const channel_messages = useSelector(state => (Object.values(state.message)))
    const [initialLoad, setInitialLoad] = useState(false);

    // let channel_messages;
    // // //Raw fetch request for the channel_messages
    // async function rawFetch (channelId) {
    //     const response = await fetch(`/api/channels/${channelId}/messages`);
    //     if(response.ok){
    //         const data = await response.json();
    //         console.log('this is the data----------------', data.messages)
    //         channel_messages = data.messages;
    //         return channel_messages
    //     }
    // }



    // useEffect(() => {
    //     if(!initialLoad) {
    //         setInitialLoad(true)
    //         dispatch(getChannelMessagesThunk(channelId))
    //         setMessages(Object.values(store.getState().message))
    //     }
    //     else return;
    // }, [channelId])

    useEffect(() => {
        socket = io();
        // open socket connection
        // create websocket
        dispatch(getChannelMessagesThunk(channelId))
        socket.on("chat", (chat) => {
            setMessages((message) => [...message, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

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
        socket.emit("chat", { userId: user.id, message: chatInput });
        setChatInput("")

        let payload = {
            userId: user.id,
            channelId,
            message: chatInput
        }

        dispatch(createChannelMessagesThunk(payload))
    }
    // if(!channel_messages) return (<h1>loading...</h1>)
    console.log("these are the channelmessages", channel_messages);
    console.log("these are the chat messages", messages)
    return (user && (
        <div>
            <div>
                {/* {channel_messages?.map((message, ind) => (
                    // <MessageSettingModal key={message.id} message={message} user={user}/>
                    <div key={ind}>{`${message.userId}: ${message.message}`}</div>
                ))} */}
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
