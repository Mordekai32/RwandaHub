import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  // ✅ Safety guard: if product is missing or has no _id, render nothing
  if (!product || !product._id) {
    return null;
  }

  const { _id, title, name, price, images, location, stock, seller } = product;
  // Support both 'title' and 'name' field names
  const productName = title || name || 'Unnamed Product';
  const imageUrl = images?.[0] || '/placeholder-image.jpg';
  const productPrice = price || 0;
  const productLocation = location || 'Rwanda';
  const productStock = stock ?? 0;

  return (
    <Link to={`/product/${_id}`} className="block group">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[#CBD5E1]/30">
        {/* Image container */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0]">
          <img
            src={imageUrl}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Price badge */}
          <div className="absolute top-3 right-3 bg-[#F97316] text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
            RWF {productPrice.toLocaleString()}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#0F172A] truncate group-hover:text-[#10B981] transition-colors">
            {productName}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-sm text-[#0F172A]/70">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{productLocation}</span>
          </div>

          <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#CBD5E1]/50">
            <div className="text-sm text-[#0F172A]/70">
              Stock: {productStock}
            </div>
            <div className="text-[#10B981] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              <span>View Details</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}