import { useRef, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LineNumbers from './LineNumbers';
import Minimap from './Minimap';
import TypingReveal from './TypingReveal';
import CodeLoadingSkeleton from './CodeLoadingSkeleton';
import { PeekProvider } from './PeekDefinition';
import { useSettings } from '@/contexts/SettingsContext';

/* Lazy-loaded content components — each becomes its own chunk */
const ReadmeContent = lazy(() => import('./content/ReadmeContent'));
const ProjectsContent = lazy(() => import('./content/ProjectsContent'));
const StackContent = lazy(() => import('./content/StackContent'));
const ContactContent = lazy(() => import('./content/ContactContent'));
const AboutMeContent = lazy(() => import('./content/AboutMeContent'));
const ResumeContent = lazy(() => import('./content/ResumeContent'));

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
    case 'resume.pdf':
      return 40;
    default:
      return 30;
  }
};

const getContent = (file: string) => {
  switch (file) {
    case 'README.md':
      return <TypingReveal fileKey="README.md"><ReadmeContent /></TypingReveal>;
    case 'Projects.jsx':
      return <TypingReveal fileKey="Projects.jsx"><ProjectsContent /></TypingReveal>;
    case 'skills.json':
      return <TypingReveal fileKey="skills.json"><StackContent /></TypingReveal>;
    case 'ContactForm.tsx':
      return <TypingReveal fileKey="ContactForm.tsx"><ContactContent /></TypingReveal>;
    case 'AboutMe.ts':
      return <TypingReveal fileKey="AboutMe.ts"><AboutMeContent /></TypingReveal>;
    case 'resume.pdf':
      return <ResumeContent />;
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
    <PeekProvider activeFile={activeFile}>
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
          <Suspense fallback={<CodeLoadingSkeleton />}>
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
          </Suspense>
        </div>

        {/* Minimap */}
        {settings.showMinimap && (
          <Minimap activeFile={activeFile} scrollContainerRef={scrollRef} />
        )}
      </div>
    </PeekProvider>
  );
};

export default EditorContent;
