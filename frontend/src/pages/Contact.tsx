import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MapPin, Clock, Send, Check } from "lucide-react";

function FadeIn({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className} style={style}>{children}</motion.div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  return (
    <main className="min-h-screen pt-16" style={{ background: "hsl(40,60%,97%)" }}>
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-6 text-center"
        style={{ background: "linear-gradient(150deg, hsl(340,40%,94%) 0%, hsl(30,60%,95%) 100%)" }}>
        <motion.div className="absolute top-0 right-1/3 w-72 h-72 rounded-full opacity-25"
          style={{ background: "hsl(30,70%,78%)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full"
            style={{ background: "hsla(340,65%,60%,0.12)", color: "hsl(340,65%,50%)" }}>Say Hello</span>
          <h1 className="font-serif text-6xl font-bold mb-4" style={{ color: "hsl(20,25%,18%)" }}>Get in Touch</h1>
          <p className="text-lg max-w-lg mx-auto" style={{ color: "hsl(20,15%,45%)" }}>
            Got a flavor request, feedback, or a catering inquiry? We would love to hear from you.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Info Card 1 */}
          <FadeIn className="p-8 rounded-3xl border shadow-sm flex items-start gap-4" style={{ background: "hsl(38,55%,99%)", borderColor: "hsl(30,25%,92%)" }}>
            <div className="p-3.5 rounded-2xl text-rose-500 shrink-0" style={{ background: "hsla(340,65%,60%,0.10)" }}><MapPin size={22} /></div>
            <div>
              <h3 className="font-serif text-lg font-bold mb-2" style={{ color: "hsl(20,25%,18%)" }}>Visit Us</h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(20,15%,45%)" }}>
                48, 80 Feet Rd, 4th Block,<br />
                Koramangala, Bengaluru, KA 560034
              </p>
            </div>
          </FadeIn>

          {/* Info Card 2 */}
          <FadeIn delay={0.05} className="p-8 rounded-3xl border shadow-sm flex items-start gap-4" style={{ background: "hsl(38,55%,99%)", borderColor: "hsl(30,25%,92%)" }}>
            <div className="p-3.5 rounded-2xl text-rose-500 shrink-0" style={{ background: "hsla(340,65%,60%,0.10)" }}><Clock size={22} /></div>
            <div>
              <h3 className="font-serif text-lg font-bold mb-2" style={{ color: "hsl(20,25%,18%)" }}>Opening Hours</h3>
              <ul className="text-sm space-y-1" style={{ color: "hsl(20,15%,45%)" }}>
                <li><span className="font-semibold" style={{ color: "hsl(20,25%,20%)" }}>Mon – Fri:</span> 12:00 PM – 10:00 PM</li>
                <li><span className="font-semibold" style={{ color: "hsl(20,25%,20%)" }}>Saturday:</span> 11:00 AM – 11:00 PM</li>
                <li><span className="font-semibold" style={{ color: "hsl(20,25%,20%)" }}>Sunday:</span> 11:00 AM – 10:00 PM</li>
              </ul>
            </div>
          </FadeIn>

          {/* Info Card 3 */}
          <FadeIn delay={0.1} className="p-8 rounded-3xl border shadow-sm flex items-start gap-4" style={{ background: "hsl(38,55%,99%)", borderColor: "hsl(30,25%,92%)" }}>
            <div className="p-3.5 rounded-2xl text-rose-500 shrink-0" style={{ background: "hsla(340,65%,60%,0.10)" }}><Phone size={22} /></div>
            <div>
              <h3 className="font-serif text-lg font-bold mb-2" style={{ color: "hsl(20,25%,18%)" }}>Call / Mail</h3>
              <ul className="text-sm space-y-1.5" style={{ color: "hsl(20,15%,45%)" }}>
                <li>
                  <a href="tel:+919876543210" className="hover:text-rose-500 transition-colors font-semibold" style={{ color: "hsl(20,25%,20%)" }}>
                    +91 98765 43210
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@scoopsanddreams.com" className="hover:text-rose-500 transition-colors" style={{ color: "hsl(20,15%,45%)" }}>
                    hello@scoopsanddreams.com
                  </a>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <FadeIn className="p-8 rounded-3xl border shadow-sm" style={{ background: "hsl(38,55%,99%)", borderColor: "hsl(30,25%,92%)" }}>
            <h3 className="font-serif text-2xl font-bold mb-6" style={{ color: "hsl(20,25%,18%)" }}>Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "hsl(20,20%,35%)" }}>Your Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-stone-50"
                    style={{ borderColor: "hsl(30,25%,88%)", color: "hsl(20,25%,20%)" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "hsl(20,20%,35%)" }}>Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-stone-50"
                    style={{ borderColor: "hsl(30,25%,88%)", color: "hsl(20,25%,20%)" }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "hsl(20,20%,35%)" }}>Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Catering, feedback, bulk orders..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-stone-50"
                  style={{ borderColor: "hsl(30,25%,88%)", color: "hsl(20,25%,20%)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "hsl(20,20%,35%)" }}>Message</label>
                <textarea name="message" rows={5} value={form.message} onChange={handleChange} required placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-stone-50 resize-none"
                  style={{ borderColor: "hsl(30,25%,88%)", color: "hsl(20,25%,20%)" }} />
              </div>
              <motion.button type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-white mt-4 shadow"
                style={{ 
                  background: sent ? "linear-gradient(135deg, hsl(165,50%,50%), hsl(165,50%,42%))" : "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))",
                  boxShadow: sent ? "0 4px 15px rgba(16,185,129,0.25)" : "0 4px 15px hsla(340,65%,60%,0.25)" 
                }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {sent ? <><Check size={16} /> Message Sent!</> : <><Send size={15} /> Send Message</>}
              </motion.button>
            </form>
          </FadeIn>

          {/* Local Map placeholder */}
          <FadeIn delay={0.1} className="relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto h-full border shadow-sm" style={{ borderColor: "hsl(30,25%,92%)" }}>
            <iframe 
              title="Scoops & Dreams Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5830919102434!2d77.62002367469792!3d12.934484087377464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144e3e3b33df%3A0x6b4f74d0107e3247!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1716390000000!5m2!1sen!2sin"
              className="w-full h-full border-none"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
