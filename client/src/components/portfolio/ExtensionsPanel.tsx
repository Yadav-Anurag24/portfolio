import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, ArrowLeft, Download, ExternalLink, Check } from 'lucide-react';

// ── Types ───────────────────────────────────────────────────────────
interface Extension {
  id: string;
  name: string;
  publisher: string;
  description: string;
  longDescription: string;
  icon: string;        // CDN URL for tech logo SVG
  iconBg: string;      // tailwind bg class
  stars: number;       // proficiency 1-5
  installs: string;    // "years of experience" formatted as installs
  version: string;
  category: string;
  tags: string[];
}

// Devicon CDN base URL for real tech SVG logos
const devicon = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;
const deviconPlain = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-plain.svg`;
// Simple Icons CDN (for icons not in Devicon)
const simpleIcon = (name: string, color: string) =>
  `https://cdn.simpleicons.org/${name}/${color}`;

// ── Extension Data ──────────────────────────────────────────────────
const EXTENSIONS: Extension[] = [
  // Languages
  {
    id: 'typescript',
    name: 'TypeScript',
    publisher: 'Microsoft',
    description: 'Typed superset of JavaScript for scalable applications',
    longDescription: 'TypeScript adds optional static types to JavaScript, enabling better tooling, refactoring, and error detection. Used extensively in building React frontends and Node.js backends with strong type safety.',
    icon: devicon('typescript'),
    iconBg: 'bg-blue-500/20',
    stars: 4,
    installs: '1+ years',
    version: '5.0.0',
    category: 'Languages',
    tags: ['typed', 'javascript', 'frontend', 'backend'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    publisher: 'ECMA International',
    description: 'Dynamic programming language for web development',
    longDescription: 'Core language powering modern web applications. Proficient in ES6+ features, async/await patterns, closures, prototypal inheritance, and functional programming concepts. Used across the full stack.',
    icon: devicon('javascript'),
    iconBg: 'bg-yellow-500/20',
    stars: 5,
    installs: '2+ years',
    version: 'ES2024',
    category: 'Languages',
    tags: ['web', 'frontend', 'backend', 'scripting'],
  },
  {
    id: 'python',
    name: 'Python',
    publisher: 'Python Software Foundation',
    description: 'Versatile language for scripting, automation, and data',
    longDescription: 'Used for automation scripts, REST API prototyping, and data processing tasks. Comfortable with Flask, FastAPI, and scientific computing libraries. Strong understanding of OOP and Pythonic idioms.',
    icon: devicon('python'),
    iconBg: 'bg-green-500/20',
    stars: 3,
    installs: '1+ years',
    version: '3.12',
    category: 'Languages',
    tags: ['scripting', 'automation', 'data', 'api'],
  },
  {
    id: 'cplusplus',
    name: 'C++',
    publisher: 'ISO/IEC',
    description: 'High-performance language for systems and competitive programming',
    longDescription: 'Proficient in C++ with strong knowledge of STL, pointers, memory management, and OOP. Used extensively for data structures, algorithms, and competitive programming. Comfortable with modern C++ features (C++17/20).',
    icon: devicon('cplusplus'),
    iconBg: 'bg-blue-600/20',
    stars: 4,
    installs: '3+ years',
    version: 'C++20',
    category: 'Languages',
    tags: ['systems', 'competitive-programming', 'oop', 'algorithms'],
  },

  // Frontend
  {
    id: 'react',
    name: 'React',
    publisher: 'Meta',
    description: 'A JavaScript library for building user interfaces',
    longDescription: 'Primary frontend framework. Expert in hooks, context API, component composition, performance optimization with React.memo/useMemo, and building complex SPAs. Built this portfolio and multiple production apps.',
    icon: devicon('react'),
    iconBg: 'bg-cyan-500/20',
    stars: 5,
    installs: '2+ years',
    version: '18.2.0',
    category: 'Frontend',
    tags: ['ui', 'spa', 'hooks', 'components'],
  },
  {
    id: 'react-native',
    name: 'React Native',
    publisher: 'Meta',
    description: 'Build native mobile apps using React',
    longDescription: 'Built the HPCL Dealer App — a production mobile application for inventory management. Proficient in navigation, native modules, state management with Redux, and platform-specific optimizations.',
    icon: devicon('react'),
    iconBg: 'bg-cyan-400/20',
    stars: 4,
    installs: '1+ year',
    version: '0.73',
    category: 'Frontend',
    tags: ['mobile', 'ios', 'android', 'cross-platform'],
  },
  {
    id: 'angular',
    name: 'Angular',
    publisher: 'Google',
    description: 'Platform for building web applications',
    longDescription: 'Used with Ionic framework for the Smart Parking Finder project. Experienced with Angular modules, services, dependency injection, RxJS observables, and template-driven forms.',
    icon: devicon('angular'),
    iconBg: 'bg-red-500/20',
    stars: 4,
    installs: '1+ year',
    version: '17.0.0',
    category: 'Frontend',
    tags: ['spa', 'enterprise', 'rxjs', 'modules'],
  },
  {
    id: 'ionic',
    name: 'Ionic Framework',
    publisher: 'Ionic',
    description: 'Cross-platform mobile UI toolkit',
    longDescription: 'Built the Smart Parking Finder using Ionic + Angular. Proficient in Capacitor plugins, native device features (GPS, camera), and creating performant hybrid mobile applications.',
    icon: devicon('ionic'),
    iconBg: 'bg-blue-400/20',
    stars: 4,
    installs: '1+ year',
    version: '7.0.0',
    category: 'Frontend',
    tags: ['mobile', 'hybrid', 'capacitor'],
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    publisher: 'Tailwind Labs',
    description: 'Utility-first CSS framework for rapid UI development',
    longDescription: 'Go-to styling solution for modern projects. This entire portfolio is built with Tailwind CSS. Proficient in responsive design, custom themes, dark mode, and component-based utility patterns.',
    icon: devicon('tailwindcss'),
    iconBg: 'bg-teal-500/20',
    stars: 5,
    installs: '1+ years',
    version: '3.4.0',
    category: 'Frontend',
    tags: ['css', 'styling', 'responsive', 'utility'],
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    publisher: 'OpenJS Foundation',
    description: 'JavaScript runtime for server-side development',
    longDescription: 'Primary backend runtime. Built multiple REST APIs, real-time applications, and microservices. Expert in Express.js middleware patterns, error handling, authentication flows, and database integration.',
    icon: devicon('nodejs'),
    iconBg: 'bg-green-600/20',
    stars: 5,
    installs: '2+ years',
    version: '20 LTS',
    category: 'Backend',
    tags: ['runtime', 'server', 'api', 'microservices'],
  },
  {
    id: 'express',
    name: 'Express.js',
    publisher: 'OpenJS Foundation',
    description: 'Fast, unopinionated web framework for Node.js',
    longDescription: 'Built this portfolio\'s backend API, the Bookstore Auth System, and multiple other REST services with Express. Proficient in middleware chains, route organization, error handling, and security best practices.',
    icon: devicon('express'),
    iconBg: 'bg-gray-500/20',
    stars: 5,
    installs: '2+ years',
    version: '5.0.0',
    category: 'Backend',
    tags: ['api', 'rest', 'middleware', 'routing'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    publisher: 'MongoDB Inc.',
    description: 'NoSQL document database for modern applications',
    longDescription: 'Primary database choice. Proficient in Mongoose ODM, schema design, aggregation pipelines, indexing strategies, and MongoDB Atlas cloud deployment. Used in every backend project.',
    icon: devicon('mongodb'),
    iconBg: 'bg-green-500/20',
    stars: 5,
    installs: '2+ years',
    version: '7.0',
    category: 'Backend',
    tags: ['database', 'nosql', 'mongoose', 'atlas'],
  },

  // DevOps & Cloud
  {
    id: 'docker',
    name: 'Docker',
    publisher: 'Docker Inc.',
    description: 'Containerization platform for consistent deployments',
    longDescription: 'Containerize applications for consistent development and production environments. Proficient in writing Dockerfiles, multi-stage builds, docker-compose for multi-service architectures, and container orchestration basics.',
    icon: devicon('docker'),
    iconBg: 'bg-blue-500/20',
    stars: 3,
    installs: '1+ year',
    version: '24.0',
    category: 'DevOps',
    tags: ['containers', 'deployment', 'ci-cd'],
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    publisher: 'Amazon',
    description: 'Cloud computing platform for scalable infrastructure',
    longDescription: 'Working knowledge of core AWS services: EC2, S3, Lambda, API Gateway, DynamoDB, and CloudFormation. Currently pursuing AWS Solutions Architect certification to deepen cloud architecture skills.',
    icon: devicon('amazonwebservices'),
    iconBg: 'bg-orange-400/20',
    stars: 3,
    installs: '1+ year',
    version: 'SAA-C03',
    category: 'DevOps',
    tags: ['cloud', 'infrastructure', 'serverless', 'certification'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    publisher: 'CNCF',
    description: 'Container orchestration for automated deployments',
    longDescription: 'Understanding of pods, deployments, services, ingress controllers, and Helm charts. Used for learning container orchestration patterns and preparing for production-grade cluster management.',
    icon: devicon('kubernetes'),
    iconBg: 'bg-blue-600/20',
    stars: 2,
    installs: '<1 year',
    version: '1.28',
    category: 'DevOps',
    tags: ['orchestration', 'scaling', 'helm'],
  },
  {
    id: 'git',
    name: 'Git',
    publisher: 'Software Freedom Conservancy',
    description: 'Distributed version control system',
    longDescription: 'Daily driver for all projects. Proficient in branching strategies (Git Flow), rebasing, cherry-picking, conflict resolution, and collaborative workflows with GitHub pull requests and code reviews.',
    icon: devicon('git'),
    iconBg: 'bg-orange-600/20',
    stars: 4,
    installs: '2+ years',
    version: '2.42',
    category: 'Tools',
    tags: ['version-control', 'collaboration', 'branching'],
  },

  // Theme Extensions (fun additions)
  {
    id: 'one-dark-pro',
    name: 'One Dark Pro',
    publisher: 'binaryify',
    description: 'The theme powering this portfolio',
    longDescription: 'Atom\'s iconic One Dark theme, perfectly ported to VS Code. This entire portfolio uses One Dark Pro\'s color scheme for syntax highlighting, UI elements, and the overall dark aesthetic.',
    icon: simpleIcon('visualstudiocode', '007ACC'),
    iconBg: 'bg-purple-500/20',
    stars: 5,
    installs: 'Always',
    version: '3.17.0',
    category: 'Themes',
    tags: ['theme', 'dark', 'syntax', 'colors'],
  },
  {
    id: 'prettier',
    name: 'Prettier',
    publisher: 'Prettier',
    description: 'Opinionated code formatter for consistent style',
    longDescription: 'Automatic code formatting on every project. Configured across all JavaScript, TypeScript, CSS, and JSON files to maintain consistent code style without debates.',
    icon: simpleIcon('prettier', 'F7B93E'),
    iconBg: 'bg-pink-500/20',
    stars: 5,
    installs: 'Always',
    version: '11.0.0',
    category: 'Tools',
    tags: ['formatting', 'style', 'automation'],
  },
];

const CATEGORIES = ['All', 'Languages', 'Frontend', 'Backend', 'DevOps', 'Tools', 'Themes'];

// ── Star Rating ─────────────────────────────────────────────────────
const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) => {
  const starSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${starSize} ${
            i <= rating ? 'text-syntax-variable fill-syntax-variable' : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
};

// ── Extension Detail View ───────────────────────────────────────────
const ExtensionDetail = ({ ext, onBack }: { ext: Extension; onBack: () => void }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Back header */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 px-4 pt-3 pb-2 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Extensions
      </button>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Extension Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-start gap-3 mb-4"
        >
          <div className={`w-14 h-14 rounded-lg ${ext.iconBg} flex items-center justify-center shrink-0 p-2.5`}>
            <img src={ext.icon} alt={ext.name} className="w-full h-full object-contain" loading="lazy" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground leading-tight">{ext.name}</h3>
            <div className="text-[11px] text-syntax-function mt-0.5">{ext.publisher}</div>
            <div className="flex items-center gap-2 mt-1.5">
              <StarRating rating={ext.stars} size="sm" />
              <span className="text-[10px] text-muted-foreground">Proficiency</span>
            </div>
          </div>
        </motion.div>

        {/* Install Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="flex-1 px-3 py-2 rounded bg-syntax-string/10 border border-syntax-string/20 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-syntax-string" />
              <span className="text-xs font-medium text-syntax-string">Installed</span>
            </div>
          </div>
        </motion.div>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-2 mb-4"
        >
          <div className="px-2 py-1.5 rounded bg-muted/30">
            <div className="text-[10px] text-muted-foreground">Experience</div>
            <div className="text-xs text-foreground font-medium mt-0.5">
              <Download className="w-3 h-3 inline mr-1 text-muted-foreground" />
              {ext.installs}
            </div>
          </div>
          <div className="px-2 py-1.5 rounded bg-muted/30">
            <div className="text-[10px] text-muted-foreground">Version</div>
            <div className="text-xs text-foreground font-medium mt-0.5">{ext.version}</div>
          </div>
          <div className="px-2 py-1.5 rounded bg-muted/30">
            <div className="text-[10px] text-muted-foreground">Category</div>
            <div className="text-xs text-foreground font-medium mt-0.5">{ext.category}</div>
          </div>
          <div className="px-2 py-1.5 rounded bg-muted/30">
            <div className="text-[10px] text-muted-foreground">Proficiency</div>
            <div className="text-xs text-foreground font-medium mt-0.5">
              {ext.stars === 5 ? 'Expert' : ext.stars === 4 ? 'Advanced' : ext.stars === 3 ? 'Intermediate' : 'Learning'}
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Details</div>
          <p className="text-xs text-foreground/90 leading-relaxed">
            {ext.longDescription}
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-4"
        >
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Tags</div>
          <div className="flex flex-wrap gap-1.5">
            {ext.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded bg-muted/50 text-muted-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ── Extension List Item ─────────────────────────────────────────────
const ExtensionListItem = ({ ext, onClick }: { ext: Extension; onClick: () => void }) => (
  <motion.button
    initial={{ opacity: 0, x: -6 }}
    animate={{ opacity: 1, x: 0 }}
    onClick={onClick}
    className="w-full flex items-start gap-2.5 px-2 py-2 hover:bg-muted/30 rounded transition-colors text-left cursor-pointer"
  >
    <div className={`w-9 h-9 rounded ${ext.iconBg} flex items-center justify-center shrink-0 p-1.5`}>
      <img src={ext.icon} alt={ext.name} className="w-full h-full object-contain" loading="lazy" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-xs font-medium text-foreground truncate">{ext.name}</div>
      <div className="text-[10px] text-muted-foreground truncate mt-0.5">{ext.description}</div>
      <div className="flex items-center gap-2 mt-1">
        <StarRating rating={ext.stars} />
        <span className="text-[10px] text-muted-foreground">{ext.installs}</span>
      </div>
    </div>
  </motion.button>
);

// ── Main Panel ──────────────────────────────────────────────────────
const ExtensionsPanel = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedExt, setSelectedExt] = useState<Extension | null>(null);

  const filtered = useMemo(() => {
    return EXTENSIONS.filter((ext) => {
      const matchesCategory = activeCategory === 'All' || ext.category === activeCategory;
      if (!search.trim()) return matchesCategory;

      const q = search.toLowerCase();
      const matchesSearch =
        ext.name.toLowerCase().includes(q) ||
        ext.publisher.toLowerCase().includes(q) ||
        ext.description.toLowerCase().includes(q) ||
        ext.category.toLowerCase().includes(q) ||
        ext.tags.some((t) => t.includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  // Detail view
  if (selectedExt) {
    return <ExtensionDetail ext={selectedExt} onBack={() => setSelectedExt(null)} />;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 space-y-2 shrink-0">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Extensions</div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search extensions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-7 pr-2 py-1.5 bg-muted/50 border border-border rounded text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All'
              ? EXTENSIONS.length
              : EXTENSIONS.filter((e) => e.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] px-2 py-0.5 rounded transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-muted/30 text-muted-foreground hover:text-foreground border border-transparent'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Extension List */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider px-2 py-2">
          {activeCategory === 'All' ? 'Installed' : activeCategory} — {filtered.length} extension{filtered.length !== 1 ? 's' : ''}
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-2 py-8 text-center text-xs text-muted-foreground"
            >
              No extensions match "{search}"
            </motion.div>
          ) : (
            <motion.div key={activeCategory + search} className="space-y-0.5">
              {filtered.map((ext) => (
                <ExtensionListItem
                  key={ext.id}
                  ext={ext}
                  onClick={() => setSelectedExt(ext)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExtensionsPanel;
