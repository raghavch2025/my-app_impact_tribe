
import logo from './logo.svg';
import './App.css';
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  ShieldAlert,
  Leaf,
  Droplets,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  ArrowRight,
  CheckCircle2,
  Users,
  Clock,
  Handshake,
} from "lucide-react";

/**
 * Impact Tribe – Single‑file React site (TSX‑safe)
 * --------------------------------------------------------------
 * ✅ Gorgeous, Gen‑Z friendly visuals (gradients, glassmorphism, motion)
 * ✅ Ultra‑light functionality (no backend): WhatsApp link after basic info
 * ✅ Mobile‑first, responsive, accessible
 * ✅ Easy to deploy (Vite + Tailwind recommended)
 *
 * 🔧 Replace ORG_WHATSAPP and SOCIAL_LINKS below before deploying
 */

// -----------------------------
// Types (TSX‑friendly)
// -----------------------------
export type IconCmp = React.ComponentType<{ className?: string; size?: number }>;

interface SectionHeadingProps {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  sub?: React.ReactNode;
}

type FocusArea = {
  key: string;
  title: string;
  icon: IconCmp;
  blurb: string;
  gradient: string;
  accent: string;
};

type HowStep = {
  icon: IconCmp;
  title: string;
  desc: string;
  badgeFrom: string;
  badgeTo: string;
};

const ORG_WHATSAPP = "919876543210"; // 🇮🇳 Replace with your WhatsApp number (country code + number, no + sign)

const SOCIAL_LINKS = {
  instagram: "https://instagram.com/impacttribe", // 🔗 replace with your real handles
  twitter: "https://x.com/impacttribe",
  youtube: "https://youtube.com/@impacttribe",
  linkedin: "https://www.linkedin.com/company/impacttribe",
};

// -----------------------------
// Small, testable helpers
// -----------------------------
export function toggleInSet(list: string[], key: string): string[] {
  const s = new Set(list);
  if (s.has(key)) s.delete(key);
  else s.add(key);
  return Array.from(s);
}

export function composeWhatsAppText(form: {
  name: string;
  city?: string;
  phone: string;
  focus?: string[];
  why?: string;
}): string {
  const lines = [
    "Hi Impact Tribe! I want to join as an Early Volunteer.",
    `Name: ${form.name}`,
  ];
  if (form.city) lines.push(`City: ${form.city}`);
  lines.push(`Phone: ${form.phone}`);
  if (form.focus && form.focus.length) lines.push(`Focus: ${form.focus.join(", ")}`);
  if (form.why) lines.push(`Why me: ${form.why}`);
  lines.push("#ImpactTribe");
  return lines.join("\n");
}

const focusAreas: FocusArea[] = [
  {
    key: "education",
    title: "Education",
    icon: BookOpen,
    blurb:
      "After‑school learning pods, peer mentoring, and career guidance for underserved students.",
    gradient: "from-indigo-500/30 to-cyan-400/30",
    accent: "from-indigo-400 to-cyan-400",
  },
  {
    key: "acid",
    title: "Acid attack victims",
    icon: ShieldAlert,
    blurb:
      "Rehabilitation, legal aid connects, skill training, and community reintegration.",
    gradient: "from-pink-500/30 to-rose-400/30",
    accent: "from-pink-400 to-rose-400",
  },
  {
    key: "sustainability",
    title: "Sustainability",
    icon: Leaf,
    blurb:
      "Neighborhood cleanups, zero‑waste drives, tree care, and everyday climate action routines.",
    gradient: "from-emerald-500/30 to-lime-400/30",
    accent: "from-emerald-400 to-lime-400",
  },
  {
    key: "sanitation",
    title: "Sanitation drives",
    icon: Droplets,
    blurb:
      "Street and park clean‑ups, waste segregation booths, and habit‑building campaigns for cleaner public spaces.",
    gradient: "from-sky-500/30 to-blue-400/30",
    accent: "from-sky-400 to-blue-400",
  },
];

function SectionHeading({ kicker, title, sub }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {kicker && (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/70 ring-1 ring-white/10">
          {kicker}
        </p>
      )}
      <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-3 text-balance text-white/70">{sub}</p>}
    </div>
  );
}

function NavBar() {
  return (
    <div className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-slate-950/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <a href="#home" className="group inline-flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-teal-400 to-indigo-500 p-[2px]">
            <div className="h-full w-full rounded-2xl bg-slate-950" />
          </div>
          <span className="font-semibold text-white">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-teal-300 to-emerald-400">Impact</span> Tribe
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
          <a className="hover:text-white" href="#about">About</a>
          <a className="hover:text-white" href="#how">How it works</a>
          <a className="hover:text-white" href="#focus">Focus Areas</a>
          <a className="hover:text-white" href="#join">Join</a>
          <a className="hover:text-white" href="#social">Social</a>
          <a className="rounded-full bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20" href="#join">Become an Early Volunteer</a>
        </nav>
      </div>
    </div>
  );
}

