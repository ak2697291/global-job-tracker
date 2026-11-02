# Agent Instructions (`agent.md`) — Worldwide Job Application & Visa Command Center

This file defines the architecture, database rules, coding standards, and operational instructions for any AI agent working on this repository.

---

## 1. Project Purpose & Candidate Context

This web application is a **Worldwide Job Application & Visa Intelligence Command Center** built for **Anil Kumar** and deployed on **GitHub Pages** with **Supabase PostgreSQL** as the cloud database.

### Candidate Profile (Used in Templates, Playbooks & Pitch Studio)
- **Name**: Anil Kumar (`anilkumarmzp1@gmail.com` | `+91-8989845501`)
- **Experience**: 4+ years of production software engineering experience (**Senior Software Engineer at Airtel Digital Limited**, scaling systems for **350M+ users**).
- **Education**: **B.Tech in Computer Science & Engineering** from **Maulana Azad National Institute of Technology (NIT Bhopal)** — recognized as **Anabin `H+`** (Germany/EU Blue Card) and **Institute of National Importance** (+10/+20 COMPASS points in Singapore).
- **Dual-Resume Strategy**:
  1. **Resume A (`Java / Spring Boot Backend`)**: Java 21 (Virtual Threads), Spring Boot 3, Apache Kafka, Aerospike, Redis, Resilience4j, AWS, Kubernetes, Microservices (40% latency reduction, 99.9% availability).
  2. **Resume B (`GenAI / Agentic AI`)**: Multi-Agent Orchestration (CrewAI, ReAct), LLM Workflows (GPT-4, Claude), RAG, Vector Databases, Autonomous SRE Root-Cause Analysis (90% MTTR reduction) + Java 21 / Spring Boot 3.

---

## 2. Repository Structure & Tech Stack

- **[`index.html`](index.html)**: Single-page application shell using modern semantic HTML5 (`<dialog>` modals, Popover API toast notifications, `hidden="until-found"` view panels for Find-in-Page support, and `<datalist>` for 195+ countries).
- **[`styles.css`](styles.css)**: Modern CSS using `color-scheme: light dark`, `light-dark()` tokens, OKLCH color palette, tabular numerals (`font-variant-numeric: tabular-nums`), sticky table headers, and `:user-invalid` form validation styling.
- **[`app.js`](app.js)**: Vanilla ES6+ application state, 195+ country ISO directory (`Intl.DisplayNames` + `WORLD_ISO_DIRECTORY`), Supabase PostgREST client, realtime subscriptions, Pitch Studio generator, and SheetJS `.xlsx` backup export/import.
- **[`sql_schema.sql`](sql_schema.sql)**: Master PostgreSQL DDL schema for Supabase (`CREATE TABLE`, `ALTER TABLE`, indexes, triggers, Row Level Security policies, and `GRANT` permissions).
- **[`update_sql_schema.sql`](update_sql_schema.sql)**: Idempotent (`ON CONFLICT DO UPDATE`) SQL seed and migration script containing 24 global tech hub visa playbooks, the 10-point ATS checklist, and tracked job applications.
- **[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)**: GitHub Actions workflow for automated GitHub Pages deployment.

> **Important Legacy Rule**: The static `jobs_tracker.xlsx` file and its Python generator (`generate_tracker_excel.py`) have been **permanently removed**. Do **not** re-introduce a static `.xlsx` file in the repository or fetch `.xlsx` on page load. All persistence is handled by **Supabase PostgreSQL** (`rudjdpnltcenvipuqerf.supabase.co`) with `localStorage` offline caching.

---

## 3. Supabase Database & Two-File SQL Workflow (MANDATORY)

Whenever making database or seed changes, **always maintain the strict two-file separation**:

### File 1: `sql_schema.sql` (DDL Only)
Contains **only** schema definitions, column migrations (`ALTER TABLE ... ADD COLUMN IF NOT EXISTS`), indexes, triggers, and RLS policies for the four core tables:
1. **`public.job_applications`** (Primary Key: `id TEXT`)
   - Columns (21): `id`, `country`, `iso_code`, `region`, `city`, `work_mode`, `company`, `role`, `resume_track`, `status`, `priority`, `visa_sponsorship`, `visa_type`, `salary_range`, `currency`, `applied_date`, `follow_up_date`, `job_url`, `contact_recruiter`, `notes`, `excitement_score` (+ `created_at`, `updated_at`).
2. **`public.country_strategies`** (Primary Key: `country TEXT`)
   - Columns (12): `country`, `iso_code`, `flag`, `region`, `tier`, `primary_visa_route`, `min_salary_threshold`, `tax_relocation_perk`, `best_resume_track`, `top_job_portals`, `tier_1_sponsor_companies`, `application_tip` (+ `created_at`, `updated_at`).
3. **`public.resume_checklist`** (Primary Key: `id TEXT`)
   - Columns (7): `id`, `done` (`TEXT` — `'Yes'` or `'No'`), `resume_track`, `category`, `action_item`, `impact`, `sort_order` (+ `created_at`, `updated_at`).
4. **`public.latex_resumes`** (Primary Key: `id TEXT`)
   - Columns (5): `id`, `name`, `track_type`, `latex_code`, `is_default` (`BOOLEAN`) (+ `created_at`, `updated_at`).
   - **Single Source of Truth Rule**: Base LaTeX resumes must **never** be hardcoded in `app.js` or `index.html`, and must **not** be cached in `localStorage`. Always fetch resumes directly from `public.latex_resumes` in Supabase via `fetchResumesFromSupabase()`.

