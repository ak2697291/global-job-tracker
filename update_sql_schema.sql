-- ============================================================================
-- Global Job Application & Visa Intelligence Hub — Schema Updates & Seed Data
-- File: update_sql_schema.sql
-- Target Database: Supabase PostgreSQL (https://rudjdpnltcenvipuqerf.supabase.co)
-- Purpose: Incremental schema migrations, worldwide country support (unlimited
--          countries), analytical SQL views, and initial global seed records.
-- Instructions: Run this after sql_schema.sql in the Supabase SQL Editor.
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. Incremental Schema Migrations (Safe to re-run at any time)
-- Expands tables to support EVERY country in the world, region grouping,
-- currencies, work modes, and excitement/fit scoring.
-- ============================================================================
ALTER TABLE public.job_applications
  ADD COLUMN IF NOT EXISTS iso_code         TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS region           TEXT NOT NULL DEFAULT 'Global',
  ADD COLUMN IF NOT EXISTS work_mode        TEXT NOT NULL DEFAULT 'On-site / Relocation',
  ADD COLUMN IF NOT EXISTS currency         TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS excitement_score INTEGER NOT NULL DEFAULT 5;

ALTER TABLE public.country_strategies
  ADD COLUMN IF NOT EXISTS iso_code   TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS flag       TEXT NOT NULL DEFAULT '🌍',
  ADD COLUMN IF NOT EXISTS region     TEXT NOT NULL DEFAULT 'Global',
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE public.resume_checklist
  ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE TABLE IF NOT EXISTS public.latex_resumes (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  track_type  TEXT NOT NULL DEFAULT 'Java / Spring Boot Backend',
  latex_code  TEXT NOT NULL,
  is_default  BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.latex_resumes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read/write on latex_resumes" ON public.latex_resumes;
CREATE POLICY "Allow public read/write on latex_resumes"
  ON public.latex_resumes
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
GRANT ALL ON TABLE public.latex_resumes TO anon, authenticated;

-- ============================================================================
-- 2. Analytical SQL Views for Worldwide Pipeline & Region Metrics
-- ============================================================================
CREATE OR REPLACE VIEW public.v_country_pipeline_summary
WITH (security_invoker = true)
AS
SELECT
  country,
  MAX(iso_code) AS iso_code,
  MAX(region) AS region,
  COUNT(*) AS total_applications,
  COUNT(*) FILTER (WHERE status <> 'Wishlist') AS submitted_count,
  COUNT(*) FILTER (
    WHERE status IN ('OA / Coding Test', 'Recruiter Screen', 'Technical Interview', 'Final Round', 'Offer')
  ) AS interviewing_count,
  COUNT(*) FILTER (WHERE status = 'Offer') AS offer_count,
  COUNT(*) FILTER (WHERE resume_track ILIKE '%Java%') AS java_track_count,
  COUNT(*) FILTER (WHERE resume_track ILIKE '%GenAI%') AS genai_track_count
FROM public.job_applications
GROUP BY country
ORDER BY total_applications DESC, country ASC;

GRANT SELECT ON public.v_country_pipeline_summary TO anon, authenticated;

-- ============================================================================
-- 3. Seed / Upsert Global Country Visa & Portal Playbooks (24 Global Tech Hubs
--    across Europe, Middle East, Asia-Pacific, Americas & Global Remote;
--    Additional countries among all 195+ world nations can be added from UI)
-- ============================================================================
INSERT INTO public.country_strategies (
  country, iso_code, flag, region, tier, primary_visa_route, min_salary_threshold,
  tax_relocation_perk, best_resume_track, top_job_portals, tier_1_sponsor_companies, application_tip
) VALUES
(
  'Germany', 'DE', '🇩🇪', 'Europe', 'Tier 1 — High ROI',
  'EU Blue Card / Opportunity Card (Chancenkarte)',
  '€45,934/yr (IT Shortage) / €50,700/yr Standard',
  'Fast PR in 21 months (with B1 German) or 27 months (A1)',
  'Both (Java Backend for Zalando/Delivery Hero; GenAI for AI startups)',
  'LinkedIn, Honeypot.io, Relocate.me, StepStone.de, Make-it-in-Germany',
  'Zalando, Delivery Hero, N26, Trade Republic, SAP, Siemens, HelloFresh, Celonis, Flix, SumUp',
  'Mention NIT Bhopal (MANIT) has H+ status in the German Anabin database for instant EU Blue Card processing.'
),
(
  'Netherlands', 'NL', '🇳🇱', 'Europe', 'Tier 1 — High ROI',
  'Highly Skilled Migrant (HSM / Kennismigrant)',
  '€4,357/mo (<30 yrs) / €5,942/mo (30+ yrs) excl. 8% holiday',
  '30% Ruling Expat Tax Exemption (27% tax-free from 2027)',
  'Resume A: Java 21 / Spring Boot / Kafka (FinTech & Booking scale)',
  'LinkedIn, Relocate.me, Techleap.nl, Welcome-to-NL, Honeypot.io',
  'Booking.com, Adyen, Uber (Amsterdam), ASML, Databricks, Miro, Mollie, ING, Backbase, Picnic',
  'Only apply to companies on the IND Public Register of Recognized Sponsors; highlight Airtel 350M+ user scale.'
),
(
  'United Kingdom', 'GB', '🇬🇧', 'Europe', 'Tier 1 — High ROI',
  'Skilled Worker Visa (SOC 2134) / Global Talent Visa',
  '£41,700/yr general or SOC 2134 going rate (~£49,400+)',
  'No language test delay if degree taught in English (ECCTIS)',
  'Both (Java for FinTech/Banking; GenAI for London AI Hubs)',
  'LinkedIn, Otta (Welcome to the Jungle), Cord.co, Hired.co.uk, UK Sponsor Checker',
  'Revolut, Monzo, Wise, Deliveroo, Checkout.com, Starling Bank, JP Morgan, Goldman Sachs, Synthesia, DeepMind',
  'Use Cord.co to message hiring managers directly and filter for visa sponsorship on Otta.'
),
(
  'UAE', 'AE', '🇦🇪', 'Middle East & Africa', 'Tier 1 — High ROI',
  'Employer Work Visa / 10-Year UAE Golden Visa (AI & Software)',
  'AED 18,000–28,000/mo (~$60k–$92k/yr TAX-FREE); AED 30,000/mo for Golden Visa',
  '0% Personal Income Tax + Fast 2-week work permit processing',
  'Both (Java for Careem/Noon/Talabat; GenAI for Abu Dhabi G42/AI71/TII)',
  'LinkedIn (set location to UAE), Naukrigulf, GulfTalent, Hubert',
  'Careem, Noon, Talabat, Property Finder, Kitopi, Emirates NBD, First Abu Dhabi Bank, G42, Core42, AI71, TII',
  'Highlight telecom + fintech + GenAI background; Airtel experience maps directly to Careem, Noon, and G42.'
),
(
  'Ireland', 'IE', '🇮🇪', 'Europe', 'Tier 2 — Strong Fit',
  'Critical Skills Employment Permit (CSEP)',
  '€44,000/yr minimum (€70k–€95k typical Senior SWE)',
  'Stamp 4 Permanent Residency after just 2 years on CSEP',
  'Resume A: Java / Spring Boot / Distributed Cloud Backend',
  'LinkedIn, IrishJobs.ie, TechIreland, Relocate.me',
  'Stripe, HubSpot, Workday, Intercom, Mastercard (Dublin Tech Hub), Fidelity, Toast, Yahoo, Amazon',
  'SOC 2136 (Programmers & Software Development Professionals) is on the Critical Skills list—spouse gets immediate work rights.'
),
(
  'Singapore', 'SG', '🇸🇬', 'Asia-Pacific', 'Tier 2 — Strong Fit',
  'Employment Pass (EP) with COMPASS Framework',
  'SGD 5,600+/mo minimum (age-indexed; target SGD 10,000–14,000/mo)',
  'Low 7%–15% effective income tax + +20 COMPASS Shortage Bonus for AI/Cloud',
  'Both (GenAI scores +20 COMPASS SOL bonus; Java for Grab/DBS/Shopee)',
  'MyCareersFuture.gov.sg, NodeFlair, LinkedIn, TechInAsia Jobs',
  'Grab, Shopee (Sea), GoTo, Lazada, Coupang, DBS Bank, Standard Chartered, Wise, ByteDance, foodpanda',
  'Target AI Engineer or Cloud/Distributed SWE titles to unlock the +20 COMPASS Shortage Occupation List bonus.'
),
(
  'Australia', 'AU', '🇦🇺', 'Asia-Pacific', 'Tier 2 — Strong Fit',
  'Skills in Demand (SID) Subclass 482 (Core/Specialist) / PR 189/190',
  'AUD $73,150+ Core Skills / AUD $135,000+ Specialist (7-day processing)',
  'Specialist Skills stream processes in ~7 days with direct PR pathway',
  'Resume A: Java / Spring Boot / Cloud Microservices',
  'Seek.com.au, LinkedIn, Hatch, Arc.dev',
  'Atlassian, Canva, WiseTech Global, Afterpay/Block, Xero, REA Group, Commonwealth Bank, Macquarie, SafetyCulture',
  'Applying for roles paying >AUD $135k qualifies for the Specialist Skills stream with 7-day visa turnaround.'
),
(
  'Canada', 'CA', '🇨🇦', 'Americas', 'Tier 2 — Strong Fit',
  'Global Talent Stream (GTS Category B) / Express Entry Tech Draw',
  'CAD $110,000–$160,000/yr typical Senior SWE',
  '2-Week LMIA-Exempt Work Permit processing under GTS Category B',
  'Both (Java for Shopify/Wealthsimple/RBC; GenAI for Cohere/Toronto AI)',
  'LinkedIn, VanHack, JobBank.gc.ca, Wellfound',
  'Shopify, Cohere, Wealthsimple, Clio, Faire, Hopper, 1Password, Hootsuite, RBC, Telus Digital',
  'Join VanHack talent pool and complete ECA + IELTS General early to unlock Ontario/BC Provincial Nominee Tech Draws.'
),
(
  'Switzerland', 'CH', '🇨🇭', 'Europe', 'Tier 3 — Selective / High Reward',
  'Non-EU B Permit (Quota-based) / L-1 Multinational Transfer',
  'CHF 120,000–175,000+/yr',
  'Highest European net compensation + Low cantonal tax (Zug/Zurich)',
  'Both (GenAI/LLM Research Engineering & High-Concurrency Java)',
  'SwissDevJobs.ch, Jobs.ch, LinkedIn',
  'Google (Zurich), UBS, Swisscom, SonarSource, Roche, Novartis, CERN, Proton, GetYourGuide, Scandit',
  'Filter specifically for "Visa Sponsor" on SwissDevJobs.ch; highlight specialized GenAI + Java 21 expertise.'
),
(
  'USA', 'US', '🇺🇸', 'Americas', 'Tier 3 — Selective / High Reward',
  'L-1B Internal Transfer / Cap-Exempt H-1B / O-1A / Remote USD Contractor',
  '$140,000–$220,000+ (Onshore) / $80,000–$140,000 (Remote USD from India)',
  'Highest global equity & cash compensation; USD remote roles require 0 visa wait',
  'Resume B: GenAI / Agentic AI / Multi-Agent Systems',
  'WorkAtAStartup (Y Combinator), Wellfound, Turing, Toptal, LinkedIn',
  'Y Combinator AI Startups, Walmart Global Tech, Uber, Stripe, PayPal, Oracle, Salesforce, ServiceNow',
  'Dual-track strategy: (1) Apply to US YC startups hiring remote GenAI Engineers in USD; (2) Target US MNCs for L-1B transfer.'
),
(
  'Japan', 'JP', '🇯🇵', 'Asia-Pacific', 'Tier 1 — High ROI',
  'Engineer / Specialist in Humanities Visa & J-Skip (Highly Skilled Professional)',
  '¥8,000,000–¥14,000,000/yr (~$55k–$95k) for English-speaking Senior SWE',
  'Fast-track PR in 1 year (HSP 80+ points / J-Skip) + No Japanese required at top tech firms',
  'Both (Java/Spring Boot for Rakuten/Woven by Toyota/PayPay; GenAI for Sakana AI/ SmartNews)',
  'JapanDev.com, TokyoDev.com, LinkedIn, Relocate.me',
  'PayPay, Woven by Toyota, Rakuten, Mercari, Line Yahoo, SmartNews, Money Forward, Mujin, Sakana AI',
  'PayPay (founded with Paytm tech stack!) and Rakuten actively sponsor Indian Java/Spring Boot & Kafka engineers with zero Japanese requirement.'
),
(
  'Sweden', 'SE', '🇸🇪', 'Europe', 'Tier 1 — High ROI',
  'Swedish Work Permit / EU Blue Card',
  'SEK 45,000–68,000/mo (~€48k–€72k/yr; minimum threshold SEK 28,480/mo)',
  'English-first tech culture + 25–30 days paid vacation + spouse work rights',
  'Resume A: Java / Spring Boot / Distributed Systems & Payments',
  'LinkedIn, Relocate.me, Hubbster, StartupJobs Sweden',
  'Spotify, Klarna, King, Mojang, Tink (Visa), Volvo Cars Tech, Truecaller, Evolution, Sinch, Einride',
  'Klarna, Tink, and Truecaller (huge India market presence) heavily value high-scale Java/Kafka & telecom background.'
),
(
  'Spain', 'ES', '🇪🇸', 'Europe', 'Tier 2 — Strong Fit',
  'Highly Qualified Professional (HQP) Visa / Beckham Law Tax Regime',
  '€50,000–€85,000/yr (HQP minimum ~€40,077/yr)',
  'Beckham Law: Flat 24% income tax for 6 years + 20-day fast-track HQP visa approval',
  'Resume A: Java 21 / Spring Boot / Event-Driven Microservices',
  'LinkedIn, Manfred.com, Joppy, Relocate.me',
  'Glovo, Cabify, Wallapop, Typeform, Factorial, Amadeus, Revolut (Madrid/Barcelona), N26, TravelPerk',
  'Barcelona and Madrid are booming European tech hubs; HQP visas are processed by the UGE in just 20 business days.'
),
(
  'Poland', 'PL', '🇵🇱', 'Europe', 'Tier 2 — Strong Fit',
  'EU Blue Card / National Work Visa',
  'PLN 18,000–28,000/mo (~€50k–€78k/yr; very low cost of living)',
  'High disposable income ratio + major US/UK Big Tech engineering centers in Warsaw/Krakow',
  'Both (Java Backend & Cloud AI Engineering)',
  'NoFluffJobs.com, JustJoin.it, LinkedIn',
  'Google (Warsaw — largest EU Cloud hub), Stripe, Revolut (Krakow), Allegro, Booksy, DocPlanner, Box, Cisco',
  'NoFluffJobs.com and JustJoin.it mandate transparent salary brackets on every job listing and have a "Foreigners Welcome" filter.'
),
(
  'Estonia', 'EE', '🇪🇪', 'Europe', 'Tier 1 — High ROI',
  'IT Specialist Short/Long-Term Visa & EU Blue Card',
  '€55,000–€85,000/yr',
  'IT Specialists are exempt from Estonia''s immigration quota + 20% flat income tax',
  'Both (Java for Wise/Bolt; GenAI for AI automation)',
  'WorkInEstonia.com, MeetFrank, LinkedIn',
  'Bolt, Wise, Pipedrive, Veriff, Playtech, Starship Technologies, Skeleton Technologies, Kuehne+Nagel IT',
  'WorkInEstonia.com curates English-speaking roles with full relocation packages; Bolt and Wise relocate dozens of Indian engineers quarterly.'
),
(
  'Denmark', 'DK', '🇩🇰', 'Europe', 'Tier 2 — Strong Fit',
  'Pay Limit Scheme (Beløbsordningen) / Positive List for Skilled Work',
  'DKK 514,000/yr minimum (~€68,900/yr; typical Senior SWE DKK 650k–850k)',
  'Fast-track certification allows starting work almost immediately upon visa submission',
  'Resume A: Java / Spring Boot / Distributed Cloud',
  'LinkedIn, TheHub.io, WorkInDenmark.dk',
  'Maersk Tech, LEGO Digital, Danske Bank, Zendesk, Trustpilot, Pleo, Lunar, Unity, Too Good To Go',
  'Certified Fast-Track companies (Maersk, LEGO, Pleo, Danske Bank) can get work permits approved in under 30 days.'
),
(
  'Norway', 'NO', '🇳🇴', 'Europe', 'Tier 2 — Strong Fit',
  'Skilled Worker Residence Permit',
  'NOK 650,000–950,000/yr (~€56k–€82k/yr; minimum NOK 500k with Bachelor''s)',
  'PAYE 25% flat tax option for first year + exceptional work-life balance',
  'Resume A: Java / Spring Boot / Cloud Infrastructure',
  'Finn.no, LinkedIn, WorkInNorway.no',
  'Opera, Oda, Cognite, Kahoot!, Schibsted, DNB, Vipps MobilePay, Gelato, Dune Analytics',
  'Cognite and Gelato in Oslo hire globally in English and sponsor Skilled Worker permits.'
),
(
  'Finland', 'FI', '🇫🇮', 'Europe', 'Tier 2 — Strong Fit',
  'Specialist Residence Permit / EU Blue Card',
  '€55,000–€85,000/yr (Specialist minimum €3,638/mo)',
  '14-Day Fast Track Visa Service for Specialists and their families',
  'Both (Java Backend & Applied AI/ML)',
  'Jobly.fi, WorkInFinland.com, LinkedIn, TheHub.io',
  'Wolt (DoorDash), Supercell, Rovio, Nokia, Oura, Aiven, Relex Solutions, Smartly.io, Iceye',
  'Finland''s D-Visa Fast Track issues Specialist residence permits in 2 weeks; Wolt and Aiven are top sponsors.'
),
(
  'France', 'FR', '🇫🇷', 'Europe', 'Tier 2 — Strong Fit',
  'Passeport Talent (French Tech Visa / EU Blue Card)',
  '€55,000–€95,000/yr (Passeport Talent threshold ~€43k–€53.8k/yr)',
  '4-year renewable Passeport Talent permit + 30% Impatriate Tax Exemption',
  'Both (GenAI for Paris AI Hub — Mistral/Hugging Face; Java for FinTech)',
  'WelcomeToTheJungle.com (WTTJ), LinkedIn, FrenchTechVisa',
  'Mistral AI, Hugging Face, Datadog (Paris), Qonto, Alan, BlaBlaCar, Doctolib, Contentsquare, Criteo, Ledger',
  'Paris is Europe''s #1 GenAI research & startup capital; use WelcomeToTheJungle.com for English-speaking tech teams.'
),
(
  'Luxembourg', 'LU', '🇱🇺', 'Europe', 'Tier 2 — Strong Fit',
  'EU Blue Card (Highly Qualified Worker)',
  '€75,000–€115,000/yr (EU Blue Card threshold €58,968/yr)',
  'High net salaries + English-speaking international workforce + free public transport',
  'Resume A: Java / Spring Boot / Financial & E-Commerce Systems',
  'Jobs.lu, Moovijob, LinkedIn',
  'Amazon EU HQ (Luxembourg), PayPal Europe, Ferrero Tech, SES Satellites, European Investment Bank,Clearstream',
  'Amazon''s European Headquarters in Luxembourg is one of the largest EU Blue Card sponsors for Indian Java SDE-2/SDE-3 engineers.'
),
(
  'New Zealand', 'NZ', '🇳🇿', 'Asia-Pacific', 'Tier 2 — Strong Fit',
  'Accredited Employer Work Visa (AEWV) & Green List Tier 1 Straight to Residence',
  'NZD $110,000–$155,000/yr',
  'Software Engineers are on Green List Tier 1 — eligible for immediate Straight to Residence!',
  'Resume A: Java / Spring Boot / Cloud Microservices',
  'Seek.co.nz, TradeMe Jobs, LinkedIn, LookSee',
  'Xero, Rocket Lab, Pushpay, Vista Group, Serko, Halter, ANZ Tech, ASB Bank, Datacom',
  'Verify the employer is on the INZ Accredited Employer list; Software Engineer roles qualify for Straight to Residence.'
),
(
  'Saudi Arabia', 'SA', '🇸🇦', 'Middle East & Africa', 'Tier 2 — Strong Fit',
  'Work Visa / Special Talent Premium Residency',
  'SAR 22,000–38,000/mo (~$70k–$120k/yr TAX-FREE)',
  '0% Personal Income Tax + massive Giga-Project & Sovereign AI investment',
  'Both (Java for STC/Tamara/Salla; GenAI for SDAIA/HUMAIN/Aramco Digital)',
  'LinkedIn, Bayt.com, GulfTalent',
  'Tamara, Salla, Foodics, Mozn, STC (Saudi Telecom), Aramco Digital, NEOM, Red Sea Global, Careem',
  'Your Bharti Airtel telecom + GenAI experience is a 10/10 match for STC, Aramco Digital, and Riyadh FinTech unicorns (Tamara, Mozn).'
),
(
  'Qatar', 'QA', '🇶🇦', 'Middle East & Africa', 'Tier 3 — Selective / High Reward',
  'Employer Sponsored Work Residence Permit',
  'QAR 20,000–32,000/mo (~$65k–$105k/yr TAX-FREE)',
  '0% Personal Income Tax + family housing & flight allowances',
  'Resume A: Java / Spring Boot / Telecom & Aviation Systems',
  'LinkedIn, QatarLiving Jobs, GulfTalent',
  'Qatar Airways Digital, Ooredoo, Snoonu, QNB, Qatar Computing Research Institute (QCRI — GenAI)',
  'Qatar Airways and Ooredoo frequently recruit Senior Java/Spring Boot engineers from Indian telecom & product companies.'
),
(
  'Remote (Global)', 'WW', '🌐', 'Global Remote', 'Tier 1 — High ROI',
  'No Visa Needed — USD/EUR/GBP Contractor or Employer of Record (Deel / Remote.com)',
  '$75,000–$150,000/yr USD (Working remotely from India or Digital Nomad)',
  'Earn top-tier USD/EUR while living in India (Section 44ADA 50% presumptive tax benefit for Indian contractors!)',
  'Resume B: GenAI / Agentic AI & Resume A: Java 21 Distributed Backend',
  'Y Combinator WorkAtAStartup, Wellfound, RemoteOK, WeWorkRemotely, Arc.dev, Turing',
  'GitLab, Canonical, Automattic, Zapier, Deel, Remote.com, Kraken, Invisible Technologies, YC AI Startups',
  'Under Indian tax law (Sec 44ADA), independent software export consulting up to ₹75L/yr enjoys 50% presumptive taxation + 0% GST under LUT!'
)
ON CONFLICT (country) DO UPDATE SET
  iso_code                 = EXCLUDED.iso_code,
  flag                     = EXCLUDED.flag,
  region                   = EXCLUDED.region,
  tier                     = EXCLUDED.tier,
  primary_visa_route       = EXCLUDED.primary_visa_route,
  min_salary_threshold     = EXCLUDED.min_salary_threshold,
  tax_relocation_perk      = EXCLUDED.tax_relocation_perk,
  best_resume_track        = EXCLUDED.best_resume_track,
  top_job_portals          = EXCLUDED.top_job_portals,
  tier_1_sponsor_companies = EXCLUDED.tier_1_sponsor_companies,
  application_tip          = EXCLUDED.application_tip,
  updated_at               = NOW();

-- ============================================================================
-- 4. Seed / Upsert Dual-Resume & International ATS Checklist (10 Items)
-- ============================================================================
INSERT INTO public.resume_checklist (
  id, done, resume_track, category, action_item, impact, sort_order
) VALUES
(
  'CHK-01', 'No', 'Both Resumes', 'Contact & Links',
  'Ensure phone has +91 prefix and LinkedIn/GitHub URLs are clickable hyperlinks (currently plain text in PDF)',
  'Critical — International recruiters contact via LinkedIn/Email first', 1
),
(
  'CHK-02', 'No', 'Both Resumes', 'Header & Visa Signal',
  'Add "Open to International Relocation (Visa Sponsorship / EU Blue Card)" & "Location: Gurugram, India" in header',
  'High — Immediately answers recruiter question on location & visa eligibility', 2
),
(
  'CHK-03', 'No', 'Both Resumes', 'Company Context',
  'Add 1-line descriptor: "Bharti Airtel (Global Telecom & FinTech Leader — 350M+ Subscribers)"',
  'High — EU/US/AU recruiters may not know Airtel''s massive transaction scale', 3
),
(
  'CHK-04', 'No', 'Resume A (Java Backend)', 'Cloud & DevOps Depth',
  'Explicitly name cloud & container tooling (AWS/GCP, Docker, Kubernetes, CI/CD) in Skills & Airtel bullets',
  'Critical — 85% of EU/UK/SG Senior Java roles screen for Docker/K8s/Cloud', 4
),
(
  'CHK-05', 'No', 'Resume A (Java Backend)', 'Scale Metrics',
  'Add concrete throughput metrics (e.g., RPS, daily Kafka events, sub-50ms p99 latency) to Order Management & Payments',
  'High — Differentiates Senior SWE from mid-level applicants', 5
),
(
  'CHK-06', 'No', 'Resume B (GenAI / Agentic)', 'Live Portfolio Proof',
  'Add public GitHub repo or architecture diagram link for the Multi-Agent SRE / RAG system',
  'Critical — AI hiring managers strongly prioritize verifiable agent architectures', 6
),
(
  'CHK-07', 'No', 'Resume B (GenAI / Agentic)', 'LLM Evaluation & Guardrails',
  'Mention LLM evaluation frameworks (RAGAS/LangSmith), token latency/cost optimization, and hallucination guardrails',
  'High — Key interview & ATS keywords for Senior GenAI Engineers in 2026', 7
),
(
  'CHK-08', 'No', 'Germany / EU Dossier', 'Visa Documentation',
  'Download Anabin H+ printouts for MANIT Bhopal (NIT Bhopal) and B.Tech Computer Science degree',
  'High — Speeds up German EU Blue Card & Opportunity Card verification', 8
),
(
  'CHK-09', 'No', 'Canada / UK / AU Dossier', 'Language & ECA Readiness',
  'Book IELTS General / PTE Academic and initiate WES Educational Credential Assessment (ECA)',
  'Medium — Required for Canada Express Entry & Australia/UK points', 9
),
(
  'CHK-10', 'No', 'Both Resumes', 'ATS Formatting',
  'Keep 1-page or clean 2-page single-column PDF without photo, DOB, or marital status',
  'High — Complies with US, UK, Canada, Ireland, and EU multinational ATS standards', 10
)
ON CONFLICT (id) DO UPDATE SET
  resume_track = EXCLUDED.resume_track,
  category     = EXCLUDED.category,
  action_item  = EXCLUDED.action_item,
  impact       = EXCLUDED.impact,
  sort_order   = EXCLUDED.sort_order,
  updated_at   = NOW();

-- ============================================================================
-- 5. Seed Existing Tracked Applications (Preserves any user edits via DO NOTHING)
-- ============================================================================
INSERT INTO public.job_applications (
  id, country, iso_code, region, city, work_mode, company, role,
  resume_track, status, priority, visa_sponsorship, visa_type,
  salary_range, currency, applied_date, follow_up_date, job_url,
  contact_recruiter, notes, excitement_score
) VALUES
(
  'APP-019', 'Netherlands', 'NL', 'Europe', 'Amsterdam', 'On-site / Relocation',
  'Booking.com', 'Senior Software Engineer — Core Java & FinTech',
  'Java / Spring Boot Backend', 'Wishlist', 'High', 'Verified Sponsor',
  'Highly Skilled Migrant (HSM) + 30% Ruling', '€95,000 - €120,000', 'EUR',
  '2026-10-31', '2026-11-07', 'https://careers.booking.com',
  'Direct Portal + Recruiter Reachout',
  'Highlight Airtel Payment Bank 99% transactional consistency & Resilience4j circuit breakers.', 5
),
(
  'APP-018', 'Switzerland', 'CH', 'Europe', 'Basel', 'On-site / Relocation',
  'Roche', 'Senior Backend & AI Platform Engineer',
  'GenAI / Agentic AI', 'Wishlist', 'Medium', 'Sponsorship Available',
  'Non-EU B Permit', 'CHF 130,000 - CHF 155,000', 'CHF',
  '2026-10-31', '2026-11-11', 'https://careers.roche.com',
  'SwissDevJobs / Portal',
  'Highlight FastAPI + Java hybrid backend and RAG knowledge base automation.', 4
)
ON CONFLICT (id) DO NOTHING;

COMMIT;
