import { useEffect, useRef, useState } from "react";
import { Play, ArrowDown, Film, Cpu, Award, Mail, MapPin, Music } from "lucide-react";
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
      className={`inline-block font-mono-accent uppercase tracking-[0.2em] border border-foreground/40 text-foreground ${sizes[size]}`}
      style={{ clipPath: "polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)" }}
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
            <button onClick={() => scrollTo("synopsis")} className="hover:text-foreground transition-colors">
              Synopsis
            </button>
            <button onClick={() => scrollTo("craft")} className="hover:text-foreground transition-colors">
              The Craft
            </button>
            <button onClick={() => scrollTo("contact")} className="hover:text-foreground transition-colors">
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative h-screen w-full overflow-hidden">
        <CityGrid />
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

        <div className="relative z-30 h-full flex flex-col justify-end pb-[10vh] container">
          <div
            className="transition-all duration-1000 delay-300"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(40px)",
            }}
          >
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.9] uppercase">
              Drive Me
              <br />
              <span className="text-outline-thick text-white">To Rap</span>
            </h1>
            <p className="mt-6 text-white/40 text-xs md:text-sm tracking-[0.2em] uppercase font-mono-accent">
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
        <CityGrid />
        <div className="container">
          <Reveal delay={150}>
            <div className="relative aspect-video w-full max-w-5xl mx-auto bg-card border border-border overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                style={{ backgroundImage: `url(${STILL_URL})` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => toast.info("Trailer embed placeholder — paste your video URL here when ready.")}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-black" />
              <div className="absolute top-0 left-0 right-0 h-[8%] bg-black" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Synopsis ── */}
      <section id="synopsis" className="relative py-24 md:py-32 bg-card/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary text-sm tracking-[0.25em] uppercase font-medium">
                Synopsis
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95] uppercase">
              One City.
              <br />
              One Beat.
              <br />
              <span className="text-outline text-white">One Voice.</span>
            </h2>
          </Reveal>
            <Reveal delay={200}>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-foreground font-medium">She drives. She writes. She waits.</span>{" "}
                  By day, the city moves through her back seat — strangers, stories, silence.
                  By night, she fills notebooks with verses no one has heard. Then one ride
                  changes the meter: a passenger who hears the beat she's been too afraid
                  to play out loud.
                </p>
                <p>
                  Rendered entirely in <span className="text-foreground font-medium">Unreal Engine 5</span>,
                  the film moves like the city itself — concrete and neon, grid and groove.
                  Photoreal streets meet painterly skin. The frame breathes with the rhythm
                  of a voice finding its volume.
                </p>
                <p>
                  This is not a story about becoming famous. It's about becoming audible.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Craft / UE5 ── */}
      <section id="craft" className="relative py-24 md:py-32">
        <CityGrid />
        <div className="container">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-primary" />
              <span className="text-primary text-sm tracking-[0.25em] uppercase font-medium">
                Under the Hood
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl mb-12 uppercase">
              Rendered in <span className="text-outline text-white">Real Time</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "The City as Set",
                desc: "Every block was built as a navigable 3D environment. The director scouts, blocks, and shoots with the freedom of a physical location — no render farm, no waiting.",
              },
              {
                icon: Music,
                title: "Rhythm in the Frame",
                desc: "Lumen global illumination and Nanite geometry serve the story's pulse — light bounces like bass, detail holds like a hi-hat. The engine keeps time.",
              },
              {
                icon: Film,
                title: "Painted Skin, Real Weight",
                desc: "Characters carry realistic proportions beneath hand-painted textures — a visual language between live action and illustration, between the street and the page.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 150}>
                <div className="border border-border p-8 hover:border-primary/40 transition-colors duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                    <span className="text-foreground/30 font-mono-accent text-3xl group-hover:text-foreground/60 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-xl uppercase mt-4 mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grant / Press CTA ── */}
      <section id="contact" className="relative py-24 md:py-32 bg-card/50">
        <CityGrid />
        <div className="container text-center max-w-3xl mx-auto">
          <Reveal>
            <Award className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-6xl mb-6 uppercase">
              Support the <span className="text-outline text-white">Final Cut</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Drive Me to Rap is complete in picture and seeking partners for the final mile —
              sound mix, color grade, festival submission, and distribution. If your fund
              champions independent voices and new cinematic workflows, we should talk.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                onClick={() => toast.info("Contact form placeholder — wire to your email or form service.")}
              >
                <Mail className="w-5 h-5" /> Start a Conversation
              </Button>
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
