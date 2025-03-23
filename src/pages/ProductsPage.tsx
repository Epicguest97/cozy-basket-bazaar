import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { products, categories } from '@/lib/data';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [sortBy, setSortBy] = useState('featured');
  
  useEffect(() => {
    // Update category when URL param changes
    setSelectedCategory(categoryParam);
  }, [categoryParam]);
  
  useEffect(() => {
    // Filter products by category
    let filtered = products;
    
    if (selectedCategory) {
      filtered = products.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep default order for 'featured'
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy]);
  
  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    
    if (categoryId) {
      searchParams.set('category', categoryId);
    } else {
      searchParams.delete('category');
    }
    
    setSearchParams(searchParams);
  };
  
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-semibold">All Products</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleFilter}
                className="md:hidden flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter sidebar - desktop */}
            <aside className="hidden md:block w-64 flex-shrink-0 space-y-6">
              <div>
                <h3 className="font-medium mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleCategoryChange(null)}
                      className={cn(
                        'text-left w-full py-1 transition-colors duration-200',
                        selectedCategory === null
                          ? 'font-semibold text-black dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                      )}
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleCategoryChange(category.id)}
                        className={cn(
                          'text-left w-full py-1 transition-colors duration-200',
                          selectedCategory === category.id
                            ? 'font-semibold text-black dark:text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                        )}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            
            {/* Filter sidebar - mobile */}
            <aside className={cn(
              'fixed inset-0 z-40 bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out p-6',
              isFilterOpen ? 'translate-x-0' : '-translate-x-full'
            )}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-xl">Filters</h3>
                <button
                  onClick={toggleFilter}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Categories</h3>
                  <ul className="space-y-4">
                    <li>
                      <button
                        onClick={() => {
                          handleCategoryChange(null);
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          'text-left w-full py-1 transition-colors duration-200',
                          selectedCategory === null
                            ? 'font-semibold text-black dark:text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                        )}
                      >
                        All Categories
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => {
                            handleCategoryChange(category.id);
                            setIsFilterOpen(false);
                          }}
                          className={cn(
                            'text-left w-full py-1 transition-colors duration-200',
                            selectedCategory === category.id
                              ? 'font-semibold text-black dark:text-white'
                              : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                          )}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
            
            {/* Products grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">No products found.</p>
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className="text-black dark:text-white underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      className="animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
