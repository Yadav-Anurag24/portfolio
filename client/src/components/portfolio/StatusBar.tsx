import { GitBranch, Check, X, RefreshCw, Github, Linkedin, Terminal as TerminalIcon } from 'lucide-react';

interface StatusBarProps {
  onTerminalToggle?: () => void;
  isTerminalOpen?: boolean;
}

const StatusBar = ({ onTerminalToggle, isTerminalOpen }: StatusBarProps) => {
  return (
    <div className="h-6 bg-primary flex items-center justify-between px-3 text-xs text-primary-foreground shrink-0">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 cursor-pointer hover:bg-white/10 px-1 rounded transition-colors">
          <GitBranch className="w-3.5 h-3.5" />
          <span>main</span>
          <RefreshCw className="w-3 h-3" />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 rounded transition-colors">
            <X className="w-3.5 h-3.5" />
            <span>0</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 rounded transition-colors">
            <Check className="w-3.5 h-3.5" />
            <span>0</span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Terminal Toggle */}
        {onTerminalToggle && (
          <button
            onClick={onTerminalToggle}
            className={`flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 rounded transition-colors ${
              isTerminalOpen ? 'bg-white/10' : ''
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Terminal</span>
          </button>
        )}
        
        <span className="hidden sm:inline cursor-pointer hover:bg-white/10 px-1 rounded transition-colors">Ln 1, Col 1</span>
        <span className="hidden sm:inline cursor-pointer hover:bg-white/10 px-1 rounded transition-colors">UTF-8</span>
        <span className="cursor-pointer hover:bg-white/10 px-1 rounded transition-colors">TypeScript React</span>
        <span className="hidden sm:inline cursor-pointer hover:bg-white/10 px-1 rounded transition-colors">Prettier</span>

        {/* Social Icons */}
        <div className="flex items-center gap-2 border-l border-white/20 pl-3 ml-1">
          <a
            href="https://github.com/Yadav-Anurag24"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-white/10 p-1 rounded transition-colors"
            title="GitHub - Yadav-Anurag24"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/anurag24kumar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-white/10 p-1 rounded transition-colors"
            title="LinkedIn - Anurag Kumar"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
