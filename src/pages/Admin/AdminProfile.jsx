import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

function AdminProfile() {
  const navigate = useNavigate();

  const [user] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : { name: 'Burhan', email: 'burhana12od@gmail.com', role: 'ADMIN' };
    } catch (e) {
      return { name: 'Burhan', email: 'burhana12od@gmail.com', role: 'ADMIN' };
    }
  });

  return (
    <AdminLayout>
      <div className="min-vh-100 pb-5 text-white" style={{ backgroundColor: '#070d1b' }}>
        
        <div className="py-4 mb-4" style={{ background: 'linear-gradient(180deg, #0d1322 0%, #070d1b 100%)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div className="container px-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3" style={{ maxWidth: '1000px' }}>
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-3 py-1 rounded-pill fw-bold text-uppercase" style={{ fontSize: '10px', letterSpacing: '1.2px' }}>
                  🛡️ Secure Workspace
                </span>
                <span className="text-secondary" style={{ fontSize: '13px' }}>/ Account Details</span>
              </div>
              <h2 className="fw-bold text-white mb-0" style={{ fontSize: '26px', letterSpacing: '-0.5px' }}>Administrator Profile</h2>
            </div>
            
            <button 
              onClick={() => navigate('/admin/dashboard')} 
              className="btn btn-sm btn-outline-light rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 transition-all"
              style={{ borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.03)' }}
            >
              <span>←</span> Dashboard Overview
            </button>
          </div>
        </div>

        <div className="container px-3" style={{ maxWidth: '1000px' }}>
          
          <div className="card border-0 shadow-2xl rounded-5 p-4 p-md-5 text-white position-relative overflow-hidden mb-4 profile-card-master">
            
            <div className="position-absolute top-0 end-0 bg-danger rounded-circle opacity-10 pointer-events-none" style={{ width: '380px', height: '380px', filter: 'blur(110px)', zIndex: '0' }}></div>

            <div className="position-relative" style={{ zIndex: '1' }}>

              <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gap-4 mb-4 pb-4 border-bottom border-secondary border-opacity-15">
                
                <div 
                  className="text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-lg flex-shrink-0 avatar-master"
                  style={{ width: '115px', height: '115px', fontSize: '44px' }}
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 mb-2">
                    <h3 className="fw-bold text-white mb-0 text-capitalize" style={{ fontSize: '28px', letterSpacing: '-0.5px' }}>{user?.name || 'Admin Name'}</h3>
                    <span className="badge px-3 py-1.5 rounded-pill fw-bold text-uppercase shadow-sm" style={{ fontSize: '11px', letterSpacing: '1px', backgroundColor: '#e11d48', color: '#fff' }}>
                      {user?.role || 'ADMIN'}
                    </span>
                  </div>
                  <p className="text-secondary mb-3 fs-6 font-monospace">{user?.email || 'admin@burhanstore.com'}</p>
                  
                  <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                    <div className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-pill border border-success border-opacity-25" style={{ backgroundColor: 'rgba(22, 163, 74, 0.08)' }}>
                      <span className="spinner-grow spinner-grow-sm text-success" role="status" style={{ width: '7px', height: '7px' }}></span>
                      <span className="fw-semibold text-success" style={{ fontSize: '12px' }}>Full System Control & Privileges Active</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="p-3.5 rounded-4 text-center h-100 metric-box-master">
                    <span className="text-secondary d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.8px' }}>Access Clearance</span>
                    <span className="fw-bold text-info fs-6">Super User Tier-1</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3.5 rounded-4 text-center h-100 metric-box-master">
                    <span className="text-secondary d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.8px' }}>Security Protocol</span>
                    <span className="fw-bold text-success fs-6">JWT Encrypted</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3.5 rounded-4 text-center h-100 metric-box-master">
                    <span className="text-secondary d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.8px' }}>Database Pipeline</span>
                    <span className="fw-bold text-warning fs-6">Live & Connected 🟢</span>
                  </div>
                </div>
              </div>

              <h6 className="fw-bold text-uppercase text-secondary mb-3" style={{ fontSize: '11px', letterSpacing: '1.2px' }}>Administrator Credentials</h6>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="p-4 rounded-4 h-100 d-flex flex-column justify-content-center credential-box-master">
                    <span className="text-secondary small fw-bold text-uppercase mb-1" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Full Name</span>
                    <span className="fw-bold text-white fs-6 text-capitalize">{user?.name || 'N/A'}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-4 rounded-4 h-100 d-flex flex-column justify-content-center credential-box-master">
                    <span className="text-secondary small fw-bold text-uppercase mb-1" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Email Address</span>
                    <span className="fw-bold text-white fs-6 font-monospace">{user?.email || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-4 action-panel-master">
                <h6 className="fw-bold text-uppercase text-secondary mb-3" style={{ fontSize: '11px', letterSpacing: '1.2px' }}>Management Shortcuts & Navigation</h6>
                <div className="d-flex flex-wrap gap-3">
                  <button 
                    onClick={() => navigate('/admin/dashboard')} 
                    className="btn btn-danger rounded-pill px-4 py-2.5 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 flex-fill action-primary-master"
                  >
                    📊 Admin Dashboard
                  </button>
                  <button 
                    onClick={() => navigate('/admin/manage-products')} 
                    className="btn btn-outline-light rounded-pill px-4 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2 flex-fill action-secondary-master"
                  >
                    📦 Manage Products
                  </button>
                  <button 
                    onClick={() => navigate('/admin/manage-orders')} 
                    className="btn btn-outline-light rounded-pill px-4 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2 flex-fill action-secondary-master"
                  >
                    🛒 Manage Orders
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <style>{`
          .profile-card-master {
            background: linear-gradient(145deg, #0d1322 0%, #070d1b 100%);
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 35px 70px rgba(0, 0, 0, 0.65) !important;
          }
          .avatar-master {
            background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%);
            box-shadow: 0 12px 35px rgba(244, 63, 94, 0.45) !important;
            border: 2px solid rgba(255, 255, 255, 0.12);
          }
          .metric-box-master, .credential-box-master, .action-panel-master {
            background-color: #080f1e;
            border: 1px solid rgba(255, 255, 255, 0.06);
            transition: all 0.25s ease-in-out;
          }
          .metric-box-master:hover, .credential-box-master:hover {
            border-color: rgba(244, 63, 94, 0.4);
            transform: translateY(-2px);
            background-color: #0b1324;
          }
          .action-primary-master {
            background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%) !important;
            border: none !important;
            transition: all 0.2s ease;
          }
          .action-primary-master:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(244, 63, 94, 0.5);
            opacity: 0.95;
          }
          .action-secondary-master {
            background-color: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            transition: all 0.2s ease;
          }
          .action-secondary-master:hover {
            background-color: rgba(255, 255, 255, 0.08) !important;
            border-color: rgba(255, 255, 255, 0.3) !important;
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    </AdminLayout>
  );
}

export default AdminProfile;