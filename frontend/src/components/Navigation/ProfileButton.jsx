import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import { useNavigate } from 'react-router-dom';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
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

  const handleAlert = () => {
    alert("Feature coming soon")
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile">
      <button onClick={toggleMenu} className='profile-button'>
        <FaUserCircle />
      </button>
      <div className="profile-dropdown" ref={ulRef} hidden={!showMenu}>
        <div className='profile-info-dropdown'>
          <ul className='ul-info'>
            <p className='ul-sub-info'>Hello, {user.firstName}</p>
            <p className='ul-sub-info'>{user.email}</p>
            <div className='ul-sub-info'>
              <button className='settings-button'onClick={handleAlert}>Settings</button>
            </div>
            <div className='ul-sub-info'>
              <button onClick={logout} className='logout-button'>Log Out</button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;