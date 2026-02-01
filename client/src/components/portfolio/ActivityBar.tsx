import { Files, Search, GitBranch, Puzzle, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ActivityBarProps {
  activePanel: string;
  onPanelChange: (panel: string) => void;
}

const activities = [
  { id: 'explorer', icon: Files, label: 'Explorer', shortcut: 'Ctrl+Shift+E' },
  { id: 'search', icon: Search, label: 'Search', shortcut: 'Ctrl+Shift+F' },
  { id: 'git', icon: GitBranch, label: 'Source Control', shortcut: 'Ctrl+Shift+G' },
  { id: 'extensions', icon: Puzzle, label: 'Extensions', shortcut: 'Ctrl+Shift+X' },
];

const ActivityBar = ({ activePanel, onPanelChange }: ActivityBarProps) => {
  return (
    <div className="w-12 bg-[hsl(220,13%,10%)] flex flex-col items-center py-2 border-r border-border">
      {/* Top icons */}
      <div className="flex flex-col gap-1">
        {activities.map((activity) => (
          <Tooltip key={activity.id} delayDuration={300}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onPanelChange(activity.id)}
                className={`w-12 h-12 flex items-center justify-center relative transition-colors
                  ${activePanel === activity.id 
                    ? 'text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {activePanel === activity.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-foreground" />
                )}
                <activity.icon className="w-6 h-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-2">
              <span>{activity.label}</span>
              <span className="text-muted-foreground text-xs">{activity.shortcut}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom icons */}
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <button className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <User className="w-6 h-6" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <span>Account</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ActivityBar;
