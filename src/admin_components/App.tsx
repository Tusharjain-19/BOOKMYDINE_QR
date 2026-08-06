import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Check, X, Copy } from 'lucide-react';
import { auth } from './lib/firebase';
import { Login } from './components/auth/Login';
import { HeaderNav } from './components/layout/HeaderNav';
import { DashboardView } from './components/dashboard/DashboardView';
import { CreateMenuModal } from './components/dashboard/CreateMenuModal';
import { SmartInputModal } from './components/input/SmartInputModal';
import { CanvaInspector } from './components/editor/CanvaInspector';
import { MenuCanvasPreview } from './components/preview/MenuCanvasPreview';
import { QrExportModal } from './components/qr/QrExportModal';
import { StitchDesignMdModal } from './components/editor/StitchDesignMdModal';
import { SubscriptionManager } from './components/dashboard/SubscriptionManager';
import { INITIAL_MENU_DATA, PRESET_THEMES } from './lib/defaultTemplates';
import { 
  getStoredMenus, 
  saveStoredMenu, 
  deleteStoredMenu, 
  duplicateStoredMenu, 
  rotateMenuToken, 
  clearAllStoredMenus,
  type SavedMenuRecord 
} from './lib/menuStorage';
import { downloadStandaloneHtmlFile } from './lib/htmlGenerator';
import { generateSignedToken } from './lib/tokenGenerator';
import type { MenuCategory, MenuData, MenuItem, RestaurantDetails, ThemeConfig, ThemePresetId } from './types/menu';

