import { motion } from 'framer-motion';

const skills = {
  dependencies: {
    // Languages
    "typescript": "^5.0.0",
    "javascript": "ES2024",
    "python": "^3.12",
    "java": "^17",
    // Frontend
    "react": "^18.2.0",
    "react-native": "^0.73",
    "angular": "^17.0.0",
    "ionic": "^7.0.0",
    // Backend
    "node": "^20.0.0",
    "express": "^4.18.0",
    "nestjs": "^10.0.0",
  },
  devDependencies: {
    // Databases
    "mongodb": "^6.0.0",
    "postgresql": "^16.0",
    "redis": "^7.0.0",
    // Cloud & DevOps
    "aws-sdk": "^3.0.0",
    "docker": "^24.0.0",
    "kubernetes": "^1.28",
    // Tools
    "git": "^2.42",
    "vscode": "latest",
    "postman": "latest",
  },
  learning: {
    "aws-solutions-architect": "in-progress",
    "cloud-computing": "starting Jan 2026",
    "system-design": "ongoing",
  }
};

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="flex items-center gap-3">
    <span className="text-syntax-property w-32 text-sm">{name}</span>
    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, delay: 0.2 }}
        className="h-full bg-gradient-to-r from-primary to-syntax-function rounded-full"
      />
    </div>
    <span className="text-muted-foreground text-xs w-8">{level}%</span>
  </div>
);

const StackContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      {/* File header */}
      <div className="leading-7">
        <span className="syntax-comment">{`// src/skills.json`}</span>
      </div>
      <div className="leading-7">
        <span className="syntax-comment">{`// My technical dependencies and proficiency levels`}</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* JSON opening */}
      <div className="leading-7">
        <span className="text-foreground">{'{'}</span>
      </div>

      {/* Dependencies section */}
      <div className="leading-7 ml-4">
        <span className="syntax-property">"dependencies"</span>
        <span className="text-foreground">: {'{'}</span>
      </div>

      {Object.entries(skills.dependencies).map(([key, value], index, arr) => (
        <div key={key} className="leading-7 ml-8">
          <span className="syntax-property">"{key}"</span>
          <span className="text-foreground">: </span>
          <span className="syntax-string">"{value}"</span>
          {index < arr.length - 1 && <span className="text-muted-foreground">,</span>}
        </div>
      ))}

      <div className="leading-7 ml-4">
        <span className="text-foreground">{'}'}</span>
        <span className="text-muted-foreground">,</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Dev Dependencies section */}
      <div className="leading-7 ml-4">
        <span className="syntax-property">"devDependencies"</span>
        <span className="text-foreground">: {'{'}</span>
      </div>

      {Object.entries(skills.devDependencies).map(([key, value], index, arr) => (
        <div key={key} className="leading-7 ml-8">
          <span className="syntax-property">"{key}"</span>
          <span className="text-foreground">: </span>
          <span className="syntax-string">"{value}"</span>
          {index < arr.length - 1 && <span className="text-muted-foreground">,</span>}
        </div>
      ))}

      <div className="leading-7 ml-4">
        <span className="text-foreground">{'}'}</span>
        <span className="text-muted-foreground">,</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Learning section */}
      <div className="leading-7 ml-4">
        <span className="syntax-property">"learning"</span>
        <span className="text-foreground">: {'{'}</span>
      </div>

      {Object.entries(skills.learning).map(([key, value], index, arr) => (
        <div key={key} className="leading-7 ml-8">
          <span className="syntax-property">"{key}"</span>
          <span className="text-foreground">: </span>
          <span className="syntax-variable">"{value}"</span>
          {index < arr.length - 1 && <span className="text-muted-foreground">,</span>}
        </div>
      ))}

      <div className="leading-7 ml-4">
        <span className="text-foreground">{'}'}</span>
      </div>

      {/* JSON closing */}
      <div className="leading-7">
        <span className="text-foreground">{'}'}</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Visual Proficiency Section */}
      <div className="leading-7">
        <span className="syntax-comment">{`// Proficiency Visualization`}</span>
      </div>

      <div className="mt-4 p-4 bg-muted/20 rounded-lg border border-border space-y-3">
        <SkillBar name="Node.js" level={90} />
        <SkillBar name="React/React Native" level={85} />
        <SkillBar name="Angular/Ionic" level={80} />
        <SkillBar name="MongoDB" level={85} />
        <SkillBar name="Express.js" level={88} />
        <SkillBar name="AWS" level={70} />
        <SkillBar name="Docker" level={65} />
        <SkillBar name="TypeScript" level={82} />
      </div>

      {/* Padding for scrolling */}
      <div className="h-20">&nbsp;</div>
    </motion.div>
  );
};

export default StackContent;
