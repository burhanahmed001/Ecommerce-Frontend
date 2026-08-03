import React from 'react';

const CopyRight = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ 
      background: '#1e1b4b', 
      color: '#ffffff', 
      textAlign: 'center', 
      padding: '20px 0',
      width: '100%',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.7)', 
          margin: 0, 
          fontSize: '14px',
          fontWeight: '500',
          letterSpacing: '0.3px'
        }}>
          &copy; {year} All Rights Reserved. Designed & Developed by Burhan.
        </p>
      </div>
    </footer>
  );
};

export default CopyRight;