import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Zap, Clock, Search, ChevronRight, X, Plus, Minus, CheckCircle, Package, Truck, Home } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCat, setActiveCat] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); 
  const [otp, setOtp] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);
  const [view, setView] = useState('shop'); 

  const categories = ['All', 'Groceries', 'Electronics', 'Kitchen', 'Clothes', 'Food Items'];

  // 1. Fetch Products
  useEffect(() => {
    setLoading(true);
    const url = activeCat === 'All' ? '/api/products' : `/api/products?category=${activeCat}`;
    fetch(url)
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCat]);

  // 2. Fetch Order History when switching to history view
  useEffect(() => {
    if (view === 'history') {
      fetch("/api/orders")
        .then(res => res.json())
        .then(data => setOrderHistory(data))
        .catch(err => console.error("History error:", err));
    }
  }, [view]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      return [...prev, {...product, qty: 1}];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.map(item => item.id === id ? {...item, qty: item.qty - 1} : item).filter(item => item.qty > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0);

  // --- FIXED CHECKOUT FLOW ---
  const handleCheckout = () => {
    setIsCartOpen(false); // Close drawer
    setOrderStatus('payment'); // Start payment flow
  };

  const handlePaymentSubmit = () => {
    setOrderStatus('otp');
  };

  const verifyOtp = async () => {
    if (otp === '1234') {
      const finalItemsCount = cart.reduce((acc, item) => acc + item.qty, 0);
      const finalTotal = cartTotal;

      setOrderStatus('processing');
    
      try {
        // Save to DB via Backend API
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items_count: finalItemsCount, total_amount: finalTotal })
        });

        // Success Sequence
        setTimeout(() => {
          setOrderStatus('tracking');
          setCart([]); // CLEAR CART IMMEDIATELY
          setOtp('');   // Reset OTP input
        }, 2000);
      } catch (error) {
        alert("Server error saving order");
        setOrderStatus(null);
      }
    } else {
      alert("Invalid OTP (Try 1234)");
    }
  };
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-yellow-200">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-[60] bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('shop')}>
          <div className="bg-yellow-400 p-2 rounded-xl shadow-lg shadow-yellow-100"><Zap size={22} fill="black" /></div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black italic leading-none tracking-tighter">FLASHSTORE</h1>
            <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">10 Mins Delivery</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-4 md:mx-10">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-yellow-500 transition-colors" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search appliances, food..." 
              className="w-full bg-slate-100 py-2.5 pl-10 pr-4 rounded-xl outline-none ring-2 ring-transparent focus:ring-yellow-400 focus:bg-white transition-all text-sm border-none shadow-inner" 
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button onClick={() => setView('history')} className={`text-sm font-bold px-3 py-1 rounded-md transition-colors ${view === 'history' ? 'bg-yellow-400 text-black' : 'text-slate-400 hover:text-slate-600'}`}>
            Orders
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">{cart.length > 0 ? `₹${cartTotal}` : 'Empty'}</span>
            {cart.length > 0 && <span className="bg-yellow-400 text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center ml-1">{cart.reduce((a, b) => a + b.qty, 0)}</span>}
          </button>
        </div>
      </nav>

      {/* Category Navigation (Hidden in History View) */}
      {view === 'shop' && (
        <div className="bg-white px-4 md:px-8 py-4 flex gap-3 overflow-x-auto no-scrollbar border-b border-slate-100">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeCat === cat ? 'bg-yellow-400 text-black shadow-md shadow-yellow-100' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {view === 'shop' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <AnimatePresence mode='popLayout'>
              {loading ? [1,2,3,4,5].map(n => <div key={n} className="h-72 bg-white animate-pulse rounded-2xl border border-slate-100" />) : 
                filteredProducts.map(p => (
                  <motion.div 
                    layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    key={p.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-4">
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <Clock size={12} className="text-green-600" />
                        <span className="text-[10px] font-black text-slate-700">{p.eta}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{p.name}</h3>
                    <p className="text-[11px] text-slate-400 mb-4 h-8 overflow-hidden">{p.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-black text-lg">₹{p.price}</span>
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(p)}
                        className="bg-green-600 text-white p-2.5 rounded-xl shadow-lg shadow-green-100"
                      >
                        <Plus size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              }
            </AnimatePresence>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black">Order History</h2>
              <button onClick={() => setView('shop')} className="text-sm text-green-600 font-bold">Back to Shopping</button>
            </div>
            {orderHistory.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                  <Package className="mx-auto text-slate-300 mb-4" size={48} />
                  <p className="text-slate-400 font-bold">No orders placed yet</p>
               </div>
            ) : orderHistory.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm hover:border-yellow-200 transition-colors">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Order #FL-X0{order.id}</p>
                  <p className="font-bold">{order.items_count} Items</p>
                  <p className="text-xs text-slate-500">{new Date(order.order_date).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-xl text-green-600">₹{order.total_amount}</p>
                  <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-black">DELIVERED</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-black flex items-center gap-2"><ShoppingCart /> Basket</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <Package size={64} className="text-slate-200 mb-4" />
                    <p className="font-bold text-slate-400">Your basket is empty!</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <img src={item.image_url} className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => removeFromCart(item.id)} className="p-1 bg-white rounded border"><Minus size={12}/></button>
                        <span className="font-bold text-sm">{item.qty}</span>
                        <button onClick={() => addToCart(item)} className="p-1 bg-white rounded border"><Plus size={12}/></button>
                      </div>
                    </div>
                    <div className="font-black">₹{item.price * item.qty}</div>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-slate-100">
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-400 font-bold">Subtotal</span>
                    <span className="text-2xl font-black text-green-600">₹{cartTotal}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Payment <ChevronRight />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Overlay */}
      <AnimatePresence>
        {orderStatus && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
              
              {orderStatus === 'payment' && (
                <div className="p-8">
                  <h2 className="text-2xl font-black mb-6">Payment Method</h2>
                  <div className="space-y-3">
                    {['UPI', 'Card', 'COD'].map(method => (
                      <div key={method} onClick={handlePaymentSubmit} className="flex items-center justify-between p-4 border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-yellow-400 transition-all">
                        <span className="font-bold">{method}</span>
                        <ChevronRight size={18} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {orderStatus === 'otp' && (
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-black mb-2">Verification</h2>
                  <p className="text-slate-400 text-sm mb-6">Enter 1234 to confirm</p>
                  <input 
                    type="text" maxLength="4" value={otp} onChange={(e) => setOtp(e.target.value)}
                    className="w-32 text-center text-3xl font-black py-3 border-b-4 border-slate-200 outline-none focus:border-yellow-400 mb-8"
                  />
                  <button onClick={verifyOtp} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">Confirm Order</button>
                </div>
              )}

              {orderStatus === 'processing' && (
                <div className="p-12 text-center">
                   <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                   <p className="font-bold">Finalizing Order...</p>
                </div>
              )}

              {orderStatus === 'tracking' && (
                <div className="p-8">
                  <div className="flex justify-between mb-8">
                    <h2 className="text-2xl font-black text-green-600">Placed!</h2>
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4"><Truck className="text-slate-400" /> <div><p className="font-bold">On the way</p><p className="text-xs">Rider arriving in 10m</p></div></div>
                  </div>
                  <button onClick={() => setOrderStatus(null)} className="w-full mt-10 py-3 bg-slate-100 rounded-xl font-bold">Back to Store</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default App;
