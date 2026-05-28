import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Star, ArrowLeft, ShoppingCart, Heart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/lib/products";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors[0] ?? "");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const related = products.filter((p) => p.id !== id && p.category === product?.category).slice(0, 3);

  useEffect(() => {
    if (product && !selectedFlavor) {
      setSelectedFlavor(product.flavors[0] ?? "");
    }
  }, [product, selectedFlavor]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(40,60%,97%)" }}>
        <div className="text-center">
          <div className="font-serif text-3xl font-bold mb-4" style={{ color: "hsl(20,25%,18%)" }}>
            {loading ? "Loading product..." : "Product not found"}
          </div>
          <Link href="/menu"><span className="text-sm font-semibold cursor-pointer" style={{ color: "hsl(340,65%,55%)" }}>Back to menu</span></Link>
        </div>
      </div>
    );
  }

  function toggleTopping(t: string) {
    setSelectedToppings((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  }

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(product!, selectedFlavor, selectedToppings);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="min-h-screen pt-20" style={{ background: "hsl(40,60%,97%)" }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link href="/menu">
          <motion.span className="inline-flex items-center gap-2 text-sm font-semibold mb-8 cursor-pointer"
            style={{ color: "hsl(340,65%,55%)" }} whileHover={{ x: -3 }}>
            <ArrowLeft size={16} /> Back to Menu
          </motion.span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden aspect-square border shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-transparent" />
            {product.badge && (
              <span className="absolute top-5 left-5 text-sm font-bold px-4 py-1.5 rounded-full text-white"
                style={{ background: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,48%))" }}>
                {product.badge}
              </span>
            )}
            <motion.button
              onClick={() => setLiked((v) => !v)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center border shadow-sm"
              style={{ background: "rgba(255,255,255,0.9)" }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              data-testid="button-like">
              <Heart size={18} fill={liked ? "hsl(340,65%,55%)" : "none"} color="hsl(340,65%,55%)" />
            </motion.button>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col">
            <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "hsl(340,65%,55%)" }}>{product.category}</div>
            <h1 className="font-serif text-4xl font-bold mb-3" style={{ color: "hsl(20,25%,18%)" }}>{product.name}</h1>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "hsl(340,65%,60%)" : "none"} color="hsl(340,65%,60%)" />
                ))}
              </div>
              <span className="text-sm font-semibold" style={{ color: "hsl(20,25%,20%)" }}>{product.rating}</span>
              <span className="text-sm" style={{ color: "hsl(20,12%,55%)" }}>({product.reviews} reviews)</span>
            </div>

            <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(20,15%,40%)" }}>{product.description}</p>

            <div className="text-2xl font-bold mb-8" style={{ color: "hsl(20,25%,18%)" }}>
              ₹{product.price.toFixed(2)}
              {product.originalPrice && (
                <span className="text-base line-through ml-2" style={{ color: "hsl(20,12%,65%)" }}>₹{product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Flavour selector */}
            <div className="mb-6">
              <div className="text-sm font-semibold mb-3" style={{ color: "hsl(20,25%,25%)" }}>Choose Flavour</div>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((f) => (
                  <motion.button key={f} onClick={() => setSelectedFlavor(f)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all border shadow-sm"
                    style={selectedFlavor === f
                      ? { background: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))", color: "white", borderColor: "transparent", boxShadow: "0 4px 14px hsla(340,65%,55%,0.35)" }
                      : { background: "hsl(38,55%,99%)", color: "hsl(20,20%,40%)", borderColor: "hsl(30,25%,88%)" }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    data-testid={`flavor-${f}`}>
                    {f}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Toppings */}
            <div className="mb-8">
              <div className="text-sm font-semibold mb-3" style={{ color: "hsl(20,25%,25%)" }}>Add Toppings <span className="font-normal" style={{ color: "hsl(20,12%,55%)" }}>(optional)</span></div>
              <div className="flex flex-wrap gap-2">
                {product.toppings.map((t) => {
                  const active = selectedToppings.includes(t);
                  return (
                    <motion.button key={t} onClick={() => toggleTopping(t)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border shadow-sm"
                      style={active
                        ? { background: "hsla(340,65%,60%,0.12)", color: "hsl(340,65%,50%)", borderColor: "hsl(340,65%,70%)" }
                        : { background: "hsl(38,55%,99%)", color: "hsl(20,20%,45%)", borderColor: "hsl(30,25%,88%)" }}
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      {active && <Check size={10} />} {t}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Qty + Add */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border shadow-sm" style={{ background: "hsl(38,55%,99%)", borderColor: "hsl(30,25%,88%)" }}>
                <motion.button onClick={() => setQty((v) => Math.max(1, v - 1))} className="w-7 h-7 flex items-center justify-center rounded-full font-bold text-lg"
                  style={{ color: "hsl(340,65%,55%)" }} whileTap={{ scale: 0.9 }} data-testid="button-decrease">−</motion.button>
                <span className="w-6 text-center font-bold text-sm" style={{ color: "hsl(20,25%,18%)" }} data-testid="text-quantity">{qty}</span>
                <motion.button onClick={() => setQty((v) => v + 1)} className="w-7 h-7 flex items-center justify-center rounded-full font-bold text-lg"
                  style={{ color: "hsl(340,65%,55%)" }} whileTap={{ scale: 0.9 }} data-testid="button-increase">+</motion.button>
              </div>
              <motion.button onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-white transition-all shadow-md"
                style={{ 
                  background: added ? "linear-gradient(135deg, hsl(165,50%,50%), hsl(165,50%,42%))" : "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))", 
                  boxShadow: added ? "0 6px 20px rgba(16,185,129,0.3)" : "0 6px 20px hsla(340,65%,55%,0.35)" 
                }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                data-testid="button-add-to-cart">
                {added ? <><Check size={16} /> Added!</> : <><ShoppingCart size={16} /> Add to Cart — ₹{(product.price * qty).toFixed(2)}</>}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-3xl font-bold mb-8" style={{ color: "hsl(20,25%,18%)" }}>You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/menu/${p.id}`}>
                  <motion.div className="rounded-2xl overflow-hidden cursor-pointer border shadow-sm" style={{ background: "hsl(38,55%,99%)", borderColor: "hsl(30,25%,92%)" }}
                    whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(80,30,10,0.08)", borderColor: "hsl(340,40%,88%)" }} transition={{ duration: 0.25 }}>
                    <div className="h-36 overflow-hidden"><img src={p.image} alt={p.name} className="w-full h-full object-cover" /></div>
                    <div className="p-4">
                      <h4 className="font-serif font-bold text-sm mb-1 group-hover:text-rose-500 transition-colors" style={{ color: "hsl(20,25%,18%)" }}>{p.name}</h4>
                      <span className="font-bold text-sm" style={{ color: "hsl(340,65%,55%)" }}>₹{p.price.toFixed(2)}</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
