import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Card, message, Spin, Space, Image, Modal } from 'antd';
import { ShoppingOutlined, ReloadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from './AdminLayout';

const { Title, Text } = Typography;

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const productsData = Array.isArray(response.data) ? response.data : response.data.products || [];
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

 
  const handleDelete = (productId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          message.success("Product deleted successfully!");
          fetchProducts();
        } catch (error) {
          console.error("Error deleting product:", error);
          message.error("Failed to delete product.");
        }
      }
    });
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl', 
      key: 'imageUrl',
      render: (imageUrl) => (
        <Image 
          src={imageUrl || 'https://via.placeholder.com/80'} 
          alt="product" 
          width={50} 
          height={50} 
          style={{ objectFit: 'cover', borderRadius: '8px' }}
          fallback="https://via.placeholder.com/80"
        />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong style={{ color: '#1f2937' }}>{text || 'Untitled Product'}</Text>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => (a.price || 0) - (b.price || 0),
      render: (price) => <Text style={{ fontWeight: '700', color: '#059669' }}>${price?.toFixed(2) || '0.00'}</Text>,
    },
    {
      title: 'Stock',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
      sorter: (a, b) => (a.stockQuantity || 0) - (b.stockQuantity || 0),
      render: (stockQuantity) => {
        let color = stockQuantity > 5 ? 'success' : stockQuantity > 0 ? 'warning' : 'error';
        return (
          <Tag color={color} style={{ fontWeight: '600', padding: '2px 8px', borderRadius: '12px' }}>
            {stockQuantity !== undefined ? `${stockQuantity} left` : 'N/A'}
          </Tag>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (desc) => <span style={{ color: '#6b7280' }}>{desc || 'No description provided'}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="small" wrap>
          <Button 
            type="default" 
            icon={<EditOutlined />} 
            style={{ color: '#4f46e5', borderColor: '#4f46e5', borderRadius: '6px' }}
            onClick={() => navigate(`/admin/edit-product/${record._id}`)}
          >
            Edit
          </Button>

          <Button 
            danger 
            type="primary" 
            icon={<DeleteOutlined />} 
            style={{ borderRadius: '6px' }}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
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
            <Title level={2} style={{ color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'clamp(1.3rem, 4vw, 2rem)' }}>
              <ShoppingOutlined /> Manage Store Products
            </Title>
            <Text style={{ color: '#e0e7ff', fontSize: 'clamp(13px, 2vw, 15px)' }}>
              View all inventory, update product listings, or remove items instantly.
            </Text>
          </div>

          <Space wrap className="w-100 w-md-auto justify-content-start justify-content-md-end">
            <Button 
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              style={{ background: '#fff', color: '#4f46e5', fontWeight: 'bold', border: 'none', borderRadius: '10px' }}
              onClick={() => navigate('/admin/add-product')}
            >
              Add Product
            </Button>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={fetchProducts}
              size="large"
              style={{ fontWeight: '600', borderRadius: '10px', border: 'none' }}
            >
              Refresh
            </Button>
          </Space>
        </div>

        <Card bordered={false} style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Table 
              dataSource={products} 
              columns={columns} 
              rowKey="_id" 
              pagination={{ pageSize: 6, showSizeChanger: false, responsive: true }}
              scroll={{ x: 750 }}
            />
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ManageProducts;