import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ActivityBar from './ActivityBar';
import FileExplorer from './FileExplorer';
import EditorTabs from './EditorTabs';
import EditorContent from './EditorContent';
import StatusBar from './StatusBar';
import MobileHeader from './MobileHeader';
import Terminal from './Terminal';
import CommandPalette from './CommandPalette';
import Breadcrumbs from './Breadcrumbs';
import { TerminalProvider, useTerminal } from '@/contexts/TerminalContext';

const CodeEditorLayoutInner = () => {
  const [activeFile, setActiveFile] = useState('README.md');
  const [openTabs, setOpenTabs] = useState(['README.md']);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('explorer');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  
  const { addLog } = useTerminal();

  const handleFileSelect = useCallback((fileName: string) => {
    setActiveFile(fileName);
    if (!openTabs.includes(fileName)) {
      setOpenTabs((prev) => [...prev, fileName]);
    }
    addLog('info', `> navigating to /${getFilePath(fileName)}`);
    // Close sidebar on mobile after selection
    setIsSidebarOpen(false);
  }, [openTabs, addLog]);

  const handleTabClose = useCallback((tab: string) => {
    const newTabs = openTabs.filter((t) => t !== tab);
    setOpenTabs(newTabs);

    // If closing active tab, switch to last open tab
    if (tab === activeFile && newTabs.length > 0) {
      setActiveFile(newTabs[newTabs.length - 1]);
    }

    // Always keep at least one tab open
    if (newTabs.length === 0) {
      setOpenTabs(['README.md']);
      setActiveFile('README.md');
    }
  }, [openTabs, activeFile]);

  // Command Palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      // Ctrl+` for terminal
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
      // Ctrl+B for sidebar
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getFilePath = (fileName: string): string => {
    switch (fileName) {
      case 'README.md':
        return 'README.md';
      case 'AboutMe.ts':
        return 'src/AboutMe.ts';
      case 'skills.json':
        return 'src/skills.json';
      case 'Projects.jsx':
        return 'src/components/Projects.jsx';
      case 'ContactForm.tsx':
        return 'src/components/ContactForm.tsx';
      default:
        return fileName;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background">
      {/* Mobile Header */}
      <MobileHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeFile={activeFile}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar - Desktop */}
        <div className="hidden md:block">
          <ActivityBar activePanel={activePanel} onPanelChange={setActivePanel} />
        </div>

        {/* Sidebar - Desktop */}
        <AnimatePresence>
          {activePanel === 'explorer' && (
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: 240 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden md:flex flex-shrink-0 bg-sidebar border-r border-border flex-col overflow-hidden"
            >
              <FileExplorer activeFile={activeFile} onFileSelect={handleFileSelect} />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Sidebar - Mobile (Overlay) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />

              {/* Sidebar */}
              <motion.aside
                initial={{ x: -240 }}
                animate={{ x: 0 }}
                exit={{ x: -240 }}
                transition={{ type: 'tween', duration: 0.2 }}
                className="fixed left-0 top-10 bottom-0 w-60 bg-sidebar border-r border-border z-50 md:hidden"
              >
                <FileExplorer activeFile={activeFile} onFileSelect={handleFileSelect} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Editor Area */}
        <main className="flex flex-1 flex-col overflow-hidden bg-card">
          {/* Editor Tabs - Desktop */}
          <div className="hidden md:block">
            <EditorTabs
              openTabs={openTabs}
              activeTab={activeFile}
              onTabSelect={setActiveFile}
              onTabClose={handleTabClose}
            />
            {/* Breadcrumbs */}
            <Breadcrumbs filePath={activeFile} />
          </div>

          {/* Editor Content */}
          <EditorContent activeFile={activeFile} />

          {/* Terminal Panel */}
          <Terminal
            isOpen={isTerminalOpen}
            onToggle={() => setIsTerminalOpen(false)}
            isMaximized={isTerminalMaximized}
            onMaximize={() => setIsTerminalMaximized(!isTerminalMaximized)}
          />
        </main>
      </div>

      {/* Status Bar */}
      <StatusBar 
        onTerminalToggle={() => setIsTerminalOpen(!isTerminalOpen)}
        isTerminalOpen={isTerminalOpen}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectFile={handleFileSelect}
      />
    </div>
  );
};

const CodeEditorLayout = () => {
  return (
    <TerminalProvider>
      <CodeEditorLayoutInner />
    </TerminalProvider>
  );
};

export default CodeEditorLayout;
