import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  const handleOrder = async () => {
    if (!user) return navigate('/login');
    try {
      await API.post('/orders', { productId: id, quantity });
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.error || 'Order failed');
    }
  };

  const handleChat = () => {
    if (!user) return navigate('/login');
    navigate(`/messages/${product.userId._id}`);
  };

  if (!product) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.images[0]} alt={product.title} className="w-full rounded-lg shadow-md" />
          <div className="flex gap-2 mt-4">
            {product.images.slice(1).map((img, i) => (
              <img key={i} src={img} className="w-20 h-20 object-cover rounded cursor-pointer" />
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">📍 {product.location}</p>
          <p className="text-4xl font-bold text-green-600 mb-4">RWF {product.price.toLocaleString()}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="border-t pt-4 mb-4">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Stock:</strong> {product.stock} units</p>
            <p><strong>Seller:</strong> {product.userId.name}</p>
            <p><strong>Seller Phone:</strong> {product.userId.phone}</p>
          </div>
          {product.stock > 0 ? (
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Quantity:</label>
                <input type="number" min="1" max={product.stock} value={quantity} onChange={e => setQuantity(e.target.value)} className="border p-2 rounded w-24" />
              </div>
              <button onClick={handleOrder} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Buy Now</button>
            </div>
          ) : (
            <p className="text-red-600 font-bold">Out of Stock</p>
          )}
          <button onClick={handleChat} className="w-full mt-3 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300">Chat with Seller</button>
        </div>
      </div>
    </div>
  );
}