### File 2: `update_sql_schema.sql` (Data Seeds & Incremental Updates)
Contains `INSERT INTO ... VALUES ... ON CONFLICT (...) DO UPDATE` statements.
- **Tuple Length Check**: Before saving any edit to `update_sql_schema.sql`, verify that **every row** in a multi-row `VALUES` block has the exact same number of elements as the `INSERT` column list (`12` for `country_strategies`, `7` for `resume_checklist`, `21` for `job_applications`, `5` for `latex_resumes`) to prevent PostgreSQL `ERROR: 42601: VALUES lists must all be the same length`.
- **Payload Parity with `app.js`**: Every object in `DEFAULT_STRATEGIES`, `DEFAULT_CHECKLIST`, and `DEFAULT_APPLICATIONS` inside `app.js` must only contain keys that exist as columns in `sql_schema.sql` so PostgREST upserts (`sbUpsert`) never fail on unknown columns.

---

## 4. Supabase Key & PostgREST Rules in `app.js`

- **Default Project URL**: `https://rudjdpnltcenvipuqerf.supabase.co`
- **Default Publishable Key**: `sb_publishable_2XQbGiSW2aQmFqGmTEs60Q_95W_7r5s`
- **Header Rule (`buildRestHeaders` in `app.js`)**:
  - Always send `apikey: state.supabaseKey`.
  - **Only** send `Authorization: Bearer ${state.supabaseKey}` when the key is a JWT (i.e., `state.supabaseKey.startsWith("eyJ")`). Sending a `sb_publishable_...` key inside `Authorization: Bearer` causes PostgREST to reject the request as a malformed JWT.

---

## 5. Worldwide Country Support Rules

1. **Never limit the app to 10 countries**: The dashboard must support **all 195+ countries worldwide** plus `Remote (Global)`.
2. **Dynamic Country Resolution**: Use `resolveCountryMeta(countryName)` in `app.js` so that if the user enters any country on Earth (e.g., Austria, Belgium, Czechia, South Korea, Brazil, Mauritius), its flag emoji (`isoToFlag`), macro-region, currency, and default skilled work visa route are automatically populated.
3. **Custom Country Playbooks**: Users can add or edit visa playbooks for any country directly in the UI (`#country-playbook-dialog`), which upserts directly into `public.country_strategies` in Supabase.

---

## 6. AI Resume Tailor, ATS Gate & LaTeX-to-PDF Pipeline

Ported from the user's `ai_tailor_resume` Chrome Extension and integrated into `#view-tailor` in `index.html` and `app.js`:

1. **Azure OpenAI Companion (`callAzureOpenAI`)**:
   - **Endpoint**: `https://airtel-azure-openai-test.openai.azure.com/openai/deployments/gpt-5-chat-himanshuL/chat/completions?api-version=2025-01-01-preview`
   - **Headers**: `Content-Type: application/json`, `api-key: <AZURE_OPENAI_KEY>` (stored in `localStorage` via the AI Companion Settings dialog — never hardcode literal API keys in `app.js` so GitHub Push Protection `GH013` never blocks `git push`).
   - **Payload**: `{ messages: [...], max_completion_tokens: ... }` (Note: `gpt-5-chat-himanshuL` uses `max_completion_tokens`).
2. **Job Link Scraper (`scrapeJobUrl`)**:
   - Scrapes any pasted Job URL via Jina Reader (`https://r.jina.ai/<url>`) with fallback to AllOrigins CORS HTML/JSON-LD extraction (`extractJobTextFromHtml`).
3. **5-Stage Automated Tailoring Pipeline (`runFullAiTailorPipeline`)**:
   - **Step 1**: Scrape job link or read pasted JD text.
   - **Step 2**: Extract structured JD (`company_name`, `job_title`, `country`, `city`, `must_have_skills`, `nice_to_have_skills`, `ats_keywords`).
   - **Step 3**: Run parallel **ATS & Relatability Gate** across all base LaTeX resumes fetched from Supabase (`public.latex_resumes`) and automatically pick the highest-scoring track.
   - **Step 4**: Run the **Generator ↔ Supervisor LaTeX Tailoring Loop** (`tailorLatexResumeWithLoop`) with strict 1-page budget rules and `\usepackage{everypage}` guard.
   - **Step 5**: Compile tailored `.tex` to PDF (`compileAndPreviewPdf`) via `https://vaggbwodamenwlbxdicj.supabase.co/functions/v1/latexToPdfConverter` (with `Bearer sb_publishable_vL400zAs6QdUjeAzCoe-wA_A2RZHeUS`) and automatic fallback to `https://latex.ytotech.com/builds/sync`.
4. **Download & Apply**:
   - **Download Tailored PDF**: Downloads `AnilKumarResume_<Company>.pdf`.
   - **Apply at Job Link & Save to Tracker**: Upserts the scraped/tailored job directly into `public.job_applications` in Supabase and opens the job application URL in a new tab.

---

## 7. Agent Verification Checklist

Before finishing any code or SQL modification:
1. Run `node --check app.js` to confirm zero JavaScript syntax errors.
2. Verify all SQL statements in `sql_schema.sql` and `update_sql_schema.sql` are idempotent (`IF NOT EXISTS`, `DROP POLICY IF EXISTS`, `ON CONFLICT DO UPDATE`).
3. Ensure no extra/unmapped keys exist on objects passed to `sbUpsert(...)`.
4. Ensure `README.md` and `agent.md` stay in sync with any new features or schema changes.

