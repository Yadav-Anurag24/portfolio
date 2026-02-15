import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

// -------------------------------------------------------------------
// Theme definitions
// -------------------------------------------------------------------

export interface ThemeDefinition {
  id: string;
  name: string;
  type: 'dark' | 'light';
  colors: Record<string, string>;  // CSS custom property name → HSL value
}

export const themes: ThemeDefinition[] = [
  {
    id: 'one-dark-pro',
    name: 'One Dark Pro',
    type: 'dark',
    colors: {
      '--background': '220 13% 12%',
      '--foreground': '220 14% 71%',
      '--sidebar-bg': '220 13% 15%',
      '--sidebar-hover': '220 13% 20%',
      '--card': '220 13% 14%',
      '--card-foreground': '220 14% 71%',
      '--popover': '220 13% 14%',
      '--popover-foreground': '220 14% 71%',
      '--primary': '207 90% 54%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '286 60% 67%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '220 13% 22%',
      '--muted-foreground': '220 9% 46%',
      '--accent': '39 67% 69%',
      '--accent-foreground': '220 13% 12%',
      '--destructive': '0 62% 55%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '220 13% 22%',
      '--input': '220 13% 22%',
      '--ring': '207 90% 54%',
      '--syntax-keyword': '286 60% 67%',
      '--syntax-function': '207 82% 66%',
      '--syntax-string': '95 38% 62%',
      '--syntax-variable': '39 67% 69%',
      '--syntax-property': '187 47% 55%',
      '--syntax-comment': '220 9% 46%',
      '--syntax-number': '29 54% 61%',
      '--syntax-tag': '355 65% 65%',
      '--line-number': '220 9% 35%',
      '--line-number-active': '220 14% 71%',
      '--tab-active': '220 13% 14%',
      '--tab-inactive': '220 13% 18%',
      '--tab-border': '220 13% 22%',
      '--sidebar-background': '220 13% 15%',
      '--sidebar-foreground': '220 14% 71%',
      '--sidebar-primary': '207 90% 54%',
      '--sidebar-primary-foreground': '0 0% 100%',
      '--sidebar-accent': '220 13% 22%',
      '--sidebar-accent-foreground': '220 14% 71%',
      '--sidebar-border': '220 13% 22%',
      '--sidebar-ring': '207 90% 54%',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    type: 'dark',
    colors: {
      '--background': '231 15% 15%',
      '--foreground': '60 30% 96%',
      '--sidebar-bg': '231 15% 13%',
      '--sidebar-hover': '231 15% 20%',
      '--card': '231 15% 14%',
      '--card-foreground': '60 30% 96%',
      '--popover': '231 15% 14%',
      '--popover-foreground': '60 30% 96%',
      '--primary': '265 89% 78%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '326 100% 74%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '231 15% 22%',
      '--muted-foreground': '228 8% 50%',
      '--accent': '135 94% 65%',
      '--accent-foreground': '231 15% 15%',
      '--destructive': '0 100% 67%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '231 15% 22%',
      '--input': '231 15% 22%',
      '--ring': '265 89% 78%',
      '--syntax-keyword': '326 100% 74%',
      '--syntax-function': '135 94% 65%',
      '--syntax-string': '65 92% 76%',
      '--syntax-variable': '60 30% 96%',
      '--syntax-property': '191 97% 77%',
      '--syntax-comment': '225 27% 51%',
      '--syntax-number': '265 89% 78%',
      '--syntax-tag': '326 100% 74%',
      '--line-number': '228 8% 38%',
      '--line-number-active': '60 30% 96%',
      '--tab-active': '231 15% 14%',
      '--tab-inactive': '231 15% 18%',
      '--tab-border': '231 15% 22%',
      '--sidebar-background': '231 15% 13%',
      '--sidebar-foreground': '60 30% 96%',
      '--sidebar-primary': '265 89% 78%',
      '--sidebar-primary-foreground': '0 0% 100%',
      '--sidebar-accent': '231 15% 22%',
      '--sidebar-accent-foreground': '60 30% 96%',
      '--sidebar-border': '231 15% 22%',
      '--sidebar-ring': '265 89% 78%',
    },
  },
  {
    id: 'monokai',
    name: 'Monokai',
    type: 'dark',
    colors: {
      '--background': '70 8% 15%',
      '--foreground': '60 36% 96%',
      '--sidebar-bg': '70 8% 13%',
      '--sidebar-hover': '70 8% 20%',
      '--card': '70 8% 14%',
      '--card-foreground': '60 36% 96%',
      '--popover': '70 8% 14%',
      '--popover-foreground': '60 36% 96%',
      '--primary': '80 76% 53%',
      '--primary-foreground': '0 0% 0%',
      '--secondary': '338 95% 56%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '70 8% 22%',
      '--muted-foreground': '50 5% 50%',
      '--accent': '54 70% 68%',
      '--accent-foreground': '70 8% 15%',
      '--destructive': '338 95% 56%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '70 8% 22%',
      '--input': '70 8% 22%',
      '--ring': '80 76% 53%',
      '--syntax-keyword': '338 95% 56%',
      '--syntax-function': '80 76% 53%',
      '--syntax-string': '54 70% 68%',
      '--syntax-variable': '60 36% 96%',
      '--syntax-property': '190 81% 67%',
      '--syntax-comment': '60 2% 46%',
      '--syntax-number': '261 100% 75%',
      '--syntax-tag': '338 95% 56%',
      '--line-number': '50 5% 38%',
      '--line-number-active': '60 36% 96%',
      '--tab-active': '70 8% 14%',
      '--tab-inactive': '70 8% 18%',
      '--tab-border': '70 8% 22%',
      '--sidebar-background': '70 8% 13%',
      '--sidebar-foreground': '60 36% 96%',
      '--sidebar-primary': '80 76% 53%',
      '--sidebar-primary-foreground': '0 0% 0%',
      '--sidebar-accent': '70 8% 22%',
      '--sidebar-accent-foreground': '60 36% 96%',
      '--sidebar-border': '70 8% 22%',
      '--sidebar-ring': '80 76% 53%',
    },
  },
  {
    id: 'github-light',
    name: 'GitHub Light',
    type: 'light',
    colors: {
      '--background': '0 0% 100%',
      '--foreground': '215 14% 34%',
      '--sidebar-bg': '210 17% 98%',
      '--sidebar-hover': '210 17% 93%',
      '--card': '210 17% 99%',
      '--card-foreground': '215 14% 34%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '215 14% 34%',
      '--primary': '212 92% 45%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '288 60% 40%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '210 17% 93%',
      '--muted-foreground': '215 14% 55%',
      '--accent': '39 100% 50%',
      '--accent-foreground': '0 0% 0%',
      '--destructive': '0 72% 51%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '210 18% 87%',
      '--input': '210 18% 87%',
      '--ring': '212 92% 45%',
      '--syntax-keyword': '288 60% 40%',
      '--syntax-function': '212 92% 45%',
      '--syntax-string': '131 42% 36%',
      '--syntax-variable': '24 60% 45%',
      '--syntax-property': '192 75% 36%',
      '--syntax-comment': '215 14% 65%',
      '--syntax-number': '212 92% 45%',
      '--syntax-tag': '131 42% 36%',
      '--line-number': '215 14% 75%',
      '--line-number-active': '215 14% 34%',
      '--tab-active': '0 0% 100%',
      '--tab-inactive': '210 17% 96%',
      '--tab-border': '210 18% 87%',
      '--sidebar-background': '210 17% 98%',
      '--sidebar-foreground': '215 14% 34%',
      '--sidebar-primary': '212 92% 45%',
      '--sidebar-primary-foreground': '0 0% 100%',
      '--sidebar-accent': '210 17% 93%',
      '--sidebar-accent-foreground': '215 14% 34%',
      '--sidebar-border': '210 18% 87%',
      '--sidebar-ring': '212 92% 45%',
    },
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    type: 'dark',
    colors: {
      '--background': '192 100% 8%',
      '--foreground': '44 87% 94%',
      '--sidebar-bg': '192 100% 7%',
      '--sidebar-hover': '192 81% 14%',
      '--card': '192 100% 9%',
      '--card-foreground': '44 87% 94%',
      '--popover': '192 100% 9%',
      '--popover-foreground': '44 87% 94%',
      '--primary': '68 100% 30%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '175 59% 40%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '192 81% 14%',
      '--muted-foreground': '186 8% 55%',
      '--accent': '18 89% 51%',
      '--accent-foreground': '192 100% 8%',
      '--destructive': '1 71% 52%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '192 81% 14%',
      '--input': '192 81% 14%',
      '--ring': '68 100% 30%',
      '--syntax-keyword': '18 89% 51%',
      '--syntax-function': '68 100% 30%',
      '--syntax-string': '175 59% 40%',
      '--syntax-variable': '45 100% 35%',
      '--syntax-property': '205 69% 49%',
      '--syntax-comment': '186 8% 44%',
      '--syntax-number': '331 64% 52%',
      '--syntax-tag': '1 71% 52%',
      '--line-number': '186 8% 30%',
      '--line-number-active': '44 87% 94%',
      '--tab-active': '192 100% 9%',
      '--tab-inactive': '192 100% 11%',
      '--tab-border': '192 81% 14%',
      '--sidebar-background': '192 100% 7%',
      '--sidebar-foreground': '44 87% 94%',
      '--sidebar-primary': '68 100% 30%',
      '--sidebar-primary-foreground': '0 0% 100%',
      '--sidebar-accent': '192 81% 14%',
      '--sidebar-accent-foreground': '44 87% 94%',
      '--sidebar-border': '192 81% 14%',
      '--sidebar-ring': '68 100% 30%',
    },
  },
];

// -------------------------------------------------------------------
// Settings interface
// -------------------------------------------------------------------

export interface Settings {
  themeId: string;
  fontSize: number;
  showMinimap: boolean;
  showLineNumbers: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  themeId: 'one-dark-pro',
  fontSize: 14,
  showMinimap: true,
  showLineNumbers: true,
};

const STORAGE_KEY = 'portfolio-settings';

// -------------------------------------------------------------------
// Context
// -------------------------------------------------------------------

interface SettingsContextValue {
  settings: Settings;
  currentTheme: ThemeDefinition;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
};

// -------------------------------------------------------------------
// Provider
// -------------------------------------------------------------------

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Settings>;
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch { /* ignore corrupt storage */ }
    return DEFAULT_SETTINGS;
  });

  const currentTheme = themes.find(t => t.id === settings.themeId) ?? themes[0];

  // Apply theme CSS variables to :root
  useEffect(() => {
    const root = document.documentElement;
    for (const [prop, value] of Object.entries(currentTheme.colors)) {
      root.style.setProperty(prop, value);
    }
  }, [currentTheme]);

  // Apply font size
  useEffect(() => {
    document.documentElement.style.setProperty('--editor-font-size', `${settings.fontSize}px`);
  }, [settings.fontSize]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch { /* storage full – ignore */ }
  }, [settings]);

  const updateSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, currentTheme, updateSetting, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
