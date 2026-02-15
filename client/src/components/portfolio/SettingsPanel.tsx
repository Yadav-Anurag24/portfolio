import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronRight,
  RotateCcw,
  Palette,
  Type,
  Map,
  Hash,
  Check,
  Minus,
  Plus,
  Sun,
  Moon,
} from 'lucide-react';
import { useSettings, themes, type ThemeDefinition } from '@/contexts/SettingsContext';

// -------------------------------------------------------------------
// Setting section component
// -------------------------------------------------------------------

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  children: React.ReactNode;
  id: string;
}

const SettingRow = ({ icon, label, description, children, id }: SettingRowProps) => (
  <div className="group flex items-start gap-3 px-4 py-3 hover:bg-muted/20 transition-colors border-b border-border/30">
    <div className="mt-0.5 text-muted-foreground">{icon}</div>
    <div className="flex-1 min-w-0">
      <label htmlFor={id} className="block text-sm text-foreground font-medium cursor-pointer">
        {label}
      </label>
      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
    </div>
    <div className="flex-shrink-0 mt-0.5">{children}</div>
  </div>
);

// -------------------------------------------------------------------
// Toggle switch
// -------------------------------------------------------------------

const Toggle = ({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) => (
  <button
    id={id}
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative w-9 h-5 rounded-full transition-colors ${
      checked ? 'bg-primary' : 'bg-muted'
    }`}
  >
    <motion.div
      className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
      animate={{ left: checked ? 18 : 2 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  </button>
);

// -------------------------------------------------------------------
// Theme card
// -------------------------------------------------------------------

const ThemeCard = ({
  theme,
  isActive,
  onClick,
}: {
  theme: ThemeDefinition;
  isActive: boolean;
  onClick: () => void;
}) => {
  // Extract a few representative colors for the preview
  const bg = `hsl(${theme.colors['--background']})`;
  const fg = `hsl(${theme.colors['--foreground']})`;
  const sidebar = `hsl(${theme.colors['--sidebar-background'] || theme.colors['--sidebar-bg']})`;
  const primary = `hsl(${theme.colors['--primary']})`;
  const keyword = `hsl(${theme.colors['--syntax-keyword']})`;
  const fn = `hsl(${theme.colors['--syntax-function']})`;
  const str = `hsl(${theme.colors['--syntax-string']})`;
  const border = `hsl(${theme.colors['--border']})`;

  return (
    <button
      onClick={onClick}
      className={`relative rounded-md overflow-hidden border-2 transition-all ${
        isActive
          ? 'border-primary ring-1 ring-primary/30'
          : 'border-border hover:border-muted-foreground/40'
      }`}
    >
      {/* Mini preview */}
      <div className="w-full h-16 flex" style={{ background: bg }}>
        {/* Sidebar preview */}
        <div className="w-3 h-full" style={{ background: sidebar, borderRight: `1px solid ${border}` }} />
        {/* Editor preview */}
        <div className="flex-1 px-1.5 py-1.5 space-y-1">
          <div className="flex gap-1">
            <div className="h-1 w-4 rounded-full" style={{ background: keyword }} />
            <div className="h-1 w-6 rounded-full" style={{ background: fn }} />
            <div className="h-1 w-3 rounded-full" style={{ background: fg, opacity: 0.5 }} />
          </div>
          <div className="flex gap-1">
            <div className="h-1 w-3 rounded-full" style={{ background: fg, opacity: 0.3 }} />
            <div className="h-1 w-8 rounded-full" style={{ background: str }} />
          </div>
          <div className="flex gap-1">
            <div className="h-1 w-5 rounded-full" style={{ background: keyword }} />
            <div className="h-1 w-4 rounded-full" style={{ background: fn }} />
          </div>
          <div className="flex gap-1">
            <div className="h-1 w-7 rounded-full" style={{ background: str }} />
            <div className="h-1 w-3 rounded-full" style={{ background: fg, opacity: 0.4 }} />
          </div>
        </div>
        {/* Status bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ background: primary }} />
      </div>
      {/* Label */}
      <div
        className="flex items-center justify-between px-2 py-1.5"
        style={{ background: sidebar }}
      >
        <span className="text-[10px] truncate" style={{ color: fg }}>
          {theme.name}
        </span>
        {isActive && (
          <Check className="w-3 h-3 flex-shrink-0" style={{ color: `hsl(${theme.colors['--primary']})` }} />
        )}
      </div>
      {/* Type badge */}
      <div
        className="absolute top-1 right-1 p-0.5 rounded-sm"
        style={{ background: sidebar, opacity: 0.8 }}
      >
        {theme.type === 'dark' ? (
          <Moon className="w-2 h-2" style={{ color: fg }} />
        ) : (
          <Sun className="w-2 h-2" style={{ color: fg }} />
        )}
      </div>
    </button>
  );
};

// -------------------------------------------------------------------
// SettingsPanel
// -------------------------------------------------------------------

const SettingsPanel = () => {
  const { settings, currentTheme, updateSetting, resetSettings } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['appearance', 'editor'])
  );

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section); else next.add(section);
      return next;
    });
  };

  // Filter settings by search
  const matchesSearch = (text: string) =>
    !searchQuery || text.toLowerCase().includes(searchQuery.toLowerCase());

  const showAppearance = matchesSearch('theme color appearance dark light dracula monokai solarized github');
  const showFontSize = matchesSearch('font size text editor');
  const showMinimap = matchesSearch('minimap overview scroll');
  const showLineNumbers = matchesSearch('line numbers gutter');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Settings</div>
        <button
          onClick={resetSettings}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted/50"
          title="Reset all settings to default"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-1.5 bg-muted/50 border border-border rounded focus-within:ring-1 focus-within:ring-primary/50">
          <Search className="w-3.5 h-3.5 text-muted-foreground ml-2 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search settings"
            className="flex-1 px-1 py-1.5 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-mono"
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* ── Appearance Section ── */}
        {showAppearance && (
          <div>
            <button
              onClick={() => toggleSection('appearance')}
              className="w-full flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <motion.div
                animate={{ rotate: expandedSections.has('appearance') ? 90 : 0 }}
                transition={{ duration: 0.15 }}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.div>
              Appearance
            </button>

            <AnimatePresence>
              {expandedSections.has('appearance') && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  {/* Theme picker */}
                  <div className="px-4 py-3 border-b border-border/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-foreground font-medium">Color Theme</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Specifies the color theme used in the workbench.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {themes.map(theme => (
                        <ThemeCard
                          key={theme.id}
                          theme={theme}
                          isActive={settings.themeId === theme.id}
                          onClick={() => updateSetting('themeId', theme.id)}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ── Editor Section ── */}
        {(showFontSize || showMinimap || showLineNumbers) && (
          <div>
            <button
              onClick={() => toggleSection('editor')}
              className="w-full flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <motion.div
                animate={{ rotate: expandedSections.has('editor') ? 90 : 0 }}
                transition={{ duration: 0.15 }}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.div>
              Editor
            </button>

            <AnimatePresence>
              {expandedSections.has('editor') && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  {/* Font Size */}
                  {showFontSize && (
                    <SettingRow
                      id="fontSize"
                      icon={<Type className="w-3.5 h-3.5" />}
                      label="Editor: Font Size"
                      description="Controls the font size in pixels."
                    >
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateSetting('fontSize', Math.max(10, settings.fontSize - 1))}
                          className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-mono text-foreground w-6 text-center">
                          {settings.fontSize}
                        </span>
                        <button
                          onClick={() => updateSetting('fontSize', Math.min(24, settings.fontSize + 1))}
                          className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </SettingRow>
                  )}

                  {/* Minimap */}
                  {showMinimap && (
                    <SettingRow
                      id="minimap"
                      icon={<Map className="w-3.5 h-3.5" />}
                      label="Editor: Minimap"
                      description="Controls whether the minimap is shown."
                    >
                      <Toggle
                        id="minimap"
                        checked={settings.showMinimap}
                        onChange={v => updateSetting('showMinimap', v)}
                      />
                    </SettingRow>
                  )}

                  {/* Line Numbers */}
                  {showLineNumbers && (
                    <SettingRow
                      id="lineNumbers"
                      icon={<Hash className="w-3.5 h-3.5" />}
                      label="Editor: Line Numbers"
                      description="Controls the display of line numbers."
                    >
                      <Toggle
                        id="lineNumbers"
                        checked={settings.showLineNumbers}
                        onChange={v => updateSetting('showLineNumbers', v)}
                      />
                    </SettingRow>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* No results */}
        {searchQuery && !showAppearance && !showFontSize && !showMinimap && !showLineNumbers && (
          <div className="px-4 py-8 text-center text-xs text-muted-foreground">
            No settings found matching "{searchQuery}"
          </div>
        )}

        {/* Current settings summary */}
        <div className="px-4 py-3 mt-2 border-t border-border/30">
          <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-2">
            Active Configuration
          </div>
          <div className="space-y-1 font-mono text-[11px]">
            <div>
              <span className="text-syntax-property">"workbench.colorTheme"</span>
              <span className="text-foreground">: </span>
              <span className="text-syntax-string">"{currentTheme.name}"</span>
            </div>
            <div>
              <span className="text-syntax-property">"editor.fontSize"</span>
              <span className="text-foreground">: </span>
              <span className="text-syntax-number">{settings.fontSize}</span>
            </div>
            <div>
              <span className="text-syntax-property">"editor.minimap.enabled"</span>
              <span className="text-foreground">: </span>
              <span className="text-syntax-keyword">{String(settings.showMinimap)}</span>
            </div>
            <div>
              <span className="text-syntax-property">"editor.lineNumbers"</span>
              <span className="text-foreground">: </span>
              <span className="text-syntax-string">"{settings.showLineNumbers ? 'on' : 'off'}"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
