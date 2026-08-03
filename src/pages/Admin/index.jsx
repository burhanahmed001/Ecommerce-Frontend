import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard'; 
import AddProduct from './AddProduct';
import ManageOrders from './ManageOrders';
import ManageProducts from './ManageProducts';
import EditProduct from './EditProduct';
import AdminProfile from './AdminProfile';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="manage-products" element={<ManageProducts />} />
      <Route path="manage-orders" element={<ManageOrders />} />
     <Route path="edit-product/:id" element={<EditProduct />} />
      <Route path="admin-profile" element={<AdminProfile />} />
     
    </Routes>
  );
};

export default AdminRoutes;