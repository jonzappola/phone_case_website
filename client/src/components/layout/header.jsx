import React, { useState, useEffect } from 'react';
import Modal from './modal';
import Login from '../auth/login';
import Register from '../auth/register';
import Logout from '../auth/logout'; // Import the Logout component
import logoImage from '../../logo.svg';
import '../../styles/header.css';
import '../../styles/auth.css';

const Header = ({ isLoggedIn, onLogoutClick, onLoginClick }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  // Define the handleLogin function here or use another function
  const handleLogin = (token) => {
    // Handle login logic
    setIsAuthenticated(true);
    // Close the login modal or perform any other actions
    closeModals();
  };

  // Define the handleLogout function
  const handleLogout = (logout) => {
    // Handle logout logic
    return async () => {
      await logout();
      setIsAuthenticated(false);
      onLogoutClick(); // Call the provided onLogoutClick callback
    };
  };

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <header>
      <nav>
        <img src={logoImage} className="logo" />
        <ul className="nav-links">
          {/* Render "Login" and "Register" buttons only if not authenticated */}
          {!isAuthenticated && (
            <li>
              <button className="login-button" onClick={openLoginModal}>
                Login
              </button>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <button className="register-button" onClick={openRegisterModal}>
                Register
              </button>
            </li>
          )}
        </ul>
      </nav>
      {/* Render "Logout" button only if authenticated */}
      {isAuthenticated && <Logout onLogout={onLogoutClick} handleLogout={handleLogout} />}
      <Modal isOpen={showLoginModal} onClose={closeModals}>
        {/* Pass the handleLogin function to the Login component as onLogin */}
        <Login onClose={closeModals} onLogin={handleLogin} openRegisterModal={openRegisterModal} />
      </Modal>
      <Modal isOpen={showRegisterModal} onClose={closeModals}>
        <Register onClose={closeModals} />
      </Modal>
    </header>
  );
};

export default Header;
