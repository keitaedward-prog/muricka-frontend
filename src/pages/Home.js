import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import API from '../api';

function Home() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, categoryId]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/products', {
        params: { page: currentPage, limit: 9, categoryId: categoryId || '' }
      });
      setProducts(res.data.products);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading products...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-deep-cobalt mb-6">
        {categoryId ? 'Products in Category' : 'All Products'}
      </h2>
      <ProductGrid products={products} totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default Home;