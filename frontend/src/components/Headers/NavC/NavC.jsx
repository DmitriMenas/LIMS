import './NavC.css';

import { NavLink } from 'react-router-dom';
import ProfileButton from '../../Navigation/ProfileButton';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import OrderFormModal from '../../Orders/OrderFormModal/OrderFormModal'
import SearchModal from '../../SearchModal/SearchModal';
import { useModal } from '../../../context/Modal';

function NavC({user}) {
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef(null);
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
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

  // const logout = (e) => {
  //     e.preventDefault();
  //     dispatch(sessionActions.logout());
  //     closeMenu();
  //     navigate('/')
  //   };


  return (

    <nav className='nav-bar' ref={navRef}>
      <NavLink to={'/'} className='ul-sub-info'>Hello, {user.username}.</NavLink>
      <div className='navc-header-modals'>
        <OpenModalButton 
          buttonText="Search"
          modalComponent={<SearchModal />}
        />
        <OpenModalButton 
          buttonText="Place an Order"
          modalComponent={<OrderFormModal />}
          />
      </div>
      <ProfileButton user={user} />
    </nav>
  );
}

export default NavC;
