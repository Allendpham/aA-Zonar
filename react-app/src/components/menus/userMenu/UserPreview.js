import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getServerThunk } from '../../../store/server';

const UserPreviewForm = ({setShowModal, currentServer, user}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [adminRole, setAdminRole] = useState(true)



    if(!currentServer) return (<h1>Loading</h1>)



    for (const userAdmin in currentServer.admins) {
        if (userAdmin.id === user.id) {
            setAdminRole(true)
        }
    }


  const handleSubmit = async (e) => {
    e.preventDefault();

    //Needs to send a thunk to the backend to hit an endpoint that will store the user in admin join table
  }

  //form should only display if the user is the owner of the server




  return(
    <form className='user-preview-form' onSubmit={handleSubmit}>
        <label>AdminRole</label>
        <input
            type='checkbox'
            checked={adminRole}
            onClick={()=>setAdminRole(!adminRole)}
            />
    </form>
  )
}

export default UserPreviewForm
