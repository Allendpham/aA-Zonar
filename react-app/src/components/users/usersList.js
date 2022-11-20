import UserPreviewModal from "../menus/userMenu"
import './usersList.css'

const UsersList=({currentServer})=>{
    return (
    <div className="userListContainer">
        <div className="userOuterContainer">
            <h3 className="userListTitle">
                Members - {currentServer.users.length}
            </h3>
            <ul className="usersListing">
                {currentServer.users.map(user=> <li key={`memberlist:${user.id}:${user.username}`}> <UserPreviewModal currentServer={currentServer} user={user}/> </li>)}
            </ul>

        </div>
    </div>)
}


export default UsersList
