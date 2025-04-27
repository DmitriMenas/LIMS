import './NavEmployee.css';
import ProfileButton from '../../Navigation/ProfileButton';
import { NavLink } from 'react-router-dom';


function Navigation({user}) {

  return (

    <div className='nave'>
      <div className='nave-logo-container'>
        <NavLink to='/'>
          <img src='../../../../images/chemhistory-logo-hexagon.png'  alt='hexagon-logo' className='nave-logo'/>
        </NavLink>
      </div>
      <div className='nave-docs-container'>
        <NavLink to='/documents' className='nave-docs-link'>Docs</NavLink>
      </div>
      <div className='nave-profile-container'>
        <ProfileButton className='nave-profilebutton'user={user}/>
      </div>
    </div>
  );
}

export default Navigation;
