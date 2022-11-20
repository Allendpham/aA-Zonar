import { useEffect, useState } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { Link } from "react-router-dom";
import { clearChannel } from "../../store/channel";
import { getOnePrivateChatThunk, loadPrivateChatsThunk } from "../../store/privatechat";
import { clearServer } from "../../store/server";
import Chat from "../chat";

function PrivateChats() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearServer())
    dispatch(clearChannel())

    dispatch(loadPrivateChatsThunk());
  }, []);

  return (
    <div className="server-parent">
    <div className="server-title">
      <h3>Direct Messages</h3>
    </div>
    <Chat channel={null}/>
  </div>
  );
}

export default PrivateChats;
