import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import User from "../User";
import UserAccount from "./userAccount";

const UserSettings = () => {
const history = useHistory()
const [settingsBar, setSettingsBar] = useState(true)
const currUser = useSelector(state => state?.session?.user)

const handleClick = () => {
    setSettingsBar(!settingsBar);
}

let content; 

settingsBar ? 
    // user settings bar:
    content = (
      <div className="settings-bar">
        {/* user profile pic first */}
        {currUser.username}
        #00{currUser.id}
        <Link to={'/@me/settings'} onClick={() => handleClick()}>
          <i class="fa-solid fa-gear"></i>
        </Link>
      </div>
    ) :
    content = (
        < UserAccount/>
    )

    return (
        <div>
            {content}
        </div>
    )
}

export default UserSettings