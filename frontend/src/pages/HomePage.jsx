import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import ProductCard from '../components/ProductCard';
import SearchFilter from '../components/SearchFilter';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, getCartCount } = useCart();
  const { user } = useAuth();

  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await API.get(`/products${params ? `?${params}` : ''}`);
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
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#FF6A00] border-t-transparent"></div>
          <p className="mt-4 text-[#333333] font-medium">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  const validProducts = products.filter(p => p && p._id);
  const cartCount = getCartCount();

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#333333]">
              Rwanda<span className="text-[#FF6A00]">Market</span>
            </h1>
            <p className="text-[#666666] mt-2 text-lg">
              Buy & sell safely – local deals, trusted community
            </p>
          </div>
          <div className="flex items-center gap-5">
            {user ? (
              <div className="text-sm text-[#555555] bg-white px-3 py-1.5 rounded-full shadow-sm">
                Hello, {user.name || user.email}
              </div>
            ) : (
              <Link to="/login" className="text-[#1E88E5] hover:text-[#1565C0] font-medium text-sm">
                Sign in
              </Link>
            )}
            <Link to="/cart" className="relative group">
              <button className="p-2.5 rounded-full bg-white shadow-md hover:shadow-lg transition">
                <svg className="w-5 h-5 text-[#666666] group-hover:text-[#FF6A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF6A00] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>

        <SearchFilter onSearch={fetchProducts} />

        {validProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-[#333333] text-lg font-semibold">No products found</p>
            <p className="text-[#666666] text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {validProducts.map(product => (
              <ProductCard key={product._id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}