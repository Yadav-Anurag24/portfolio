import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { motion } from 'framer-motion';
import { X, FileCode2 } from 'lucide-react';

/* ================================================================
   TYPES
   ================================================================ */

interface PeekDef {
  file: string;
  lineStart: number;
  definition: string;
  summary: string;
}

/* ================================================================
   PEEK DEFINITIONS — each tech described as a type definition
   ================================================================ */

const peekDefinitions: Record<string, PeekDef> = {
  /* ---- Languages ---- */
  typescript: {
    file: 'node_modules/typescript/lib/lib.d.ts',
    lineStart: 1,
    definition: `declare module "typescript" {
  /** Proficiency: Advanced | 3+ years */
  type Features = "Static Typing" | "Generics" | "Decorators";
  const projects: ["Portfolio", "NestJS APIs"];
  export const version: "^5.0.0";
}`,
    summary: 'Primary language for all type-safe production code',
  },
  javascript: {
    file: 'node_modules/@types/node/globals.d.ts',
    lineStart: 14,
    definition: `declare module "javascript" {
  /** Proficiency: Expert | 4+ years */
  type Paradigms = "Functional" | "OOP" | "Async/Await";
  const runtime: "Node.js" | "Browser" | "React Native";
  export const standard: "ES2024";
}`,
    summary: 'Core language — expert in async patterns and ES2024+ features',
  },
  python: {
    file: 'lib/python3.12/typing.pyi',
    lineStart: 8,
    definition: `# python ^3.12 — type stub
class PythonSkills:
    proficiency: str = "Intermediate"
    frameworks: list = ["FastAPI", "Flask"]
    used_for: list = ["Automation", "API prototyping"]`,
    summary: 'Used for API prototyping, automation, and data processing',
  },
  java: {
    file: 'src/main/java/dev/anurag/Skills.java',
    lineStart: 1,
    definition: `public class JavaExperience {
  // Proficiency: Intermediate | 2+ years
  String[] frameworks = {"Spring Boot", "Maven"};
  String[] concepts = {"OOP", "Collections", "Streams"};
  int version = 17; // LTS
}`,
    summary: 'Strong OOP fundamentals — Spring Boot, Collections API',
  },

  /* ---- Frontend ---- */
  react: {
    file: 'node_modules/@types/react/index.d.ts',
    lineStart: 42,
    definition: `declare module "react" {
  /** Proficiency: Advanced | 3+ years */
  interface Skills {
    hooks: "useState" | "useEffect" | "useContext" | "useMemo";
    patterns: "Custom Hooks" | "Context API" | "HOC";
    optimization: "React.memo" | "lazy" | "Suspense";
  }
  const projects: ["This Portfolio", "Smart Parking Finder"];
}`,
    summary: 'Advanced — hooks, context patterns, performance optimization',
  },
  'react-native': {
    file: 'node_modules/react-native/types/index.d.ts',
    lineStart: 1,
    definition: `declare module "react-native" {
  /** Proficiency: Advanced | 2+ years */
  type Platforms = "iOS" | "Android";
  interface Features {
    navigation: "React Navigation";
    native: "Camera" | "Location" | "Notifications";
  }
  const project: "HPCL Dealer App";
}`,
    summary: 'Cross-platform mobile — built HPCL Dealer App',
  },
  angular: {
    file: 'node_modules/@angular/core/index.d.ts',
    lineStart: 22,
    definition: `declare module "@angular/core" {
  /** Proficiency: Intermediate | 2+ years */
  interface Skills {
    version: 17;
    concepts: "Components" | "Services" | "RxJS" | "DI";
  }
  export const usedWith: "Ionic Framework";
}`,
    summary: 'Used with Ionic for hybrid mobile development',
  },
  ionic: {
    file: 'node_modules/@ionic/core/dist/types/index.d.ts',
    lineStart: 5,
    definition: `declare module "@ionic/core" {
  /** Proficiency: Intermediate | 1+ year */
  interface HybridApp {
    framework: "Angular";
    platforms: ["iOS", "Android", "PWA"];
    plugins: "Capacitor" | "Native APIs";
  }
  const version: "^7.0.0";
}`,
    summary: 'Hybrid mobile apps with Capacitor and Angular',
  },

  /* ---- Backend ---- */
  node: {
    file: 'node_modules/@types/node/index.d.ts',
    lineStart: 1,
    definition: `declare module "node" {
  /** Proficiency: Expert | 3+ years — PRIMARY RUNTIME */
  interface Stack {
    frameworks: ["Express", "NestJS", "Fastify"];
    patterns: ["REST APIs", "Middleware", "Streams"];
    databases: ["MongoDB", "PostgreSQL", "Redis"];
  }
  export const version: "^20.0.0";
}`,
    summary: 'Primary runtime — expert in server-side JS/TS development',
  },
  express: {
    file: 'node_modules/@types/express/index.d.ts',
    lineStart: 18,
    definition: `declare module "express" {
  /** Proficiency: Expert | 3+ years */
  interface Skills {
    apis: "RESTful design" | "Error handling";
    auth: "JWT" | "OAuth2" | "Sessions";
    middleware: "CORS" | "Rate limiting" | "Validation";
  }
  const projects: ["Portfolio API", "Parking API"];
}`,
    summary: 'Expert — RESTful APIs, JWT auth, middleware patterns',
  },
  nestjs: {
    file: 'node_modules/@nestjs/core/index.d.ts',
    lineStart: 10,
    definition: `declare module "@nestjs/core" {
  /** Proficiency: Intermediate | 1+ year */
  interface Architecture {
    patterns: "Modules" | "Controllers" | "Providers";
    features: "DI" | "Decorators" | "Guards" | "Pipes";
    database: "TypeORM" | "Prisma";
  }
}`,
    summary: 'Enterprise Node.js — dependency injection, decorators',
  },

  /* ---- Databases ---- */
  mongodb: {
    file: 'node_modules/mongodb/lib/index.d.ts',
    lineStart: 33,
    definition: `declare module "mongodb" {
  /** Proficiency: Advanced | 3+ years */
  interface Usage {
    odm: "Mongoose ^9.0";
    skills: "Aggregation" | "Indexing" | "Transactions";
    hosting: "MongoDB Atlas";
  }
  const collections: ["contacts", "projects"];
}`,
    summary: 'Advanced — aggregation pipelines, Atlas cloud, Mongoose ODM',
  },
  postgresql: {
    file: 'node_modules/pg/lib/index.d.ts',
    lineStart: 7,
    definition: `declare module "postgresql" {
  /** Proficiency: Intermediate | 1+ year */
  interface Skills {
    queries: "JOINs" | "CTEs" | "Window Functions";
    tools: "pgAdmin" | "Prisma" | "TypeORM";
  }
  export const version: "^16.0";
}`,
    summary: 'Relational databases — complex queries and ORM integration',
  },
  redis: {
    file: 'node_modules/redis/dist/index.d.ts',
    lineStart: 3,
    definition: `declare module "redis" {
  /** Proficiency: Intermediate | 1+ year */
  interface UseCases {
    caching: "API responses" | "Session store";
    patterns: "Pub/Sub" | "Rate limiting";
  }
  export const version: "^7.0.0";
}`,
    summary: 'Caching, pub/sub messaging, session management',
  },

  /* ---- Cloud & DevOps ---- */
  'aws-sdk': {
    file: 'node_modules/aws-sdk/lib/aws.d.ts',
    lineStart: 1,
    definition: `declare module "aws-sdk" {
  /** Pursuing Solutions Architect certification */
  interface Services {
    compute: "EC2" | "Lambda" | "ECS";
    storage: "S3" | "DynamoDB";
    networking: "VPC" | "CloudFront";
  }
  export const cert: "Solutions Architect (in progress)";
}`,
    summary: 'Pursuing AWS Solutions Architect — EC2, S3, Lambda',
  },
  docker: {
    file: 'Dockerfile.d.ts',
    lineStart: 1,
    definition: `declare module "docker" {
  /** Proficiency: Intermediate | 2+ years */
  interface Skills {
    builds: "Multi-stage" | "Layer caching";
    tools: "Docker Compose" | "Docker Hub";
    workflow: "Dev -> Build -> Test -> Deploy";
  }
  export const version: "^24.0.0";
}`,
    summary: 'Containerization — multi-stage builds, Docker Compose',
  },
  kubernetes: {
    file: 'k8s/types/index.d.ts',
    lineStart: 1,
    definition: `declare module "kubernetes" {
  /** Status: Learning | < 1 year */
  interface Concepts {
    resources: "Pods" | "Deployments" | "Services";
    tools: "kubectl" | "Helm" | "Minikube";
  }
  export const version: "^1.28";
}`,
    summary: 'Learning container orchestration — pods, deployments',
  },

  /* ---- Tools ---- */
  git: {
    file: '.gitconfig.d.ts',
    lineStart: 1,
    definition: `declare module "git" {
  /** Proficiency: Advanced | 4+ years */
  interface Workflow {
    branching: "GitFlow" | "Feature branches";
    advanced: "rebase" | "cherry-pick" | "bisect";
    platforms: "GitHub" | "GitLab";
  }
  export const style: "conventional-commits";
}`,
    summary: 'Advanced Git — rebasing, cherry-pick, GitFlow workflows',
  },
  vscode: {
    file: 'extensions/vscode-api/index.d.ts',
    lineStart: 1,
    definition: `declare module "vscode" {
  /** This portfolio IS the proof */
  interface Meta {
    theme: "One Dark Pro" | "Dracula" | "Monokai";
    extensions: 50;
    portfolio: "You are looking at it right now";
  }
  export const version: "latest";
}`,
    summary: 'Daily driver — this entire portfolio is a VS Code tribute',
  },
  postman: {
    file: 'postman/collections/index.d.ts',
    lineStart: 1,
    definition: `declare module "postman" {
  /** Proficiency: Advanced | 3+ years */
  interface Testing {
    features: "Collections" | "Environments" | "Scripts";
    automation: "Newman CLI" | "CI/CD";
  }
}`,
    summary: 'API testing — collections, automation, Newman CLI',
  },

  /* ---- Learning / Concepts ---- */
  'aws-solutions-architect': {
    file: 'certifications/aws-sa.d.ts',
    lineStart: 1,
    definition: `interface AWSCertification {
  name: "AWS Solutions Architect Associate";
  status: "in-progress";
  topics: "VPC" | "IAM" | "High Availability";
  expectedDate: "2026";
}`,
    summary: 'Actively studying for AWS Solutions Architect Associate',
  },
  'cloud-computing': {
    file: 'education/cloud-computing.d.ts',
    lineStart: 1,
    definition: `interface CloudCourse {
  provider: "Specialization Course";
  startDate: "January 2026";
  topics: "IaaS" | "PaaS" | "SaaS" | "Serverless";
  focus: "AWS";
}`,
    summary: 'Cloud Computing Specialization — started January 2026',
  },
  'system-design': {
    file: 'learning/system-design.d.ts',
    lineStart: 1,
    definition: `interface SystemDesignStudy {
  status: "ongoing";
  topics: "Load Balancing" | "Caching" | "Sharding";
  patterns: "CQRS" | "Event Sourcing" | "Saga";
  resources: "System Design Primer" | "DDIA";
}`,
    summary: 'Studying distributed systems, scalability patterns',
  },
  'backend-development': {
    file: 'src/core/backend.d.ts',
    lineStart: 1,
    definition: `interface BackendDevelopment {
  /** Core focus area | 3+ years */
  apis: "REST" | "GraphQL (learning)";
  auth: "JWT" | "OAuth2" | "Session-based";
  architecture: "MVC" | "Microservices" | "Monolith";
}`,
    summary: 'Core specialization — APIs, auth, architecture patterns',
  },
  'cloud-architecture': {
    file: 'src/core/cloud.d.ts',
    lineStart: 1,
    definition: `interface CloudArchitecture {
  /** Actively learning | AWS focus */
  provider: "AWS";
  certification: "Solutions Architect (in progress)";
  services: "EC2" | "S3" | "Lambda" | "CloudFront";
}`,
    summary: 'AWS-focused — pursuing Solutions Architect certification',
  },
  devops: {
    file: 'src/core/devops.d.ts',
    lineStart: 1,
    definition: `interface DevOpsSkills {
  containers: "Docker" | "Kubernetes";
  ci_cd: "GitHub Actions" | "Jenkins";
  monitoring: "CloudWatch" | "Grafana";
  iac: "Docker Compose" | "Terraform (learning)";
}`,
    summary: 'Containers, CI/CD pipelines, infrastructure as code',
  },
  'api-development': {
    file: 'src/core/api.d.ts',
    lineStart: 1,
    definition: `interface APIDevelopment {
  /** Core skill | 3+ years */
  style: "RESTful" | "GraphQL (learning)";
  frameworks: "Express" | "NestJS" | "Fastify";
  tools: "Postman" | "Swagger" | "OpenAPI";
  testing: "Jest" | "Supertest";
}`,
    summary: 'REST API design, documentation, and testing',
  },
};

