import React from 'react';

const Header = ({ isLoggedIn, onLoginClick, onLogoutClick }) => {
  return (
    <header>
      <nav>
        <div className="logo">Your Logo</div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>
        </ul>
        <div className="login-button">
          {isLoggedIn ? (
            <button onClick={onLogoutClick}>Logout</button>
          ) : (
            <button onClick={onLoginClick}>Login</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;