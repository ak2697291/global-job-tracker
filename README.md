# Global Job Command Center (Excel-Backed Dashboard)

A zero-server, static web dashboard built with **HTML, CSS, and Vanilla JavaScript** for tracking international job applications across **10 target countries** (**Germany 🇩🇪, Netherlands 🇳🇱, USA 🇺🇸, Ireland 🇮🇪, Australia 🇦🇺, Switzerland 🇨🇭, United Kingdom 🇬🇧, Singapore 🇸🇬, UAE 🇦🇪, and Canada 🇨🇦**), powered by an **Excel workbook (`jobs_tracker.xlsx`)** as its backend.

---

## Folder Structure

- `index.html` — Dashboard layout, country strip, KPI cards, Table / Kanban / Country Strategy views, native `<dialog>` modals, and popover toast notifications.
- `styles.css` — Modern dark/light adaptive stylesheet (`color-scheme: light dark`, `light-dark()`, `:user-invalid`, `text-wrap: balance`).
- `app.js` — Client-side application controller with three Excel backend sync modes and a built-in zero-dependency OpenXML `.xlsx` parser/writer fallback.
- `jobs_tracker.xlsx` — Multi-sheet Excel backend containing:
  1. `Applications` — All tracked job applications across the 10 countries.
  2. `Country_Strategy` — Tiered visa pathways, resume format rules, salary benchmarks, and job portals per country.
  3. `Resume_Checklist` — Actionable resume and visa preparation items tailored to your **Java/Spring Boot** and **GenAI** resumes.
- `generate_tracker_excel.py` — Zero-dependency Python script to regenerate a fresh `jobs_tracker.xlsx` anytime (`python3 generate_tracker_excel.py`).

---

## How the Excel (`.xlsx`) Backend Works on GitHub Pages

Because GitHub Pages hosts static files, the dashboard offers **three seamless ways** to read and write your `jobs_tracker.xlsx` backend:

### Mode 1: Repo Fetch + 1-Click `.xlsx` Export / Import (Works Everywhere)
1. When your GitHub Pages site loads, `app.js` automatically runs `fetch('./jobs_tracker.xlsx')` to load the latest Excel sheet from your repository.
2. Any edits you make in the UI are cached immediately in `localStorage` so you never lose work on refresh.
3. Click **Export `.xlsx`** to download the updated multi-sheet `jobs_tracker.xlsx` file, or click **Import `.xlsx`** to load an updated workbook from disk.

### Mode 2: Direct Local Excel File Sync (Chrome / Edge Desktop)
1. Click **Link Local `.xlsx`** in the top header and select `jobs_tracker.xlsx` on your computer.
2. Using the browser's **File System Access API** (`window.showOpenFilePicker`), every time you add, edit, or drag-and-drop a job card in the Kanban board, the dashboard writes directly back to `jobs_tracker.xlsx` on your disk!

### Mode 3: 1-Click Save to GitHub Repo (`PUT /repos/:owner/:repo/contents/jobs_tracker.xlsx`)
1. Click **GitHub Sync** in the top header.
2. Enter your GitHub **Owner**, **Repository Name**, **Branch** (e.g., `main`), **File Path** (`jobs_tracker.xlsx`), and a fine-grained **Personal Access Token (PAT)** with `Contents: Read and Write` permission for that repository.
3. Click **Commit `.xlsx` to GitHub Now** (or enable auto-push) to commit the updated `jobs_tracker.xlsx` binary directly to your GitHub repository from the browser.

---

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g., `global-job-tracker`) and push the files in this folder:
   ```bash
   git init
   git add index.html styles.css app.js jobs_tracker.xlsx generate_tracker_excel.py README.md
   git commit -m "Initial commit: Global Job Command Center with Excel backend"
   git branch -M main
   git remote add origin https://github.com/<your-username>/global-job-tracker.git
   git push -u origin main
   ```
2. In your GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, choose **`main`** and **`/ (root)`**, and click **Save**.
4. Your live dashboard will be published at `https://<your-username>.github.io/global-job-tracker/`.

---

## Running Locally

To preview locally with automatic `fetch('./jobs_tracker.xlsx')` loading, start a local static server in this directory:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.
