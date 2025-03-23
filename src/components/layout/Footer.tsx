
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 pt-16 pb-12 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-6 pb-10">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Minimalist</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Creating modern, minimal products designed to enhance your everyday life.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="#" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="#" aria-label="Email">
                <Mail className="w-5 h-5" />
              </SocialLink>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-6 uppercase tracking-wider">Shop</h3>
            <ul className="space-y-4">
              <FooterLink to="/products">All Products</FooterLink>
              <FooterLink to="/products?category=electronics">Electronics</FooterLink>
              <FooterLink to="/products?category=home">Home</FooterLink>
              <FooterLink to="/products?category=clothing">Clothing</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-6 uppercase tracking-wider">Company</h3>
            <ul className="space-y-4">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/sustainability">Sustainability</FooterLink>
              <FooterLink to="/press">Press</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-6 uppercase tracking-wider">Customer Service</h3>
            <ul className="space-y-4">
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/shipping">Shipping & Returns</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms & Conditions</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Minimalist. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <p>Designed with simplicity in mind.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm"
      >
        {children}
      </Link>
    </li>
  );
};

interface SocialLinkProps {
  href: string;
  'aria-label': string;
  children: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, children, ...props }) => {
  return (
    <a 
      href={href}
      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
      {...props}
    >
      {children}
    </a>
  );
};

export default Footer;
