// frontend/src/components/LoginFormPage/LoginFormPage.jsx

import { useState } from 'react';
import { useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // const validateForm = () => {
  //   const newErrors = {};
  // }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        closeModal;
        navigate('/')
      })
      .catch(async (res) => {
        const data = await res.json();
        // console.log("API response:", data); // Debugging
      
        if (data && data.errors) {
          setErrors(data.errors); // Set the errors object from API
        } else if (data.errors?.message) {
          setErrors({ general: data.errors.message }); // Handle message key directly
        } else {
          setErrors({ general: "The provided credentials were invalid." }); // Fallback message
        }
      }
       );
  //   const response = await dispatch(sessionActions.login({ credential, password }))
  //     if (response) {
  //       closeModal;
  //       navigate('/');
  //     }
  };

  useEffect(() => {}, [errors]);

  const handleDemoLogin1 = () => {
    setErrors({}); // Clear any previous errors
    return dispatch(sessionActions.login({ credential: "demo1@user.io", password: "password1" }))
      .then(closeModal)
      .then(navigate('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin2 = () => {
    setErrors({}); // Clear any previous errors
    return dispatch(sessionActions.login({ credential: "demo2@user.io", password: "password2" }))
      .then(closeModal)
      .then(navigate('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin3 = () => {
    setErrors({}); // Clear any previous errors
    return dispatch(sessionActions.login({ credential: "demo3@user.io", password: "password3" }))
      .then(closeModal)
      .then(navigate('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };
  

  return (
    <>
      <h1 className='login-text'>Log In</h1>
      <p className='error-message'>{errors.general}</p>
      <form onSubmit={handleSubmit} className='submit-form'>
        <label className='input-label'>
          <input
            className='user-input'
            placeholder='Username or Email'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className='input-label'>
          <input
            className='password-input'
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className='error-message'>{errors.credential}</p>
        )}
        <div className='login-button-div'>
          <button 
            type="submit" 
            className='login-button'
            disabled={credential.length < 4 || password.length < 6}>
              Log In
          </button>
        </div>
        <div className='demo-button-div'>
          <button type="button" onClick={handleDemoLogin3} className='demo-button'>Demo Client</button>
          <button type="button" onClick={handleDemoLogin1} className='demo-button'>Demo Employee</button>
          <button type="button" onClick={handleDemoLogin2} className='demo-button'>Demo Admin</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;