import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from './MainLayout';

function About() {
  return (
    <MainLayout>
      <div className="min-vh-100 pb-5" style={{ backgroundColor: '#f8fafc' }}>
        
        <section className="container py-5 text-center">
          <div className="hero-ultra-banner p-5 rounded-5 mx-auto position-relative overflow-hidden text-white shadow-lg" style={{ maxWidth: '1000px' }}>
            <div className="position-relative z-2 py-3">
              
              <span className="badge px-4 py-2 rounded-pill fw-bold mb-3 shadow-sm border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', color: '#ffffff', backdropFilter: 'blur(10px)', fontSize: '12px', letterSpacing: '1px' }}>
                ABOUT BURHAN STORE
              </span>

              <h1 className="display-4 fw-bold mb-3" style={{ letterSpacing: '-1px', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                Redefining Online Shopping <br />
                <span className="text-warning fw-bolder">With Excellence & Trust</span>
              </h1>

              <p className="text-white lead fs-6 mx-auto mb-4 opacity-90" style={{ maxWidth: '720px', lineHeight: '1.7' }}>
                Burhan Store is your premier destination for high-end electronics, fashion, and daily essentials. We are committed to delivering top-tier quality products directly to your doorstep with unmatched reliability.
              </p>

              <div className="d-flex justify-content-center align-items-center gap-3">
                <Link to="/" className="btn btn-light text-dark fw-bold px-4 py-2.5 rounded-pill shadow-sm explore-cta-btn">
                  Back to Home 👇
                </Link>
              </div>

            </div>
            
            <div className="orb-1"></div>
            <div className="orb-2"></div>
            <div className="orb-3"></div>
          </div>
        </section>

        <section className="container pb-5 pt-3">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="p-5 bg-white rounded-4 shadow-sm border h-100 d-flex flex-column justify-content-center">
                <h2 className="fw-bold text-dark mb-4 h3">Our Mission & Vision</h2>
                <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                  Our mission is to create a seamless, secure, and user-friendly shopping experience. We carefully curate our collection to ensure that every product meets the highest standards of quality and durability.
                </p>
                <p className="text-muted mb-0" style={{ lineHeight: '1.8' }}>
                  We strive to build long-lasting relationships with our customers by offering exceptional support, transparent pricing, and rapid delivery services across the board.
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-12 col-sm-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm border text-center h-100">
                    <div className="fs-1 mb-3">🚀</div>
                    <h5 className="fw-bold text-dark mb-2">Fast Delivery</h5>
                    <p className="text-muted small mb-0">Prompt shipping and reliable logistics to get your orders on time.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm border text-center h-100">
                    <div className="fs-1 mb-3">🛡️</div>
                    <h5 className="fw-bold text-dark mb-2">Secure Shopping</h5>
                    <p className="text-muted small mb-0">Protected transactions and safe data privacy for total peace of mind.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm border text-center h-100">
                    <div className="fs-1 mb-3">💎</div>
                    <h5 className="fw-bold text-dark mb-2">Top Quality</h5>
                    <p className="text-muted small mb-0">Carefully verified products ensuring premium standards and performance.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm border text-center h-100">
                    <div className="fs-1 mb-3">🤝</div>
                    <h5 className="fw-bold text-dark mb-2">24/7 Support</h5>
                    <p className="text-muted small mb-0">Dedicated assistance ready to help you with your queries anytime.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <style>{`
        .hero-ultra-banner {
          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 35%, #a855f7 70%, #ec4899 100%);
          box-shadow: 0 20px 45px rgba(99, 102, 241, 0.3) !important;
          position: relative;
        }

        .explore-cta-btn {
          transition: all 0.2s ease;
        }

        .explore-cta-btn:hover {
          transform: translateY(-2px);
          background-color: #f8fafc !important;
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        }

        .orb-1 {
          position: absolute;
          top: -60px;
          left: -60px;
          width: 220px;
          height: 220px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          filter: blur(50px);
          pointer-events: none;
        }

        .orb-2 {
          position: absolute;
          bottom: -60px;
          right: -60px;
          width: 220px;
          height: 220px;
          background: rgba(253, 224, 71, 0.25);
          border-radius: 50%;
          filter: blur(50px);
          pointer-events: none;
        }

        .orb-3 {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 180px;
          height: 180px;
          background: rgba(236, 72, 153, 0.2);
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
      `}</style>
    </MainLayout>
  );
}

export default About;