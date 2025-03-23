
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const subtotal = getCartTotal();
  const shipping = items.length > 0 ? 10.00 : 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16 max-w-md mx-auto animate-fade-in">
              <div className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mb-6">
                <ShoppingCart className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link
                to="/products"
                className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 inline-flex items-center justify-center transition-colors duration-300"
              >
                Continue Shopping
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 flex justify-between items-center">
                    <h2 className="font-medium">
                      {items.length} {items.length === 1 ? 'Item' : 'Items'}
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
                    >
                      Clear Cart
                    </button>
                  </div>
                  
                  <div>
                    {items.map((item) => (
                      <CartItem
                        key={item.product.id}
                        product={item.product}
                        quantity={item.quantity}
                        onRemove={() => removeFromCart(item.product.id)}
                        onUpdateQuantity={(quantity) => updateQuantity(item.product.id, quantity)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm sticky top-28">
                  <h2 className="font-medium border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Link
                      to="/checkout"
                      className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                    
                    <Link
                      to="/products"
                      className="w-full text-center block mt-4 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
