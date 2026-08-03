import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './MainLayout';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    const section = document.getElementById('trending-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainLayout>
      <div className="min-vh-100 pb-5" style={{ backgroundColor: '#f8fafc' }}>
        
        <section className="container py-5 text-center">
          <div className="hero-ultra-banner p-5 rounded-5 mx-auto position-relative overflow-hidden text-white shadow-lg" style={{ maxWidth: '1000px' }}>
            <div className="position-relative z-2 py-3">
              
              <span className="badge px-4 py-2 rounded-pill fw-bold mb-3 shadow-sm border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', color: '#ffffff', backdropFilter: 'blur(10px)', fontSize: '12px', letterSpacing: '1px' }}>
                🔥 BURHAN STORE MEGA SALE 2026
              </span>

              <h1 className="display-4 fw-bold mb-3" style={{ letterSpacing: '-1px', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                Elevate Your Lifestyle With <br />
                <span className="text-warning fw-bolder">Smart & Trendy Products</span>
              </h1>

              <p className="text-white lead fs-6 mx-auto mb-4 opacity-90" style={{ maxWidth: '720px', lineHeight: '1.7' }}>
                Welcome to Burhan Store, your ultimate destination for high-end electronics, fashion, and everyday essentials. We bring quality right to your doorstep with guaranteed customer satisfaction.
              </p>

              <div className="d-flex justify-content-center align-items-center gap-3 mb-5 flex-wrap">
                <button 
                  onClick={scrollToProducts}
                  className="btn btn-light text-dark fw-bold px-4 py-2.5 rounded-pill shadow-sm explore-cta-btn"
                >
                  Explore Collection 👇
                </button>
                <Link to="/about" className="btn btn-outline-light fw-semibold px-4 py-2.5 rounded-pill">
                  About Us
                </Link>
              </div>

              <div className="row text-center border-top border-white border-opacity-25 pt-4 mt-2 g-3">
                <div className="col-4">
                  <div className="p-2 rounded-3 bg-white bg-opacity-10 backdrop-blur">
                    <h6 className="fw-bold mb-1 text-warning">⚡ Fast Delivery</h6>
                    <small className="text-white-50" style={{ fontSize: '11px' }}>Quick & safe shipping</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 rounded-3 bg-white bg-opacity-10 backdrop-blur">
                    <h6 className="fw-bold mb-1 text-warning">🛡️ 100% Secure</h6>
                    <small className="text-white-50" style={{ fontSize: '11px' }}>Trusted transactions</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 rounded-3 bg-white bg-opacity-10 backdrop-blur">
                    <h6 className="fw-bold mb-1 text-warning">💎 Top Quality</h6>
                    <small className="text-white-50" style={{ fontSize: '11px' }}>Verified products</small>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="orb-1"></div>
            <div className="orb-2"></div>
            <div className="orb-3"></div>
          </div>
        </section>

        <section id="trending-section" className="container pb-5 pt-3">
          <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
            <h2 className="h4 fw-bold text-dark m-0 d-flex align-items-center gap-2">
              🔥 Trending Collection
            </h2>
            <span className="text-muted small fw-medium">Fresh items just arrived</span>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-indigo mb-2" role="status" style={{ width: '2.5rem', height: '2.5rem', color: '#6366f1' }}></div>
              <p className="text-muted fw-medium">Loading exclusive items...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5 text-danger fw-medium fs-5">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-5 text-muted fw-medium fs-5">No products available at the moment.</div>
          ) : (
            <div className="row g-4">
              {products.map((product) => (
                <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card h-100 border-0 product-card d-flex flex-column justify-content-between rounded-4 overflow-hidden bg-white">
                    <div>
                      <div className="position-relative overflow-hidden bg-light" style={{ height: '210px' }}>
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-100 h-100 object-fit-cover product-img"
                        />
                        <span className="position-absolute top-0 end-0 m-2 badge bg-dark text-white shadow-sm px-2.5 py-1 rounded-pill small fw-bold" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                          {product.category}
                        </span>
                      </div>
                      <div className="card-body p-4">
                        <h5 className="card-title text-dark fw-bold mb-2 text-truncate fs-6">
                          {product.name}
                        </h5>
                        <p className="card-text text-muted small mb-0" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="card-footer bg-white border-0 p-4 pt-0 d-flex align-items-center justify-content-between mt-auto">
                      <div>
                        <span className="text-muted d-block text-uppercase" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Price</span>
                        <span className="fw-bold fs-6 text-indigo" style={{ color: '#6366f1' }}>
                          Rs. {product.price}
                        </span>
                      </div>
                      <Link 
                        to={`/product/${product._id}`} 
                        className="btn btn-sm px-3.5 py-2 fw-semibold rounded-pill text-white shadow-sm view-details-btn"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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

        .product-card {
          border: 1px solid rgba(229, 231, 235, 0.8) !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 30px rgba(99, 102, 241, 0.15) !important;
          border-color: rgba(99, 102, 241, 0.4) !important;
        }

        .product-img {
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-img {
          transform: scale(1.07);
        }

        .view-details-btn {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          border: none;
          transition: all 0.2s ease;
        }

        .view-details-btn:hover {
          background: linear-gradient(135deg, #4f46e5 0%, #9333ea 100%);
          transform: scale(1.04);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </MainLayout>
  );
}

export default Home;