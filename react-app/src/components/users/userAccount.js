import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";


const UserAccount = () => {
const history = useHistory()
const currUser = useSelector((state) => state?.session?.user);

    const handleClick = () => {
        history.goBack()
    }

    return (
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
          <button onClick={() => handleClick()}>X ESC</button>
        </div>
      </div>
    );
}

export default UserAccount