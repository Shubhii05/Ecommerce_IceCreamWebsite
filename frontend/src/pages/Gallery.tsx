import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";

const Instagram = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const PHOTOS = [
  { id: 1, src: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800&q=80", tag: "Cones", span: "col-span-1 row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&q=80", tag: "Flavours" },
  { id: 3, src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80", tag: "Chocolate" },
  { id: 4, src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", tag: "Shakes", span: "col-span-1 row-span-2" },
  { id: 5, src: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=800&q=80", tag: "Flavours" },
  { id: 6, src: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80", tag: "Seasonal" },
  { id: 7, src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80", tag: "Shop", span: "col-span-2" },
  { id: 8, src: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80", tag: "Shakes" },
  { id: 9, src: "https://images.unsplash.com/photo-1488093996048-b4a3ec28e0cc?w=800&q=80", tag: "Sundaes", span: "col-span-1 row-span-2" },
  { id: 10, src: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80", tag: "Waffles" },
  { id: 11, src: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800&q=80", tag: "Seasonal" },
  { id: 12, src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80", tag: "Waffles" },
  { id: 13, src: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80", tag: "Shakes", span: "col-span-2" },
  { id: 14, src: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=800&q=80", tag: "Flavours" },
];

const TAGS = ["All", "Cones", "Shakes", "Sundaes", "Waffles", "Flavours", "Shop", "Seasonal"];

function FadeIn({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className} style={style}>{children}</motion.div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? PHOTOS : PHOTOS.filter((p) => p.tag === active);
  const current = lightbox !== null ? PHOTOS.find((p) => p.id === lightbox) : null;

  return (
    <main className="min-h-screen pt-16" style={{ background: "hsl(40,60%,97%)" }}>
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-6 text-center"
        style={{ background: "linear-gradient(150deg, hsl(340,40%,94%) 0%, hsl(30,60%,95%) 100%)" }}>
        <motion.div className="absolute top-0 left-1/4 w-72 h-72 rounded-full opacity-25"
          style={{ background: "hsl(340,65%,78%)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full"
            style={{ background: "hsla(340,65%,60%,0.12)", color: "hsl(340,65%,50%)" }}>Gallery</span>
          <h1 className="font-serif text-6xl font-bold mb-4" style={{ color: "hsl(20,25%,18%)" }}>Eat with your eyes first</h1>
          <div className="flex items-center justify-center gap-2 mt-4" style={{ color: "hsl(20,12%,50%)" }}>
            <Instagram size={16} />
            <span className="text-sm font-medium">@scoopsanddreams</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter */}
        <FadeIn className="flex gap-2 flex-wrap mb-10">
          {TAGS.map((tag) => (
            <motion.button key={tag} onClick={() => setActive(tag)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all border shadow-sm"
              style={active === tag
                ? { background: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))", color: "white", borderColor: "transparent", boxShadow: "0 4px 14px hsla(340,65%,55%,0.35)" }
                : { background: "hsl(38,55%,99%)", color: "hsl(20,20%,40%)", borderColor: "hsl(30,25%,88%)" }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              data-testid={`filter-gallery-${tag.toLowerCase()}`}>
              {tag}
            </motion.button>
          ))}
        </FadeIn>

        {/* Masonry-style grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {filtered.map((photo, i) => (
              <motion.div key={photo.id}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group border shadow-sm ${photo.span ?? ""}`}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onClick={() => setLightbox(photo.id)}
                whileHover={{ scale: 1.02 }}
                data-testid={`photo-${photo.id}`}>
                <img src={photo.src} alt={photo.tag} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }}>
                  <span className="text-white text-xs font-bold px-2.5 py-1 rounded-full shadow" style={{ background: "hsla(340,65%,60%,0.85)" }}>
                    {photo.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer"
            style={{ background: "rgba(0,0,0,0.88)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}>
            <motion.div className="relative max-w-3xl w-full max-h-[90vh] rounded-3xl overflow-hidden cursor-default shadow-2xl"
              initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}>
              <img src={current.src} alt={current.tag} className="w-full h-full object-cover" />
              <button onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-115 transition-transform"
                data-testid="button-close-lightbox">
                <X size={18} style={{ color: "hsl(20,25%,20%)" }} />
              </button>
              <div className="absolute bottom-4 left-4 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow"
                style={{ background: "hsla(340,65%,60%,0.90)" }}>{current.tag}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
