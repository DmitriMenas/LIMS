import './NavC.css';

import { NavLink } from 'react-router-dom';
import ProfileButton from '../../Navigation/ProfileButton';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import { useState, useEffect, useRef } from 'react';
import OrderFormModal from '../../Orders/OrderFormModal/OrderFormModal'
import SearchModal from '../../SearchModal/SearchModal';

function NavC({user}) {
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

    <nav className='navc' ref={navRef}>
      <NavLink to={'/'} className='navc-greeting'>Hello, {user.username}.</NavLink>
      <div className='navc-header-modals'>
        <OpenModalButton 
          className='navc-buttons'
          buttonText="Search"
          modalComponent={<SearchModal />}
        />
        <OpenModalButton 
          className='navc-buttons'
          buttonText="Place an Order"
          modalComponent={<OrderFormModal />}
          />
      </div>
      <div className='navc-profile-button-container'>
        <ProfileButton user={user} />
      </div>
    </nav>
  );
}

export default NavC;
