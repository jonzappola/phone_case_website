import React from 'react';
import axios from 'axios';
import '../../styles/auth.css';
import { useAuth } from '../../contexts/authcontext';

const Logout = ({ onLogout, handleLogout }) => {
  const { user } = useAuth(); // Access the user object from the AuthContext

  const logout = async () => {
    try {
      if (user && user.token) { // Check if user and user.token are defined
        console.log('handleLogout function called');
        const response = await axios.post('/auth/logout', { token: user.token }); // Send the user's token in the request body
        if (response.status === 200) {
          console.log('Status Code:', response.status);
          onLogout(); // Call the provided onLogout callback
        } else {
          console.error('Logout failed');
        }
      } else {
        console.error('User or user token is not available.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout(logout)}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
