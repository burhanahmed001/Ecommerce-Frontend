import React, { useState } from 'react';
import MainLayout from './MainLayout';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    const phoneNumber = "923187011571";
    const whatsappMessage = `Hello Burhan Store,%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Message:* ${encodeURIComponent(formData.message)}`;
    
   
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
    
    setSubmitted(true);
  };

  return (
    <MainLayout>
      <div className="min-vh-100 pb-5" style={{ backgroundColor: '#f8fafc' }}>
        
        {/* Professional Light Hero Section */}
        <section className="container py-5 text-center">
          <div className="hero-ultra-banner p-5 rounded-5 mx-auto position-relative overflow-hidden text-white shadow-lg" style={{ maxWidth: '1000px' }}>
            <div className="position-relative z-2 py-3">
              
              <span className="badge px-4 py-2 rounded-pill fw-bold mb-3 shadow-sm border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', color: '#ffffff', backdropFilter: 'blur(10px)', fontSize: '12px', letterSpacing: '1px' }}>
                📞 GET IN TOUCH WITH US
              </span>

              <h1 className="display-4 fw-bold mb-3" style={{ letterSpacing: '-1px', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                We Are Here To Help <br />
                <span className="text-warning fw-bolder">Let's Connect Today</span>
              </h1>

              <p className="text-white lead fs-6 mx-auto mb-0 opacity-90" style={{ maxWidth: '720px', lineHeight: '1.7' }}>
                Have questions about our products, orders, or delivery? Reach out to the Burhan Store team and we will get back to you promptly.
              </p>

            </div>
            
            <div className="orb-1"></div>
            <div className="orb-2"></div>
            <div className="orb-3"></div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="container py-4">
          <div className="row g-5 justify-content-center">
            
            {/* Contact Details Cards */}
            <div className="col-lg-4">
              <div className="d-flex flex-column gap-4 h-100">
                <div className="p-4 rounded-4 bg-white shadow-sm border text-dark">
                  <div className="fs-3 mb-2">📍</div>
                  <h5 className="fw-bold mb-1" style={{ color: '#6366f1' }}>Our Location</h5>
                  <p className="text-muted small mb-0">Faisalabad, Punjab, Pakistan</p>
                </div>

                <div className="p-4 rounded-4 bg-white shadow-sm border text-dark">
                  <div className="fs-3 mb-2">✉️</div>
                  <h5 className="fw-bold mb-1" style={{ color: '#6366f1' }}>Email Us</h5>
                  <p className="text-muted small mb-0">burhana12od@gmail.com</p>
                </div>

                <div className="p-4 rounded-4 bg-white shadow-sm border text-dark">
                  <div className="fs-3 mb-2">📱</div>
                  <h5 className="fw-bold mb-1" style={{ color: '#6366f1' }}>Call Support</h5>
                  <p className="text-muted small mb-0">+92 318 7011571</p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="col-lg-8">
              <div className="p-5 rounded-4 bg-white shadow-sm border text-dark">
                <h3 className="fw-bold mb-4 text-dark">Send Us a Message</h3>

                {submitted ? (
                  <div className="alert alert-success border-0 bg-success bg-opacity-10 text-success py-4 text-center rounded-4 fw-semibold fs-5">
                    ✨ Thank you! Your message has been sent to WhatsApp successfully.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label text-muted small fw-semibold">Your Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          required 
                          className="form-control bg-light border-0 py-3 rounded-pill px-4 shadow-none"
                          placeholder="Burhan"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted small fw-semibold">Your Email</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          required 
                          className="form-control bg-light border-0 py-3 rounded-pill px-4 shadow-none"
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label text-muted small fw-semibold">Your Message</label>
                      <textarea 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                        rows="5" 
                        className="form-control bg-light border-0 rounded-4 p-4 shadow-none"
                        placeholder="Write your message here..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="btn text-white fw-bold py-3 rounded-pill shadow-sm mt-2 border-0"
                      style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', fontSize: '15px' }}
                    >
                      Send Message to WhatsApp 🚀
                    </button>
                  </form>
                )}
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

        .form-control:focus {
          background-color: #f1f5f9 !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
        }
      `}</style>
    </MainLayout>
  );
}

export default Contact;