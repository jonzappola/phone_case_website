import React from 'react';
import axios from 'axios';
import '../../styles/auth.css';
import { useAuth } from '../../contexts/authcontext';

const Logout = () => {
  const { user, onLogout } = useAuth(); // Access the user object and onLogout from the AuthContext

  const handleLogout = async () => {
    try {
      if (user && user.token) {
        console.log('Logging out');

        // Send a POST request to the server to log the user out
        const response = await axios.post('/auth/logout', { token: user.token });

        // Check if the logout was successful on the server
        if (response.status === 200) {
          // Call the onLogout function to clear the user from the context
          onLogout();
        } else {
          console.error('Logout failed on the server');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
