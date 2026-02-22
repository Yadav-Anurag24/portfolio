import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Bhagavad Gita quotes with Sanskrit + English ────────────────────────────
const quotes = [
  {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
    text: "You have the right to perform your actions, but you are not entitled to the fruits of the actions.",
    ref: "— Gita 2.47",
  },
  {
    sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्।",
    text: "For the protection of the good and destruction of the wicked, I am born in every age.",
    ref: "— Gita 4.8",
  },
  {
    sanskrit: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।",
    text: "There is nothing as pure as knowledge in this world.",
    ref: "— Gita 4.38",
  },
  {
    sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।",
    text: "Perform your duty steadfastly, O Arjuna, abandoning all attachment to success or failure.",
    ref: "— Gita 2.48",
  },
  {
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।",
    text: "A person can rise through the efforts of his own mind; the mind is the friend and also the enemy.",
    ref: "— Gita 6.5",
  },
  {
    sanskrit: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।",
    text: "The soul is neither born, and nor does it die. Weapons cannot cut it, fire cannot burn it.",
    ref: "— Gita 2.23",
  },
  {
    sanskrit: "यो मां पश्यति सर्वत्र सर्वं च मयि पश्यति।",
    text: "One who sees Me in everything and everything in Me, I am never lost to them.",
    ref: "— Gita 6.30",
  },
  {
    sanskrit: "श्रद्धावाँल्लभते ज्ञानं तत्परः संयतेन्द्रियः।",
    text: "The one who has faith, is devoted, and has mastered the senses, attains knowledge.",
    ref: "— Gita 4.39",
  },
  {
    sanskrit: "मनः एव मनुष्याणां कारणं बन्धमोक्षयोः।",
    text: "The mind alone is the cause of bondage and liberation for human beings.",
    ref: "— Gita 6.5",
  },
  {
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।",
    text: "Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sins.",
    ref: "— Gita 18.66",
  },
];

// ─── Typing roles that cycle ─────────────────────────────────────────────────
const roles = ["Full Stack Developer", "Cloud Enthusiast", "BCA @ LPU", "Problem Solver"];

// ─── Social links ────────────────────────────────────────────────────────────
const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Yadav-Anurag24",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anurag24kumar",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:msdanurag65@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

// ─── Typing animation hook ───────────────────────────────────────────────────
const useTypingRole = (items: string[], typingSpeed = 80, deletingSpeed = 50, pauseMs = 2000) => {
  const [display, setDisplay] = useState('');
  const [itemIndex, setItemIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = items[itemIndex];

    if (!isDeleting && charIndex <= current.length) {
      const timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, charIndex === current.length ? pauseMs : typingSpeed);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && charIndex > current.length) {
      setIsDeleting(true);
      return;
    }

    if (isDeleting && charIndex >= 0) {
      const timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex));
        setCharIndex((c) => c - 1);
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      setCharIndex(0);
      setItemIndex((i) => (i + 1) % items.length);
    }
  }, [charIndex, isDeleting, itemIndex, items, typingSpeed, deletingSpeed, pauseMs]);

  return display;
};

