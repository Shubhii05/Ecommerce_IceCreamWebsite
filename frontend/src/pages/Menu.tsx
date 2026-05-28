import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, Star, Filter, X } from "lucide-react";
import { CATEGORIES, type Category } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/lib/products";

function FadeIn({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className} style={style}>{children}</motion.div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const { addItem } = useCart();
  const { products, loading } = useProducts();

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen pt-16" style={{ background: "hsl(40,60%,97%)" }}>
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-6 text-center"
        style={{ background: "linear-gradient(150deg, hsl(38,80%,96%) 0%, hsl(340,55%,94%) 100%)" }}>
        {[
          { color: "hsl(340,65%,78%)", pos: "top-0 right-1/4", size: "w-60 h-60", blur: 80 },
          { color: "hsl(30,70%,78%)", pos: "bottom-0 left-1/4", size: "w-48 h-48", blur: 70 },
        ].map((b, i) => (
          <div key={i} className={`absolute rounded-full opacity-25 ${b.size} ${b.pos}`}
            style={{ background: b.color, filter: `blur(${b.blur}px)` }} />
        ))}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative z-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full"
            style={{ background: "hsla(340,65%,60%,0.12)", color: "hsl(340,65%,50%)" }}>Our Menu</span>
          <h1 className="font-serif text-6xl font-bold mb-4" style={{ color: "hsl(20,25%,18%)" }}>Pick your flavour</h1>
          <p className="text-lg max-w-lg mx-auto mb-6" style={{ color: "hsl(20,15%,45%)" }}>
            Fresh-churned daily. Every flavour a new adventure.
          </p>
          <div className="relative max-w-md mx-auto shadow-md rounded-full overflow-hidden">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "hsl(20,12%,55%)" }} />
            <input
              type="search"
              placeholder="Search flavours..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-full text-sm outline-none transition-all border"
              style={{ background: "hsl(38,55%,99%)", borderColor: "hsl(30,25%,88%)", color: "hsl(20,25%,20%)" }}
              data-testid="input-search"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X size={14} style={{ color: "hsl(20,12%,55%)" }} />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-2">
        {/* Category Tabs & Items Count */}
        <FadeIn className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex gap-2 flex-wrap">
            {(["All", ...CATEGORIES] as const).map((cat) => (
              <motion.button key={cat}
                onClick={() => setActiveCategory(cat as typeof activeCategory)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all border shadow-sm"
                style={activeCategory === cat
                  ? { background: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))", color: "white", borderColor: "transparent", boxShadow: "0 4px 15px hsla(340,65%,55%,0.35)" }
                  : { background: "hsl(38,55%,99%)", color: "hsl(20,20%,40%)", borderColor: "hsl(30,25%,88%)" }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                data-testid={`filter-${cat.toLowerCase()}`}>
                {cat}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-stone-500 bg-[#f7efe2]/50 px-4 py-2 rounded-full border border-stone-200/40 shrink-0">
            <Filter size={14} className="text-stone-400" />
            <span className="text-xs font-black uppercase tracking-wider">
              {loading ? "Loading" : filtered.length} flavours
            </span>
          </div>
        </FadeIn>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory + search}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-20" style={{ color: "hsl(20,12%,55%)" }}>
                <div className="text-5xl mb-4">🍦</div>
                <p className="font-serif text-xl">No flavours found</p>
                <p className="text-sm mt-2">Try a different search or category</p>
              </div>
            ) : filtered.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.04}>
                <Link href={`/menu/${product.id}`}>
                  <motion.div className="group rounded-3xl overflow-hidden cursor-pointer h-full flex flex-col border"
                    style={{ background: "hsl(38,55%,99%)", borderColor: "hsl(30,25%,92%)", boxShadow: "0 4px 20px rgba(80,30,10,0.04)" }}
                    whileHover={{ y: -5, boxShadow: "0 12px 36px rgba(80,30,10,0.08)", borderColor: "hsl(340,40%,88%)" }}
                    transition={{ duration: 0.25 }} data-testid={`card-menu-${product.id}`}>
                    <div className="relative overflow-hidden h-44">
                      <img src={product.image} alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      {product.badge && (
                        <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                          style={{ background: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,48%))" }}>
                          {product.badge}
                        </span>
                      )}
                      <div className="absolute top-3 right-3 flex items-center gap-1 text-white text-xs font-semibold px-2 py-1 rounded-full"
                        style={{ background: "rgba(0,0,0,0.3)" }}>
                        <Star size={10} fill="currentColor" /> {product.rating}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: "hsl(340,65%,55%)" }}>{product.category}</div>
                      <h3 className="font-serif text-base font-bold mb-1.5 flex-1 group-hover:text-rose-500 transition-colors" style={{ color: "hsl(20,25%,18%)" }}>{product.name}</h3>
                      <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: "hsl(20,12%,50%)" }}>{product.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-bold text-sm" style={{ color: "hsl(20,25%,18%)" }}>
                          ₹{product.price.toFixed(0)}
                          {product.originalPrice && <span className="text-xs line-through ml-1" style={{ color: "hsl(20,12%,65%)" }}>₹{product.originalPrice.toFixed(0)}</span>}
                        </span>
                        <motion.button
                          onClick={(e) => { e.preventDefault(); addItem(product, product.flavors[0], []); }}
                          className="text-xs font-bold px-4 py-1.5 rounded-full text-white"
                          style={{ background: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))", boxShadow: "0 3px 12px hsla(340,65%,55%,0.25)" }}
                          whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
                          data-testid={`button-add-${product.id}`}>
                          + Add
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
