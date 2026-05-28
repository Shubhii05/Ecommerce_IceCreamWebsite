import { useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star, Clock } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import heroCutout from "@/assets/hero-cutout.png";
import o from "@/assets/OIP.webp";

function FadeIn({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function RetroSparkle({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={{ color }}>
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="15"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="85"
        y2="28"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="70"
        y2="78"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="30"
        y2="78"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="15"
        y2="28"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  const { addItem } = useCart();
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);
  const [heroQty, setHeroQty] = useState(1);

  const heroProducts = PRODUCTS.slice(0, 3);
  const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ background: "hsl(40,60%,97%)" }}
    >
      {/* HERO SECTION */}
      <section
        className="scoops-hero relative w-full flex flex-col items-center justify-center overflow-visible pb-10"
        style={{
          background: "#fcf9f2",
          border: "36px solid #e8a3a9",
          boxSizing: "border-box",
          marginTop: "64px" /* clear fixed navbar (h-16 = 64px) */,
          paddingTop: "60px" /* inner breathing room above content */,
        }}
      >
        {/* Soft Background Blur Blobs */}
        <div
          className="absolute top-1/4 right-[10%] w-[35vw] h-[35vw] rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(340,65%,80%) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-10 left-[5%] w-[25vw] h-[25vw] rounded-full opacity-[0.06] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(165,50%,80%) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Main Content Layout Container */}
        <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col justify-between overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-center w-full flex-1">
            {/* LEFT COLUMN: TITLE & PLAYFUL OVAL/PILL CARD */}
            <div className="lg:col-span-3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-full">
              {/* Title */}
              <div className="relative mb-2 lg:mb-8 select-none">
                <RetroSparkle className="absolute -top-12 -left-8 w-14 h-14 text-rose-500/80 rotate-[15deg]" />
                <RetroSparkle className="absolute top-2 -right-10 w-12 h-12 text-[#52b788]/80 rotate-[-20deg]" />
                <RetroSparkle className="absolute -bottom-10 left-24 w-10 h-10 text-amber-500/80 rotate-[45deg]" />

                <h1 className="leading-none tracking-tight text-stone-850">
                  <span className="retro-title-sticker-brown-pacifico text-6xl md:text-7xl block transform -rotate-[4deg] pt-4 pb-2 px-3">
                    Scoops of
                  </span>

                  <span className="retro-title-sticker-brown-pacifico text-6xl md:text-7xl block transform rotate-[-3deg] mt-1 pt-2 pb-4 px-3">
                    Happiness!
                  </span>
                </h1>
              </div>

              {/* Pill Image Card */}
              <motion.div
                className="relative mt-4 hidden w-60 h-72 lg:block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Starburst Shape */}
                <div className="absolute left-[52%] top-1/2 -translate-y-1/2 w-[320px] h-[320px] text-[#eddcb9]/80 fill-current opacity-90 pointer-events-none z-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M50,5 
             C53,30 65,15 70,38 
             C80,25 78,42 95,50 
             C78,58 80,75 70,62 
             C65,85 53,70 50,95 
             C47,70 35,85 30,62 
             C20,75 22,58 5,50 
             C22,42 20,25 30,38 
             C35,15 47,30 50,5 Z"
                    />
                  </svg>
                </div>

                {/* Pill Wrapper */}
                <div className="absolute inset-0 flex items-center justify-end pr-4 z-10">
                  {/* Oval Pill */}
                  <div className="relative w-40 h-60 rounded-[999px] overflow-hidden shadow-2xl group cursor-pointer bg-[#fcf9f2] border border-stone-200">
                    <img
                      src="https://images.unsplash.com/photo-1514849302-984523450cf4?q=80&w=987&auto=format&fit=crop"
                      alt="Delicious scoop treats"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* MIDDLE COLUMN: CENTER HERO */}
            <div className="lg:col-span-5 flex items-center justify-center py-0 lg:py-0">
              <motion.div
                className="hero-center-stage relative flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* ── Arch background (dome top, straight sides) ── */}
                <svg
                  className="hero-arch-bg"
                  style={{
                    position: "absolute",
                    bottom: "0px",
                    left: "55%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                    overflow: "visible",
                  }}
                  width="290"
                  height="520"
                  viewBox="0 0 290 520"
                >
                  <path
                    d="
          M 0 145
          A 145 145 0 0 1 290 145
          L 290 430
          A 145 90 0 0 1 0 430
          Z
        "
                    fill="#efb2bb"
                  />
                </svg>

                {/* ── Arch text: top of dome only ── */}
                <svg
                  className="hero-arch-text"
                  style={{
                    position: "absolute",
                    bottom: "-70px",
                    left: "55%",
                    transform: "translateX(-50%)",
                    zIndex: 6,
                    pointerEvents: "none",
                    overflow: "visible",
                  }}
                  width="370"
                  height="480"
                  viewBox="0 0 370 480"
                >
                  <defs>
                    <path
                      id="archTextPath"
                      d="M 30 30 A 155 155 0 0 1 340 30"
                      fill="none"
                    />
                  </defs>
                  <text
                    fill="#7b665c"
                    fontSize="10"
                    fontWeight="600"
                    letterSpacing="2.5"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                  >
                    <textPath
                      href="#archTextPath"
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      DIVE INTO DELICIOUSNESS • DIVE INTO DELICIOUSNESS
                    </textPath>
                  </text>
                </svg>

                {/* ── Ice cream image ── */}
                <motion.img
                  src={heroCutout}
                  alt="Ice Cream"
                  className="hero-main-icecream"
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    objectFit: "cover",
                    objectPosition: "center 0%",
                    left: "auto",
                    right: "auto",
                    clipPath: "inset(0px 0px 74px 0px)",
                  }}
                  whileHover={{ scale: 1.03 }}
                />
              </motion.div>
            </div>

            {/* RIGHT COLUMN: DETAIL DESCRIPTIONS & PRODUCTS CAROUSEL */}
            <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-full">
              <motion.div
                className="max-w-md w-full"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Profile avatar & seal */}
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <img
                    src={o}
                    className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover bg-[#fcf9f2]"
                    style={{ objectPosition: "35% 12%" }}
                    alt="Ice cream scoop"
                  />

                  {/* Circular Stamp Seal stamp with Arrow */}
                  <Link
                    to="/gallery"
                    className="relative w-16 h-16 flex-shrink-0 hover:scale-105 transition cursor-pointer"
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full animate-[spin_20s_linear_infinite]"
                    >
                      <path
                        id="badgePath"
                        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                        fill="none"
                      />

                      <text
                        fill="hsl(20,15%,45%)"
                        className="font-sans text-[7.5px] font-extrabold uppercase tracking-[1.5px]"
                      >
                        <textPath href="#badgePath" startOffset="0%">
                          THE TASTE! COME TO OUR SHOP AND CHOOSE •
                        </textPath>
                      </text>
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border border-stone-200/80 flex items-center justify-center bg-white shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          className="w-3.5 h-3.5 text-stone-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>

                <h3 className="font-serif text-3xl font-black mb-2 text-[#2C1E1B] tracking-tight">
                  #Dream in Every Bite
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4 font-sans"
                  style={{ color: "hsl(20,15%,25%)" }}
                >
                  Experience premium slow-churned Indian fusion ice cream made
                  with pure pasture-fed dairy and organic spices. Pure luxury in
                  every single scoop.
                </p>

                {/* Horizontal product selector carousel with side arrows */}
                <div className="relative flex items-center justify-center w-full my-6 bg-[#f7efe2]/60 backdrop-blur-sm p-1.5 rounded-[28px] border border-stone-200/80">
                  {/* Left Arrow Button */}
                  <button
                    onClick={() =>
                      setSelectedHeroIndex((prev) =>
                        prev === 0 ? heroProducts.length - 1 : prev - 1,
                      )
                    }
                    className="absolute left-2 z-20 w-8 h-8 rounded-full bg-white border border-stone-200/60 flex items-center justify-center shadow-sm hover:bg-stone-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                      className="w-4 h-4 text-stone-655"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>

                  {/* Cards Container */}
                  <div className="flex items-center justify-center gap-3 w-full px-8 overflow-hidden py-1">
                    {heroProducts.map((p, idx) => {
                      const isSelected = selectedHeroIndex === idx;
                      return (
                        <motion.div
                          key={p.id}
                          onClick={() => setSelectedHeroIndex(idx)}
                          className={`w-24 p-2 rounded-[20px] border bg-white cursor-pointer transition-all duration-300 flex flex-col items-center select-none ${
                            isSelected
                              ? "border-[#e14d76] shadow-sm scale-105"
                              : "border-stone-100 opacity-75 hover:opacity-100"
                          }`}
                          whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                        >
                          {/* Circular Scoop Image */}
                          <div className="w-12 h-12 rounded-[14px] overflow-hidden mb-1.5 border border-[#2C1E1B]/10">
                            <img
                              src={p.image}
                              className="w-full h-full object-cover"
                              alt={p.name}
                            />
                          </div>
                          {/* Product Label */}
                          <span className="text-[9px] font-extrabold text-stone-850 text-center line-clamp-1 w-full leading-tight mb-1">
                            {p.name.split(" ")[1] || p.name.split(" ")[0]}
                          </span>
                          {/* Price Tag */}
                          <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-rose-50 text-[#e14d76] border border-rose-100/50">
                            ₹{p.price.toFixed(0)}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Right Arrow Button */}
                  <button
                    onClick={() =>
                      setSelectedHeroIndex((prev) =>
                        prev === heroProducts.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="absolute right-2 z-20 w-8 h-8 rounded-full bg-white border border-stone-200/60 flex items-center justify-center shadow-sm hover:bg-stone-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                      className="w-4 h-4 text-stone-655"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>

                {/* Add to Cart panel with quantity modifiers */}
                <div className="flex items-center justify-between gap-4 p-2 rounded-full border border-stone-200/80 bg-white/80 backdrop-blur-sm shadow-md">
                  <div className="flex items-center gap-3 px-4">
                    <button
                      onClick={() => setHeroQty(Math.max(1, heroQty - 1))}
                      className="w-7 h-7 rounded-full bg-stone-100 border border-stone-200/60 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-200"
                    >
                      -
                    </button>
                    <span className="font-extrabold text-sm text-stone-850 w-4 text-center">
                      {heroQty}
                    </span>
                    <button
                      onClick={() => setHeroQty(heroQty + 1)}
                      className="w-7 h-7 rounded-full bg-stone-100 border border-stone-200/60 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-200"
                    >
                      +
                    </button>
                  </div>
                  <motion.button
                    onClick={() => {
                      const prod = heroProducts[selectedHeroIndex];
                      for (let q = 0; q < heroQty; q++) {
                        addItem(prod, prod.flavors[0], []);
                      }
                      alert(`Added ${heroQty}x ${prod.name} to your Cart!`);
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-black text-white flex-1 hover:bg-[#3d2a26] transition-colors shadow-sm"
                    style={{ background: "#2C1E1B" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS FLOATING BADGES */}
      <section className="px-6 py-12 max-w-7xl mx-auto -mt-6">
        <FadeIn className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              value: "500+",
              label: "Happy regulars",
              desc: "Serving smiles daily in Koramangala, Bengaluru",
            },
            {
              value: "38+",
              label: "Flavors a year",
              desc: "Fresh, seasonal variations",
            },
            {
              value: "10+",
              label: "Years of craft",
              desc: "Family recipe perfected over time",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl text-center shadow-sm border border-[#2C1E1B]/15"
              style={{ background: "hsl(38,55%,99%)" }}
            >
              <div
                className="font-chewy text-4xl font-extrabold mb-1"
                style={{ color: "hsl(340,65%,55%)" }}
              >
                {s.value}
              </div>
              <div
                className="text-sm font-bold uppercase tracking-wider mb-1"
                style={{ color: "#2C1E1B" }}
              >
                {s.label}
              </div>
              <div className="text-xs" style={{ color: "hsl(20,12%,45%)" }}>
                {s.desc}
              </div>
            </div>
          ))}
        </FadeIn>
      </section>

      {/* CHOOSE YOUR FLAVOR DRIP PANEL (Themed from Second Image & Includes actual Mockup 2 Image) */}
      <section className="px-6 py-20 max-w-7xl mx-auto border-t border-[#2C1E1B]/10">
        <div className="text-center mb-16 relative">
          <RetroSparkle className="absolute -top-6 left-1/4 w-10 h-10 text-amber-450/70 rotate-[15deg]" />
          <RetroSparkle className="absolute -top-4 right-1/4 w-10 h-10 text-rose-450/70 rotate-[-15deg]" />

          <FadeIn>
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1.5 rounded-full border border-[#52b788]/20"
              style={{ background: "rgba(82,183,136,0.12)", color: "#40916c" }}
            >
              Premium Add-ons
            </span>
            <h2 className="text-5xl font-bold font-chewy text-stone-850 tracking-wide">
              <span className="retro-title-sticker-brown mr-3">
                Choose Your
              </span>
              <span className="retro-title-sticker-rose">Flavor Drip</span>
            </h2>
            <p
              className="text-xs max-w-md mx-auto mt-4 font-sans"
              style={{ color: "hsl(20,15%,35%)" }}
            >
              Drizzle a decadent syrup layer over your customized scoop order.
              Inspired by our fresh daily churn toppings.
            </p>
          </FadeIn>
        </div>

        {/* 2-Column Split: Left displays the user's second image; Right displays the interactive flavor drips */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN: The actual flavor_drips.jpg (Second Image) rendered beautifully in a Polaroid frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <FadeIn delay={0.1}>
              <div className="bg-white p-4 pb-8 rounded-3xl border border-stone-200 shadow-xl rotate-[-2deg] max-w-sm w-full relative">
                {/* Cute piece of handwritten tape decoration */}
                <div className="absolute -top-4 left-1/3 px-6 py-1.5 bg-[#fbf5e6]/95 border border-stone-200/80 font-chewy text-xs text-stone-600 rotate-[5deg] shadow-sm">
                  ★ Churn Aesthetics ★
                </div>

                {/* Polaroid Image Viewport */}
                <div className="rounded-2xl overflow-hidden border border-stone-150/60 bg-stone-100 aspect-square">
                  <img
                    src="/flavor_drips.jpg"
                    alt="Original Flavor Drips Palette"
                    className="w-full h-full object-cover grayscale-0 hover:scale-102 transition-transform duration-500"
                  />
                </div>

                {/* Caption block */}
                <div className="mt-4 text-center font-pacifico text-rose-500 text-base">
                  Classic Daily Drip Aesthetics
                </div>
                <div className="text-[10px] text-center font-sans text-stone-500 mt-1 uppercase tracking-wider">
                  Honey • Strawberry • Lime • Chocolate
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: The 4 interactive syrup toppings selector grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                name: "Golden Honey Drip",
                desc: "100% wild organic forest honey. Slow-dripped with crunchy raw cashews.",
                color: "#ffa726",
                accentBg: "rgba(255,167,38,0.08)",
                dripBorder: "border-[#ffa726]",
              },
              {
                name: "Rose Strawberry Drip",
                desc: "Fresh reduced strawberry puree blended with sweet traditional gulkand.",
                color: "#e91e63",
                accentBg: "rgba(233,30,99,0.08)",
                dripBorder: "border-[#e91e63]",
              },
              {
                name: "Zesty Lime Drip",
                desc: "Refreshing garden lime mint syrup to create a splash of citrus contrast.",
                color: "#8bc34a",
                accentBg: "rgba(139,195,74,0.08)",
                dripBorder: "border-[#8bc34a]",
              },
              {
                name: "Belgian Chocolate Drip",
                desc: "Silky, warm dark chocolate syrup made with premium 70% cocoa fudge.",
                color: "#5d4037",
                accentBg: "rgba(93,64,55,0.08)",
                dripBorder: "border-[#5d4037]",
              },
            ].map((d, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div
                  className="group p-5 rounded-3xl border border-stone-200 flex flex-col justify-between h-[230px] relative overflow-hidden cursor-pointer bg-white"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px rgba(44,30,27,0.04)",
                  }}
                >
                  {/* Dripping SVG shape at the top of the card */}
                  <div className="absolute top-0 left-0 w-full h-5 overflow-hidden opacity-90 transition-all duration-300 group-hover:h-6 pointer-events-none">
                    <svg
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                      className="w-full h-full"
                      style={{ fill: d.color }}
                    >
                      <path d="M0,0 L100,0 L100,10 C90,15 80,5 70,12 C60,18 50,8 40,15 C30,22 20,10 10,16 C5,19 0,12 0,12 Z" />
                    </svg>
                  </div>

                  <div className="mt-5 flex-1">
                    <h3 className="font-serif text-base font-black mt-2 mb-1.5 text-stone-850">
                      {d.name}
                    </h3>
                    <p
                      className="text-[11px] leading-normal font-sans"
                      style={{ color: "hsl(20,10%,45%)" }}
                    >
                      {d.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span
                      className="font-extrabold text-[10px] uppercase tracking-wider"
                      style={{ color: d.color }}
                    >
                      Syrup
                    </span>
                    <motion.button
                      onClick={() => {
                        addItem(
                          {
                            id: `drip-${i}`,
                            name: d.name,
                            description: `Decadent ${d.name} topping addon.`,
                            price: 30,
                            rating: 5,
                            reviews: 1,
                            image:
                              "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=100&q=80",
                            category: "Seasonal",
                            flavors: ["Regular"],
                            toppings: [],
                          },
                          "Regular",
                          [],
                        );
                        alert(`Added ${d.name} (₹30) to your Cart!`);
                      }}
                      className="text-[10px] font-black px-3.5 py-1.5 rounded-full text-white shadow-sm"
                      style={{ background: d.color }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      + Add ₹30
                    </motion.button>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
          <FadeIn>
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1.5 rounded-full border border-rose-200"
              style={{
                background: "hsla(340,65%,60%,0.12)",
                color: "hsl(340,65%,50%)",
              }}
            >
              Featured
            </span>
            <h2 className="text-5xl font-bold font-chewy tracking-wide select-none">
              <span className="retro-title-sticker-brown mr-3">Best</span>
              <span className="retro-title-sticker-rose">Sellers</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/menu">
              <span
                className="text-sm font-semibold flex items-center gap-1.5 cursor-pointer hover:text-rose-500 transition-colors"
                style={{ color: "hsl(340,65%,55%)" }}
              >
                View full menu <ArrowRight size={15} />
              </span>
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.1}>
              <Link href={`/menu/${product.id}`}>
                <motion.div
                  className="group rounded-3xl overflow-hidden cursor-pointer h-full flex flex-col border"
                  style={{
                    background: "hsl(38,55%,99%)",
                    borderColor: "hsl(30,25%,92%)",
                    boxShadow: "0 4px 20px rgba(80,30,10,0.04)",
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 12px 36px rgba(80,30,10,0.08)",
                    borderColor: "hsl(340,40%,88%)",
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    {product.badge && (
                      <span
                        className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,48%))",
                        }}
                      >
                        {product.badge}
                      </span>
                    )}
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1 text-white text-xs font-semibold px-2 py-1 rounded-full"
                      style={{ background: "rgba(0,0,0,0.3)" }}
                    >
                      <Star size={10} fill="currentColor" /> {product.rating}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div
                      className="text-xs font-semibold tracking-wide uppercase mb-1"
                      style={{ color: "hsl(340,65%,55%)" }}
                    >
                      {product.category}
                    </div>
                    <h3
                      className="font-serif text-base font-bold mb-1.5 flex-1 group-hover:text-rose-500 transition-colors"
                      style={{ color: "hsl(20,25%,18%)" }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-xs leading-relaxed mb-4 line-clamp-2"
                      style={{ color: "hsl(20,12%,50%)" }}
                    >
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span
                        className="font-bold text-sm"
                        style={{ color: "hsl(20,25%,18%)" }}
                      >
                        ₹{product.price.toFixed(0)}
                        {product.originalPrice && (
                          <span
                            className="text-xs line-through ml-1"
                            style={{ color: "hsl(20,12%,65%)" }}
                          >
                            ₹{product.originalPrice.toFixed(0)}
                          </span>
                        )}
                      </span>
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          addItem(product, product.flavors[0], []);
                        }}
                        className="text-xs font-bold px-4 py-1.5 rounded-full text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))",
                          boxShadow: "0 3px 12px hsla(340,65%,55%,0.25)",
                        }}
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        + Add
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* TODAY'S OFFERS */}
      <section className="px-6 py-20" style={{ background: "hsl(20,25%,14%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <FadeIn>
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1.5 rounded-full text-rose-300 border border-rose-300/30"
                style={{ background: "hsla(340,65%,65%,0.15)" }}
              >
                Save Big
              </span>
              <h2 className="text-5xl font-bold font-chewy tracking-wide select-none">
                <span className="retro-title-sticker-yellow mr-3">Today's</span>
                <span className="retro-title-sticker-green">Offers</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link href="/offers">
                <span className="text-sm font-semibold flex items-center gap-1.5 cursor-pointer text-rose-300 hover:text-white transition-colors">
                  All offers <ArrowRight size={15} />
                </span>
              </Link>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                badge: "Daily Deal",
                title: "20% off",
                subtitle: "Happy Hour",
                desc: "All single scoops and cones at 20% off during happy hour (3 PM – 5 PM). The sweetest part of your afternoon.",
                badgeBg: "hsla(340,65%,60%,0.2)",
                bg: "linear-gradient(135deg, hsl(340,70%,65%), hsl(340,65%,55%))",
              },
              {
                badge: "Combo Deal",
                title: "Save ₹50",
                subtitle: "Summer Sundae Combo",
                desc: "Pair any signature sundae with a hand-spun milkshake and save ₹50. Because one dessert is never enough in summer.",
                badgeBg: "hsla(45,70%,60%,0.2)",
                bg: "linear-gradient(135deg, hsl(35,85%,62%), hsl(30,75%,52%))",
              },
              {
                badge: "Birthday Treat",
                title: "Free scoop",
                subtitle: "Birthday Special",
                desc: "Show us your ID on your birthday and get a free double scoop cone on us. Because birthdays should always be sweet.",
                badgeBg: "hsla(260,70%,65%,0.2)",
                bg: "linear-gradient(135deg, hsl(255,50%,65%), hsl(255,45%,55%))",
              },
            ].map((o, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  className="p-8 rounded-3xl text-white flex flex-col justify-between h-[360px]"
                  style={{
                    background: o.bg,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
                  }}
                >
                  <div>
                    <span
                      className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6"
                      style={{ background: o.badgeBg }}
                    >
                      {o.badge}
                    </span>
                    <h3 className="text-4xl font-extrabold mb-1 font-serif">
                      {o.title}
                    </h3>
                    <h4 className="text-lg font-bold mb-4">{o.subtitle}</h4>
                    <p className="text-sm opacity-90 leading-relaxed">
                      {o.desc}
                    </p>
                  </div>
                  <div className="text-xs uppercase tracking-widest font-bold mt-4 opacity-80 flex items-center gap-1.5">
                    Ongoing <Clock size={12} />
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <RetroSparkle className="absolute -top-6 left-1/3 w-9 h-9 text-rose-400 rotate-[15deg]" />
          <RetroSparkle className="absolute -top-4 right-1/3 w-9 h-9 text-[#52b788] rotate-[-15deg]" />
          <FadeIn>
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1.5 rounded-full border border-rose-200"
              style={{
                background: "hsla(340,65%,60%,0.12)",
                color: "hsl(340,65%,50%)",
              }}
            >
              Love notes
            </span>
            <h2 className="text-5xl font-bold font-chewy tracking-wide select-none">
              <span className="retro-title-sticker-brown mr-3">
                What Regulars
              </span>
              <span className="retro-title-sticker-rose">Say</span>
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              text: "I've lived in this neighborhood for twelve years. Scoops & Dreams is the reason I'll never leave. The Royal Kesar Pista cone is absolute genius.",
              author: "Meera R.",
              role: "Koramangala, Bengaluru",
              img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
            },
            {
              text: "The Tender Coconut scoop changed my entire understanding of what ice cream can be. I've been back every single week since they opened.",
              author: "Jayesh T.",
              role: "Bandra, Mumbai",
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
            },
            {
              text: "My kids would gladly trade their birthday presents for a single double scoop of the Jamun Sorbet. It's just that exceptionally good.",
              author: "Priyanka L.",
              role: "Indiranagar, Bengaluru",
              img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
            },
          ].map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="p-8 rounded-3xl shadow-sm border flex flex-col justify-between h-full"
                style={{
                  background: "hsl(38,55%,99%)",
                  borderColor: "hsl(30,25%,92%)",
                }}
              >
                <div>
                  <div className="flex gap-0.5 mb-6 text-rose-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p
                    className="text-sm italic leading-relaxed mb-8"
                    style={{ color: "hsl(20,15%,35%)" }}
                  >
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.author}
                    className="w-11 h-11 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <h4
                      className="font-bold text-sm"
                      style={{ color: "hsl(20,25%,18%)" }}
                    >
                      {t.author}
                    </h4>
                    <span
                      className="text-xs"
                      style={{ color: "hsl(20,12%,55%)" }}
                    >
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <FadeIn>
          <div
            className="p-12 md:p-20 rounded-[40px] text-white text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,48%))",
              boxShadow: "0 20px 50px hsla(340,65%,55%,0.3)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, white 10%, transparent 11%)`,
                backgroundSize: "24px 24px",
              }}
            />
            <div className="max-w-2xl mx-auto relative z-10">
              <h2 className="font-chewy text-5xl md:text-6xl font-black mb-8 leading-tight tracking-wide select-none">
                <span className="retro-title-sticker-yellow block sm:inline mr-3">
                  Ready for the
                </span>
                <span className="retro-title-sticker-rose block sm:inline">
                  Best Scoop?
                </span>
              </h2>
              <p className="text-base md:text-lg mb-10 opacity-90 leading-relaxed font-sans">
                Visit our cozy shop in Koramangala or browse our menu online and
                customize your toppings. Handcrafted dreams await you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/menu">
                  <motion.button
                    className="px-8 py-4 rounded-full text-sm font-bold bg-white text-rose-600 shadow-lg"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(255,255,255,0.25)",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Order Now
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    className="px-8 py-4 rounded-full text-sm font-semibold border-2 border-white/40 hover:border-white text-white bg-transparent"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Find Us
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
