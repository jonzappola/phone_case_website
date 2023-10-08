import React from 'react';
import axios from 'axios';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout');

      if (response.status === 200) {
        onLogout();
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
