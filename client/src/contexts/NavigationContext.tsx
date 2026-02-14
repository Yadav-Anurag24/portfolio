import { createContext, useContext, ReactNode, useCallback, useState } from 'react';

interface NavigationContextType {
  navigateToFile: (fileName: string) => void;
  toggleTerminal: () => void;
  toggleSidebar: () => void;
  registerHandlers: (handlers: NavigationHandlers) => void;
}

interface NavigationHandlers {
  onFileSelect: (fileName: string) => void;
  onToggleTerminal: () => void;
  onToggleSidebar: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [handlers, setHandlers] = useState<NavigationHandlers | null>(null);

  const registerHandlers = useCallback((h: NavigationHandlers) => {
    setHandlers(h);
  }, []);

  const navigateToFile = useCallback((fileName: string) => {
    handlers?.onFileSelect(fileName);
  }, [handlers]);

  const toggleTerminal = useCallback(() => {
    handlers?.onToggleTerminal();
  }, [handlers]);

  const toggleSidebar = useCallback(() => {
    handlers?.onToggleSidebar();
  }, [handlers]);

  return (
    <NavigationContext.Provider value={{ navigateToFile, toggleTerminal, toggleSidebar, registerHandlers }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
