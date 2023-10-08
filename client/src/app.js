import './app.css';
import Login from './components/auth/login.jsx';
import Logout from './components/auth/login.jsx';
import React, { useState } from 'react';
function App() {
  // Define a state variable to track user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Callback function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <h1>My Phone Case Website</h1>

      {isLoggedIn ? (
        // Display the Logout component when the user is authenticated
        <Logout onLogout={handleLogout} />
      ) : (
        // Display the Login component when the user is not authenticated
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
