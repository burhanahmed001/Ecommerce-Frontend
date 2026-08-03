import { Routes, Route } from 'react-router-dom';
import Home from './Home'; 
import ProductDetails from './ProductDetails';
import About from './About'
import Contact from './Contact';
import MyCart from './MyCart'
import MyOrders from './MyOrders';
import Profile from './Profile';

const Frontend = () => {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/orders" element={<MyOrders/>}/>
        <Route path="/profile" element={<Profile/>}/>  
      </Routes>
  );
};

export default Frontend;