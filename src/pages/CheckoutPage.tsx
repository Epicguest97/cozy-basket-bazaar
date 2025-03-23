
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

const CheckoutPage = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const subtotal = getCartTotal();
  const shipping = items.length > 0 ? 10.00 : 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock successful checkout
    setOrderComplete(true);
    clearCart();
    
    // Reset form
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  
  // If cart is empty and not showing order completion screen, redirect to cart
  if (items.length === 0 && !orderComplete) {
    toast.info("Your cart is empty");
    navigate('/cart');
    return null;
  }
  
  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16 flex items-center">
          <div className="max-w-md mx-auto px-6 text-center animate-scale-in">
            <div className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Thank you for your purchase. We've sent a confirmation email with your order details.
            </p>
            <Link
              to="/"
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 inline-flex items-center justify-center transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back button */}
          <Link
            to="/cart"
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Cart
          </Link>
          
          <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Checkout form */}
            <div className="lg:col-span-2">
              <form ref={formRef} onSubmit={handleSubmit}>
                {/* Contact information */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
                  <h2 className="font-medium mb-4">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Shipping information */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
                  <h2 className="font-medium mb-4">Shipping Address</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="country" className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Payment information */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
                  <h2 className="font-medium mb-4">Payment Information</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          placeholder="MM/YY"
                          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          id="cvc"
                          placeholder="123"
                          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="lg:hidden">
                  <OrderSummary
                    subtotal={subtotal}
                    shipping={shipping}
                    tax={tax}
                    total={total}
                    items={items}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 mt-6"
                >
                  Complete Order
                </button>
              </form>
            </div>
            
            {/* Order summary */}
            <div className="hidden lg:block lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                items={items}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: Array<{ product: { id: string; name: string; price: number; images: string[] }; quantity: number }>;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shipping, tax, total, items }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm sticky top-28">
      <h2 className="font-medium border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        Order Summary
      </h2>
      
      <div className="mb-6 space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center text-sm">
            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={item.product.images[0]} 
                alt={item.product.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-0 right-0 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl-md">
                {item.quantity}
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
              <p className="text-gray-600 dark:text-gray-400">${item.product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      
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
    </div>
  );
};

export default CheckoutPage;
