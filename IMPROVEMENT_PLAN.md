# Portfolio Improvement Plan

**Project:** VS Code Portfolio (MERN Stack)  
**Author:** Anurag Kumar  
**Review Date:** February 10, 2026

---

## PART A — Critical Fixes (Do These First)

### 1. ~~SEO & Metadata~~ ✅ DONE

All SEO and metadata fixes have been implemented:

- [x] Title set to `"Anurag Kumar | Backend Developer Portfolio"`
- [x] Added real OG image reference (`og-image.png` / `og-image.svg`)
- [x] Added custom SVG favicon (`<AK/>` code theme — replace with Flaticon PNG if preferred)
- [x] Added `sitemap.xml` and structured JSON-LD Person schema
- [x] Added canonical URL meta tag
- [x] Removed all Lovable branding
- [x] Added `theme-color` meta tag matching VS Code dark theme
- [x] Moved Google Fonts from render-blocking CSS `@import` to `<link rel="preload">` in HTML
- [x] Updated `robots.txt` with sitemap reference
- [x] Added Twitter card and Open Graph meta tags with proper content

### 2. ~~Placeholder Content~~ ✅ DONE

All placeholder content has been replaced with real details:

- [x] `ContactContent.tsx` — email, GitHub, LinkedIn now show real URLs and are clickable links
- [x] `StatusBar.tsx` — social icons now link to `github.com/Yadav-Anurag24` and `linkedin.com/in/anurag24kumar`
- [x] `TerminalContext.tsx` — `contact` command shows real email/GitHub/LinkedIn
- [x] `TerminalContext.tsx` — `github` and `linkedin` commands open real profile URLs
- [x] `TerminalContext.tsx` — `whoami` returns `anurag@portfolio:~$`

### 3. ~~Bundle Bloat~~ ✅ DONE

Full dependency audit and cleanup completed:

**Removed 37 unused production dependencies:**
- [x] 20 Radix UI packages (`accordion`, `alert-dialog`, `aspect-ratio`, `avatar`, `checkbox`, `collapsible`, `context-menu`, `dropdown-menu`, `label`, `menubar`, `navigation-menu`, `popover`, `progress`, `radio-group`, `scroll-area`, `select`, `separator`, `slider`, `switch`, `tabs`, `toggle`, `toggle-group`, `slot`, `toast`)
- [x] `@tanstack/react-query` — QueryClient was set up but no queries existed
- [x] `@hookform/resolvers`, `react-hook-form`, `zod` — form library never used
- [x] `recharts` (~400KB), `embla-carousel-react`, `react-day-picker`, `date-fns`
- [x] `input-otp`, `react-resizable-panels`, `cmdk`, `vaul`
- [x] `sonner`, `next-themes` — dual toast system removed (neither was used by app code)

**Removed 2 unused dev dependencies:**
- [x] `@vitejs/plugin-react-swc` — duplicate of `@vitejs/plugin-react`
- [x] `lovable-tagger` — generator artifact

**Cleaned up code:**
- [x] `App.tsx` — removed `QueryClientProvider`, `<Toaster />`, `<Sonner />` wrappers
- [x] Deleted `App.css` (Vite boilerplate — logo spin, `.read-the-docs`)
- [x] Deleted 46 unused UI component files from `src/components/ui/`
- [x] Deleted duplicate `hooks/use-toast.ts`

**Added missing dependency:**
- [x] `@radix-ui/react-visually-hidden` — used in `CommandPalette.tsx` but was missing from `package.json`

**Result:** Production deps went from **50 → 13**. CSS reduced from 27.44 KB → 24.01 KB. Only 3 UI files remain (`dialog.tsx`, `hover-card.tsx`, `tooltip.tsx`).

### 4. ~~Broken Interactions~~ ✅ DONE

All 4 broken interactions have been fixed:

