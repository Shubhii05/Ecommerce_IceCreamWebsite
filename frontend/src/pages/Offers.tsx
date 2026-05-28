import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Gift, Sparkles, Tag, Award } from "lucide-react";

function FadeIn({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className} style={style}>{children}</motion.div>
  );
}

export default function Offers() {
  const offersList = [
    {
      title: "Happy Hour Special",
      value: "20% OFF",
      desc: "Get 20% off on all single cones, double cones, and waffle bowls. Available every weekday afternoon.",
      time: "Mon - Fri, 3:00 PM - 5:00 PM",
      code: "SWEETHOUSE",
      color: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))",
      icon: Clock
    },
    {
      title: "Summer Sundae Combo",
      value: "SAVE ₹50.00",
      desc: "Buy any royal or brownie sundae together with any hand-spun milkshake and save ₹50 instantly.",
      time: "Valid until August 31, 2026",
      code: "SUMMERSPLASH",
      color: "linear-gradient(135deg, hsl(35,85%,62%), hsl(30,75%,52%))",
      icon: Sparkles
    },
    {
      title: "Birthday Double Scoop",
      value: "100% FREE",
      desc: "Celebrate your birthday with us! Show a valid ID and receive a free double scoop waffle cone of your choice.",
      time: "Valid on your birthday only",
      code: "BIRTHDAYLOVE",
      color: "linear-gradient(135deg, hsl(255,50%,65%), hsl(255,45%,55%))",
      icon: Gift
    },
    {
      title: "Family Treat Tub",
      value: "15% OFF",
      desc: "Ordering for the whole family? Get 15% off when you purchase 3 or more of our take-home hand-packed pints.",
      time: "Available every Sunday",
      code: "SUNDAYFAMILY",
      color: "linear-gradient(135deg, hsl(165,55%,50%), hsl(165,50%,40%))",
      icon: Award
    }
  ];

  return (
    <main className="min-h-screen pt-16" style={{ background: "hsl(40,60%,97%)" }}>
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-6 text-center"
        style={{ background: "linear-gradient(150deg, hsl(30,60%,95%) 0%, hsl(340,40%,94%) 100%)" }}>
        <motion.div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-25"
          style={{ background: "hsl(30,70%,78%)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full"
            style={{ background: "hsla(340,65%,60%,0.12)", color: "hsl(340,65%,50%)" }}>Special Deals</span>
          <h1 className="font-serif text-6xl font-bold mb-4" style={{ color: "hsl(20,25%,18%)" }}>Scoops of Happiness</h1>
          <p className="text-lg max-w-lg mx-auto" style={{ color: "hsl(20,15%,45%)" }}>
            Handcrafted treats taste even sweeter with our exclusive rewards.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offersList.map((o, i) => {
            const Icon = o.icon;
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div
                  className="rounded-3xl overflow-hidden border flex flex-col h-full"
                  style={{ background: "hsl(38,55%,99%)", borderColor: "hsl(30,25%,92%)", boxShadow: "0 4px 20px rgba(80,30,10,0.03)" }}
                  whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(80,30,10,0.06)" }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="p-8 text-white flex justify-between items-start" style={{ background: o.color }}>
                    <div>
                      <h3 className="font-serif text-2xl font-bold mb-1 opacity-90">{o.title}</h3>
                      <div className="text-4xl font-black tracking-tight">{o.value}</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-sm"><Icon size={24} /></div>
                  </div>
                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <p className="text-sm leading-relaxed mb-6" style={{ color: "hsl(20,15%,40%)" }}>{o.desc}</p>
                      <div className="flex items-center gap-2 text-xs font-semibold mb-6" style={{ color: "hsl(20,12%,50%)" }}>
                        <Clock size={14} className="text-rose-500" /> {o.time}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-2xl border border-dashed border-rose-200" style={{ background: "hsla(340,65%,60%,0.03)" }}>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: "hsl(20,12%,55%)" }}>Promo Code</span>
                        <div className="font-mono text-sm font-bold uppercase" style={{ color: "hsl(340,65%,50%)" }}>{o.code}</div>
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(o.code);
                          alert(`Code "${o.code}" copied to clipboard!`);
                        }}
                        className="text-xs font-bold px-4 py-2 rounded-xl text-rose-500 border border-rose-200 hover:bg-rose-50 active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <Tag size={12} /> Copy Code
                      </button>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </main>
  );
}
