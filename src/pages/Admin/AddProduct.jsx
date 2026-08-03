import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, Typography, Card, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import AdminLayout from './AdminLayout';

const { Title } = Typography;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);


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


      if (fileList.length > 0) {
        formData.append('image', fileList[0].originFileObj);
      } else {
        message.error("Please upload a product image!");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");

  
      console.log("CHECK TOKEN:", token); 

const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/products`, 
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  }
);

      if (response.status === 201 || response.status === 200) {
        message.success("Product added successfully!");
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      const errorMsg = error.response?.data?.message || "Failed to add product.";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <Card className="shadow-sm" style={{ borderRadius: '12px', padding: '10px' }}>
          <Title level={2} className="text-center mb-4" style={{ color: '#1f2937' }}>
            Add New Product
          </Title>

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
                  min={1}
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
                  min={1}
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
                style={{ height: '45px', fontWeight: 'bold', fontSize: '16px' }}
              >
                Publish Product
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;