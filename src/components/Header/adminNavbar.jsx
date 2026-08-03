import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
   window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4 py-3 admin-modern-nav shadow-lg sticky-top">
      <div className="container-fluid">
        
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2 text-decoration-none" to="/admin/dashboard">
          <div className="admin-logo-box d-flex align-items-center justify-content-center text-white rounded-3 shadow-sm" style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)' }}>
            🛡️
          </div>
          <span className="fw-extrabold tracking-wide text-white">Admin Portal</span>
        </Link>

        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#adminNavbarNav"
          aria-controls="adminNavbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="adminNavbarNav">
          
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2 align-items-center">
            <li className="nav-item">
              <Link 
                className={`nav-link fw-semibold px-3 py-2 admin-nav-link rounded-pill ${isActive('/admin/dashboard') ? 'active-nav-item' : ''}`} 
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link fw-semibold px-3 py-2 admin-nav-link rounded-pill ${isActive('/admin/add-product') ? 'active-nav-item' : ''}`} 
                to="/admin/add-product"
              >
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link fw-semibold px-3 py-2 admin-nav-link rounded-pill ${isActive('/admin/manage-products') ? 'active-nav-item' : ''}`} 
                to="/admin/manage-products"
              >
                Manage Products
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link fw-semibold px-3 py-2 admin-nav-link rounded-pill ${isActive('/admin/manage-orders') ? 'active-nav-item' : ''}`} 
                to="/admin/manage-orders"
              >
                Manage Orders
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {user ? (
              <div className="d-flex align-items-center px-3 py-1.5 rounded-pill border border-secondary border-opacity-25 shadow-sm gap-3 profile-pill-container">
                
                <div 
                   onClick={() => navigate('/admin/admin-profile')}
                   className="d-flex align-items-center gap-2 profile-clickable-area" 
                   style={{ cursor: 'pointer' }}
                   title="View Profile"
                >
                  <span className="text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: '32px', height: '32px', fontSize: '13px', background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)' }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </span>
                  <span className="fw-semibold text-white mb-0 text-capitalize" style={{ fontSize: '14px' }}>
                    {user.name}
                  </span>
                </div>

                <button 
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm px-3 py-1 fw-semibold rounded-pill shadow-sm logout-btn"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogout}
                className="btn btn-danger btn-sm px-4 py-1.5 fw-semibold rounded-pill shadow-sm logout-btn"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .admin-modern-nav {
          background: linear-gradient(180deg, #0d1322 0%, #090d16 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .admin-nav-link {
          color: #94a3b8 !important;
          transition: all 0.25s ease;
        }
        .admin-nav-link:hover {
          color: #ffffff !important;
          background-color: rgba(255, 255, 255, 0.05);
        }
        .active-nav-item {
          color: #ffffff !important;
          background: linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(190, 18, 60, 0.2) 100%) !important;
          border: 1px solid rgba(244, 63, 94, 0.4);
        }
        .profile-pill-container {
          background-color: rgba(13, 19, 34, 0.9);
          transition: all 0.2s ease;
        }
        .profile-pill-container:hover {
          border-color: rgba(244, 63, 94, 0.4) !important;
        }
        .profile-clickable-area:hover span:last-child {
          color: #f43f5e !important;
        }
        .logout-btn {
          background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%);
          border: none;
          transition: all 0.2s ease;
        }
        .logout-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(244, 63, 94, 0.4);
        }
      `}</style>
    </nav>
  );
};

export default AdminNavbar;