import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LineNumbers from './LineNumbers';
import Minimap from './Minimap';
import ReadmeContent from './content/ReadmeContent';
import ProjectsContent from './content/ProjectsContent';
import StackContent from './content/StackContent';
import ContactContent from './content/ContactContent';
import AboutMeContent from './content/AboutMeContent';
import { useSettings } from '@/contexts/SettingsContext';

interface EditorContentProps {
  activeFile: string;
}

const getLineCount = (file: string): number => {
  switch (file) {
    case 'README.md':
      return 45;
    case 'Projects.jsx':
      return 60;
    case 'skills.json':
      return 55;
    case 'ContactForm.tsx':
      return 50;
    case 'AboutMe.ts':
      return 65;
    default:
      return 30;
  }
};

const getContent = (file: string) => {
  switch (file) {
    case 'README.md':
      return <ReadmeContent />;
    case 'Projects.jsx':
      return <ProjectsContent />;
    case 'skills.json':
      return <StackContent />;
    case 'ContactForm.tsx':
      return <ContactContent />;
    case 'AboutMe.ts':
      return <AboutMeContent />;
    default:
      return (
        <div className="text-muted-foreground italic">
          Select a file to view its contents
        </div>
      );
  }
};

const EditorContent = ({ activeFile }: EditorContentProps) => {
  const { settings } = useSettings();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Line numbers */}
      {settings.showLineNumbers && (
        <LineNumbers count={getLineCount(activeFile)} />
      )}

      {/* Content */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono"
        style={{ fontSize: `${settings.fontSize}px` }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFile}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {getContent(activeFile)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Minimap */}
      {settings.showMinimap && (
        <Minimap activeFile={activeFile} scrollContainerRef={scrollRef} />
      )}
    </div>
  );
};

export default EditorContent;
