import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import API from '../api';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query, currentPage]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const res = await API.get('/products', {
        params: { search: query, page: currentPage, limit: 9 }
      });
      setProducts(res.data.products);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Searching...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-deep-cobalt mb-6">
        Search results for: "{query}" ({products.length} found)
      </h2>
      <ProductGrid products={products} totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default SearchResults;