import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetail';
import ServiceDetail from './components/ServiceDetail';
import SearchResults from './components/SearchResults';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageCategories from './pages/ManageCategories';
import ManageProducts from './pages/ManageProducts';
import ManageServices from './pages/ManageServices';
import AddEditProduct from './pages/AddEditProduct';
import AddEditService from './pages/AddEditService'; // new import
import ManageAdmins from './pages/ManageAdmins';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="service/:id" element={<ServiceDetail />} />
            <Route path="search" element={<SearchResults />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="categories" element={<ManageCategories />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="products/add" element={<AddEditProduct />} />
            <Route path="products/edit/:id" element={<AddEditProduct />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="services/add" element={<AddEditService />} />
            <Route path="services/edit/:id" element={<AddEditService />} />
            <Route path="admins" element={<ManageAdmins />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;