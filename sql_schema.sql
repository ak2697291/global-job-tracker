-- ============================================================================
-- Global Job Application & Visa Intelligence Hub — Base Database Schema
-- File: sql_schema.sql
-- Target Database: Supabase PostgreSQL (https://rudjdpnltcenvipuqerf.supabase.co)
-- Deployment: GitHub Pages Static SPA + Supabase PostgREST / Realtime Backend
-- Instructions: Paste and run this file first in the Supabase SQL Editor.
-- ============================================================================

BEGIN;

-- 1. Utility Trigger Function to automatically maintain updated_at timestamps
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- 2. Table: public.job_applications
-- Stores job applications across ANY country worldwide (195+ countries & Remote)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.job_applications (
  id                TEXT PRIMARY KEY,
  country           TEXT NOT NULL,
  iso_code          TEXT NOT NULL DEFAULT '',
  region            TEXT NOT NULL DEFAULT 'Global',
  city              TEXT NOT NULL DEFAULT '',
  work_mode         TEXT NOT NULL DEFAULT 'On-site / Relocation',
  company           TEXT NOT NULL,
  role              TEXT NOT NULL,
  resume_track      TEXT NOT NULL DEFAULT 'Java / Spring Boot Backend',
  status            TEXT NOT NULL DEFAULT 'Wishlist',
  priority          TEXT NOT NULL DEFAULT 'High',
  visa_sponsorship  TEXT NOT NULL DEFAULT 'Verified Sponsor',
  visa_type         TEXT NOT NULL DEFAULT '',
  salary_range      TEXT NOT NULL DEFAULT '',
  currency          TEXT NOT NULL DEFAULT '',
  applied_date      TEXT NOT NULL DEFAULT '',
  follow_up_date    TEXT NOT NULL DEFAULT '',
  job_url           TEXT NOT NULL DEFAULT '',
  contact_recruiter TEXT NOT NULL DEFAULT '',
  notes             TEXT NOT NULL DEFAULT '',
  excitement_score  INTEGER NOT NULL DEFAULT 5,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for fast filtering, searching, and sorting across all countries
CREATE INDEX IF NOT EXISTS idx_job_applications_country        ON public.job_applications (country);
CREATE INDEX IF NOT EXISTS idx_job_applications_region         ON public.job_applications (region);
CREATE INDEX IF NOT EXISTS idx_job_applications_status         ON public.job_applications (status);
CREATE INDEX IF NOT EXISTS idx_job_applications_priority       ON public.job_applications (priority);
CREATE INDEX IF NOT EXISTS idx_job_applications_resume_track   ON public.job_applications (resume_track);
CREATE INDEX IF NOT EXISTS idx_job_applications_follow_up_date ON public.job_applications (follow_up_date);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at     ON public.job_applications (created_at DESC);

DROP TRIGGER IF EXISTS trg_job_applications_updated_at ON public.job_applications;
CREATE TRIGGER trg_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 3. Table: public.country_strategies
-- Stores visa routes, salary thresholds, tax perks, job portals & top sponsors
-- for ANY country in the world (unlimited countries supported)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.country_strategies (
  country                  TEXT PRIMARY KEY,
  iso_code                 TEXT NOT NULL DEFAULT '',
  flag                     TEXT NOT NULL DEFAULT '🌍',
  region                   TEXT NOT NULL DEFAULT 'Global',
  tier                     TEXT NOT NULL DEFAULT 'Tier 1 — High ROI',
  primary_visa_route       TEXT NOT NULL DEFAULT '',
  min_salary_threshold     TEXT NOT NULL DEFAULT '',
  tax_relocation_perk      TEXT NOT NULL DEFAULT '',
  best_resume_track        TEXT NOT NULL DEFAULT 'Both Tracks',
  top_job_portals          TEXT NOT NULL DEFAULT '',
  tier_1_sponsor_companies TEXT NOT NULL DEFAULT '',
  application_tip          TEXT NOT NULL DEFAULT '',
  user_remarks             TEXT NOT NULL DEFAULT '',
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_country_strategies_region ON public.country_strategies (region);
CREATE INDEX IF NOT EXISTS idx_country_strategies_tier   ON public.country_strategies (tier);

DROP TRIGGER IF EXISTS trg_country_strategies_updated_at ON public.country_strategies;
CREATE TRIGGER trg_country_strategies_updated_at
BEFORE UPDATE ON public.country_strategies
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 4. Table: public.resume_checklist
-- Stores Dual-Resume & International ATS optimization checklist items
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.resume_checklist (
  id           TEXT PRIMARY KEY,
  done         TEXT NOT NULL DEFAULT 'No',
  resume_track TEXT NOT NULL DEFAULT 'Both Resumes',
  category     TEXT NOT NULL DEFAULT 'General',
  action_item  TEXT NOT NULL,
  impact       TEXT NOT NULL DEFAULT '',
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resume_checklist_sort_order ON public.resume_checklist (sort_order ASC);

DROP TRIGGER IF EXISTS trg_resume_checklist_updated_at ON public.resume_checklist;
CREATE TRIGGER trg_resume_checklist_updated_at
BEFORE UPDATE ON public.resume_checklist
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 4b. Table: public.latex_resumes
-- Stores Base LaTeX (.tex) Resume Tracks & Tailored LaTeX Output for the
-- AI Resume Tailor & LaTeX-to-PDF Studio
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.latex_resumes (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  track_type  TEXT NOT NULL DEFAULT 'Java / Spring Boot Backend',
  latex_code  TEXT NOT NULL,
  is_default  BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_latex_resumes_updated_at ON public.latex_resumes;
CREATE TRIGGER trg_latex_resumes_updated_at
BEFORE UPDATE ON public.latex_resumes
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 5. Row Level Security (RLS) & Permissions for GitHub Pages Publishable Key
-- Allows the client-side app using SUPABASE_PUBLISHABLE_KEY to perform CRUD
-- ============================================================================
ALTER TABLE public.job_applications   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.country_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_checklist   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.latex_resumes      ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read/write on job_applications" ON public.job_applications;
CREATE POLICY "Allow public read/write on job_applications"
  ON public.job_applications
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read/write on country_strategies" ON public.country_strategies;
CREATE POLICY "Allow public read/write on country_strategies"
  ON public.country_strategies
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read/write on resume_checklist" ON public.resume_checklist;
CREATE POLICY "Allow public read/write on resume_checklist"
  ON public.resume_checklist
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read/write on latex_resumes" ON public.latex_resumes;
CREATE POLICY "Allow public read/write on latex_resumes"
  ON public.latex_resumes
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.job_applications   TO anon, authenticated;
GRANT ALL ON TABLE public.country_strategies TO anon, authenticated;
GRANT ALL ON TABLE public.resume_checklist   TO anon, authenticated;
GRANT ALL ON TABLE public.latex_resumes      TO anon, authenticated;

-- ============================================================================
-- 6. Enable Supabase Realtime on all 4 tables (idempotent)
-- ============================================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'job_applications'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.job_applications;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'country_strategies'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.country_strategies;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'resume_checklist'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.resume_checklist;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'latex_resumes'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.latex_resumes;
    END IF;
  END IF;
END
$$;

COMMIT;
