import React from 'react';
import { Navbar } from '@/components/Header'; 
import Footer from '@/components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ flex: 1, padding: '30px', background: '#f9fafb' }}>
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;