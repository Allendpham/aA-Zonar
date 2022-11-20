import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import './index.css'

const SplashPage = () => {
   //Write code to redirect to /@me if there is a logged in user
   const sessionUser = useSelector(state => state.session.user)
   if(sessionUser) {
      return <Redirect to='/@me'/>;
   }

   return (
   <div className='splashpagewrapper'>
      <div className='navbar'>
         <NavLink className='home-logo-link' exact to="/"><img src="https://i.imgur.com/osDIwkc.png" className="home-logo"></img>Zonar</NavLink>
         <div className='github-links'>
            Collaborators :
            <ul className='collaborators-list'>
               <li><a target="_blank" href="https://github.com/Allendpham">Allen Pham | </a></li>
               <li><a target="_blank" href="https://github.com/TheBabblingBrin">Brin Hoover |</a></li>
               <li><a target="_blank" href="https://github.com/Benties">Ben Thai | </a></li>
               <li><a target="_blank" href="https://github.com/kgsolano">Kyle Solano | </a></li>
               <li><a target="_blank" href="https://github.com/Allendpham/aA-Zonar">Project Repo</a></li>
            </ul>
         </div>
         <NavLink className='login-link' exact to="/login">Login</NavLink>
      </div>

      <div className='maincontent'>
         <h1>IMAGINE A PLACE...</h1>
         <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
         <NavLink className='welcome-button' exact to="/login">Welcome to Zonar</NavLink>
      </div>
   </div>)
}

export default SplashPage;
