import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import GeneralEnquiryButton from './GeneralEnquiryButton';
import API from '../api';

function Layout() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const closeSidebar = () => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-deep-cobalt text-white p-2 rounded-lg shadow-lg"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar - Fixed position, scrolls independently */}
      <aside
        className={`fixed md:relative z-40 w-72 bg-deep-cobalt text-white shadow-xl h-full overflow-y-auto transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
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
        <Sidebar categories={categories} services={services} onLinkClick={closeSidebar} />
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Right Content Area - Scrolls independently */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Top Bar - Sticky inside scrollable area */}
        <div className="bg-white shadow-sm p-4 flex flex-wrap justify-between items-center sticky top-0 z-20">
          <form onSubmit={handleSearch} className="flex-1 max-w-md ml-8 md:ml-0">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
            />
          </form>
          <div className="flex gap-2 mt-2 md:mt-0">
            <a href="/about" className="bg-gray-200 text-deep-cobalt px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
              About Us
            </a>
            <GeneralEnquiryButton />
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;