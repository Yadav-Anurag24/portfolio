import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface TerminalLog {
  id: number;
  type: 'info' | 'success' | 'error' | 'command' | 'output';
  message: string;
  timestamp: Date;
}

interface TerminalContextType {
  logs: TerminalLog[];
  addLog: (type: TerminalLog['type'], message: string) => void;
  clearLogs: () => void;
  executeCommand: (command: string) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

let logId = 0;

export const TerminalProvider = ({ children }: { children: ReactNode }) => {
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: logId++, type: 'info', message: 'Welcome to the portfolio terminal!', timestamp: new Date() },
    { id: logId++, type: 'output', message: 'Type "help" for available commands.', timestamp: new Date() },
  ]);

  const addLog = useCallback((type: TerminalLog['type'], message: string) => {
    setLogs((prev) => [...prev, { id: logId++, type, message, timestamp: new Date() }]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const executeCommand = useCallback((command: string) => {
    addLog('command', `$ ${command}`);

    const cmd = command.toLowerCase().trim();

    switch (cmd) {
      case 'help':
        addLog('output', `
Available commands:
  help          - Show this help message
  about         - About me
  skills        - List my technical skills
  projects      - List my projects
  contact       - Contact information
  clear         - Clear the terminal
  github        - Open GitHub profile
  linkedin      - Open LinkedIn profile
  whoami        - Display current user
  date          - Show current date
  echo <text>   - Echo back text
        `.trim());
        break;
      case 'about':
        addLog('output', 'Final Year Student & Aspiring Backend Developer passionate about building scalable systems.');
        break;
      case 'skills':
        addLog('output', '→ Languages: JavaScript, TypeScript, Python, Java');
        addLog('output', '→ Frontend: React, Angular, Ionic, React Native');
        addLog('output', '→ Backend: Node.js, Express, MongoDB, AWS');
        addLog('output', '→ DevOps: Docker, Kubernetes, CI/CD');
        break;
      case 'projects':
        addLog('output', '1. Smart Parking Finder - Ionic, Angular, Node.js');
        addLog('output', '2. HPCL Dealer App - React Native');
        addLog('output', '3. Bookstore Auth System - Node.js, Express');
        break;
      case 'contact':
        addLog('output', '📧 Email: hello@developer.com');
        addLog('output', '🔗 GitHub: github.com/developer');
        addLog('output', '💼 LinkedIn: linkedin.com/in/developer');
        break;
      case 'clear':
        clearLogs();
        break;
      case 'github':
        addLog('success', 'Opening GitHub profile...');
        window.open('https://github.com', '_blank');
        break;
      case 'linkedin':
        addLog('success', 'Opening LinkedIn profile...');
        window.open('https://linkedin.com', '_blank');
        break;
      case 'whoami':
        addLog('output', 'developer@portfolio:~$');
        break;
      case 'date':
        addLog('output', new Date().toLocaleString());
        break;
      default:
        if (cmd.startsWith('echo ')) {
          addLog('output', command.substring(5));
        } else if (cmd === '') {
          // Do nothing for empty commands
        } else {
          addLog('error', `Command not found: ${command}. Type "help" for available commands.`);
        }
    }
  }, [addLog, clearLogs]);

  return (
    <TerminalContext.Provider value={{ logs, addLog, clearLogs, executeCommand }}>
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
