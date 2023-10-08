import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/login-register.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post('/auth/login', { email, password });

      if (response.status === 200) {
        const data = response.data;
        onLogin(data.token);
        setSuccessMessage('Login successful');
        setError(null);
        setErrorVisible(false); // Hide error message
        navigate('/'); // Redirect to the root directory
      } else {
        setError('Login Failed');
        setSuccessMessage(null);
        setErrorVisible(true);
      }
    } catch (error) {
      setError('An error occurred.');
      setSuccessMessage(null);
      setErrorVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errorVisible) {
      const hideErrorTimeout = setTimeout(() => {
        setErrorVisible(false);
      }, 5000);

      return () => {
        clearTimeout(hideErrorTimeout);
      };
    }
  }, [errorVisible]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleLogin}>
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
        <button className="login-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Logging In...' : 'Enter'}
        </button>
      </form>
      {errorVisible && (
        <p className="error-message">{error}</p>
      )}
      <p>
        New Customer? Register <a href="/auth/register">Here</a>.
      </p>
    </div>
  );
};

export default Login;
