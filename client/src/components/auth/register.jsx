import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/login-register.css';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/auth/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        // Registration successful, trigger a login
        onRegister();
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred during registration.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleRegister}>
          Register
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Register;
