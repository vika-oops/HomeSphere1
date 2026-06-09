import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, MapPin, Star, Bed, Bath, Maximize, X, 
  MessageSquare, Phone, Building2, PenTool, Paintbrush, 
  Plus, Image as ImageIcon, ArrowLeft, ChevronRight, 
  CheckCircle2, ShieldCheck, User, Settings, Trash2, Edit,
  Lock, Mail, Heart, LayoutDashboard, LogOut, Filter, Sparkles,
  Users as UsersIcon, AlertCircle, TrendingUp
} from 'lucide-react';

// --- 1. DATA (Our Database) ---
const PROPERTIES = [
  { id: 1, title: "The Runda Estate Mansion", location: "Runda, Nairobi", price: "KSh 85,000,000", beds: 5, baths: 4, sqft: "5,000", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800", tag: "Luxury Mansion", description: "A stunning 5-bedroom mansion located in the heart of Runda. Features a private pool and world-class security." },
  { id: 2, title: "Kilimani Sky-View Apartment", location: "Kilimani, Nairobi", price: "KSh 18,500,000", beds: 3, baths: 2, sqft: "1,800", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800", tag: "Modern Apartment", description: "Modern 3-bedroom apartment with breathtaking views of the Nairobi skyline and rooftop lounge access." },
  { id: 3, title: "Nyali Beachfront Villa", location: "Nyali, Mombasa", price: "KSh 45,000,000", beds: 4, baths: 3, sqft: "3,200", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", tag: "Coastal Villa", description: "Experience coastal living at its best with direct beach access and a private gazebo." },
  { id: 4, title: "Lavington Garden Villa", location: "Lavington, Nairobi", price: "KSh 60,000,000", beds: 4, baths: 4, sqft: "4,000", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800", tag: "Family Villa", description: "Serene family home with a large garden and modern kitchen fittings." }
];

const ARCHITECTS = [
  { id: 1, name: "Arch. David Mutua", specialty: "Modern Residential", rating: 4.9, projects: 42, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Sarah Jenga", specialty: "Eco-Friendly Design", rating: 4.8, projects: 29, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" }
];

const DESIGNERS = [
  { id: 1, name: "Zuhura Interiors", specialty: "Minimalist Modern", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800", description: "Transforming spaces into serene escapes." },
  { id: 2, name: "Maina Designs", specialty: "Afro-Chic Luxury", image: "https://images.unsplash.com/photo-1616489953149-80860543666d?auto=format&fit=crop&q=80&w=800", description: "Bringing African heritage into modern luxury." }
];

const USERS = [
  { id: 101, name: "John Kamau", role: "Buyer", status: "Active", joinDate: "Jan 12, 2024" },
  { id: 102, name: "Mercy Wanjiku", role: "Seller", status: "Active", joinDate: "Feb 05, 2024" },
  { id: 103, name: "Peter Otieno", role: "Architect", status: "Pending Approval", joinDate: "Mar 22, 2024" },
];

function App() {
  const [view, setView] = useState('home'); 
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => 
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const triggerSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => { setShowSuccess(false); setView('home'); }, 2500);
  };

  // --- VIEW: ADMIN PANEL ---
  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 font-sans text-white text-left">
        <nav className="bg-slate-900 border-b border-slate-800 px-8 py-6 flex justify-between items-center sticky top-0 z-50">
          <button onClick={() => setView('home')} className="flex items-center gap-2 text-white font-black hover:text-blue-400 transition-all"><ArrowLeft /> EXIT PANEL</button>
          <div className="flex items-center gap-3 bg-blue-600/10 px-6 py-2.5 rounded-2xl text-blue-400 font-black border border-blue-600/20">
            <ShieldCheck size={20} /> SUPER ADMIN
          </div>
        </nav>
        
        <motion.main initial={{opacity:0}} animate={{opacity:1}} className="max-w-7xl mx-auto py-16 px-6">
          <div className="mb-12">
            <h1 className="text-5xl font-black mb-2 tracking-tighter italic">Overview</h1>
            <p className="text-slate-500 font-bold">Real-time status of the HomeSphere ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[ 
              {l: "Total Users", v: "1,240", i: UsersIcon, c: "text-blue-500"}, 
              {l: "Properties", v: "450", i: Home, c: "text-emerald-500"}, 
              {l: "Professionals", v: "88", i: PenTool, c: "text-purple-500"}, 
              {l: "Monthly Rev", v: "2.4M", i: TrendingUp, c: "text-orange-500"} 
            ].map(s => (
              <div key={s.l} className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl">
                <s.i className={`${s.c} mb-4`} size={28} />
                <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mb-1">{s.l}</p>
                <p className="text-4xl font-black tracking-tighter">{s.v}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Management Table */}
            <div className="bg-slate-900 rounded-[3.5rem] border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-10 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-2xl font-black">User Registry</h3>
                <button className="bg-slate-800 p-3 rounded-xl hover:bg-slate-700 transition-all"><Settings size={18}/></button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-950 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <tr>
                      <th className="p-8 text-left">User</th>
                      <th className="p-8 text-left">Role</th>
                      <th className="p-8 text-left">Status</th>
                      <th className="p-8 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {USERS.map(u => (
                      <tr key={u.id} className="hover:bg-white/5 transition-all">
                        <td className="p-8 font-bold">{u.name}</td>
                        <td className="p-8"><span className="text-blue-400 font-bold">{u.role}</span></td>
                        <td className="p-8">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                            <span className="text-xs font-bold text-slate-400">{u.status}</span>
                          </div>
                        </td>
                        <td className="p-8 text-right">
                          <button className="text-red-500 hover:bg-red-500/10 p-3 rounded-xl transition-all"><Trash2 size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Listing Approval Monitor */}
            <div className="bg-slate-900 rounded-[3.5rem] border border-slate-800 p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black">Listing Monitor</h3>
                <span className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 flex items-center gap-2">
                  <CheckCircle2 size={12} /> Live
                </span>
              </div>
              <div className="space-y-6">
                {PROPERTIES.slice(0,3).map(p => (
                  <div key={p.id} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-800">
                        <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-100">{p.title}</p>
                        <p className="text-xs text-slate-500 font-bold uppercase">{p.location}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-emerald-600 p-3 rounded-xl hover:bg-emerald-500 transition-all"><CheckCircle2 size={18}/></button>
                      <button className="bg-slate-800 p-3 rounded-xl hover:bg-red-600 transition-all"><X size={18}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    );
  }

  // --- VIEW: DESIGNER DASHBOARD ---
  if (view === 'designer') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <nav className="bg-white border-b border-slate-100 px-8 py-6 flex justify-between items-center sticky top-0 z-50">
          <button onClick={() => setView('home')} className="flex items-center gap-2 text-slate-900 font-black hover:text-blue-600 transition-all"><ArrowLeft /> HOME</button>
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl text-orange-600 font-black border border-orange-100"><Sparkles size={20} /> DESIGNER STUDIO</div>
        </nav>
        <motion.main initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-6xl mx-auto py-20 px-6 text-left text-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl h-fit border border-slate-100 text-center">
              <div className="w-32 h-32 bg-orange-100 rounded-[2.5rem] mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
                <img src={DESIGNERS[0].image} className="w-full h-full object-cover" alt="" />
              </div>
              <h2 className="text-3xl font-black mb-2">{DESIGNERS[0].name}</h2>
              <p className="text-orange-600 font-bold mb-8 italic text-lg">Interior Architect</p>
              <div className="space-y-3">
                <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all">Edit Profile</button>
                <button className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">Portfolio Settings</button>
              </div>
            </div>
            <div className="md:col-span-2 space-y-10">
              <div className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-4 tracking-tighter">Design Moodboards</h3>
                  <p className="text-slate-400 mb-8 max-w-md font-medium text-lg leading-relaxed">Create and share visual concepts with your clients instantly using our AI-assisted moodboard tools.</p>
                  <button className="bg-orange-500 text-white px-10 py-5 rounded-2xl font-black hover:bg-orange-400 transition-all shadow-xl shadow-orange-900/40">+ NEW MOODBOARD</button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]"></div>
              </div>
              <div className="grid grid-cols-2 gap-8 text-left">
                <div className="bg-white p-10 rounded-[3.5rem] shadow-lg border border-slate-100">
                  <h4 className="font-black text-slate-400 uppercase tracking-widest text-xs mb-2">Active Consultations</h4>
                  <p className="text-6xl font-black text-slate-900 leading-none">08</p>
                </div>
                <div className="bg-white p-10 rounded-[3.5rem] shadow-lg border border-slate-100">
                  <h4 className="font-black text-slate-400 uppercase tracking-widest text-xs mb-2">Projected Earnings</h4>
                  <p className="text-6xl font-black text-emerald-600 leading-none">120k</p>
                </div>
              </div>
            </div>
          </div>
        </motion.main>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 p-12 text-slate-900">
            <h2 className="text-4xl font-black mb-10 leading-tight tracking-tighter">List Property to <br/><span className="text-blue-600 italic">HomeSphere</span></h2>
            <div className="space-y-8 text-left">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Listing Title</label>
                <input type="text" placeholder="e.g. Modern Villa in Karen" className="w-full bg-slate-50 p-6 rounded-3xl outline-none focus:ring-2 focus:ring-blue-600 font-bold border border-slate-100" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Asking Price (KSh)</label>
                <input type="text" placeholder="e.g. 15,000,000" className="w-full bg-slate-50 p-6 rounded-3xl outline-none border border-slate-100 font-bold" />
              </div>
              <div className="h-56 border-2 border-dashed border-slate-200 rounded-[3.5rem] flex flex-col items-center justify-center bg-slate-50 group hover:border-blue-600 transition-all cursor-pointer">
                <ImageIcon className="text-slate-300 mb-2 group-hover:text-blue-600 group-hover:scale-110 transition-all" size={56} />
                <p className="font-black text-slate-400 uppercase text-xs tracking-widest">Upload Property Gallery</p>
              </div>
              <button onClick={triggerSuccess} className="w-full bg-blue-600 text-white py-8 rounded-[2.5rem] font-black text-2xl hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all">PUBLISH LISTING</button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // --- VIEW: LOGIN ---
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-white flex flex-col md:flex-row text-left">
        <div className="md:w-1/2 bg-slate-900 p-12 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="z-10">
            <div className="flex items-center gap-2 mb-16"><div className="bg-blue-600 p-2 rounded-xl"><Home size={24} /></div><span className="text-2xl font-black">HOMESPHERE</span></div>
            <h1 className="text-8xl font-black leading-none mb-6 tracking-tighter">Welcome<br/>Back.</h1>
            <p className="text-blue-400 text-xl font-bold italic tracking-tight">Your Kenyan dream awaits.</p>
          </div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
        </div>
        <motion.div initial={{opacity:0, x:30}} animate={{opacity:1, x:0}} className="md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-white text-slate-900">
          <h2 className="text-5xl font-black mb-12 tracking-tighter">Login</h2>
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
              <input type="email" className="w-full bg-slate-50 p-6 rounded-3xl outline-none border border-transparent focus:border-blue-600 font-bold transition-all shadow-sm" placeholder="e.g. james@email.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Secure Password</label>
              <input type="password" className="w-full bg-slate-50 p-6 rounded-3xl outline-none border border-transparent focus:border-blue-600 font-bold transition-all shadow-sm" placeholder="••••••••" />
            </div>
            <button onClick={triggerSuccess} className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black text-2xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all uppercase tracking-tighter">Sign In</button>
            <p className="text-center font-bold text-slate-500 mt-10">Don't have an account? <button onClick={() => setView('signup')} className="text-blue-600 underline underline-offset-4">Create one</button></p>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- VIEW: MAIN HOME (Buyer View) ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 overflow-x-hidden text-left text-slate-900">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg"><Home size={24} /></div>
            <span className="text-2xl font-black tracking-tighter uppercase">Home<span className="text-blue-600 font-black">Sphere</span></span>
          </div>
          <div className="hidden md:flex gap-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
            <button onClick={() => setView('home')} className="hover:text-blue-600 transition-all">Marketplace</button>
            <button onClick={() => setView('seller')} className="hover:text-blue-600 transition-all">Listings</button>
            <button onClick={() => setView('designer')} className="hover:text-blue-600 transition-all">Interiors</button>
            <button onClick={() => setView('admin')} className="hover:text-red-500 transition-all">Admin</button>
          </div>
          <button onClick={() => setView('login')} className="bg-slate-900 text-white px-10 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl">Join Us</button>
        </div>
      </nav>

      <main className="pt-40 px-6">
        {/* HERO + SEARCH */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto text-center mb-40">
          <h1 className="text-6xl md:text-9xl font-black text-slate-900 mb-8 tracking-tighter leading-none">Your <span className="text-blue-600 italic font-serif leading-none">Dream</span> <br/> starts here.</h1>
          <div className="max-w-4xl mx-auto bg-white p-5 rounded-[3.5rem] shadow-2xl shadow-blue-100 border border-slate-100 flex flex-wrap md:flex-nowrap gap-4">
             <div className="flex-1 flex items-center gap-4 px-8 py-3 border-r border-slate-50">
                <MapPin className="text-blue-600" size={24} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where in Kenya? (e.g. Karen, Runda)" 
                  className="w-full outline-none font-bold text-xl placeholder-slate-300" 
                />
             </div>
             <button className="bg-blue-600 text-white px-16 py-6 rounded-[2.5rem] font-black flex items-center gap-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 text-xl tracking-tighter">
                <Search size={24} /> FIND
             </button>
          </div>
        </motion.div>

        {/* PROPERTY LISTINGS (Filtered by Search) */}
        <section className="max-w-7xl mx-auto mb-40 text-left">
          <div className="flex justify-between items-end mb-20">
            <div>
              <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4">Featured <br/>Marketplace</h2>
              <div className="h-2 w-24 bg-blue-600 rounded-full"></div>
            </div>
            <p className="font-black text-slate-300 uppercase tracking-widest text-xs">{filteredProperties.length} PROPERTIES AVAILABLE</p>
          </div>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {filteredProperties.map((item) => (
                <motion.div key={item.id} layout whileHover={{ y: -20 }} onClick={() => setSelectedProperty(item)} className="group bg-white rounded-[4.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer">
                  <div className="relative h-[26rem] overflow-hidden">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                    <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full font-black text-[10px] text-slate-900 uppercase tracking-[0.2em]">{item.tag}</div>
                    <div className="absolute bottom-10 right-10 bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] font-black shadow-2xl text-xl tracking-tighter border border-white/10">{item.price}</div>
                  </div>
                  <div className="p-12">
                    <h3 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter leading-none">{item.title}</h3>
                    <p className="text-slate-400 font-bold flex items-center gap-2 mb-10 italic"><MapPin size={18} className="text-blue-600" /> {item.location}</p>
                    <div className="flex justify-between border-t border-slate-50 pt-10 font-black text-slate-900 uppercase text-[10px] tracking-widest">
                      <div className="flex flex-col items-center gap-2"><Bed size={24} className="text-blue-600"/><span className="opacity-40">{item.beds} BEDS</span></div>
                      <div className="flex flex-col items-center gap-2"><Bath size={24} className="text-blue-600"/><span className="opacity-40">{item.baths} BATHS</span></div>
                      <div className="flex flex-col items-center gap-2"><Maximize size={24} className="text-blue-600"/><span className="opacity-40">{item.sqft} SQFT</span></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[5rem] border border-slate-100 shadow-sm">
              <AlertCircle size={64} className="mx-auto text-slate-200 mb-6" />
              <h3 className="text-3xl font-black text-slate-400 italic">No matches found in {searchQuery}</h3>
              <button onClick={() => setSearchQuery("")} className="text-blue-600 font-black mt-8 text-xl underline underline-offset-8">RESET SEARCH</button>
            </div>
          )}
        </section>

        {/* ROLE SELECTION */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-40 text-left">
          {[
            { name: "Buyer", icon: Search, color: "bg-blue-50 text-blue-600", desc: "Find Land & Houses", action: () => setView('home') },
            { name: "Seller", icon: Building2, color: "bg-emerald-50 text-emerald-600", desc: "List Property", action: () => setView('seller') },
            { name: "Architect", icon: PenTool, color: "bg-purple-50 text-purple-600", desc: "Hire Experts", action: () => {} },
            { name: "Designer", icon: Paintbrush, color: "bg-orange-50 text-orange-600", desc: "Style Your Space", action: () => setView('designer') }
          ].map((role, idx) => (
            <motion.div key={role.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ scale: 1.05, y: -10 }} onClick={role.action} className="group p-12 bg-white rounded-[4.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer">
              <div className={`w-20 h-20 ${role.color} rounded-[2rem] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}><role.icon size={36} /></div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 leading-none">{role.name}</h3>
              <p className="text-slate-400 font-bold text-sm leading-relaxed">{role.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* INTERIOR DESIGNERS SECTION */}
        <section className="max-w-7xl mx-auto mb-40 text-left">
          <h2 className="text-6xl font-black text-slate-900 mb-20 tracking-tighter leading-none">Design <br/> <span className="text-blue-600 italic font-serif">Visionaries</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {DESIGNERS.map((designer) => (
              <motion.div whileHover={{ scale: 1.02 }} key={designer.id} className="relative h-[40rem] rounded-[5rem] overflow-hidden group shadow-2xl border-[12px] border-white">
                <img src={designer.image} className="w-full h-full object-cover group-hover:scale-110 transition-duration-1000" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent flex flex-col justify-end p-16 text-white text-left">
                  <h3 className="text-6xl font-black mb-4 leading-none tracking-tighter">{designer.name}</h3>
                  <p className="text-blue-400 font-black text-2xl mb-10 italic uppercase tracking-widest">{designer.specialty}</p>
                  <button className="bg-white text-slate-900 px-12 py-6 rounded-[2.5rem] font-black w-fit hover:bg-blue-600 hover:text-white transition-all shadow-2xl text-xl tracking-tighter">VIEW PORTFOLIO</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ARCHITECTS SECTION */}
        <section className="max-w-7xl mx-auto mb-40 text-left">
          <div className="bg-slate-900 rounded-[6rem] p-20 md:p-32 relative overflow-hidden text-left shadow-2xl shadow-blue-900/20 border-b-[20px] border-blue-600">
            <div className="relative z-10 grid md:grid-cols-2 gap-24 items-center text-left">
              <div className="text-left">
                <h2 className="text-7xl md:text-8xl font-black text-white mb-10 leading-[0.8] tracking-tighter text-left">Elite <br/><span className="text-blue-600">Drafts.</span></h2>
                <p className="text-slate-400 text-2xl mb-16 font-bold italic leading-relaxed max-w-md">The most sought-after Kenyan architects available for your next build.</p>
                <button className="bg-white text-slate-900 px-16 py-7 rounded-[2.5rem] font-black text-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl shadow-blue-900/50">EXPLORE ARCHITECTS</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {ARCHITECTS.map(pro => (
                  <div key={pro.id} className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[4rem] hover:bg-white/10 transition-all text-left">
                    <img src={pro.image} className="w-28 h-28 rounded-[2rem] object-cover mb-10 border-4 border-blue-600/30" alt="" />
                    <h4 className="text-white font-black text-3xl mb-2 tracking-tight">{pro.name}</h4>
                    <p className="text-blue-400 font-black mb-10 uppercase text-xs tracking-[0.2em]">{pro.specialty}</p>
                    <div className="flex items-center gap-2 text-yellow-500 font-black text-xl"><Star size={24} fill="currentColor"/> {pro.rating}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-32 -left-32 w-[35rem] h-[35rem] bg-blue-600/10 rounded-full blur-[140px]"></div>
          </div>
        </section>

        {/* MODAL DETAIL POP-UP */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl" onClick={() => setSelectedProperty(null)}></div>
              <motion.div initial={{ scale: 0.8, y: 100 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }} className="relative bg-white w-full max-w-7xl rounded-[6rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border-[20px] border-white">
                <button onClick={() => setSelectedProperty(null)} className="absolute top-10 right-10 z-10 bg-slate-900 text-white p-5 rounded-full hover:bg-blue-600 transition-all shadow-xl"><X size={32} /></button>
                <div className="md:w-1/2 h-[40rem] md:h-auto overflow-hidden shadow-2xl shadow-inner"><img src={selectedProperty.image} className="w-full h-full object-cover" alt="" /></div>
                <div className="md:w-1/2 p-20 flex flex-col justify-center text-left bg-white text-slate-900">
                  <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-6 border-l-4 border-blue-600 pl-4">{selectedProperty.tag}</span>
                  <h2 className="text-7xl font-black text-slate-900 mb-10 tracking-tighter leading-[0.9]">{selectedProperty.title}</h2>
                  <p className="text-slate-400 text-2xl mb-16 font-bold leading-relaxed italic">{selectedProperty.description}</p>
                  <div className="flex gap-8">
                    <button className="flex-1 bg-blue-600 text-white py-8 rounded-[3rem] font-black text-3xl flex items-center justify-center gap-4 shadow-2xl shadow-blue-200 uppercase tracking-tighter">HIRE AGENT</button>
                    <button className="flex-1 bg-slate-900 text-white py-8 rounded-[3rem] font-black text-3xl flex items-center justify-center gap-4 hover:bg-blue-600 transition-all uppercase tracking-tighter">MESSAGE</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GLOBAL SUCCESS OVERLAY */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-white/95 backdrop-blur-3xl">
              <motion.div initial={{ scale: 0.5, rotate: -15 }} animate={{ scale: 1, rotate: 0 }} className="text-center">
                <div className="w-48 h-48 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-emerald-200">
                  <CheckCircle2 size={96} className="text-emerald-500" />
                </div>
                <h2 className="text-8xl font-black text-slate-950 tracking-tighter mb-6 uppercase leading-none">Complete.</h2>
                <p className="text-slate-400 text-2xl font-black tracking-widest uppercase italic">The ecosystem is syncing...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;