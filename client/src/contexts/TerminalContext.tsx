import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

interface TerminalLog {
  id: number;
  type: 'info' | 'success' | 'error' | 'command' | 'output' | 'ascii';
  message: string;
  timestamp: Date;
}

interface TerminalContextType {
  logs: TerminalLog[];
  commandHistory: string[];
  isMatrixActive: boolean;
  setIsMatrixActive: (active: boolean) => void;
  addLog: (type: TerminalLog['type'], message: string) => void;
  clearLogs: () => void;
  executeCommand: (command: string) => void;
  allCommands: string[];
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

let logId = 0;

// All available command names for autocomplete
const ALL_COMMANDS = [
  'help', 'about', 'skills', 'projects', 'contact', 'clear',
  'github', 'linkedin', 'whoami', 'date', 'echo',
  'cat resume.pdf', 'ls projects/', 'open', 'neofetch',
  'history', 'sudo hire-me', 'matrix', 'banner',
];

const NEOFETCH_ART = `
       ████████╗        anurag@portfolio
       ║  ╔══╗ ║        ─────────────────
       ║  ║AK║ ║        OS:       Portfolio OS v1.0
       ║  ╚══╝ ║        Host:     anuragkumar-portfolio.vercel.app
       ╚═══════╝        Kernel:   React 18 + Vite 5
                         Shell:    portfolio-terminal 2.0
  ╔═══════════════╗      Uptime:   Final Year Student
  ║  █▀▀ █▀█ █▀▄  ║      DE:       VS Code (One Dark Pro)
  ║  █▄▄ █▄█ █▄▀  ║      Stack:    Node.js, Express, MongoDB
  ║  ▄▄█ ▄▄▄ ▄▄▄  ║      Languages: JS, TS, Python, Java
  ╚═══════════════╝      Location: India
                         Contact:  anuragkumarmsd456@gmail.com
`.trimStart();

const BANNER_ART = `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     █████╗ ███╗   ██╗██╗   ██╗██████╗  █████╗  ██████╗   ║
║    ██╔══██╗████╗  ██║██║   ██║██╔══██╗██╔══██╗██╔════╝   ║
║    ███████║██╔██╗ ██║██║   ██║██████╔╝███████║██║  ███╗   ║
║    ██╔══██║██║╚██╗██║██║   ██║██╔══██╗██╔══██║██║   ██║   ║
║    ██║  ██║██║ ╚████║╚██████╔╝██║  ██║██║  ██║╚██████╔╝   ║
║    ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ║
║                                                           ║
║    Backend Developer  •  Final Year Student               ║
║    Building scalable systems with Node.js & MongoDB       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`.trimStart();

const PROJECT_TREE = `
projects/
├── smart-parking-finder/
│   ├── tech: Ionic, Angular, Node.js, Google Maps API
│   ├── status: ✅ Completed
│   └── github: github.com/Yadav-Anurag24/parking-app
├── hpcl-dealer-app/
│   ├── tech: React Native, Firebase, Redux
│   ├── status: 🚧 In Development
│   └── github: github.com/Yadav-Anurag24/hpcl-app
└── bookstore-auth-system/
    ├── tech: Node.js, Express, JWT, MongoDB
    ├── status: ✅ Completed
    └── github: github.com/Yadav-Anurag24/bookstore-auth
`.trimStart();

const PROJECT_MAP: Record<string, { name: string; github: string; tech: string; desc: string }> = {
  'smart-parking-finder': {
    name: 'Smart Parking Finder',
    github: 'https://github.com/Yadav-Anurag24/parking-app',
    tech: 'Ionic, Angular, Node.js, Google Maps API',
    desc: 'IoT-based app to find parking slots in real-time.',
  },
  'parking': {
    name: 'Smart Parking Finder',
    github: 'https://github.com/Yadav-Anurag24/parking-app',
    tech: 'Ionic, Angular, Node.js, Google Maps API',
    desc: 'IoT-based app to find parking slots in real-time.',
  },
  'hpcl-dealer-app': {
    name: 'HPCL Dealer App',
    github: 'https://github.com/Yadav-Anurag24/hpcl-app',
    tech: 'React Native, Firebase, Redux',
    desc: 'Official mobile app for HPCL dealers to track inventory.',
  },
  'hpcl': {
    name: 'HPCL Dealer App',
    github: 'https://github.com/Yadav-Anurag24/hpcl-app',
    tech: 'React Native, Firebase, Redux',
    desc: 'Official mobile app for HPCL dealers to track inventory.',
  },
  'bookstore-auth-system': {
    name: 'Bookstore Auth System',
    github: 'https://github.com/Yadav-Anurag24/bookstore-auth',
    tech: 'Node.js, Express, JWT, MongoDB',
    desc: 'Secure authentication system with role-based access control.',
  },
  'bookstore': {
    name: 'Bookstore Auth System',
    github: 'https://github.com/Yadav-Anurag24/bookstore-auth',
    tech: 'Node.js, Express, JWT, MongoDB',
    desc: 'Secure authentication system with role-based access control.',
  },
};

export const TerminalProvider = ({ children }: { children: ReactNode }) => {
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: logId++, type: 'info', message: 'Welcome to the portfolio terminal!', timestamp: new Date() },
    { id: logId++, type: 'output', message: 'Type "help" for available commands. Press Tab to autocomplete.', timestamp: new Date() },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const addLog = useCallback((type: TerminalLog['type'], message: string) => {
    setLogs((prev) => [...prev, { id: logId++, type, message, timestamp: new Date() }]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const executeCommand = useCallback((command: string) => {
    addLog('command', `$ ${command}`);
    setCommandHistory((prev) => [...prev, command]);

    const cmd = command.toLowerCase().trim();
    const args = cmd.split(' ').slice(1).join(' ');

    switch (true) {
      case cmd === 'help':
        addLog('output', `
Available commands:
  help              Show this help message
  about             About me
  skills            List my technical skills
  projects          List my projects
  contact           Contact information
  clear             Clear the terminal
  github            Open GitHub profile
  linkedin          Open LinkedIn profile
  whoami            Display current user
  date              Show current date
  echo <text>       Echo back text
  cat resume.pdf    Download my resume
  ls projects/      Browse projects in tree view
  open <project>    Open a project (e.g. open parking)
  neofetch          System info card
  history           Show command history
  banner            Show ASCII art banner
  sudo hire-me      🤫 Try it and see...
  matrix            🐇 Follow the white rabbit...
        `.trim());
        break;

      case cmd === 'about':
        addLog('output', 'Final Year Student & Aspiring Backend Developer passionate about building scalable systems.');
        break;

      case cmd === 'skills':
        addLog('output', '→ Languages: JavaScript, TypeScript, Python, Java');
        addLog('output', '→ Frontend:  React, Angular, Ionic, React Native');
        addLog('output', '→ Backend:   Node.js, Express, MongoDB, AWS');
        addLog('output', '→ DevOps:    Docker, Kubernetes, CI/CD');
        break;

      case cmd === 'projects':
        addLog('output', '1. Smart Parking Finder  — Ionic, Angular, Node.js');
        addLog('output', '2. HPCL Dealer App       — React Native, Firebase');
        addLog('output', '3. Bookstore Auth System  — Node.js, Express, JWT');
        addLog('output', '\nTip: Try "ls projects/" for a tree view or "open <name>" to explore.');
        break;

      case cmd === 'contact':
        addLog('output', '📧 Email:    anuragkumarmsd456@gmail.com');
        addLog('output', '🔗 GitHub:   github.com/Yadav-Anurag24');
        addLog('output', '💼 LinkedIn: linkedin.com/in/anurag24kumar');
        break;

      case cmd === 'clear':
        clearLogs();
        break;

      case cmd === 'github':
        addLog('success', 'Opening GitHub profile...');
        window.open('https://github.com/Yadav-Anurag24', '_blank');
        break;

      case cmd === 'linkedin':
        addLog('success', 'Opening LinkedIn profile...');
        window.open('https://www.linkedin.com/in/anurag24kumar', '_blank');
        break;

      case cmd === 'whoami':
        addLog('output', 'anurag@portfolio:~$');
        break;

      case cmd === 'date':
        addLog('output', new Date().toLocaleString());
        break;

      case cmd === 'cat resume.pdf': {
        addLog('success', '📄 Downloading resume...');
        // Create a link to download/open resume
        const link = document.createElement('a');
        link.href = '/Anurag_Kumar_Resume.pdf';
        link.download = 'Anurag_Kumar_Resume.pdf';
        link.click();
        addLog('output', 'If the download didn\'t start, the resume file may not be available yet.');
        // addLog('output', 'Add your resume as /public/Anurag_Kumar_Resume.pdf to enable this.');
        break;
      }

      case cmd === 'ls projects/' || cmd === 'ls projects':
        addLog('output', PROJECT_TREE);
        break;

      case cmd.startsWith('open '): {
        const projectKey = args.trim().toLowerCase().replace(/\s+/g, '-');
        const project = PROJECT_MAP[projectKey];
        if (project) {
          addLog('success', `\n  📂 ${project.name}`);
          addLog('output', `  ${project.desc}`);
          addLog('output', `  Tech: ${project.tech}`);
          addLog('output', `  GitHub: ${project.github}`);
          addLog('output', '');
          addLog('info', '  Opening GitHub repository...');
          window.open(project.github, '_blank');
        } else {
          addLog('error', `Project "${args}" not found.`);
          addLog('output', 'Available projects: smart-parking-finder, hpcl-dealer-app, bookstore-auth-system');
          addLog('output', 'Shortcuts: parking, hpcl, bookstore');
        }
        break;
      }

      case cmd === 'neofetch':
        addLog('ascii', NEOFETCH_ART);
        break;

      case cmd === 'banner':
        addLog('ascii', BANNER_ART);
        break;

      case cmd === 'history': {
        // Include the current 'history' command in the output
        const allHistory = [...commandHistory, command];
        const historyOutput = allHistory
          .map((c, i) => `  ${String(i + 1).padStart(4)}  ${c}`)
          .join('\n');
        addLog('output', historyOutput);
        break;
      }

      case cmd === 'sudo hire-me': {
        addLog('success', '');
        addLog('success', '  ╔══════════════════════════════════════════╗');
        addLog('success', '  ║                                          ║');
        addLog('success', '  ║   🎉  ACCESS GRANTED!                    ║');
        addLog('success', '  ║                                          ║');
        addLog('success', '  ║   sudo privileges confirmed.             ║');
        addLog('success', '  ║   Hiring process initiated...            ║');
        addLog('success', '  ║                                          ║');
        addLog('success', '  ║   📧 anuragkumarmsd456@gmail.com         ║');
        addLog('success', '  ║   💼 linkedin.com/in/anurag24kumar       ║');
        addLog('success', '  ║                                          ║');
        addLog('success', '  ║   Let\'s build something amazing! 🚀      ║');
        addLog('success', '  ║                                          ║');
        addLog('success', '  ╚══════════════════════════════════════════╝');
        addLog('success', '');
        break;
      }

      case cmd === 'matrix': {
        addLog('success', '🐇 Follow the white rabbit...');
        addLog('info', 'Press any key or type a command to exit the Matrix.');
        setIsMatrixActive(true);
        break;
      }

      default:
        if (cmd.startsWith('echo ')) {
          addLog('output', command.substring(5));
        } else if (cmd === '') {
          // Do nothing for empty commands
        } else {
          addLog('error', `Command not found: ${command}. Type "help" for available commands.`);
        }
    }
  }, [addLog, clearLogs, commandHistory]);

  return (
    <TerminalContext.Provider value={{
      logs,
      commandHistory,
      isMatrixActive,
      setIsMatrixActive,
      addLog,
      clearLogs,
      executeCommand,
      allCommands: ALL_COMMANDS,
    }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};
