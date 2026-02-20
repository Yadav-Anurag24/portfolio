import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, FileText, FileJson, FileCode, File, FileType,
  ArrowRight, Command as CommandIcon, Palette, Download, GitBranch,
  TerminalSquare, Eye, EyeOff, Type, Hash, Puzzle, Maximize2,
  Minimize2, FolderOpen, Sun, Moon
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (fileName: string) => void;
  onToggleTerminal?: () => void;
  onToggleSidebar?: () => void;
  onOpenSettings?: () => void;
  onOpenPanel?: (panel: string) => void;
  onClearTerminal?: () => void;
  onToggleMinimap?: () => void;
  onToggleLineNumbers?: () => void;
  onChangeTheme?: () => void;
}

const files = [
  { name: 'README.md', path: 'PORTFOLIO-MASTER/README.md', icon: FileText, color: 'text-syntax-function' },
  { name: 'AboutMe.ts', path: 'PORTFOLIO-MASTER/src/AboutMe.ts', icon: FileCode, color: 'text-syntax-variable' },
  { name: 'skills.json', path: 'PORTFOLIO-MASTER/src/skills.json', icon: FileJson, color: 'text-syntax-variable' },
  { name: 'Projects.jsx', path: 'PORTFOLIO-MASTER/src/components/Projects.jsx', icon: FileCode, color: 'text-syntax-function' },
  { name: 'ContactForm.tsx', path: 'PORTFOLIO-MASTER/src/components/ContactForm.tsx', icon: FileCode, color: 'text-syntax-property' },
  { name: 'resume.pdf', path: 'PORTFOLIO-MASTER/resume.pdf', icon: FileType, color: 'text-red-400' },
];

interface CommandItem {
  name: string;
  shortcut: string;
  action: string;
  category: string;
  icon: typeof ArrowRight;
}

const commands: CommandItem[] = [
  // File commands
  { name: 'Go to File...', shortcut: 'Ctrl+P', action: 'file', category: 'File', icon: FolderOpen },
  { name: 'Open File: README.md', shortcut: '', action: 'open-readme', category: 'File', icon: FileText },
  { name: 'Open File: Resume.pdf', shortcut: '', action: 'view-resume', category: 'File', icon: FileType },
  { name: 'Open File: Projects.jsx', shortcut: '', action: 'open-projects', category: 'File', icon: FileCode },
  { name: 'Open File: ContactForm.tsx', shortcut: '', action: 'open-contact', category: 'File', icon: FileCode },

  // View commands
  { name: 'View: Toggle Sidebar', shortcut: 'Ctrl+B', action: 'sidebar', category: 'View', icon: Maximize2 },
  { name: 'View: Toggle Terminal', shortcut: 'Ctrl+`', action: 'terminal', category: 'View', icon: TerminalSquare },
  { name: 'View: Toggle Minimap', shortcut: '', action: 'toggle-minimap', category: 'View', icon: Eye },
  { name: 'View: Toggle Line Numbers', shortcut: '', action: 'toggle-line-numbers', category: 'View', icon: Hash },
  { name: 'View: Explorer Panel', shortcut: 'Ctrl+Shift+E', action: 'panel-explorer', category: 'View', icon: FolderOpen },
  { name: 'View: Extensions Panel', shortcut: 'Ctrl+Shift+X', action: 'panel-extensions', category: 'View', icon: Puzzle },

  // Preferences
  { name: 'Preferences: Change Theme', shortcut: '', action: 'change-theme', category: 'Preferences', icon: Palette },
  { name: 'Preferences: Open Settings', shortcut: 'Ctrl+,', action: 'settings', category: 'Preferences', icon: ArrowRight },

  // Git commands
  { name: 'Git: View Contributions', shortcut: '', action: 'panel-git', category: 'Git', icon: GitBranch },

  // Terminal commands
  { name: 'Terminal: Clear', shortcut: '', action: 'clear-terminal', category: 'Terminal', icon: TerminalSquare },
  { name: 'Terminal: New Terminal', shortcut: 'Ctrl+`', action: 'terminal', category: 'Terminal', icon: TerminalSquare },

  // Run commands
  { name: 'Run: Download Resume (PDF)', shortcut: '', action: 'resume', category: 'Run', icon: Download },
];

