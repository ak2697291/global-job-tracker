# 🌐 Worldwide Job Application & Visa Intelligence Command Center (Supabase PostgreSQL)

An interactive, worldwide job application tracker and visa sponsorship intelligence hub built for **Anil Kumar** (*Senior Software Engineer @ Airtel Digital, NIT Bhopal CSE*), powered by **Supabase PostgreSQL** (`https://rudjdpnltcenvipuqerf.supabase.co`) and ready for **GitHub Pages** deployment.

---

## ✨ Key Features

1. **⚡ Live Supabase PostgreSQL Backend (No Excel/Token Issues on GitHub Pages)**
   - Pre-configured with your Supabase project (`https://rudjdpnltcenvipuqerf.supabase.co`) and publishable key (`sb_publishable_2XQbGiSW2aQmFqGmTEs60Q_95W_7r5s`).
   - Every Add, Edit, Stage Change, Delete, Country Playbook customization, and ATS Checklist toggle syncs directly with Supabase PostgREST + Realtime.
   - Automatic offline local cache fallback + 1-click `.xlsx` backup export/import.

2. **🌍 Supports Every Country in the World (195+ Countries + Global Remote)**
   - **Macro-Region Filter Bar**: Filter across **All Regions**, **🇪🇺 Europe**, **🌎 Americas**, **🌏 Asia-Pacific**, **🕌 Middle East & Africa**, and **💻 Global Remote**.
   - **Universal Country Directory**: Built-in ISO 3166-1 directory (`Intl.DisplayNames` + Unicode flags + regional currency & work permit defaults) for **all 195+ countries**.
   - **24 Pre-Loaded Deep-Dive Country Playbooks** (Germany, Netherlands, UK, Ireland, UAE, Singapore, Australia, Canada, Japan, Sweden, France, Spain, Poland, Estonia, Switzerland, USA, Saudi Arabia, New Zealand, Denmark, Norway, Finland, Luxembourg, Qatar, and Global Remote) — plus the ability to **add or customize playbooks for any country in the world** via the **+ Country Playbook** modal.

3. **📊 5 Interactive Views**
   - **📋 Applications Table**: Inline stage selector, visa route badges, excitement stars (`1–5 ★`), follow-up overdue alerts, and 1-click **⚡ Pitch** button.
   - **🗂️ Kanban Pipeline**: Stage-by-stage visual board from `Wishlist` → `Offer`.
   - **🌍 World Visa & Hub Explorer**: Searchable cards detailing visa routes, minimum salary thresholds, tax perks (30% Ruling, Beckham Law, Anabin H+, COMPASS +20 SOL bonus, 0% tax GCC), top job portals, and Tier-1 sponsor companies.
   - **📊 Global Analytics**: Real-time visual breakdown by country/region, stage conversion funnel, Dual-Resume Track split, and a **Recruiter Follow-Up Radar**.
   - **⚡ Outreach Studio & ATS Checklist**: Select any tracked application from Supabase to dynamically generate copy-ready **LinkedIn Connection Notes (≤300 chars)**, **Hiring Manager Cold Emails**, and **NIT Bhopal / Airtel Alumni Referral Asks**.

---

## 🗄️ Database Schema Files (`sql_schema.sql` & `update_sql_schema.sql`)

| File | Purpose |
| :--- | :--- |
| [`sql_schema.sql`](./sql_schema.sql) | **Base Schema Definition**: Creates `public.job_applications`, `public.country_strategies`, and `public.resume_checklist`, along with indexes, `updated_at` triggers, Row Level Security (RLS) policies for GitHub Pages (`anon`/`authenticated`), and Supabase Realtime publications. |
| [`update_sql_schema.sql`](./update_sql_schema.sql) | **Incremental Schema Updates & Seed Data**: Safely adds new worldwide columns (`iso_code`, `region`, `work_mode`, `visa_type`, `currency`, `excitement_score`), creates the `public.v_country_pipeline_summary` analytical view, and seeds 24 global visa playbooks, 10 ATS checklist items, and your initial tracked applications. |

### Quick 2-Step Supabase SQL Setup
1. Open your **[Supabase SQL Editor](https://supabase.com/dashboard/project/rudjdpnltcenvipuqerf/sql/new)**.
2. Copy and run [`sql_schema.sql`](./sql_schema.sql), then copy and run [`update_sql_schema.sql`](./update_sql_schema.sql) (or click **🌱 Push / Seed Default Data to Supabase** inside the dashboard's **🗄️ Supabase & SQL** modal).

---

## 🚀 Deploying to GitHub Pages

Because the dashboard uses HTML5, CSS3, Vanilla JS, and the Supabase REST/Realtime client over HTTPS, it works out-of-the-box on **GitHub Pages** with zero build steps:
1. Push this repository to GitHub.
2. Go to **Settings → Pages** and select your branch (`main` / root or `/global-job-tracker`).
3. Open your live GitHub Pages URL — all applications, country playbooks, and checklist items will persist directly in your Supabase PostgreSQL database.
