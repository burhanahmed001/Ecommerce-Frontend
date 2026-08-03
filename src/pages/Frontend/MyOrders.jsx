import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './MainLayout';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }

      // Backend route compatibility ke liye try /api/orders aur fallback /orders
      let response;
      try {
        response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (errApi) {
        response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setOrders(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch your orders. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-5 text-center text-white min-vh-100 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#070d1b' }}>
          <div className="spinner-border text-danger mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
          <p className="mt-2 text-secondary fw-semibold">Loading your orders...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-vh-100 py-5 text-white" style={{ backgroundColor: '#070d1b' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5 mb-2">My Orders 📦</h2>
            <p className="text-secondary fs-6">Track your order history and delivery statuses</p>
            <div className="mx-auto mt-2" style={{ width: '50px', height: '4px', backgroundColor: '#dc3545', borderRadius: '2px' }}></div>
          </div>

          {error && <div className="alert alert-danger rounded-4 shadow-sm mb-4">{error}</div>}
          
          {orders.length === 0 ? (
            <div className="p-5 text-center rounded-4 shadow-sm" style={{ backgroundColor: '#0d1322', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="mb-3 display-3 text-secondary">📦</div>
              <h4 className="fw-bold text-white mb-2">No Orders Found</h4>
              <p className="text-secondary mb-0">You haven't placed any orders yet. Start shopping to see your orders here!</p>
            </div>
          ) : (
            <div className="row g-4">
              {orders.map((order) => (
                <div className="col-12" key={order._id}>
                  <div className="p-4 rounded-4 shadow-sm" style={{ backgroundColor: '#0d1322', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3 pb-3 border-bottom border-secondary border-opacity-10">
                      <div>
                        <span className="text-secondary small d-block mb-1">Order ID: {order._id}</span>
                        <span className="text-white fw-bold">Date: {new Date(order.createdAt || Date.now()).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className={`badge px-3 py-2 rounded-pill fw-bold text-uppercase ${
                          order.status === 'Delivered' ? 'bg-success' : order.status === 'Cancelled' ? 'bg-danger' : 'bg-warning text-dark'
                        }`}>
                          {order.status || 'Pending'}
                        </span>
                      </div>
                    </div>

                    <div className="table-responsive mb-3">
                      <table className="table table-dark table-borderless align-middle mb-0">
                        <thead>
                          <tr className="text-secondary small text-uppercase">
                            <th>Product Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th className="text-end">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderItems?.map((item, idx) => (
                            <tr key={idx}>
                              <td className="fw-semibold text-white">
                                {item.name || item.product?.name || 'Product Item'}
                              </td>
                              <td>{item.quantity || 1}</td>
                              <td>Rs. {item.price || 0}</td>
                              <td className="text-end fw-bold text-danger">
                                Rs. {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-10">
                      <span className="text-secondary fw-semibold">Total Order Amount (incl. shipping)</span>
                      <span className="fs-5 fw-bold text-success">Rs. {order.totalAmount || '0.00'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyOrders;