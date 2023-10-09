import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const Login = ({ onLogin, openRegisterModal }) => {
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
      const response = await axiosInstance.post('/auth/login', { email, password });
  
      if (response.status === 200) {
        const data = response.data; // Get the token from the response
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; // Set the Authorization header with the token
        onLogin(data.token);
        console.log('Status Code:', response.status);
        setSuccessMessage('Login successful');
        setError(null);
        setErrorVisible(false);
        navigate('/'); // Redirect to the root directory
      } else if (response.status === 400) {
        const errorResponse = response.data;
        setError(errorResponse.message); // Extract and set the error message
        setSuccessMessage(null);
        setErrorVisible(true);
      } else {
        setError('Login Failed');
        setSuccessMessage(null);
        setErrorVisible(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
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
      <form>
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
        <div id="content">
          <button className="login-button" type="button" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
      {errorVisible && <p className="error-message">{error}</p>}
      <p>
        New Customer? Register{' '}
        <span className="register-link-button" onClick={openRegisterModal}>
          Here
        </span>
        .
      </p>
    </div>
  );
};

export default Login;
