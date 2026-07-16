# priyanshu.dev — Full Stack Portfolio

🔗 **Live Demo:** [priyanshu-dev-dun.vercel.app](https://priyanshu-dev-dun.vercel.app/)

A full-stack MERN portfolio built to showcase real projects, live coding stats, and a working
contact pipeline — not just a static page. Frontend is React (Vite), backend is Express + MongoDB.

**Live sections:** Hero, About, Projects (fetched from MongoDB), Skills, GitHub Analytics (self-hosted
stats), LeetCode Stats (live), Timeline, Certificates, Contact (working email form), Resume (embedded PDF).

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React (Vite), Tailwind CSS, Framer Motion |
| Backend | Node.js, Express |
| Database | MongoDB (Atlas) |
| Email | Nodemailer (Gmail App Password) |
| Hosting (planned) | Frontend → Vercel/Netlify · Backend → Render/Railway |

---

## Project Structure

```
portfolio/
├── backend/
│   ├── config/          # db.js, seed.js
│   ├── controllers/      # projectController.js, contactController.js
│   ├── middleware/       # validateContact.js, errorHandler.js
│   ├── models/           # Project.js, Contact.js
│   ├── routes/           # projectRoutes.js, contactRoutes.js
│   ├── public/uploads/    # project thumbnail images (static, committed to git)
│   ├── server.js
│   └── .env.example
│
└── frontend/
    ├── public/
    │   ├── certificates/   # static certificate files
    │   └── resume.pdf
    ├── src/
    │   ├── components/    # Hero, About, Projects, Skills, Timeline, Contact, Nav, etc.
    │   ├── data/           # certificates.js (static local data)
    │   ├── App.jsx
    │   └── main.jsx
    └── .env.example
```

---

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # fill in real values, see below
npm run seed             # populates MongoDB with project data
npm run dev               # starts on http://localhost:5000
```

### Backend `.env` values

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Default `5000` |
| `NODE_ENV` | `development` or `production` |
| `CLIENT_URL` | Frontend origin, e.g. `http://localhost:3000` — **must match your actual frontend dev port** for CORS to work |
| `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_TO` | Gmail address + App Password (not your real password) for the contact form |
| `CONTACT_RATE_LIMIT_MAX` | Max contact form submissions per IP per 15 min (default `5`) |

### Adding/updating project images
No upload API — images are static files:
1. Drop image into `backend/public/uploads/`
2. Reference the filename in `backend/config/seed.js` (`thumbnail: '/uploads/yourfile.png'`)
3. Re-run `npm run seed`

**Note:** free-tier hosts (Render/Railway) wipe the filesystem on redeploy — commit images to git
rather than relying on them persisting after upload.

### Backend API Reference

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | All projects, sorted (featured first, then `order`) |
| GET | `/api/projects/:id` | Single project by MongoDB ObjectId |
| POST | `/api/contact` | Submit contact form — validated, rate-limited, saves to DB, emails you |

**`POST /api/contact` body:**
```json
{ "name": "string", "email": "string", "message": "string (10-2000 chars)" }
```

**Response codes:** `201` success · `400` validation error (`errors[]` array) · `429` rate limited

---

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_BASE_URL
npm run dev
```

### Frontend `.env`

```
VITE_API_BASE_URL=http://localhost:5000
```

Update this to your deployed backend URL once hosted (e.g. `https://your-app.onrender.com`).

### Adding certificates
No backend involved — fully static:
1. Drop certificate file (PDF/image) into `frontend/public/certificates/`
2. Add an entry to `frontend/src/data/certificates.js`:
   ```js
   { title: "...", issuer: "...", date: "...", fileName: "your-file.pdf" }
   ```

### Adding your resume
Drop `resume.pdf` (lowercase, exact match) into `frontend/public/`. Filesystems are case-sensitive
on most deployment platforms even if your local machine isn't — keep the filename lowercase to avoid
it breaking silently after deploy.

---

## Live Data Sources (external, free tier)

| Feature | Source | Notes |
|---|---|---|
| GitHub Stats + Top Languages | Self-hosted `github-readme-stats` fork on Vercel | Deployed separately; needs a `PAT_1` GitHub token env var |
| LeetCode Stats | `leetcode-stats.tashif.codes/{username}` | Actively maintained public API |

GitHub Streak stats were evaluated and intentionally dropped — the available fork didn't support the
`/api/streak/` route, and a third separate deployment wasn't worth it for one card.

---

## Deployment

| Service | URL | Status |
|---|---|---|
| Frontend | *not yet deployed* | ⏳ |
| Backend | *not yet deployed* | ⏳ |

Once deployed, update:
- Backend `.env` → `CLIENT_URL=<your-deployed-frontend-url>`
- Frontend `.env` → `VITE_API_BASE_URL=<your-deployed-backend-url>`

---

## Running Both Locally

Two terminals, both running simultaneously:

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Confirm the connection: open the deployed/running frontend, go to the Projects section — it should
show real data fetched from your backend, not the offline fallback banner. If you see the fallback,
check the browser DevTools Network tab for the failed request (usually a CORS mismatch between
`CLIENT_URL` in the backend `.env` and the frontend's actual dev server port).

---

## Known Trade-offs / Decisions

- **No image upload API** — screenshots/thumbnails are added manually to keep the backend simple, since
  portfolio content changes rarely.
- **No screenshot carousel** — each project shows a single thumbnail; multi-image galleries were
  considered and dropped as unnecessary complexity for the current project set.
- **Local-storage images assume git-committed files** — not meant to survive redeploys on ephemeral
  filesystems unless committed.
- **GitHub/LeetCode stat cards depend on third-party free services** — acceptable risk for a portfolio;
  each has a graceful fallback (text link) if the service goes down.

---

## Author

**Priyanshu Gangwar**
B.Tech CSE, DIT University (Expected May 2027) · Dehradun, India
[GitHub](https://github.com/Priyanshu-1705) · [LinkedIn](https://linkedin.com/in/priyanshu-gangwar-746520295)
