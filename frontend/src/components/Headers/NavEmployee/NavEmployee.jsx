import './NavEmployee.css';
import ProfileButton from '../../Navigation/ProfileButton';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import SearchModal from '../../SearchModal/SearchModal';
import { useEffect, useState, useRef } from 'react';


function Navigation({user}) {
    const [showMenu, setShowMenu] = useState(false);
    const navRef = useRef(null);
    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
          closeMenu();
        }
      };
  
      if (showMenu) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showMenu]);

  return (

    <div className='nave'>
      <div className='nave-logo-container'>
        <NavLink to='/'>
          <img src='../../../../images/chemhistory-logo-hexagon.png'  alt='hexagon-logo' className='nave-logo'/>
        </NavLink>
      </div>
      <div className='nave-header-features'>
        <div className='nave-seach-container'>
          <OpenModalButton 
              className='nave-search-button'
              buttonText="Search Your Samples"
              modalComponent={<SearchModal />}
            />
        </div>
        <div className='nave-docs-container'>
          <NavLink to='/users-employees' className='nave-docs-link'>Users & Employees</NavLink>
        </div>
        <div className='nave-profile-container'>
          <ProfileButton className='nave-profilebutton'user={user}/>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
