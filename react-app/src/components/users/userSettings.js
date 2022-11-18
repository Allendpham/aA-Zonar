import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import User from "../User";

const UserSettings = () => {
const dispatch = useDispatch()
const [settingsBar, setSettingsBar] = useState(true)
const currUser = useSelector(state => state?.session?.user)


let content; 

settingsBar
  ? // user settings bar:
    (content = (
      <div className="settings-bar">
        {/* user profile pic first */}
        {currUser.username}
        #00{currUser.id}
        <button onClick={() => setSettingsBar(!settingsBar)}>
          <i class="fa-solid fa-gear"></i>
        </button>
      </div>
    ))
  : // user settings page:
    (content = (
      <div>
        <div className="left-bar">
          USER SETTINGS
          <br />
          My Account
          <br />
          <LogoutButton />
        </div>
        My Account
        <div className="account-card">
          <div className="card-header">
            {/* profile picture */}
            {currUser.username}
          </div>
          <div className="card-info">
            USERNAME
            <br />
            {currUser.username} #00{currUser.id}
            <br />
            EMAIL
            <br />
            {currUser.email}
          </div>
          Editing disabled
        </div>
        <div className="esc-button">
          <button onClick={() => setSettingsBar(!settingsBar)}>X ESC</button>
        </div>
      </div>
    ));

    return (
        <div>
            {content}
        </div>
    )
}

export default UserSettings