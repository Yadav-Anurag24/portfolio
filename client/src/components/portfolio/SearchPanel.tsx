import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronRight, FileText, CaseSensitive, Regex, WholeWord, X } from 'lucide-react';
import { useNavigation } from '@/contexts/NavigationContext';

// -------------------------------------------------------------------
// Static searchable index – every line of "source code" that the
// visitor sees in the editor panes is represented here so that
// full-text search can match file, line-number and highlighted text.
// -------------------------------------------------------------------

interface SearchableLine {
  file: string;       // display path
  fileName: string;   // key used by handleFileSelect
  line: number;
  text: string;
}

const buildIndex = (): SearchableLine[] => {
  const lines: SearchableLine[] = [];

  const add = (file: string, fileName: string, texts: string[]) => {
    texts.forEach((t, i) => lines.push({ file, fileName, line: i + 1, text: t }));
  };

  // README.md
  add('PORTFOLIO-MASTER/README.md', 'README.md', [
    '<!-- PORTFOLIO-MASTER/README.md -->',
    '',
    '![Final Year Student] ![Backend Developer] ![Cloud Enthusiast]',
    '',
    '# Hi, I\'m an Aspiring Backend Developer',
    '',
    '> Final Year Student passionate about building scalable backend systems.',
    '> Currently pursuing Cloud Computing certification (Jan 2026).',
    '',
    '## About Me',
    '',
    'I specialize in building robust backend systems using Node.js,',
    'Express, and cloud technologies. Experienced with mobile',
    'development using React Native and Ionic/Angular.',
    '',
    '## Education',
    '',
    '🎓 Status: "Final Year Student"',
    '📚 Course: "Cloud Computing (Starting Jan 2026)"',
    '🎯 Goal: "AWS Solutions Architect Certification"',
    '',
    '## Quick Start',
    '',
    '# Clone and explore',
    '$ cd PORTFOLIO-MASTER',
    '$ cat src/AboutMe.ts',
    '$ cat src/skills.json',
    '$ open src/components/Projects.jsx',
    '',
    '## Navigate This Portfolio',
    '',
    '// Use Cmd+K (or Ctrl+K) to open Command Palette',
    '→ AboutMe.ts - Learn more about me',
    '→ skills.json - My tech dependencies',
    '→ Projects.jsx - View my work',
    '→ ContactForm.tsx - Get in touch',
  ]);

  // src/AboutMe.ts
  add('src/AboutMe.ts', 'AboutMe.ts', [
    '// src/AboutMe.ts',
    '// Personal profile and career information',
    '',
    'interface Developer {',
    '  name: string;',
    '  role: string;',
    '  status: string;',
    '  interests: string[];',
    '  education: Education;',
    '  goals: string[];',
    '}',
    '',
    'interface Education {',
    '  degree: string;',
    '  status: string;',
    '  upcomingCourse: string;',
    '  startDate: Date;',
    '}',
    '',
    'const aboutMe: Developer = {',
    '  name: "Aspiring Backend Developer",',
    '  role: "Full Stack Developer (Backend Focus)",',
    '  status: "Final Year Student | Open to Opportunities",',
    '  interests: [',
    '    "Backend Development",',
    '    "Cloud Architecture",',
    '    "System Design",',
    '    "DevOps",',
    '    "API Development"',
    '  ],',
    '  education: {',
    '    degree: "Bachelor\'s in Computer Science",',
    '    status: "Final Year",',
    '    upcomingCourse: "Cloud Computing Specialization",',
    '    startDate: new Date("2026-01-01")',
    '  },',
    '  goals: [',
    '    "Obtain AWS Solutions Architect certification",',
    '    "Build scalable microservices architecture",',
    '    "Contribute to open source projects",',
    '    "Land a backend developer role"',
    '  ]',
    '};',
    '',
    'export default aboutMe;',
  ]);

  // src/skills.json
  add('src/skills.json', 'skills.json', [
    '// src/skills.json',
    '// My technical dependencies and proficiency levels',
    '',
    '{',
    '  "dependencies": {',
    '    "typescript": "^5.0.0",',
    '    "javascript": "ES2024",',
    '    "python": "^3.12",',
    '    "java": "^17",',
    '    "react": "^18.2.0",',
    '    "react-native": "^0.73",',
    '    "angular": "^17.0.0",',
    '    "ionic": "^7.0.0",',
    '    "node": "^20.0.0",',
    '    "express": "^4.18.0",',
    '    "nestjs": "^10.0.0"',
    '  },',
    '  "devDependencies": {',
    '    "mongodb": "^6.0.0",',
    '    "postgresql": "^16.0",',
    '    "redis": "^7.0.0",',
    '    "aws-sdk": "^3.0.0",',
    '    "docker": "^24.0.0",',
    '    "kubernetes": "^1.28",',
    '    "git": "^2.42",',
    '    "vscode": "latest",',
    '    "postman": "latest"',
    '  },',
    '  "learning": {',
    '    "aws-solutions-architect": "in-progress",',
    '    "cloud-computing": "starting Jan 2026",',
    '    "system-design": "ongoing"',
    '  }',
    '}',
  ]);

  // src/components/Projects.jsx
  add('src/components/Projects.jsx', 'Projects.jsx', [
    '// src/components/Projects.jsx',
    '// Hover over each project for preview',
    '',
    'import { Project } from \'@/types\';',
    '',
    'const projects: Project[] = [',
    '  {',
    '    name: "Smart Parking Finder",',
    '    description: "IoT-based app to find parking slots in real-time.",',
    '    techStack: ["Ionic", "Angular", "Node.js", "Google Maps API"],',
    '    status: "Completed"',
    '  },',
    '  {',
    '    name: "HPCL Dealer App",',
    '    description: "Official mobile app for HPCL dealers to track inventory.",',
    '    techStack: ["React Native", "Firebase", "Redux"],',
    '    status: "In Development",',
    '    features: ["Real-time slots", "Google Maps", "Payment Gateway"]',
    '  },',
    '  {',
    '    name: "Bookstore Auth System",',
    '    description: "Secure authentication system with role-based access control.",',
    '    techStack: ["Node.js", "Express", "JWT", "MongoDB"],',
    '    status: "Completed"',
    '  }',
    '];',
    '',
    'export default projects;',
  ]);

  // src/components/ContactForm.tsx
  add('src/components/ContactForm.tsx', 'ContactForm.tsx', [
    '// src/components/ContactForm.tsx',
    '// Type-safe contact form with validation',
    '',
    'import { useState } from \'react\';',
    '',
    'interface ContactFormData {',
    '  name: string;',
    '  email: string;',
    '  subject: string;',
    '  message: string;',
    '}',
    '',
    '// Rendered Form Component',
    '// <form onSubmit={handleSubmit}>',
    '//   <input name="name" placeholder="Your Name" />',
    '//   <input name="email" placeholder="your@email.com" />',
    '//   <input name="subject" placeholder="Project Inquiry" />',
    '//   <textarea name="message" placeholder="Your message here..." />',
    '//   <button>await sendMessage()</button>',
    '// </form>',
    '',
    '// Alternative Contact Methods',
    'EMAIL="anuragkumarmsd456@gmail.com"',
    'GITHUB="https://github.com/Yadav-Anurag24"',
    'LINKEDIN="https://linkedin.com/in/anurag24kumar"',
    'LOCATION="India 🇮🇳"',
  ]);

  return lines;
};

