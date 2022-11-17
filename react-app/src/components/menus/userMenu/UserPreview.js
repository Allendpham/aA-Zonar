import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getServerThunk } from '../../../store/server';

const UserPreviewForm = ({setShowModal, currentServer, user}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [adminRole, setAdminRole] = useState(true)
  const [isOwner, setOwner] = useState(false)
  const currUser = useSelector(state => state.session.user)



  useEffect(() =>{
    if(currentServer?.ownerId === currUser?.id) setOwner(true)
  },[])

    if(!currentServer) return (<h1>Loading</h1>)
    for (const userAdmin in currentServer.admins) {
        if (userAdmin.id === user.id) {
            setAdminRole(true)
        }
    }



  const submitRole = async (e) => {

    setAdminRole(!adminRole)
    const payload = {
      serverId: currentServer.id,
      userId: user.id
    }

    const response = await fetch(`/api/servers/admins`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    //Needs to send a thunk to the backend to hit an endpoint that will store the user in admin join table
  }

  //form should only display if the user is the owner of the server




  return(
    <form className='user-preview-form'>
        <label>AdminRole</label>
        <input
            type='checkbox'
            checked={adminRole}
            onClick={()=> submitRole()}
            disabled={!isOwner}
            />
    </form>
  )
}

export default UserPreviewForm
