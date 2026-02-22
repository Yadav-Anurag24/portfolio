import { motion, AnimatePresence } from 'framer-motion';
import { useTerminal } from '@/contexts/TerminalContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { PeekableKeyword, usePeek, PeekPanel } from '../PeekDefinition';

const ReadmeContent = () => {
  const { addLog } = useTerminal();
  const { navigateToFile } = useNavigation();
  const { activeKeyword } = usePeek();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Comment */}
      <div className="leading-7">
        <span className="syntax-comment">{`<!-- PORTFOLIO-MASTER/README.md -->`}</span>
      </div>

      {/* Badge Row */}
      <div className="flex flex-wrap gap-2 leading-7">
        <span className="px-2 py-0.5 rounded text-xs bg-primary/20 text-primary">BCA @ LPU | CGPA: 8.2</span>
        <span className="px-2 py-0.5 rounded text-xs bg-syntax-string/20 text-syntax-string">Full Stack Developer</span>
        <span className="px-2 py-0.5 rounded text-xs bg-syntax-keyword/20 text-syntax-keyword">4-Star HackerRank</span>
      </div>

      {/* H1 Title */}
      <div className="leading-7">
        <span className="syntax-tag"># </span>
        <span className="text-3xl font-bold text-foreground">
          Hi, I'm{' '}
          <span className="syntax-function">Anurag Kumar</span>
        </span>
      </div>

      {/* Empty line */}
      <div className="leading-7">&nbsp;</div>

      {/* Bio blockquote */}
      <div className="leading-7 border-l-4 border-syntax-keyword pl-4">
        <span className="syntax-tag">&gt; </span>
        <span className="text-foreground">
          Full Stack Developer with freelance experience building production apps.
          <br />
          <span className="syntax-tag">&gt; </span>
          BCA student at Lovely Professional University | CGPA: 8.2
        </span>
      </div>

      {/* Empty line */}
      <div className="leading-7">&nbsp;</div>

      {/* H2 About */}
      <div className="leading-7">
        <span className="syntax-tag">## </span>
        <span className="text-xl font-semibold text-foreground">About Me</span>
      </div>

      {/* Description */}
      <div className="leading-7 text-foreground">
        I specialize in building full-stack applications using{' '}
        <PeekableKeyword keyword="node" className="syntax-keyword">Node.js</PeekableKeyword>,{' '}
        <PeekableKeyword keyword="express" className="syntax-keyword">Express</PeekableKeyword>, and modern frameworks like{' '}
        <PeekableKeyword keyword="react" className="syntax-function">React</PeekableKeyword>,{' '}
        <PeekableKeyword keyword="angular" className="syntax-function">Angular</PeekableKeyword>, and Next.js.
        Experienced with cloud deployment using AWS Amplify and Elastic Beanstalk.
      </div>
      <AnimatePresence>
        {activeKeyword && ['node', 'express', 'react', 'angular'].includes(activeKeyword) && (
          <PeekPanel keyword={activeKeyword} />
        )}
      </AnimatePresence>

      {/* Empty line */}
      <div className="leading-7">&nbsp;</div>

      {/* Education */}
      <div className="leading-7">
        <span className="syntax-tag">## </span>
        <span className="text-xl font-semibold text-foreground">Education</span>
      </div>

      <div className="leading-7 text-foreground space-y-2">
        <div>
          <span className="syntax-property">🎓 Degree:</span>{' '}
          <span className="syntax-string">"Bachelor of Computer Applications (BCA)"</span>
        </div>
        <div>
          <span className="syntax-property">🏫 University:</span>{' '}
          <span className="syntax-string">"Lovely Professional University"</span>
        </div>
        <div>
          <span className="syntax-property">📊 CGPA:</span>{' '}
          <span className="syntax-string">"8.2"</span>
        </div>
        <div>
          <span className="syntax-property">🏆 Achievements:</span>{' '}
          <span className="syntax-string">"4-Star HackerRank (C++) | 100+ LeetCode | State-Level Hackathon"</span>
        </div>
      </div>

      {/* Empty line */}
      <div className="leading-7">&nbsp;</div>

      {/* Quick Start */}
      <div className="leading-7">
        <span className="syntax-tag">## </span>
        <span className="text-xl font-semibold text-foreground">Quick Start</span>
      </div>

      <div className="leading-7 bg-[hsl(220,13%,10%)] rounded p-4 border border-border">
        <div className="text-muted-foreground text-xs mb-2"># Clone and explore</div>
        <div className="text-syntax-string">$ <span className="text-foreground">cd</span> PORTFOLIO-MASTER</div>
        <div className="text-syntax-string">$ <span className="text-foreground">cat</span> src/AboutMe.ts</div>
        <div className="text-syntax-string">$ <span className="text-foreground">cat</span> src/skills.json</div>
        <div className="text-syntax-string">$ <span className="text-foreground">open</span> src/components/Projects.jsx</div>
      </div>

      {/* Empty line */}
      <div className="leading-7">&nbsp;</div>

      {/* Navigation */}
      <div className="leading-7">
        <span className="syntax-tag">## </span>
        <span className="text-xl font-semibold text-foreground">Navigate This Portfolio</span>
      </div>

      <div className="leading-7 space-y-1">
        <div>
          <span className="syntax-comment">// Use Cmd+K (or Ctrl+K) to open Command Palette</span>
        </div>
        <div>
          <span className="syntax-keyword">→</span>{' '}
          <span
            className="syntax-function underline cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigateToFile('AboutMe.ts')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigateToFile('AboutMe.ts')}
          >AboutMe.ts</span>
          <span className="text-muted-foreground"> - Learn more about me</span>
        </div>
        <div>
          <span className="syntax-keyword">→</span>{' '}
          <span
            className="syntax-function underline cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigateToFile('skills.json')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigateToFile('skills.json')}
          >skills.json</span>
          <span className="text-muted-foreground"> - My tech dependencies</span>
        </div>
        <div>
          <span className="syntax-keyword">→</span>{' '}
          <span
            className="syntax-function underline cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigateToFile('Projects.jsx')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigateToFile('Projects.jsx')}
          >Projects.jsx</span>
          <span className="text-muted-foreground"> - View my work</span>
        </div>
        <div>
          <span className="syntax-keyword">→</span>{' '}
          <span
            className="syntax-function underline cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigateToFile('ContactForm.tsx')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigateToFile('ContactForm.tsx')}
          >ContactForm.tsx</span>
          <span className="text-muted-foreground"> - Get in touch</span>
        </div>
      </div>

      {/* Padding for scrolling */}
      <div className="h-20">&nbsp;</div>
    </motion.div>
  );
};

export default ReadmeContent;