// 🔥 HERO IMAGE REMOVED — concise headline-only hero
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 opacity-20 blur-3xl" />
        <div className="absolute -left-[10%] bottom-[-20%] h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-400 opacity-20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-20 sm:py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/70 ring-1 ring-white/10">
            Service‑first • Community‑powered
          </div>
          <h1 className="mx-auto mt-4 max-w-3xl text-pretty text-4xl font-black leading-[1.05] text-white sm:text-5xl">
            Make <span className="bg-gradient-to-r from-teal-300 via-indigo-400 to-emerald-300 bg-clip-text text-transparent">social service</span> your <em className="not-italic underline decoration-emerald-400/60 underline-offset-[10px]">lifestyle.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
            We’re a community for people who believe in <strong>making self‑discovery fun</strong>,
            connecting with <strong>like‑minded doers</strong>, and living by a <strong>service‑first</strong> philosophy.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#join" className="group inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 font-semibold text-slate-900 transition hover:bg-white">
              Join as Early Volunteer <ArrowRight className="transition group-hover:translate-x-0.5" size={18} />
            </a>
            <a href="#focus" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-semibold text-white/90 hover:bg-white/10">
              Explore Focus Areas
            </a>
          </div>
          <p className="mt-4 text-xs text-white/60">No spam. No fundraising blasts. Just real work, real people, real impact.</p>
        </motion.div>
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80">
      <CheckCircle2 size={16} className="text-emerald-300" /> {children}
    </span>
  );
}

