import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import LandingPage from './components/LandingPage/LandingPage';
import LoginFormModal from './components/LoginFormModal/LoginFormModal';
import SignupFormModal from './components/SignupFormModal/SignupFormModal';
import OrderDetailsPage from './components/Orders/OrderDetailsPage/OrderDetailsPage';
import SampleDetailPage from './components/Samples/SampleDetailPage/SampleDetailPage'
import ContactUs from './components/ContactUs/ContactUs';
import ServicesPage from './components/ServicesPage/ServicesPage';
import UEPage from './components/UEPage/UEPage';
import { Modal } from './context/Modal';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
      <Modal />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <LoginFormModal />
      },
      {
        path: 'signup',
        element: <SignupFormModal />
      },
      {
        path: '/',
        element: <LandingPage />,
      }, 
      {
        path: '/contact',
        element: <ContactUs />
      },
      {
        path: "/services",
        element: <ServicesPage />
      },
      {
        path: "/users-employees",
        element: <UEPage />
      },
      {
        path: '/orders/:orderId',
        element: <OrderDetailsPage />
      },
      {
        path: '/samples/:sampleId',
        element: <SampleDetailPage />
      },
      {
        path: '*',
        element: <h1>Tf u doing here, stupid?</h1>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
