import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';

import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmRole, setConfirmRole] = useState('client');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const user = useSelector(state => state?.session?.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
          role: confirmRole
        })
      )
        .then(navigate('/'))
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className='sign-up-container'>
      <h1 className='sign-up-title'>Sign Up</h1>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className='sign-up-inputs'>
          <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          {errors.firstName && <p>{errors.firstName}</p>}

          <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          {errors.lastName && <p>{errors.lastName}</p>}

          <input type="text" placeholder='Email' id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {errors.email && <p>{errors.email}</p>}

          <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
          {errors.username && <p>{errors.username}</p>}

          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          {errors.password && <p>{errors.password}</p>}

          <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

          {user?.role === 'admin' && (
            <select value={confirmRole} onChange={(e) => setConfirmRole(e.target.value)}>
              <option value="" disabled>Select Role</option>
              <option value="client">Client</option>
              <option value='employee'>Employee</option>
              <option value='admin'>Admin</option>
            </select>
          )}
        </div>
        <div className='sign-up-submit'>
          <button
            disabled={
              !email || 
              !username || 
              !firstName || 
              !lastName || 
              !password || 
              !confirmPassword || 
              (user?.role === 'admin' && !confirmRole)
            }
            type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
