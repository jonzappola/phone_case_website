import React, { useState } from 'react';
import Modal from './modal';
import Login from '../auth/login';
import Register from '../auth/register';
import Logout from '../auth/logout'; // Import the Logout component
import logoImage from '../../logo.svg';
import '../../styles/header.css';
import '../../styles/auth.css';
import { useAuth } from '../../contexts/authcontext'; // Import the useAuth hook

const Header = () => {
  const { state, login, logout } = useAuth(); // Access authentication state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const isAuthenticated = state.user !== null;

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

  const handleLogin = (token) => {
    login(token);
    closeModals();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <nav>
        <img src={logoImage} className="logo" alt="" />
        <ul className="nav-links">
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
       {isAuthenticated && <Logout onLogout={handleLogout} />} {/* Pass the onLogout callback */}
      <Modal isOpen={showLoginModal} onClose={closeModals}>
        <Login onClose={closeModals} onLogin={handleLogin} openRegisterModal={openRegisterModal} />
      </Modal>
      <Modal isOpen={showRegisterModal} onClose={closeModals}>
        <Register onClose={closeModals} />
      </Modal>
    </header>
  );
};

export default Header;
