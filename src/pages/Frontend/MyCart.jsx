import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './MainLayout';

function MyCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Checkout Form State (Backend Schema ke mutabiq)
  const [shippingData, setShippingData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: 'Faisalabad',
    postalCode: '',
    orderNotes: ''
  });

  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      let items = [];
      if (response.data && response.data.cartItems) {
        items = response.data.cartItems;
      } else if (response.data && response.data.items) {
        items = response.data.items;
      } else if (Array.isArray(response.data)) {
        items = response.data;
      }

      setCartItems(items);

      // Local storage ya user profile se default values set karna
      const user = JSON.parse(localStorage.getItem('user')) || {};
      setShippingData({
        fullName: user.name || user.fullName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        city: user.city || 'Faisalabad',
        postalCode: user.postalCode || '',
        orderNotes: ''
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setCartItems([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDeleteItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(cartItems.filter(item => {
        const prodId = item.product?._id || item.product;
        return prodId !== productId;
      }));
      if (window.toastify) {
        window.toastify('Item removed from cart & stock restored successfully.', 'success');
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
      if (window.toastify) {
        window.toastify('Failed to delete item from cart.', 'error');
      }
    }
  };

  // Subtotal & Total calculation
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product?.price || 0;
    const qty = item.quantity || 1;
    return acc + (price * qty);
  }, 0);

  const shippingFee = subtotal > 0 ? 150 : 0;
  const grandTotal = subtotal + shippingFee;

  const handleInputChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handleOpenCheckoutModal = () => {
    if (cartItems.length === 0) return;
    setShowModal(true);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      const orderItems = cartItems.map(item => ({
        product: item.product?._id || item.product,
        name: item.product?.name || 'Product Item',
        price: item.product?.price || 0,
        quantity: item.quantity || 1
      }));

      // 1. Order create request with complete shipping details
      await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        {
          orderItems,
          shippingAddress: shippingData,
          totalAmount: grandTotal
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // 2. Clear backend cart from database
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 3. Clear frontend state & local storage
      setCartItems([]);
      localStorage.removeItem('cart');
      setShowModal(false);

      if (window.toastify) {
        window.toastify('Your Order has been Placed successfully!', 'success');
      }
      navigate('/orders');

    } catch (error) {
      console.error('Error placing order:', error.response?.data || error);
      const errorMsg = error.response?.data?.message || 'Failed to place order.';
      if (window.toastify) {
        window.toastify(errorMsg, 'error');
      } else {
        alert(errorMsg);
      }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-5 min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
          <p className="text-muted fw-semibold">Loading your shopping bag...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-light min-vh-100 py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5 text-dark mb-2">Shopping Cart 🛒</h2>
            <p className="text-muted fs-6">Review your selected items and secure your order</p>
            <div className="mx-auto mt-2" style={{ width: '50px', height: '4px', backgroundColor: '#0d6efd', borderRadius: '2px' }}></div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-4 shadow-sm border p-5 mx-auto" style={{ maxWidth: '500px' }}>
              <div className="mb-3 display-3 text-muted">🛍️</div>
              <h4 className="fw-bold text-dark mb-2">Your Cart is Empty</h4>
              <p className="text-muted mb-4 small">Explore our exclusive products and add them to your cart.</p>
              <Link to="/" className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow-sm">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="vstack gap-3">
                  {cartItems.map((cartItem, index) => {
                    const product = cartItem.product;
                    if (!product) return null;

                    const productId = product._id || index;
                    const quantity = cartItem.quantity || 1;
                    const itemTotal = (product.price || 0) * quantity;

                    return (
                      <div className="card border-0 shadow-sm rounded-4 p-3 bg-white" key={productId}>
                        <div className="row align-items-center g-3">
                          <div className="col-md-3">
                            <div className="rounded-3 overflow-hidden bg-light position-relative" style={{ height: '110px' }}>
                              {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.name} className="w-100 h-100 object-fit-cover" />
                              ) : (
                                <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted small">No Image</div>
                              )}
                              <span className="position-absolute top-0 start-0 m-1 badge bg-dark bg-opacity-75 text-white" style={{ fontSize: '10px' }}>
                                {product.category || 'General'}
                              </span>
                            </div>
                          </div>

                          <div className="col-md-5">
                            <h5 className="fw-bold text-dark mb-1">{product.name || 'Unnamed Product'}</h5>
                            <p className="text-muted small mb-2 text-truncate" style={{ maxWidth: '250px' }}>{product.description || 'No description'}</p>
                            <span className="text-primary fw-bold">Rs. {product.price || 0} each</span>
                          </div>

                          <div className="col-md-2 text-md-center">
                            <span className="text-muted small d-block mb-1">Quantity</span>
                            <span className="badge bg-light text-dark border px-3 py-1.5 fw-bold rounded-pill">{quantity}</span>
                          </div>

                          <div className="col-md-2 text-end">
                            <span className="text-muted small d-block mb-1">Total</span>
                            <h6 className="fw-bold text-dark mb-2">Rs. {itemTotal}</h6>
                            <button 
                              onClick={() => handleDeleteItem(product._id)}
                              className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1"
                              title="Remove Item"
                            >
                              🗑️ Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: '20px' }}>
                  <h4 className="fw-bold text-dark mb-4 pb-2 border-bottom">Order Summary</h4>
                  
                  <div className="d-flex justify-content-between mb-3 text-secondary">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="fw-semibold text-dark">Rs. {subtotal}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3 text-secondary">
                    <span>Estimated Shipping</span>
                    <span className="fw-semibold text-dark">Rs. {shippingFee}</span>
                  </div>

                  <hr className="my-3 text-muted opacity-25" />

                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold fs-5 text-dark">Grand Total</span>
                    <span className="fw-bold fs-5 text-primary">Rs. {grandTotal}</span>
                  </div>

                  <button 
                    onClick={handleOpenCheckoutModal}
                    className="btn btn-primary w-100 py-3 fw-bold rounded-pill shadow-sm mb-2"
                  >
                    Proceed to Checkout ➔
                  </button>

                  <Link to="/" className="btn btn-outline-secondary w-100 py-2.5 fw-semibold rounded-pill small">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Shipping Details Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow-lg p-3">
              <div className="modal-header border-0 pb-0">
                <h4 className="fw-bold text-dark">Shipping Information 📍</h4>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handlePlaceOrder}>
                <div className="modal-body">
                  <p className="text-muted small mb-4">Please confirm your delivery address and contact details before placing the order.</p>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">Full Name *</label>
                      <input 
                        type="text" 
                        className="form-control rounded-3" 
                        name="fullName" 
                        value={shippingData.fullName} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">Email Address *</label>
                      <input 
                        type="email" 
                        className="form-control rounded-3" 
                        name="email" 
                        value={shippingData.email} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">Phone Number *</label>
                      <input 
                        type="text" 
                        className="form-control rounded-3" 
                        name="phoneNumber" 
                        value={shippingData.phoneNumber} 
                        onChange={handleInputChange} 
                        placeholder="e.g. 03001234567" 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">City *</label>
                      <input 
                        type="text" 
                        className="form-control rounded-3" 
                        name="city" 
                        value={shippingData.city} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small">Street Address *</label>
                      <input 
                        type="text" 
                        className="form-control rounded-3" 
                        name="address" 
                        value={shippingData.address} 
                        onChange={handleInputChange} 
                        placeholder="House #, Street name, Area" 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">Postal Code (Optional)</label>
                      <input 
                        type="text" 
                        className="form-control rounded-3" 
                        name="postalCode" 
                        value={shippingData.postalCode} 
                        onChange={handleInputChange} 
                        placeholder="e.g. 38000" 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">Order Notes (Optional)</label>
                      <input 
                        type="text" 
                        className="form-control rounded-3" 
                        name="orderNotes" 
                        value={shippingData.orderNotes} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Deliver in afternoon" 
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary rounded-pill px-5 fw-bold shadow-sm">
                    Confirm & Place Order (Rs. {grandTotal})
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default MyCart;