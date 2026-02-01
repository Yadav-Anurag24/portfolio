import { motion } from 'framer-motion';
import { useTerminal } from '@/contexts/TerminalContext';

const ReadmeContent = () => {
  const { addLog } = useTerminal();

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
        <span className="px-2 py-0.5 rounded text-xs bg-primary/20 text-primary">Final Year Student</span>
        <span className="px-2 py-0.5 rounded text-xs bg-syntax-string/20 text-syntax-string">Backend Developer</span>
        <span className="px-2 py-0.5 rounded text-xs bg-syntax-keyword/20 text-syntax-keyword">Cloud Enthusiast</span>
      </div>

      {/* H1 Title */}
      <div className="leading-7">
        <span className="syntax-tag"># </span>
        <span className="text-3xl font-bold text-foreground">
          Hi, I'm an{' '}
          <span className="syntax-function">Aspiring Backend Developer</span>
        </span>
      </div>

      {/* Empty line */}
      <div className="leading-7">&nbsp;</div>

      {/* Bio blockquote */}
      <div className="leading-7 border-l-4 border-syntax-keyword pl-4">
        <span className="syntax-tag">&gt; </span>
        <span className="text-foreground">
          Final Year Student passionate about building scalable backend systems.
          <br />
          <span className="syntax-tag">&gt; </span>
          Currently pursuing Cloud Computing certification (Jan 2026).
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
        I specialize in building robust backend systems using{' '}
        <span className="syntax-keyword">Node.js</span>,{' '}
        <span className="syntax-keyword">Express</span>, and cloud technologies.
        Experienced with mobile development using{' '}
        <span className="syntax-function">React Native</span> and{' '}
        <span className="syntax-function">Ionic/Angular</span>.
      </div>

      {/* Empty line */}
      <div className="leading-7">&nbsp;</div>

      {/* Education */}
      <div className="leading-7">
        <span className="syntax-tag">## </span>
        <span className="text-xl font-semibold text-foreground">Education</span>
      </div>

      <div className="leading-7 text-foreground space-y-2">
        <div>
          <span className="syntax-property">🎓 Status:</span>{' '}
          <span className="syntax-string">"Final Year Student"</span>
        </div>
        <div>
          <span className="syntax-property">📚 Course:</span>{' '}
          <span className="syntax-string">"Cloud Computing (Starting Jan 2026)"</span>
        </div>
        <div>
          <span className="syntax-property">🎯 Goal:</span>{' '}
          <span className="syntax-string">"AWS Solutions Architect Certification"</span>
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
          <span className="syntax-function underline cursor-pointer">AboutMe.ts</span>
          <span className="text-muted-foreground"> - Learn more about me</span>
        </div>
        <div>
          <span className="syntax-keyword">→</span>{' '}
          <span className="syntax-function underline cursor-pointer">skills.json</span>
          <span className="text-muted-foreground"> - My tech dependencies</span>
        </div>
        <div>
          <span className="syntax-keyword">→</span>{' '}
          <span className="syntax-function underline cursor-pointer">Projects.jsx</span>
          <span className="text-muted-foreground"> - View my work</span>
        </div>
        <div>
          <span className="syntax-keyword">→</span>{' '}
          <span className="syntax-function underline cursor-pointer">ContactForm.tsx</span>
          <span className="text-muted-foreground"> - Get in touch</span>
        </div>
      </div>

      {/* Padding for scrolling */}
      <div className="h-20">&nbsp;</div>
    </motion.div>
  );
};

export default ReadmeContent;