/* ================================================================
   ALIAS LOOKUP — maps common variations to canonical keys
   ================================================================ */

const aliases: Record<string, string> = {
  'nodejs': 'node',
  'node.js': 'node',
  'express.js': 'express',
  'expressjs': 'express',
  'nest.js': 'nestjs',
  'aws': 'aws-sdk',
  'k8s': 'kubernetes',
  'mongo': 'mongodb',
  'postgres': 'postgresql',
  'pg': 'postgresql',
  'react native': 'react-native',
  'reactnative': 'react-native',
  'ionic/angular': 'ionic',
  'backend development': 'backend-development',
  'cloud architecture': 'cloud-architecture',
  'system design': 'system-design',
  'api development': 'api-development',
};

export const lookupDefinition = (keyword: string): PeekDef | undefined => {
  const k = keyword.toLowerCase().trim();
  if (peekDefinitions[k]) return peekDefinitions[k];
  const hyphenated = k.replace(/\s+/g, '-');
  if (peekDefinitions[hyphenated]) return peekDefinitions[hyphenated];
  const aliasKey = aliases[k] || aliases[hyphenated];
  if (aliasKey && peekDefinitions[aliasKey]) return peekDefinitions[aliasKey];
  return undefined;
};

export const hasDefinition = (keyword: string): boolean =>
  lookupDefinition(keyword) !== undefined;

