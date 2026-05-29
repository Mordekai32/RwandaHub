import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  if (!product || !product._id) return null;

  const { _id, title, name, price, images, location, stock } = product;
  const productName = title || name || 'Unnamed Product';
  const imageUrl = images?.[0] || 'https://via.placeholder.com/300';
  const productPrice = price || 0;
  const productLocation = location || 'Rwanda';
  const productStock = stock ?? 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
      <Link to={`/product/${_id}`} className="block overflow-hidden">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Alibaba orange price badge */}
          <div className="absolute top-3 right-3 bg-[#FF6A00] text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
            RWF {productPrice.toLocaleString()}
          </div>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${_id}`} className="block">
          <h3 className="text-lg font-semibold text-[#333333] truncate group-hover:text-[#FF6A00] transition-colors">
            {productName}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-2 text-sm text-[#666666]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{productLocation}</span>
        </div>

        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
          <div className="text-sm text-[#666666]">Stock: {productStock}</div>
          <Link
            to={`/product/${_id}`}
            className="text-[#1E88E5] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
          >
            <span>View Details</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Alibaba orange button */}
        <button
          onClick={handleAddToCart}
          disabled={productStock === 0}
          className={`mt-4 w-full font-semibold py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md ${
            productStock === 0
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
              : 'bg-[#FF6A00] hover:bg-[#E55A00] text-white hover:shadow-lg'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3" />
          </svg>
          {productStock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}