export function App() {
  const [storedMenus, setStoredMenus] = useState<SavedMenuRecord[]>([]);
  const [activeMenuRecord, setActiveMenuRecord] = useState<SavedMenuRecord | null>(null);
  const [menuData, setMenuData] = useState<MenuData>(INITIAL_MENU_DATA);
  
  const [currentView, setCurrentView] = useState<'dashboard' | 'editor'>('dashboard');
  const [activeTab, setActiveTab] = useState<'extractor' | 'editor' | 'qr'>('editor');
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isSmartInputOpen, setIsSmartInputOpen] = useState<boolean>(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [isStitchMdOpen, setIsStitchMdOpen] = useState<boolean>(false);
  const [isSubscriptionManagerOpen, setIsSubscriptionManagerOpen] = useState<boolean>(false);
  const [subscriptionMenuRecord, setSubscriptionMenuRecord] = useState<SavedMenuRecord | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<{title: string, message: string, type: 'success'|'error', url?: string} | null>(null);

  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'admin@bookmydine.com') {
        setIsAuthenticated(true);
      } else {
        if (user) {
          auth.signOut();
        }
        setIsAuthenticated(false);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load stored menus on mount
  useEffect(() => {
    getStoredMenus().then(list => {
      setStoredMenus(list);
      if (list.length > 0) {
        setActiveMenuRecord(list[0]);
        setMenuData(list[0].menuData);
      }
    });
  }, []);

  // Save current menu changes to localStorage automatically
  const updateAndSaveMenu = async (newMenuData: MenuData) => {
    setMenuData(newMenuData);
    const updatedRecord = await saveStoredMenu(newMenuData, activeMenuRecord?.status || 'draft', activeMenuRecord?.subscription, activeMenuRecord?.isActive, activeMenuRecord?.token);
    setActiveMenuRecord(updatedRecord);
    const menus = await getStoredMenus();
    setStoredMenus(menus);
  };

  // Switch Active Menu
  const handleSelectEditMenu = (record: SavedMenuRecord) => {
    setActiveMenuRecord(record);
    setMenuData(record.menuData);
    setCurrentView('editor');
    setActiveTab('editor');
  };

  const handleSelectPreviewMenu = (record: SavedMenuRecord) => {
    setActiveMenuRecord(record);
    setMenuData(record.menuData);
    setCurrentView('editor');
  };

  const handleOpenQrSuiteForMenu = (record: SavedMenuRecord) => {
    setActiveMenuRecord(record);
    setMenuData(record.menuData);
    setIsQrModalOpen(true);
  };

  // Create Menu via 4 Methods
  const handleCreateWithMethod = async (
    method: 'upload' | 'manual' | 'template' | 'blank',
    data?: { name: string; themeId?: ThemePresetId }
  ) => {
    const name = data?.name || 'New Restaurant';
    const themeId = data?.themeId || 'minimal';
    const selectedTheme = PRESET_THEMES[themeId] || PRESET_THEMES['minimal'];

    const newSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newMenuData: MenuData = {
      slug: newSlug,
      restaurant: {
        name,
        tagline: '',
        address: '',
        phone: '',
        currency: '₹',
        notice: '',
      },
      theme: selectedTheme,
      categories: [],
      lastUpdated: new Date().toISOString(),
    };

    const savedRecord = await saveStoredMenu(newMenuData, 'draft');
    setActiveMenuRecord(savedRecord);
    setMenuData(newMenuData);
    const menus = await getStoredMenus();
    setStoredMenus(menus);
    setIsCreateModalOpen(false);

    if (method === 'upload') {
      setIsSmartInputOpen(true);
    } else {
      setCurrentView('editor');
      setActiveTab('editor');
    }
  };

  // Duplicate Menu
  const handleDuplicateMenu = async (id: string) => {
    const record = await duplicateStoredMenu(id);
    if (record) {
      const menus = await getStoredMenus();
      setStoredMenus(menus);
    }
  };

  // Delete Menu
  const handleDeleteMenu = async (id: string) => {
    const updated = await deleteStoredMenu(id);
    setStoredMenus(updated);
    if (activeMenuRecord?.id === id || activeMenuRecord?.slug === id) {
      if (updated.length > 0) {
        setActiveMenuRecord(updated[0]);
        setMenuData(updated[0].menuData);
      } else {
        setActiveMenuRecord(null);
        setMenuData(INITIAL_MENU_DATA);
      }
    }
  };

  // Rotate Signed Token
  const handleRotateToken = async (): Promise<string> => {
    if (!activeMenuRecord) return '';
    const newToken = await rotateMenuToken(activeMenuRecord.id);
    const menus = await getStoredMenus();
    setStoredMenus(menus);
    setActiveMenuRecord(prev => prev ? { ...prev, token: newToken } : null);
    return newToken;
  };

  // Clear All Menus
  const handleClearAllMenus = async () => {
    await clearAllStoredMenus();
    setStoredMenus([]);
    setActiveMenuRecord(null);
  };

  // Save Subscription details
  const handleSaveSubscription = async (id: string, subscription: any, isActive: boolean) => {
    const existing = storedMenus.find(m => m.id === id);
    if (!existing) return;
    
    const updatedRecord = await saveStoredMenu(
      existing.menuData,
      existing.status,
      subscription,
      isActive,
      existing.token
    );
    
    const menus = await getStoredMenus();
    setStoredMenus(menus);
    if (activeMenuRecord?.id === id) {
      setActiveMenuRecord(updatedRecord);
    }
  };

  // Updates for Restaurant Details
  const handleUpdateRestaurant = (details: Partial<RestaurantDetails>) => {
    const updated: MenuData = {
      ...menuData,
      restaurant: { ...menuData.restaurant, ...details },
      slug: details.name ? details.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : menuData.slug,
      lastUpdated: new Date().toISOString(),
    };
    updateAndSaveMenu(updated);
  };

  // Updates for Theme Configuration
  const handleUpdateTheme = (themeUpdate: Partial<ThemeConfig>) => {
    const updated: MenuData = {
      ...menuData,
      theme: { ...menuData.theme, ...themeUpdate },
      lastUpdated: new Date().toISOString(),
    };
    updateAndSaveMenu(updated);
  };

  // Select Preset Theme
  const handleSelectPresetTheme = (themeId: ThemePresetId) => {
    const selectedTheme = PRESET_THEMES[themeId];
    if (selectedTheme) {
      const updated: MenuData = {
        ...menuData,
        theme: selectedTheme,
        lastUpdated: new Date().toISOString(),
      };
      updateAndSaveMenu(updated);
    }
  };

  // Apply Imported Menu Categories & Restaurant Metadata
  const handleApplyImportedMenu = (
    categories: MenuCategory[],
    applyTheme?: ThemeConfig,
    restaurantDetails?: Partial<RestaurantDetails>
  ) => {
    const updated: MenuData = {
      ...menuData,
      categories: categories.length > 0 ? categories : menuData.categories,
      restaurant: restaurantDetails ? { ...menuData.restaurant, ...restaurantDetails } : menuData.restaurant,
      slug: restaurantDetails?.name ? restaurantDetails.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : menuData.slug,
      theme: applyTheme || menuData.theme,
      lastUpdated: new Date().toISOString(),
    };
    updateAndSaveMenu(updated);
    setCurrentView('editor');
  };

  // Add Category
  const handleAddCategory = (categoryName: string) => {
    const newCat: MenuCategory = {
      id: `cat-${Date.now()}`,
      name: categoryName,
      items: [],
    };
    const updated: MenuData = {
      ...menuData,
      categories: [...menuData.categories, newCat],
      lastUpdated: new Date().toISOString(),
    };
    updateAndSaveMenu(updated);
  };

  // Update Category
  const handleUpdateCategory = (categoryId: string, name: string, description?: string) => {
    const updated: MenuData = {
      ...menuData,
      categories: menuData.categories.map(cat => 
        cat.id === categoryId ? { ...cat, name, description } : cat
      ),
      lastUpdated: new Date().toISOString(),
    };
    updateAndSaveMenu(updated);
  };

  // Delete Category
  const handleDeleteCategory = (categoryId: string) => {
    const updated: MenuData = {
      ...menuData,
      categories: menuData.categories.filter(cat => cat.id !== categoryId),
      lastUpdated: new Date().toISOString(),
    };
    updateAndSaveMenu(updated);
  };

  // Add Dish Item
  const handleAddItem = (categoryId: string, item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    
    let targetCatId = categoryId;
    let categoriesList = [...menuData.categories];

    // Auto-create default category if empty
    if (categoriesList.length === 0 || !targetCatId) {
      const defaultCat: MenuCategory = {
        id: `cat-${Date.now()}`,
        name: 'Main Course',
        items: [],
      };
      categoriesList.push(defaultCat);
      targetCatId = defaultCat.id;
    }

    const updated: MenuData = {
      ...menuData,
      categories: categoriesList.map(cat => {
        if (cat.id === targetCatId) {
          return { ...cat, items: [...cat.items, newItem] };
        }
        return cat;
      }),
      lastUpdated: new Date().toISOString(),
    };
    updateAndSaveMenu(updated);
  };

  // Update Dish Item
  const handleUpdateItem = (categoryId: string, itemId: string, itemUpdate: Partial<MenuItem>) => {
    const updated: MenuData = {
      ...menuData,
      categories: menuData.categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: cat.items.map(item => item.id === itemId ? { ...item, ...itemUpdate } : item),
          };
        }
        return cat;
      }),
      lastUpdated: new Date().toISOString(),
    };
    updateAndSaveMenu(updated);
  };

  // Delete Dish Item
  const handleDeleteItem = (categoryId: string, itemId: string) => {
    const updated: MenuData = {
      ...menuData,
      categories: menuData.categories.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, items: cat.items.filter(item => item.id !== itemId) };
        }
        return cat;
      }),
      lastUpdated: new Date().toISOString(),
    };
    updateAndSaveMenu(updated);
  };

  // Export JSON Package Handler
  const handleExportJsonPackage = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(menuData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `menu-${menuData.slug || 'export'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Reset to sample data
  const handleResetData = () => {
    if (window.confirm("Reset menu to sample data? Unsaved custom items will be overwritten.")) {
      updateAndSaveMenu(INITIAL_MENU_DATA);
    }
  };

  if (isAuthLoading) {
    return <div className="min-h-screen bg-stone-100 flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-stone-100 text-slate-900 flex flex-col font-sans selection:bg-emerald-700 selection:text-white">
      
      {/* Top Header & Navigation Bar */}
      <HeaderNav
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'qr') setIsQrModalOpen(true);
        }}
        deviceView={deviceView}
        setDeviceView={setDeviceView}
        onOpenSmartInput={() => setIsSmartInputOpen(true)}
        onOpenStitchMd={() => setIsStitchMdOpen(true)}
        onExportHtml={() => downloadStandaloneHtmlFile(menuData)}
        onExportJson={handleExportJsonPackage}
        onReset={handleResetData}
        onSave={async () => {
          try {
            const res = await fetch('/api/menu', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(menuData)
            });
            if (res.ok) {
              setToastMessage({ title: 'Synced Successfully', message: 'Menu saved and synced to your live digital menu instantly!', type: 'success' });
            } else {
              setToastMessage({ title: 'Sync Failed', message: 'Failed to sync to live server.', type: 'error' });
            }
          } catch (e) {
            setToastMessage({ title: 'Error', message: 'Error syncing. Check connection.', type: 'error' });
          }
        }}
        onPublish={async () => {
          try {
            const res = await fetch('/api/menu', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(menuData)
            });
            if (res.ok) {
              const data = await res.json();
              const token = activeMenuRecord?.token || generateSignedToken();
              const baseUrl = window.location.origin;
              const publishUrl = `${baseUrl}/menu/${data.slug}?token=${token}`;
              
              setToastMessage({
                title: 'Published Successfully!',
                message: 'Your live digital menu is now instantly available.',
                type: 'success',
                url: publishUrl
              });
            } else {
              setToastMessage({ title: 'Publish Failed', message: 'Failed to publish to live server.', type: 'error' });
            }
          } catch (e) {
            console.error(e);
            setToastMessage({ title: 'Error', message: 'Error publishing. Check connection.', type: 'error' });
          }
        }}
        restaurantName={menuData.restaurant.name}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {currentView === 'dashboard' ? (
          /* Main Admin Dashboard View */
            <DashboardView
              menus={storedMenus}
              onSelectEditMenu={handleSelectEditMenu}
              onSelectPreviewMenu={handleSelectPreviewMenu}
              onOpenQrSuite={handleOpenQrSuiteForMenu}
              onExportMenuHtml={(data) => downloadStandaloneHtmlFile(data)}
              onDuplicateMenu={handleDuplicateMenu}
              onDeleteMenu={handleDeleteMenu}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
              onOpenSmartInput={() => setIsSmartInputOpen(true)}
              onOpenSubscriptionManager={(record) => {
                setSubscriptionMenuRecord(record);
                setIsSubscriptionManagerOpen(true);
              }}
              onClearAllMenus={handleClearAllMenus}
            />
        ) : (
          /* Canva Visual Studio & Live Responsive Canvas Preview */
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
            <CanvaInspector
              menuData={menuData}
              onUpdateRestaurant={handleUpdateRestaurant}
              onUpdateTheme={handleUpdateTheme}
              onSelectPresetTheme={handleSelectPresetTheme}
              onAddCategory={handleAddCategory}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
              onAddItem={handleAddItem}
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem}
              onOpenSmartInput={() => setIsSmartInputOpen(true)}
            />

            <MenuCanvasPreview
              menuData={menuData}
              deviceView={deviceView}
              onUpdateItem={handleUpdateItem}
              onUpdateRestaurant={handleUpdateRestaurant}
              onUpdateCategory={handleUpdateCategory}
            />
          </div>
        )}

      </main>

      {/* Modal 1: Create New Menu (4 Creation Paths) */}
      <CreateMenuModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateWithMethod={handleCreateWithMethod}
      />

      {/* Modal 2: Smart Input (PDF / Image OCR / AI Parsing) */}
      <SmartInputModal
        isOpen={isSmartInputOpen}
        onClose={() => setIsSmartInputOpen(false)}
        onApplyImportedMenu={handleApplyImportedMenu}
        onSelectPresetTheme={handleSelectPresetTheme}
      />

      {/* Modal 3: Token QR Security Suite & HTML Package Export */}
      <QrExportModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        menuData={menuData}
        token={activeMenuRecord?.token}
        onRotateToken={handleRotateToken}
        onExportJson={handleExportJsonPackage}
      />

      {/* Modal 4: Stitch Project design.md Theme Import */}
      <StitchDesignMdModal
        isOpen={isStitchMdOpen}
        onClose={() => setIsStitchMdOpen(false)}
        onApplyStitchTheme={handleSelectPresetTheme}
      />

      {/* Modal 5: Subscription Manager */}
      <SubscriptionManager
        isOpen={isSubscriptionManagerOpen}
        onClose={() => setIsSubscriptionManagerOpen(false)}
        menuRecord={subscriptionMenuRecord}
        onSave={handleSaveSubscription}
      />

      {/* Global In-App Toast/Modal UI */}
      {toastMessage && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-md shadow-2xl p-6 relative flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${toastMessage.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {toastMessage.type === 'success' ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{toastMessage.title}</h3>
            <p className="text-sm text-slate-600 mb-4">{toastMessage.message}</p>
            
            {toastMessage.url && (
              <div className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 mb-6 text-left">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" /> Live 64-Bit Secure URL
                </label>
                <div className="flex items-center gap-2">
                  <input type="text" readOnly value={toastMessage.url} className="flex-1 bg-transparent text-xs font-mono text-emerald-700 focus:outline-none" />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(toastMessage.url!);
                      setToastMessage(prev => prev ? { ...prev, title: 'URL Copied!' } : null);
                    }} 
                    className="p-1.5 bg-white hover:bg-stone-200 border border-stone-200 rounded-lg text-slate-700 transition-colors shadow-sm"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setToastMessage(null)} 
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
