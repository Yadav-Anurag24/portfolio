import { motion } from 'framer-motion';

/* ================================================================
   CODE LOADING SKELETON
   ================================================================
   VS Code–style skeleton that mimics code lines loading.
   Used as the Suspense fallback for lazy-loaded content components.
   ================================================================ */

const LINE_WIDTHS = [
  '40%', '65%', '55%', '30%', '0%',    // comment + blank
  '20%', '50%', '70%', '45%', '60%',   // interface / object
  '35%', '75%', '55%', '25%', '0%',    // more fields
  '50%', '65%', '40%', '80%', '30%',   // values
];

const CodeLoadingSkeleton = () => (
  <div className="space-y-0 animate-pulse p-1">
    {/* File header shimmer */}
    <div className="flex items-center gap-2 mb-3 px-1">
      <div className="h-3 w-3 rounded-sm" style={{ background: 'var(--syntax-comment)', opacity: 0.25 }} />
      <div className="h-2.5 rounded-sm" style={{ width: '180px', background: 'var(--syntax-comment)', opacity: 0.2 }} />
    </div>

    {/* Code lines */}
    {LINE_WIDTHS.map((width, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.03, duration: 0.2 }}
        className="flex items-center gap-3 py-[3px]"
        style={{ height: 28 }}
      >
        {/* Line number */}
        <span
          className="w-8 text-right text-xs select-none shrink-0"
          style={{ color: 'var(--muted-foreground)', opacity: 0.3 }}
        >
          {i + 1}
        </span>

        {/* Code line skeleton */}
        {width !== '0%' ? (
          <div className="flex items-center gap-1.5" style={{ width }}>
            {/* Keyword token */}
            {i % 3 === 0 && (
              <div
                className="h-2.5 rounded-sm shrink-0"
                style={{
                  width: `${20 + (i % 4) * 8}px`,
                  background: 'var(--syntax-keyword)',
                  opacity: 0.2,
                }}
              />
            )}
            {/* Main token */}
            <div
              className="h-2.5 rounded-sm flex-1"
              style={{
                background: i % 5 === 0
                  ? 'var(--syntax-comment)'
                  : i % 3 === 1
                    ? 'var(--syntax-string)'
                    : 'var(--syntax-property)',
                opacity: 0.15 + (i % 3) * 0.05,
              }}
            />
            {/* Trailing token */}
            {i % 4 === 2 && (
              <div
                className="h-2.5 rounded-sm shrink-0"
                style={{
                  width: `${30 + (i % 5) * 6}px`,
                  background: 'var(--syntax-variable)',
                  opacity: 0.15,
                }}
              />
            )}
          </div>
        ) : (
          /* Blank line */
          <div />
        )}
      </motion.div>
    ))}

    {/* Bottom shimmer bar */}
    <div className="mt-4 flex items-center gap-2 px-1">
      <div className="h-1.5 flex-1 rounded-full overflow-hidden" style={{ background: 'var(--muted)', opacity: 0.3 }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'var(--primary)', opacity: 0.5 }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <span className="text-[10px] shrink-0" style={{ color: 'var(--muted-foreground)', opacity: 0.4 }}>
        Loading…
      </span>
    </div>
  </div>
);

export default CodeLoadingSkeleton;