/* ================================================================
   PEEK CONTEXT
   ================================================================ */

interface PeekContextType {
  activeKeyword: string | null;
  togglePeek: (keyword: string) => void;
  closePeek: () => void;
}

const PeekContext = createContext<PeekContextType>({
  activeKeyword: null,
  togglePeek: () => {},
  closePeek: () => {},
});

export const usePeek = () => useContext(PeekContext);

interface PeekProviderProps {
  activeFile: string;
  children: ReactNode;
}

export const PeekProvider = ({ activeFile, children }: PeekProviderProps) => {
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);

  // Close peek when active file changes
  useEffect(() => {
    setActiveKeyword(null);
  }, [activeFile]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveKeyword(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const togglePeek = useCallback((keyword: string) => {
    setActiveKeyword((prev) => (prev === keyword ? null : keyword));
  }, []);

  const closePeek = useCallback(() => setActiveKeyword(null), []);

  return (
    <PeekContext.Provider value={{ activeKeyword, togglePeek, closePeek }}>
      {children}
    </PeekContext.Provider>
  );
};

/* ================================================================
   SYNTAX HIGHLIGHTER — simple tokenizer for definition code
   ================================================================ */

const KEYWORDS = new Set([
  'declare', 'module', 'interface', 'type', 'const', 'let', 'var',
  'function', 'class', 'extends', 'implements', 'export', 'import',
  'from', 'return', 'new', 'readonly', 'public', 'private', 'protected',
  'true', 'false', 'null', 'undefined',
  // Python / Java
  'def', 'self', 'int', 'str', 'list',
]);

const highlightLine = (line: string) => {
  const tokens: { text: string; cls: string }[] = [];
  let i = 0;

  while (i < line.length) {
    // Whitespace
    if (/\s/.test(line[i])) {
      let j = i;
      while (j < line.length && /\s/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), cls: '' });
      i = j;
      continue;
    }

    // Line comments: // or #
    if (line.slice(i, i + 2) === '//' || (line[i] === '#' && (i === 0 || /\s/.test(line[i - 1])))) {
      tokens.push({ text: line.slice(i), cls: 'syntax-comment' });
      break;
    }

    // Block comments: /** ... */
    if (line.slice(i, i + 3) === '/**') {
      const end = line.indexOf('*/', i + 3);
      const text = end >= 0 ? line.slice(i, end + 2) : line.slice(i);
      tokens.push({ text, cls: 'syntax-comment' });
      i += text.length;
      continue;
    }

    // Strings: "..." or '...'
    if (line[i] === '"' || line[i] === "'") {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) j++;
      j++; // closing quote
      tokens.push({ text: line.slice(i, j), cls: 'syntax-string' });
      i = j;
      continue;
    }

    // Words
    if (/[a-zA-Z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\w]/.test(line[j])) j++;
      const word = line.slice(i, j);

      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, cls: 'syntax-keyword' });
      } else {
        // Check if it's a property (word followed by :)
        const rest = line.slice(j);
        if (/^\s*:/.test(rest)) {
          tokens.push({ text: word, cls: 'syntax-property' });
        } else {
          tokens.push({ text: word, cls: 'text-foreground' });
        }
      }
      i = j;
      continue;
    }

    // Numbers
    if (/\d/.test(line[i])) {
      let j = i;
      while (j < line.length && /\d/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), cls: 'syntax-number' });
      i = j;
      continue;
    }

    // Operators / punctuation
    tokens.push({ text: line[i], cls: 'text-muted-foreground' });
    i++;
  }

  return (
    <>
      {tokens.map((t, idx) =>
        t.cls ? (
          <span key={idx} className={t.cls}>{t.text}</span>
        ) : (
          <span key={idx}>{t.text}</span>
        ),
      )}
    </>
  );
};

