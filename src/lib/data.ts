
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  details: {
    [key: string]: string;
  };
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest tech gadgets and accessories',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'home',
    name: 'Home',
    description: 'Modern furniture and home decor',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Contemporary fashion and accessories',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop'
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Minimalist Wireless Earbuds',
    description: 'Experience crystal-clear audio with these sleek, comfortable wireless earbuds featuring active noise cancellation.',
    price: 129.99,
    category: 'electronics',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606741965509-444b1961d0f3?q=80&w=1000&auto=format&fit=crop'
    ],
    details: {
      'Battery Life': 'Up to 24 hours with case',
      'Connectivity': 'Bluetooth 5.2',
      'Water Resistance': 'IPX4',
      'Noise Cancellation': 'Active with transparency mode'
    }
  },
  {
    id: 'p2',
    name: 'Smart Watch Series X',
    description: 'Track your health, fitness, and stay connected with this premium smartwatch featuring an OLED display.',
    price: 349.99,
    category: 'electronics',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553545204-4f7d339aa06a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop'
    ],
    details: {
      'Display': '1.9" OLED Retina',
      'Battery Life': 'Up to 18 hours',
      'Water Resistance': '50m',
      'Sensors': 'Heart rate, ECG, Blood oxygen, Altimeter'
    }
  },
  {
    id: 'p3',
    name: 'Modern Lounge Chair',
    description: 'Add elegance to any room with this handcrafted lounge chair, featuring premium materials and ergonomic design.',
    price: 599.99,
    category: 'home',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1619115445677-ee82a090c702?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop'
    ],
    details: {
      'Material': 'Solid walnut frame, premium leather',
      'Dimensions': '31"W x 33"D x 27"H',
      'Weight Capacity': '280 lbs',
      'Assembly': 'Minimal assembly required'
    }
  },
  {
    id: 'p4',
    name: 'Professional DSLR Camera',
    description: 'Capture stunning photos and videos with this professional-grade camera featuring advanced sensors and 8K recording.',
    price: 1899.99,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1000&auto=format&fit=crop'
    ],
    details: {
      'Megapixels': '45MP full-frame sensor',
      'Video': '8K30p, 4K120p',
      'ISO Range': '100-51,200 (expandable to 102,400)',
      'Connectivity': 'Wi-Fi, Bluetooth, USB-C'
    }
  },
  {
    id: 'p5',
    name: 'Artisan Table Lamp',
    description: 'Illuminate your space with this handcrafted ceramic lamp featuring a natural linen shade and dimmable LED bulb.',
    price: 189.99,
    category: 'home',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1530603907829-659ab5ec057b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000&auto=format&fit=crop'
    ],
    details: {
      'Material': 'Handcrafted ceramic, natural linen shade',
      'Dimensions': '12"D x 24"H',
      'Bulb': 'Dimmable LED included',
      'Switch': 'In-line with 3 brightness settings'
    }
  },
  {
    id: 'p6',
    name: 'Premium Merino Wool Sweater',
    description: 'Stay warm and stylish with this luxurious Merino wool sweater, ethically sourced and expertly crafted for comfort.',
    price: 149.99,
    category: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1577900232426-20405d283fb1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1000&auto=format&fit=crop'
    ],
    details: {
      'Material': '100% Merino wool',
      'Care': 'Machine washable on wool cycle',
      'Origin': 'Ethically sourced and produced',
      'Fit': 'Regular fit, true to size'
    }
  },
  {
    id: 'p7',
    name: 'Minimalist Desk',
    description: 'Enhance your workspace with this sleek, minimal desk featuring integrated cable management and durable construction.',
    price: 399.99,
    category: 'home',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494173853739-c21f58b16055?q=80&w=1000&auto=format&fit=crop'
    ],
    details: {
      'Material': 'Solid oak with matte finish',
      'Dimensions': '48"W x 24"D x 30"H',
      'Features': 'Integrated cable management, adjustable feet',
      'Assembly': 'Easy assembly with included tools'
    }
  },
  {
    id: 'p8',
    name: 'Ultra-Thin Laptop Pro',
    description: 'Powerful performance meets elegant design in this premium laptop featuring a Retina display and all-day battery life.',
    price: 1299.99,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=1000&auto=format&fit=crop'
    ],
    details: {
      'Processor': 'Quad-core 2.8GHz',
      'Memory': '16GB RAM',
      'Storage': '512GB SSD',
      'Display': '14" Retina display with True Tone'
    }
  }
];

// Helper function to get a product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

// Helper function to get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}
