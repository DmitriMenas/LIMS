import './Navigation.css';
// import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavC from '../Headers/NavC/NavC';
import NavEmployee from '../Headers/NavEmployee/NavEmployee'
import NavNC from '../Headers/NavNC/NavNC';



function Navigation() {
  const user = useSelector(state => state.session.user);
  console.log(user?.role)
  // const [isLoaded, setIsLoaded] = useState(false);
  return (

    <>
      <div className='navmain'>
          {user ? (
            user.role === 'employee' || user.role === 'admin' ? (
              /*put isLoaded={isLoaded} inso each of the <Navs> if needed */
              <NavEmployee user={user}/>
            ) : (
              <NavC user={user}/>
            )
          ) : (
              <NavNC user={user}/>
          )}
        </div>
    </>
  );
}

export default Navigation;
