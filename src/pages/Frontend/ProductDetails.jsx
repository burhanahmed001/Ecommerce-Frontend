import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './MainLayout';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Handle both schema keys (stock or stockQuantity) just in case
  const availableStock = product?.stock !== undefined ? product.stock : (product?.stockQuantity !== undefined ? product.stockQuantity : 0);

  const handleAddToCart = async () => {
    if (availableStock <= 0) {
      if (window.toastify) window.toastify("Currently out of stock", "error");
      else alert("Currently out of stock");
      return;
    }
    if (Number(quantity) > availableStock) {
      if (window.toastify) window.toastify(`Only ${availableStock} items available in stock!`, "error");
      else alert(`Only ${availableStock} items available in stock!`);
      return;
    }

    const token = localStorage.getItem('token'); 
    
    if (!token) {
      alert('Please login your account then you can order');
      navigate('/auth/login');
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`, 
        { productId: product._id || id, quantity: Number(quantity) },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (window.toastify) {
        window.toastify("Product added to cart & stock updated successfully!", "success");
      } else {
        alert("Product added to cart successfully!");
      }

      setProduct(prev => ({ 
        ...prev, 
        stock: availableStock - Number(quantity),
        stockQuantity: prev.stockQuantity !== undefined ? prev.stockQuantity - Number(quantity) : undefined
      }));

    } catch (err) {
      console.error('Error adding to cart:', err);
      const errorMsg = err.response?.data?.message || "Failed to add product to cart.";
      if (window.toastify) {
        window.toastify(errorMsg, "error");
      } else {
        alert(errorMsg);
      }
    }
  };

  return (
    <MainLayout>
      <div className="container py-5 min-vh-100">
        <Link to="/" className="btn btn-outline-dark rounded-pill px-4 mb-4 fw-semibold">
          ← Back to Home
        </Link>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-indigo mb-2" role="status" style={{ width: '2.5rem', height: '2.5rem', color: '#6366f1' }}></div>
            <p className="text-muted fw-medium">Loading product details...</p>
          </div>
        ) : error ? (
          <div className="text-center py-5 text-danger fw-medium fs-5">{error}</div>
        ) : !product ? (
          <div className="text-center py-5 text-muted fw-medium fs-5">Product not found.</div>
        ) : (
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
             
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white" style={{ height: '350px', maxHeight: '450px' }}>
                <img 
                  src={product.imageUrl || product.image} 
                  alt={product.name} 
                  className="w-100 h-100"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="d-flex gap-2 mb-3">
                <span className="badge bg-dark text-white px-3 py-1.5 rounded-pill fw-bold">
                  {product.category || 'General'}
                </span>
                
                <span className={`badge border px-3 py-1.5 rounded-pill fw-bold ${availableStock > 0 ? 'bg-light text-success' : 'bg-light text-danger'}`}>
                  {availableStock > 0 ? `Stock Available: ${availableStock}` : 'Currently Out of Stock'}
                </span>
              </div>

              <h1 className="fw-bold text-dark mb-3 display-5">{product.name}</h1>
              <h3 className="fw-bold mb-4" style={{ color: '#6366f1' }}>
                Rs. {product.price}
              </h3>
              <p className="text-muted lead fs-6 mb-4" style={{ lineHeight: '1.8' }}>
                {product.description}
              </p>

              <div className="mb-4 d-flex align-items-center gap-3">
                <label htmlFor="quantity" className="fw-semibold text-dark">Quantity:</label>
                <input 
                  type="number" 
                  id="quantity"
                  min="1" 
                  max={availableStock > 0 ? availableStock : 1}
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-control text-center rounded-pill shadow-sm"
                  style={{ width: '90px' }}
                />
              </div>

              <div className="d-flex gap-3">
                <button 
                  onClick={handleAddToCart}
                  disabled={availableStock <= 0}
                  className={`btn px-5 py-3 rounded-pill fw-bold shadow-sm ${availableStock > 0 ? 'btn-dark' : 'btn-secondary disabled'}`}
                >
                  {availableStock > 0 ? 'Add to Cart 🛒' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ProductDetails;