/* ================================================================
   PEEKABLE KEYWORD — clickable inline keyword span
   ================================================================ */

interface PeekableKeywordProps {
  keyword: string;
  children: ReactNode;
  className?: string;
}

export const PeekableKeyword = ({
  keyword,
  children,
  className = '',
}: PeekableKeywordProps) => {
  const { activeKeyword, togglePeek } = usePeek();
  const isActive = activeKeyword === keyword;
  const hasDef = hasDefinition(keyword);

  if (!hasDef) return <span className={className}>{children}</span>;

  return (
    <span
      className={[
        className,
        'cursor-pointer border-b transition-all',
        isActive
          ? 'border-solid border-primary'
          : 'border-dotted border-current hover:border-solid hover:text-primary',
      ].join(' ')}
      onClick={(e) => {
        e.stopPropagation();
        togglePeek(keyword);
      }}
      title="Click to peek definition"
    >
      {children}
    </span>
  );
};

/* ================================================================
   PEEK PANEL — VS Code–style inline peek definition panel
   ================================================================ */

interface PeekPanelProps {
  keyword: string;
}

export const PeekPanel = ({ keyword }: PeekPanelProps) => {
  const { closePeek } = usePeek();
  const def = lookupDefinition(keyword);
  if (!def) return null;

  const lines = def.definition.split('\n');

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.95 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0.95 }}
      transition={{ duration: 0.15 }}
      style={{ transformOrigin: 'top' }}
      className="my-1.5 rounded-sm overflow-hidden shadow-lg border border-border"
    >
      {/* Left accent border achieved via box-shadow */}
      <div style={{ borderLeft: '3px solid var(--primary)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-border"
          style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <FileCode2 className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--primary)' }} />
            <span className="text-xs font-mono text-foreground truncate">{def.file}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closePeek();
            }}
            className="p-0.5 hover:bg-muted rounded shrink-0 ml-2"
            aria-label="Close peek definition"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>

        {/* Code body */}
        <div className="py-1.5 overflow-x-auto" style={{ background: 'color-mix(in srgb, var(--muted) 40%, transparent)' }}>
          {lines.map((line, i) => (
            <div
              key={i}
              className="flex px-2 hover:bg-primary/5 text-xs font-mono leading-5"
            >
              <span className="text-muted-foreground w-8 text-right mr-3 select-none shrink-0">
                {def.lineStart + i}
              </span>
              <span className="whitespace-pre">{highlightLine(line)}</span>
            </div>
          ))}
        </div>

        {/* Summary footer */}
        <div
          className="px-3 py-1.5 border-t border-border"
          style={{ background: 'color-mix(in srgb, var(--primary) 5%, transparent)' }}
        >
          <p className="text-xs text-muted-foreground italic">{def.summary}</p>
        </div>
      </div>
    </motion.div>
  );
};