// Singleton index
const SEARCH_INDEX = buildIndex();

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

interface SearchMatch {
  line: number;
  text: string;
  matchRanges: [number, number][]; // [start, end] pairs for highlighting
}

interface FileResult {
  file: string;
  fileName: string;
  matches: SearchMatch[];
}

// -------------------------------------------------------------------
// Component
// -------------------------------------------------------------------

interface SearchPanelProps {
  onFileSelect: (fileName: string) => void;
}

const SearchPanel = ({ onFileSelect }: SearchPanelProps) => {
  const [query, setQuery] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [collapsedFiles, setCollapsedFiles] = useState<Set<string>>(new Set());
  const { navigateToFile } = useNavigation();

  // Perform search
  const results: FileResult[] = useMemo(() => {
    if (!query || query.length < 2) return [];

    try {
      // Build pattern
      let pattern: string;
      if (useRegex) {
        pattern = query;
      } else {
        // Escape regex special chars for literal search
        pattern = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      if (wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }

      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(pattern, flags);

      // Group results by file
      const fileMap = new Map<string, FileResult>();

      for (const entry of SEARCH_INDEX) {
        if (!entry.text) continue;

        const lineMatches: [number, number][] = [];
        let match: RegExpExecArray | null;

        // Reset lastIndex for each line
        regex.lastIndex = 0;
        while ((match = regex.exec(entry.text)) !== null) {
          lineMatches.push([match.index, match.index + match[0].length]);
          // Prevent infinite loop on zero-length matches
          if (match[0].length === 0) regex.lastIndex++;
        }

        if (lineMatches.length > 0) {
          if (!fileMap.has(entry.file)) {
            fileMap.set(entry.file, {
              file: entry.file,
              fileName: entry.fileName,
              matches: [],
            });
          }
          fileMap.get(entry.file)!.matches.push({
            line: entry.line,
            text: entry.text,
            matchRanges: lineMatches,
          });
        }
      }

      return Array.from(fileMap.values());
    } catch {
      // Invalid regex – show no results
      return [];
    }
  }, [query, caseSensitive, wholeWord, useRegex]);

  const totalMatches = useMemo(
    () => results.reduce((sum, f) => sum + f.matches.reduce((s, m) => s + m.matchRanges.length, 0), 0),
    [results]
  );

  const toggleFileCollapse = useCallback((file: string) => {
    setCollapsedFiles(prev => {
      const next = new Set(prev);
      if (next.has(file)) next.delete(file);
      else next.add(file);
      return next;
    });
  }, []);

  const handleResultClick = useCallback((fileName: string) => {
    onFileSelect(fileName);
    navigateToFile(fileName);
  }, [onFileSelect, navigateToFile]);

  // Render text with highlighted matches
  const renderHighlightedText = (text: string, ranges: [number, number][]) => {
    if (ranges.length === 0) return <span className="text-muted-foreground">{text}</span>;

    const parts: React.ReactNode[] = [];
    let lastEnd = 0;

    ranges.forEach(([start, end], i) => {
      // Text before match
      if (start > lastEnd) {
        parts.push(
          <span key={`pre-${i}`} className="text-muted-foreground">
            {text.slice(lastEnd, start)}
          </span>
        );
      }
      // Highlighted match
      parts.push(
        <span
          key={`match-${i}`}
          className="bg-[#613214] text-[#e8b06e] border border-[#e8b06e]/30 rounded-sm px-0.5"
        >
          {text.slice(start, end)}
        </span>
      );
      lastEnd = end;
    });

    // Remaining text
    if (lastEnd < text.length) {
      parts.push(
        <span key="post" className="text-muted-foreground">
          {text.slice(lastEnd)}
        </span>
      );
    }

    return <>{parts}</>;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-xs text-muted-foreground uppercase tracking-wider px-4 pt-3 pb-2">
        Search
      </div>

      {/* Search Input */}
      <div className="px-3 pb-2 space-y-2">
        <div className="flex items-center gap-1 bg-muted/50 border border-border rounded focus-within:ring-1 focus-within:ring-primary/50">
          <Search className="w-3.5 h-3.5 text-muted-foreground ml-2 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 px-1.5 py-1.5 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-mono"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-0.5 mr-1 text-muted-foreground hover:text-foreground transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Toggle buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCaseSensitive(!caseSensitive)}
            className={`p-1 rounded text-xs transition-colors ${
              caseSensitive
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            title="Match Case (Alt+C)"
          >
            <CaseSensitive className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setWholeWord(!wholeWord)}
            className={`p-1 rounded text-xs transition-colors ${
              wholeWord
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            title="Match Whole Word (Alt+W)"
          >
            <WholeWord className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setUseRegex(!useRegex)}
            className={`p-1 rounded text-xs transition-colors ${
              useRegex
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            title="Use Regular Expression (Alt+R)"
          >
            <Regex className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto text-sm">
        {query.length >= 2 && results.length === 0 && (
          <div className="px-4 py-6 text-center text-xs text-muted-foreground">
            No results found for "{query}"
          </div>
        )}

        {query.length < 2 && query.length > 0 && (
          <div className="px-4 py-6 text-center text-xs text-muted-foreground">
            Type at least 2 characters to search
          </div>
        )}

        {query.length === 0 && (
          <div className="px-4 py-8 text-center space-y-3">
            <Search className="w-8 h-8 text-muted-foreground/30 mx-auto" />
            <div className="text-xs text-muted-foreground">
              Search across all portfolio files
            </div>
            <div className="text-[10px] text-muted-foreground/60 space-y-1">
              <div>Try: "react", "nodejs", "backend"</div>
              <div>Use toggles for case, whole word, or regex</div>
            </div>
          </div>
        )}

        {/* Match count */}
        {results.length > 0 && (
          <div className="px-4 py-1.5 text-xs text-muted-foreground border-b border-border">
            {totalMatches} result{totalMatches !== 1 ? 's' : ''} in {results.length} file{results.length !== 1 ? 's' : ''}
          </div>
        )}

        {/* File results */}
        <AnimatePresence>
          {results.map((fileResult) => {
            const isCollapsed = collapsedFiles.has(fileResult.file);
            const fileMatchCount = fileResult.matches.reduce(
              (s, m) => s + m.matchRanges.length, 0
            );

            return (
              <motion.div
                key={fileResult.file}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                {/* File header */}
                <button
                  onClick={() => toggleFileCollapse(fileResult.file)}
                  className="w-full flex items-center gap-1.5 px-2 py-1 hover:bg-muted/40 transition-colors group text-left"
                >
                  {isCollapsed ? (
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  )}
                  <FileText className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-foreground truncate flex-1">
                    {fileResult.file}
                  </span>
                  <span className="text-[10px] bg-muted/60 text-muted-foreground px-1.5 rounded-full flex-shrink-0">
                    {fileMatchCount}
                  </span>
                </button>

                {/* Line results */}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      {fileResult.matches.map((match, i) => (
                        <button
                          key={`${fileResult.file}-${match.line}-${i}`}
                          onClick={() => handleResultClick(fileResult.fileName)}
                          className="w-full flex items-start gap-2 pl-8 pr-2 py-0.5 hover:bg-muted/30 transition-colors text-left group/line cursor-pointer"
                        >
                          <span className="text-[10px] text-muted-foreground/60 w-5 text-right flex-shrink-0 font-mono pt-0.5">
                            {match.line}
                          </span>
                          <span className="text-xs font-mono truncate leading-5">
                            {renderHighlightedText(match.text, match.matchRanges)}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchPanel;
