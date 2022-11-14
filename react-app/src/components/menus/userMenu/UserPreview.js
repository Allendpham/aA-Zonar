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
  console.log(currentServer.admins)


  const handleSubmit = async (e) => {
    e.preventDefault();


  }





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
