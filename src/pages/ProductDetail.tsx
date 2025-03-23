
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ImageGallery from '@/components/ui/ImageGallery';
import QuantitySelector from '@/components/ui/QuantitySelector';
import ProductCard from '@/components/ui/ProductCard';
import { getProductById, products } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = productId ? getProductById(productId) : undefined;
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-6">
            <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center text-black dark:text-white font-medium underline"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 99));
  };
  
  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </button>
          
          {/* Product details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product images */}
            <div className="animate-fade-in">
              <ImageGallery images={product.images} alt={product.name} />
            </div>
            
            {/* Product info */}
            <div className="animate-slide-up">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold">{product.name}</h1>
                <p className="mt-3 text-2xl font-medium">${product.price.toFixed(2)}</p>
              </div>
              
              <div className="prose dark:prose-invert mb-8">
                <p>{product.description}</p>
              </div>
              
              {/* Details */}
              <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-8">
                <h3 className="font-medium mb-4">Details</h3>
                <dl className="space-y-3">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="flex">
                      <dt className="w-1/3 text-gray-600 dark:text-gray-400">{key}</dt>
                      <dd className="w-2/3">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              
              {/* Add to cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-sm font-medium">
                    Quantity
                  </label>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={handleIncreaseQuantity}
                    onDecrease={handleDecreaseQuantity}
                  />
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-semibold mb-8">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
