import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import { Link } from 'react-router-dom';

export default function SellerDashboardPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, ordersRes] = await Promise.all([
          API.get(`/products/seller/${user.id}`),
          API.get('/orders/seller')
        ]);
        setProducts(productsRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error('Error fetching seller data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleRestock = async (productId) => {
    const additionalStock = prompt('Enter additional stock quantity:');
    if (additionalStock && !isNaN(additionalStock) && Number(additionalStock) > 0) {
      try {
        await API.post(`/products/${productId}/restock`, { additionalStock: Number(additionalStock) });
        const updatedProducts = await API.get(`/products/seller/${user.id}`);
        setProducts(updatedProducts.data);
      } catch (err) {
        console.error('Restock failed:', err);
        alert('Failed to restock. Please try again.');
      }
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Delete this product?')) {
      try {
        await API.delete(`/products/${productId}`);
        setProducts(products.filter(p => p._id !== productId));
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete product.');
      }
    }
  };

  const handleConfirmOrder = async (orderId) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status: 'Confirmed' });
      const updatedOrders = await API.get('/orders/seller');
      setOrders(updatedOrders.data);
    } catch (err) {
      console.error('Order confirmation failed:', err);
      alert('Failed to confirm order.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2563EB] border-t-transparent"></div>
          <p className="mt-4 text-[#111827]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-[#2563EB]">
            Seller Dashboard
          </h1>
          <Link
            to="/product/new"
            className="bg-[#F97316] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#ea580c] transition shadow-md"
          >
            + Add New Product
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* My Products Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-[#111827] mb-4 flex items-center gap-2">
              📦 My Products ({products.length})
            </h2>
            {products.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No products yet. Click "Add New Product" to start selling!</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {products.map(product => (
                  <div key={product._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition bg-white">
                    <div className="flex flex-col sm:flex-row justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-lg text-[#111827]">{product.title}</h3>
                        <p className="text-[#F97316] font-bold">RWF {product.price.toLocaleString()}</p>
                        <p className={`text-sm ${product.stock < 5 ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                          Stock: {product.stock} {product.stock < 5 && '⚠️ Low Stock!'}
                        </p>
                        <p className="text-sm text-gray-500">Sold: {product.sold}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 items-start">
                        <Link to={`/product/edit/${product._id}`} className="text-[#F97316] hover:text-[#ea580c] text-sm font-medium px-2 py-1">
                          Edit
                        </Link>
                        <button onClick={() => handleRestock(product._id)} className="text-[#F97316] hover:text-[#ea580c] text-sm font-medium px-2 py-1">
                          Restock
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Orders Received Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-[#111827] mb-4 flex items-center gap-2">
              🛒 Orders Received ({orders.length})
            </h2>
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No orders yet. When customers buy, they'll appear here.</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {orders.map(order => (
                  <div key={order._id} className="border border-gray-200 rounded-xl p-4 bg-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-[#111827]">{order.productId?.title || 'Product'}</p>
                        <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                        <p className="text-sm font-bold text-[#111827]">Total: RWF {order.totalPrice.toLocaleString()}</p>
                        <p className="mt-1">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {order.status}
                          </span>
                        </p>
                      </div>
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => handleConfirmOrder(order._id)}
                          className="bg-[#F97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                          Confirm Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}