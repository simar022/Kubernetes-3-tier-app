/*import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const API_URL = "/api"; 

  // Professional INR Formatter
  const inrFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Sleek Professional Navbar }
      <nav className="sticky top-0 z-50 bg-[#131921] py-2 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-white tracking-tight italic">
            Kube<span className="text-orange-400">Store</span>
          </span>
        </div>
        <div className="hidden md:flex flex-grow max-w-2xl mx-10">
          <input type="text" className="w-full p-2 rounded-l-md outline-none" placeholder="Search for products..." />
          <button className="bg-orange-400 px-5 rounded-r-md hover:bg-orange-500 transition">🔍</button>
        </div>
        <div className="text-white flex space-x-6 text-sm font-medium">
          <div className="cursor-pointer hover:underline">Hello, Sign in</div>
          <div className="cursor-pointer hover:underline font-bold">Returns & Orders</div>
          <div className="cursor-pointer flex items-center space-x-1">
             <span className="text-xl">🛒</span><span className="font-bold text-orange-400">0</span>
          </div>
        </div>
      </nav>

      {/* Modern Product Grid }
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(p => (
            <div key={p.id} className="group bg-white flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="relative overflow-hidden h-64 bg-gray-200">
                <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-orange-600 shadow-sm">Best Seller</div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-gray-800 font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{p.name}</h2>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">{p.description}</p>
                <div className="mt-auto">
                  <span className="text-2xl font-black text-gray-900">{inrFormatter.format(p.price)}</span>
                  <button className="w-full mt-4 bg-[#FFD814] hover:bg-[#F7CA00] text-black py-2.5 rounded-full font-semibold shadow-sm transition active:scale-95">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
export default App;*/
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, User, Heart, ChevronRight, Star, X } from 'lucide-react';
import { cn } from './lib/utils';

function App() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeToast, setActiveToast] = useState(null);

  const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addToCart = (productName) => {
    setCartCount(prev => prev + 1);
    setActiveToast(`${productName} added to bag`);
    setTimeout(() => setActiveToast(null), 3000);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-serif selection:bg-slate-900 selection:text-white">
      
      {/* --- Sophisticated Toast Notification --- */}
      <AnimatePresence>
        {activeToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-[100] bg-slate-900 text-white px-6 py-4 rounded-none shadow-2xl flex items-center gap-4 border-l-4 border-orange-500"
          >
            <span className="text-sm tracking-widest uppercase font-sans font-bold">{activeToast}</span>
            <button onClick={() => setActiveToast(null)}><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Minimalist Luxury Navbar --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
            <span className="text-2xl font-black tracking-tighter uppercase italic">KUBESTORE.</span>
          </motion.div>
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">New Arrivals</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Collections</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Journal</a>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
          <User className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
          <div className="relative cursor-pointer group" onClick={() => addToCart("View Bag")}>
            <ShoppingBag className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
            <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-sans">
              {cartCount}
            </span>
          </div>
        </div>
      </nav>

      {/* --- Elegant Hero --- */}
      <header className="py-24 px-8 border-b border-slate-50 overflow-hidden bg-[#fafafa]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs tracking-[0.4em] uppercase text-orange-600 mb-6 font-sans font-bold"
          >
            Limited Edition Release
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-7xl md:text-8xl font-black mb-8 text-center tracking-tight leading-none"
          >
            The Cloud <br/> Essential.
          </motion.h1>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#000" }}
            className="bg-slate-900 text-white px-10 py-4 text-xs uppercase tracking-[0.3em] font-bold transition-all"
          >
            Shop the Collection
          </motion.button>
        </div>
      </header>

      {/* --- High-End Product Grid --- */}
      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
          <h2 className="text-3xl font-bold tracking-tight">Curated Pieces</h2>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-sans">Showing {products.length} Items</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {loading ? [1,2,3,4].map(n => <div key={n} className="h-96 bg-slate-50 animate-pulse" />) : 
            products.map((p, idx) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Product Image Wrapper */}
                <div className="relative aspect-[3/4] bg-slate-50 overflow-hidden mb-6 cursor-pointer">
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  
                  {/* Overlay Interaction */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => toggleWishlist(p.id)}
                      className={cn("p-3 bg-white shadow-xl hover:bg-slate-900 hover:text-white transition-all", wishlist.includes(p.id) && "bg-orange-500 text-white")}
                    >
                      <Heart size={16} fill={wishlist.includes(p.id) ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Quick Add Button */}
                  <button 
                    onClick={() => addToCart(p.name)}
                    className="absolute bottom-0 left-0 right-0 bg-white py-4 text-[10px] uppercase tracking-[0.2em] font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-slate-900 hover:text-white"
                  >
                    Quick Add +
                  </button>
                </div>
                
                {/* Details */}
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-sans font-bold">{p.category || 'Essential'}</p>
                  <h3 className="text-sm font-bold mb-2 group-hover:text-orange-600 transition-colors cursor-pointer">{p.name}</h3>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-sm font-black italic">{inr.format(p.price)}</span>
                    {p.id % 2 === 0 && <span className="text-[10px] line-through text-slate-300 font-sans">{inr.format(p.price * 1.2)}</span>}
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>
      </main>

      {/* --- Footer Signature --- */}
      <footer className="bg-slate-900 text-white py-20 px-8 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.5em] opacity-40 mb-8">Established 2026</p>
          <h4 className="text-2xl font-serif mb-6 italic italic">Crafting the future of cloud gear.</h4>
          <div className="flex justify-center gap-8 opacity-60 text-[10px] tracking-widest uppercase font-bold">
            <span className="hover:opacity-100 cursor-pointer">Instagram</span>
            <span className="hover:opacity-100 cursor-pointer">Twitter</span>
            <span className="hover:opacity-100 cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
