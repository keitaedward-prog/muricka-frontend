import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import GeneralEnquiryButton from './GeneralEnquiryButton';
import API from '../api';

function Layout() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await API.get('/services');
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar - Fixed */}
      <aside className="w-72 bg-deep-cobalt text-white shadow-xl fixed h-full overflow-y-auto">
        <div className="border-b border-electric-blue pt-4 pb-2">
          <img
            src="/muricka_logo.png"
            alt="Muricka Enterprises"
            className="w-full h-auto"
          />
          <h1 className="text-xl font-bold text-center py-2 text-gold">
            Muricka Enterprises
          </h1>
        </div>
        <Sidebar categories={categories} services={services} />
      </aside>

      {/* Right Content Area */}
      <div className="ml-72 flex-1">
        {/* Top Bar */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
            />
          </form>
          <GeneralEnquiryButton />
        </div>

        {/* Main Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;