
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4',
      isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
    )}>
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-semibold tracking-tight hover:opacity-80 transition-opacity-300"
        >
          Minimalist
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button 
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <Link 
            to="/cart" 
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        'fixed inset-0 bg-white dark:bg-gray-900 z-40 transition-transform duration-300 ease-in-out pt-20',
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="p-6 space-y-6">
          <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/products" onClick={() => setIsMenuOpen(false)}>Products</MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        'relative py-1 transition-all-300 font-medium',
        isActive 
          ? 'text-black dark:text-white' 
          : 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white'
      )}
    >
      {children}
      <span className={cn(
        'absolute bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white transform origin-bottom-right transition-transform duration-300 ease-out',
        isActive ? 'scale-x-100 origin-bottom-left' : 'scale-x-0'
      )} />
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, onClick, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={cn(
        'block text-3xl font-medium transition-colors duration-200',
        isActive 
          ? 'text-black dark:text-white' 
          : 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white'
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
