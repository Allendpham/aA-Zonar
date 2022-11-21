import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import './users.css'


const UserAccount = () => {
const history = useHistory()
const currUser = useSelector((state) => state?.session?.user);


    const handleClick = () => {
        history.goBack()
    }

    return (
      <div className="user-account-div">
        <div className="left-bar">
          <div className="left-bar-content">
            <p className="user-settings">USER SETTINGS</p>
            <p className="account-text">My Account</p>
            <LogoutButton />
          </div>
        </div>
        <h3 className="card-title">My Account</h3>
        <div className="account-card">
          <div className="card-header">
            <div className="pic-title">
              <img src={currUser.profile_pic} alt='profile' className="profile-pic" />
              <h3 className="header-name">
                {currUser.username} #00{currUser.id}
              </h3>
            </div>
            <div className="card-info-div">
              <div className="card-info">
                <p className="info-text">USERNAME</p>
                <p className="info">
                  {currUser.username} #00{currUser.id}
                </p>
                <p className="info-text">EMAIL</p>
                <p className="info">{currUser.email}</p>
                <p className="edit-text">Editing disabled</p>
              </div>
            </div>
          </div>
        </div>
        <div className="esc-button-div">
          <button className="esc-button" onClick={() => handleClick()}>
            X
          </button>
          <br />
          {/* <p className="esc-text">ESC</p> */}
        </div>
      </div>
    );
}

export default UserAccount
