
import React, { useState, useEffect } from 'react';
import { 
  Settings, Save, Trash2, Plus, 
  ChevronRight, ArrowLeft, LogOut,
  LayoutGrid, MapPin, Image as ImageIcon,
  CheckCircle2, AlertCircle, Download, RefreshCcw,
  Type, LayoutDashboard
} from 'lucide-react';
import { useData } from '../providers/data-provider';
import { MenuCategory, Branch, AppConfig, SiteContent } from '../types';
import { auth, googleProvider } from '../src/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const Admin: React.FC = () => {
  const { menu: initialMenu, branches: initialBranches, gallery: initialGallery, config: initialConfig, siteContent: initialSiteContent, saveData, refreshData } = useData();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'branches' | 'gallery' | 'content' | 'settings'>('dashboard');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Editable States
  const [menu, setMenu] = useState<MenuCategory[]>(initialMenu);
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [gallery, setGallery] = useState<string[]>(initialGallery);
  const [config, setConfig] = useState<AppConfig>(initialConfig);
  const [siteContent, setSiteContent] = useState<SiteContent>(initialSiteContent);

  useEffect(() => {
    // Sync with context when it changes (e.g. after initial load)
    setMenu(initialMenu);
    setBranches(initialBranches);
    setGallery(initialGallery);
    setConfig(initialConfig);
    setSiteContent(initialSiteContent);
  }, [initialMenu, initialBranches, initialGallery, initialConfig, initialSiteContent]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      setStatus({ type: 'success', message: 'Welcome back, Wafflewala Admin!' });
    } catch (error: any) {
      console.error('Login error:', error);
      setStatus({ type: 'error', message: 'Failed to login with Google.' });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const saveAll = async () => {
    try {
      await saveData({ menu, branches, gallery, config, siteContent });
      setStatus({ type: 'success', message: 'All changes saved permanently to the server!' });
    } catch (error: any) {
      console.error('Save error:', error);
      setStatus({ type: 'error', message: 'Failed to save changes. Make sure you are an admin.' });
    }
    setTimeout(() => setStatus(null), 3000);
  };

  const exportConfig = () => {
    const exportData = { menu, branches, gallery, config, siteContent };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wafflewala-config.json';
    a.click();
    setStatus({ type: 'success', message: 'Configuration exported. You can use this for backup!' });
  };

  const resetData = async () => {
    if (window.confirm('This will reset everything to initial defaults. Are you sure?')) {
      window.location.reload();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 text-center border-4 border-white animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-[#FFB7C5] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Settings className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl font-playful font-bold mb-2">Admin Panel</h1>
          <p className="text-gray-500 mb-8 font-medium">Sign in with Google to manage Wafflewala</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <button className="w-full bg-black text-white py-5 rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95">
              Sign in with Google <ChevronRight className="w-5 h-5" />
            </button>
          </form>

          {status && (
            <div className={`mt-6 p-4 rounded-xl flex items-center gap-2 justify-center font-bold ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {status.message}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 min-h-20 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Settings className="w-8 h-8 text-[#FFB7C5]" />
            <h1 className="text-2xl font-playful font-bold">Wafflewala Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end flex-wrap">
            <button onClick={exportConfig} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all" title="Export Config">
              <Download className="w-6 h-6" />
            </button>
            <button onClick={resetData} className="p-3 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100 transition-all" title="Reset to Default">
              <RefreshCcw className="w-6 h-6" />
            </button>
            <button onClick={saveAll} className="bg-[#FFB7C5] text-black px-4 md:px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#ff96ac] transition-all shadow-md text-sm md:text-base">
              <Save className="w-5 h-5" /> Save Changes
            </button>
            <button onClick={handleLogout} className="p-3 text-gray-400 hover:text-red-500 transition-all">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Panel */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 flex-grow grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <aside className="lg:col-span-1">
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 no-scrollbar">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex-shrink-0 lg:w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-pink-50'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('menu')}
              className={`flex-shrink-0 lg:w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === 'menu' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-pink-50'}`}
            >
              <LayoutGrid className="w-6 h-6" /> Menu Items
            </button>
            <button 
              onClick={() => setActiveTab('branches')}
              className={`flex-shrink-0 lg:w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === 'branches' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-pink-50'}`}
            >
              <MapPin className="w-6 h-6" /> Branches
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`flex-shrink-0 lg:w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === 'gallery' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-pink-50'}`}
            >
              <ImageIcon className="w-6 h-6" /> Gallery
            </button>
            <button 
              onClick={() => setActiveTab('content')}
              className={`flex-shrink-0 lg:w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === 'content' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-pink-50'}`}
            >
              <Type className="w-6 h-6" /> Site Content
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex-shrink-0 lg:w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === 'settings' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-pink-50'}`}
            >
              <Settings className="w-6 h-6" /> Settings
            </button>
          </div>
          
          <div className="mt-4 lg:mt-10 p-6 bg-green-50 rounded-3xl border border-green-100">
            <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4" /> Live Updates</h4>
            <p className="text-xs text-green-700 leading-relaxed">
              Changes made here are saved directly to the server. All visitors will see the updates immediately after you click "Save Changes".
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-3">
          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in duration-500 space-y-8">
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-pink-50">
                <h2 className="text-3xl font-playful font-bold mb-2">Welcome back, Admin!</h2>
                <p className="text-gray-500">Here's what's happening at Wafflewala today.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[30px] shadow-sm border border-pink-50 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center mb-4">
                    <LayoutGrid className="w-6 h-6 text-pink-500" />
                  </div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Categories</p>
                  <p className="text-4xl font-playful font-bold mt-1">{menu.length}</p>
                </div>
                <div className="bg-white p-6 rounded-[30px] shadow-sm border border-pink-50 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Items</p>
                  <p className="text-4xl font-playful font-bold mt-1">
                    {menu.reduce((acc, cat) => acc + cat.items.length, 0)}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-[30px] shadow-sm border border-pink-50 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Branches</p>
                  <p className="text-4xl font-playful font-bold mt-1">{branches.length}</p>
                </div>
                <div className="bg-white p-6 rounded-[30px] shadow-sm border border-pink-50 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
                    <ImageIcon className="w-6 h-6 text-purple-500" />
                  </div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Gallery Images</p>
                  <p className="text-4xl font-playful font-bold mt-1">{gallery.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-pink-50">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-400" /> Quick Actions
                  </h3>
                  <div className="space-y-4">
                    <button 
                      onClick={() => setActiveTab('menu')}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-pink-50 transition-colors group"
                    >
                      <span className="font-bold text-gray-700">Manage Menu Items</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                    </button>
                    <button 
                      onClick={() => setActiveTab('content')}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-pink-50 transition-colors group"
                    >
                      <span className="font-bold text-gray-700">Update Site Content</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                    </button>
                    <button 
                      onClick={() => setActiveTab('branches')}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-pink-50 transition-colors group"
                    >
                      <span className="font-bold text-gray-700">Edit Branches</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                    </button>
                  </div>
                </div>

                <div className="bg-black text-white p-8 rounded-[40px] shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">System Status</h3>
                    <div className="flex items-center gap-2 text-green-400 mb-6">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm font-bold uppercase tracking-wider">Operational</span>
                    </div>
                    
                    <div className="space-y-4 text-sm text-gray-400">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span>Last Updated</span>
                        <span className="text-white">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span>Data Source</span>
                        <span className="text-white">Local JSON</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span>Environment</span>
                        <span className="text-white">Production</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative */}
                  <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Settings className="w-32 h-32" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
              {menu.map((category, catIdx) => (
                <div key={catIdx} className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b gap-4">
                    <div className="space-y-2 flex-grow w-full md:mr-4">
                      <input 
                        className="text-2xl md:text-3xl font-playful font-bold bg-transparent border-b border-transparent focus:border-pink-300 outline-none w-full"
                        value={category.title}
                        onChange={(e) => {
                          const newMenu = [...menu];
                          newMenu[catIdx].title = e.target.value;
                          setMenu(newMenu);
                        }}
                      />
                      <input 
                        className="text-gray-500 font-medium bg-transparent border-b border-transparent focus:border-pink-300 outline-none w-full"
                        value={category.tagline}
                        onChange={(e) => {
                          const newMenu = [...menu];
                          newMenu[catIdx].tagline = e.target.value;
                          setMenu(newMenu);
                        }}
                      />
                    </div>
                    <button 
                      onClick={() => {
                        const newMenu = menu.filter((_, i) => i !== catIdx);
                        setMenu(newMenu);
                      }}
                      className="text-red-400 hover:text-red-600 p-2 self-end md:self-center"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {category.items.map((item, itemIdx) => (
                      <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-3xl items-center">
                        <div className="md:col-span-2">
                          <input 
                            className="w-full font-bold p-2 rounded-lg border-2 border-transparent focus:border-[#FFB7C5] bg-white"
                            value={item.name}
                            onChange={(e) => {
                              const newMenu = [...menu];
                              newMenu[catIdx].items[itemIdx].name = e.target.value;
                              setMenu(newMenu);
                            }}
                          />
                        </div>
                        
                        {/* Prices Group - Grid for better mobile layout */}
                        <div className="md:col-span-3 grid grid-cols-3 gap-2">
                          <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 ml-1 truncate">Stick</p>
                            <input 
                              type="number"
                              className="w-full p-2 rounded-lg border-2 border-transparent focus:border-[#FFB7C5] bg-white font-bold text-center"
                              value={item.prices.sticks}
                              onChange={(e) => {
                                const newMenu = [...menu];
                                newMenu[catIdx].items[itemIdx].prices.sticks = Number(e.target.value);
                                setMenu(newMenu);
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 ml-1 truncate">8 Pcs</p>
                            <input 
                              type="number"
                              className="w-full p-2 rounded-lg border-2 border-transparent focus:border-[#FFB7C5] bg-white font-bold text-center"
                              value={item.prices.pancakes8}
                              onChange={(e) => {
                                const newMenu = [...menu];
                                newMenu[catIdx].items[itemIdx].prices.pancakes8 = Number(e.target.value);
                                setMenu(newMenu);
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 ml-1 truncate">10 Pcs</p>
                            <input 
                              type="number"
                              className="w-full p-2 rounded-lg border-2 border-transparent focus:border-[#FFB7C5] bg-white font-bold text-center"
                              value={item.prices.pancakes10}
                              onChange={(e) => {
                                const newMenu = [...menu];
                                newMenu[catIdx].items[itemIdx].prices.pancakes10 = Number(e.target.value);
                                setMenu(newMenu);
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end md:col-span-1">
                          <button 
                            onClick={() => {
                              const newMenu = [...menu];
                              newMenu[catIdx].items = newMenu[catIdx].items.filter((_, i) => i !== itemIdx);
                              setMenu(newMenu);
                            }}
                            className="text-red-400 hover:text-red-600 p-2"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="md:col-span-6 mt-2">
                          <p className="text-[10px] font-black uppercase text-gray-400 ml-1">Image URL (Optional)</p>
                          <input 
                            className="w-full p-2 rounded-lg border-2 border-transparent focus:border-[#FFB7C5] bg-white text-xs"
                            value={item.image || ''}
                            placeholder="https://..."
                            onChange={(e) => {
                              const newMenu = [...menu];
                              newMenu[catIdx].items[itemIdx].image = e.target.value;
                              setMenu(newMenu);
                            }}
                          />
                        </div>
                        
                        <div className="md:col-span-6 flex flex-wrap gap-2 md:gap-4 text-xs mt-2 md:mt-0">
                          <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1 rounded-full border">
                            <input 
                              type="checkbox" 
                              checked={item.featured} 
                              onChange={(e) => {
                                const newMenu = [...menu];
                                newMenu[catIdx].items[itemIdx].featured = e.target.checked;
                                setMenu(newMenu);
                              }}
                            /> Featured
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1 rounded-full border">
                            <input 
                              type="checkbox" 
                              checked={item.seasonal} 
                              onChange={(e) => {
                                const newMenu = [...menu];
                                newMenu[catIdx].items[itemIdx].seasonal = e.target.checked;
                                setMenu(newMenu);
                              }}
                            /> Seasonal
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1 rounded-full border">
                            <input 
                              type="checkbox" 
                              checked={item.isSingleUnit} 
                              onChange={(e) => {
                                const newMenu = [...menu];
                                newMenu[catIdx].items[itemIdx].isSingleUnit = e.target.checked;
                                setMenu(newMenu);
                              }}
                            /> Single Unit
                          </label>
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const newMenu = [...menu];
                        newMenu[catIdx].items.push({
                          id: Date.now().toString(),
                          name: 'New Item',
                          prices: { sticks: 0, pancakes8: 0, pancakes10: 0 }
                        });
                        setMenu(newMenu);
                      }}
                      className="w-full py-4 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-bold hover:border-[#FFB7C5] hover:text-[#FFB7C5] transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" /> Add New Item
                    </button>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => {
                  setMenu([...menu, {
                    title: 'New Category',
                    tagline: 'Tagline goes here',
                    items: []
                  }]);
                }}
                className="w-full py-10 bg-black text-white rounded-[40px] font-bold text-2xl shadow-xl hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-4"
              >
                <Plus className="w-10 h-10" /> Create New Category
              </button>
            </div>
          )}

          {activeTab === 'branches' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-8 duration-500">
              {branches.map((branch, bIdx) => (
                <div key={bIdx} className="bg-white rounded-[40px] shadow-sm p-8 border border-gray-100 space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold font-playful">Branch Details</h3>
                    <button 
                      onClick={() => {
                        const newBranches = branches.filter((_, i) => i !== bIdx);
                        setBranches(newBranches);
                      }}
                      className="text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs font-black uppercase text-gray-400 ml-1">Branch Name</p>
                      <input 
                        className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-bold outline-none"
                        value={branch.name}
                        onChange={(e) => {
                          const newBranches = [...branches];
                          newBranches[bIdx].name = e.target.value;
                          setBranches(newBranches);
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-black uppercase text-gray-400 ml-1">Address</p>
                      <input 
                        className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-medium outline-none"
                        value={branch.address}
                        onChange={(e) => {
                          const newBranches = [...branches];
                          newBranches[bIdx].address = e.target.value;
                          setBranches(newBranches);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-black uppercase text-gray-400 ml-1">Phone (API Format)</p>
                        <input 
                          className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-medium outline-none"
                          value={branch.phone}
                          onChange={(e) => {
                            const newBranches = [...branches];
                            newBranches[bIdx].phone = e.target.value;
                            setBranches(newBranches);
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-black uppercase text-gray-400 ml-1">Display Phone</p>
                        <input 
                          className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-medium outline-none"
                          value={branch.displayPhone}
                          onChange={(e) => {
                            const newBranches = [...branches];
                            newBranches[bIdx].displayPhone = e.target.value;
                            setBranches(newBranches);
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-black uppercase text-gray-400 ml-1">Google Maps URL</p>
                      <input 
                        className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-medium outline-none"
                        value={branch.mapsUrl}
                        onChange={(e) => {
                          const newBranches = [...branches];
                          newBranches[bIdx].mapsUrl = e.target.value;
                          setBranches(newBranches);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => {
                  setBranches([...branches, {
                    name: 'New Branch',
                    address: 'Enter address',
                    phone: '91',
                    displayPhone: '+91 ',
                    mapsUrl: '',
                    whatsappMsg: ''
                  }]);
                }}
                className="h-[300px] border-4 border-dashed border-gray-200 rounded-[40px] text-gray-400 font-bold hover:border-[#FFB7C5] hover:text-[#FFB7C5] transition-all flex flex-col items-center justify-center gap-4"
              >
                <Plus className="w-12 h-12" /> Add Branch
              </button>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
              <div className="bg-white rounded-[40px] shadow-sm p-10 border border-gray-100">
                <h3 className="text-2xl font-bold font-playful mb-8">Manage Image URLs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gallery.map((url, gIdx) => (
                    <div key={gIdx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border items-center">
                      <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 shadow-sm">
                        <img src={url} className="w-full h-full object-cover" alt="Gallery Preview" />
                      </div>
                      <input 
                        className="flex-grow p-2 bg-transparent border-b outline-none text-xs font-medium"
                        value={url}
                        onChange={(e) => {
                          const newGallery = [...gallery];
                          newGallery[gIdx] = e.target.value;
                          setGallery(newGallery);
                        }}
                      />
                      <button 
                        onClick={() => setGallery(gallery.filter((_, i) => i !== gIdx))}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setGallery([...gallery, ''])}
                  className="w-full mt-8 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-[#FFB7C5] hover:text-[#FFB7C5] transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Add New Image URL
                </button>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="animate-in slide-in-from-right-8 duration-500 space-y-8">
              {/* Hero Section Editing */}
              <div className="bg-white rounded-[40px] shadow-sm p-8 border border-gray-100">
                <h3 className="text-2xl font-bold font-playful mb-6">Hero Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">Title Line 1</label>
                    <input 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-bold outline-none"
                      value={siteContent.hero.titleLine1}
                      onChange={(e) => setSiteContent({...siteContent, hero: {...siteContent.hero, titleLine1: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">Title Highlight</label>
                    <input 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-bold outline-none"
                      value={siteContent.hero.titleHighlight}
                      onChange={(e) => setSiteContent({...siteContent, hero: {...siteContent.hero, titleHighlight: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">Subtitle</label>
                    <input 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-bold outline-none"
                      value={siteContent.hero.subtitle}
                      onChange={(e) => setSiteContent({...siteContent, hero: {...siteContent.hero, subtitle: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">Description</label>
                    <textarea 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-medium outline-none h-24"
                      value={siteContent.hero.description}
                      onChange={(e) => setSiteContent({...siteContent, hero: {...siteContent.hero, description: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">Video URL</label>
                    <input 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-medium outline-none text-sm"
                      value={siteContent.hero.videoUrl}
                      onChange={(e) => setSiteContent({...siteContent, hero: {...siteContent.hero, videoUrl: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">Hero Image URL</label>
                    <input 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-medium outline-none text-sm"
                      value={siteContent.hero.heroImage}
                      onChange={(e) => setSiteContent({...siteContent, hero: {...siteContent.hero, heroImage: e.target.value}})}
                    />
                  </div>
                </div>
              </div>

              {/* Experience Section Editing */}
              <div className="bg-white rounded-[40px] shadow-sm p-8 border border-gray-100">
                <h3 className="text-2xl font-bold font-playful mb-6">Experience Section</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">Title</label>
                    <input 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-bold outline-none"
                      value={siteContent.experience.title}
                      onChange={(e) => setSiteContent({...siteContent, experience: {...siteContent.experience, title: e.target.value}})}
                    />
                  </div>
                  {siteContent.experience.features.map((feature, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-2xl border space-y-2">
                      <p className="font-bold text-sm text-gray-400">Feature {idx + 1}</p>
                      <input 
                        className="w-full p-2 bg-white border rounded-xl font-bold outline-none"
                        value={feature.title}
                        onChange={(e) => {
                          const newFeatures = [...siteContent.experience.features];
                          newFeatures[idx].title = e.target.value;
                          setSiteContent({...siteContent, experience: {...siteContent.experience, features: newFeatures}});
                        }}
                      />
                      <textarea 
                        className="w-full p-2 bg-white border rounded-xl font-medium outline-none h-20"
                        value={feature.description}
                        onChange={(e) => {
                          const newFeatures = [...siteContent.experience.features];
                          newFeatures[idx].description = e.target.value;
                          setSiteContent({...siteContent, experience: {...siteContent.experience, features: newFeatures}});
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bestseller Section Editing */}
              <div className="bg-white rounded-[40px] shadow-sm p-8 border border-gray-100">
                <h3 className="text-2xl font-bold font-playful mb-6">Bestseller Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">Title</label>
                    <input 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-bold outline-none"
                      value={siteContent.bestseller.title}
                      onChange={(e) => setSiteContent({...siteContent, bestseller: {...siteContent.bestseller, title: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">Subtitle</label>
                    <input 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-bold outline-none"
                      value={siteContent.bestseller.subtitle}
                      onChange={(e) => setSiteContent({...siteContent, bestseller: {...siteContent.bestseller, subtitle: e.target.value}})}
                    />
                  </div>
                </div>
              </div>

              {/* Location Section Editing */}
              <div className="bg-white rounded-[40px] shadow-sm p-8 border border-gray-100">
                <h3 className="text-2xl font-bold font-playful mb-6">Location Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">Title</label>
                    <input 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-bold outline-none"
                      value={siteContent.location.title}
                      onChange={(e) => setSiteContent({...siteContent, location: {...siteContent.location, title: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">Subtitle</label>
                    <input 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-bold outline-none"
                      value={siteContent.location.subtitle}
                      onChange={(e) => setSiteContent({...siteContent, location: {...siteContent.location, subtitle: e.target.value}})}
                    />
                  </div>
                </div>
              </div>

              {/* Footer & Social Editing */}
              <div className="bg-white rounded-[40px] shadow-sm p-8 border border-gray-100">
                <h3 className="text-2xl font-bold font-playful mb-6">Footer & Social</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">About Text (Footer)</label>
                    <textarea 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-medium outline-none h-24"
                      value={siteContent.footer.aboutText}
                      onChange={(e) => setSiteContent({...siteContent, footer: {...siteContent.footer, aboutText: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 ml-1">Instagram URL</label>
                    <input 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-medium outline-none text-sm"
                      value={siteContent.social.instagramUrl}
                      onChange={(e) => setSiteContent({...siteContent, social: {...siteContent.social, instagramUrl: e.target.value}})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
              <div className="bg-white rounded-[40px] shadow-sm p-10 border border-gray-100">
                <h3 className="text-2xl font-bold font-playful mb-8">Global Settings</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase text-gray-400 ml-1">WhatsApp Order Number</label>
                    <p className="text-xs text-gray-500 ml-1">This is the number where all WhatsApp orders will be sent.</p>
                    <input 
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB7C5] rounded-2xl font-bold outline-none"
                      value={config.orderPhoneNumber}
                      placeholder="e.g. 919876543210"
                      onChange={(e) => setConfig({ ...config, orderPhoneNumber: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer link to go back */}
      <footer className="p-10 text-center">
        <button onClick={() => window.history.back()} className="text-gray-400 font-bold hover:text-black transition-all flex items-center gap-2 mx-auto">
          <ArrowLeft className="w-4 h-4" /> Back to Website
        </button>
      </footer>
    </div>
  );
};

export default Admin;
