import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Upload, Typography, Card, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from './AdminLayout';

const { Title, Text } = Typography;

const EditProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [fileList, setFileList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setFetching(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        const product = response.data;

        // Set form fields
        form.setFieldsValue({
          name: product.name,
          category: product.category,
          price: product.price,
          stockQuantity: product.stockQuantity,
          description: product.description,
        });

       
        if (product.imageUrl) {
          setFileList([
            {
              uid: '-1',
              name: 'product-image.png',
              status: 'done',
              url: product.imageUrl,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        message.error("Failed to load product details.");
      } finally {
        setFetching(false);
      }
    };

    fetchProductDetails();
  }, [id, form]);

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('price', values.price);
      formData.append('stockQuantity', values.stockQuantity);

    
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        message.success("Product updated and database synchronized successfully!");
        navigate('/admin/manage-products');
      }
    } catch (error) {
      console.error("Error updating product:", error);
      const errorMsg = error.response?.data?.message || "Failed to update product.";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <Spin size="large" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={{ maxWidth: '700px', margin: '0 auto', paddingBottom: '40px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', 
          padding: '20px 25px', 
          borderRadius: '16px', 
          color: '#fff', 
          marginBottom: '25px',
          boxShadow: '0 10px 25px rgba(79, 70, 229, 0.15)'
        }}>
          <Title level={2} style={{ color: '#fff', margin: 0 }}>
            Edit Product Details
          </Title>
          <Text style={{ color: '#e0e7ff', fontSize: '14px' }}>
            Modify inventory details and instantly sync changes to the database.
          </Text>
        </div>

        <Card className="shadow-sm" style={{ borderRadius: '16px', padding: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark="optional"
          >
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: 'Please enter the product name!' }]}
            >
              <Input size="large" placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please enter the category!' }]}
            >
              <Input size="large" placeholder="e.g. Electronics, Clothing" />
            </Form.Item>

            <div style={{ display: 'flex', gap: '20px' }}>
              <Form.Item
                name="price"
                label="Price ($)"
                style={{ flex: 1 }}
                rules={[{ required: true, message: 'Please enter the price!' }]}
              >
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="0.00"
                  min={0}
                />
              </Form.Item>

              <Form.Item
                name="stockQuantity"
                label="Stock Quantity"
                style={{ flex: 1 }}
                rules={[{ required: true, message: 'Please enter stock quantity!' }]}
              >
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="0"
                  min={0}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter product description!' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter detailed product description..." />
            </Form.Item>

            <Form.Item label="Product Image" required>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleImageChange}
                beforeUpload={() => false}
                maxCount={1}
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item className="mt-4">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                style={{ height: '45px', fontWeight: 'bold', fontSize: '16px', borderRadius: '10px' }}
              >
                Update Product
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;