import { useEffect, useState } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { Link } from "react-router-dom";
import { getOnePrivateChatThunk, loadPrivateChatsThunk } from "../../store/privatechat";
import Chat from "../chat";
import UserSettings from "../users/userSettings";

function PrivateChats() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const liveChats = useSelector((state) => Object.values(state.privatechat.allPrivateChats));
  const [chatId, setChatId] = useState('')

  useEffect(() => {
    dispatch(loadPrivateChatsThunk());
  }, [dispatch]);
  if (!liveChats) return <h1>Loading...</h1>;
  //Need to filter servers for only servers that the user is a part of

  const getChannel = (id) => {
    setChatId(id)
    dispatch(getOnePrivateChatThunk(chatId))
  }

  return (
    <div className="chat-index-wrapper">
      <h2>Direct Messages</h2>
      <ul className="chat-list-wrapper">
        {liveChats?.map((chat) => (
          <li key={chat?.id}
              className="chat-links"
              onClick={() => getChannel(chat.id)}
            >
              {chat.users.filter(users => users.username != user.username ).map(name => name.username).join(' ')}
          </li>
        ))}
      </ul>
        < Chat chat={chatId} />
        < UserSettings />
    </div>
  );
}

export default PrivateChats;
