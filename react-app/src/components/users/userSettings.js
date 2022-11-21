import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import User from "../User";
import UserAccount from "./userAccount";
import './users.css'

const UserSettings = () => {
const history = useHistory()
const [settingsBar, setSettingsBar] = useState(true)
const currUser = useSelector(state => state?.session?.user)


const handleClick = () => {
    history.push('/@me/settings')
    setSettingsBar(!settingsBar);
}

let content;

settingsBar
  ? // user settings bar:
    (content = (
      <div className="settings-bar">
          <img src={currUser.profile_pic} alt="profile" className="settings-profile-pic" />
        <div id="user-tag">
          <p>{currUser.username}</p>
          <p>#00{currUser.id}</p>
        </div>
        <button id="gear" onClick={() => handleClick()}>
          <i className="fa-solid fa-gear"></i>
        </button>
      </div>
    ))
  : (content = <UserAccount />);

    return (
        <div>
            {content}
        </div>
    )
}

export default UserSettings
