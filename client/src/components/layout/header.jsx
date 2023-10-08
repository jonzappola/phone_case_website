// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/header.css';
const Header = ({ isLoggedIn, onLogoutClick}) => {
  return (
    <header>
      <nav>
        <div className="logo"></div>
        <ul className="nav-links">
          {!isLoggedIn && (
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="login-button">
        {isLoggedIn ? (
          <button onClick={onLogoutClick}>Logout</button>
        ) : null}
      </div>
    </header>
  );
};
export default Header;
