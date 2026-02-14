import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, FileJson, FileCode, File, ArrowRight, Command } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (fileName: string) => void;
  onToggleTerminal?: () => void;
  onToggleSidebar?: () => void;
}

const files = [
  { name: 'README.md', path: 'PORTFOLIO-MASTER/README.md', icon: FileText, color: 'text-syntax-function' },
  { name: 'AboutMe.ts', path: 'PORTFOLIO-MASTER/src/AboutMe.ts', icon: FileCode, color: 'text-syntax-variable' },
  { name: 'skills.json', path: 'PORTFOLIO-MASTER/src/skills.json', icon: FileJson, color: 'text-syntax-variable' },
  { name: 'Projects.jsx', path: 'PORTFOLIO-MASTER/src/components/Projects.jsx', icon: FileCode, color: 'text-syntax-function' },
  { name: 'ContactForm.tsx', path: 'PORTFOLIO-MASTER/src/components/ContactForm.tsx', icon: FileCode, color: 'text-syntax-property' },
];

const commands = [
  { name: 'Go to File...', shortcut: 'Ctrl+P', action: 'file' },
  { name: 'Toggle Terminal', shortcut: 'Ctrl+`', action: 'terminal' },
  { name: 'Toggle Sidebar', shortcut: 'Ctrl+B', action: 'sidebar' },
  { name: 'Download Resume', shortcut: '', action: 'resume' },
];

const CommandPalette = ({ isOpen, onClose, onSelectFile, onToggleTerminal, onToggleSidebar }: CommandPaletteProps) => {
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
      if (command) {
        if (command.action === 'file') {
          setMode('files');
          setSearch('');
        } else if (command.action === 'terminal') {
          onToggleTerminal?.();
          onClose();
        } else if (command.action === 'sidebar') {
          onToggleSidebar?.();
          onClose();
        } else if (command.action === 'resume') {
          // Download resume — opens resume link or triggers download
          window.open('https://github.com/Yadav-Anurag24', '_blank');
          onClose();
        } else {
          onClose();
        }
      }
    }
  }, [mode, filteredFiles, filteredCommands, onSelectFile, onClose]);

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
            <Search className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Command className="w-4 h-4 text-muted-foreground" />
          )}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={mode === 'files' ? 'Search files by name...' : 'Type a command or search...'}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            autoFocus
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
        <div className="max-h-80 overflow-y-auto">
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
              {/* Files Section */}
              <div className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider">
                Recently Opened
              </div>
              {files.slice(0, 3).map((file, index) => (
                <button
                  key={file.name}
                  onClick={() => {
                    onSelectFile(file.name);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 transition-colors hover:bg-muted/50`}
                >
                  <file.icon className={`w-4 h-4 ${file.color}`} />
                  <span className="text-foreground">{file.name}</span>
                </button>
              ))}

              {/* Commands Section */}
              <div className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider border-t border-border mt-2">
                Commands
              </div>
              {filteredCommands.map((cmd, index) => (
                <button
                  key={cmd.name}
                  onClick={() => handleSelect(index)}
                  className={`w-full flex items-center gap-3 px-4 py-2 transition-colors
                    ${index === selectedIndex ? 'bg-muted' : 'hover:bg-muted/50'}`}
                >
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="flex-1 text-left text-foreground">{cmd.name}</span>
                  {cmd.shortcut && (
                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {cmd.shortcut}
                    </span>
                  )}
                </button>
              ))}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;
