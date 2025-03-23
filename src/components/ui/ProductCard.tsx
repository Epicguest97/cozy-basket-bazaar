
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  className?: string;
  style?: React.CSSProperties;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className, style }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const trackProductClick = useCallback(() => {
    // Log the click event
    console.log(`Product clicked: ${product.id} - ${product.name}`);
    
    // In the future, this would send data to a backend API
    const clickData = {
      productId: product.id,
      productName: product.name,
      timestamp: new Date().toISOString(),
      userId: 'anonymous' // This would be replaced with actual user ID when auth is implemented
    };
    
    // Store click data in localStorage for now (simulating a backend)
    const productClicks = JSON.parse(localStorage.getItem('productClicks') || '[]');
    productClicks.push(clickData);
    localStorage.setItem('productClicks', JSON.stringify(productClicks));
    
    // Notify with toast for demonstration purposes
    toast.info(`Click on ${product.name} tracked`, {
      duration: 1500,
    });
  }, [product]);

  return (
    <div 
      className={cn(
        'group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-md',
        className
      )}
      style={style}
    >
      <Link 
        to={`/product/${product.id}`} 
        className="block"
        onClick={trackProductClick}
      >
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 rounded-full p-2 shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            aria-label="Add to cart"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-lg transition-colors duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-300">
            {product.name}
          </h3>
          <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
