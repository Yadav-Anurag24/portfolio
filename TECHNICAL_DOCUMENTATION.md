**📂 Project: VS Code Portfolio (MERN Stack)**

**Author:** Anurag Kumar

**Architecture:** Monorepo (Client + Server)

**Theme:** Visual Studio Code IDE Simulation

**1\. Core Concept & Design**

The goal was to build a developer-centric portfolio that mimics the experience of using **Visual Studio Code**. instead of a traditional scrolling website, it offers an interactive "IDE" experience.

*   **Visual Style:** Dark Mode (Dracula/One Dark theme), Syntax Highlighting, File Explorer navigation.
*   **User Experience:** Users "open files" (About, Projects, Contact) to view content.
*   **Interactive Terminal:** A functional terminal at the bottom that logs user actions and system status real-time.

**2\. Tech Stack (The "MERN" Stack)**

**Frontend (Client)**

*   **Framework:** React (via Vite for speed)
*   **Styling:** Tailwind CSS (Utility-first styling)
*   **Animations:** Framer Motion (Smooth file opening/closing transitions)
*   **Icons:** Lucide React (VS Code style icons)
*   **State Management:** React Context API (TerminalContext) to manage the global terminal logs.

**Backend (Server)**

*   **Runtime:** Node.js
*   **Framework:** Express.js (REST API architecture)
*   **Security:** CORS (Cross-Origin Resource Sharing) to allow Frontend-Backend communication.
*   **Environment:** Dotenv (Managing API keys and Database URIs).

**Database**

*   **Database:** MongoDB Atlas (Cloud NoSQL Database).
*   **ODM:** Mongoose (Schema-based modeling for Node.js).

**3\. Architecture Breakdown**

**A. Directory Structure**

Plaintext

portfolio-master/

├── client/ # React Frontend

│ ├── src/

│ │ ├── components/ # UI Components (Sidebar, Editor, Terminal)

│ │ ├── contexts/ # Global State (TerminalContext)

│ │ └── pages/ # Content Pages (About, Projects)

│ └── vite.config.ts # Build configuration

│

├── server/ # Node.js Backend

│ ├── config/ # DB Connection (db.js)

│ ├── controllers/ # Logic Functions (getProjects, submitContact)

│ ├── models/ # Database Schemas (Project, Contact)

│ ├── routes/ # API Endpoints (projectRoutes, contactRoutes)

│ ├── .env # Secrets (MONGO\_URI)

│ └── server.js # Entry Point

│

└── package.json # Root dependencies

**4\. Development Log (From Scratch)**

**Phase 1: Frontend Construction**

1.  **Setup:** Initialized with npm create vite@latest.
2.  **Terminal Logic:** Created TerminalContext.tsx to allow any component to write logs to the bottom terminal (e.g., > Opening projects.tsx...).
3.  **Routing:** Instead of standard browser routing, we built a "Tab System" where clicking a file in the sidebar renders the corresponding component in the main "Editor" area.

**Phase 2: Backend API Setup**

1.  **Server Initialization:** Created the server/ folder and installed express, mongoose, cors, and dotenv.
2.  **MVC Pattern:** Adopted the **Model-View-Controller** pattern to keep code clean:
    *   **Routes:** Define _where_ the request goes (e.g., /api/projects).
    *   **Controllers:** Define _what_ happens (logic).
    *   **Models:** Define _how_ data looks.

**Phase 3: Database Integration (MongoDB)**

1.  **Cloud Setup:** Created a Cluster on MongoDB Atlas (AWS Mumbai Region).
2.  **Connection:** Connected via Mongoose using a secure MONGO\_URI.
3.  **Data Seeding:**
    *   Created a script (seeder.js) to upload your portfolio projects from a local file to the cloud database automatically.
    *   _Challenge:_ Encountered querySrv ECONNREFUSED (DNS Block).
    *   _Solution:_ Switched to the "Standard Connection String" (Long URL) to bypass network restrictions.

**Phase 4: "Contact Me" Feature**

1.  **Old Version:** The form only logged messages to the browser console (Data was lost on refresh).
2.  **New Version:**
    *   **Frontend:** Updated ContactContent.tsx to send a real POST request to /api/contact.
    *   **Backend:** Created contactModel.js and contactController.js.
    *   **Result:** Messages are now instantly saved to the contacts collection in MongoDB Atlas.

**5\. API Reference (How the App Talks)**

| Method | Endpoint | Description | Status |
| --- | --- | --- | --- |
| GET | /api/projects | Fetches all portfolio projects from DB | ✅ Active |
| POST | /api/contact | Saves a new message from the contact form | ✅ Active |

**6\. How to Restart the Project (Quick Start)**

If you come back to this project after 6 months, simply run these commands:

**Step 1: Start the Backend**

Bash

cd portfolio-master

\# Ensure .env is in server/ folder

npm run dev

\# Expected Output: "\[database\] MongoDB Connected"

**Step 2: Start the Frontend**

_(The concurrently script in package.json might handle both, but manual is safer for debugging)_

**Step 3: Verify Connections**

*   Open Browser: http://localhost:5173
*   Open API Test: http://localhost:5000/api/projects

**7\. Known Solutions to Common Errors**

*   **Error:** querySrv ECONNREFUSED
    *   **Fix:** Your network is blocking the short URL. Use the Long MongoDB Connection String (Node.js 2.2.12 version).
*   **Error:** Failed to load projects (500 Error)
    *   **Fix:** The backend is likely not running, or .env is missing from the server/ folder.
*   **Error:** Git SSL Certificate Problem
    *   **Fix:** Run git config --global http.sslVerify false temporarily.