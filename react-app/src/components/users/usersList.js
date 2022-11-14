import UserPreviewModal from "../menus/userMenu"


const UsersList=({currentServer})=>{
    return (
    <div>
        <h3>
            Member - {currentServer.users.length}
        </h3>
        <ul>
            {currentServer.users.map(user=> <li> <UserPreviewModal currentServer={currentServer} user={user}/> </li>)}
        </ul>
    </div>)
}


export default UsersList
