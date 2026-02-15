import { useRef, useState, useEffect, useCallback, useMemo } from 'react';

// -------------------------------------------------------------------
// Syntax token types → CSS variable mapping
// -------------------------------------------------------------------

type TokenType =
  | 'keyword'
  | 'function'
  | 'string'
  | 'variable'
  | 'property'
  | 'comment'
  | 'number'
  | 'tag'
  | 'text'
  | 'blank';

const tokenColor: Record<TokenType, string> = {
  keyword: 'var(--syntax-keyword)',
  function: 'var(--syntax-function)',
  string: 'var(--syntax-string)',
  variable: 'var(--syntax-variable)',
  property: 'var(--syntax-property)',
  comment: 'var(--syntax-comment)',
  number: 'var(--syntax-number)',
  tag: 'var(--syntax-tag)',
  text: 'var(--foreground)',
  blank: 'transparent',
};

// -------------------------------------------------------------------
// Each minimap "line" is a sequence of token segments with widths
// -------------------------------------------------------------------

interface MinimapSegment {
  type: TokenType;
  width: number; // percentage width 0-100
}

interface MinimapLine {
  segments: MinimapSegment[];
}

// Helper to build a line
const ln = (...segs: [TokenType, number][]): MinimapLine => ({
  segments: segs.map(([type, width]) => ({ type, width })),
});

const blank = (): MinimapLine => ({ segments: [{ type: 'blank', width: 0 }] });

// -------------------------------------------------------------------
// Static minimap data per file — abstract code layout
// -------------------------------------------------------------------

