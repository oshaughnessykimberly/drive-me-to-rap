import { useEffect, useRef, useState } from "react";
import { Play, ArrowDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const STILL_URL = "/manus-storage/dmtr-still_94698c2e.webp";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
      }}
    >
      {children}
    </div>
  );
}

function LetterboxBar({ position }: { position: "top" | "bottom" }) {
  return (
    <div
      className={`absolute left-0 right-0 h-[6vh] bg-black z-20 ${
        position === "top" ? "top-0" : "bottom-0"
      }`}
    />
  );
}

function CityGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

function Waveform({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 24" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {[...Array(40)].map((_, i) => {
        const h = 4 + Math.sin(i * 0.5) * 8 + Math.random() * 6;
        return (
          <rect
            key={i}
            x={i * 5}
            y={12 - h / 2}
            width="2"
            height={h}
            rx="1"
            fill="currentColor"
            opacity={0.3 + (i % 5) * 0.15}
          />
        );
      })}
    </svg>
  );
}

function DMTRStamp({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-lg px-4 py-2",
  };
  return (
    <span
      className={`inline-block font-mono-accent uppercase tracking-[0.2em] text-foreground ${sizes[size]}`}
    >
      DMTR
    </span>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="grain-overlay" />

      {/* ── Navigation ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:opacity-80 transition-opacity"
          >
            <DMTRStamp size="sm" />
          </button>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <button onClick={() => scrollTo("trailer")} className="hover:text-foreground transition-colors">
              Trailer
            </button>
            <button onClick={() => scrollTo("contact")} className="hover:text-foreground transition-colors">
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
          style={{
            backgroundImage: `url(${STILL_URL})`,
            transform: heroLoaded ? "scale(1)" : "scale(1.08)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
        <LetterboxBar position="top" />
        <LetterboxBar position="bottom" />

        <div className="relative z-30 h-full flex flex-col justify-center container">
          <div
            className="transition-all duration-1000 delay-300"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(40px)",
            }}
          >
            <h1 className="font-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] uppercase">
              <span className="text-outline-thick text-white">Drive Me</span>
              <br />
              <span className="text-outline-thick text-white">To Rap</span>
            </h1>
            <p className="mt-8 text-white/40 text-xs md:text-sm tracking-[0.2em] uppercase font-mono-accent">
              A Feature Film Rendered in Unreal Engine 5
            </p>
          </div>
        </div>

        <div className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 z-30 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/50" />
        </div>
      </section>

      {/* ── Trailer Section ── */}
      <section id="trailer" className="relative py-24 md:py-32">
        <div className="container">
          <Reveal delay={150}>
            <div className="relative aspect-video w-full max-w-5xl mx-auto bg-card border border-border overflow-hidden group">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/eBfMk8jtRzM?rel=0&modestbranding=1"
                title="Drive Me to Rap — Official Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-12 max-w-2xl mx-auto text-center text-muted-foreground text-sm md:text-base leading-relaxed">
              Desperation runs high as queer artists Sam and Oona chase a rap competition
              prize that could buy them out of dead-end jobs and other questionable ways
              of making ends meet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Grant / Press CTA ── */}
      <section id="contact" className="relative py-24 md:py-32 bg-card/50">
        <div className="container text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl mb-12 uppercase text-outline-thick text-white">
              Contact
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-sm tracking-[0.2em] uppercase font-mono-accent">For Grant & Festival Inquiries</p>
              <p className="text-lg">toocreativesprod@gmail.com</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-12">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            A feature film rendered in Unreal Engine 5. For grant & festival consideration.
          </p>
        </div>
      </footer>
    </div>
  );
}
