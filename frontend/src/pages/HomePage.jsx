import { useState, useEffect } from 'react';
import API from '../api';
import ProductCard from '../components/ProductCard';
import SearchFilter from '../components/SearchFilter';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await API.get(`/products${params ? `?${params}` : ''}`);
      // Ensure we always have an array
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#F97316] border-t-transparent"></div>
          <p className="mt-4 text-[#0F172A] font-medium">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  // Filter out any falsy products or products missing an _id
  const validProducts = products.filter(p => p && p._id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#E2E8F0]">
      <div className="container mx-auto px-4 py-8">
        {/* Hero header with modern gradient text */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#0F172A] via-[#10B981] to-[#F97316] bg-clip-text text-transparent">
            Rwanda Marketplace
          </h1>
          <p className="text-[#0F172A]/70 mt-2 text-lg">Buy & sell safely – local deals, trusted community</p>
        </div>

        <SearchFilter onSearch={fetchProducts} />

        {validProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#10B981]/10 text-[#10B981] mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-[#0F172A] text-lg">No products found</p>
            <p className="text-[#0F172A]/60 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {validProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}