// ─── Component ───────────────────────────────────────────────────────────────
const ProfileWidget = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typedRole = useTypingRole(roles, 90, 40, 2200);

  const nextQuote = useCallback(() => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  }, []);

  const prevQuote = useCallback(() => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  }, []);

  // Auto-rotate quotes every 10 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(nextQuote, 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextQuote, isPaused]);

  return (
    <div className="hidden lg:flex flex-col items-center gap-2.5 py-3 px-2 w-[210px] flex-shrink-0 border-l border-border bg-card/50 overflow-y-auto custom-scrollbar">
      {/* ── Section header ── */}
      <div className="w-full px-1 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-syntax-keyword/60" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 font-mono">
          developer.profile
        </span>
      </div>

      {/* ── Profile Image with glow ring ── */}
      <div className="relative group mt-1">
        <div className="profile-glow-ring w-[108px] h-[108px] rounded-xl p-[2px]">
          <div className="w-full h-full rounded-[10px] overflow-hidden bg-card">
            <img
              src="/profile.jpg"
              alt="Anurag Kumar"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.classList.add('profile-fallback');
              }}
            />
          </div>
        </div>
        {/* Availability badge */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-card border border-border rounded-full px-2 py-0.5 shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[9px] text-green-400 font-medium whitespace-nowrap">Open to work</span>
        </div>
      </div>

      {/* ── Name & animated role ── */}
      <div className="text-center space-y-0.5 mt-2">
        <div className="text-xs font-bold text-foreground tracking-wide">Anurag Kumar</div>
        <div className="text-[10px] text-muted-foreground h-4 font-mono">
          {typedRole}
          <span className="animate-pulse text-primary">|</span>
        </div>
      </div>

      {/* ── Social links ── */}
      <div className="flex items-center gap-2 mt-0.5">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
            title={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="w-4/5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── Quote section header ── */}
      <div className="w-full px-1 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {/* Sudarshan Chakra — always spinning */}
          <svg
            viewBox="0 0 100 100"
            className="w-4 h-4 animate-spin-slow"
            style={{ animationDuration: '3s' }}
          >
            {/* Outer toothed ring */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              const x1 = 50 + 38 * Math.cos(rad);
              const y1 = 50 + 38 * Math.sin(rad);
              const x2 = 50 + 48 * Math.cos(rad);
              const y2 = 50 + 48 * Math.sin(rad);
              return (
                <line
                  key={`spoke-${i}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="hsl(var(--syntax-variable))"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })}
            {/* Blade-like outer points */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8;
              const rad = (angle * Math.PI) / 180;
              const nextRad = ((angle + 22) * Math.PI) / 180;
              const prevRad = ((angle - 22) * Math.PI) / 180;
              const tipX = 50 + 46 * Math.cos(rad);
              const tipY = 50 + 46 * Math.sin(rad);
              const leftX = 50 + 32 * Math.cos(prevRad);
              const leftY = 50 + 32 * Math.sin(prevRad);
              const rightX = 50 + 32 * Math.cos(nextRad);
              const rightY = 50 + 32 * Math.sin(nextRad);
              return (
                <polygon
                  key={`blade-${i}`}
                  points={`${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`}
                  fill="hsl(var(--syntax-variable))"
                  opacity="0.85"
                />
              );
            })}
            {/* Middle ring */}
            <circle cx="50" cy="50" r="20" fill="none" stroke="hsl(var(--syntax-variable))" strokeWidth="2.5" opacity="0.7" />
            {/* Inner spokes */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8 + 22.5;
              const rad = (angle * Math.PI) / 180;
              const x = 50 + 18 * Math.cos(rad);
              const y = 50 + 18 * Math.sin(rad);
              return (
                <line
                  key={`inner-${i}`}
                  x1="50" y1="50" x2={x} y2={y}
                  stroke="hsl(var(--syntax-variable))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              );
            })}
            {/* Center dot */}
            <circle cx="50" cy="50" r="5" fill="hsl(var(--syntax-variable))" />
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-syntax-variable/80 font-mono">
            श्लोक
          </span>
        </div>
        <span className="text-[9px] text-muted-foreground/60 font-mono tabular-nums">
          {currentQuote + 1}/{quotes.length}
        </span>
      </div>

      {/* ── Bhagavad Gita Quote with hover pause ── */}
      <div
        className="w-full min-h-[100px] flex flex-col justify-between"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.35 }}
            className="space-y-1.5"
          >
            {/* Sanskrit */}
            <p className="text-[10px] leading-relaxed text-syntax-keyword/70 text-center px-1 font-serif">
              {quotes[currentQuote].sanskrit}
            </p>
            {/* English */}
            <p className="text-[10.5px] leading-relaxed text-foreground/75 italic px-1">
              "{quotes[currentQuote].text}"
            </p>
            {/* Reference */}
            <p className="text-[9px] text-syntax-string/70 text-right px-1 font-mono">
              {quotes[currentQuote].ref}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Prev / Next arrows ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={prevQuote}
          className="p-1 rounded text-muted-foreground/50 hover:text-foreground hover:bg-muted/40 transition-colors"
          aria-label="Previous quote"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth={2}>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Mini progress bar */}
        <div className="flex-1 h-[3px] bg-muted/40 rounded-full overflow-hidden max-w-[80px]">
          <motion.div
            className="h-full bg-primary/60 rounded-full"
            initial={false}
            animate={{ width: `${((currentQuote + 1) / quotes.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <button
          onClick={nextQuote}
          className="p-1 rounded text-muted-foreground/50 hover:text-foreground hover:bg-muted/40 transition-colors"
          aria-label="Next quote"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth={2}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProfileWidget;
