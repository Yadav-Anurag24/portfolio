import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react';

/* ================================================================
   TYPING REVEAL — progressive line-by-line content reveal
   ================================================================

   Wraps any content and on first view animates it being "typed"
   from top to bottom, one line (~28px) at a time, with a blinking
   cursor at the reveal edge. Subsequent views render instantly.
   Tracked via sessionStorage per file.
   ================================================================ */

const STORAGE_PREFIX = 'portfolio-typed-';
const LINE_HEIGHT = 28;           // matches leading-7 (1.75rem ≈ 28px)
const CHARS_PER_SECOND = 120;     // simulated typing speed
const CHARS_PER_LINE = 45;        // estimated average chars per code line
const MS_PER_LINE = (CHARS_PER_LINE / CHARS_PER_SECOND) * 1000; // ~375ms

interface TypingRevealProps {
  /** Unique key for sessionStorage tracking (use the file name) */
  fileKey: string;
  children: ReactNode;
}

const TypingReveal = ({ fileKey, children }: TypingRevealProps) => {
  const storageKey = STORAGE_PREFIX + fileKey;
  const alreadySeen = sessionStorage.getItem(storageKey) === '1';

  const contentRef = useRef<HTMLDivElement>(null);
  const [totalHeight, setTotalHeight] = useState(0);
  const [revealHeight, setRevealHeight] = useState(alreadySeen ? 99999 : 0);
  const [isAnimating, setIsAnimating] = useState(!alreadySeen);
  const [cursorVisible, setCursorVisible] = useState(!alreadySeen);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Measure content height once rendered
  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setTotalHeight(entry.contentRect.height);
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate reveal
  useEffect(() => {
    if (alreadySeen || totalHeight === 0) return;

    timerRef.current = setInterval(() => {
      setRevealHeight((prev) => {
        const next = prev + LINE_HEIGHT;
        if (next >= totalHeight) {
          // Animation complete
          if (timerRef.current) clearInterval(timerRef.current);
          setIsAnimating(false);
          sessionStorage.setItem(storageKey, '1');
          // Hide cursor after a short delay
          setTimeout(() => setCursorVisible(false), 800);
          return totalHeight;
        }
        return next;
      });
    }, MS_PER_LINE);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalHeight, alreadySeen, storageKey]);

  // Skip animation on click or keypress
  const skipAnimation = useCallback(() => {
    if (!isAnimating) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setRevealHeight(totalHeight);
    setIsAnimating(false);
    setCursorVisible(false);
    sessionStorage.setItem(storageKey, '1');
  }, [isAnimating, totalHeight, storageKey]);

  // If already seen → render immediately with no wrapper overhead
  if (alreadySeen) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative"
      onClick={skipAnimation}
      role="presentation"
      title={isAnimating ? 'Click to skip animation' : undefined}
    >
      {/* Revealed content */}
      <div
        style={{
          maxHeight: revealHeight,
          overflow: 'hidden',
          transition: `max-height ${MS_PER_LINE}ms linear`,
        }}
      >
        <div ref={contentRef}>
          {children}
        </div>
      </div>

      {/* Blinking cursor at the reveal edge */}
      {cursorVisible && (
        <div
          className="absolute left-4 pointer-events-none"
          style={{
            top: Math.min(revealHeight, totalHeight),
            transform: 'translateY(-2px)',
          }}
        >
          <div
            className="w-[2px] h-[18px] animate-pulse"
            style={{ background: 'var(--foreground)' }}
          />
        </div>
      )}

      {/* Skip hint */}
      {isAnimating && (
        <div className="absolute bottom-0 right-0 text-[10px] text-muted-foreground/50 italic select-none">
          click to skip
        </div>
      )}
    </div>
  );
};

export default TypingReveal;