function About() {
  return (
    <section id="about" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading
          kicker="What we stand for"
          title={<span>Service‑first, not donations‑first</span>}
          sub="Money helps—but consistent action transforms. We show up, learn by serving, and build character together."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[3%] p-6 backdrop-blur-xl">
            <div className="mb-3 text-sm font-semibold text-emerald-300">Core philosophy</div>
            <div className="flex flex-wrap gap-2">
              <Pill>Making self‑discovery fun</Pill>
              <Pill>Connect with like‑minded people</Pill>
              <Pill>Make service a lifestyle</Pill>
            </div>
            <p className="mt-4 text-white/70">
              We keep it simple: do small, consistent acts of service; reflect together; grow together.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[3%] p-6 backdrop-blur-xl">
            <div className="mb-3 text-sm font-semibold text-indigo-300">Our promises</div>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 text-teal-300" size={18}/> Action &gt; talk. We ship weekly micro‑missions.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 text-teal-300" size={18}/> No spam. No pressure. No forced donations.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 text-teal-300" size={18}/> Learn by doing. Reflect. Level up your character.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ✨ Clear "How it works" section
function HowItWorks() {
  const steps: HowStep[] = [
    {
      icon: Clock,
      title: "Pick a 60–90 min micro‑mission",
      desc: "Weekly, bite‑sized tasks you can do solo or with a buddy circle.",
      badgeFrom: "from-teal-300",
      badgeTo: "to-indigo-300",
    },
    {
      icon: Users,
      title: "Join a buddy circle",
      desc: "Find 3–5 like‑minded doers in your city. Show up, stay accountable.",
      badgeFrom: "from-indigo-300",
      badgeTo: "to-emerald-300",
    },
    {
      icon: Handshake,
      title: "Serve • Reflect • Grow",
      desc: "Share learnings in community huddles. Turn service into a lifestyle.",
      badgeFrom: "from-emerald-300",
      badgeTo: "to-teal-300",
    },
  ];

  return (
    <section id="how" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="How the tribe works"
          title="Simple, consistent, human"
          sub="Designed for busy students and professionals—zero fluff, maximum momentum."
        />

        <div className="relative mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div
                  className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${s.badgeFrom} ${s.badgeTo} px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900`}
                >
                  {`Step ${i + 1}`}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <s.icon className="text-white/90" />
                  <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-white/70">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* subtle connector line */}
        <div aria-hidden className="pointer-events-none mt-8 hidden h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent sm:block" />
      </div>
    </section>
  );
}

function FocusAreas() {
  return (
    <section id="focus" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="Where we begin"
          title="Focus Areas"
          sub="Start small, stay consistent. Pick one area to begin and grow your impact with the tribe."
        />
        <div className="mt-10 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((f, idx) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="group relative"
            >
              <div className={`h-full rounded-3xl border border-white/10 bg-gradient-to-br ${f.gradient} p-[1px]`}>
                {/* alignment fix: equal heights via min-h on inner card */}
                <div className="flex h-full min-h-[240px] flex-col rounded-[calc(1.5rem-1px)] bg-slate-950/70 p-5 backdrop-blur-xl">
                  <div className={`inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r ${f.accent} px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900`}>{f.title}</div>
                  <div className="mt-4 flex items-center gap-3">
                    <f.icon className="text-white/90" />
                    <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-white/70">{f.blurb}</p>
                  <div className="mt-auto pt-4 text-xs text-white/50">Start a micro‑mission this week →</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialLinks() {
  const links = [
    { key: "instagram", label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: Instagram },
    { key: "twitter", label: "X (Twitter)", href: SOCIAL_LINKS.twitter, Icon: Twitter },
    { key: "youtube", label: "YouTube", href: SOCIAL_LINKS.youtube, Icon: Youtube },
    { key: "linkedin", label: "LinkedIn", href: SOCIAL_LINKS.linkedin, Icon: Linkedin },
  ];

  return (
    <section id="social" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading kicker="Find your people" title="Follow & connect" sub="Jump into our socials—DMs open. Join events, micro‑missions, and weekly check‑ins." />
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {links.map(({ key, label, href, Icon }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-white/80 backdrop-blur-xl transition hover:bg-white/10"
            >
              <Icon className="mx-auto" />
              <div className="mt-2 text-sm font-medium group-hover:text-white">{label}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinForm() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
    focus: [] as string[],
    why: "",
  });

  const isReady = form.name.trim() && form.phone.trim();

  const whatsappLink = useMemo(() => {
    const base = `https://wa.me/${ORG_WHATSAPP}`;
    const msg = composeWhatsAppText(form);
    return `${base}?text=${encodeURIComponent(msg)}`;
  }, [form]);

  const toggleFocus = (key: string) => {
    setForm((f) => ({ ...f, focus: toggleInSet(f.focus, key) }));
  };

  return (
    <section id="join" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading
          kicker="Start today"
          title="Join as Early Volunteer"
          sub="Share the basics. We don't store anything here—this just composes a WhatsApp message to us."
        />

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-white/70">Name*</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder-white/40 outline-none ring-0 focus:border-white/20"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/70">City</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder-white/40 outline-none ring-0 focus:border-white/20"
                placeholder="Where are you based?"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/70">Phone*</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder-white/40 outline-none ring-0 focus:border-white/20"
                placeholder="Your number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/70">Why do you want to join?</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder-white/40 outline-none ring-0 focus:border-white/20"
                placeholder="A line about your motivation"
                value={form.why}
                onChange={(e) => setForm({ ...form, why: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 text-sm text-white/70">Pick areas you care about</div>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => toggleFocus(f.title)}
                  className={`rounded-full px-3 py-1 text-sm transition ${
                    form.focus.includes(f.title)
                      ? "bg-white text-slate-900"
                      : "border border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {f.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-white/60">
              We only use this to start a WhatsApp chat. No databases. No spam.
            </p>
            <a
              href={isReady ? whatsappLink : undefined}
              onClick={(e) => {
                if (!isReady) e.preventDefault();
              }}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition ${
                isReady
                  ? "bg-white text-slate-900 hover:bg-white/90"
                  : "cursor-not-allowed border border-white/15 bg-white/5 text-white/50"
              }`}
            >
              {isReady ? (
                <>
                  Continue on WhatsApp <ArrowRight size={18} />
                </>
              ) : (
                <>Fill name & phone to continue</>
              )}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/10 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="#home" className="font-semibold text-white/80">The Impact Tribe</a>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <a className="hover:text-white" href="#about">About</a>
            <a className="hover:text-white" href="#how">How it works</a>
            <a className="hover:text-white" href="#focus">Focus</a>
            <a className="hover:text-white" href="#join">Join</a>
            <a className="hover:text-white" href="#social">Social</a>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Impact Tribe. Built with love, service, and good design.
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
      <NavBar />
      <Hero />
      <About />
      <HowItWorks />
      <FocusAreas />
      <JoinForm />
      <SocialLinks />
      <Footer />
    </div>
  );
}

// --------------------------------------------------
// Inline Vitest tests (ignored in prod builds)
// Run with: npx vitest run --environment jsdom
// --------------------------------------------------
// @ts-ignore – available only under Vitest
if ((import.meta as any)?.vitest) {
  // @ts-ignore
  const { it, expect } = (import.meta as any).vitest;

  it("toggleInSet adds and removes keys without duplicates", () => {
    expect(toggleInSet([], "A")).toEqual(["A"]);
    expect(toggleInSet(["A"], "A")).toEqual([]);
    expect(toggleInSet(["A"], "B").sort()).toEqual(["A", "B"]);
  });

  it("composeWhatsAppText includes fields and joins with newlines", () => {
    const msg = composeWhatsAppText({ name: "Madhav", phone: "9999", city: "Delhi", focus: ["Education", "Sustainability"], why: "I care" });
    expect(msg).toContain("Name: Madhav");
    expect(msg).toContain("City: Delhi");
    expect(msg).toContain("Phone: 9999");
    expect(msg).toContain("Focus: Education, Sustainability");
    expect(msg).toContain("Why me: I care");
    expect(msg.split("\n").length).toBeGreaterThan(3);
  });

  it("whatsapp link encodes the message correctly", () => {
    const base = `https://wa.me/${ORG_WHATSAPP}`;
    const txt = composeWhatsAppText({ name: "A B", phone: "1" });
    const href = `${base}?text=${encodeURIComponent(txt)}`;
    expect(href).toContain("%20"); // spaces encoded
    expect(href.startsWith("https://wa.me/")).toBe(true);
  });

  it("focus areas include Sanitation drives and not Menstrual hygiene", () => {
    const titles = (focusAreas as any[]).map((f) => f.title);
    expect(titles).toContain("Sanitation drives");
    expect(titles).not.toContain("Menstrual hygiene");
  });
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
