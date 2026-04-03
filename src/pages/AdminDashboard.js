import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-deep-cobalt text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin/categories" className="block py-2 px-3 rounded hover:bg-electric-blue">Manage Categories</Link>
          <Link to="/admin/products" className="block py-2 px-3 rounded hover:bg-electric-blue">Manage Products</Link>
          <Link to="/admin/services" className="block py-2 px-3 rounded hover:bg-electric-blue">Manage Services</Link>
          <Link to="/admin/admins" className="block py-2 px-3 rounded hover:bg-electric-blue">Manage Admins</Link>
          <button onClick={handleLogout} className="block w-full text-left py-2 px-3 rounded hover:bg-red-600 mt-8">Logout</button>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;