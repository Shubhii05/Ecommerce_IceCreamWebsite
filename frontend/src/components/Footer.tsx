import { Link } from "wouter";
import { IceCream, MapPin, Clock, Phone } from "lucide-react";

const Instagram = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Facebook = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Twitter = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Offers", href: "/offers" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "hsl(20,25%,14%)" }} className="pt-16 pb-8 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 font-serif text-xl font-bold mb-4" style={{ color: "hsl(340,65%,65%)" }}>
              <IceCream size={20} />
              Scoops & Dreams
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "hsl(30,15%,55%)" }}>
              Small-batch, handcrafted gourmet ice cream made with love in the heart of Koramangala, Bengaluru. Because every scoop should tell a story.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  data-testid={`link-social-${label.toLowerCase()}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "hsla(340,65%,65%,0.15)", color: "hsl(340,65%,65%)" }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase mb-5" style={{ color: "hsl(340,65%,65%)" }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>
                    <span
                      className="text-sm transition-colors cursor-pointer hover:text-rose-400"
                      style={{ color: "hsl(30,15%,55%)" }}
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase mb-5" style={{ color: "hsl(340,65%,65%)" }}>
              Opening Hours
            </h4>
            <ul className="space-y-3">
              {[
                { day: "Mon – Fri", hours: "12:00 PM – 10:00 PM" },
                { day: "Saturday", hours: "11:00 AM – 11:00 PM" },
                { day: "Sunday", hours: "11:00 AM – 10:00 PM" },
              ].map(({ day, hours }) => (
                <li key={day} className="flex items-start gap-3">
                  <Clock size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(340,65%,65%)" }} />
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "hsl(38,40%,80%)" }}>{day}</div>
                    <div className="text-sm" style={{ color: "hsl(30,15%,55%)" }}>{hours}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase mb-5" style={{ color: "hsl(340,65%,65%)" }}>
              Find Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(340,65%,65%)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "hsl(30,15%,55%)" }}>
                  48, 80 Feet Rd, 4th Block,<br />Koramangala, Bengaluru, KA 560034
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="shrink-0" style={{ color: "hsl(340,65%,65%)" }} />
                <a href="tel:+919876543210" className="text-sm hover:text-rose-400 transition-colors" style={{ color: "hsl(30,15%,55%)" }}>
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "hsl(20,15%,22%)" }}>
          <p className="text-xs" style={{ color: "hsl(30,10%,40%)" }}>
            &copy; {new Date().getFullYear()} Scoops & Dreams. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((t) => (
              <a key={t} href="#" className="text-xs hover:text-rose-400 transition-colors" style={{ color: "hsl(30,10%,40%)" }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
