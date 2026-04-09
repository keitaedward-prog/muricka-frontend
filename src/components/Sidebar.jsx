import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ categories, services, onLinkClick }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');

  const isAllProductsActive = !currentCategory && location.pathname === '/';
  const isCategoryActive = (id) => currentCategory === id;
  const isServiceActive = (id) => location.pathname === `/service/${id}`;

  return (
    <nav className="p-4">
      <Link
        to="/"
        onClick={onLinkClick}
        className={`block py-2 px-3 rounded-lg mb-2 transition ${
          isAllProductsActive ? 'bg-electric-blue text-white' : 'hover:bg-electric-blue/20'
        }`}
      >
        📦 All Products
      </Link>

      <div className="mt-4 mb-2 text-gold font-semibold text-sm uppercase tracking-wider">Categories</div>
      {categories.map(cat => (
        <Link
          key={cat._id}
          to={`/?category=${cat._id}`}
          onClick={onLinkClick}
          className={`block py-2 px-3 rounded-lg mb-1 transition ${
            isCategoryActive(cat._id) ? 'bg-electric-blue text-white' : 'hover:bg-electric-blue/20'
          }`}
        >
          📁 {cat.name}
        </Link>
      ))}

      <div className="mt-6 mb-2 text-gold font-semibold text-sm uppercase tracking-wider">Our Services</div>
      {services.map(service => (
        <Link
          key={service._id}
          to={`/service/${service._id}`}
          onClick={onLinkClick}
          className={`block py-2 px-3 rounded-lg mb-1 transition ${
            isServiceActive(service._id) ? 'bg-electric-blue text-white' : 'hover:bg-electric-blue/20'
          }`}
        >
          ⚙️ {service.name}
        </Link>
      ))}
    </nav>
  );
}

export default Sidebar;