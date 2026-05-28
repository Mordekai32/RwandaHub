import { useState, useEffect } from 'react';
import API from '../api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await API.get('/orders/buyer');
        setOrders(response.data);
        setFilteredOrders(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Unable to load your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders based on active tab and search term
  useEffect(() => {
    let result = orders;
    
    // Filter by status tab
    if (activeTab !== 'All') {
      result = result.filter(order => order.status === activeTab);
    }
    
    // Filter by search term (product title or order ID)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.productId?.title?.toLowerCase().includes(term) ||
        order._id.toLowerCase().includes(term)
      );
    }
    
    setFilteredOrders(result);
  }, [activeTab, searchTerm, orders]);

  // Order status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'Pending': { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: '🕒' },
      'Confirmed': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '✓' },
      'Shipped': { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: '🚚' },
      'Delivered': { color: 'bg-green-100 text-green-800 border-green-200', icon: '✅' },
      'Cancelled': { color: 'bg-red-100 text-red-800 border-red-200', icon: '✗' },
    };
    const config = statusConfig[status] || statusConfig['Pending'];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <span>{config.icon}</span>
        {status}
      </span>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Available status tabs (dynamically from orders data)
  const statusTabs = ['All', ...new Set(orders.map(order => order.status))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent">
            My Orders
          </h1>
          <p className="text-slate-500 mt-1">Track and manage your purchases</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by product name or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-2">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab}
              {tab !== 'All' && (
                <span className="ml-2 text-xs bg-white/20 rounded-full px-2 py-0.5">
                  {orders.filter(o => o.status === tab).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            <p className="mt-4 text-slate-500">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
            >
              Try Again
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-slate-100">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No orders found</h3>
            <p className="text-slate-500 mb-6">
              {searchTerm || activeTab !== 'All' 
                ? "Try adjusting your filters or search term"
                : "You haven't placed any orders yet"}
            </p>
            {!searchTerm && activeTab === 'All' && (
              <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition shadow-md">
                <span>Start Shopping</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <div key={order._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 overflow-hidden">
                <div className="p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Left: Product info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        {/* Product image placeholder */}
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center text-3xl shadow-inner">
                          🛒
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition">
                            {order.productId?.title || 'Product Unavailable'}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                              </svg>
                              Qty: {order.quantity}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(order.createdAt)}
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="text-xl font-bold text-emerald-700">
                              RWF {order.totalPrice?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Status & Actions */}
                    <div className="flex flex-col items-end gap-3">
                      <StatusBadge status={order.status} />
                      <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 transition rounded-full hover:bg-emerald-50">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-emerald-600 transition rounded-full hover:bg-emerald-50">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order ID row */}
                  <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 flex justify-between items-center">
                    <span>Order #{order._id.slice(-8).toUpperCase()}</span>
                    {order.status === 'Delivered' && (
                      <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm flex items-center gap-1">
                        Write a Review
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}