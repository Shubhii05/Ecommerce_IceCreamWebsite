import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo.svg";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Offers", href: "/offers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { count } = useCart();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    // Fetch logged in user if any
    const savedUser = localStorage.getItem("scoops_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("scoops_user");
    localStorage.removeItem("scoops_token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "hsla(40,60%,98%,0.95)" : "hsla(40,60%,98%,0.80)",
          backdropFilter: "blur(20px)",
          boxShadow: scrolled ? "0 2px 20px rgba(200,80,100,0.10)" : "none",
          borderBottom: scrolled ? "1px solid hsl(340,40%,90%)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" data-testid="link-logo">
            <motion.span
              className="flex items-center gap-2 cursor-pointer select-none"
              style={{ 
                color: "hsl(340,65%,55%)",
                fontFamily: '"Leckerli One", sans-serif',
                fontSize: "1.75rem",
                fontWeight: "100"
              }}
              whileHover={{ scale: 1.03 }}
            >
              <img src={logo} alt="Scoop" className="w-8 h-8" />
              Scoops
            </motion.span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {NAV.map(({ label, href }) => {
              const active = location === href || (href !== "/" && location.startsWith(href));
              return (
                <li key={href}>
                  <Link href={href}>
                    <motion.span
                      className="relative px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors block"
                      style={{ color: active ? "hsl(340,65%,55%)" : "hsl(20,20%,35%)" }}
                      whileHover={{ color: "hsl(340,65%,55%)" }}
                      data-testid={`nav-${label.toLowerCase()}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full"
                          style={{ background: "hsla(340,65%,60%,0.10)" }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {label}
                    </motion.span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link href="/cart" data-testid="link-cart">
              <motion.button
                className="relative p-2.5 rounded-full transition-all"
                style={{ background: "hsla(340,65%,60%,0.10)" }}
                whileHover={{ scale: 1.08, background: "hsla(340,65%,60%,0.18)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={20} style={{ color: "hsl(340,65%,55%)" }} />
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                    style={{ background: "hsl(340,65%,55%)" }}
                  >
                    {count}
                  </motion.span>
                )}
              </motion.button>
            </Link>
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm font-semibold" style={{ color: "hsl(20,20%,35%)" }}>Hi, {user.name}</span>
                <motion.button
                  onClick={handleLogout}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-rose-500 border border-rose-200 hover:bg-rose-50"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Sign Out
                </motion.button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:block" data-testid="link-login">
                <motion.button
                  className="px-5 py-2 rounded-full text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))", boxShadow: "0 4px 15px hsla(340,65%,60%,0.35)" }}
                  whileHover={{ scale: 1.05, boxShadow: "0 6px 20px hsla(340,65%,60%,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Sign In
                </motion.button>
              </Link>
            )}
            <button
              className="md:hidden p-2 rounded-full"
              style={{ color: "hsl(340,65%,55%)" }}
              onClick={() => setOpen((v) => !v)}
              data-testid="button-mobile-menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-16"
            style={{ background: "hsla(40,60%,98%,0.98)", backdropFilter: "blur(20px)" }}
          >
            <ul className="flex flex-col items-center justify-center gap-6 h-full pb-20">
              {NAV.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link href={href}>
                    <span className="font-serif text-3xl font-bold cursor-pointer" style={{ color: "hsl(20,25%,18%)" }}>
                      {label}
                    </span>
                  </Link>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <Link href="/cart">
                  <span className="font-serif text-3xl font-bold cursor-pointer" style={{ color: "hsl(340,65%,55%)" }}>
                    Cart {count > 0 && `(${count})`}
                  </span>
                </Link>
              </motion.li>
              {user ? (
                <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} onClick={handleLogout}>
                  <span className="font-serif text-3xl font-bold cursor-pointer text-rose-500">
                    Sign Out
                  </span>
                </motion.li>
              ) : (
                <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                  <Link href="/login">
                    <span className="font-serif text-3xl font-bold cursor-pointer" style={{ color: "hsl(340,65%,55%)" }}>
                      Sign In
                    </span>
                  </Link>
                </motion.li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
