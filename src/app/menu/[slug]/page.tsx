"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { 
  Search, 
  Phone, 
  Map,
  Sparkles,
  Star,
  Leaf,
  Coffee,
  Flame,
  Wine,
  Utensils
} from "lucide-react";

interface MenuItem {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isVeg: boolean;
  isBestseller: boolean;
  isChefSpecial: boolean;
}

interface Category {
  name: string;
  items: MenuItem[];
}

interface MenuData {
  slug: string;
  name: string;
  type: string;
  tagline: string;
  logoUrl: string;
  brandColor: string;
  accentColor: string;
  theme: string;
  phone: string;
  address: string;
  instagramUrl: string;
  mapsUrl: string;
  categories: Category[];
}

export default function DigitalMenuPage() {
  const { slug } = useParams();
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const darkCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (slug) {
      fetchMenu();
    }
  }, [slug]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === "scroll") {
        const amount = e.data.direction === "down" ? 250 : -250;
        window.scrollBy({ top: amount, behavior: "smooth" });
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      window.parent.postMessage({ type: "scrollPercent", percent: scrollPercent }, "*");
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("scroll", handleScroll);

    // Initial delay trigger to report position after load
    const timer = setTimeout(handleScroll, 800);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (menu?.theme !== "dark") return;

    const canvas = darkCanvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;

    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      
      void main() {
        vec2 uv = v_texCoord;
        float noise = sin(uv.x * 3.0 + u_time * 0.2) * cos(uv.y * 2.0 - u_time * 0.15);
        noise += sin(uv.y * 5.0 + u_time * 0.3) * 0.5;
        
        vec3 color1 = vec3(0.059, 0.067, 0.082); // Midnight Black #0F1115
        vec3 color2 = vec3(0.090, 0.102, 0.122); // Graphite #171A1F
        vec3 amber = vec3(0.957, 0.639, 0.0) * 0.05; // Electric Amber #F4A300 dimmed for background
        
        vec3 finalColor = mix(color1, color2, noise * 0.5 + 0.5);
        finalColor += amber * (sin(u_time * 0.5) * 0.5 + 0.5) * 0.2; // Subtle amber pulse
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLocation = gl.getUniformLocation(program, "u_time");

    const render = (time: number) => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTimeLocation, time * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [menu?.theme]);

  const fetchMenu = async () => {
    try {
      const res = await fetch(`/api/menu?slug=${slug}`);
      if (res.ok) {
        const data = await res.json();
        setMenu(data);
        if (data.categories?.length > 0) {
          setActiveCategory(data.categories[0].name);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to selected category
  const scrollToCategory = (name: string) => {
    setActiveCategory(name);
    const element = categoryRefs.current[name];
    if (element) {
      const offset = 140; // Height of sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Dynamic filter for search
  const getFilteredCategories = () => {
    if (!menu) return [];
    
    let cats = menu.categories;
    
    if (searchQuery) {
      cats = cats.map(cat => {
        const filteredItems = cat.items.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { ...cat, items: filteredItems };
      }).filter(cat => cat.items.length > 0);
    }
    
    if (activeCategory && activeCategory !== 'All Categories' && !searchQuery) {
       cats = cats.filter(cat => cat.name === activeCategory);
    }
    
    return cats;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <span className="text-sm font-semibold text-slate-500">Loading digital menu...</span>
        </div>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Digital Menu Not Found</h1>
        <p className="text-slate-500 text-sm max-w-sm">
          We couldn't locate a hosted menu for "/menu/{slug}". Verify the link or contact support.
        </p>
      </div>
    );
  }

  const brandStyles = {
    "--brand-color": menu.brandColor || "#2563EB",
    "--accent-color": menu.accentColor || "#F59E0B"
  } as React.CSSProperties;

  const filteredCategories = getFilteredCategories();

  // Helper for rendering SVG veg badge
  const VegBadge = ({ isVeg }: { isVeg: boolean }) => (
    <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${
      isVeg 
        ? "bg-emerald-50 border-emerald-300 text-emerald-800" 
        : "bg-red-50 border-red-300 text-red-800"
    }`}>
      <span className={`h-2 w-2 border flex items-center justify-center p-[1px] ${isVeg ? "border-emerald-600" : "border-red-600"}`}>
        <span className={`h-1 w-1 rounded-full ${isVeg ? "bg-emerald-600" : "bg-red-600"}`}></span>
      </span>
      <span>{isVeg ? "VEG" : "NON-VEG"}</span>
    </span>
  );

  /* =========================================================================
     THEME 1: Minimal Cafe Theme
     ========================================================================= */
  const renderMinimalCafe = () => {
    const featuredItems = menu.categories
      .flatMap((cat) => cat.items)
      .filter((item) => item.isChefSpecial || item.isBestseller)
      .slice(0, 2);

    return (
      <div className="minimalist-theme w-full max-w-md sm:max-w-2xl mx-auto overflow-x-hidden antialiased bg-[#fbf9f5] text-[#170f0b] min-h-screen pb-32 shadow-sm relative">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0');
          
          .minimalist-theme {
            background-color: #fbf9f5;
            color: #170f0b;
            font-family: 'Inter', sans-serif;
          }
          .minimalist-theme .bg-background {
            background-color: #fbf9f5;
          }
          .minimalist-theme .text-primary {
            color: #170f0b;
          }
          .minimalist-theme .text-on-surface-variant {
            color: #4e4540;
          }
          .minimalist-theme .bg-primary-container {
            background-color: #2d241f;
          }
          .minimalist-theme .text-on-primary {
            color: #ffffff;
          }
          .minimalist-theme .bg-secondary-container {
            background-color: #efdcd0;
          }
          .minimalist-theme .text-on-secondary-container {
            color: #6e6056;
          }
          .minimalist-theme .border-outline-variant {
            border-color: #d1c4be;
          }
          .minimalist-theme .bg-surface {
            background-color: #fbf9f5;
          }
          .minimalist-theme .bg-surface-container {
            background-color: #efeeea;
          }
          .minimalist-theme .bg-tertiary-fixed {
            background-color: #ffdbce;
          }
          .minimalist-theme .text-on-tertiary-container {
            color: #ca7857;
          }
          .minimalist-theme .font-headline-xl {
            font-family: 'EB Garamond', serif;
            font-size: 48px;
            font-weight: 400;
            line-height: 56px;
            letter-spacing: -0.02em;
          }
          .minimalist-theme .font-headline-lg {
            font-family: 'EB Garamond', serif;
            font-size: 32px;
            font-weight: 400;
            line-height: 40px;
          }
          .minimalist-theme .font-headline-lg-mobile {
            font-family: 'EB Garamond', serif;
            font-size: 28px;
            font-weight: 400;
            line-height: 36px;
          }
          .minimalist-theme .font-headline-md {
            font-family: 'EB Garamond', serif;
            font-size: 24px;
            font-weight: 500;
            line-height: 32px;
          }
          .minimalist-theme .font-body-lg {
            font-family: 'Inter', sans-serif;
            font-size: 18px;
            font-weight: 400;
            line-height: 28px;
          }
          .minimalist-theme .font-body-md {
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
          }
          .minimalist-theme .font-price-md {
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            font-weight: 600;
            line-height: 24px;
            letter-spacing: 0.02em;
          }
          .minimalist-theme .font-label-sm {
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            font-weight: 500;
            line-height: 16px;
            letter-spacing: 0.08em;
          }
          .minimalist-theme .px-container-margin {
            padding-left: 24px;
            padding-right: 24px;
          }
          .minimalist-theme .mt-section-gap {
            margin-top: 48px;
          }
          .minimalist-theme .gap-stack-sm {
            gap: 8px;
          }
          .minimalist-theme .gap-stack-md {
            gap: 16px;
          }
          .minimalist-theme .gap-stack-lg {
            gap: 24px;
          }
          .minimalist-theme .rounded-xl {
            border-radius: 12px;
          }
          .minimalist-theme .no-scrollbar::-webkit-scrollbar { display: none; }
          .minimalist-theme .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        {/* Top App Bar */}
        <header className="bg-background sticky top-0 z-50 flex justify-between items-center px-container-margin py-3 w-full border-b border-outline-variant/30">
          <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
            {menu.logoUrl && (
              <img src={menu.logoUrl} alt="Logo" className="h-7 w-auto max-w-[60px] object-contain shrink-0 rounded" />
            )}
            <h1 className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider line-clamp-2 leading-tight break-words">{menu.name}</h1>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="font-label-sm text-label-sm text-primary font-bold">{menu.type || "Cafe"}</span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="fade-up">
          <div className="relative h-[380px] w-full overflow-hidden">
            <div 
              className="bg-cover bg-center w-full h-full transform scale-105" 
              style={{ backgroundImage: `url('${menu.categories[0]?.items[0]?.imageUrl || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop"}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
            <div className="absolute bottom-6 left-container-margin right-container-margin">
              <p className="font-label-sm text-label-sm tracking-[0.2em] uppercase text-on-surface-variant mb-2">{menu.tagline}</p>
              <h2 className="font-headline-xl text-headline-xl mb-4 leading-tight">{menu.name}</h2>
              <div className="flex gap-stack-md text-on-surface-variant">
                {menu.phone && (
                  <a href={`tel:${menu.phone}`} className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">call</span>
                    <span className="font-label-sm text-label-sm">Call</span>
                  </a>
                )}
                {menu.address && (
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span className="font-label-sm text-label-sm truncate max-w-[200px]">{menu.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Category Nav */}
        <nav className="sticky top-[65px] z-40 bg-background/95 backdrop-blur-sm py-4 border-b border-outline-variant/10">
          <div className="flex gap-4 px-container-margin overflow-x-auto no-scrollbar">
            {menu.categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => scrollToCategory(cat.name)}
                className={`whitespace-nowrap px-4 py-2 border rounded-full font-label-sm text-label-sm transition-all ${
                  activeCategory === cat.name
                    ? "bg-primary-container text-on-primary border-primary-container"
                    : "border-outline-variant text-on-surface-variant hover:border-primary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Offer Banner */}
        <div className="px-container-margin mt-stack-lg">
          <div className="bg-secondary-container p-6 rounded-xl flex items-center justify-between gap-4">
            <div>
              <h4 className="font-headline-md text-[20px] mb-1 text-on-secondary-container font-bold">A Perfect Pairing</h4>
              <p className="font-body-md text-label-sm text-on-secondary-container">Experience slow living & intentionality with our hand-brewed coffees.</p>
            </div>
            <span className="material-symbols-outlined text-on-secondary-container text-[32px] shrink-0">bakery_dining</span>
          </div>
        </div>

        {/* Featured Section (Chef's Selection) */}
        {featuredItems.length > 0 && (
          <section className="mt-section-gap px-container-margin">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile">Chef's Selection</h3>
                <p className="font-body-md text-on-surface-variant text-sm italic">Curated seasonal highlights</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-lg">
              {featuredItems.map((item, idx) => (
                <div key={idx} className="group relative overflow-hidden bg-surface rounded-xl border border-outline-variant/30 shadow-sm transition-transform active:scale-[0.98] flex flex-col justify-between">
                  <div className="h-64 relative bg-stone-100">
                    <div 
                      className="bg-cover bg-center w-full h-full" 
                      style={{ backgroundImage: `url('${item.imageUrl || "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop"}')` }}
                    ></div>
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full border border-outline-variant/20">
                      <span className="font-label-sm text-[10px] uppercase tracking-widest font-bold text-on-background">Chef's Choice</span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-headline-md text-headline-md min-w-0 break-words flex-1">{item.name}</h4>
                        <span className="font-price-md text-price-md shrink-0">₹{item.price}</span>
                      </div>
                      <p className="font-body-md text-on-surface-variant text-sm mb-4 leading-relaxed line-clamp-3">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <VegBadge isVeg={item.isVeg} />
                      {item.isBestseller && (
                        <span className="font-label-sm text-[10px] text-on-tertiary-container bg-tertiary-fixed px-2 py-0.5 rounded uppercase shrink-0">Best Seller</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Categories Lists */}
        {filteredCategories.map((cat) => (
          <section 
            key={cat.name} 
            id={cat.name} 
            ref={el => { categoryRefs.current[cat.name] = el; }} 
            className="mt-section-gap px-container-margin"
          >
            <div className="mb-8">
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile mb-2 border-b border-outline-variant/20 pb-4">{cat.name}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-lg gap-x-8">
              {cat.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center min-w-0">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100 border border-outline-variant/10">
                    <div 
                      className="bg-cover bg-center w-full h-full" 
                      style={{ backgroundImage: `url('${item.imageUrl || "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=300&auto=format&fit=crop"}')` }}
                    ></div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <h5 className="font-headline-md text-[18px] min-w-0 break-words flex-1">{item.name}</h5>
                      <span className="font-price-md text-price-md shrink-0">₹{item.price}</span>
                    </div>
                    <p className="font-body-md text-[13px] text-on-surface-variant line-clamp-2 mt-0.5 leading-relaxed">{item.description}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <VegBadge isVeg={item.isVeg} />
                      {item.isBestseller && (
                        <span className="font-label-sm text-[9px] text-on-tertiary-container bg-tertiary-fixed px-2 py-0.5 rounded uppercase shrink-0">Best Seller</span>
                      )}
                      {item.isChefSpecial && (
                        <span className="font-label-sm text-[9px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase shrink-0">Chef Special</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="bg-surface-container py-section-gap px-container-margin text-center flex flex-col items-center gap-stack-lg border-t border-outline-variant/20 mt-16 max-w-md sm:max-w-2xl mx-auto">
          <h2 className="font-headline-md text-headline-md tracking-widest uppercase">{menu.name}</h2>
          <p className="font-label-sm text-label-sm tracking-[0.1em] text-on-surface-variant max-w-[280px]">SLOW LIVING THROUGH FINE BREWS. QUALITY OVER QUANTITY, ALWAYS.</p>
          <div className="flex flex-col gap-4 w-full pt-4 border-t border-outline-variant/10">
            {menu.address && (
              <span className="flex items-center justify-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                {menu.address}
              </span>
            )}
            <div className="flex justify-center gap-8">
              {menu.instagramUrl && (
                <a className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all underline underline-offset-4" href={menu.instagramUrl}>INSTAGRAM</a>
              )}
              {menu.phone && (
                <a className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all underline underline-offset-4" href={`tel:${menu.phone}`}>WHATSAPP</a>
              )}
            </div>
          </div>
          <p className="font-label-sm text-[10px] text-outline mt-8 uppercase">© {new Date().getFullYear()} {menu.name}. ALL RIGHTS RESERVED.</p>
        </footer>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md sm:max-w-2xl mx-auto flex justify-around items-center px-4 py-3 bg-surface/95 backdrop-blur-md z-50 rounded-t-xl shadow-[0_-4px_20px_rgba(0,0,0,0.03)] border-t border-outline-variant/10">
          <button className="flex flex-col items-center justify-center text-tertiary font-semibold scale-90">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
            <span className="font-label-sm text-label-sm mt-1">Menu</span>
          </button>
          {menu.phone && (
            <a href={`tel:${menu.phone}`} className="flex flex-col items-center justify-center text-on-secondary-fixed-variant hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined">call</span>
              <span className="font-label-sm text-label-sm mt-1">Call</span>
            </a>
          )}
          {menu.mapsUrl && (
            <a href={menu.mapsUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center text-on-secondary-fixed-variant hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined">map</span>
              <span className="font-label-sm text-label-sm mt-1">Directions</span>
            </a>
          )}
        </nav>
      </div>
    );
  };

  /* =========================================================================
     THEME 2: Luxury Fine Dining Theme
     ========================================================================= */
  const renderLuxury = () => {
    const featuredItems = menu.categories
      .flatMap((cat) => cat.items)
      .filter((item) => item.isChefSpecial || item.isBestseller)
      .slice(0, 2);

    return (
      <div className="luxury-theme w-full max-w-md sm:max-w-2xl mx-auto overflow-x-hidden antialiased bg-[#131313] text-[#e5e2e1] min-h-screen pb-32 shadow-2xl relative">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inter:wght@300;400;500;600&family=IBM+Plex+Sans:wght@400;500&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
          
          .luxury-theme {
            background-color: #131313;
            color: #e5e2e1;
            font-family: 'Inter', sans-serif;
          }
          .luxury-theme .text-primary {
            color: #e5c276;
          }
          .luxury-theme .bg-primary {
            background-color: #e5c276;
          }
          .luxury-theme .text-secondary {
            color: #d1c5b2;
          }
          .luxury-theme .bg-surface {
            background-color: #131313;
          }
          .luxury-theme .bg-surface-container-low {
            background-color: #1b1b1b;
          }
          .luxury-theme .border-outline-variant {
            border-color: #4d4639;
          }
          .luxury-theme .font-display-lg-mobile {
            font-family: 'EB Garamond', serif;
            font-size: 40px;
            font-weight: 400;
            line-height: 48px;
            letter-spacing: -0.01em;
          }
          .luxury-theme .font-display-lg {
            font-family: 'EB Garamond', serif;
            font-size: 64px;
            font-weight: 400;
            line-height: 72px;
            letter-spacing: -0.02em;
          }
          .luxury-theme .font-headline-sm {
            font-family: 'EB Garamond', serif;
            font-size: 24px;
            font-weight: 500;
            line-height: 32px;
          }
          .luxury-theme .font-headline-md {
            font-family: 'EB Garamond', serif;
            font-size: 32px;
            font-weight: 400;
            line-height: 40px;
          }
          .luxury-theme .font-body-lg {
            font-family: 'Inter', sans-serif;
            font-size: 18px;
            font-weight: 400;
            line-height: 28px;
          }
          .luxury-theme .font-body-md {
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
          }
          .luxury-theme .font-price-display {
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 20px;
            font-weight: 500;
            line-height: 24px;
            letter-spacing: 0.05em;
          }
          .luxury-theme .font-label-caps {
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            font-weight: 600;
            line-height: 16px;
            letter-spacing: 0.1em;
          }
          .luxury-theme .no-scrollbar::-webkit-scrollbar { display: none; }
          .luxury-theme .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        {/* Top AppBar */}
        <header className="flex justify-between items-center w-full px-4 py-3 sticky top-0 z-50 bg-[#131313]/90 backdrop-blur-sm border-b border-outline-variant max-w-md sm:max-w-2xl mx-auto">
          <span className="material-symbols-outlined text-primary cursor-pointer shrink-0">menu</span>
          <h1 className="text-xs sm:text-base font-serif uppercase tracking-widest text-primary text-center px-2 line-clamp-2 leading-tight flex-1 break-words">{menu.name}</h1>
          <span className="material-symbols-outlined text-primary cursor-pointer shrink-0">shopping_bag</span>
        </header>

        {/* Hero Section */}
        <section className="relative h-[600px] flex flex-col items-center justify-center text-center px-8 overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('${menu.categories[0]?.items[0]?.imageUrl || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200"}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#131313] z-10"></div>
          <div className="relative z-20 flex flex-col items-center">
            <div className="mb-4 py-1 px-3 border border-[#e5c276]/40 rounded-full flex items-center gap-2 bg-[#131313]/40 backdrop-blur-md">
              <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-label-caps text-label-caps text-[#e5e2e1] uppercase tracking-widest">Fine Dining</span>
            </div>
            <h2 className="font-display-lg-mobile text-display-lg-mobile text-primary leading-tight mb-4">{menu.name}</h2>
            <p className="font-headline-sm text-headline-sm text-secondary italic mb-8">{menu.tagline}</p>
            <div className="flex items-center gap-2 opacity-80">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-label-caps text-label-caps tracking-widest text-[#e5e2e1] uppercase">Open Today</span>
            </div>
          </div>
        </section>

        {/* Welcome Editorial */}
        <section className="py-16 px-8 text-center">
          <p className="font-display-lg-mobile text-[24px] leading-relaxed text-[#e5e2e1] font-light">
            Every dish is handcrafted using seasonal ingredients sourced from <span className="italic text-primary">carefully selected farms</span> and artisan producers.
          </p>
          <div className="mt-8 w-12 h-[1px] bg-stone-700 mx-auto"></div>
        </section>

        {/* Sticky Navigation */}
        <nav className="sticky top-[72px] z-40 bg-[#131313]/95 backdrop-blur-md border-b border-outline-variant max-w-md sm:max-w-2xl mx-auto">
          <div className="flex overflow-x-auto no-scrollbar px-6 gap-8 py-4">
            {menu.categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => scrollToCategory(cat.name)}
                className={`font-label-caps text-label-caps uppercase tracking-widest whitespace-nowrap transition-all ${
                  activeCategory === cat.name
                    ? "text-primary border-b border-primary pb-1"
                    : "text-stone-500 hover:text-primary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Signature Collection */}
        {featuredItems.length > 0 && (
          <section className="py-12 px-6 space-y-8">
            <h3 className="font-label-caps text-label-caps text-stone-500 tracking-[0.2em] uppercase text-center mb-6">Signature Collection</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {featuredItems.map((item, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-lg bg-surface-container-low border border-outline-variant flex flex-col justify-between">
                  {item.imageUrl && (
                    <div className="aspect-[4/5] overflow-hidden">
                      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={item.imageUrl} alt={item.name} />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-4">
                        <div className="min-w-0">
                          <span className="inline-block px-2 py-1 mb-2 bg-[#e5c276]/10 border border-[#e5c276]/30 rounded text-[10px] font-label-caps text-primary uppercase shrink-0">Chef Recommends</span>
                          <h4 className="font-headline-md text-headline-md text-[#e5e2e1] min-w-0 break-words">{item.name}</h4>
                        </div>
                        <span className="font-price-display text-price-display text-primary shrink-0">₹{item.price}</span>
                      </div>
                      <p className="font-body-md text-stone-400 mb-6 italic line-clamp-3">{item.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <VegBadge isVeg={item.isVeg} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Categories Section */}
        {filteredCategories.map((cat) => (
          <section 
            key={cat.name} 
            id={cat.name} 
            ref={el => { categoryRefs.current[cat.name] = el; }} 
            className="py-12 px-8 bg-[#0e0e0e]"
          >
            <h3 className="font-display-lg-mobile text-[28px] text-primary text-center mb-8">{cat.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {cat.items.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="font-headline-sm text-headline-sm text-[#e5e2e1] min-w-0 break-words flex-1 pr-2">{item.name}</h4>
                    <div className="flex-grow border-b border-dotted border-outline-variant mb-1 hidden sm:block"></div>
                    <span className="font-price-display text-price-display text-primary shrink-0">₹{item.price}</span>
                  </div>
                  <p className="font-body-md text-stone-400 pr-8">{item.description}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <VegBadge isVeg={item.isVeg} />
                    {item.isChefSpecial && (
                      <span className="px-2 py-0.5 border border-outline-variant text-[10px] font-label-caps text-secondary uppercase rounded shrink-0">Chef Special</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Info Section */}
        <section className="py-12 px-8 bg-surface-container-low border-t border-outline-variant space-y-6">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary shrink-0">restaurant</span>
            <div>
              <h5 className="font-label-caps text-label-caps text-[#e5e2e1] uppercase mb-1">Dress Code</h5>
              <p className="font-body-md text-stone-400">Smart Casual / Formal. Gentlemen are requested to wear collars.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary shrink-0">minor_crash</span>
            <div>
              <h5 className="font-label-caps text-label-caps text-[#e5e2e1] uppercase mb-1">Valet Parking</h5>
              <p className="font-body-md text-stone-400">Complimentary valet parking is available at the foyer.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-12 px-8 flex flex-col items-center gap-6 border-t border-outline-variant bg-[#0e0e0e] text-[#d1c5b2] max-w-md sm:max-w-2xl mx-auto">
          <h2 className="font-display-lg text-[20px] text-primary uppercase tracking-[0.2em]">{menu.name}</h2>
          <p className="font-label-caps text-[9px] text-stone-450 text-center opacity-60">© {new Date().getFullYear()} {menu.name.toUpperCase()}. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    );
  };

  /* =========================================================================
     THEME 3: Traditional Indian Theme
     ========================================================================= */
  const renderTraditional = () => {
    const featuredItems = menu.categories
      .flatMap((cat) => cat.items)
      .filter((item) => item.isChefSpecial || item.isBestseller)
      .slice(0, 3);

    return (
      <div className="traditional-theme w-full max-w-md sm:max-w-2xl mx-auto overflow-x-hidden antialiased bg-[#fff8f7] text-[#221a19] min-h-screen pb-32 shadow-2xl relative block-print-bg">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Manrope:wght@400;500;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
          
          .traditional-theme {
            background-color: #fff8f7;
            color: #221a19;
            font-family: 'Manrope', sans-serif;
          }
          .traditional-theme .block-print-bg {
            background-image: radial-gradient(circle at 2px 2px, rgba(93, 24, 27, 0.03) 1px, transparent 0);
            background-size: 40px 40px;
          }
          .traditional-theme .text-primary {
            color: #5d181b;
          }
          .traditional-theme .bg-primary {
            background-color: #5d181b;
          }
          .traditional-theme .text-secondary {
            color: #7c580a;
          }
          .traditional-theme .bg-surface-container-low {
            background-color: #fff0ef;
          }
          .traditional-theme .border-outline-variant {
            border-color: #dac1bf;
          }
          .traditional-theme .font-section-label {
            font-family: 'Cinzel', serif;
            font-size: 14px;
            font-weight: 700;
            line-height: 1.5;
            letter-spacing: 0.15em;
          }
          .traditional-theme .font-display-lg-mobile {
            font-family: 'Libre Caslon Text', serif;
            font-size: 36px;
            font-weight: 400;
            line-height: 1.2;
          }
          .traditional-theme .font-display-lg {
            font-family: 'Libre Caslon Text', serif;
            font-size: 48px;
            font-weight: 400;
            line-height: 1.1;
            letter-spacing: -0.02em;
          }
          .traditional-theme .font-headline-md {
            font-family: 'Libre Caslon Text', serif;
            font-size: 32px;
            font-weight: 400;
            line-height: 1.3;
          }
          .traditional-theme .font-body-lg {
            font-family: 'Manrope', sans-serif;
            font-size: 18px;
            font-weight: 400;
            line-height: 1.6;
          }
          .traditional-theme .font-body-md {
            font-family: 'Manrope', sans-serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 1.6;
          }
          .traditional-theme .font-price-display {
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 18px;
            font-weight: 500;
            line-height: 1;
            letter-spacing: 0.05em;
          }
          .traditional-theme .badge-veg::before { content: ""; display: inline-block; width: 12px; height: 12px; border: 1.5px solid #008000; border-radius: 50%; padding: 2px; background-clip: content-box; background-color: #008000; margin-right: 6px; vertical-align: middle; }
          .traditional-theme .badge-nonveg::before { content: ""; display: inline-block; width: 12px; height: 12px; border: 1.5px solid #800000; border-radius: 1px; padding: 2px; background-clip: content-box; background-color: #800000; margin-right: 6px; vertical-align: middle; }
          .traditional-theme .no-scrollbar::-webkit-scrollbar { display: none; }
          .traditional-theme .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        {/* Top Navigation */}
        <header className="fixed top-0 z-50 w-full max-w-md sm:max-w-2xl h-16 bg-[#fff8f7]/80 backdrop-blur-md border-b border-outline-variant/30 flex justify-between items-center px-4 mx-auto left-0 right-0">
          <button className="text-primary active:opacity-80 active:scale-95 transition-all shrink-0">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex items-center gap-2 min-w-0 flex-1 justify-center px-2">
            <h1 className="font-section-label text-xs sm:text-sm font-bold text-primary tracking-widest text-center line-clamp-2 leading-tight break-words">{menu.name.toUpperCase()}</h1>
          </div>
          <button className="text-primary active:opacity-80 active:scale-95 transition-all shrink-0">
            <span className="material-symbols-outlined">info</span>
          </button>
        </header>

        {/* Hero Section */}
        <section className="relative h-[500px] w-full flex flex-col justify-center items-center text-center px-6 overflow-hidden mt-16">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('${menu.categories[0]?.items[0]?.imageUrl || "https://images.unsplash.com/photo-1585938338392-50a59970d8ee?q=80&w=800"}')` }}
          ></div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-white max-w-4xl">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-[#ffdeaa]"></div>
              <span className="font-section-label text-xs tracking-[0.3em] text-[#ffdeaa] uppercase">Established</span>
              <div className="h-[1px] w-12 bg-[#ffdeaa]"></div>
            </div>
            <h2 className="font-display-lg text-3xl mb-6 leading-tight">Celebrating the Timeless<br/>Flavours of India</h2>
            <div className="flex gap-4 items-center justify-center font-section-label text-[10px] tracking-widest opacity-90 uppercase">
              <span>Authentic Indian Cuisine</span>
            </div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-12 px-6 text-center max-w-4xl mx-auto">
          <span className="material-symbols-outlined text-primary text-4xl mb-4">restaurant</span>
          <h3 className="font-display-lg text-primary italic mb-4">Every recipe tells a story...</h3>
          <p className="font-body-lg text-[#544242] leading-relaxed">
            {menu.tagline}. Each dish is a testament to centuries of tradition, crafted with hand-ground spices and a legacy of hospitality.
          </p>
        </section>

        {/* Sticky Navigation */}
        <nav className="sticky top-16 z-40 bg-[#fff8f7]/95 backdrop-blur-lg border-y border-outline-variant/20 shadow-sm overflow-x-auto no-scrollbar max-w-md sm:max-w-2xl mx-auto">
          <div className="flex items-center gap-6 py-4 px-6 whitespace-nowrap">
            {menu.categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => scrollToCategory(cat.name)}
                className={`font-section-label text-xs transition-colors ${
                  activeCategory === cat.name
                    ? "text-primary font-bold bg-[#ffdad8] rounded-full px-4 py-2"
                    : "text-[#544242] hover:text-primary"
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>

        {/* Signature Specials */}
        {featuredItems.length > 0 && (
          <section className="py-12 px-6 max-w-container-max mx-auto">
            <div className="flex flex-col items-center mb-8">
              <h2 className="font-section-label text-xs text-primary uppercase mb-2">Heritage Signature</h2>
              <div className="h-0.5 w-12 bg-primary mb-4"></div>
              <h3 className="font-display-lg text-primary text-2xl">Chef's Specials</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {featuredItems.map((item, idx) => (
                <div key={idx} className="group bg-[#fff0ef] border border-outline-variant/30 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
                  {item.imageUrl && (
                    <div className="h-64 overflow-hidden relative">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={item.imageUrl} alt={item.name} />
                      <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 font-price-display text-primary text-lg shadow-sm">₹{item.price}</div>
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className={`${item.isVeg ? "badge-veg" : "badge-nonveg"} font-caption text-xs uppercase mb-3 shrink-0`}>
                        {item.isVeg ? "VEGETARIAN" : "NON-VEGETARIAN"}
                      </div>
                      <h4 className="font-headline-md text-primary mb-2 text-xl min-w-0 break-words">{item.name}</h4>
                      <p className="font-body-md text-[#544242] mb-4 line-clamp-3">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Menu Sections */}
        {filteredCategories.map((cat) => (
          <section 
            key={cat.name} 
            id={cat.name} 
            ref={el => { categoryRefs.current[cat.name] = el; }} 
            className="py-12 px-6"
          >
            <div className="flex items-baseline gap-4 mb-6">
              <h3 className="font-display-lg text-primary text-2xl shrink-0">{cat.name}</h3>
              <div className="flex-grow border-b border-outline-variant/30"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {cat.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start group min-w-0 gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 min-w-0">
                      <span className={`${item.isVeg ? "badge-veg" : "badge-nonveg"} shrink-0`}></span>
                      <h4 className="font-body-lg font-bold text-[#221a19] group-hover:text-primary transition-colors uppercase text-sm sm:text-base min-w-0 break-words flex-1">{item.name}</h4>
                    </div>
                    <p className="text-xs text-[#544242] italic">{item.description}</p>
                  </div>
                  <span className="font-price-display text-primary text-sm sm:text-base shrink-0">₹{item.price}</span>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="bg-[#fff0ef] py-12 px-6 text-center border-t border-[#dac1bf]/40 mt-12 max-w-md sm:max-w-2xl mx-auto">
          <h2 className="font-section-label text-base tracking-widest text-primary mb-4">{menu.name.toUpperCase()}</h2>
          <p className="font-body-md text-center italic text-[#544242] opacity-60">© {new Date().getFullYear()} {menu.name}. Atithi Devo Bhava.</p>
        </footer>
      </div>
    );
  };

  /* =========================================================================
     THEME 4: Modern Restaurant Theme
     ========================================================================= */
  const renderModern = () => {
    const featuredItems = menu.categories
      .flatMap((cat) => cat.items)
      .filter((item) => item.isChefSpecial || item.isBestseller)
      .slice(0, 3);

    return (
      <div className="modern-theme w-full max-w-md sm:max-w-2xl mx-auto overflow-x-hidden antialiased bg-[#fbf9f5] text-[#1b1c1a] min-h-screen pb-32 shadow-2xl relative">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;500;600&family=IBM+Plex+Sans:wght@400;600&family=Inter:wght@400;500;600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
          
          .modern-theme {
            background-color: #fbf9f5;
            color: #1b1c1a;
            font-family: 'Manrope', sans-serif;
          }
          .modern-theme .text-primary {
            color: #1a1a1a;
          }
          .modern-theme .text-secondary {
            color: #4b6549;
          }
          .modern-theme .bg-secondary-container {
            background-color: #cdebc8;
          }
          .modern-theme .bg-surface-container-low {
            background-color: #f5f3ef;
          }
          .modern-theme .bg-surface-container-lowest {
            background-color: #ffffff;
          }
          .modern-theme .border-outline-variant {
            border-color: #c4c7c7;
          }
          .modern-theme .font-headline-md {
            font-family: 'Libre Caslon Text', serif;
            font-size: 24px;
            font-weight: 500;
            line-height: 1.3;
          }
          .modern-theme .font-headline-sm {
            font-family: 'Libre Caslon Text', serif;
            font-size: 20px;
            font-weight: 400;
            line-height: 1.3;
          }
          .modern-theme .font-display-lg-mobile {
            font-family: 'Libre Caslon Text', serif;
            font-size: 32px;
            font-weight: 400;
            line-height: 1.2;
          }
          .modern-theme .font-body-lg {
            font-family: 'Manrope', sans-serif;
            font-size: 18px;
            font-weight: 400;
            line-height: 1.6;
          }
          .modern-theme .font-body-md {
            font-family: 'Manrope', sans-serif;
            font-size: 15px;
            font-weight: 400;
            line-height: 1.6;
          }
          .modern-theme .font-price-md {
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 16px;
            font-weight: 600;
            line-height: 1.4;
          }
          .modern-theme .font-label-sm {
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            font-weight: 500;
            line-height: 1;
            letter-spacing: 0.05em;
          }
          .modern-theme .menu-leader {
            border-bottom: 1px dotted #c4c7c7;
            flex-grow: 1;
            margin: 0 8px 4px 8px;
          }
          .modern-theme .no-scrollbar::-webkit-scrollbar { display: none; }
          .modern-theme .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        {/* Top Navigation */}
        <header className="fixed top-0 left-0 w-full max-w-md sm:max-w-2xl z-50 bg-[#fbf9f5] border-b border-[#c4c7c7]/30 mx-auto right-0">
          <nav className="px-4 py-3 flex justify-between items-center w-full gap-2">
            <span className="material-symbols-outlined text-primary cursor-pointer shrink-0">menu</span>
            <h1 className="text-xs sm:text-sm font-bold tracking-widest text-primary text-center px-1 line-clamp-2 leading-tight flex-1 break-words">{menu.name.toUpperCase()}</h1>
            <span className="font-label-sm text-label-sm text-[#4b6549] font-bold uppercase tracking-wider shrink-0">Open</span>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative h-[480px] w-full overflow-hidden flex items-center justify-center mt-14">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${menu.categories[0]?.items[0]?.imageUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800"}')` }}
          ></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center text-white px-6">
            <p className="font-label-sm text-label-sm tracking-[0.3em] uppercase mb-3">KOMOREBI BISTRO</p>
            <h2 className="font-display-lg-mobile italic mb-6 leading-tight">
              {menu.tagline}
            </h2>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-12 text-center px-6">
          <h3 className="font-headline-md mb-4 text-primary italic">The Komorebi Philosophy</h3>
          <p className="font-body-lg text-[#444748] leading-relaxed text-sm sm:text-base">
            At Komorebi, every dish celebrates fresh ingredients, seasonal flavours, and thoughtful craftsmanship. Experience a menu inspired by nature.
          </p>
        </section>

        {/* Sticky Category Navigation */}
        <nav className="sticky top-14 z-40 bg-[#fbf9f5]/95 backdrop-blur-sm border-b border-outline-variant/30 max-w-md sm:max-w-2xl mx-auto">
          <div className="overflow-x-auto no-scrollbar py-3 px-6">
            <div className="flex gap-4 min-w-max">
              {menu.categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => scrollToCategory(cat.name)}
                  className={`font-label-sm text-label-sm transition-all px-4 py-2.5 rounded-full ${
                    activeCategory === cat.name
                      ? "text-[#4b6549] font-bold bg-[#cdebc8]"
                      : "text-[#444748] hover:text-[#4b6549]"
                  }`}
                >
                  {cat.name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Featured Specials */}
        {featuredItems.length > 0 && (
          <section className="py-12 bg-[#f5f3ef]">
            <div className="px-6 space-y-6">
              <div>
                <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">Signature</span>
                <h3 className="font-headline-md text-primary mt-1">Chef's Specials</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {featuredItems.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    {item.imageUrl && (
                      <div className="h-56 bg-cover bg-center overflow-hidden">
                        <img className="w-full h-full object-cover" src={item.imageUrl} alt={item.name} />
                      </div>
                    )}
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-headline-sm text-headline-sm min-w-0 break-words flex-1">{item.name}</h4>
                          <span className="font-price-md text-price-md text-primary shrink-0">₹{item.price}</span>
                        </div>
                        <p className="text-stone-500 text-xs sm:text-sm line-clamp-3">{item.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <VegBadge isVeg={item.isVeg} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular Categories */}
        {filteredCategories.map((cat) => (
          <section 
            key={cat.name} 
            id={cat.name} 
            ref={el => { categoryRefs.current[cat.name] = el; }} 
            className="py-12 px-6"
          >
            <h3 className="font-headline-md mb-6 border-b border-[#c4c7c7] pb-2 italic">{cat.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
              {cat.items.map((item, idx) => (
                <div key={idx} className="flex flex-col min-w-0">
                  <div className="flex items-end gap-2">
                    <span className="font-headline-sm text-base text-[#1b1c1a] min-w-0 break-words flex-1">{item.name}</span>
                    <div className="menu-leader hidden sm:block"></div>
                    <span className="font-price-md text-price-md text-primary shrink-0">₹{item.price}</span>
                  </div>
                  <p className="text-[#444748] text-xs mt-1">{item.description}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <VegBadge isVeg={item.isVeg} />
                    {item.isChefSpecial && (
                      <span className="font-label-sm text-[9px] text-[#4b6549] uppercase shrink-0">Chef Special</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="bg-[#f5f3ef] border-t border-[#c4c7c7]/30 py-12 px-6 mt-12 text-center max-w-md sm:max-w-2xl mx-auto">
          <h2 className="font-headline-sm text-primary mb-4">{menu.name.toUpperCase()}</h2>
          <p className="text-xs text-stone-500 mb-6">{menu.address}</p>
          <p className="font-label-sm text-[10px] text-stone-400">© {new Date().getFullYear()} KOMOREBI MODERN BISTRO. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    );
  };

  /* =========================================================================
     THEME 5: Street Food Theme
     ========================================================================= */
  const renderStreet = () => {
    const featuredItems = menu.categories
      .flatMap((cat) => cat.items)
      .filter((item) => item.isChefSpecial || item.isBestseller)
      .slice(0, 3);

    return (
      <div className="street-theme w-full max-w-md sm:max-w-2xl mx-auto overflow-x-hidden antialiased bg-[#fcf9f8] text-[#1b1c1c] min-h-screen pb-32 shadow-2xl relative">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;500;700&family=IBM+Plex+Sans:wght@600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
          
          .street-theme {
            background-color: #fcf9f8;
            color: #1b1c1c;
            font-family: 'Manrope', sans-serif;
          }
          .street-theme .text-primary {
            color: #ac2c23;
          }
          .street-theme .bg-primary {
            background-color: #ac2c23;
          }
          .street-theme .text-on-primary {
            color: #ffffff;
          }
          .street-theme .bg-secondary-container {
            background-color: #ffce5e;
          }
          .street-theme .text-on-secondary-container {
            color: #755700;
          }
          .street-theme .bg-surface-container {
            background-color: #f0eded;
          }
          .street-theme .bg-surface-container-lowest {
            background-color: #ffffff;
          }
          .street-theme .border-outline-variant {
            border-color: #e1bfba;
          }
          .street-theme .font-label-sm {
            font-family: 'Manrope', sans-serif;
            font-size: 12px;
            font-weight: 700;
            line-height: 16px;
          }
          .street-theme .font-headline-lg-mobile {
            font-family: 'Sora', sans-serif;
            font-size: 28px;
            font-weight: 800;
            line-height: 34px;
            letter-spacing: -0.01em;
          }
          .street-theme .font-headline-md {
            font-family: 'Sora', sans-serif;
            font-size: 24px;
            font-weight: 700;
            line-height: 32px;
          }
          .street-theme .font-headline-xl {
            font-family: 'Sora', sans-serif;
            font-size: 36px;
            font-weight: 800;
            line-height: 44px;
            letter-spacing: -0.02em;
          }
          .street-theme .font-body-lg {
            font-family: 'Manrope', sans-serif;
            font-size: 18px;
            font-weight: 400;
            line-height: 28px;
          }
          .street-theme .font-body-md {
            font-family: 'Manrope', sans-serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
          }
          .street-theme .font-price-display {
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 18px;
            font-weight: 600;
            line-height: 24px;
          }
          .street-theme .no-scrollbar::-webkit-scrollbar { display: none; }
          .street-theme .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        {/* Top App Bar */}
        <header className="fixed top-0 z-50 flex justify-between items-center px-4 py-3 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 w-full max-w-md sm:max-w-2xl mx-auto left-0 right-0">
          <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
            <span className="material-symbols-outlined text-primary cursor-pointer shrink-0">local_fire_department</span>
            <span className="font-bold text-xs sm:text-sm uppercase tracking-tight text-primary line-clamp-2 leading-tight flex-1 break-words">{menu.name}</span>
          </div>
          <button className="bg-primary text-on-primary px-3.5 py-1.5 rounded-lg font-label-sm text-[11px] hover:opacity-80 transition-opacity active:scale-95 shrink-0">OPEN</button>
        </header>

        {/* Hero Section */}
        <section className="relative w-full h-[400px] flex items-end overflow-hidden mt-16">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('${menu.categories[0]?.items[0]?.imageUrl || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800"}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="relative w-full px-6 pb-6 mx-auto z-10 text-white">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-xs mb-3">EST. 2024</span>
            <h1 className="font-headline-xl text-3xl mb-2 leading-tight text-white">{menu.name}</h1>
            <p className="font-body-lg text-sm text-white/95 mb-4">{menu.tagline}</p>
          </div>
        </section>

        {/* Sticky Categories */}
        <nav className="sticky top-16 z-40 bg-white shadow-sm py-3 overflow-x-auto no-scrollbar whitespace-nowrap px-6 max-w-md sm:max-w-2xl mx-auto">
          <div className="flex gap-2">
            {menu.categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => scrollToCategory(cat.name)}
                className={`px-4 py-2 rounded-full font-label-sm text-xs transition-all ${
                  activeCategory === cat.name
                    ? "bg-primary text-white shadow"
                    : "bg-[#f0eded] text-stone-600 hover:bg-[#e5e2e1]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Trending Section */}
        {featuredItems.length > 0 && (
          <section className="py-8 px-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-primary font-bold tracking-widest uppercase text-[12px]">Now Sizzling</span>
                <h2 className="font-headline-md text-xl mt-1">Trending Items</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredItems.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md group flex flex-col justify-between">
                  {item.imageUrl && (
                    <div className="relative h-56 overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.imageUrl} alt={item.name} />
                      <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded font-label-sm text-xs uppercase tracking-wider shrink-0">Chef's Pick</span>
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-headline-md text-lg text-stone-900 min-w-0 break-words flex-1">{item.name}</h3>
                        <span className="font-price-display text-primary shrink-0">₹{item.price}</span>
                      </div>
                      <p className="text-stone-500 font-body-md text-xs sm:text-sm mb-4 line-clamp-3">{item.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <VegBadge isVeg={item.isVeg} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Detailed Menu Categories */}
        {filteredCategories.map((cat) => (
          <section 
            key={cat.name} 
            id={cat.name} 
            ref={el => { categoryRefs.current[cat.name] = el; }} 
            className="px-6 py-6"
          >
            <h2 className="font-headline-md text-lg mb-6 pb-1 border-b-4 border-[#ffce5e] inline-block">{cat.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-stone-100 min-w-0">
                  {item.imageUrl && (
                    <div className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url('${item.imageUrl}')` }}></div>
                  )}
                  <div className="flex-grow min-w-0">
                    <h4 className="font-headline-md text-base text-stone-900 mb-1 min-w-0 break-words flex-1 pr-2">{item.name}</h4>
                    <p className="text-stone-500 text-xs line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="font-price-display text-primary text-sm font-black shrink-0">₹{item.price}</span>
                      <VegBadge isVeg={item.isVeg} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="bg-[#eae7e7] border-t border-[#e5e2e1]/30 py-8 px-6 mt-12 text-center text-[#59413e] max-w-md sm:max-w-2xl mx-auto">
          <div className="font-headline-md text-primary font-extrabold uppercase mb-2">{menu.name}</div>
          <p className="text-xs">{menu.address}</p>
          <p className="font-label-sm text-[10px] text-stone-400 mt-6">© {new Date().getFullYear()} STREET EATS URBAN KITCHEN</p>
        </footer>
      </div>
    );
  };

  /* =========================================================================
     THEME 6: Premium Dark Theme
     ========================================================================= */
  const renderPremiumDark = () => {
    const featuredItems = menu.categories
      .flatMap((cat) => cat.items)
      .filter((item) => item.isChefSpecial || item.isBestseller)
      .slice(0, 2);

    return (
      <div className="dark-theme w-full max-w-md sm:max-w-2xl mx-auto overflow-x-hidden antialiased bg-[#111317] text-[#e2e2e8] min-h-screen pb-32 shadow-2xl relative">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@400;500;600;700&family=Manrope:wght@400;600;700&family=IBM+Plex+Sans:wght@600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
          
          .dark-theme {
            background-color: #111317;
            color: #e2e2e8;
            font-family: 'Manrope', sans-serif;
          }
          .dark-theme .text-primary {
            color: #ffc574;
          }
          .dark-theme .bg-primary-container {
            background-color: #f4a300;
          }
          .dark-theme .text-on-primary-container {
            color: #111317;
          }
          .dark-theme .border-outline-variant {
            border-color: #524533;
          }
          .dark-theme .glass-card {
            background: rgba(29, 33, 40, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(44, 49, 58, 0.5);
            transition: all 0.3s ease-in-out;
          }
          .dark-theme .glass-card:hover {
            box-shadow: 0 0 15px rgba(244, 163, 0, 0.2);
            border-color: rgba(244, 163, 0, 0.3);
            transform: translateY(-2px);
          }
          .dark-theme .neon-amber-glow {
            box-shadow: 0 0 15px rgba(244, 163, 0, 0.2);
          }
          .dark-theme .divider-fade {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #A86B36 50%, transparent 100%);
            opacity: 0.5;
          }
          .dark-theme .font-display-lg {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 48px;
            font-weight: 800;
            letter-spacing: 0.05em;
            line-height: 1.1;
          }
          .dark-theme .font-headline-sm {
            font-family: 'Cinzel', serif;
            font-size: 20px;
            font-weight: 500;
            line-height: 1.3;
          }
          .dark-theme .font-headline-md {
            font-family: 'Cinzel', serif;
            font-size: 28px;
            font-weight: 400;
            line-height: 1.3;
          }
          .dark-theme .font-label-caps {
            font-family: 'Manrope', sans-serif;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
          }
          .dark-theme .font-body-md {
            font-family: 'Manrope', sans-serif;
            font-size: 15px;
            font-weight: 400;
            line-height: 1.6;
          }
          .dark-theme .font-price {
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 18px;
            font-weight: 600;
          }
          .dark-theme .no-scrollbar::-webkit-scrollbar { display: none; }
          .dark-theme .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        {/* WebGL Canvas Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <canvas ref={darkCanvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }}></canvas>
        </div>

        {/* Top App Bar */}
        <header className="fixed top-0 w-full max-w-md sm:max-w-2xl z-50 bg-[#111317]/80 backdrop-blur-xl border-b border-[#524533]/30 shadow-[0_0_15px_rgba(244,163,0,0.1)] mx-auto left-0 right-0">
          <div className="flex justify-between items-center px-4 py-3 w-full">
            <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
              <span className="material-symbols-outlined text-primary cursor-pointer text-[24px] shrink-0">menu</span>
              <h1 className="font-bold text-xs sm:text-base text-primary tracking-wider uppercase line-clamp-2 leading-tight flex-1 break-words">{menu.name}</h1>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-primary font-label-caps text-[9px] border border-[#ffc574]/50 px-2.5 py-1 rounded tracking-widest shrink-0">OPEN NOW</span>
            </div>
          </div>
        </header>

        <main className="relative z-10 pt-[88px]">
          {/* Hero Section */}
          <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden px-6">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-[#111317]/50 z-10"></div>
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url('${menu.categories[0]?.items[0]?.imageUrl || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800"}')` }}
              ></div>
            </div>
            <div className="relative z-20 text-center max-w-4xl py-12">
              <h1 className="font-display-lg text-white mb-4 tracking-wider leading-none">
                WHERE CRAFT <br/> MEETS <span className="text-primary">NIGHTLIFE</span>
              </h1>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="glass-card px-4 py-2 rounded-full flex items-center gap-2 font-label-caps text-[10px]">
                  <span className="text-primary">🍺</span> Craft Brews
                </span>
                <span className="glass-card px-4 py-2 rounded-full flex items-center gap-2 font-label-caps text-[10px]">
                  <span className="text-primary">🍸</span> Cocktails
                </span>
              </div>
            </div>
          </section>

          {/* Welcome Message */}
          <section className="max-w-container-max mx-auto px-6 py-12 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="divider-fade w-24 mx-auto mb-4"></div>
              <p className="font-headline-md text-xl leading-relaxed text-[#e2e2e8] italic">
                {menu.tagline}
              </p>
              <div className="divider-fade w-24 mx-auto mt-4"></div>
            </div>
          </section>

          {/* Menu Categories Horizontal Nav */}
          <nav className="sticky top-[72px] z-40 bg-[#111317]/90 backdrop-blur-md border-y border-outline-variant/20 py-2 overflow-x-auto no-scrollbar max-w-md sm:max-w-2xl mx-auto">
            <div className="px-6 flex items-center gap-6 whitespace-nowrap">
              {menu.categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => scrollToCategory(cat.name)}
                  className={`font-label-caps uppercase tracking-widest transition-colors flex items-center gap-2 ${
                    activeCategory === cat.name
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-stone-500 hover:text-stone-300"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </nav>

          {/* Specials Section */}
          {featuredItems.length > 0 && (
            <section className="px-6 py-12">
              <h2 className="font-headline-md text-[#e2e2e8] mb-8 tracking-widest border-l-4 border-primary pl-4">CHEF'S SPECIALS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {featuredItems.map((item, idx) => (
                  <div key={idx} className="glass-card group overflow-hidden rounded-xl relative flex flex-col justify-between">
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-primary-container text-on-primary-container px-3 py-1 font-label-caps rounded-md backdrop-blur-md neon-amber-glow uppercase tracking-widest text-[9px] shrink-0">Chef's Pick</span>
                    </div>
                    {item.imageUrl && (
                      <div className="h-64 relative overflow-hidden">
                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.imageUrl} alt={item.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111317] to-transparent"></div>
                      </div>
                    )}
                    <div className="p-6 relative flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className="font-headline-sm text-on-surface text-base min-w-0 break-words flex-1">{item.name}</h3>
                          <span className="font-price text-primary text-base shrink-0">₹{item.price}</span>
                        </div>
                        <p className="text-stone-400 font-body-md text-xs sm:text-sm mb-4 line-clamp-3">{item.description}</p>
                      </div>
                      <VegBadge isVeg={item.isVeg} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Regular Menu Sections */}
          {filteredCategories.map((cat) => (
            <section 
              key={cat.name} 
              id={cat.name} 
              ref={el => { categoryRefs.current[cat.name] = el; }} 
              className="px-6 py-10 bg-[#0c0e12]/50"
            >
              <h2 className="font-display-lg text-primary text-2xl mb-6 tracking-widest border-b border-[#524533]/30 pb-2 uppercase">{cat.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="bg-zinc-900/50 backdrop-blur border border-zinc-800/80 p-4 rounded-xl flex justify-between items-start group min-w-0 gap-4">
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-headline-sm text-[#e2e2e8] group-hover:text-primary transition-colors text-sm sm:text-base min-w-0 break-words flex-1">{item.name}</h4>
                        <VegBadge isVeg={item.isVeg} />
                      </div>
                      <p className="text-stone-400 text-xs">{item.description}</p>
                    </div>
                    <span className="font-price text-[#e2e2e8] group-hover:text-primary shrink-0">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        {/* Footer */}
        <footer className="relative z-10 w-full mt-12 border-t border-zinc-800/40 bg-[#0c0e12] py-8 text-center text-[#ffc574] max-w-md sm:max-w-2xl mx-auto">
          <h3 className="font-headline-sm text-sm sm:text-base text-on-surface mb-2">{menu.name.toUpperCase()}</h3>
          <p className="text-stone-550 text-xs">{menu.address}</p>
          <p className="font-label-caps text-[9px] text-stone-500 mt-6">© {new Date().getFullYear()} NEON TAPROOM. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    );
  };

  const getThemeLayout = () => {
    switch (menu.theme) {
      case "luxury":
        return renderLuxury();
      case "traditional":
        return renderTraditional();
      case "modern":
        return renderModern();
      case "street":
        return renderStreet();
      case "dark":
        return renderPremiumDark();
      case "minimal":
      default:
        return renderMinimalCafe();
    }
  };

  return (
    <div className="relative">
      <style dangerouslySetInnerHTML={{__html: `
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none !important;
        }
        html, body {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />
      {/* Active layout content */}
      {getThemeLayout()}

      {/* Shared Lightweight Menu Footer */}
      <footer className="w-full py-6 text-center border-t text-xs font-semibold bg-white text-slate-400 max-w-md sm:max-w-2xl mx-auto">
        <div className="px-4 space-y-3">
          {/* Action buttons mapping directions */}
          <div className="flex gap-3 justify-center">
            {menu.phone && (
              <a href={`tel:${menu.phone}`} className="inline-flex items-center gap-1 bg-slate-50 border px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100">
                <Phone className="h-3 w-3" /> Call Restaurant
              </a>
            )}
            {menu.mapsUrl && (
              <a href={menu.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 bg-slate-50 border px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100">
                <Map className="h-3 w-3" /> Get Directions
              </a>
            )}
          </div>

          <div className="space-y-1">
            <span className="block">{menu.name} · {menu.address}</span>
            <span className="block font-medium">Powered by BookMyDine QR</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
