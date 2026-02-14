import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

// ── Types ───────────────────────────────────────────────────────────
interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { sha: string; message: string; author: { name: string } }[];
    ref?: string;
    ref_type?: string;
    action?: string;
    pull_request?: { title: string; number: number };
    issue?: { title: string; number: number };
  };
}

interface CommitEntry {
  sha: string;
  message: string;
  repo: string;
  date: string;
  relativeTime: string;
}

// ── Helpers ─────────────────────────────────────────────────────────
const GITHUB_USERNAME = 'Yadav-Anurag24';
const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`;
const SERVER_EVENTS_API = '/api/github/events';
const DIRECT_EVENTS_API = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`;

// ── Static Fallback Data ────────────────────────────────────────────
// Shown when both server proxy and direct GitHub API are unavailable
// (rate-limited, offline, etc.)  Update this periodically.
function generateFallbackEvents(): GitHubEvent[] {
  const now = new Date();
  const day = (daysAgo: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString();
  };

  return [
    {
      id: 'f1', type: 'PushEvent', repo: { name: `${GITHUB_USERNAME}/parking-app` }, created_at: day(0),
      payload: { commits: [
        { sha: 'a1b2c3d4e5f6a7b8', message: 'feat: add real-time slot availability API', author: { name: 'Anurag Kumar' } },
        { sha: 'b2c3d4e5f6a7b8c9', message: 'fix: resolve Google Maps marker clustering', author: { name: 'Anurag Kumar' } },
      ]},
    },
    {
      id: 'f2', type: 'PushEvent', repo: { name: `${GITHUB_USERNAME}/bookstore-auth` }, created_at: day(1),
      payload: { commits: [
        { sha: 'c3d4e5f6a7b8c9d0', message: 'feat: implement JWT refresh token rotation', author: { name: 'Anurag Kumar' } },
        { sha: 'd4e5f6a7b8c9d0e1', message: 'test: add auth middleware unit tests', author: { name: 'Anurag Kumar' } },
        { sha: 'e5f6a7b8c9d0e1f2', message: 'docs: update API documentation', author: { name: 'Anurag Kumar' } },
      ]},
    },
    {
      id: 'f3', type: 'PushEvent', repo: { name: `${GITHUB_USERNAME}/hpcl-app` }, created_at: day(2),
      payload: { commits: [
        { sha: 'f6a7b8c9d0e1f2a3', message: 'feat: add inventory tracking dashboard', author: { name: 'Anurag Kumar' } },
      ]},
    },
    {
      id: 'f4', type: 'CreateEvent', repo: { name: `${GITHUB_USERNAME}/portfolio-master` }, created_at: day(3),
      payload: { ref: 'feat/terminal-commands', ref_type: 'branch' },
    },
    {
      id: 'f5', type: 'PushEvent', repo: { name: `${GITHUB_USERNAME}/portfolio-master` }, created_at: day(3),
      payload: { commits: [
        { sha: 'a7b8c9d0e1f2a3b4', message: 'feat: add interactive terminal with 19 commands', author: { name: 'Anurag Kumar' } },
        { sha: 'b8c9d0e1f2a3b4c5', message: 'feat: add Matrix rain easter egg animation', author: { name: 'Anurag Kumar' } },
      ]},
    },
    {
      id: 'f6', type: 'PushEvent', repo: { name: `${GITHUB_USERNAME}/parking-app` }, created_at: day(5),
      payload: { commits: [
        { sha: 'c9d0e1f2a3b4c5d6', message: 'refactor: migrate to Express 5 router', author: { name: 'Anurag Kumar' } },
      ]},
    },
    {
      id: 'f7', type: 'PushEvent', repo: { name: `${GITHUB_USERNAME}/bookstore-auth` }, created_at: day(7),
      payload: { commits: [
        { sha: 'd0e1f2a3b4c5d6e7', message: 'feat: add role-based access control middleware', author: { name: 'Anurag Kumar' } },
      ]},
    },
    {
      id: 'f8', type: 'WatchEvent', repo: { name: 'expressjs/express' }, created_at: day(8),
      payload: { action: 'started' },
    },
    {
      id: 'f9', type: 'PushEvent', repo: { name: `${GITHUB_USERNAME}/hpcl-app` }, created_at: day(10),
      payload: { commits: [
        { sha: 'e1f2a3b4c5d6e7f8', message: 'feat: integrate Firebase push notifications', author: { name: 'Anurag Kumar' } },
      ]},
    },
    {
      id: 'f10', type: 'PushEvent', repo: { name: `${GITHUB_USERNAME}/parking-app` }, created_at: day(14),
      payload: { commits: [
        { sha: 'f2a3b4c5d6e7f8a9', message: 'feat: add payment gateway integration', author: { name: 'Anurag Kumar' } },
        { sha: 'a3b4c5d6e7f8a9b0', message: 'style: update UI for dark mode support', author: { name: 'Anurag Kumar' } },
      ]},
    },
  ];
}

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function extractCommits(events: GitHubEvent[]): CommitEntry[] {
  const commits: CommitEntry[] = [];
  for (const event of events) {
    if (event.type === 'PushEvent' && event.payload.commits) {
      for (const c of event.payload.commits) {
        commits.push({
          sha: c.sha.slice(0, 7),
          message: c.message.split('\n')[0], // first line only
          repo: event.repo.name.split('/')[1] || event.repo.name,
          date: event.created_at,
          relativeTime: relativeTime(event.created_at),
        });
      }
    }
  }
  return commits;
}

