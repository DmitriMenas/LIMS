import './NavNC.css'
import { NavLink } from 'react-router-dom';


export default function NavNC() {
  

  return (
    <div className='navnc'>
      <div className='navnc-logo'>
        <NavLink to='/'>
          <img src='/images/chemhistory-logo.png' alt='logo'/>
        </NavLink>
      </div>
      <div className='navnc-links'>
        <NavLink to='/services' >Our Services</NavLink>
        <NavLink to='/contact' >Contact Us</NavLink>
      </div>
      <div className='navnc-login-signup'>
        <button className='login-button'><NavLink to='/login'>Login</NavLink></button>
        <button className='signup-button'><NavLink to='/signup'>SignUp</NavLink></button>
      </div>
    </div>
  );
}
