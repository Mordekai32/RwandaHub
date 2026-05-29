import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-7xl mb-4">🛒</div>
          <h2 className="text-3xl font-bold text-[#333333] mb-3">Your cart is empty</h2>
          <p className="text-[#666666] mb-8">Looks like you haven't added any items yet.</p>
          <Link
            to="/"
            className="inline-block bg-[#FF6A00] hover:bg-[#E55A00] text-white font-semibold py-3 px-8 rounded-xl transition shadow-md hover:shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333]">Shopping Cart</h1>
          <Link to="/" className="text-[#1E88E5] hover:text-[#1565C0] flex items-center gap-1 font-medium">
            ← Continue Shopping
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {cart.map((item) => {
            const productName = item.title || item.name || 'Product';
            const imageUrl = item.images?.[0] || 'https://via.placeholder.com/300';
            const price = item.price || 0;
            const quantity = item.quantity || 1;
            const itemTotal = price * quantity;

            return (
              <div key={item._id} className="flex flex-col md:flex-row justify-between items-center p-5 border-b last:border-b-0 gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <img src={imageUrl} alt={productName} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <Link to={`/product/${item._id}`} className="font-semibold text-[#333333] hover:text-[#FF6A00] transition">
                      {productName}
                    </Link>
                    {item.location && <p className="text-sm text-[#666666] mt-0.5">{item.location}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-wrap justify-center">
                  <div className="text-center min-w-[90px] text-[#555555]">RWF {price.toLocaleString()}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-center min-w-[110px] font-bold text-[#FF6A00]">RWF {itemTotal.toLocaleString()}</div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-400 hover:text-red-600 p-1"
                    aria-label="Remove"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-md p-6 max-w-md ml-auto">
          <h2 className="text-2xl font-bold text-[#333333] mb-5">Order Summary</h2>
          <div className="space-y-3 text-[#555555]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>RWF {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>RWF {tax.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 mt-2">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-[#FF6A00]">RWF {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <button
            className="mt-6 w-full bg-[#00A67E] hover:bg-[#008C6A] text-white font-bold py-3 rounded-xl transition shadow-md hover:shadow-lg"
            onClick={() => alert('Proceed to checkout')}
          >
            Proceed to Checkout
          </button>
          <p className="text-xs text-[#666666] text-center mt-4">Secure payment powered by RwandaMarket</p>
        </div>
      </div>
    </div>
  );
}