/** Build a map of date → event count for each of the last 20 weeks (140 days) */
function buildHeatmap(events: GitHubEvent[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const event of events) {
    const dayKey = event.created_at.slice(0, 10); // YYYY-MM-DD
    map.set(dayKey, (map.get(dayKey) || 0) + 1);
  }
  return map;
}

/** Get the intensity level (0-4) for heatmap coloring */
function getIntensity(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
}

const INTENSITY_CLASSES = [
  'bg-muted/30',                    // 0: empty
  'bg-syntax-string/30',            // 1: low
  'bg-syntax-string/50',            // 2: medium-low
  'bg-syntax-string/70',            // 3: medium-high
  'bg-syntax-string',               // 4: high
];

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

// ── Contribution Heatmap ────────────────────────────────────────────
const ContributionHeatmap = ({ heatmap }: { heatmap: Map<string, number> }) => {
  // Generate last 16 weeks of days (112 days) to fit the sidebar
  const weeks = useMemo(() => {
    const result: string[][] = [];
    const today = new Date();
    const startDay = today.getDay(); // 0=Sun

    // Go back to the most recent Sunday
    const start = new Date(today);
    start.setDate(start.getDate() - startDay - (16 * 7 - 1));

    for (let w = 0; w < 16; w++) {
      const week: string[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(start);
        date.setDate(start.getDate() + w * 7 + d);
        week.push(date.toISOString().slice(0, 10));
      }
      result.push(week);
    }
    return result;
  }, []);

  // Month labels
  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, wIndex) => {
      const month = new Date(week[0]).getMonth();
      if (month !== lastMonth) {
        lastMonth = month;
        labels.push({
          label: new Date(week[0]).toLocaleString('en-US', { month: 'short' }),
          col: wIndex,
        });
      }
    });
    return labels;
  }, [weeks]);

  const totalContributions = useMemo(() => {
    let total = 0;
    heatmap.forEach((count) => { total += count; });
    return total;
  }, [heatmap]);

  return (
    <div className="px-2">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Contributions</div>
        <div className="text-xs text-muted-foreground">{totalContributions} events</div>
      </div>

      {/* Month labels */}
      <div className="flex gap-0 ml-6 mb-1">
        {monthLabels.map((m, i) => (
          <div
            key={i}
            className="text-[10px] text-muted-foreground"
            style={{ position: 'relative', left: `${m.col * 11}px` }}
          >
            {m.label}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex gap-[1px]">
        {/* Day labels */}
        <div className="flex flex-col gap-[1px] mr-1 shrink-0">
          {DAY_LABELS.map((label, i) => (
            <div key={i} className="w-4 h-[10px] text-[9px] text-muted-foreground leading-[10px] text-right pr-0.5">
              {label}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-[1px]">
            {week.map((day) => {
              const count = heatmap.get(day) || 0;
              const intensity = getIntensity(count);
              const isFuture = new Date(day) > new Date();
              return (
                <div
                  key={day}
                  className={`w-[10px] h-[10px] rounded-[2px] transition-colors ${
                    isFuture ? 'bg-transparent' : INTENSITY_CLASSES[intensity]
                  }`}
                  title={isFuture ? '' : `${day}: ${count} event${count !== 1 ? 's' : ''}`}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1 mt-2 justify-end">
        <span className="text-[10px] text-muted-foreground mr-1">Less</span>
        {INTENSITY_CLASSES.map((cls, i) => (
          <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${cls}`} />
        ))}
        <span className="text-[10px] text-muted-foreground ml-1">More</span>
      </div>
    </div>
  );
};

// ── Commit List ─────────────────────────────────────────────────────
const CommitList = ({ commits }: { commits: CommitEntry[] }) => {
  if (commits.length === 0) {
    return (
      <div className="px-2 py-4 text-center text-xs text-muted-foreground">
        No recent commits found
      </div>
    );
  }

  // Group commits by repo
  const grouped = useMemo(() => {
    const map = new Map<string, CommitEntry[]>();
    for (const c of commits.slice(0, 30)) {
      const list = map.get(c.repo) || [];
      list.push(c);
      map.set(c.repo, list);
    }
    return map;
  }, [commits]);

  return (
    <div className="space-y-3">
      {Array.from(grouped.entries()).map(([repo, repoCommits]) => (
        <div key={repo}>
          {/* Repo header */}
          <div className="flex items-center gap-1.5 px-2 py-1">
            <GitBranch className="w-3.5 h-3.5 text-syntax-function shrink-0" />
            <span className="text-xs font-medium text-syntax-function truncate">{repo}</span>
            <span className="text-[10px] text-muted-foreground ml-auto shrink-0">
              {repoCommits.length} commit{repoCommits.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Commits */}
          {repoCommits.slice(0, 5).map((commit, i) => (
            <motion.div
              key={commit.sha + i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-start gap-2 px-2 py-1.5 hover:bg-muted/30 rounded cursor-default group"
            >
              <GitCommit className="w-3.5 h-3.5 text-syntax-string shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-foreground truncate leading-tight">
                  {commit.message}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-syntax-keyword font-mono">{commit.sha}</span>
                  <span className="text-[10px] text-muted-foreground">{commit.relativeTime}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {repoCommits.length > 5 && (
            <div className="px-2 py-1 text-[10px] text-muted-foreground pl-7">
              +{repoCommits.length - 5} more commit{repoCommits.length - 5 !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ── Recent Activity (non-commit events) ─────────────────────────────
const ActivityFeed = ({ events }: { events: GitHubEvent[] }) => {
  const activities = useMemo(() => {
    return events
      .filter((e) => e.type !== 'PushEvent')
      .slice(0, 8)
      .map((event) => {
        let icon = '•';
        let description = '';
        const repo = event.repo.name.split('/')[1] || event.repo.name;

        switch (event.type) {
          case 'CreateEvent':
            icon = '🌱';
            description = `Created ${event.payload.ref_type || 'repo'}${event.payload.ref ? ` "${event.payload.ref}"` : ''} in ${repo}`;
            break;
          case 'PullRequestEvent':
            icon = '🔀';
            description = `${event.payload.action || 'Opened'} PR #${event.payload.pull_request?.number} in ${repo}`;
            break;
          case 'IssuesEvent':
            icon = '📋';
            description = `${event.payload.action || 'Opened'} issue #${event.payload.issue?.number} in ${repo}`;
            break;
          case 'WatchEvent':
            icon = '⭐';
            description = `Starred ${repo}`;
            break;
          case 'ForkEvent':
            icon = '🍴';
            description = `Forked ${repo}`;
            break;
          case 'DeleteEvent':
            icon = '🗑️';
            description = `Deleted ${event.payload.ref_type || 'ref'} in ${repo}`;
            break;
          default:
            icon = '📌';
            description = `${event.type.replace('Event', '')} in ${repo}`;
        }

        return { id: event.id, icon, description, time: relativeTime(event.created_at) };
      });
  }, [events]);

  if (activities.length === 0) return null;

  return (
    <div className="px-2 space-y-1">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Recent Activity</div>
      {activities.map((a) => (
        <div key={a.id} className="flex items-start gap-2 py-1 hover:bg-muted/30 rounded px-1 cursor-default">
          <span className="text-xs shrink-0 mt-0.5">{a.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-foreground leading-tight truncate">{a.description}</div>
            <div className="text-[10px] text-muted-foreground">{a.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Main Panel ──────────────────────────────────────────────────────
const GitActivityPanel = () => {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [dataSource, setDataSource] = useState<string>('');

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Strategy 1: Try server proxy (has caching, handles rate limits)
    try {
      const res = await fetch(SERVER_EVENTS_API);
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) {
          setEvents(json.data);
          setLastFetched(new Date());
          setDataSource(json.source === 'stale-cache' ? 'cached' : 'live');
          setLoading(false);
          return;
        }
      }
    } catch {
      // Server not available, try direct API
    }

    // Strategy 2: Try direct GitHub API
    try {
      const res = await fetch(DIRECT_EVENTS_API);
      if (res.ok) {
        const data: GitHubEvent[] = await res.json();
        setEvents(data);
        setLastFetched(new Date());
        setDataSource('live');
        setLoading(false);
        return;
      }
    } catch {
      // Direct API also failed
    }

    // Strategy 3: Use static fallback data
    setEvents(generateFallbackEvents());
    setLastFetched(new Date());
    setDataSource('offline');
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const commits = useMemo(() => extractCommits(events), [events]);
  const heatmap = useMemo(() => buildHeatmap(events), [events]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 space-y-2 shrink-0">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Source Control</div>
          <div className="flex items-center gap-1">
            <button
              onClick={fetchEvents}
              className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
              title="Refresh"
              disabled={loading}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
              title="Open GitHub Profile"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Branch indicator */}
        <div className="flex items-center gap-2 px-1">
          <GitBranch className="w-3.5 h-3.5 text-syntax-string" />
          <span className="text-sm text-foreground">main</span>
          <div className="flex items-center gap-1.5 ml-auto">
            {dataSource && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-medium ${
                dataSource === 'live' ? 'bg-syntax-string/20 text-syntax-string' :
                dataSource === 'cached' ? 'bg-syntax-variable/20 text-syntax-variable' :
                'bg-muted text-muted-foreground'
              }`}>
                {dataSource}
              </span>
            )}
            <span className="text-[10px] text-muted-foreground">
              {lastFetched ? relativeTime(lastFetched.toISOString()) : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mx-4 mb-2 px-3 py-2 rounded bg-destructive/10 border border-destructive/20 flex items-start gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
          <div>
            <div className="text-xs text-destructive">{error}</div>
            <button
              onClick={fetchEvents}
              className="text-[10px] text-destructive/80 underline hover:text-destructive mt-0.5"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {/* Loading skeleton */}
        {loading && events.length === 0 && (
          <div className="px-4 space-y-3">
            {/* Heatmap skeleton */}
            <div className="space-y-1">
              <div className="h-3 w-24 bg-muted/40 rounded animate-pulse" />
              <div className="h-[82px] w-full bg-muted/20 rounded animate-pulse" />
            </div>
            {/* Commit skeleton */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-muted/40 animate-pulse" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-3/4 bg-muted/30 rounded animate-pulse" />
                  <div className="h-2 w-1/3 bg-muted/20 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Heatmap */}
        {!loading && events.length > 0 && (
          <ContributionHeatmap heatmap={heatmap} />
        )}

        {/* Commit log */}
        {!loading && events.length > 0 && (
          <div className="px-2">
            <div className="text-xs text-muted-foreground uppercase tracking-wider px-0 mb-2">
              Recent Commits
            </div>
            <CommitList commits={commits} />
          </div>
        )}

        {/* Other activity */}
        {!loading && events.length > 0 && (
          <ActivityFeed events={events} />
        )}

        {/* Empty state (no error, no loading, but no events) */}
        {!loading && !error && events.length === 0 && (
          <div className="px-4 py-8 text-center space-y-2">
            <GitBranch className="w-8 h-8 text-muted-foreground mx-auto" />
            <div className="text-xs text-muted-foreground">No recent public activity</div>
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-syntax-function hover:underline"
            >
              View full profile on GitHub →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitActivityPanel;