const CommandPalette = ({
  isOpen, onClose, onSelectFile, onToggleTerminal, onToggleSidebar,
  onOpenSettings, onOpenPanel, onClearTerminal, onToggleMinimap,
  onToggleLineNumbers, onChangeTheme,
}: CommandPaletteProps) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<'commands' | 'files'>('commands');

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase()) ||
    file.path.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  const items = mode === 'files' ? filteredFiles : filteredCommands;

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setMode('commands');
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search, mode]);

  const handleSelect = useCallback((index: number) => {
    if (mode === 'files') {
      const file = filteredFiles[index];
      if (file) {
        onSelectFile(file.name);
        onClose();
      }
    } else {
      const command = filteredCommands[index];
      if (!command) return;

      switch (command.action) {
        case 'file':
          setMode('files');
          setSearch('');
          return; // Don't close — switch to file mode

        // File open actions
        case 'open-readme':
          onSelectFile('README.md'); break;
        case 'view-resume':
          onSelectFile('resume.pdf'); break;
        case 'open-projects':
          onSelectFile('Projects.jsx'); break;
        case 'open-contact':
          onSelectFile('ContactForm.tsx'); break;

        // View actions
        case 'terminal':
          onToggleTerminal?.(); break;
        case 'sidebar':
          onToggleSidebar?.(); break;
        case 'toggle-minimap':
          onToggleMinimap?.(); break;
        case 'toggle-line-numbers':
          onToggleLineNumbers?.(); break;
        case 'panel-explorer':
          onOpenPanel?.('explorer'); break;
        case 'panel-extensions':
          onOpenPanel?.('extensions'); break;
        case 'panel-git':
          onOpenPanel?.('git'); break;

        // Preferences
        case 'settings':
          onOpenSettings?.(); break;
        case 'change-theme':
          onChangeTheme?.(); break;

        // Terminal
        case 'clear-terminal':
          onClearTerminal?.(); break;

        // Run
        case 'resume': {
          const link = document.createElement('a');
          link.href = '/Anurag_Kumar_Resume.pdf';
          link.download = 'Anurag_Kumar_Resume.pdf';
          link.click();
          break;
        }

        default:
          break;
      }
      onClose();
    }
  }, [mode, filteredFiles, filteredCommands, onSelectFile, onClose,
      onToggleTerminal, onToggleSidebar, onOpenSettings, onOpenPanel,
      onClearTerminal, onToggleMinimap, onToggleLineNumbers, onChangeTheme]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(selectedIndex);
    } else if (e.key === 'Backspace' && search === '' && mode === 'files') {
      setMode('commands');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-xl bg-[hsl(220,13%,14%)] border-border overflow-hidden top-[20%] translate-y-0">
        <VisuallyHidden>
          <DialogTitle>Command Palette</DialogTitle>
        </VisuallyHidden>
        
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          {mode === 'files' ? (
            <Search className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          ) : (
            <CommandIcon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          )}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={mode === 'files' ? 'Search files by name...' : 'Type a command or search...'}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            autoFocus
            aria-label={mode === 'files' ? 'Search files' : 'Search commands'}
            role="combobox"
            aria-expanded={true}
            aria-controls="command-palette-results"
            aria-activedescendant={items.length > 0 ? `cp-item-${selectedIndex}` : undefined}
          />
          {mode === 'files' && (
            <button
              onClick={() => setMode('commands')}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              ESC
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto" id="command-palette-results" role="listbox">
          {mode === 'files' ? (
            filteredFiles.length > 0 ? (
              filteredFiles.map((file, index) => (
                <button
                  key={file.name}
                  onClick={() => handleSelect(index)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors
                    ${index === selectedIndex ? 'bg-muted' : 'hover:bg-muted/50'}`}
                >
                  <file.icon className={`w-4 h-4 ${file.color}`} />
                  <div className="flex-1 text-left">
                    <span className="text-foreground">{file.name}</span>
                    <span className="text-muted-foreground text-xs ml-2">{file.path}</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-muted-foreground">
                No files found
              </div>
            )
          ) : (
            <>
              {/* Recently Opened (only when no search) */}
              {!search && (
                <>
                  <div className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider">
                    Recently Opened
                  </div>
                  {files.slice(0, 3).map((file) => (
                    <button
                      key={file.name}
                      onClick={() => {
                        onSelectFile(file.name);
                        onClose();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 transition-colors hover:bg-muted/50"
                    >
                      <file.icon className={`w-4 h-4 ${file.color}`} />
                      <span className="text-foreground">{file.name}</span>
                    </button>
                  ))}
                  <div className="border-t border-border mt-1" />
                </>
              )}

              {/* Commands — grouped by category */}
              {(() => {
                let lastCategory = '';
                return filteredCommands.map((cmd, index) => {
                  const showCategory = cmd.category !== lastCategory;
                  lastCategory = cmd.category;
                  const CmdIcon = cmd.icon;
                  return (
                    <div key={cmd.action + cmd.name}>
                      {showCategory && (
                        <div className="px-3 py-1.5 text-[10px] text-muted-foreground uppercase tracking-wider mt-1 first:mt-0">
                          {cmd.category}
                        </div>
                      )}
                      <button
                        id={`cp-item-${index}`}
                        onClick={() => handleSelect(index)}
                        className={`w-full flex items-center gap-3 px-4 py-2 transition-colors
                          ${index === selectedIndex ? 'bg-muted' : 'hover:bg-muted/50'}`}
                        role="option"
                        aria-selected={index === selectedIndex}
                      >
                        <CmdIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="flex-1 text-left text-foreground text-sm">{cmd.name}</span>
                        {cmd.shortcut && (
                          <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">
                            {cmd.shortcut}
                          </span>
                        )}
                      </button>
                    </div>
                  );
                });
              })()}

              {filteredCommands.length === 0 && (
                <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                  No commands found
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;
