import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from './MainLayout';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth/login');
          return;
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-5 min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
          <p className="text-muted fw-semibold">Loading your profile...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-light min-vh-100 pb-5">
        
        {/* Modern Top Hero Banner */}
        <div className="profile-hero-banner text-white text-center shadow-sm py-5 mb-4">
          <div className="container py-4">
            <h1 className="fw-bold display-5 mb-2">My Account Profile</h1>
            <p className="text-white-50 fs-6 mb-0">View your credentials, manage settings, and access quick store links</p>
          </div>
        </div>

        <div className="container" style={{ maxWidth: '850px' }}>
          
          {/* Main Profile Card */}
          <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white position-relative overflow-hidden mb-4">
            
            {/* User Profile Header Section */}
            <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gap-4 mb-4 pb-4 border-bottom">
              
              {/* Profile Avatar */}
              <div 
                className="text-white rounded-circle d-flex align-items-center justify-content-center fw-bold display-4 shadow-lg flex-shrink-0 avatar-circle"
                style={{ width: '100px', height: '100px' }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>

              <div className="flex-grow-1">
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 mb-1">
                  <h2 className="fw-bold text-dark mb-0">{user?.name || 'User Name'}</h2>
                  <span className="badge bg-primary-gradient px-3 py-2 rounded-pill fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.8px' }}>
                    {user?.role || 'Customer'}
                  </span>
                </div>
                <p className="text-muted mb-3 fs-6">{user?.email || 'user@example.com'}</p>
                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                  <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill fw-semibold small">
                    ● Verified & Active Account
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Information Section */}
            <h5 className="fw-bold text-dark mb-3">Personal Information</h5>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="p-3.5 bg-light rounded-4 border h-100 d-flex flex-column justify-content-center">
                  <span className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '11px' }}>Full Name</span>
                  <span className="fw-bold text-dark fs-6">{user?.name || 'N/A'}</span>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3.5 bg-light rounded-4 border h-100 d-flex flex-column justify-content-center">
                  <span className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '11px' }}>Email Address</span>
                  <span className="fw-bold text-dark fs-6">{user?.email || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-4 rounded-4 bg-light border">
              <h5 className="fw-bold text-dark mb-3">Quick Navigation Shortcuts</h5>
              <div className="d-flex flex-wrap gap-3">
                {user?.role === 'customer' && (
                  <button 
                    onClick={() => navigate('/my-orders')} 
                    className="btn btn-primary rounded-pill px-4 py-2.5 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 flex-fill"
                  >
                    📦 View My Orders
                  </button>
                )}
                <button 
                  onClick={() => navigate('/cart')} 
                  className="btn btn-outline-primary rounded-pill px-4 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2 flex-fill"
                >
                  🛒 Go to Shopping Cart
                </button>
                <button 
                  onClick={() => navigate('/')} 
                  className="btn btn-dark rounded-pill px-4 py-2.5 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 flex-fill"
                >
                  🏠 Back to Store
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Custom Styling & Gradients */}
        <style>{`
          .profile-hero-banner {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            margin-top: 0px;
          }
          .avatar-circle {
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.35) !important;
          }
          .bg-primary-gradient {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          }
        `}</style>
      </div>
    </MainLayout>
  );
}

export default Profile;