**README.md navigation links:**
- [x] The "→ AboutMe.ts", "→ skills.json", "→ Projects.jsx", "→ ContactForm.tsx" links now have `onClick` handlers that navigate to the correct file
- [x] Added `role="button"`, `tabIndex`, `onKeyDown` for keyboard accessibility
- [x] Added hover color transition for visual feedback
- [x] Created `NavigationContext` to allow any child component to trigger file navigation

**Command Palette actions:**
- [x] "Toggle Terminal" (`Ctrl+\``) now actually toggles the terminal panel
- [x] "Toggle Sidebar" (`Ctrl+B`) now actually toggles the sidebar
- [x] "Download Resume" now opens your GitHub profile (update with actual resume URL later)
- [x] All actions properly close the palette after executing

**Project card buttons:**
- [x] "View Demo" and "Source" are now real `<a>` links using `project.liveLink` and `project.githubLink` from the server data
- [x] Buttons conditionally render based on whether the project has a link
- [x] Shows "Links coming soon" fallback if neither URL exists
- [x] Fixed placeholder GitHub usernames in `server/data/projects.js` → `Yadav-Anurag24`

**ActivityBar panels:**
- [x] Clicking an ActivityBar icon now toggles the sidebar (click again to close)
- [x] **Search panel** — shows a search input with placeholder UI
- [x] **Source Control panel** — shows mock git changes and current branch
- [x] **Extensions panel** — shows installed extensions list (One Dark Pro, Prettier, ESLint, Tailwind CSS)

---

## PART B — Features That Will Make You Stand Out

### 5. ~~Real Interactive Terminal with Portfolio Commands~~ ✅ DONE

Terminal expanded from 11 to 19 commands with rich interactive features:

- [x] `cat resume.pdf` → Downloads resume (triggers file download from /public/)
- [x] `ls projects/` → Lists all projects in a styled tree format with tech stacks & statuses
- [x] `open <project-name>` → Shows project details and opens GitHub repo (supports shortcuts: `parking`, `hpcl`, `bookstore`)
- [x] `neofetch` → ASCII art system-info card showing tech stack, location, shell, DE, etc.
- [x] `history` → Shows numbered command history
- [x] `sudo hire-me` → Easter egg with "ACCESS GRANTED" box art and contact details
- [x] `matrix` → Full Matrix-style green rain animation on a canvas overlay (exit by pressing any key or clicking)
- [x] `banner` → ASCII art name banner (bonus command)
- [x] **Tab-autocomplete** for all commands with ghost-text hint
- [x] **Ctrl+L** shortcut to clear terminal
- [x] New `ascii` log type with keyword-colored styling for ASCII art blocks
- [x] Command history moved to context (shared state, accessible via `history` command)
- [x] Terminal default height increased from 150px → 200px for better readability

### 6. ~~Real-time "Git Activity" Panel~~ ✅ DONE

The Source Control sidebar panel now fetches real data from the GitHub API:

- [x] Fetches public events from `api.github.com/users/Yadav-Anurag24/events/public` (up to 100 events)
- [x] **Contribution heatmap** — 16-week grid of colored squares (VS Code theme green: `syntax-string`) with day/month labels, intensity legend, and hover tooltips showing date + event count
- [x] **Recent Commits** — grouped by repository, showing commit message, short SHA, and relative time; animated entry with Framer Motion
- [x] **Activity Feed** — non-commit events (PRs, issues, stars, forks, branch creation) with emoji icons and descriptions
- [x] **Branch indicator** showing `main` with last-fetched timestamp
- [x] **Refresh button** with spin animation during loading
- [x] **External link** to open full GitHub profile
- [x] Loading skeleton with pulse animation, error state with retry button, and empty state fallback
- [x] Replaced the old inline mock git panel (hardcoded "M README.md" / "U skills.json") with the real component

### 7. ~~Extensions Panel with Tech Stack~~ ✅ DONE

The Extensions sidebar panel now renders the full tech stack as "installed extensions":

