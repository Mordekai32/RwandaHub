import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

const categories = ['Phones', 'Cars', 'Clothes', 'Houses', 'Electronics'];

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: 'Phones',
    stock: '',
    location: ''
  });
  const [images, setImages] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(!!id);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        const p = res.data;
        setForm({
          title: p.title,
          price: p.price,
          description: p.description,
          category: p.category,
          stock: p.stock,
          location: p.location
        });
      } catch (err) {
        console.error('Failed to load product:', err);
        setError('Could not load product data');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (id) {
        const updateData = {
          title: form.title,
          price: Number(form.price),
          description: form.description,
          category: form.category,
          stock: Number(form.stock),
          location: form.location
        };
        await API.put(`/products/${id}`, updateData);
      } else {
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('price', Number(form.price));
        formData.append('description', form.description);
        formData.append('category', form.category);
        formData.append('stock', Number(form.stock));
        formData.append('location', form.location);

        if (images.length === 0) {
          setError('Please select at least one product image');
          setLoading(false);
          return;
        }

        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }

        await API.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      navigate('/seller/dashboard');
    } catch (err) {
      console.error('Save error:', err);
      const message = err.response?.data?.error || 'Failed to save product';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-slate-600">Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent mb-6">
            {id ? '✏️ Edit Product' : '➕ Add New Product'}
          </h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (RWF) *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                required
              >
                {categories.map(cat => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location * (e.g., Kigali)</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            
            {!id && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Images * (max 5)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-200 rounded-xl"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">You can select up to 5 images</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (id ? 'Update Product' : 'Create Product')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}