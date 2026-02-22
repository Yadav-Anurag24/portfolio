import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ExternalLink, Github, Smartphone, Car, BookOpen, Code2, ShoppingCart, NotebookPen, Calculator } from 'lucide-react';
import { useTerminal } from '@/contexts/TerminalContext';
import { useProjectNotification } from '@/contexts/NotificationContext';

// Helper to map Server IDs to Icons/Colors (Since server sends JSON, not UI components)
const getProjectAssets = (id) => {
  const assets = {
    1: { icon: Car, gradient: 'from-emerald-500 to-teal-600' },
    2: { icon: ShoppingCart, gradient: 'from-amber-500 to-orange-600' },
    3: { icon: NotebookPen, gradient: 'from-violet-500 to-purple-600' },
    4: { icon: Calculator, gradient: 'from-cyan-500 to-blue-600' },
    5: { icon: Smartphone, gradient: 'from-orange-500 to-red-600' },
    6: { icon: BookOpen, gradient: 'from-rose-500 to-pink-600' }
  };
  return assets[id] || { icon: Code2, gradient: 'from-blue-500 to-cyan-600' };
};

const ProjectsContent = () => {
  const { addLog } = useTerminal();
  const { notifyNewProject } = useProjectNotification();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasNotified, setHasNotified] = useState(false);

  // FETCH DATA FROM YOUR SERVER
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects'); // Hits your Node.js Server
        if (!response.ok) throw new Error('Server offline');
        const data = await response.json();
        
        // Transform data if needed to match your UI structure
        // (Assuming server returns standard JSON, we map it to include icon/gradient)
        const enhancedData = data.map(p => ({
            ...p,
            ...getProjectAssets(p.id)
        }));

        setProjects(enhancedData);
        // Notify user once per session
        if (!sessionStorage.getItem('projects-notified')) {
          notifyNewProject();
          sessionStorage.setItem('projects-notified', 'true');
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load projects from server.");
        // Optional: Fallback to empty array or show error
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    addLog('info', `> Opening project: ${project.name}`);
  };

  if (loading) {
    return (
        <div className="leading-7 p-4">
             <span className="syntax-comment">{`// Connecting to localhost:5000...`}</span><br/>
             <span className="syntax-comment">{`// Fetching data...`}</span>
        </div>
    );
  }

  if (error) {
     return (
        <div className="leading-7 p-4">
             <span className="text-red-400">{`// Error: ${error}`}</span><br/>
             <span className="text-gray-500">{`// Check if 'npm run server' is running`}</span>
        </div>
     );
  }

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

      {/* DYNAMIC Projects array */}
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
                <span className="syntax-string text-sm">
                    "{project.description ? project.description.substring(0, 60) : ''}..."
                </span>
                <span className="text-muted-foreground">,</span>
              </div>
              <div className="leading-7 ml-4">
                <span className="syntax-property">techStack</span>
                <span className="text-foreground">: [</span>
                {project.techStack && project.techStack.map((tech, i) => (
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
            sideOffset={8}
            collisionPadding={16}
            className="w-80 max-h-[calc(100vh-2rem)] overflow-y-auto p-0 bg-card border-border"
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
                {project.techStack && project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

             {/* Features Section - Only show if server sends features */}
             {project.features && (
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
             )}

              <div className="flex gap-2 pt-2">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Demo
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded bg-muted text-foreground hover:bg-muted/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-3 h-3" />
                    Source
                  </a>
                )}
                {!project.liveLink && !project.githubLink && (
                  <span className="flex-1 text-center py-1.5 text-xs text-muted-foreground italic">
                    Links coming soon
                  </span>
                )}
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