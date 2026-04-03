import React from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

function ProductGrid({ products, totalPages, currentPage, onPageChange }) {
  if (!products.length) {
    return <div className="text-center py-10 text-gray-500">No products found.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
}

export default ProductGrid;