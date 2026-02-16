import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Maximize2, Minimize2, AlertTriangle, XCircle, Info, CheckCircle2 } from 'lucide-react';
import { useTerminal } from '@/contexts/TerminalContext';

// ── Matrix Rain Canvas ──────────────────────────────────────────────
const MatrixRain = ({ onExit }: { onExit: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[];=+*&^%$#@!';
    const fontSize = 14;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head of the column is brighter
        ctx.fillStyle = `hsl(120, 100%, ${50 + Math.random() * 30}%)`;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    // Exit on any keydown 
    const handleKey = (e: KeyboardEvent) => {
      // Let the terminal still process commands when typed
      if (e.key !== 'Tab') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKey);
    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [onExit]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-10 cursor-pointer"
      onClick={onExit}
    />
  );
};

// ── Tab Autocomplete Hint ───────────────────────────────────────────
const AutocompleteHint = ({ hint }: { hint: string }) => {
  if (!hint) return null;
  return (
    <span className="text-muted-foreground/40 pointer-events-none select-none">{hint}</span>
  );
};

// ── Main Terminal ───────────────────────────────────────────────────

// ── Problems data ───────────────────────────────────────────────────

interface Problem {
  severity: 'error' | 'warning' | 'info';
  message: string;
  file: string;
  line: number;
  col: number;
  source: string;
}

const PROBLEMS: Problem[] = [
  { severity: 'warning', message: 'developer.coffeeLevel is LOW — performance may degrade', file: 'src/AboutMe.ts', line: 42, col: 8, source: 'eslint(caffeine-check)' },
  { severity: 'warning', message: "'sleep' is declared but never used", file: 'src/AboutMe.ts', line: 7, col: 14, source: 'typescript(6133)' },
  { severity: 'info', message: 'Consider upgrading motivation to v2.0 for better async support', file: 'src/skills.json', line: 12, col: 1, source: 'npm-advisor' },
  { severity: 'warning', message: "Promise<Deadline> may reject — add .catch() handler", file: 'src/components/Projects.jsx', line: 23, col: 5, source: 'eslint(no-floating-promises)' },
  { severity: 'error', message: 'Cannot find module "free-time" — did you mean "crunch-time"?', file: 'src/AboutMe.ts', line: 31, col: 22, source: 'typescript(2307)' },
  { severity: 'warning', message: "Variable 'weekendPlans' is assigned but overwritten by 'bugs'", file: 'src/components/Projects.jsx', line: 56, col: 10, source: 'eslint(no-unused-vars)' },
  { severity: 'info', message: "'portfolio.quality' exceeds expected threshold — great job!", file: 'README.md', line: 1, col: 1, source: 'portfolio-lint' },
  { severity: 'warning', message: "Deprecated: Array<Excuses> — use Results<Success> instead", file: 'src/AboutMe.ts', line: 19, col: 3, source: 'eslint(no-excuses)' },
  { severity: 'info', message: 'Tip: Run "sudo hire-me" for a pleasant surprise', file: 'package.json', line: 1, col: 1, source: 'terminal-hints' },
  { severity: 'error', message: "Type 'procrastination' is not assignable to type 'Productivity'", file: 'src/AboutMe.ts', line: 38, col: 16, source: 'typescript(2322)' },
];