const getMinimapData = (file: string): MinimapLine[] => {
  switch (file) {
    case 'README.md':
      return [
        ln(['comment', 45]),                                   // <!-- comment -->
        blank(),
        ln(['tag', 15], ['function', 15], ['tag', 15]),        // badges
        blank(),
        ln(['tag', 5], ['text', 50]),                          // # Title
        blank(),
        ln(['tag', 3], ['text', 60]),                          // > blockquote
        ln(['tag', 3], ['text', 55]),                          // > line 2
        blank(),
        ln(['tag', 5], ['text', 15]),                          // ## About
        blank(),
        ln(['text', 55], ['keyword', 10], ['text', 5]),        // description
        ln(['text', 30], ['function', 15], ['text', 15]),      // continued
        ln(['text', 20], ['function', 18], ['text', 10]),      // continued
        blank(),
        ln(['tag', 5], ['text', 15]),                          // ## Education
        blank(),
        ln(['property', 5], ['string', 25]),                   // 🎓 Status
        ln(['property', 5], ['string', 35]),                   // 📚 Course
        ln(['property', 5], ['string', 40]),                   // 🎯 Goal
        blank(),
        ln(['tag', 5], ['text', 18]),                          // ## Quick Start
        blank(),
        ln(['comment', 20]),                                   // # Clone
        ln(['string', 25]),                                    // $ cd
        ln(['string', 25]),                                    // $ cat
        ln(['string', 25]),                                    // $ cat
        ln(['string', 30]),                                    // $ open
        blank(),
        ln(['tag', 5], ['text', 25]),                          // ## Navigate
        blank(),
        ln(['comment', 45]),                                   // // Use Cmd+K
        ln(['keyword', 3], ['function', 15], ['text', 20]),    // → AboutMe.ts
        ln(['keyword', 3], ['function', 15], ['text', 20]),    // → skills.json
        ln(['keyword', 3], ['function', 15], ['text', 15]),    // → Projects
        ln(['keyword', 3], ['function', 15], ['text', 15]),    // → ContactForm
        blank(),
        blank(),
      ];

    case 'AboutMe.ts':
      return [
        ln(['comment', 20]),                                   // // src/AboutMe.ts
        ln(['comment', 40]),                                   // // Personal profile
        blank(),
        ln(['keyword', 12], ['property', 12]),                 // interface Developer
        ln(['property', 10], ['text', 3], ['variable', 10]),   // name: string
        ln(['property', 10], ['text', 3], ['variable', 10]),   // role: string
        ln(['property', 10], ['text', 3], ['variable', 10]),   // status: string
        ln(['property', 12], ['text', 3], ['variable', 10]),   // interests: string[]
        ln(['property', 12], ['text', 3], ['property', 12]),   // education: Education
        ln(['property', 10], ['text', 3], ['variable', 10]),   // goals: string[]
        ln(['text', 3]),                                       // }
        blank(),
        ln(['keyword', 12], ['property', 12]),                 // interface Education
        ln(['property', 10], ['text', 3], ['variable', 10]),   // degree
        ln(['property', 10], ['text', 3], ['variable', 10]),   // status
        ln(['property', 16], ['text', 3], ['variable', 10]),   // upcomingCourse
        ln(['property', 12], ['text', 3], ['variable', 8]),    // startDate
        ln(['text', 3]),                                       // }
        blank(),
        ln(['keyword', 8], ['variable', 10], ['text', 3], ['property', 12]),  // const aboutMe
        blank(),
        ln(['property', 10], ['text', 3], ['string', 30]),     // name: "Aspiring..."
        ln(['property', 10], ['text', 3], ['string', 40]),     // role: "Full Stack..."
        ln(['property', 10], ['text', 3], ['string', 42]),     // status: "Final Year..."
        blank(),
        ln(['property', 12], ['text', 5]),                     // interests: [
        ln(['string', 25]),                                    // "Backend Development"
        ln(['string', 22]),                                    // "Cloud Architecture"
        ln(['string', 20]),                                    // "System Design"
        ln(['string', 12]),                                    // "DevOps"
        ln(['string', 22]),                                    // "API Development"
        ln(['text', 3]),                                       // ]
        blank(),
        ln(['property', 12], ['text', 5]),                     // education: {
        ln(['property', 10], ['text', 3], ['string', 35]),     // degree
        ln(['property', 10], ['text', 3], ['string', 15]),     // status
        ln(['property', 16], ['text', 3], ['string', 35]),     // upcomingCourse
        ln(['property', 12], ['text', 3], ['keyword', 6], ['function', 8], ['string', 15]),  // startDate
        ln(['text', 3]),                                       // }
        blank(),
        ln(['property', 10], ['text', 5]),                     // goals: [
        ln(['string', 45]),                                    // "Obtain AWS..."
        ln(['string', 42]),                                    // "Build scalable..."
        ln(['string', 38]),                                    // "Contribute..."
        ln(['string', 35]),                                    // "Land a backend..."
        ln(['text', 3]),                                       // ]
        ln(['text', 4]),                                       // };
        blank(),
        ln(['keyword', 16], ['variable', 12]),                 // export default
        blank(),
        blank(),
      ];

    case 'skills.json':
      return [
        ln(['comment', 18]),                                   // // src/skills.json
        ln(['comment', 48]),                                   // // My technical deps
        blank(),
        ln(['text', 3]),                                       // {
        ln(['property', 18]),                                  // "dependencies": {
        ln(['property', 14], ['text', 3], ['string', 12]),     // "typescript"
        ln(['property', 14], ['text', 3], ['string', 10]),     // "javascript"
        ln(['property', 10], ['text', 3], ['string', 10]),     // "python"
        ln(['property', 8], ['text', 3], ['string', 8]),       // "java"
        ln(['property', 10], ['text', 3], ['string', 12]),     // "react"
        ln(['property', 16], ['text', 3], ['string', 10]),     // "react-native"
        ln(['property', 12], ['text', 3], ['string', 12]),     // "angular"
        ln(['property', 10], ['text', 3], ['string', 10]),     // "ionic"
        ln(['property', 8], ['text', 3], ['string', 12]),      // "node"
        ln(['property', 12], ['text', 3], ['string', 12]),     // "express"
        ln(['property', 10], ['text', 3], ['string', 12]),     // "nestjs"
        ln(['text', 3]),                                       // }
        ln(['property', 22]),                                  // "devDependencies": {
        ln(['property', 12], ['text', 3], ['string', 12]),     // "mongodb"
        ln(['property', 14], ['text', 3], ['string', 10]),     // "postgresql"
        ln(['property', 10], ['text', 3], ['string', 10]),     // "redis"
        ln(['property', 12], ['text', 3], ['string', 10]),     // "aws-sdk"
        ln(['property', 10], ['text', 3], ['string', 12]),     // "docker"
        ln(['property', 14], ['text', 3], ['string', 10]),     // "kubernetes"
        ln(['property', 8], ['text', 3], ['string', 10]),      // "git"
        ln(['property', 10], ['text', 3], ['string', 10]),     // "vscode"
        ln(['property', 12], ['text', 3], ['string', 10]),     // "postman"
        ln(['text', 3]),                                       // }
        ln(['property', 14]),                                  // "learning": {
        ln(['property', 26], ['text', 3], ['string', 16]),     // "aws-solutions-architect"
        ln(['property', 20], ['text', 3], ['string', 22]),     // "cloud-computing"
        ln(['property', 18], ['text', 3], ['string', 12]),     // "system-design"
        ln(['text', 3]),                                       // }
        ln(['text', 3]),                                       // }
        blank(),
        ln(['comment', 30]),                                   // // Proficiency
        blank(),
        ln(['property', 10], ['number', 30]),                  // Node.js bar
        ln(['property', 18], ['number', 28]),                  // React/RN bar
        ln(['property', 16], ['number', 26]),                  // Angular bar
        ln(['property', 12], ['number', 28]),                  // MongoDB bar
        ln(['property', 14], ['number', 29]),                  // Express bar
        ln(['property', 8], ['number', 22]),                   // AWS bar
        ln(['property', 10], ['number', 20]),                  // Docker bar
        ln(['property', 14], ['number', 27]),                  // TypeScript bar
        blank(),
        blank(),
      ];

    case 'Projects.jsx':
      return [
        ln(['comment', 32]),                                   // // src/components/Projects
        ln(['comment', 36]),                                   // // Hover over each
        blank(),
        ln(['keyword', 10], ['text', 5], ['variable', 10], ['keyword', 8], ['string', 14]),  // import
        blank(),
        ln(['keyword', 8], ['variable', 12], ['keyword', 3], ['property', 12]),  // const projects
        // Project 1
        ln(['text', 5]),                                       // {
        ln(['property', 10], ['text', 3], ['string', 28]),     // name: "Smart Parking"
        ln(['property', 15], ['text', 3], ['string', 45]),     // description
        ln(['property', 12], ['text', 3], ['string', 8], ['string', 10], ['string', 10], ['string', 18]),  // techStack
        ln(['property', 10], ['text', 3], ['string', 14]),     // status
        ln(['text', 5]),                                       // }
        // Project 2
        ln(['text', 5]),                                       // {
        ln(['property', 10], ['text', 3], ['string', 22]),     // name: "HPCL"
        ln(['property', 15], ['text', 3], ['string', 50]),     // description
        ln(['property', 12], ['text', 3], ['string', 16], ['string', 12], ['string', 10]),  // techStack
        ln(['property', 10], ['text', 3], ['string', 18]),     // status
        ln(['property', 10], ['text', 3], ['string', 16], ['string', 15], ['string', 20]),  // features
        ln(['text', 5]),                                       // }
        // Project 3
        ln(['text', 5]),                                       // {
        ln(['property', 10], ['text', 3], ['string', 28]),     // name: "Bookstore"
        ln(['property', 15], ['text', 3], ['string', 52]),     // description
        ln(['property', 12], ['text', 3], ['string', 10], ['string', 10], ['string', 6], ['string', 12]),  // techStack
        ln(['property', 10], ['text', 3], ['string', 14]),     // status
        ln(['text', 5]),                                       // }
        ln(['text', 4]),                                       // ];
        blank(),
        ln(['keyword', 16], ['variable', 12]),                 // export default
        blank(),
        blank(),
        blank(),
        blank(),
        blank(),
        blank(),
      ];

    case 'ContactForm.tsx':
      return [
        ln(['comment', 35]),                                   // // src/components/ContactForm
        ln(['comment', 40]),                                   // // Type-safe contact
        blank(),
        ln(['keyword', 10], ['text', 5], ['variable', 12], ['keyword', 8], ['string', 10]),  // import
        blank(),
        ln(['keyword', 12], ['property', 18]),                 // interface ContactFormData
        ln(['property', 10], ['text', 3], ['variable', 10]),   // name
        ln(['property', 10], ['text', 3], ['variable', 10]),   // email
        ln(['property', 12], ['text', 3], ['variable', 10]),   // subject
        ln(['property', 12], ['text', 3], ['variable', 10]),   // message
        ln(['text', 3]),                                       // }
        blank(),
        ln(['comment', 28]),                                   // // Rendered Form
        ln(['comment', 35]),                                   // // <form>
        ln(['comment', 42]),                                   // //   <input name />
        ln(['comment', 45]),                                   // //   <input email />
        ln(['comment', 45]),                                   // //   <input subject />
        ln(['comment', 50]),                                   // //   <textarea />
        ln(['comment', 35]),                                   // //   <button />
        ln(['comment', 12]),                                   // // </form>
        blank(),
        ln(['comment', 32]),                                   // // Alternative Contact
        ln(['property', 10], ['text', 3], ['string', 35]),     // EMAIL
        ln(['property', 10], ['text', 3], ['string', 42]),     // GITHUB
        ln(['property', 12], ['text', 3], ['string', 40]),     // LINKEDIN
        ln(['property', 12], ['text', 3], ['string', 14]),     // LOCATION
        blank(),
        blank(),
        blank(),
        blank(),
        blank(),
      ];

    default:
      return Array.from({ length: 30 }, () => ln(['text', 20 + Math.random() * 40]));
  }
};

