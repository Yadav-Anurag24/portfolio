import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';
import { useTerminal } from '@/contexts/TerminalContext';

interface TerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
}

const Terminal = ({ isOpen, onToggle, isMaximized, onMaximize }: TerminalProps) => {
  const { logs, executeCommand } = useTerminal();
  const [activeTab, setActiveTab] = useState('terminal');
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
          animate={{ height: isMaximized ? '50vh' : 150 }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-border bg-[hsl(220,13%,10%)] flex flex-col overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="h-9 flex items-center justify-between px-2 border-b border-border bg-card">
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
            className="flex-1 overflow-y-auto p-3 font-mono text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {logs.map((log) => (
              <div key={log.id} className={`${getLogColor(log.type)} whitespace-pre-wrap leading-6`}>
                {log.message}
              </div>
            ))}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
              <span className="text-syntax-string">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-foreground caret-primary"
                autoFocus
                spellCheck={false}
              />
            </form>
            <div ref={logsEndRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