- [x] **18 extensions** across 6 categories (Languages, Frontend, Backend, DevOps, Tools, Themes) — each with emoji icon, colored background, publisher, description, star rating, and experience duration
- [x] **Star ratings** (1-5 filled stars) represent proficiency level; "installs" column shows years of experience
- [x] **Searchable** — live filter across name, publisher, description, category, and tags
- [x] **Category tabs** — filter by All, Languages, Frontend, Backend, DevOps, Tools, Themes with item counts
- [x] **Detail view** — clicking any extension opens a full detail page mimicking VS Code's extension detail UI with: large icon, publisher, star rating, "Installed" badge, experience/version/category/proficiency grid, long description, and tag chips
- [x] Back-navigation from detail → list with animated transitions (Framer Motion)
- [x] Replaced old inline mock extensions panel (4 hardcoded items) with the real component

### 8. Search Panel with Full-Text Search ✅ DONE

When clicking Search:

- [x] Let visitors search across all content (projects, skills, about me)
- [x] Show results in VS Code's search results format with file name, line number, and highlighted matches

**What was done:**
- Created `SearchPanel.tsx` component with VS Code-style full-text search UI
- Built a static searchable index across all 5 content files (README.md, AboutMe.ts, skills.json, Projects.jsx, ContactForm.tsx) with file paths and line numbers
- Search results grouped by file with collapsible file headers, line numbers, and highlighted match text
- Match highlighting uses VS Code's orange/amber highlight style (`#613214` bg, `#e8b06e` text)
- Toggle buttons for **Case Sensitive**, **Whole Word**, and **Regex** search modes
- Real-time search as-you-type with 2-character minimum threshold
- Results count summary ("X results in Y files")
- Each result is clickable — navigates to the matching file via `NavigationContext`
- Empty state with search suggestions ("Try: react, nodejs, backend")
- Replaced inline mock search panel in `CodeEditorLayout.tsx` with the real component

### 9. VS Code Settings Panel ✅ DONE

Add a gear icon or `Ctrl+,` shortcut to open a settings panel where visitors can:

- [x] **Switch themes** — One Dark Pro, Dracula, Monokai, GitHub Light, Solarized
- [x] **Change font size**
- [x] **Toggle minimap**
- [x] **Toggle line numbers**
- [x] Persist preferences in `localStorage`

**What was done:**
- Created `SettingsContext.tsx` with 5 complete theme definitions (One Dark Pro, Dracula, Monokai, GitHub Light, Solarized Dark), each with 40+ CSS custom properties for full theme coverage
- Created `SettingsPanel.tsx` — VS Code-style settings UI with:
  - Search/filter for settings
  - Collapsible **Appearance** section with theme picker featuring mini code previews with real syntax colors, dark/light badge, active check mark
  - Collapsible **Editor** section with font size +/- controls (10-24px range), minimap toggle, line numbers toggle
  - Active Configuration summary at bottom showing JSON-formatted current settings
  - Reset all button
- Added **gear icon** to ActivityBar bottom (replacing Account), with active indicator and tooltip
- Added **Ctrl+,** keyboard shortcut to toggle settings panel
- Added **"Open Settings" command** in Command Palette
- Wired font size into `EditorContent.tsx` via inline style
- Wired line numbers toggle into `EditorContent.tsx` — conditionally renders `LineNumbers`
- Theme switching applies instantly via CSS custom properties on `:root`
- All preferences persisted to `localStorage` under `portfolio-settings` key
- Wrapped app with `SettingsProvider` in `CodeEditorLayout.tsx`

### 10. Minimap ✅ DONE

- [x] Add a VS Code-style minimap on the right side of the editor content — a scaled-down, abstract representation of the content that visitors can click to navigate

