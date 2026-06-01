import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, MapPin, Star, Bed, Bath, Maximize, X, 
  MessageSquare, Phone, Building2, PenTool, Paintbrush, 
  Plus, Image as ImageIcon, ArrowLeft, ChevronRight, 
  CheckCircle2, ShieldCheck, User, Settings, Trash2, Edit,
  Lock, Mail, Heart, LayoutDashboard, LogOut
} from 'lucide-react';

// --- 1. DATA (Our "Database") ---
const PROPERTIES = [
  { id: 1, title: "The Runda Estate Mansion", location: "Runda, Nairobi", price: "KSh 85,000,000", beds: 5, baths: 4, sqft: "5,000", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800", tag: "Luxury Mansion", description: "A stunning 5-bedroom mansion located in the heart of Runda. Features a private pool and world-class security." },
  { id: 2, title: "Kilimani Sky-View Apartment", location: "Kilimani, Nairobi", price: "KSh 18,500,000", beds: 3, baths: 2, sqft: "1,800", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800", tag: "Modern Apartment", description: "Modern 3-bedroom apartment with breathtaking views of the Nairobi skyline and rooftop lounge access." },
  { id: 3, title: "Nyali Beachfront Villa", location: "Nyali, Mombasa", price: "KSh 45,000,000", beds: 4, baths: 3, sqft: "3,200", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", tag: "Coastal Villa", description: "Experience coastal living at its best with direct beach access and a private gazebo." }
];

const ARCHITECTS = [
  { id: 1, name: "Arch. David Mutua", specialty: "Modern Residential", rating: 4.9, projects: 42, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Sarah Jenga", specialty: "Eco-Friendly Design", rating: 4.8, projects: 29, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" }
];

const DESIGNERS = [
  { id: 1, name: "Zuhura Interiors", specialty: "Minimalist Modern", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800", description: "Transforming spaces into serene escapes." },
  { id: 2, name: "Maina Designs", specialty: "Afro-Chic Luxury", image: "https://images.unsplash.com/photo-1616489953149-80860543666d?auto=format&fit=crop&q=80&w=800", description: "Bringing African heritage into modern luxury." }
];

function App() {
  const [view, setView] = useState('home'); // home, seller, architect, admin, login, signup, buyer_dash
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [authRole, setAuthRole] = useState('Buyer');

  // Helper for animations
  const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

  const triggerSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setView('home');
    }, 2500);
  };

  // --- VIEW: LOGIN ---
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-white flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-slate-900 p-12 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="z-10">
            <div className="flex items-center gap-2 mb-12"><div className="bg-blue-600 p-2 rounded-xl"><Home size={24} /></div><span className="text-2xl font-black">HOMESPHERE</span></div>
            <h1 className="text-7xl font-black leading-none mb-6">Welcome<br/>Back.</h1>
          </div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
        </div>
        <motion.div {...fadeUp} className="md:w-1/2 p-12 md:p-24 flex flex-col justify-center">
          <h2 className="text-4xl font-black mb-10 text-left">Login</h2>
          <div className="space-y-6 text-left">
            <div><label className="block text-xs font-black uppercase tracking-widest mb-2">Email</label><input type="email" className="w-full bg-slate-50 p-5 rounded-2xl outline-none border border-transparent focus:border-blue-600 font-bold" placeholder="name@email.com" /></div>
            <div><label className="block text-xs font-black uppercase tracking-widest mb-2">Password</label><input type="password" className="w-full bg-slate-50 p-5 rounded-2xl outline-none border border-transparent focus:border-blue-600 font-bold" placeholder="••••••••" /></div>
            <button onClick={triggerSuccess} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-100">SIGN IN</button>
            <p className="text-center font-bold text-slate-500">New here? <button onClick={() => setView('signup')} className="text-blue-600">Create account</button></p>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- VIEW: SIGNUP ---
  if (view === 'signup') {
    return (
      <div className="min-h-screen bg-white flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-blue-600 p-12 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="z-10">
            <div className="flex items-center gap-2 mb-12"><div className="bg-slate-900 p-2 rounded-xl"><Home size={24} /></div><span className="text-2xl font-black">HOMESPHERE</span></div>
            <h1 className="text-7xl font-black leading-none mb-6">Join the<br/>Sphere.</h1>
          </div>
        </div>
        <motion.div {...fadeUp} className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center text-left">
          <h2 className="text-4xl font-black mb-2">Register</h2>
          <p className="text-slate-400 font-bold mb-8">Select your role to get started.</p>
          <div className="flex gap-2 mb-8 bg-slate-50 p-2 rounded-2xl">
            {['Buyer', 'Seller', 'Architect', 'Designer'].map(r => (
              <button key={r} onClick={() => setAuthRole(r)} className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${authRole === r ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'}`}>{r}</button>
            ))}
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold" />
            <input type="email" placeholder="Email" className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold" />
            <input type="password" placeholder="Password" className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold" />
            <button onClick={triggerSuccess} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl mt-4">CREATE ACCOUNT</button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- VIEW: SELLER DASHBOARD ---
  if (view === 'seller') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <nav className="bg-white border-b border-slate-100 px-8 py-6 flex justify-between items-center sticky top-0 z-50">
          <button onClick={() => setView('home')} className="flex items-center gap-2 text-slate-900 font-black hover:text-blue-600 transition-all"><ArrowLeft /> HOME</button>
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl text-emerald-600 font-black border border-emerald-100"><Building2 size={20} /> SELLER PANEL</div>
        </nav>
        <main className="max-w-4xl mx-auto py-20 px-6 text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 p-12">
            <h2 className="text-4xl font-black mb-8">Post Property</h2>
            <div className="space-y-6">
              <input type="text" placeholder="Property Title (e.g. Modern Villa in Karen)" className="w-full bg-slate-50 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold" />
              <input type="text" placeholder="Asking Price (KSh)" className="w-full bg-slate-50 p-5 rounded-2xl outline-none font-bold" />
              <div className="h-48 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center bg-slate-50 group hover:border-blue-600 transition-all cursor-pointer">
                <ImageIcon className="text-slate-300 mb-2 group-hover:text-blue-600" size={48} />
                <p className="font-black text-slate-400">Click to upload property images</p>
              </div>
              <button onClick={triggerSuccess} className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-2xl hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all">PUBLISH NOW</button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // --- VIEW: BUYER DASHBOARD (My Favorites) ---
  if (view === 'buyer_dash') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-left">
        <nav className="bg-white border-b border-slate-100 px-8 py-6 flex justify-between items-center sticky top-0 z-50">
          <button onClick={() => setView('home')} className="flex items-center gap-2 text-slate-900 font-black hover:text-blue-600 transition-all"><ArrowLeft /> HOME</button>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl text-blue-600 font-black border border-blue-100"><Heart size={20} /> MY FAVORITES</div>
        </nav>
        <main className="max-w-7xl mx-auto py-20 px-6">
          <h2 className="text-5xl font-black mb-12 tracking-tight">Saved Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 italic text-slate-400 font-bold">
            No properties saved yet. Start exploring the marketplace!
          </div>
        </main>
      </div>
    );
  }

  // --- VIEW: ADMIN PANEL ---
  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-slate-900 font-sans text-white text-left">
        <nav className="bg-slate-800 border-b border-slate-700 px-8 py-6 flex justify-between items-center sticky top-0 z-50">
          <button onClick={() => setView('home')} className="flex items-center gap-2 text-white font-black hover:text-blue-400 transition-all"><ArrowLeft /> EXIT ADMIN</button>
          <div className="flex items-center gap-2 bg-blue-600/20 px-4 py-2 rounded-xl text-blue-400 font-bold border border-blue-600/30"><ShieldCheck size={20} /> SYSTEM ADMIN</div>
        </nav>
        <main className="max-w-7xl mx-auto py-20 px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[ {l: "Total Users", v: "1,240"}, {l: "Active Listings", v: "450"}, {l: "Architects", v: "88"}, {l: "Revenue", v: "KSh 2.4M"} ].map(s => (
              <div key={s.l} className="bg-slate-800 p-8 rounded-[2rem] border border-slate-700">
                <p className="text-slate-400 font-bold text-xs uppercase mb-2">{s.l}</p>
                <p className="text-4xl font-black">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-800 rounded-[3rem] p-10 border border-slate-700 font-bold text-slate-400 italic">User monitor active... Waiting for backend data.</div>
        </main>
      </div>
    );
  }

  // --- VIEW: MAIN HOME ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 overflow-x-hidden text-left">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl text-white"><Home size={24} /></div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Home<span className="text-blue-600">Sphere</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-black text-slate-500 uppercase tracking-widest">
            <button onClick={() => setView('home')} className="hover:text-blue-600 transition-all">Find Houses</button>
            <button onClick={() => setView('seller')} className="hover:text-blue-600 transition-all">Sell Property</button>
            <button onClick={() => setView('buyer_dash')} className="hover:text-blue-600 transition-all">My Favorites</button>
            <button onClick={() => setView('admin')} className="hover:text-red-600 transition-all text-slate-300">Admin</button>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setView('login')} className="bg-slate-900 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Login</button>
          </div>
        </div>
      </nav>

      <main className="pt-40 px-6">
        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto text-center mb-32">
          <h1 className="text-6xl md:text-9xl font-black text-slate-900 mb-8 tracking-tighter leading-none">Build your <span className="text-blue-600 italic font-serif">Kenyan</span> dream.</h1>
          <div className="max-w-4xl mx-auto bg-white p-4 rounded-3xl shadow-2xl shadow-blue-100 border border-slate-100 flex flex-wrap md:flex-nowrap gap-4">
             <div className="flex-1 flex items-center gap-3 px-6 py-3 border-r border-slate-50"><MapPin className="text-blue-600" /><input type="text" placeholder="Where in Kenya are you looking?" className="w-full outline-none font-bold text-lg" /></div>
             <button className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 uppercase tracking-tighter">FIND HOME</button>
          </div>
        </motion.div>

        {/* ROLE SELECTION */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-40 text-left">
          {[
            { name: "Buyer", icon: Search, color: "bg-blue-50 text-blue-600", desc: "Find Land & Houses", action: () => setView('home') },
            { name: "Seller", icon: Building2, color: "bg-emerald-50 text-emerald-600", desc: "List Property", action: () => setView('seller') },
            { name: "Architect", icon: PenTool, color: "bg-purple-50 text-purple-600", desc: "Hire Designers", action: () => {} },
            { name: "Designer", icon: Paintbrush, color: "bg-orange-50 text-orange-600", desc: "Style Interiors", action: () => {} }
          ].map((role, idx) => (
            <motion.div key={role.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -10 }} onClick={role.action} className="group p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer">
              <div className={`w-16 h-16 ${role.color} rounded-2xl flex items-center justify-center mb-6`}><role.icon size={32} /></div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{role.name}</h3>
              <p className="text-slate-400 font-bold text-sm leading-relaxed">{role.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* PROPERTY LISTINGS */}
        <section className="max-w-7xl mx-auto mb-40 text-left">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">Featured Homes</h2>
            <button className="text-blue-600 font-black text-xl hover:underline underline-offset-8 transition-all flex items-center gap-2">VIEW ALL <ChevronRight /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PROPERTIES.map((item) => (
              <motion.div key={item.id} whileHover={{ y: -15 }} onClick={() => setSelectedProperty(item)} className="group bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer">
                <div className="relative h-80 overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                  <div className="absolute bottom-8 right-8 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black shadow-2xl">{item.price}</div>
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-400 font-bold flex items-center gap-2 mb-8 italic"><MapPin size={18} className="text-blue-600" /> {item.location}</p>
                  <div className="flex justify-between border-t border-slate-100 pt-8 font-black text-slate-900 uppercase text-xs tracking-tighter">
                    <span>{item.beds} Beds</span>
                    <span>{item.baths} Baths</span>
                    <span>{item.sqft} SqFt</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INTERIOR DESIGNERS */}
        <section className="max-w-7xl mx-auto mb-40 text-left">
          <h2 className="text-5xl font-black text-slate-900 mb-16 tracking-tight">Interior Stylists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {DESIGNERS.map((designer) => (
              <motion.div whileHover={{ scale: 1.02 }} key={designer.id} className="relative h-[32rem] rounded-[4.5rem] overflow-hidden group shadow-2xl">
                <img src={designer.image} className="w-full h-full object-cover group-hover:scale-110 transition-duration-1000" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent flex flex-col justify-end p-16 text-white">
                  <h3 className="text-5xl font-black mb-3 leading-none">{designer.name}</h3>
                  <p className="text-blue-400 font-black text-xl mb-8">{designer.specialty}</p>
                  <button className="bg-white text-slate-900 px-10 py-5 rounded-3xl font-black w-fit hover:bg-blue-600 hover:text-white transition-all shadow-xl">HIRE DESIGNER</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ARCHITECTS */}
        <section className="max-w-7xl mx-auto mb-40">
          <div className="bg-slate-900 rounded-[5rem] p-16 md:p-24 relative overflow-hidden text-left shadow-2xl shadow-blue-900/20">
            <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-6xl font-black text-white mb-8 leading-tight">Hire Pro<br/>Architects.</h2>
                <button className="bg-blue-600 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-blue-500 transition-all shadow-2xl">VIEW BLUEPRINTS</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {ARCHITECTS.map(pro => (
                  <div key={pro.id} className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem]">
                    <img src={pro.image} className="w-24 h-24 rounded-3xl object-cover mb-8 border-2 border-blue-600/30" alt="" />
                    <h4 className="text-white font-black text-2xl mb-1">{pro.name}</h4>
                    <p className="text-blue-400 font-bold mb-6">{pro.specialty}</p>
                    <div className="flex items-center gap-2 text-yellow-500 font-bold"><Star size={16} fill="currentColor"/> {pro.rating}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[140px]"></div>
          </div>
        </section>

        {/* MODAL DETAIL POP-UP */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={() => setSelectedProperty(null)}></div>
              <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }} className="relative bg-white w-full max-w-6xl rounded-[5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
                <button onClick={() => setSelectedProperty(null)} className="absolute top-10 right-10 z-10 bg-white/80 p-4 rounded-full hover:bg-white transition-all shadow-xl text-slate-900"><X size={28} /></button>
                <div className="md:w-1/2 h-[35rem] md:h-auto overflow-hidden"><img src={selectedProperty.image} className="w-full h-full object-cover" alt="" /></div>
                <div className="md:w-1/2 p-16 flex flex-col justify-center text-left bg-white">
                  <h2 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-none">{selectedProperty.title}</h2>
                  <p className="text-slate-500 text-xl mb-12 font-bold leading-relaxed">{selectedProperty.description}</p>
                  <div className="flex gap-6">
                    <button className="flex-1 bg-blue-600 text-white py-7 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-3 shadow-2xl shadow-blue-200">CONTACT AGENT</button>
                    <button className="flex-1 bg-slate-900 text-white py-7 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-3">CALL</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SUCCESS MESSAGE POP-UP */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-white/95 backdrop-blur-3xl">
              <motion.div initial={{ scale: 0.5, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} className="text-center">
                <CheckCircle2 size={120} className="text-emerald-500 mx-auto mb-8" />
                <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">SUCCESS!</h2>
                <p className="text-slate-400 text-xl font-bold tracking-widest uppercase italic">Preparing your experience...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;