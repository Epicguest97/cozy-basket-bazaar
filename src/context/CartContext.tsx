
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { Product } from '@/lib/data';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.product.id === product.id
      );
      
      if (existingItemIndex > -1) {
        // Product already in cart, update quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success(`Updated ${product.name} quantity in cart`);
        return updatedItems;
      } else {
        // Product not in cart, add it
        toast.success(`Added ${product.name} to cart`);
        return [...currentItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.product.name} from cart`);
      }
      return currentItems.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getItemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