**What was done:**
- Created `Minimap.tsx` component with a full abstract code representation for each file (README.md, AboutMe.ts, skills.json, Projects.jsx, ContactForm.tsx)
- Each minimap line is composed of colored segments using the current theme's syntax highlighting CSS variables (keyword, function, string, variable, property, comment, number, tag)
- **Viewport indicator** — a translucent slider shows which portion of the content is currently visible, updates in real-time on scroll
- **Click-to-navigate** — clicking anywhere on the minimap smooth-scrolls the editor content to that position
- **Drag support** — the viewport indicator can be dragged up/down to scrub through the content
- Integrated into `EditorContent.tsx` to the right of the content area, gated by `settings.showMinimap` from SettingsContext
- Uses a ref on the scroll container to sync scroll position bidirectionally
- Hidden on mobile (`hidden md:flex`) to save screen space
- 60px wide with 3px line height, matching VS Code's minimap proportions

### 11. "Problems" Tab in Terminal ✅ DONE

Add a "Problems" tab alongside the Terminal:

- [x] Show mock lint warnings/errors that are actually fun facts
- [x] e.g., `⚠ Warning: developer.coffeeLevel is LOW (line 42)` or `✓ 0 errors in portfolio — ready for production`

**What was done:**
- Added **PROBLEMS** tab as the first tab in the terminal panel (alongside TERMINAL, OUTPUT, DEBUG CONSOLE)
- Created `ProblemsPanel` component with 10 humorous mock lint/type-check problems:
  - 2 errors: `Cannot find module "free-time"`, `Type 'procrastination' not assignable to 'Productivity'`
  - 4 warnings: `developer.coffeeLevel is LOW`, `'sleep' declared but never used`, `Promise<Deadline> may reject`, `Variable 'weekendPlans' overwritten by 'bugs'`, `Deprecated: Array<Excuses>`
  - 3 info: `Consider upgrading motivation to v2.0`, `portfolio.quality exceeds threshold`, `Tip: Run "sudo hire-me"`
- Each problem shows severity icon (color-coded), message, source tag (e.g. `eslint(caffeine-check)`, `typescript(2307)`), and file location
- **Filter bar** with buttons to filter by All, Errors, Warnings, Info — each with live counts
- **Summary footer** with green checkmark: "✓ 0 real errors in portfolio — ready for production"
- PROBLEMS tab header shows **error/warning count badges** with colored icons
- OUTPUT and DEBUG CONSOLE tabs now show a friendly placeholder message
- Updated **StatusBar** to show `2 errors` and `4 warnings` counts (matching the mock problems data) with proper icons

### 12. ~~File Tab Preview with Peek Definition~~ ✅ DONE

- [x] When clicking certain keywords in content (like a tech name in Stack), show a "Peek Definition" popup mimicking VS Code's peek feature — showing a snippet about that technology and experience with it

**What was done:**
- Created `PeekDefinition.tsx` component with a full VS Code–style Peek Definition system
- **27 peek definitions** covering all skills: Languages (TypeScript, JavaScript, Python, Java), Frontend (React, React Native, Angular, Ionic), Backend (Node.js, Express, NestJS), Databases (MongoDB, PostgreSQL, Redis), Cloud/DevOps (AWS, Docker, Kubernetes), Tools (Git, VS Code, Postman), Learning items (AWS SA cert, Cloud Computing, System Design), and Concepts (Backend Development, Cloud Architecture, DevOps, API Development)
- Each definition is a **creative TypeScript-style type definition** describing proficiency, features, and projects — e.g., `declare module "react" { interface Skills { hooks: "useState" | "useEffect" | ... } }`
- **PeekPanel** mimics VS Code's peek definition: blue left accent border, file path header with close button, syntax-highlighted code body with line numbers, summary footer
- **Simple syntax highlighter** tokenizes definition code with proper coloring for keywords, strings, comments, properties, and numbers
- **PeekableKeyword** component for inline keywords (used in ReadmeContent) with dotted underline and click-to-peek
- **StackContent** — all 21 skill entries across dependencies, devDependencies, and learning are peekable. Clicking a skill name opens the peek definition inline below the line (pushes content down like VS Code). Added hint comment: `// 💡 Click any dependency to peek its definition`
- **ReadmeContent** — inline tech keywords (Node.js, Express, React Native, Ionic/Angular) are peekable with PeekableKeyword component, peek panel renders below the paragraph
- **PeekProvider** wraps editor content in `EditorContent.tsx`, resets active peek on file change
- **Escape key** closes the active peek panel
- **Alias system** maps keyword variations (e.g., "Node.js" → "node", "AWS" → "aws-sdk", "k8s" → "kubernetes")
- Theme-aware styling using CSS custom properties — works across all 5 themes

