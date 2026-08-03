import React from 'react';
import { AdminNavbar } from '@/components/Header'; 
import Footer from '@/components/Footer';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminNavbar />

      <div style={{ flex: 1, padding: '30px', background: '#f9fafb' }}>
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;