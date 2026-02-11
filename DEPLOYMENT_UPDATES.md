# 🔄 AWS Update Guide: MERN Stack

**Author:** Anurag Kumar  
**Server IP:** `13.235.134.36`  
**Key File:** `portfolio-key.pem`

---

## 🛠️ Prerequisite: Push to GitHub

**Before touching the AWS server, ALWAYS save your changes to GitHub first.**

1. Open VS Code Terminal
2. Run these commands:

```bash
git add .
git commit -m "Description of your changes"
git push origin master
```

---

## 📂 Scenario 1: You Changed the Root Directory

**Examples:** Updated `.gitignore`, `README.md`, or added a new file in the main folder.

**The Goal:** Just sync the files. No restart needed.

### Steps:

1. **Login to AWS:**
   ```bash
   ssh -i "portfolio-key.pem" ubuntu@13.235.134.36
   ```

2. **Pull Changes:**
   ```bash
   cd portfolio
   git pull origin master
   ```

3. **Done!** (Unless you added a new package in the root `package.json`, then run `npm install`)

---

## 💻 Scenario 2: You Changed the Frontend (Client)

**Examples:** Edited `App.tsx`, changed colors in Tailwind, updated text in `About.tsx`.

**The Goal:** We must "re-build" the React app so the server has the new HTML/CSS/JS files.

### Steps:

1. **Login to AWS:**
   ```bash
   ssh -i "portfolio-key.pem" ubuntu@13.235.134.36
   ```

2. **Pull Changes:**
   ```bash
   cd portfolio
   git pull origin master
   ```

3. **Re-Install & Re-Build:**
   ```bash
   cd client
   npm install       # (Only needed if you added new libraries)
   npm run build
   ```
   *(Wait for "Build Complete" message)*

4. **No Restart Needed.** Nginx automatically serves the new files from the `dist` folder immediately.

---

## ⚙️ Scenario 3: You Changed the Backend (Server)

**Examples:** Added a new API route, changed database logic, updated `contactController.js`.

**The Goal:** We must restart the Node.js process so it loads the new code.

### Steps:

1. **Login to AWS:**
   ```bash
   ssh -i "portfolio-key.pem" ubuntu@13.235.134.36
   ```

2. **Pull Changes:**
   ```bash
   cd portfolio
   git pull origin master
   ```

3. **Install & Restart:**
   ```bash
   cd server
   npm install       # (Only needed if you added new libraries)
   pm2 restart all
   ```
   *(This command instantly reloads your backend with zero downtime)*

---

## 🚨 Scenario 4: You Changed Environment Variables (.env)

**Examples:** Changed MongoDB password, added a new API Key, updated Email credentials.

**The Goal:** Update the hidden secrets file on the server.

### Steps:

1. **Login to AWS:**
   ```bash
   ssh -i "portfolio-key.pem" ubuntu@13.235.134.36
   ```

2. **Edit the File:**
   ```bash
   cd portfolio/server
   nano .env
   ```

3. **Update Variables:**
   - Use arrow keys to navigate
   - Delete old values / Paste new ones
   - Save: `Ctrl + X`, then `Y`, then `Enter`

4. **Restart Backend:**
   ```bash
   pm2 restart all
   ```

---

## 🛑 Scenario 5: "Emergency! It Broke!"

**If your site goes down after an update.**

### Troubleshooting Steps:

1. **Check Backend Status:**
   ```bash
   pm2 list
   ```
   *(Look for "online" status. If it says "error" or "stopped", proceed to step 2)*

2. **Read the Logs:**
   ```bash
   pm2 logs
   ```
   *(This shows you exactly why it crashed, usually a missing library or syntax error)*

3. **Check Nginx (Frontend issues):**
   ```bash
   sudo tail -n 20 /var/log/nginx/error.log
   ```

---

## 💡 Pro Tips

**Chain commands together to save time!**

### Frontend Update One-Liner:
```bash
cd portfolio && git pull origin master && cd client && npm run build
```

### Backend Update One-Liner:
```bash
cd portfolio && git pull origin master && cd server && pm2 restart all
```

---

*Last Updated: February 11, 2026*
