import { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, FolderOpen, FileText, FileJson, FileCode, File, FileType } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  children?: FileItem[];
}

interface FileExplorerProps {
  activeFile: string;
  onFileSelect: (fileName: string) => void;
}

const getFileIcon = (extension?: string, fileName?: string) => {
  if (fileName === 'README.md') {
    return <FileText className="w-4 h-4 text-syntax-function" />;
  }
  switch (extension) {
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
    case 'pdf':
      return <FileType className="w-4 h-4 text-red-400" />;
    case 'env':
      return <File className="w-4 h-4 text-syntax-string" />;
    default:
      return <FileText className="w-4 h-4 text-muted-foreground" />;
  }
};

const fileStructure: FileItem[] = [
  {
    name: 'PORTFOLIO-MASTER',
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'components',
            type: 'folder',
            children: [
              { name: 'Projects.jsx', type: 'file', extension: 'jsx' },
              { name: 'ContactForm.tsx', type: 'file', extension: 'tsx' },
            ],
          },
          { name: 'AboutMe.ts', type: 'file', extension: 'ts' },
          { name: 'skills.json', type: 'file', extension: 'json' },
        ],
      },
      { name: 'README.md', type: 'file', extension: 'md' },
      { name: 'resume.pdf', type: 'file', extension: 'pdf' },
    ],
  },
];

const FileTreeItem = ({
  item,
  depth = 0,
  activeFile,
  onFileSelect,
  defaultOpen = false,
}: {
  item: FileItem;
  depth?: number;
  activeFile: string;
  onFileSelect: (fileName: string) => void;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (item.type === 'folder') {
    return (
      <div>
        <div
          className="file-item flex items-center gap-1.5 text-sm select-none"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
          {isOpen ? (
            <FolderOpen className="w-4 h-4 text-syntax-variable" />
          ) : (
            <Folder className="w-4 h-4 text-syntax-variable" />
          )}
          <span className="text-foreground">{item.name}</span>
        </div>
        <AnimatePresence>
          {isOpen && item.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {item.children.map((child) => (
                <FileTreeItem
                  key={child.name}
                  item={child}
                  depth={depth + 1}
                  activeFile={activeFile}
                  onFileSelect={onFileSelect}
                  defaultOpen={child.type === 'folder'}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const isActive = activeFile === item.name;

  return (
    <div
      className={`file-item flex items-center gap-1.5 text-sm select-none ${
        isActive ? 'active' : ''
      }`}
      style={{ paddingLeft: `${depth * 12 + 24}px` }}
      onClick={() => onFileSelect(item.name)}
    >
      {getFileIcon(item.extension, item.name)}
      <span className={isActive ? 'text-primary' : 'text-foreground'}>{item.name}</span>
    </div>
  );
};

const FileExplorer = ({ activeFile, onFileSelect }: FileExplorerProps) => {
  return (
    <div className="h-full flex flex-col">
      {/* Explorer Header */}
      <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
        Explorer
      </div>

      {/* File Tree */}
      <div className="flex-1 py-2 overflow-y-auto">
        {fileStructure.map((item) => (
          <FileTreeItem
            key={item.name}
            item={item}
            activeFile={activeFile}
            onFileSelect={onFileSelect}
            defaultOpen={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
