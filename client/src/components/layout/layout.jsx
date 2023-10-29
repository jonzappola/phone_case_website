// Layout.jsx

import React from 'react';
import '../../styles/styles.css'; // Import the global styles

function Layout({ children }) {
  return (
    <div className="app-container">
      {children}
    </div>
  );
}

export default Layout;