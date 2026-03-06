<div align="center">

# 💻 VS Code Portfolio

### An interactive, VS Code-themed developer portfolio

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=white)](https://render.com/)

Instead of a typical scrolling website, visitors explore the portfolio like a code editor — with a file explorer, tabbed editor, integrated terminal, sidebar panels, and more.

[Live Demo](https://anurag-portfolio-tau.vercel.app/) · [Report Bug](https://github.com/Yadav-Anurag24/portfolio-master/issues)

</div>

---

## 📸 Preview

> _Screenshots coming soon_

---

## ✨ Features

### IDE Experience
- **File Explorer** — Expandable folder tree to navigate portfolio sections
- **Tabbed Editor** — Open multiple files simultaneously, click to switch
- **Syntax Highlighting** — Color-coded content mimicking real code
- **Line Numbers & Minimap** — Faithful IDE details on every page
- **Breadcrumb Navigation** — Always know where you are
- **Peek Definitions** — Hover over tech keywords for inline previews
- **Command Palette** — `Ctrl + K` to open and quickly jump anywhere

### Interactive Terminal
A fully functional terminal with **19+ commands**, tab autocomplete, command history navigation, and ghost-text hints:

| Command | Description |
|---------|-------------|
| `help` | List all available commands |
| `about` | Brief introduction |
| `skills` | Display technical skills |
| `projects` | List all projects |
| `contact` | Show contact information |
| `github` / `linkedin` | Open profile in a new tab |
| `cat resume.pdf` | Download resume PDF |
| `ls projects/` | Tree view of all projects |
| `open <project>` | Show detailed project info |
| `neofetch` | ASCII art system info |
| `matrix` | Matrix rain animation |
| `sudo hire-me` | Easter egg 🤫 |
| `echo`, `whoami`, `date`, `history`, `banner`, `clear` | Utility commands |

### Sidebar Panels
- **Search** — Full-text search across all portfolio content
- **Source Control** — Live GitHub activity feed with 16-week contribution heatmap, recent commits grouped by repository, and activity stream with emoji icons
- **Extensions** — Tech stack displayed as "installed extensions" with star-based proficiency ratings, searchable with category tabs (18+ technologies)
- **Settings** — Theme selector, font size control, toggle line numbers & minimap

### Content Sections
| File | Description |
|------|-------------|
| `README.md` | Portfolio intro with navigation links |
| `AboutMe.ts` | Profile info rendered as a TypeScript interface |
| `skills.json` | Tech stack as a JSON file with skill bars |
| `Projects.jsx` | Project cards fetched from the backend API |
| `ContactForm.tsx` | Contact form that submits to the server |
| `resume.pdf` | Resume preview with PDF download |

### Customization
Three built-in themes with settings persisted in `localStorage`:
- **One Dark Pro** (default)
- **Dracula**
- **Monokai**

### Other Highlights
- Smooth **Framer Motion** animations throughout
- **Mobile warning modal** recommending desktop for full experience
- **Error boundaries** and skeleton loading states
- Responsive layout with dedicated mobile header

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & transitions |
| Radix UI | Accessible dialog, tooltip, hover-card primitives |
| Lucide React | Icon library |
| React Router | Client-side routing |
| React Context | State management (Navigation, Settings, Terminal, Notifications) |
| Vitest | Unit testing |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js 20 | Runtime |
| Express 5 | HTTP framework |
| Mongoose | MongoDB ODM |
| Nodemailer | Contact form email notifications |
| Helmet | Secure HTTP headers |
| express-rate-limit | Rate limiting (200 req/15 min global, 5/hr for contact) |
| express-mongo-sanitize | NoSQL injection protection |
| CORS | Cross-origin request handling |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| MongoDB Atlas | Cloud database |
| Vercel | Frontend hosting & CDN |
| Render | Backend hosting |

---

## 📁 Project Structure

```
portfolio-master/
├── client/                         # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   ├── portfolio/          # Core IDE components
│   │   │   │   ├── ActivityBar.tsx
│   │   │   │   ├── CommandPalette.tsx
│   │   │   │   ├── EditorContent.tsx
│   │   │   │   ├── EditorTabs.tsx
│   │   │   │   ├── FileExplorer.tsx
│   │   │   │   ├── Terminal.tsx
│   │   │   │   ├── StatusBar.tsx
│   │   │   │   ├── SearchPanel.tsx
│   │   │   │   ├── GitActivityPanel.tsx
│   │   │   │   ├── ExtensionsPanel.tsx
│   │   │   │   ├── SettingsPanel.tsx
│   │   │   │   ├── Minimap.tsx
│   │   │   │   ├── ProfileWidget.tsx
│   │   │   │   └── content/        # Page content components
│   │   │   │       ├── AboutMeContent.tsx
│   │   │   │       ├── ContactContent.tsx
│   │   │   │       ├── ProjectsContent.tsx
│   │   │   │       ├── ReadmeContent.tsx
│   │   │   │       ├── ResumeContent.tsx
│   │   │   │       └── StackContent.tsx
│   │   │   └── ui/                 # Radix UI primitives
│   │   ├── contexts/               # React Context providers
│   │   ├── hooks/                  # Custom hooks
│   │   ├── lib/                    # Utilities & API config
│   │   └── pages/                  # Route pages
│   ├── public/                     # Static assets
│   └── package.json
│
├── server/                         # Express backend
│   ├── config/db.js                # MongoDB connection
│   ├── controllers/                # Route handlers
│   ├── models/                     # Mongoose schemas
│   ├── routes/                     # API route definitions
│   ├── data/projects.js            # Static fallback data
│   ├── seedProjects.js             # DB seed script
│   └── package.json
│
└── package.json                    # Root (concurrently for dev)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** or **yarn**
- **MongoDB Atlas** account _(optional — the server falls back to static data if unavailable)_

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yadav-Anurag24/portfolio-master.git
   cd portfolio-master
   ```

2. **Install all dependencies**
   ```bash
   # Root dependencies (concurrently)
   npm install

   # Client dependencies
   cd client && npm install

   # Server dependencies
   cd ../server && npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `server/` directory:
   ```env
   # Database (optional — omit to use static fallback data)
   MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/portfolio

   # Email notifications for contact form (optional)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password

   # GitHub token for higher API rate limits (optional)
   GITHUB_TOKEN=ghp_your_personal_access_token

   # Server port (optional, defaults to 5000)
   PORT=5000
   ```

   > **Gmail App Password:** Enable 2FA → Google Account → Security → App passwords → Generate a 16-character password.

4. **Seed the database** _(optional)_
   ```bash
   cd server
   node seedProjects.js
   ```

### Running

```bash
# From the root directory — starts both client and server
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend (Vite) | `http://localhost:5173` |
| Backend (Express) | `http://localhost:5000` |

Or run them separately:
```bash
# Terminal 1 — Backend (with hot reload via nodemon)
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

### Production Build

```bash
cd client
npm run build      # Outputs to client/dist/
npm run preview    # Preview the production build locally
```

---

## 🔌 API Reference

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | List all projects |
| `GET` | `/api/projects/:id` | Get a single project by ID |

### Contact

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submit contact form |

**Request body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "message": "I'd love to collaborate!"
}
```

### GitHub Activity

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/github/events` | Fetch public GitHub events (cached 10 min) |
| `GET` | `/api/github/commits` | Fetch recent commits |

---

## 🔒 Security

- **Helmet** — Secure HTTP headers (XSS protection, HSTS, etc.)
- **CORS** — Whitelisted frontend origins only
- **Rate Limiting** — 200 requests / 15 min (global), 5 submissions / hour (contact form)
- **Input Sanitization** — HTML tag stripping & email format validation
- **NoSQL Injection Protection** — `express-mongo-sanitize` strips `$` and `.` from user input
- **Graceful Fallback** — If MongoDB is unavailable, the server serves static data without crashing

---

## 📜 Available Scripts

### Root
| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `concurrently "npm run server" "npm run client"` | Run both services |
| `server` | `cd server && npm run dev` | Start backend |
| `client` | `cd client && npm run dev` | Start frontend |

### Client
| Script | Description |
|--------|-------------|
| `dev` | Start Vite dev server |
| `build` | Production build |
| `build:dev` | Development build with sourcemaps |
| `preview` | Preview production build |
| `lint` | Run ESLint |
| `test` | Run Vitest |

### Server
| Script | Description |
|--------|-------------|
| `dev` | Start with nodemon (hot reload) |
| `start` | Start with node (production) |

---

## 🌐 Deployment

The project is deployed using **Vercel** (frontend) and **Render** (backend):

- **Frontend** → Deployed on **Vercel** with automatic builds on push
- **Backend** → Deployed on **Render** as a Web Service

### Frontend (Vercel)
1. Connect Vercel to the GitHub repository
2. Set the **Root Directory** to `client`
3. Set the **Build Command** to `npm run build`
4. Set the **Output Directory** to `dist`
5. Pushes to `master` trigger automatic redeployments

### Backend (Render)
1. Create a new **Web Service** on Render
2. Set the **Root Directory** to `server`
3. Set the **Build Command** to `npm install`
4. Set the **Start Command** to `node server.js`
5. Add environment variables (`MONGO_URI`, `EMAIL_USER`, `EMAIL_PASS`, etc.) in the Render dashboard

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Anurag Kumar**

- GitHub: [@Yadav-Anurag24](https://github.com/Yadav-Anurag24)
- Portfolio: [Live Site](https://anurag-portfolio-tau.vercel.app/)

---

<div align="center">

⭐ Star this repo if you find it interesting!

</div>
