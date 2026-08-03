import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Statistic, Spin } from 'antd';
import { 
  ShoppingOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  DollarOutlined,
  DashboardOutlined 
} from '@ant-design/icons';
import axios from 'axios';
import AdminLayout from './AdminLayout';

const { Title, Paragraph } = Typography;

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });

 useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
     
      if (!token) {
        window.location.href = "/";
        return;
      }

      const headers = { 'Authorization': `Bearer ${token}` };

     
      const [productsRes, ordersRes, usersRes] = await Promise.allSettled([
        axios.get(`${import.meta.env.VITE_API_URL}/products`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/orders/admin/all`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/users`, { headers })
      ]);

      let productsCount = 0;
      let ordersCount = 0;
      let usersCount = 0;
      let revenueTotal = 0;

      if (productsRes.status === 'fulfilled') {
        const prodData = productsRes.value.data;
        const productsArray = Array.isArray(prodData) ? prodData : prodData.products || [];
        productsCount = productsArray.length;
      }

      if (ordersRes.status === 'fulfilled') {
        const ordData = ordersRes.value.data;
        const ordersArray = Array.isArray(ordData) ? ordData : ordData.orders || [];
        ordersCount = ordersArray.length;
        
        
        revenueTotal = ordersArray
          .filter(order => order.status && order.status.toLowerCase() === 'delivered')
          .reduce((acc, order) => acc + (order.totalAmount || 0), 0);
      }

      if (usersRes.status === 'fulfilled') {
        const userData = usersRes.value.data;
        const usersArray = Array.isArray(userData) ? userData : userData.users || [];
        usersCount = usersArray.length;
      }

      setStats({
        totalProducts: productsCount,
        totalOrders: ordersCount,
        totalUsers: usersCount,
        totalRevenue: revenueTotal
      });

    } catch (error) {
      console.error("Error loading dashboard stats:", error);
      
     
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
        return;
      }

      setStats({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0
      });
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', 
          padding: '30px 40px', 
          borderRadius: '16px', 
          color: '#fff', 
          marginBottom: '30px',
          boxShadow: '0 10px 25px rgba(79, 70, 229, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <DashboardOutlined style={{ fontSize: '28px' }} />
            <Title level={2} style={{ color: '#fff', margin: 0 }}>
              Admin Dashboard
            </Title>
          </div>
          <Paragraph style={{ color: '#e0e7ff', fontSize: '16px', margin: 0, maxWidth: '600px' }}>
            Monitor your active store inventory, track customer orders, and analyze daily revenue metrics in one place.
          </Paragraph>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            
            <Col xs={24} sm={12} lg={6}>
              <Card 
                bordered={false} 
                style={{ 
                  borderRadius: '16px', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  borderLeft: '5px solid #4f46e5'
                }}
              >
                <Statistic
                  title={<span style={{ fontWeight: '600', color: '#4b5563' }}>Total Products</span>}
                  value={stats.totalProducts}
                  prefix={<ShoppingOutlined style={{ color: '#4f46e5', marginRight: '8px' }} />}
                  valueStyle={{ color: '#1f2937', fontWeight: '700', fontSize: '28px' }}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card 
                bordered={false} 
                style={{ 
                  borderRadius: '16px', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  borderLeft: '5px solid #10b981'
                }}
              >
                <Statistic
                  title={<span style={{ fontWeight: '600', color: '#4b5563' }}>Total Orders</span>}
                  value={stats.totalOrders}
                  prefix={<ShoppingCartOutlined style={{ color: '#10b981', marginRight: '8px' }} />}
                  valueStyle={{ color: '#1f2937', fontWeight: '700', fontSize: '28px' }}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card 
                bordered={false} 
                style={{ 
                  borderRadius: '16px', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  borderLeft: '5px solid #f59e0b'
                }}
              >
                <Statistic
                  title={<span style={{ fontWeight: '600', color: '#4b5563' }}>Registered Users</span>}
                  value={stats.totalUsers}
                  prefix={<UserOutlined style={{ color: '#f59e0b', marginRight: '8px' }} />}
                  valueStyle={{ color: '#1f2937', fontWeight: '700', fontSize: '28px' }}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card 
                bordered={false} 
                style={{ 
                  borderRadius: '16px', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  borderLeft: '5px solid #ef4444'
                }}
              >
                <Statistic
                  title={<span style={{ fontWeight: '600', color: '#4b5563' }}>Total Revenue</span>}
                  value={stats.totalRevenue}
                  precision={2}
                  prefix={<DollarOutlined style={{ color: '#ef4444', marginRight: '8px' }} />}
                  valueStyle={{ color: '#1f2937', fontWeight: '700', fontSize: '28px' }}
                />
              </Card>
            </Col>

          </Row>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;