### 13. ~~Notification System (Bottom-Right Toasts)~~ ✅ DONE

VS Code shows notifications in the bottom-right. Use this pattern for:

- [x] "Welcome! Try `Ctrl+K` to open Command Palette" on first visit
- [x] "New project added!" when viewing projects
- [x] "Message sent successfully!" after contact form submission

**What was done:**
- Created `NotificationContext.tsx` with a full notification system:
  - `NotificationProvider` wraps the app with a fixed bottom-right toast stack (z-100)
  - `notify()` function accepts type (info/success/warning), title, message, custom icon, duration, and optional action buttons
  - Toast animations via Framer Motion — slides in from right with spring physics, animated countdown progress bar
  - Each toast auto-dismisses after configurable duration (default 6s), or can be manually closed
  - Theme-aware styling using CSS custom properties — accent color border, tinted background per type
- **Welcome notifications** (first visit only, tracked via `sessionStorage`):
  - 1.5s: "Welcome to my Portfolio!" with Rocket icon + "Got it!" action button (8s duration)
  - 4.5s: "Try the Terminal" with Terminal icon — hints Ctrl+` and `help` command
  - 10s: "Keyboard Shortcuts" with Keyboard icon — hints Ctrl+B and Ctrl+,
- **Project notification**: "Projects Loaded" toast when projects are fetched from server (once per session)
- **Contact form notifications**: "Message Sent!" success toast on form submit, or "Failed to Send" warning toast on error
- **Bell icon** added to StatusBar (between Terminal toggle and social links) — clicking shows "No New Notifications" toast
- `NotificationProvider` wraps the app in `CodeEditorLayout.tsx` outside TerminalProvider
- Pre-built hook helpers: `useWelcomeNotification`, `useProjectNotification`, `useContactNotification`, `useBellNotification`

### 14. ~~Typing Animation for Active File~~ ✅ DONE

- [x] When opening a file for the first time, animate the content appearing character by character (like a typewriter) — like code is being "written" in real-time
- [x] After it completes, the content stays static
- [x] Only trigger on first view, tracked via `sessionStorage`

**What was done:**
- Created `TypingReveal.tsx` component that wraps any content with a progressive line-by-line reveal animation
- Simulates code being "typed" at ~120 characters/second (~375ms per line), using `max-height` transition with `overflow: hidden`
- **Blinking cursor** at the reveal edge (foreground color, pulsing) — positioned precisely at the bottom of visible content
- Uses `ResizeObserver` to accurately measure content height after render
- **Click to skip** — clicking anywhere on the content instantly reveals everything, with a subtle "click to skip" hint in the corner
- Tracked via `sessionStorage` with prefix `portfolio-typed-{fileName}` — only animates on first view per session, subsequent visits render instantly (zero overhead — early return with no wrapper div)
- Wrapped all 5 content components in `EditorContent.tsx`: README.md, Projects.jsx, skills.json, ContactForm.tsx, AboutMe.ts

### 15. ~~Interactive Resume as a `.pdf` Preview Tab~~ ✅ DONE

- [x] Add a `resume.pdf` file in the explorer
- [x] When clicked, show a VS Code-style PDF preview tab with actual resume rendered, plus a download button

**What was done:**
- Created `ResumeContent.tsx` — a VS Code-style PDF preview rendering the full resume as an interactive styled document
- **Toolbar** at top with "Preview" badge, "Open" external link (opens real PDF in new tab), and "Download" button (triggers `Anurag_Kumar_Resume.pdf` download from `/public/`)
- **Resume document** styled as a paper-like card with:
  - Header with name, title, contact info (email, GitHub, LinkedIn, location) with clickable links
  - Summary section
  - Technical Skills grid (Languages, Frontend, Backend, Databases, DevOps, Tools)
  - Projects section (Smart Parking Finder, HPCL Dealer App, Bookstore Auth System) with tech stacks and bullet points
  - Education section with Cloud Computing specialization
  - Certifications & Learning section (AWS SA, System Design, Cloud Computing)
  - Footer with generation date
- **File Explorer** — added `resume.pdf` entry at root level with red `FileType` icon
- **Editor Tabs** — added `pdf` extension icon support (red `FileType`)
- **Breadcrumbs** — added `resume.pdf` path mapping
- **Command Palette** — added `resume.pdf` to file search, added "Open Resume Preview" command, changed "Download Resume (PDF)" to actually trigger file download
- **EditorContent** — added `resume.pdf` case (no TypingReveal wrapper — renders immediately)
- **CodeEditorLayout** — added `resume.pdf` path mapping
- Theme-aware — all colors use CSS custom properties, works across all 5 themes

---

## PART C — Performance & Technical Excellence

### 16. ~~Lazy Load Content Components~~ ✅ DONE

- [x] Wrap each content component (`AboutMeContent`, `ProjectsContent`, etc.) in `React.lazy()` + `Suspense` with a code-loading skeleton animation

**What was done:**
- Converted all 6 content components to `React.lazy()` dynamic imports in `EditorContent.tsx`:
  - `ReadmeContent`, `ProjectsContent`, `StackContent`, `ContactContent`, `AboutMeContent`, `ResumeContent`
- Created `CodeLoadingSkeleton.tsx` — a VS Code–style code-loading skeleton used as the `Suspense` fallback:
  - 20 skeleton code lines with staggered fade-in animation, each with a line number gutter
  - Skeleton tokens use actual theme syntax colors (`--syntax-keyword`, `--syntax-string`, `--syntax-property`, `--syntax-comment`, `--syntax-variable`) at low opacity to mimic real code structure
  - Animated progress bar at the bottom with "Loading…" label
  - Blank lines interspersed to simulate real code formatting
- Wrapped content area in `<Suspense fallback={<CodeLoadingSkeleton />}>` in `EditorContent.tsx`
- **Build result:** Each content component is now a separate chunk. Main bundle reduced from **573 KB → 525 KB** (−48 KB). 6 lazy chunks total (~52 KB combined, loaded on demand)
- Initial page load only fetches the active file's content, other files load on navigation

### 17. Add Error Boundaries

- [x] Wrap content sections in error boundaries with a VS Code-styled error page (mimicking the "Something went wrong" screen)

**What was done:**
- Created `EditorErrorBoundary.tsx` — a React class component (required for `getDerivedStateFromError`) styled as VS Code's "Something went wrong" crash screen:
  - Red `AlertCircle` icon in a tinted circle
  - Error title and file name badge showing which file failed
  - Error message box with `Terminal`-style header, "Copy" button, and collapsible stack trace
  - Two action buttons: "Reload File" (resets boundary state) and "Reload Window" (full page reload)
  - Footer hint with console shortcut key
  - Fully themed using CSS custom properties — adapts to all 5 themes
- Wired into `EditorContent.tsx` — wraps the `<Suspense>` + `<AnimatePresence>` block per file (`key={activeFile}` so switching files resets the boundary)
- Build verified: 0 TS errors, production build passes (530 KB main / 165 KB gzip)

### 18. Preload Fonts Properly

- [x] Move Google Font from CSS `@import` in `index.css` to `<link rel="preconnect">` + `<link rel="preload">` in HTML with `font-display: swap`

**What was done:**
- Font loading was already migrated from CSS `@import` to HTML `<link>` tags during Part A fixes. This pass optimized the setup further:
  - **Trimmed unused font weights:** Removed weight 300 (light) — not used anywhere in the codebase. Reduced Fira Code from 5 weights (300–700) to 2 (400, 500) since bold/semibold are never applied to monospace elements. Reduced Inter from 5 to 4 weights (400, 500, 600, 700). Total: **10 font files → 6 font files** (~40% fewer network requests)
  - **Added `crossorigin` attribute** to the `<link rel="preload">` tag (required for CORS font resources to avoid double-fetching)
  - Kept the non-blocking `media="print" onload="this.media='all'"` swap pattern with `<noscript>` fallback
  - `display=swap` in Google Fonts URL ensures text is visible immediately with system fallback while fonts load

### 19. Add PWA Support

- [ ] _(Skipped — will revisit if needed)_

### 20. Server Security Hardening

- [x] Add `helmet.js` for security headers
- [x] Add `express-rate-limit` on `/api/contact` (prevent spam)
- [x] Restrict CORS to actual frontend domain
- [x] Sanitize contact form inputs (prevent XSS/injection)
- [x] Add `.env.example` documenting required environment variables
- [x] Move `mongoose` and `dotenv` from root `package.json` to `server/package.json`

**What was done:**
- **`helmet.js`** — added as first middleware; sets 15+ secure HTTP headers (X-Content-Type-Options, Strict-Transport-Security, X-Frame-Options, etc.)
- **`express-rate-limit`** — two tiers:
  - Global: 200 requests / 15 min window (generous for portfolio browsing)
  - Contact endpoint: 5 submissions / hour per IP (strict anti-spam)
- **CORS restriction** — `cors({ origin })` with allowlist from `CORS_ORIGINS` env var (defaults to Vite dev/preview ports). Only `GET` and `POST` methods allowed.
- **`express-mongo-sanitize`** — strips `$` and `.` operators from user input to prevent NoSQL injection attacks
- **Input sanitization in `contactController.js`** — `sanitizeString()` strips HTML tags and angle brackets; email format validation via regex; length limits enforced (name: 100, email: 254, subject: 200, message: 5000)
- **Mongoose schema hardened** — `maxlength` and `trim` constraints added to all Contact model fields
- **Body parser limits** — `express.json({ limit: '16kb' })` prevents oversized payloads
- **`.env.example`** — created at `server/.env.example` documenting all 5 environment variables: `MONGO_URI`, `PORT`, `CORS_ORIGINS`, `EMAIL_USER`/`EMAIL_PASS`, `GITHUB_TOKEN`
- **Dependencies already in correct location** — `mongoose` and `dotenv` were already in `server/package.json` (moved during Part A #3 bundle cleanup)
- All 3 modified files pass syntax check; client build unaffected

---

## PART D — Polish & Professionalism

### 21. Accessibility (a11y)

- [x] Add `role="button"`, `tabIndex`, and `onKeyDown` to all interactive `<div>` elements
- [x] Add proper ARIA labels to Activity Bar, File Explorer, and Tab bar
- [x] Implement focus management when switching tabs or opening Command Palette

**What was done:**
- **ActivityBar** — converted outer `<div>` to `<nav aria-label="Activity Bar">`, added `role="toolbar" aria-orientation="vertical"` to icon group, added `aria-label` and `aria-pressed` to all 5 panel buttons
- **FileExplorer** — added `role="tree" aria-label="File explorer"` to tree container; folder items now have `role="treeitem"`, `tabIndex={0}`, `aria-expanded`, `aria-label`, and `onKeyDown` (Enter/Space); file items now have `role="treeitem"`, `tabIndex={0}`, `aria-selected`, `aria-label`, and `onKeyDown`
- **EditorTabs** — added `role="tablist" aria-label="Open editors"` to tab container; each tab now has `role="tab"`, `aria-selected`, `aria-label`, `tabIndex` (0 for active, -1 for inactive), and `onKeyDown`; close buttons have `aria-label="Close {filename}"`
- **StatusBar** — changed outer `<div>` to `<footer role="status" aria-label="Editor status bar">`; git branch, errors, warnings get descriptive `aria-label`; status text items get `aria-label`; social links use `aria-label` instead of `title`; decorative icons get `aria-hidden="true"`
- **Breadcrumbs** — changed outer `<div>` to `<nav aria-label="Breadcrumb">`; last breadcrumb segment gets `aria-current="page"`; chevron separators get `aria-hidden="true"`
- **CommandPalette** — search input gets `aria-label`, `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`; results container gets `id` and `role="listbox"`
- **CodeEditorLayout** — added "Skip to editor content" link (`sr-only` visible on focus); main editor area gets `id="editor-content"` and `aria-label="Editor: {activeFile}"`
- Build verified: 0 TS errors, production build passes (532 KB main / 166 KB gzip)

### 22. Custom 404 Page in VS Code Style

- [ ] Make the 404 page look like VS Code's "No editor is open" screen, or a file-not-found error with a suggestion to run `code --help`

### 23. Visitor Analytics Panel

- [ ] Add a mock "Output" tab in the terminal area that shows real-time visitor stats
- [ ] Display it like VS Code's Output channel — `[visitor-log]` with timestamps

### 24. Expanded Command Palette

Expand the Command Palette significantly:

- [x] "Change Theme" → Opens theme picker
- [x] "Open File: Resume.pdf" → Opens resume tab
- [x] "Run: Download Resume" → Downloads PDF
- [x] "Git: View Contributions" → Shows GitHub activity
- [x] "Terminal: Clear" → Clears terminal
- [x] "View: Toggle Minimap"

**What was done:**
- Expanded from **6 commands → 17 commands** organized into 6 categories: File, View, Preferences, Git, Terminal, Run
- Each command now has its own **category label** and **contextual icon** (Lucide) instead of generic ArrowRight
- New commands added:
  - **File:** Open README.md, Open Projects.jsx, Open ContactForm.tsx (quick file access)
  - **View:** Toggle Minimap, Toggle Line Numbers, Explorer Panel, Extensions Panel
  - **Preferences:** Change Theme (opens Settings panel)
  - **Git:** View Contributions (opens Git Activity panel)
  - **Terminal:** Clear (clears terminal logs), New Terminal
  - **Run:** Download Resume (PDF)
- Category headers appear as VS Code-style uppercase section dividers
- "Recently Opened" section only shown when no search query (cleaner UX)
- Wired 5 new callback props into `CodeEditorLayout`: `onOpenPanel`, `onClearTerminal`, `onToggleMinimap`, `onToggleLineNumbers`, `onChangeTheme`
- All items searchable by name — typing "minimap" finds "View: Toggle Minimap", "git" finds "Git: View Contributions", etc.
- Build verified: 0 TS errors, production build passes (535 KB main / 167 KB gzip)

### 25. Multi-cursor / Selection Easter Egg

- [ ] When a visitor triple-clicks or does `Ctrl+D` on text in content, simulate VS Code's multi-cursor with a subtle visual cue

### 26. "Debug Console" Easter Egg

- [ ] Add a "Run and Debug" option in the Activity Bar
- [ ] When clicked, show a mock debug session that "debugs" your career — stepping through experience timeline with breakpoints at career milestones

---

## Priority Implementation Order

| Priority | Items | Impact |
|---|---|---|
| **P0 — Ship blockers** | SEO fix (#1), Placeholder content (#2), Broken interactions (#4) | Without these, the portfolio hurts more than helps |
| **P1 — High impact** | Bundle cleanup (#3), Theme switcher (#9), Terminal upgrades (#5), Extensions panel (#7) | Differentiators that show engineering depth |
| **P2 — Impressive** | Git Activity (#6), Search panel (#8), Minimap (#10), PWA (#19), Problems tab (#11) | Features that make people say "wow" |
| **P3 — Delight** | Typing animation (#14), Peek Definition (#12), Notifications (#13), Easter eggs (#25, #26) | Memorable touches that get shared |

---

> **Verdict:** The VS Code theme is already one of the most creative portfolio concepts out there — the fidelity is impressive. The gap is between "cool prototype" and "polished product." Fixing the P0 items and adding 3-4 features from P1/P2 would put this in the top tier of developer portfolios.
