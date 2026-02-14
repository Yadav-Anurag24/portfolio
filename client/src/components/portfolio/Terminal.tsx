import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';
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

  const tabs = ['TERMINAL', 'OUTPUT', 'DEBUG CONSOLE'];

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
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wide transition-colors
                    ${activeTab === tab.toLowerCase().replace(' ', '-')
                      ? 'text-foreground border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {tab}
                </button>
              ))}
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

          {/* Terminal Content */}
          <div
            className="flex-1 overflow-y-auto p-3 font-mono text-sm cursor-text z-20 relative"
            onClick={() => inputRef.current?.focus()}
            style={isMatrixActive ? { opacity: 0.15 } : undefined}
          >
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
