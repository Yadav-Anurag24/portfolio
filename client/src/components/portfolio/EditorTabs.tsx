import { X, FileText, FileJson, FileCode, File } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditorTabsProps {
  openTabs: string[];
  activeTab: string;
  onTabSelect: (tab: string) => void;
  onTabClose: (tab: string) => void;
}

const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop();
  switch (ext) {
    case 'md':
      return <FileText className="w-4 h-4 text-syntax-function" />;
    case 'json':
      return <FileJson className="w-4 h-4 text-syntax-variable" />;
    case 'js':
    case 'jsx':
      return <FileCode className="w-4 h-4 text-syntax-variable" />;
    case 'ts':
    case 'tsx':
      return <FileCode className="w-4 h-4 text-syntax-property" />;
    case 'env':
      return <File className="w-4 h-4 text-syntax-string" />;
    default:
      return <FileText className="w-4 h-4 text-muted-foreground" />;
  }
};

const EditorTabs = ({ openTabs, activeTab, onTabSelect, onTabClose }: EditorTabsProps) => {
  return (
    <div className="h-9 bg-tab-inactive border-b border-tab-border flex items-center overflow-x-auto">
      <AnimatePresence initial={false}>
        {openTabs.map((tab) => (
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10, width: 0 }}
            transition={{ duration: 0.15 }}
            className={`group flex items-center gap-2 h-full px-3 text-sm cursor-pointer border-r border-tab-border min-w-0 shrink-0 ${
              activeTab === tab
                ? 'bg-tab-active text-foreground border-t-2 border-t-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => onTabSelect(tab)}
          >
            {getFileIcon(tab)}
            <span className="truncate max-w-[120px]">{tab}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab);
              }}
              className="ml-1 p-0.5 rounded hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EditorTabs;
