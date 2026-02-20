import { GitBranch, AlertTriangle, X, RefreshCw, Github, Linkedin, Terminal as TerminalIcon, Bell } from 'lucide-react';
import { useBellNotification } from '@/contexts/NotificationContext';

interface StatusBarProps {
  onTerminalToggle?: () => void;
  isTerminalOpen?: boolean;
}

const StatusBar = ({ onTerminalToggle, isTerminalOpen }: StatusBarProps) => {
  const { notifyBell } = useBellNotification();

  return (
    <footer className="h-6 bg-primary flex items-center justify-between px-3 text-xs text-primary-foreground shrink-0" role="status" aria-label="Editor status bar">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 px-1 rounded transition-colors" aria-label="Git branch: main">
          <GitBranch className="w-3.5 h-3.5" aria-hidden="true" />
          <span>main</span>
          <RefreshCw className="w-3 h-3" aria-hidden="true" />
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 px-1 rounded" aria-label="2 errors">
            <X className="w-3.5 h-3.5" aria-hidden="true" />
            <span>2</span>
          </span>
          <span className="flex items-center gap-1 px-1 rounded" aria-label="4 warnings">
            <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>4</span>
          </span>
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
        
        <span className="hidden sm:inline px-1 rounded" aria-label="Cursor position">Ln 1, Col 1</span>
        <span className="hidden sm:inline px-1 rounded" aria-label="File encoding">UTF-8</span>
        <span className="px-1 rounded" aria-label="File language">TypeScript React</span>
        <span className="hidden sm:inline px-1 rounded" aria-label="Formatter">Prettier</span>

        {/* Notification Bell */}
        <button
          onClick={notifyBell}
          className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 rounded transition-colors"
          title="Notifications"
        >
          <Bell className="w-3.5 h-3.5" />
        </button>

        {/* Social Icons */}
        <div className="flex items-center gap-2 border-l border-white/20 pl-3 ml-1">
          <a
            href="https://github.com/Yadav-Anurag24"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-white/10 p-1 rounded transition-colors"
            aria-label="GitHub profile (opens in new tab)"
          >
            <Github className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/anurag24kumar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-white/10 p-1 rounded transition-colors"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;
