
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  className,
  min = 1,
  max = 99
}) => {
  return (
    <div className={cn(
      'inline-flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden',
      className
    )}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className={cn(
          'p-2 transition-colors duration-200 focus:outline-none',
          quantity <= min 
            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        )}
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      
      <span className="w-10 text-center font-medium text-sm py-2">
        {quantity}
      </span>
      
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className={cn(
          'p-2 transition-colors duration-200 focus:outline-none',
          quantity >= max 
            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        )}
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;
