import './NavC.css';

import { NavLink } from 'react-router-dom';
import ProfileButton from '../../Navigation/ProfileButton';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import { useState, useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../../store/session'
// import { useNavigate } from 'react-router-dom';
import OrderFormModal from '../../Orders/OrderFormModal/OrderFormModal'


function NavC({user}) {
  // const sessionUser = useSelector((state) => state?.session?.user);
  // console.log(user)
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef(null);
  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  // const toggleMenu = () => setShowMenu((prev) => !prev);
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
          buttonText="Place an Order"
          modalComponent={<OrderFormModal />}
          />
        {/* <OpenModalButton
          buttonText="Edit a Sample"
          modalComponent={<SampleEditModal />}
          />
        <OpenModalButton
          buttonText="Edit an Order"
          modalComponent={<OrderEditModal />}
          /> */}
      </div>
      <ProfileButton user={user} />
    </nav>
  );
}

export default NavC;
