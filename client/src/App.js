// App.js

import './styles/app.css';
import Header from './components/layout/header.jsx';
import Home from './pages/home.jsx';
import Shop from './pages/shop.jsx';
import ProductDetails from './components/products/productdetails.jsx'
import Footer from './components/layout/footer.jsx';
import Login from './components/auth/login.jsx';
import Logout from './components/auth/logout.jsx';
import Register from './components/auth/register.jsx';
//import ProductList from './components/products/productlist.jsx';
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/authcontext.jsx'; // Import the AuthProvider
import Layout from './components/layout/layout.jsx'; // Import the Layout component

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/auth/login';

  // Define a state variable to track user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Callback function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Layout>
      <AuthProvider>
        {!isLoginPage && <Header isLoggedIn={isLoggedIn} onLogoutClick={handleLogout} />}
        <Header />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products" element={<Shop />} />
            <Route path="/products/:productName" element={<ProductDetails />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/logout" element={<Logout />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Layout>
  );
}

export default App;
