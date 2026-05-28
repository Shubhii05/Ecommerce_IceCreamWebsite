import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Sparkles, Coffee } from "lucide-react";

function FadeIn({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className} style={style}>{children}</motion.div>
  );
}

export default function About() {
  return (
    <main className="min-h-screen pt-16" style={{ background: "hsl(40,60%,97%)" }}>
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-6 text-center"
        style={{ background: "linear-gradient(150deg, hsl(340,40%,94%) 0%, hsl(30,60%,95%) 100%)" }}>
        <motion.div className="absolute top-0 right-1/4 w-72 h-72 rounded-full opacity-25"
          style={{ background: "hsl(340,65%,78%)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full"
            style={{ background: "hsla(340,65%,60%,0.12)", color: "hsl(340,65%,50%)" }}>Our Story</span>
          <h1 className="font-serif text-6xl font-bold mb-4" style={{ color: "hsl(20,25%,18%)" }}>Handchurned Dreams</h1>
          <p className="text-lg max-w-lg mx-auto" style={{ color: "hsl(20,15%,45%)" }}>
            Because every single scoop should tell a story.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <FadeIn>
            <h2 className="font-serif text-4xl font-bold mb-6" style={{ color: "hsl(20,25%,18%)" }}>Made in Bengaluru. With Absolute Love.</h2>
            <p className="text-base leading-relaxed mb-6 font-sans" style={{ color: "hsl(20,15%,40%)" }}>
              Scoops & Dreams started as a simple idea in a tiny Bengaluru kitchen. Our founder wanted to create ice cream that didn't rely on artificial flavorings, high-fructose corn syrups, or bulk chemical stabilizers.
            </p>
            <p className="text-base leading-relaxed mb-6 font-sans" style={{ color: "hsl(20,15%,40%)" }}>
              We set out to master the classic slow-churning method: churning locally sourced dairy from pasture-raised organic dairy farms in Karnataka with organic cane sugar, real spices, and fresh seasonal fruits.
            </p>
            <p className="text-base leading-relaxed font-sans" style={{ color: "hsl(20,15%,40%)" }}>
              Today, we churn small-batches daily in the heart of Koramangala. Each flavor is treated as an artistic creation, reflecting our pure commitment to quality and community.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="relative aspect-[4/3] rounded-3xl overflow-hidden border shadow-sm">
            <img src="https://images.unsplash.com/photo-1557142046-c704a3adf364?w=800&q=80" alt="Spoon holding dark chocolate ice cream" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-transparent" />
          </FadeIn>
        </div>

        {/* Pillars */}
        <div className="border-t pt-20" style={{ borderColor: "hsl(30,25%,90%)" }}>
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="font-serif text-4xl font-bold" style={{ color: "hsl(20,25%,18%)" }}>Our Core Pillars</h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Handcrafted Method",
                desc: "We churn ice cream in super-small five-gallon batches daily. This allows us to control the texture and density of every scoop to ensure velvety luxury.",
                icon: Coffee
              },
              {
                title: "100% Organic Sourcing",
                desc: "We work directly with family-owned organic dairy farms in Karnataka. Our mangoes, saffron, pistachios, honey, and nuts are always raw, real, and organic.",
                icon: Sparkles
              },
              {
                title: "Flavor Adventures",
                desc: "We believe in testing boundaries! From classic Malai Kulfi to seasonal fusions like Paan Gulkand, Royal Kesar Pista, and Tender Coconut.",
                icon: Heart
              }
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeIn key={i} delay={i * 0.08} className="p-8 rounded-3xl border shadow-sm text-center" style={{ background: "hsl(38,55%,99%)", borderColor: "hsl(30,25%,92%)" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-500" style={{ background: "hsla(340,65%,60%,0.10)" }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: "hsl(20,25%,18%)" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(20,15%,45%)" }}>{p.desc}</p>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
