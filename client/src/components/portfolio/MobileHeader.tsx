import { Menu, X } from 'lucide-react';

interface MobileHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  activeFile: string;
}

const MobileHeader = ({ isSidebarOpen, onToggleSidebar, activeFile }: MobileHeaderProps) => {
  return (
    <div className="flex items-center justify-between h-10 px-3 bg-tab-inactive border-b border-border md:hidden">
      <button
        onClick={onToggleSidebar}
        className="p-1.5 rounded hover:bg-muted transition-colors"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5 text-foreground" />
        ) : (
          <Menu className="w-5 h-5 text-foreground" />
        )}
      </button>
      <span className="text-sm font-mono text-muted-foreground">{activeFile}</span>
      <div className="w-8" /> {/* Spacer for centering */}
    </div>
  );
};

export default MobileHeader;