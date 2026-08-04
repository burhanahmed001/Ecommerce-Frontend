import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Card, message, Spin, Space } from 'antd';
import { ShoppingCartOutlined, ReloadOutlined, CheckCircleOutlined, CloseCircleOutlined, UserOutlined, CarOutlined, SyncOutlined } from '@ant-design/icons';
import axios from 'axios';
import AdminLayout from './AdminLayout';

const { Title, Text } = Typography;

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/admin/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const ordersData = Array.isArray(response.data) ? response.data : response.data.orders || [];
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error("Failed to load customer orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}/status`, 
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data) {
        message.success(`Order status updated to ${newStatus} successfully!`);
        fetchOrders(); 
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error(error.response?.data?.message || "Failed to update order status.");
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => (
        <Text copyable={{ text }} style={{ fontFamily: 'monospace', color: '#4f46e5', fontWeight: '600' }}>
          #{text ? text.slice(-6).toUpperCase() : 'N/A'}
        </Text>
      ),
    },
    {
      title: 'Customer Details',
      key: 'customer',
      render: (_, record) => {
        const name = record.shippingAddress?.fullName || record.user?.name || 'Valued Customer';
        const email = record.shippingAddress?.email || record.user?.email || '';
        const phone = record.shippingAddress?.phoneNumber || 'N/A';
        const address = record.shippingAddress?.address || '';
        const city = record.shippingAddress?.city || '';
        const postalCode = record.shippingAddress?.postalCode ? `(${record.shippingAddress.postalCode})` : '';
        const notes = record.shippingAddress?.orderNotes;

        return (
          <div style={{ padding: '4px 0' }}>
            <div style={{ fontWeight: '600', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserOutlined style={{ color: '#6b7280' }} /> {name}
            </div>
            {email && <div style={{ fontSize: '12px', color: '#6b7280' }}>📧 {email}</div>}
            <div style={{ fontSize: '12px', color: '#4b5563', marginTop: '2px' }}>📞 {phone}</div>
            {address && (
              <div style={{ fontSize: '12px', color: '#4b5563', marginTop: '2px' }}>
                📍 {address}, {city} {postalCode}
              </div>
            )}
            {notes && (
              <div style={{ fontSize: '11px', color: '#d97706', fontStyle: 'italic', marginTop: '2px' }}>
                💬 Note: {notes}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => (a.totalAmount || 0) - (b.totalAmount || 0),
      render: (amount) => <Text style={{ fontWeight: '700', color: '#059669' }}>Rs. {amount || '0.00'}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'gold';
        let currentStatus = status || 'Pending';
        
        if (currentStatus === 'Delivered') color = 'success';
        if (currentStatus === 'Cancelled') color = 'error';
        if (currentStatus === 'Processing' || currentStatus === 'Shipped') color = 'processing';
        
        return (
          <Tag color={color} style={{ fontWeight: '600', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
            {currentStatus.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => {
        const currentStatus = record.status || 'Pending';
        
        return (
          <Space size="small" wrap>
            {currentStatus === 'Pending' && (
              <Button 
                type="primary" 
                icon={<SyncOutlined />}
                style={{ background: '#3b82f6', borderColor: '#3b82f6', fontWeight: '500', borderRadius: '8px' }}
                onClick={() => handleStatusUpdate(record._id, 'Processing')}
              >
                Process
              </Button>
            )}

            {currentStatus === 'Processing' && (
              <Button 
                type="primary" 
                icon={<CarOutlined />}
                style={{ background: '#8b5cf6', borderColor: '#8b5cf6', fontWeight: '500', borderRadius: '8px' }}
                onClick={() => handleStatusUpdate(record._id, 'Shipped')}
              >
                Ship
              </Button>
            )}

            {currentStatus === 'Shipped' && (
              <Button 
                type="primary" 
                icon={<CheckCircleOutlined />}
                style={{ background: '#10b981', borderColor: '#10b981', fontWeight: '500', borderRadius: '8px' }}
                onClick={() => handleStatusUpdate(record._id, 'Delivered')}
              >
                Deliver
              </Button>
            )}

            {currentStatus !== 'Delivered' && currentStatus !== 'Cancelled' && (
              <Button 
                danger 
                type="primary" 
                icon={<CloseCircleOutlined />}
                style={{ fontWeight: '500', borderRadius: '8px' }}
                onClick={() => handleStatusUpdate(record._id, 'Cancelled')}
              >
                Cancel
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }} className="container-fluid px-2 px-md-4">
      
        <div style={{ 
          background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', 
          padding: '20px', 
          borderRadius: '16px', 
          color: '#fff', 
          marginBottom: '20px',
          boxShadow: '0 10px 25px rgba(79, 70, 229, 0.15)'
        }} className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <Title level={2} style={{ color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'clamp(1.2rem, 4vw, 2rem)' }}>
              <ShoppingCartOutlined /> Manage Customer Orders
            </Title>
            <Text style={{ color: '#e0e7ff', fontSize: 'clamp(13px, 2vw, 15px)' }}>
              Process, ship, deliver or cancel customer orders seamlessly.
            </Text>
          </div>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={fetchOrders}
            size="large"
            style={{ fontWeight: '600', borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            className="w-100 w-md-auto"
          >
            Refresh
          </Button>
        </div>

        <Card bordered={false} style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Table 
              dataSource={orders} 
              columns={columns} 
              rowKey="_id" 
              pagination={{ pageSize: 7, showSizeChanger: false, responsive: true }}
              scroll={{ x: 750 }}
            />
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ManageOrders;