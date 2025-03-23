
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import QuantitySelector from '@/components/ui/QuantitySelector';
import { Product } from '@/lib/data';

interface CartItemProps {
  product: Product;
  quantity: number;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
  className?: string;
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity,
  onRemove,
  onUpdateQuantity,
  className
}) => {
  return (
    <div className={cn(
      'flex border-b border-gray-200 dark:border-gray-700 py-6 animate-fade-in',
      className
    )}>
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link 
              to={`/product/${product.id}`}
              className="text-lg font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </p>
          </div>
          
          <p className="text-base font-medium">
            ${product.price.toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => onUpdateQuantity(quantity + 1)}
            onDecrease={() => onUpdateQuantity(quantity - 1)}
          />
          
          <button
            type="button"
            onClick={onRemove}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            aria-label={`Remove ${product.name} from cart`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
