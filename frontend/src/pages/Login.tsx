import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, IceCream, Check, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useCart } from "@/context/CartContext";

export default function Login() {
  const { syncAfterLogin } = useCart();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError(""); // Clear error on change
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (form.password !== form.confirm) {
        setError("Passwords do not match");
        return;
      }
      if (form.password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
    }

    setSubmitted(true);

    try {
      if (mode === "signup") {
        await apiFetch<{ id: number; email: string }>("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ email: form.email, password: form.password }),
        });

        setSubmitted(false);
        setMode("login");
        setError("Account created! Please sign in with your credentials.");
      } else {
        const data = await apiFetch<{ token: string }>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: form.email, password: form.password }),
        });

        localStorage.setItem("scoops_token", data.token);
        localStorage.setItem(
          "scoops_user",
          JSON.stringify({ 
            name: form.name || form.email.split("@")[0], 
            email: form.email 
          })
        );

        // Sync the guest cart to the backend
        await syncAfterLogin();

        setTimeout(() => { 
          setSubmitted(false); 
          setLocation("/"); 
        }, 1200);
      }
    } catch (err: any) {
      setSubmitted(false);
      setError(err.message || (mode === "login" ? "Login failed" : "Registration failed"));
    }
  }

  return (
    <main className="min-h-screen pt-16 flex items-center justify-center px-6"
      style={{ background: "linear-gradient(150deg, hsl(38,80%,96%) 0%, hsl(340,55%,94%) 100%)" }}>
      {/* Background blobs */}
      {[
        { color: "hsl(340,65%,78%)", pos: "top-24 right-[15%]", size: "w-72 h-72", blur: 80 },
        { color: "hsl(30,70%,78%)", pos: "bottom-24 left-[10%]", size: "w-64 h-64", blur: 90 },
      ].map((b, i) => (
        <div key={i} className={`fixed rounded-full opacity-25 ${b.size} ${b.pos} pointer-events-none`}
          style={{ background: b.color, filter: `blur(${b.blur}px)` }} />
      ))}

      <motion.div className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <motion.span className="inline-flex items-center gap-2 font-serif text-2xl font-bold cursor-pointer"
              style={{ color: "hsl(340,65%,55%)" }} whileHover={{ scale: 1.04 }}>
              <IceCream size={24} /> Scoops & Dreams
            </motion.span>
          </Link>
        </div>

        <div className="p-8 rounded-3xl border border-rose-100 shadow-xl" style={{ background: "hsl(38,55%,99%)" }}>
          {/* Mode Toggle */}
          <div className="flex p-1 rounded-full mb-8 bg-stone-100">
            {(["login", "signup"] as const).map((m) => (
              <motion.button key={m} onClick={() => { setMode(m); setError(""); }}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold capitalize transition-all"
                style={mode === m ? { background: "white", color: "hsl(340,65%,55%)", boxShadow: "0 2px 10px rgba(80,30,10,0.06)" } : { color: "hsl(20,12%,55%)" }}
                whileTap={{ scale: 0.98 }} data-testid={`tab-${m}`}>
                {m === "login" ? "Sign In" : "Create Account"}
              </motion.button>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl flex items-start gap-2 text-xs border"
              style={{ 
                background: error.includes("created") || error.includes("Demo") ? "hsla(165,50%,50%,0.08)" : "hsla(340,65%,60%,0.08)",
                borderColor: error.includes("created") || error.includes("Demo") ? "hsl(165,50%,70%)" : "hsl(340,65%,80%)",
                color: error.includes("created") || error.includes("Demo") ? "hsl(165,50%,35%)" : "hsl(340,65%,45%)" 
              }}>
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.form key={mode} initial={{ opacity: 0, x: mode === "signup" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "hsl(20,20%,35%)" }}>Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-stone-50"
                    style={{ borderColor: "hsl(30,25%,88%)", color: "hsl(20,25%,20%)" }}
                    data-testid="input-name" />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "hsl(20,20%,35%)" }}>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-stone-50"
                  style={{ borderColor: "hsl(30,25%,88%)", color: "hsl(20,25%,20%)" }}
                  data-testid="input-email" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "hsl(20,20%,35%)" }}>Password</label>
                <div className="relative">
                  <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange}
                    placeholder="Min. 8 characters" required
                    className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none border bg-stone-50"
                    style={{ borderColor: "hsl(30,25%,88%)", color: "hsl(20,25%,20%)" }}
                    data-testid="input-password" />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "hsl(20,12%,55%)" }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "hsl(20,20%,35%)" }}>Confirm Password</label>
                  <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Repeat password" required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-stone-50"
                    style={{ borderColor: "hsl(30,25%,88%)", color: "hsl(20,25%,20%)" }}
                    data-testid="input-confirm" />
                </div>
              )}
              {mode === "login" && (
                <div className="text-right">
                  <a href="#" className="text-xs font-semibold hover:text-rose-500 transition-colors" style={{ color: "hsl(340,65%,55%)" }}>Forgot password?</a>
                </div>
              )}
              <motion.button type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-white mt-2 shadow"
                style={{ 
                  background: submitted ? "linear-gradient(135deg, hsl(165,50%,50%), hsl(165,50%,42%))" : "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))", 
                  boxShadow: submitted ? "0 6px 20px rgba(16,185,129,0.3)" : "0 6px 20px hsla(340,65%,55%,0.35)"
                }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                data-testid="button-submit">
                {submitted ? <><Check size={15} /> Authenticating...</> : mode === "login" ? "Sign In" : "Create Account"}
              </motion.button>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
}
