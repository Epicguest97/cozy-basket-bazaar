
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getFeaturedProducts, categories } from '@/lib/data';

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="mt-16 pt-24 px-6 pb-16 md:pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-slide-down">
              Function<span className="mx-2 opacity-30">→</span>Form
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
              Modern, minimal design for a more thoughtful lifestyle.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Link 
                to="/products" 
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/about" 
                className="bg-white text-black border border-gray-200 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">Featured Products</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                className="animate-scale-in"
                style={{ animationDelay: `${featuredProducts.indexOf(product) * 100}ms` }}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center text-black dark:text-white font-medium hover:underline"
            >
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative rounded-xl overflow-hidden aspect-[3/2] flex items-end"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative p-6 w-full text-white">
                  <h3 className="text-xl font-medium mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200 mb-4">{category.description}</p>
                  <span className="inline-flex items-center text-sm font-medium">
                    Browse Products
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Minimalist Lifestyle */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Thoughtfully Designed</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                We believe in creating products that enhance your daily life through simplicity and functionality. Every detail is considered, every material chosen with purpose.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Our commitment to quality means creating timeless pieces that last, reducing waste and environmental impact.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center text-black dark:text-white font-medium hover:underline"
              >
                Our Philosophy
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1595514535313-e9e788d0f3d5?q=80&w=1000&auto=format&fit=crop" 
                alt="Minimalist lifestyle" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Stay updated with our latest products, offers, and design insights.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
          
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