// -------------------------------------------------------------------
// Minimap component
// -------------------------------------------------------------------

interface MinimapProps {
  activeFile: string;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const LINE_HEIGHT = 3;   // px per minimap line
const GAP = 1;           // px gap between lines
const MINIMAP_WIDTH = 60; // px

const Minimap = ({ activeFile, scrollContainerRef }: MinimapProps) => {
  const minimapRef = useRef<HTMLDivElement>(null);
  const [viewportTop, setViewportTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartScrollTop = useRef(0);

  const lines = useMemo(() => getMinimapData(activeFile), [activeFile]);
  const totalMinimapHeight = lines.length * (LINE_HEIGHT + GAP);

  // Update viewport indicator on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateViewport = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight <= 0) return;

      const ratio = clientHeight / scrollHeight;
      const topRatio = scrollTop / scrollHeight;

      setViewportHeight(Math.max(15, ratio * totalMinimapHeight));
      setViewportTop(topRatio * totalMinimapHeight);
    };

    updateViewport();
    container.addEventListener('scroll', updateViewport, { passive: true });
    window.addEventListener('resize', updateViewport);

    return () => {
      container.removeEventListener('scroll', updateViewport);
      window.removeEventListener('resize', updateViewport);
    };
  }, [scrollContainerRef, totalMinimapHeight, activeFile]);

  // Click on minimap to scroll
  const handleMinimapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = scrollContainerRef.current;
      const minimap = minimapRef.current;
      if (!container || !minimap) return;

      const rect = minimap.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const ratio = clickY / totalMinimapHeight;
      const targetScroll = ratio * container.scrollHeight - container.clientHeight / 2;

      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    },
    [scrollContainerRef, totalMinimapHeight]
  );

  // Drag viewport slider
  const handleViewportMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const container = scrollContainerRef.current;
      if (!container) return;

      setIsDragging(true);
      dragStartY.current = e.clientY;
      dragStartScrollTop.current = container.scrollTop;
    },
    [scrollContainerRef]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const deltaY = e.clientY - dragStartY.current;
      const scrollRatio = container.scrollHeight / totalMinimapHeight;
      container.scrollTop = dragStartScrollTop.current + deltaY * scrollRatio;
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, scrollContainerRef, totalMinimapHeight]);

  return (
    <div
      className="hidden md:flex flex-col flex-shrink-0 relative select-none cursor-pointer"
      style={{ width: MINIMAP_WIDTH }}
      ref={minimapRef}
      onClick={handleMinimapClick}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-card/50" />

      {/* Lines */}
      <div className="relative py-2 px-1.5">
        {lines.map((line, i) => (
          <div
            key={i}
            className="flex gap-px"
            style={{ height: LINE_HEIGHT, marginBottom: GAP }}
          >
            {line.segments.map((seg, j) =>
              seg.type === 'blank' ? null : (
                <div
                  key={j}
                  style={{
                    width: `${seg.width}%`,
                    backgroundColor: tokenColor[seg.type],
                    opacity: 0.7,
                    borderRadius: 1,
                    height: '100%',
                  }}
                />
              )
            )}
          </div>
        ))}
      </div>

      {/* Viewport indicator */}
      <div
        className={`absolute left-0 right-0 border border-muted-foreground/20 transition-colors ${
          isDragging ? 'bg-muted-foreground/15' : 'bg-muted-foreground/8 hover:bg-muted-foreground/12'
        }`}
        style={{
          top: viewportTop + 8, // 8px for py-2 padding
          height: viewportHeight,
          borderRadius: 2,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleViewportMouseDown}
      />
    </div>
  );
};

export default Minimap;
