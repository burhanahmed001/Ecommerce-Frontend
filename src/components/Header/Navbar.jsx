import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
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
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
 window.location.replace("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top px-4 py-3 custom-glass-nav shadow-sm">
      <div className="container-fluid">
        
        <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center gap-2 brand-logo" to="/">
          <span className="brand-icon-box">🛒</span>
          <span className="brand-text">Burhan Store</span>
        </Link>

        <button 
          className="navbar-toggler border-0 shadow-none custom-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3 align-items-center">
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3 py-2 custom-nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3 py-2 custom-nav-link" to="/about">About</Link>
            </li>

           
            {user && (
              <>
                {user.role === 'customer' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link fw-semibold px-3 py-2 custom-nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link fw-semibold px-3 py-2 custom-nav-link" to="/orders">My Orders</Link>
                    </li>
                  </>
                )}

                {user.role === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold px-3 py-2 text-danger custom-nav-link" to="/admin/dashboard">Admin Dashboard</Link>
                  </li>
                )}
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3 py-2 custom-nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Right Side Section with Profile Click & Pointer Hand */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {user ? (
              <div className="d-flex align-items-center bg-white px-3 py-1 rounded-pill border shadow-sm gap-3">
                <div 
                  onClick={() => navigate('/profile')} 
                  className="d-flex align-items-center gap-2" 
                  style={{ cursor: 'pointer' }}
                  title="View Profile"
                >
                  <span className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '30px', height: '30px', fontSize: '13px' }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                  <span className="fw-semibold text-dark mb-0" style={{ fontSize: '14px' }}>
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
              <>
                <Link 
                  to="/auth/login" 
                  className="btn btn-outline-custom px-4 py-2 fw-semibold rounded-pill"
                >
                  Login
                </Link>
                <Link 
                  to="/auth/register" 
                  className="btn btn-primary-custom px-4 py-2 fw-semibold text-white rounded-pill shadow"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-glass-nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(229, 231, 235, 0.8);
        }

        .brand-logo {
          text-decoration: none;
        }

        .brand-icon-box {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          padding: 6px 10px;
          border-radius: 12px;
          font-size: 1.1rem;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
        }

        .brand-text {
          background: linear-gradient(135deg, #4f46e5 0%, #9333ea 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.5px;
        }

        .custom-nav-link {
          color: #4b5563 !important;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .custom-nav-link:hover {
          color: #6366f1 !important;
          background-color: rgba(99, 102, 241, 0.08);
          transform: translateY(-1px);
        }

        .btn-outline-custom {
          color: #6366f1;
          border: 2px solid #6366f1;
          background: transparent;
          transition: all 0.3s ease;
        }

        .btn-outline-custom:hover {
          background-color: #6366f1;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .btn-primary-custom {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          transition: all 0.3s ease;
        }

        .btn-primary-custom:hover {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          box-shadow: 0 6px 15px rgba(99, 102, 241, 0.4);
          transform: translateY(-1px);
        }

        .logout-btn {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border: none;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          transform: translateY(-1px);
        }
      `}</style>
    </nav>
  );
}

export default Navbar;