import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServerThunk, loadServersThunk } from '../../../store/server';
import { useHistory } from 'react-router-dom';

function ExploreItem({setShowModal, server}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const bg_img = server.preview_img? server.preview_img:null
  const intials = server?.name.split(' ').map(word => word[0].toUpperCase()).join('').slice(0,2)
  useEffect(() => {
  }, [])

  if(!server) return(<h2>Loading...</h2>);
  const goToServer = () =>{
    setShowModal(false)
    dispatch(getServerThunk(server.id))
    history.push(`/servers/${server.id}`)
  }
  let image;
  bg_img?
    image=
    <img className='explore-item-img'src={server.preview_img}/>
  : image=
    <div
    className='explore-item-img'
    onClick={()=> goToServer()}>
    <p>
      {intials}
      </p>
    </div>
   //Need to filter servers for only servers that the user is a part of


  return (
    <li key={server.id} className="explore-item">

            <button
            className="server-links"
            onClick={()=> goToServer()}
              >{image}<p>{server.name}</p></button>
    </li>
  );
}

export default ExploreItem
