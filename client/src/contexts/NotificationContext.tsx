import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Info,
  CheckCircle2,
  AlertTriangle,
  Bell,
  Lightbulb,
  Rocket,
  Terminal,
  Keyboard,
} from 'lucide-react';

/* ================================================================
   TYPES
   ================================================================ */

type NotificationType = 'info' | 'success' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  icon?: ReactNode;
  /** Duration in ms before auto-dismiss (0 = manual only) */
  duration?: number;
  /** Optional action buttons */
  actions?: Array<{ label: string; onClick: () => void }>;
}

interface NotificationContextType {
  notify: (n: Omit<Notification, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

/* ================================================================
   CONTEXT
   ================================================================ */

const NotificationContext = createContext<NotificationContextType>({
  notify: () => '',
  dismiss: () => {},
  dismissAll: () => {},
});

export const useNotification = () => useContext(NotificationContext);

/* ================================================================
   PROVIDER + TOAST RENDERER
   ================================================================ */

let nextId = 1;

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const notify = useCallback(
    (n: Omit<Notification, 'id'>): string => {
      const id = `notif-${nextId++}`;
      const notification: Notification = { ...n, id };
      setNotifications((prev) => [...prev, notification]);

      // Auto-dismiss after duration
      const duration = n.duration ?? 6000;
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }

      return id;
    },
    [dismiss],
  );

  return (
    <NotificationContext.Provider value={{ notify, dismiss, dismissAll }}>
      {children}

      {/* Notification toast stack — bottom-right, VS Code style */}
      <div className="fixed bottom-8 right-4 z-[100] flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {notifications.map((n) => (
            <NotificationToast
              key={n.id}
              notification={n}
              onDismiss={() => dismiss(n.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

/* ================================================================
   INDIVIDUAL TOAST
   ================================================================ */

const typeConfig: Record<
  NotificationType,
  { icon: ReactNode; accentColor: string; bg: string }
> = {
  info: {
    icon: <Info className="w-4 h-4" />,
    accentColor: 'var(--primary)',
    bg: 'color-mix(in srgb, var(--primary) 8%, var(--card))',
  },
  success: {
    icon: <CheckCircle2 className="w-4 h-4" />,
    accentColor: 'var(--syntax-string)',
    bg: 'color-mix(in srgb, var(--syntax-string) 8%, var(--card))',
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4" />,
    accentColor: '#e5c07b',
    bg: 'color-mix(in srgb, #e5c07b 8%, var(--card))',
  },
};

interface NotificationToastProps {
  notification: Notification;
  onDismiss: () => void;
}

const NotificationToast = ({ notification, onDismiss }: NotificationToastProps) => {
  const { type, title, message, icon, actions } = notification;
  const config = typeConfig[type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      className="pointer-events-auto rounded-md border border-border shadow-xl overflow-hidden"
      style={{
        background: config.bg,
        borderLeft: `3px solid ${config.accentColor}`,
      }}
    >
      <div className="flex items-start gap-2.5 p-3">
        {/* Icon */}
        <div className="shrink-0 mt-0.5" style={{ color: config.accentColor }}>
          {icon || config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground leading-tight">{title}</div>
          <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{message}</div>

          {/* Action buttons */}
          {actions && actions.length > 0 && (
            <div className="flex gap-2 mt-2">
              {actions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => {
                    action.onClick();
                    onDismiss();
                  }}
                  className="text-xs font-medium px-2 py-0.5 rounded transition-colors"
                  style={{
                    color: config.accentColor,
                    background: `color-mix(in srgb, ${config.accentColor} 15%, transparent)`,
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onDismiss}
          className="shrink-0 p-0.5 hover:bg-muted rounded transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>

      {/* Countdown progress bar */}
      {(notification.duration ?? 6000) > 0 && (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: (notification.duration ?? 6000) / 1000, ease: 'linear' }}
          style={{
            transformOrigin: 'left',
            background: config.accentColor,
            height: 2,
          }}
        />
      )}
    </motion.div>
  );
};

/* ================================================================
   PRE-BUILT NOTIFICATION HELPERS
   ================================================================ */

export const useWelcomeNotification = () => {
  const { notify } = useNotification();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('portfolio-welcomed');
    if (hasVisited) return;

    // First notification — welcome
    const welcomeTimer = setTimeout(() => {
      notify({
        type: 'info',
        title: 'Welcome to my Portfolio!',
        message: 'Press Ctrl+K to open the Command Palette and explore.',
        icon: <Rocket className="w-4 h-4" />,
        duration: 8000,
        actions: [{ label: 'Got it!', onClick: () => {} }],
      });
    }, 1500);

    // Second notification — terminal hint
    const terminalTimer = setTimeout(() => {
      notify({
        type: 'info',
        title: 'Try the Terminal',
        message: 'Press Ctrl+` to open the terminal and type "help" for a list of commands.',
        icon: <Terminal className="w-4 h-4" />,
        duration: 8000,
      });
    }, 4500);

    // Third notification — keyboard shortcuts
    const kbTimer = setTimeout(() => {
      notify({
        type: 'info',
        title: 'Keyboard Shortcuts',
        message: 'Ctrl+B toggles the sidebar. Ctrl+, opens settings to change themes.',
        icon: <Keyboard className="w-4 h-4" />,
        duration: 8000,
      });
    }, 10000);

    sessionStorage.setItem('portfolio-welcomed', 'true');

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(terminalTimer);
      clearTimeout(kbTimer);
    };
  }, [notify]);
};

export const useProjectNotification = () => {
  const { notify } = useNotification();

  const notifyNewProject = useCallback(
    (projectName?: string) => {
      notify({
        type: 'info',
        title: 'Projects Loaded',
        message: projectName
          ? `Viewing: ${projectName}`
          : 'All projects fetched from the server successfully.',
        icon: <Lightbulb className="w-4 h-4" />,
        duration: 4000,
      });
    },
    [notify],
  );

  return { notifyNewProject };
};

export const useContactNotification = () => {
  const { notify } = useNotification();

  const notifyContactSuccess = useCallback(() => {
    notify({
      type: 'success',
      title: 'Message Sent!',
      message: 'Your message was delivered successfully. I\'ll get back to you soon!',
      icon: <CheckCircle2 className="w-4 h-4" />,
      duration: 6000,
    });
  }, [notify]);

  const notifyContactError = useCallback((errorMsg?: string) => {
    notify({
      type: 'warning',
      title: 'Failed to Send',
      message: errorMsg || 'Could not reach the server. Please try again later.',
      icon: <AlertTriangle className="w-4 h-4" />,
      duration: 8000,
    });
  }, [notify]);

  return { notifyContactSuccess, notifyContactError };
};

export const useBellNotification = () => {
  const { notify } = useNotification();

  const notifyBell = useCallback(() => {
    notify({
      type: 'info',
      title: 'No New Notifications',
      message: 'All caught up! Check back later for updates.',
      icon: <Bell className="w-4 h-4" />,
      duration: 3000,
    });
  }, [notify]);

  return { notifyBell };
};
