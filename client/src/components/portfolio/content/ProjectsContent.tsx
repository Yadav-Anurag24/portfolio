import { motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ExternalLink, Github, Smartphone, Car, BookOpen } from 'lucide-react';
import { useTerminal } from '@/contexts/TerminalContext';

const projects = [
  {
    id: 1,
    name: 'Smart Parking Finder',
    description: 'A mobile application that helps users find available parking spots in real-time using IoT sensors and GPS tracking.',
    techStack: ['Ionic', 'Angular', 'Node.js', 'MongoDB', 'Socket.io'],
    status: 'completed',
    features: ['Real-time availability', 'GPS navigation', 'Payment integration', 'IoT sensor data'],
    icon: Car,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    name: 'HPCL Dealer App',
    description: 'Enterprise mobile application for HPCL petroleum dealers to manage inventory, orders, and customer relationships.',
    techStack: ['React Native', 'Redux', 'Node.js', 'PostgreSQL'],
    status: 'completed',
    features: ['Inventory management', 'Order tracking', 'Analytics dashboard', 'Offline support'],
    icon: Smartphone,
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: 3,
    name: 'Bookstore Auth System',
    description: 'Secure authentication and authorization system for an online bookstore with JWT tokens and role-based access.',
    techStack: ['Node.js', 'Express', 'JWT', 'bcrypt', 'MongoDB'],
    status: 'completed',
    features: ['JWT authentication', 'Role-based access', 'Password encryption', 'Session management'],
    icon: BookOpen,
    gradient: 'from-violet-500 to-purple-600',
  },
];

const ProjectsContent = () => {
  const { addLog } = useTerminal();

  const handleProjectClick = (project: typeof projects[0]) => {
    addLog('info', `> Opening project: ${project.name}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      {/* File header comment */}
      <div className="leading-7">
        <span className="syntax-comment">{`// src/components/Projects.jsx`}</span>
      </div>
      <div className="leading-7">
        <span className="syntax-comment">{`// Hover over each project for preview`}</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Import statement */}
      <div className="leading-7">
        <span className="syntax-keyword">import</span>
        <span className="text-foreground"> {'{ '}</span>
        <span className="syntax-variable">Project</span>
        <span className="text-foreground">{' }'} </span>
        <span className="syntax-keyword">from</span>
        <span className="syntax-string"> '@/types'</span>
        <span className="text-foreground">;</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Const declaration */}
      <div className="leading-7">
        <span className="syntax-keyword">const</span>
        <span className="syntax-variable"> projects</span>
        <span className="syntax-keyword">: </span>
        <span className="syntax-property">Project</span>
        <span className="text-foreground">[] = [</span>
      </div>

      {/* Projects array */}
      {projects.map((project, index) => (
        <HoverCard key={project.id} openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="ml-4 p-3 rounded-lg border border-transparent hover:border-border hover:bg-muted/30 cursor-pointer transition-all group"
              onClick={() => handleProjectClick(project)}
            >
              <div className="leading-7">
                <span className="text-muted-foreground">{'  {'}</span>
              </div>
              <div className="leading-7 ml-4">
                <span className="syntax-property">name</span>
                <span className="text-foreground">: </span>
                <span className="syntax-string">"{project.name}"</span>
                <span className="text-muted-foreground">,</span>
              </div>
              <div className="leading-7 ml-4">
                <span className="syntax-property">description</span>
                <span className="text-foreground">: </span>
                <span className="syntax-string text-sm">"{project.description.substring(0, 60)}..."</span>
                <span className="text-muted-foreground">,</span>
              </div>
              <div className="leading-7 ml-4">
                <span className="syntax-property">techStack</span>
                <span className="text-foreground">: [</span>
                {project.techStack.map((tech, i) => (
                  <span key={tech}>
                    <span className="syntax-string">"{tech}"</span>
                    {i < project.techStack.length - 1 && <span className="text-foreground">, </span>}
                  </span>
                ))}
                <span className="text-foreground">]</span>
                <span className="text-muted-foreground">,</span>
              </div>
              <div className="leading-7 ml-4">
                <span className="syntax-property">status</span>
                <span className="text-foreground">: </span>
                <span className="syntax-string">"{project.status}"</span>
              </div>
              <div className="leading-7">
                <span className="text-muted-foreground">{'  }'}</span>
                {index < projects.length - 1 && <span className="text-muted-foreground">,</span>}
              </div>
            </motion.div>
          </HoverCardTrigger>

          <HoverCardContent 
            side="right" 
            align="start" 
            className="w-80 p-0 bg-card border-border overflow-hidden"
          >
            {/* Project Card Preview */}
            <div className={`h-24 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
              <project.icon className="w-12 h-12 text-white/90" />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-semibold text-foreground">{project.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-border">
                <div className="text-xs text-muted-foreground mb-2">Key Features:</div>
                <ul className="text-xs space-y-1">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  View Demo
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded bg-muted text-foreground hover:bg-muted/80 transition-colors">
                  <Github className="w-3 h-3" />
                  Source
                </button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}

      {/* Closing bracket */}
      <div className="leading-7">
        <span className="text-foreground">];</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Export statement */}
      <div className="leading-7">
        <span className="syntax-keyword">export default</span>
        <span className="syntax-variable"> projects</span>
        <span className="text-foreground">;</span>
      </div>

      {/* Padding for scrolling */}
      <div className="h-20">&nbsp;</div>
    </motion.div>
  );
};

export default ProjectsContent;