const ProblemsPanel = () => {
  const [filter, setFilter] = useState<'all' | 'errors' | 'warnings' | 'info'>('all');

  const counts = useMemo(() => ({
    errors: PROBLEMS.filter(p => p.severity === 'error').length,
    warnings: PROBLEMS.filter(p => p.severity === 'warning').length,
    info: PROBLEMS.filter(p => p.severity === 'info').length,
  }), []);

  const filtered = useMemo(() => {
    if (filter === 'all') return PROBLEMS;
    if (filter === 'errors') return PROBLEMS.filter(p => p.severity === 'error');
    if (filter === 'warnings') return PROBLEMS.filter(p => p.severity === 'warning');
    return PROBLEMS.filter(p => p.severity === 'info');
  }, [filter]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <XCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />;
      case 'warning': return <AlertTriangle className="w-3.5 h-3.5 text-syntax-variable flex-shrink-0" />;
      case 'info': return <Info className="w-3.5 h-3.5 text-syntax-function flex-shrink-0" />;
      default: return null;
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-destructive';
      case 'warning': return 'text-syntax-variable';
      case 'info': return 'text-syntax-function';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-0 font-mono text-xs">
      {/* Filter bar */}
      <div className="flex items-center gap-3 px-3 py-1.5 border-b border-border/50 bg-card/50 sticky top-0">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] transition-colors ${
            filter === 'all' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          All
          <span className="bg-muted-foreground/20 px-1 rounded text-[10px]">{PROBLEMS.length}</span>
        </button>
        <button
          onClick={() => setFilter('errors')}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] transition-colors ${
            filter === 'errors' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <XCircle className="w-3 h-3 text-destructive" />
          <span>{counts.errors}</span>
        </button>
        <button
          onClick={() => setFilter('warnings')}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] transition-colors ${
            filter === 'warnings' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <AlertTriangle className="w-3 h-3 text-syntax-variable" />
          <span>{counts.warnings}</span>
        </button>
        <button
          onClick={() => setFilter('info')}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] transition-colors ${
            filter === 'info' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Info className="w-3 h-3 text-syntax-function" />
          <span>{counts.info}</span>
        </button>
      </div>

      {/* Problem list */}
      <div>
        {filtered.map((problem, i) => (
          <div
            key={i}
            className="flex items-start gap-2 px-3 py-1 hover:bg-muted/20 transition-colors cursor-pointer group"
          >
            {getSeverityIcon(problem.severity)}
            <div className="flex-1 min-w-0">
              <span className={`${getSeverityTextColor(problem.severity)}`}>
                {problem.message}
              </span>
              <span className="text-muted-foreground ml-2 text-[10px]">
                [{problem.source}]
              </span>
            </div>
            <span className="text-muted-foreground/60 text-[10px] flex-shrink-0 whitespace-nowrap">
              {problem.file}({problem.line},{problem.col})
            </span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-center gap-2 px-3 py-2 mt-2 border-t border-border/30">
        <CheckCircle2 className="w-3.5 h-3.5 text-syntax-string" />
        <span className="text-syntax-string text-[11px]">
          ✓ 0 real errors in portfolio — ready for production
        </span>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────
interface TerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
}

const Terminal = ({ isOpen, onToggle, isMaximized, onMaximize }: TerminalProps) => {
  const { logs, commandHistory, isMatrixActive, setIsMatrixActive, executeCommand, allCommands } = useTerminal();
  const [activeTab, setActiveTab] = useState('terminal');
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [autocompleteHint, setAutocompleteHint] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Compute autocomplete hint when input changes
  useEffect(() => {
    if (!input.trim()) {
      setAutocompleteHint('');
      return;
    }
    const lower = input.toLowerCase();
    const match = allCommands.find((cmd) => cmd.startsWith(lower) && cmd !== lower);
    if (match) {
      setAutocompleteHint(match.slice(input.length));
    } else {
      setAutocompleteHint('');
    }
  }, [input, allCommands]);

  const handleExitMatrix = useCallback(() => {
    setIsMatrixActive(false);
  }, [setIsMatrixActive]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      // Exit matrix on any command
      if (isMatrixActive) {
        setIsMatrixActive(false);
      }
      executeCommand(trimmed);
      setHistoryIndex(-1);
      setInput('');
      setAutocompleteHint('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (autocompleteHint) {
        setInput((prev) => prev + autocompleteHint);
        setAutocompleteHint('');
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      // Ctrl+L to clear
      e.preventDefault();
      executeCommand('clear');
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-syntax-string';
      case 'error':
        return 'text-destructive';
      case 'command':
        return 'text-syntax-function';
      case 'output':
        return 'text-foreground';
      case 'ascii':
        return 'text-syntax-keyword';
      default:
        return 'text-muted-foreground';
    }
  };

  const tabs = ['PROBLEMS', 'TERMINAL', 'OUTPUT', 'DEBUG CONSOLE'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isMaximized ? '50vh' : 200 }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-border bg-[hsl(220,13%,10%)] flex flex-col overflow-hidden relative"
        >
          {/* Matrix Rain overlay */}
          {isMatrixActive && <MatrixRain onExit={handleExitMatrix} />}

          {/* Terminal Header */}
          <div className="h-9 flex items-center justify-between px-2 border-b border-border bg-card z-20 relative">
            {/* Tabs */}
            <div className="flex items-center gap-0.5">
              {tabs.map((tab) => {
                const tabId = tab.toLowerCase().replace(' ', '-');
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tabId)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wide transition-colors flex items-center gap-1.5
                      ${activeTab === tabId
                        ? 'text-foreground border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {tab}
                    {tab === 'PROBLEMS' && (
                      <span className="flex items-center gap-1 text-[10px] font-normal normal-case">
                        <span className="flex items-center gap-0.5 text-destructive">
                          <XCircle className="w-2.5 h-2.5" />
                          {PROBLEMS.filter(p => p.severity === 'error').length}
                        </span>
                        <span className="flex items-center gap-0.5 text-syntax-variable">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          {PROBLEMS.filter(p => p.severity === 'warning').length}
                        </span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={onMaximize}
                className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={onToggle}
                className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onToggle}
                className="p-1 hover:bg-destructive/20 rounded transition-colors text-muted-foreground hover:text-destructive"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'problems' ? (
            <ProblemsPanel />
          ) : (
            /* Terminal Content */
            <div
              className="flex-1 overflow-y-auto p-3 font-mono text-sm cursor-text z-20 relative"
              onClick={() => inputRef.current?.focus()}
              style={isMatrixActive ? { opacity: 0.15 } : undefined}
            >
              {activeTab === 'terminal' ? (
                <>
                  {logs.map((log) => (
                    <div key={log.id} className={`${getLogColor(log.type)} whitespace-pre-wrap leading-6`}>
                      {log.message}
                    </div>
                  ))}

                  {/* Input line */}
                  <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
                    <span className="text-syntax-string shrink-0">❯</span>
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent outline-none text-foreground caret-primary"
                        autoFocus
                        spellCheck={false}
                        aria-label="Terminal command input"
                      />
                      {/* Ghost autocomplete hint */}
                      <div className="absolute top-0 left-0 pointer-events-none whitespace-pre" aria-hidden="true">
                        <span className="invisible">{input}</span>
                        <AutocompleteHint hint={autocompleteHint} />
                      </div>
                    </div>
                  </form>
                  <div ref={logsEndRef} />
                </>
              ) : (
                <div className="text-muted-foreground text-xs italic p-2">
                  No output available — this is a portfolio, not a real IDE 😄
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
