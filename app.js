/**
 * Worldwide Job Application & Visa Intelligence Command Center
 * Candidate: Anil Kumar (Senior Software Engineer — Java 21 / Spring Boot 3 & GenAI / Agentic AI)
 * Backend: Supabase PostgreSQL (rudjdpnltcenvipuqerf.supabase.co) — Works natively on GitHub Pages
 * Scope: Supports all 195+ countries worldwide + Global Remote
 */

const DEFAULT_SUPABASE_URL = "https://rudjdpnltcenvipuqerf.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_2XQbGiSW2aQmFqGmTEs60Q_95W_7r5s";

const DEFAULT_AZURE_OPENAI_ENDPOINT =
  "https://airtel-azure-openai-test.openai.azure.com/openai/deployments/gpt-5-chat-himanshuL/chat/completions?api-version=2025-01-01-preview";
// Stored in localStorage via AI Companion Settings so GitHub Push Protection (GH013) never blocks git push
const DEFAULT_AZURE_OPENAI_KEY = "";
const DEFAULT_LATEX_PDF_ENDPOINT =
  "https://vaggbwodamenwlbxdicj.supabase.co/functions/v1/latexToPdfConverter";
const DEFAULT_LATEX_PDF_KEY = "sb_publishable_vL400zAs6QdUjeAzCoe-wA_A2RZHeUS";
const FALLBACK_YTOTECH_PDF_ENDPOINT = "https://latex.ytotech.com/builds/sync";

const STORAGE_KEYS = {
  sbConfig: "ak_world_supabase_config_v1",
  appsCache: "ak_world_apps_cache_v1",
  strategiesCache: "ak_world_strategies_cache_v1",
  countryRemarks: "ak_world_country_remarks_v1",
  checklistCache: "ak_world_checklist_cache_v1",
  aiConfig: "ak_world_ai_tailor_config_v1",
  theme: "color-scheme"
};

const KANBAN_STAGES = [
  "Wishlist",
  "Applied",
  "OA / Coding Test",
  "Recruiter Screen",
  "Technical Interview",
  "Final Round",
  "Offer",
  "Rejected"
];

/**
 * ISO 3166-1 alpha-2 codes mapped to macro regions, default currencies, and standard skilled work visa routes.
 * Combined with Intl.DisplayNames, this supports all 195+ countries worldwide automatically.
 */
const WORLD_ISO_DIRECTORY = {
  // Europe
  DE: { region: "Europe", currency: "EUR", visa: "EU Blue Card (§18g) / Opportunity Card" },
  NL: { region: "Europe", currency: "EUR", visa: "Highly Skilled Migrant (IND Sponsor + 30% Ruling)" },
  GB: { region: "Europe", currency: "GBP", visa: "Skilled Worker Visa / Global Talent Visa" },
  IE: { region: "Europe", currency: "EUR", visa: "Critical Skills Employment Permit (CSEP)" },
  CH: { region: "Europe", currency: "CHF", visa: "Non-EU Work Permit (L / B Quota)" },
  SE: { region: "Europe", currency: "SEK", visa: "Work Permit / EU Blue Card" },
  FR: { region: "Europe", currency: "EUR", visa: "Passeport Talent (Salarié Qualifié / French Tech Visa)" },
  ES: { region: "Europe", currency: "EUR", visa: "Highly Qualified Professional (HQP) + Beckham Law" },
  PL: { region: "Europe", currency: "PLN", visa: "EU Blue Card / Work Permit Type A" },
  EE: { region: "Europe", currency: "EUR", visa: "Top Specialist Work Permit / EU Blue Card" },
  DK: { region: "Europe", currency: "DKK", visa: "Pay Limit Scheme / Fast-Track Scheme" },
  NO: { region: "Europe", currency: "NOK", visa: "Skilled Worker Residence Permit" },
  FI: { region: "Europe", currency: "EUR", visa: "Specialist Permit (Fast-Track 14 Days)" },
  LU: { region: "Europe", currency: "EUR", visa: "EU Blue Card (Luxembourg)" },
  AT: { region: "Europe", currency: "EUR", visa: "Red-White-Red Card / EU Blue Card" },
  BE: { region: "Europe", currency: "EUR", visa: "Single Permit (Highly Qualified) / EU Blue Card" },
  PT: { region: "Europe", currency: "EUR", visa: "Tech Visa / Highly Qualified Activity (D3)" },
  IT: { region: "Europe", currency: "EUR", visa: "EU Blue Card + Lavoratori Impatriati Tax Regime" },
  CZ: { region: "Europe", currency: "CZK", visa: "Employee Card / EU Blue Card" },
  RO: { region: "Europe", currency: "RON", visa: "Highly Skilled Worker Permit / EU Blue Card" },
  GR: { region: "Europe", currency: "EUR", visa: "EU Blue Card / Digital Nomad Visa" },
  HU: { region: "Europe", currency: "HUF", visa: "EU Blue Card / Hungarian Card" },
  // Americas
  US: { region: "Americas", currency: "USD", visa: "L-1B / H-1B / O-1A / Remote USD Contractor" },
  CA: { region: "Americas", currency: "CAD", visa: "Global Talent Stream (2-Week LMIA) / Express Entry" },
  MX: { region: "Americas", currency: "MXN", visa: "Temporary Resident Work Visa" },
  BR: { region: "Americas", currency: "BRL", visa: "VITEM V Work Visa / Digital Nomad" },
  AR: { region: "Americas", currency: "USD", visa: "Work Visa / Remote Contractor" },
  CL: { region: "Americas", currency: "CLP", visa: "Visa Sujeta a Contrato / Tech Visa" },
  CO: { region: "Americas", currency: "COP", visa: "M Work Visa / Digital Nomad" },
  CR: { region: "Americas", currency: "USD", visa: "Work Permit / Digital Nomad" },
  UY: { region: "Americas", currency: "USD", visa: "Provisional Identity Card / Residency" },
  // Asia-Pacific
  SG: { region: "Asia-Pacific", currency: "SGD", visa: "Employment Pass (COMPASS +20 AI/Tech Bonus)" },
  AU: { region: "Asia-Pacific", currency: "AUD", visa: "Skills in Demand (Subclass 482) / PR 189/190" },
  JP: { region: "Asia-Pacific", currency: "JPY", visa: "Engineer / Specialist in Humanities + HSP Fast-Track PR" },
  NZ: { region: "Asia-Pacific", currency: "NZD", visa: "Accredited Employer Work Visa (AEWV — Green List Tier 1)" },
  KR: { region: "Asia-Pacific", currency: "KRW", visa: "E-7 Special Occupation Visa" },
  HK: { region: "Asia-Pacific", currency: "HKD", visa: "General Employment Policy (GEP) / Top Talent Pass" },
  TW: { region: "Asia-Pacific", currency: "TWD", visa: "Taiwan Employment Gold Card" },
  MY: { region: "Asia-Pacific", currency: "MYR", visa: "Employment Pass (Category I) / DE Rantau" },
  TH: { region: "Asia-Pacific", currency: "THB", visa: "LTR Visa (Высококвалифицированный / BOI Work Permit)" },
  ID: { region: "Asia-Pacific", currency: "IDR", visa: "KITAS Work Permit" },
  VN: { region: "Asia-Pacific", currency: "USD", visa: "LD2 Work Permit" },
  PH: { region: "Asia-Pacific", currency: "PHP", visa: "9(g) Pre-Arranged Employment Visa" },
  IN: { region: "Asia-Pacific", currency: "INR", visa: "Citizen / Local Work Authorization" },
  // Middle East & Africa
  AE: { region: "Middle East & Africa", currency: "AED", visa: "UAE Employment Visa / 10-Year Golden Visa (0% Tax)" },
  SA: { region: "Middle East & Africa", currency: "SAR", visa: "Work Visa (Iqama) / Special Talent Residency (0% Tax)" },
  QA: { region: "Middle East & Africa", currency: "QAR", visa: "Work Residence Permit (0% Tax)" },
  BH: { region: "Middle East & Africa", currency: "BHD", visa: "Work Visa / Golden Residency" },
  OM: { region: "Middle East & Africa", currency: "OMR", visa: "Employment Visa" },
  KW: { region: "Middle East & Africa", currency: "KWD", visa: "Article 18 Work Visa" },
  IL: { region: "Middle East & Africa", currency: "ILS", visa: "B-1 Hi-Tech Work Visa" },
  ZA: { region: "Middle East & Africa", currency: "ZAR", visa: "Critical Skills Work Visa" },
  MU: { region: "Middle East & Africa", currency: "MUR", visa: "Occupation Permit (Professional)" },
  KE: { region: "Middle East & Africa", currency: "KES", visa: "Class D Work Permit" },
  NG: { region: "Middle East & Africa", currency: "USD", visa: "STR / CERPAC Work Permit" },
  EG: { region: "Middle East & Africa", currency: "USD", visa: "Work Permit" }
};

// All 195+ sovereign country ISO codes for generating the full world datalist
const ALL_ISO_CODES = [
  "AF","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BT",
  "BO","BA","BW","BR","BN","BG","BF","BI","CV","KH","CM","CA","CF","TD","CL","CN","CO","KM","CG","CR",
  "HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ","ET","FJ","FI","FR","GA",
  "GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HK","HU","IS","IN","ID","IR","IQ","IE",
  "IL","IT","JM","JP","JO","KZ","KE","KI","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MG",
  "MW","MY","MV","ML","MT","MH","MR","MU","MX","FM","MD","MC","MN","ME","MA","MZ","MM","NA","NR","NP",
  "NL","NZ","NI","NE","NG","KP","MK","NO","OM","PK","PW","PA","PG","PY","PE","PH","PL","PT","QA","RO",
  "RU","RW","KN","LC","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","KR",
  "SS","ES","LK","SD","SR","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM","TV",
  "UG","UA","AE","GB","US","UY","UZ","VU","VA","VE","VN","YE","ZM","ZW"
];

function isoToFlag(iso) {
  if (!iso || iso === "GLOBAL" || iso.length !== 2) return "🌐";
  const codePoints = [...iso.toUpperCase()].map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const COUNTRY_NAME_OVERRIDES = {
  GB: "United Kingdom",
  US: "USA",
  AE: "UAE",
  KR: "South Korea",
  CZ: "Czechia"
};

function buildWorldDirectory() {
  const displayNames =
    typeof Intl !== "undefined" && Intl.DisplayNames
      ? new Intl.DisplayNames(["en"], { type: "region" })
      : null;

  const mapByName = new Map();

  // Special entry for Global Remote
  mapByName.set("remote (global)", {
    country: "Remote (Global)",
    iso_code: "GLOBAL",
    flag: "🌐",
    region: "Global Remote",
    currency: "USD",
    visa: "Remote Contractor / Employer of Record (Deel / Remote.com)"
  });

  for (const iso of ALL_ISO_CODES) {
    const rawName = COUNTRY_NAME_OVERRIDES[iso] || (displayNames ? displayNames.of(iso) : iso);
    if (!rawName) continue;
    const meta = WORLD_ISO_DIRECTORY[iso] || {
      region: "Europe",
      currency: "USD",
      visa: "Skilled Worker / Employer-Sponsored Work Visa"
    };
    const entry = {
      country: rawName,
      iso_code: iso,
      flag: isoToFlag(iso),
      region: meta.region,
      currency: meta.currency,
      visa: meta.visa
    };
    mapByName.set(rawName.toLowerCase(), entry);
  }

  // Common aliases
  mapByName.set("united states", mapByName.get("usa"));
  mapByName.set("uk", mapByName.get("united kingdom"));
  mapByName.set("united arab emirates", mapByName.get("uae"));

  return mapByName;
}

const WORLD_DIRECTORY = buildWorldDirectory();

function resolveCountryMeta(countryName) {
  const clean = String(countryName || "").trim();
  if (!clean) {
    return {
      country: "Unknown",
      iso_code: "GLOBAL",
      flag: "🌍",
      region: "Europe",
      currency: "USD",
      visa: "Employer-Sponsored Work Permit"
    };
  }
  const hit = WORLD_DIRECTORY.get(clean.toLowerCase());
  if (hit) return hit;

  // Check if a strategy exists in state
  const strat = state.strategies.find(
    (s) => s.country.toLowerCase() === clean.toLowerCase()
  );
  if (strat) {
    return {
      country: strat.country,
      iso_code: strat.iso_code || "GLOBAL",
      flag: strat.flag || "🌍",
      region: strat.region || "Europe",
      currency: "USD",
      visa: strat.primary_visa_route || "Skilled Worker Visa"
    };
  }

  return {
    country: clean,
    iso_code: clean.slice(0, 2).toUpperCase(),
    flag: "🌍",
    region: "Europe",
    currency: "USD",
    visa: "Skilled Worker / Employer-Sponsored Permit"
  };
}

/**
 * Default seed data matching update_sql_schema.sql (24 global hubs + 2 tracked applications + 10 checklist items)
 */
const DEFAULT_STRATEGIES = [
  {
    country: "Germany",
    iso_code: "DE",
    flag: "🇩🇪",
    region: "Europe",
    tier: "Tier 1 — High ROI",
    primary_visa_route: "EU Blue Card (§18g) / Opportunity Card (Chancenkarte)",
    min_salary_threshold: "€45,934/yr (IT Shortage) | Target: €78k–€105k",
    tax_relocation_perk: "PR in 21 months (B1 German) or 27 months (A1); NIT Bhopal is Anabin H+",
    best_resume_track: "Both (Resume A: Java/Spring & Resume B: GenAI)",
    top_job_portals: "LinkedIn, Honeypot.io, Relocate.me, StepStone.de, BerlinStartupJobs",
    tier_1_sponsor_companies: "Zalando, Delivery Hero, SAP, N26, Trade Republic, SumUp, Scout24, Celonis",
    application_tip: "Include 'Eligible for Fast-Track EU Blue Card (Anabin H+ recognized B.Tech CSE, NIT Bhopal)' in your CV header."
  },
  {
    country: "Netherlands",
    iso_code: "NL",
    flag: "🇳🇱",
    region: "Europe",
    tier: "Tier 1 — High ROI",
    primary_visa_route: "Highly Skilled Migrant (Kennismigrant — IND Recognized Sponsor)",
    min_salary_threshold: "€5,688/mo (30+) or €4,171/mo (<30) | Target: €85k–€120k",
    tax_relocation_perk: "30% Expat Tax Ruling (27% tax-free income allowance for 5 years when hired from abroad)",
    best_resume_track: "Resume A: Java 21 / Spring Boot / Kafka (plus GenAI for Booking/Uber)",
    top_job_portals: "LinkedIn, Honeypot.io, Relocate.me, Techleap.nl, Welcome-to-NL",
    tier_1_sponsor_companies: "Booking.com, Adyen, Uber, ASML, ING, ABN AMRO, Miro, Elastic, Databricks, Mollie",
    application_tip: "Emphasize Java 21 Virtual Threads, Kafka, and 99.9% uptime at 350M+ scale. Only apply to IND Recognized Sponsors."
  },
  {
    country: "United Kingdom",
    iso_code: "GB",
    flag: "🇬🇧",
    region: "Europe",
    tier: "Tier 1 — High ROI",
    primary_visa_route: "Skilled Worker Visa / Global Talent Visa (Tech Nation)",
    min_salary_threshold: "£38,700+ (Going Rate) | Target: £80,000–£125,000",
    tax_relocation_perk: "English-speaking FinTech & AI capital of Europe; ILR in 5 years (3 yrs on Global Talent)",
    best_resume_track: "Both (FinTech loves Java/Kafka; London AI startups love Multi-Agent SRE)",
    top_job_portals: "LinkedIn, Otta.com (Welcome to the Jungle), Cord.co, Hired, CWJobs",
    tier_1_sponsor_companies: "Revolut, Monzo, Wise, Starling Bank, JP Morgan, Barclays, Deliveroo, DeepMind, Checkout.com",
    application_tip: "Use Cord.co and Otta.com to message engineering managers directly with Visa Sponsorship filters enabled."
  },
  {
    country: "Ireland",
    iso_code: "IE",
    flag: "🇮🇪",
    region: "Europe",
    tier: "Tier 1 — High ROI",
    primary_visa_route: "Critical Skills Employment Permit (CSEP)",
    min_salary_threshold: "€38,000 (ICT Degree) / €64,000 | Target: €80k–€115k",
    tax_relocation_perk: "Stamp 4 PR after just 2 years on CSEP; immediate spouse work rights; English-speaking EU hub",
    best_resume_track: "Both (Big Tech European HQs + Enterprise SaaS)",
    top_job_portals: "LinkedIn, IrishJobs.ie, Otta.com, Relocate.me",
    tier_1_sponsor_companies: "Stripe, Intercom, Workday, HubSpot, Mastercard, Amazon/AWS Dublin, Microsoft, Fidelity",
    application_tip: "Highlight SOC code 2136 (Programmers and Software Development Professionals) eligibility for fast-track CSEP."
  },
  {
    country: "United Arab Emirates",
    iso_code: "AE",
    flag: "🇦🇪",
    region: "Middle East & Africa",
    tier: "Tier 1 — High ROI",
    primary_visa_route: "Employer-Sponsored Work Visa / 10-Year UAE Golden Visa (AI & Software)",
    min_salary_threshold: "AED 30,000+/mo for Golden Visa | Target: AED 28,000–45,000/mo",
    tax_relocation_perk: "0% Personal Income Tax; 3.5-hour flight from India; massive sovereign AI investment",
    best_resume_track: "Both (Careem/Talabat/Noon for Java; G42/AI71/TII for GenAI)",
    top_job_portals: "LinkedIn, Naukrigulf, Bayt, GulfTalent, Dubai Careers",
    tier_1_sponsor_companies: "Careem, Talabat, Noon, G42, Core42, AI71, Technology Innovation Institute (TII), Emirates NBD, Mashreq",
    application_tip: "Your Airtel telecom + payments experience maps 1:1 to Careem, Noon, e&, and Mashreq digital banking."
  },
  {
    country: "Singapore",
    iso_code: "SG",
    flag: "🇸🇬",
    region: "Asia-Pacific",
    tier: "Tier 1 — High ROI",
    primary_visa_route: "Employment Pass (EP via COMPASS Points Framework)",
    min_salary_threshold: "SGD 5,600+/mo (age-indexed) | Target: SGD 10,500–16,000/mo",
    tax_relocation_perk: "+20 COMPASS Shortage Occupation List (SOL) bonus points for AI Engineer; low 7–15% effective tax",
    best_resume_track: "Resume B: GenAI / Agentic AI (maximizes COMPASS SOL bonus) + Resume A for FinTech",
    top_job_portals: "MyCareersFuture.gov.sg, NodeFlair, LinkedIn, TechInAsia Jobs, Glints",
    tier_1_sponsor_companies: "Grab, Shopee (Sea), GoTo, DBS Bank, Standard Chartered, Singtel, Coupang, ByteDance, Wise",
    application_tip: "NIT Bhopal earns +10/+20 COMPASS qualification points and AI roles earn +20 SOL bonus points."
  },
  {
    country: "Australia",
    iso_code: "AU",
    flag: "🇦🇺",
    region: "Asia-Pacific",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "Skills in Demand Visa (Subclass 482) / Skilled Independent PR (189 / 190)",
    min_salary_threshold: "AUD 73,150+ (TSMIT) / AUD 135k (Specialist) | Target: AUD 140k–185k",
    tax_relocation_perk: "Direct PR pathways (189/190) via ACS Skill Assessment (ANZSCO 261313 Software Engineer)",
    best_resume_track: "Resume A: Java / Spring Boot / AWS / Microservices",
    top_job_portals: "Seek.com.au, LinkedIn, Hatch, Prosple",
    tier_1_sponsor_companies: "Atlassian, Canva, Afterpay/Block, Xero, WiseTech Global, Macquarie Group, Commonwealth Bank, Telstra",
    application_tip: "Search Seek.com.au with '482 sponsorship' or 'visa sponsorship' and initiate ACS Skill Assessment early."
  },
  {
    country: "Canada",
    iso_code: "CA",
    flag: "🇨🇦",
    region: "Americas",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "Global Talent Stream (GTS 2-Week Work Permit) / Express Entry STEM Category",
    min_salary_threshold: "CAD 80,000+ | Target: CAD 125,000–170,000",
    tax_relocation_perk: "2-week expedited GTS LMIA processing for Category A/B tech employers; clear PR & citizenship path",
    best_resume_track: "Both (US companies hiring in Toronto/Vancouver hubs)",
    top_job_portals: "LinkedIn, JobBank.gc.ca, Wellfound, VanHack, BuiltInToronto",
    tier_1_sponsor_companies: "Shopify, Cohere, Wealthsimple, Clio, Amazon Vancouver/Toronto, Uber, Stripe, DoorDash, RBC",
    application_tip: "Apply toVanHack.com talent pool and US tech companies expanding near-shore engineering teams in Toronto/Vancouver."
  },
  {
    country: "Japan",
    iso_code: "JP",
    flag: "🇯🇵",
    region: "Asia-Pacific",
    tier: "Tier 1 — High ROI",
    primary_visa_route: "Engineer Visa / Highly Skilled Professional (HSP Point System)",
    min_salary_threshold: "¥7,000,000 – ¥14,000,000/yr",
    tax_relocation_perk: "Fast-track Permanent Residency in just 1 year (80+ HSP points); English-only engineering hubs",
    best_resume_track: "Resume A: Java 21 / Spring Boot / Kafka (FinTech & E-Commerce)",
    top_job_portals: "TokyoDev.com, JapanDev.com, LinkedIn, Wantedly",
    tier_1_sponsor_companies: "PayPay, Rakuten, Woven by Toyota, Mercari, SmartNews, Line Yahoo, Money Forward",
    application_tip: "PayPay (founded with Paytm technology) and Rakuten actively sponsor Indian Java/Spring Boot & Kafka engineers with zero Japanese required."
  },
  {
    country: "Sweden",
    iso_code: "SE",
    flag: "🇸🇪",
    region: "Europe",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "Swedish Work Permit / EU Blue Card",
    min_salary_threshold: "SEK 55,000 – 78,000/mo",
    tax_relocation_perk: "100% English-speaking tech ecosystem; world-class engineering culture",
    best_resume_track: "Both (Resume A: Java/Backend & Resume B: GenAI)",
    top_job_portals: "LinkedIn, Relocate.me, Hubbster, StartupTools Sweden",
    tier_1_sponsor_companies: "Spotify, Klarna, King, Tink (Visa), Ericsson, Sinch, Volvo Cars Tech, Truecaller",
    application_tip: "Truecaller (huge India userbase, Stockholm HQ) and Ericsson (telecom) value your Airtel 350M+ scale background."
  },
  {
    country: "France",
    iso_code: "FR",
    flag: "🇫🇷",
    region: "Europe",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "Passeport Talent (Salarié Qualifié / French Tech Visa)",
    min_salary_threshold: "€43,243+/yr | Target: €70,000–€105,000",
    tax_relocation_perk: "4-year multi-annual Passeport Talent permit with immediate family work rights; 30% Impatriate tax regime",
    best_resume_track: "Resume B: GenAI / Agentic AI (Paris is Europe's #1 GenAI hub)",
    top_job_portals: "Welcome to the Jungle (WTTJ), LinkedIn, FrenchTech Jobs",
    tier_1_sponsor_companies: "Mistral AI, Hugging Face, Datadog Paris, BlaBlaCar, Doctolib, Qonto, Criteo, Contentsquare",
    application_tip: "Use Welcome to the Jungle (wttj.co) and filter by English-speaking teams in Paris."
  },
  {
    country: "Spain",
    iso_code: "ES",
    flag: "🇪🇸",
    region: "Europe",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "Highly Qualified Professional (HQP) Visa (UGE-CE Fast-Track 20 Days)",
    min_salary_threshold: "€40,000+/yr | Target: €65,000–€95,000",
    tax_relocation_perk: "Beckham Law (flat 24% income tax rate for 6 years); 20-business-day UGE visa approval",
    best_resume_track: "Resume A: Java 21 / Spring Boot / Distributed Systems",
    top_job_portals: "LinkedIn, Relocate.me, Otta.com, Manfred",
    tier_1_sponsor_companies: "Glovo, Cabify, Revolut Barcelona/Madrid, N26 Barcelona, TravelPerk, Datadog Madrid, Amazon Spain",
    application_tip: "Barcelona and Madrid are booming engineering hubs for US/UK companies offering fast 20-day HQP work permits."
  },
  {
    country: "Poland",
    iso_code: "PL",
    flag: "🇵🇱",
    region: "Europe",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "EU Blue Card / Work Permit Type A",
    min_salary_threshold: "PLN 18,000–30,000/mo (€50k–€85k/yr)",
    tax_relocation_perk: "High disposable income due to low cost of living; Google, Box, Stripe & Revolut core European engineering centers",
    best_resume_track: "Both (Cloud, Java Microservices, and AI Engineering)",
    top_job_portals: "JustJoin.it, NoFluffJobs.com, LinkedIn",
    tier_1_sponsor_companies: "Google Warsaw/Krakow, Revolut Krakow, Box, Allegro, Bolt, Cisco, DocPlanner",
    application_tip: "JustJoin.it and NoFluffJobs show transparent salary bands on 100% of job listings."
  },
  {
    country: "Estonia",
    iso_code: "EE",
    flag: "🇪🇪",
    region: "Europe",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "Top Specialist Work Permit / EU Blue Card",
    min_salary_threshold: "€60,000–€90,000/yr",
    tax_relocation_perk: "Exempt from immigration quota for IT & startups; 20% flat income tax; 100% digital governance",
    best_resume_track: "Resume A: Java / Spring Boot / FinTech",
    top_job_portals: "WorkInEstonia.com, LinkedIn, MeetFrank",
    tier_1_sponsor_companies: "Wise (Tallinn HQ), Bolt (Tallinn HQ), Pipedrive, Veriff, Playtech, Starship Technologies",
    application_tip: "Wise and Bolt relocate hundreds of engineers to Tallinn every year with full relocation packages."
  },
  {
    country: "Switzerland",
    iso_code: "CH",
    flag: "🇨🇭",
    region: "Europe",
    tier: "Tier 3 — Selective / High Reward",
    primary_visa_route: "Non-EU Work Permit (L / B Quota Permit)",
    min_salary_threshold: "CHF 130,000–210,000/yr",
    tax_relocation_perk: "Highest engineering compensation in Europe; low cantonal taxes (15–22% in Zurich/Zug)",
    best_resume_track: "Resume B: GenAI / Agentic AI + Distributed Systems",
    top_job_portals: "SwissDevJobs.ch, LinkedIn, Jobs.ch, ETH GetHired",
    tier_1_sponsor_companies: "Google Zurich, Apple Zurich, Meta, UBS, Swisscom, SonarSource, Proton, GetYourGuide",
    application_tip: "Focus onSwissDevJobs.ch with 'Visa Sponsorship' filter or enter via Germany/Netherlands EU Blue Card first."
  },
  {
    country: "USA",
    iso_code: "US",
    flag: "🇺🇸",
    region: "Americas",
    tier: "Tier 3 — Selective / High Reward",
    primary_visa_route: "L-1B Intracompany Transfer / H-1B Lottery / O-1A / Remote USD Contractor",
    min_salary_threshold: "$140,000–$220,000+ (On-site) | $75k–$130k (Remote USD from India)",
    tax_relocation_perk: "Deepest AI & venture market globally; Remote USD roles via Deel require zero visa wait",
    best_resume_track: "Resume B: GenAI / Multi-Agent Orchestration (CrewAI / ReAct / RAG)",
    top_job_portals: "Y Combinator (workatastartup.com), Wellfound, LinkedIn, BuiltIn, Turing",
    tier_1_sponsor_companies: "YC AI Startups, Uber, Amazon, Walmart Global Tech, Salesforce, Stripe, Rippling, Deel",
    application_tip: "Dual strategy: (1) Pitch YC founders on workatastartup.com for Remote USD Agentic AI roles, or (2) Join a US MNC in India/Europe for L-1B transfer."
  },
  {
    country: "Saudi Arabia",
    iso_code: "SA",
    flag: "🇸🇦",
    region: "Middle East & Africa",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "Work Visa (Iqama) / Premium Residency (Special Talent)",
    min_salary_threshold: "SAR 28,000–45,000/mo",
    tax_relocation_perk: "0% Personal Income Tax; Vision 2030 giga-projects & national AI infrastructure buildout",
    best_resume_track: "Both (STC/Tamara/Foodics for Java; SDAIA/HUMAIN/Aramco Digital for GenAI)",
    top_job_portals: "LinkedIn, Bayt, GulfTalent, Naukrigulf",
    tier_1_sponsor_companies: "STC, Tamara, Salla, Foodics, Aramco Digital, NEOM (TONOMUS), Mozn, Elm",
    application_tip: "STC and Aramco Digital actively recruit senior telecom/fintech engineers with Airtel-scale microservice experience."
  },
  {
    country: "New Zealand",
    iso_code: "NZ",
    flag: "🇳🇿",
    region: "Asia-Pacific",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "Accredited Employer Work Visa (AEWV) — Green List Tier 1 (Straight to Residence)",
    min_salary_threshold: "NZD 115,000–155,000/yr",
    tax_relocation_perk: "Software Engineer & AI Specialist are on Green List Tier 1 (Straight to Residence PR immediately upon job offer)",
    best_resume_track: "Resume A: Java / Spring Boot / Cloud Microservices",
    top_job_portals: "Seek.co.nz, LinkedIn, WorkHere.co.nz, TradeMe Jobs",
    tier_1_sponsor_companies: "Xero, Rocket Lab, Pushpay, Datacom, Vista Group, ASB Bank, ANZ New Zealand",
    application_tip: "Mention Green List Tier 1 (Straight to Residence) eligibility when speaking with Accredited Employers in Auckland and Wellington."
  },
  {
    country: "Denmark",
    iso_code: "DK",
    flag: "🇩🇰",
    region: "Europe",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "Pay Limit Scheme / Fast-Track Scheme (SIRI Certified Companies)",
    min_salary_threshold: "DKK 48,000–70,000/mo (€80k–€110k/yr)",
    tax_relocation_perk: "Fast-Track Scheme allows starting work immediately; 37-hour work week",
    best_resume_track: "Resume A: Java / Spring Boot / Distributed Systems",
    top_job_portals: "LinkedIn, Jobindex.dk, TheHub.io, WorkInDenmark.dk",
    tier_1_sponsor_companies: "Maersk, Danske Bank, LEGO Group Digital, Zendesk Copenhagen, Pleo, Lunar, Trustpilot",
    application_tip: "Filter for SIRI Fast-Track certified employers in Copenhagen for 14-day work permit turnaround."
  },
  {
    country: "Norway",
    iso_code: "NO",
    flag: "🇳🇴",
    region: "Europe",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "Skilled Worker Residence Permit (UDI)",
    min_salary_threshold: "NOK 700,000–1,050,000/yr",
    tax_relocation_perk: "PAYE / 10% Standard Deduction guidance; half-tax in December",
    best_resume_track: "Resume A: Java / Cloud / Backend",
    top_job_portals: "Finn.no, LinkedIn, WorkInNorway.no",
    tier_1_sponsor_companies: "Schibsted, Opera, Cognite, Oda, DNB, Vipps MobilePay, Telenor",
    application_tip: "Telenor (telecom HQ in Oslo) and Vipps MobilePay (payments) strongly value your Airtel Thanks & telecom backend track record."
  },
  {
    country: "Finland",
    iso_code: "FI",
    flag: "🇫🇮",
    region: "Europe",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "Specialist Residence Permit (Fast-Track 14 Days)",
    min_salary_threshold: "€4,000–€6,800/mo (€55k–€85k/yr)",
    tax_relocation_perk: "14-day Fast-Track visa processing for Specialists and family members",
    best_resume_track: "Both (Wolt/Supercell/Nokia)",
    top_job_portals: "Jobly.fi, WorkInFinland.com, LinkedIn, TheHub.io",
    tier_1_sponsor_companies: "Wolt (DoorDash), Supercell, Nokia, Rovio, Smartly.io, Oura, Aiven, RELEX Solutions",
    application_tip: "Wolt and Aiven in Helsinki run 100% in English and provide full relocation + 14-day fast-track permits."
  },
  {
    country: "Luxembourg",
    iso_code: "LU",
    flag: "🇱🇺",
    region: "Europe",
    tier: "Tier 1 — High ROI",
    primary_visa_route: "EU Blue Card (Luxembourg)",
    min_salary_threshold: "€58,968+/yr | Target: €85,000–€125,000",
    tax_relocation_perk: "Amazon EU HQ location; low EU income taxes + Impatriate tax exemption; free public transport",
    best_resume_track: "Resume A: Java 21 / Spring Boot / Distributed Systems",
    top_job_portals: "LinkedIn, Jobs.lu, Moovijob.com",
    tier_1_sponsor_companies: "Amazon EU HQ, PayPal Europe, SES Satellites, Ferrero Tech, Docler Holding, European Investment Bank",
    application_tip: "Amazon Luxembourg is one of the largest single sponsors of Indian Senior Java SDEs relocating to Europe."
  },
  {
    country: "Qatar",
    iso_code: "QA",
    flag: "🇶🇦",
    region: "Middle East & Africa",
    tier: "Tier 2 — Strong Fit",
    primary_visa_route: "Employer-Sponsored Work Residence Permit",
    min_salary_threshold: "QAR 24,000–38,000/mo",
    tax_relocation_perk: "0% Personal Income Tax; housing & flight allowances often included",
    best_resume_track: "Resume A: Java / Spring Boot / Enterprise & Telecom",
    top_job_portals: "LinkedIn, GulfTalent, Bayt",
    tier_1_sponsor_companies: "Ooredoo, Qatar Airways Digital, Snoonu, QNB, Commercial Bank of Qatar",
    application_tip: "Ooredoo (telecom) and Snoonu (super-app) match your Airtel Thanks app & telecom architecture experience."
  },
  {
    country: "Remote (Global)",
    iso_code: "GLOBAL",
    flag: "🌐",
    region: "Global Remote",
    tier: "Tier 1 — High ROI",
    primary_visa_route: "No Visa Required (Remote USD/EUR Contractor or EOR via Deel / Remote.com)",
    min_salary_threshold: "$70,000–$140,000 USD/yr",
    tax_relocation_perk: "Earn USD/EUR while living in India; eligible for Section 44ADA presumptive taxation in India (up to ₹75L)",
    best_resume_track: "Resume B: GenAI / Agentic AI + Resume A: Distributed Backend",
    top_job_portals: "workatastartup.com (YC), Wellfound, Remotive, WeWorkRemotely, Arc.dev, Turing",
    tier_1_sponsor_companies: "GitLab, Canonical, Automattic, Elastic, Grafana Labs, Kraken, PostHog, YC AI Startups",
    application_tip: "Filter YC Work at a Startup for 'Remote (Any)' and pitch your production CrewAI/ReAct SRE agent + Java 21 backend experience."
  }
];

const DEFAULT_APPLICATIONS = [
  {
    id: "APP-019",
    country: "Netherlands",
    iso_code: "NL",
    region: "Europe",
    city: "Amsterdam",
    work_mode: "On-site / Relocation",
    company: "Booking.com",
    role: "Senior Backend Engineer (Java 21 / Spring Boot 3)",
    resume_track: "Java / Spring Boot Backend",
    status: "Applied",
    priority: "High",
    visa_sponsorship: "Verified Sponsor",
    visa_type: "Highly Skilled Migrant (30% Tax Ruling)",
    salary_range: "€95,000 - €118,000",
    currency: "EUR",
    applied_date: "2026-10-31",
    follow_up_date: "2026-11-07",
    job_url: "https://careers.booking.com",
    contact_recruiter: "Amsterdam Tech Recruiting — IND Recognized Sponsor",
    notes: "Highlighted Airtel Thanks 350M+ user scale, Java 21 Virtual Threads migration (40% latency drop), and Kafka/Aerospike.",
    excitement_score: 5
  },
  {
    id: "APP-018",
    country: "Germany",
    iso_code: "DE",
    region: "Europe",
    city: "Berlin",
    work_mode: "On-site / Relocation",
    company: "Zalando",
    role: "Senior Backend Engineer (Java / Distributed Systems)",
    resume_track: "Java / Spring Boot Backend",
    status: "Applied",
    priority: "High",
    visa_sponsorship: "Verified Sponsor",
    visa_type: "EU Blue Card (Anabin H+)",
    salary_range: "€85,000 - €102,000",
    currency: "EUR",
    applied_date: "2026-10-30",
    follow_up_date: "2026-11-06",
    job_url: "https://jobs.zalando.com",
    contact_recruiter: "Berlin Platform Talent Acquisition",
    notes: "Emphasized NIT Bhopal Anabin H+ recognition for fast-track EU Blue Card and Resilience4j circuit breaker architecture.",
    excitement_score: 5
  }
];

const DEFAULT_CHECKLIST = [
  { id: "CHK-01", done: "Yes", resume_track: "Both Resumes", category: "Contact & Header", action_item: "Keep +91-8989845501, anilkumarmzp1@gmail.com, LinkedIn, and GitHub links clickable in PDF header", impact: "Mandatory for international recruiter outreach", sort_order: 1 },
  { id: "CHK-02", done: "No", resume_track: "Both Resumes", category: "Visa Eligibility Line", action_item: "Add subtitle: 'Open to International Relocation | Eligible for EU Blue Card (Anabin H+) / HSM / EP'", impact: "Removes #1 recruiter hesitation within 3 seconds", sort_order: 2 },
  { id: "CHK-03", done: "No", resume_track: "Both Resumes", category: "Scale Context (Airtel)", action_item: "Add '(India's Top Tier-1 Telecom, 350M+ Users)' next to Airtel Digital Limited", impact: "European/US/APAC recruiters immediately grasp traffic scale", sort_order: 3 },
  { id: "CHK-04", done: "No", resume_track: "Resume A (Java Backend)", category: "Concurrency Proof", action_item: "Quantify peak RPS / Kafka messages/sec handled by Java 21 Virtual Threads migration", impact: "Top screening criterion at Booking.com, Adyen, Zalando & Grab", sort_order: 4 },
  { id: "CHK-05", done: "No", resume_track: "Resume B (GenAI / Agentic)", category: "Production AI Metrics", action_item: "Specify LLM eval metrics, token latency, and guardrails for the Multi-Agent SRE system (90% MTTR reduction)", impact: "Distinguishes real production AI engineering from toy wrappers", sort_order: 5 },
  { id: "CHK-06", done: "No", resume_track: "Germany / EU", category: "Anabin H+ Printout", action_item: "Download Anabin H+ PDF confirmation for Maulana Azad National Institute of Technology (NIT Bhopal)", impact: "Fast-tracks German EU Blue Card & Chancenkarte approval", sort_order: 6 },
  { id: "CHK-07", done: "No", resume_track: "Australia / Canada", category: "Skill / Degree Assessment", action_item: "Prepare NIT Bhopal transcripts + Airtel reference letters for ACS (Australia) and WES ECA (Canada)", impact: "Required for Subclass 482/189/190 and Express Entry STEM draws", sort_order: 7 },
  { id: "CHK-08", done: "No", resume_track: "GitHub Portfolio", category: "Public Reference Repo", action_item: "Pin 2 clean repos: (1) Multi-Agent SRE Orchestrator (CrewAI/ReAct) & (2) Spring Boot 3 Java 21 Virtual Threads Demo", impact: "3x higher interview conversion with European & YC hiring managers", sort_order: 8 },
  { id: "CHK-09", done: "No", resume_track: "LinkedIn Profile", category: "Global Recruiter SEO", action_item: "Set 'Open to Work' (Recruiters Only) for Amsterdam, Berlin, London, Dublin, Dubai, Singapore & Tokyo", impact: "Triggers inbound InMails from international sourcers", sort_order: 9 },
  { id: "CHK-10", done: "No", resume_track: "Outreach Cadence", category: "Referral Rule of 48h", action_item: "Send tailored LinkedIn note (from Outreach Studio) to 1 NIT Bhopal/Airtel alum + 1 Hiring Manager within 24h of applying", impact: "Referrals convert at 12-18% vs 1.5% for cold portal applications", sort_order: 10 }
];

// Base LaTeX resumes are fetched exclusively from the Supabase `public.latex_resumes` table (no hardcoded JS resumes)
const state = {
  supabaseUrl: DEFAULT_SUPABASE_URL,
  supabaseKey: DEFAULT_SUPABASE_KEY,
  sbClient: null,
  dbConnected: false,
  lastSyncError: null,
  applications: [],
  strategies: [],
  checklist: [],
  latexResumes: [],
  aiConfig: {
    endpoint: DEFAULT_AZURE_OPENAI_ENDPOINT,
    apiKey: DEFAULT_AZURE_OPENAI_KEY,
    pdfEndpoint: DEFAULT_LATEX_PDF_ENDPOINT,
    pdfKey: DEFAULT_LATEX_PDF_KEY
  },
  tailor: {
    running: false,
    jobUrl: "",
    rawPageText: "",
    jobDetails: null,
    gateResults: [],
    selectedResumeId: "",
    tailoredTex: "",
    finalEvaluation: null,
    pdfBlob: null,
    pdfBlobUrl: null,
    pdfFilename: "AnilKumarResume.pdf",
    companionHistory: []
  },
  selectedRegion: "ALL",
  selectedCountry: "ALL",
  activeView: "table",
  searchQuery: "",
  resumeFilter: "ALL",
  statusFilter: "ALL",
  priorityFilter: "ALL",
  strategySearchQuery: ""
};

let toastTimer = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getTodayIso() {
  return new Date().toISOString().slice(0, 10);
}

function addDaysIso(dateStr, days) {
  const base = dateStr ? new Date(dateStr) : new Date();
  if (Number.isNaN(base.getTime())) return getTodayIso();
  base.setDate(base.getDate() + days);
  return base.toISOString().slice(0, 10);
}

function showToast(message) {
  const popover = document.getElementById("toast-popover");
  const msgEl = document.getElementById("toast-message");
  if (!popover || !msgEl) return;
  msgEl.textContent = message;
  try {
    if (!popover.matches(":popover-open")) {
      popover.showPopover();
    }
  } catch {
    popover.style.display = "flex";
  }
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    try {
      popover.hidePopover();
    } catch {
      popover.style.display = "none";
    }
  }, 4500);
}

/* ==========================================================================
   SUPABASE CLIENT & POSTGREST LAYER (Supports sb_publishable_ & anon keys)
   ========================================================================== */

function loadSavedSupabaseConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.sbConfig);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.url) state.supabaseUrl = parsed.url.trim().replace(/\/+$/, "");
      if (parsed.key) state.supabaseKey = parsed.key.trim();
    }
  } catch {
    // Use defaults
  }
}

function initSupabaseClient() {
  loadSavedSupabaseConfig();
  if (window.supabase && typeof window.supabase.createClient === "function") {
    try {
      state.sbClient = window.supabase.createClient(state.supabaseUrl, state.supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false }
      });
    } catch (err) {
      console.warn("Supabase createClient fallback to direct REST:", err);
      state.sbClient = null;
    }
  }
}

function buildRestHeaders(preferHeader = "return=representation") {
  const headers = {
    apikey: state.supabaseKey,
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  if (preferHeader) {
    headers.Prefer = preferHeader;
  }
  // Only include Bearer token if key is a standard JWT (starts with eyJ)
  if (state.supabaseKey.startsWith("eyJ")) {
    headers.Authorization = `Bearer ${state.supabaseKey}`;
  }
  return headers;
}

async function sbSelect(table, queryParams = "select=*") {
  const url = `${state.supabaseUrl}/rest/v1/${table}?${queryParams}`;
  const res = await fetch(url, {
    method: "GET",
    headers: buildRestHeaders("")
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const err = new Error(errBody.message || errBody.hint || `HTTP ${res.status}`);
    err.code = errBody.code || String(res.status);
    err.details = errBody;
    throw err;
  }
  return res.json();
}

async function sbUpsert(table, rows, onConflict = "id") {
  const payload = Array.isArray(rows) ? rows : [rows];
  const url = `${state.supabaseUrl}/rest/v1/${table}?on_conflict=${encodeURIComponent(onConflict)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: buildRestHeaders("resolution=merge-duplicates,return=representation"),
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const err = new Error(errBody.message || `HTTP ${res.status}`);
    err.code = errBody.code || String(res.status);
    throw err;
  }
  return res.json();
}

async function sbDelete(table, column, value) {
  const url = `${state.supabaseUrl}/rest/v1/${table}?${encodeURIComponent(column)}=eq.${encodeURIComponent(value)}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: buildRestHeaders("return=minimal")
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || `HTTP ${res.status}`);
  }
  return true;
}

function updateSupabaseStatusBadge(status, text) {
  const pill = document.getElementById("supabase-backend-status");
  const dot = document.getElementById("supabase-status-dot");
  const label =
    document.getElementById("backend-status-text") || document.getElementById("supabase-status-text");
  if (pill) {
    pill.classList.toggle("connected", status === "connected");
    pill.classList.toggle("warning", status === "warning");
  }
  if (dot) {
    dot.className = "status-dot";
    if (status === "connected") dot.classList.add("connected");
    if (status === "warning") dot.classList.add("warning");
  }
  if (label) {
    label.textContent = text;
  }
}

function getCountryRemarksCache() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEYS.countryRemarks) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function setCountryRemarkInCache(countryName, remarkText) {
  const key = String(countryName || "").trim().toLowerCase();
  if (!key) return;
  try {
    const map = getCountryRemarksCache();
    map[key] = String(remarkText || "");
    localStorage.setItem(STORAGE_KEYS.countryRemarks, JSON.stringify(map));
  } catch {
    // Ignore storage quota errors
  }
}

function hydrateStrategiesWithRemarks(strategiesList) {
  const remarksMap = getCountryRemarksCache();
  let cacheUpdated = false;
  const result = (Array.isArray(strategiesList) ? strategiesList : []).map((s) => {
    const key = String(s.country || "").trim().toLowerCase();
    const dbRemark = typeof s.user_remarks === "string" ? s.user_remarks : "";
    let finalRemark = dbRemark;
    if (dbRemark.trim() !== "") {
      if (remarksMap[key] !== dbRemark) {
        remarksMap[key] = dbRemark;
        cacheUpdated = true;
      }
    } else if (key && Object.prototype.hasOwnProperty.call(remarksMap, key)) {
      finalRemark = String(remarksMap[key] || "");
    }
    return {
      ...s,
      user_remarks: finalRemark
    };
  });
  if (cacheUpdated) {
    try {
      localStorage.setItem(STORAGE_KEYS.countryRemarks, JSON.stringify(remarksMap));
    } catch {
      // Ignore storage quota errors
    }
  }
  return result;
}

function saveLocalCache() {
  try {
    localStorage.setItem(STORAGE_KEYS.appsCache, JSON.stringify(state.applications));
    localStorage.setItem(STORAGE_KEYS.strategiesCache, JSON.stringify(state.strategies));
    localStorage.setItem(STORAGE_KEYS.checklistCache, JSON.stringify(state.checklist));
    localStorage.setItem(STORAGE_KEYS.aiConfig, JSON.stringify(state.aiConfig));
  } catch {
    // Ignore storage quota errors
  }
}

function normalizeResumeRow(row) {
  if (!row || typeof row !== "object") return null;
  const id = String(row.id || row.ID || "").trim();
  const latexCode = String(row.latex_code || row.latex_source || row.tex || row.content || "").trim();
  if (!id || !latexCode) return null;
  return {
    id,
    name: String(row.name || row.title || id).trim(),
    track_type: String(row.track_type || row.resume_track || row.track || "Custom Engineering Track").trim(),
    latex_code: latexCode,
    is_default: Boolean(row.is_default)
  };
}

/**
 * Fetches base LaTeX resumes exclusively from the Supabase `public.latex_resumes` table.
 * Never falls back to hardcoded resumes or localStorage.
 */
async function fetchResumesFromSupabase(showFeedbackToast = false) {
  try {
    const dbResumes = await sbSelect("latex_resumes", "select=*&order=created_at.asc");
    state.latexResumes = Array.isArray(dbResumes)
      ? dbResumes.map(normalizeResumeRow).filter(Boolean)
      : [];

    if (state.latexResumes.length > 0) {
      const currentSelected = state.latexResumes.find((r) => r.id === state.tailor.selectedResumeId);
      const activeResume = currentSelected || state.latexResumes.find((r) => r.is_default) || state.latexResumes[0];
      state.tailor.selectedResumeId = activeResume.id;

      const editorEl = document.getElementById("tailor-latex-editor");
      if (editorEl && !editorEl.value.trim()) {
        editorEl.value = activeResume.latex_code;
      }
      const badgeEl = document.getElementById("tailor-selected-resume-badge");
      if (badgeEl && (!badgeEl.textContent || badgeEl.textContent === "RES-JAVA")) {
        badgeEl.textContent = activeResume.name;
      }
    } else {
      state.tailor.selectedResumeId = "";
    }

    populateResumeTrackControls();
    renderResumeShowcaseGrid();
    renderLatexResumesManagerList();

    if (showFeedbackToast) {
      showToast(`Fetched ${state.latexResumes.length} base LaTeX resume(s) from Supabase!`);
    }
    return state.latexResumes;
  } catch (err) {
    console.warn("Supabase latex_resumes fetch error:", err.message);
    state.latexResumes = [];
    populateResumeTrackControls();
    renderResumeShowcaseGrid();
    renderLatexResumesManagerList();
    if (showFeedbackToast) {
      showToast(`Could not fetch resumes from Supabase: ${err.message}`);
    }
    return [];
  }
}

function loadLocalCacheOrDefaults() {
  try {
    const apps = JSON.parse(localStorage.getItem(STORAGE_KEYS.appsCache) || "null");
    const strats = JSON.parse(localStorage.getItem(STORAGE_KEYS.strategiesCache) || "null");
    const chk = JSON.parse(localStorage.getItem(STORAGE_KEYS.checklistCache) || "null");
    const aiCfg = JSON.parse(localStorage.getItem(STORAGE_KEYS.aiConfig) || "null");

    state.applications = Array.isArray(apps) && apps.length > 0 ? apps : structuredClone(DEFAULT_APPLICATIONS);
    state.strategies = hydrateStrategiesWithRemarks(
      Array.isArray(strats) && strats.length > 0 ? strats : structuredClone(DEFAULT_STRATEGIES)
    );
    state.checklist = Array.isArray(chk) && chk.length > 0 ? chk : structuredClone(DEFAULT_CHECKLIST);
    // Resumes are never loaded from local cache or hardcoded defaults; only from Supabase
    state.latexResumes = [];
    if (aiCfg && typeof aiCfg === "object") {
      state.aiConfig = {
        endpoint: aiCfg.endpoint || DEFAULT_AZURE_OPENAI_ENDPOINT,
        apiKey: aiCfg.apiKey || DEFAULT_AZURE_OPENAI_KEY,
        pdfEndpoint: aiCfg.pdfEndpoint || DEFAULT_LATEX_PDF_ENDPOINT,
        pdfKey: aiCfg.pdfKey || DEFAULT_LATEX_PDF_KEY
      };
    }
  } catch {
    state.applications = structuredClone(DEFAULT_APPLICATIONS);
    state.strategies = hydrateStrategiesWithRemarks(structuredClone(DEFAULT_STRATEGIES));
    state.checklist = structuredClone(DEFAULT_CHECKLIST);
    state.latexResumes = [];
  }
}

async function fetchAllFromSupabase(showFeedbackToast = false) {
  updateSupabaseStatusBadge("warning", "Syncing with Supabase...");
  try {
    const [apps, strats, chk] = await Promise.all([
      sbSelect("job_applications", "select=*&order=applied_date.desc.nullslast,created_at.desc"),
      sbSelect("country_strategies", "select=*&order=tier.asc,country.asc"),
      sbSelect("resume_checklist", "select=*&order=sort_order.asc,id.asc")
    ]);

    // Fetch latex_resumes exclusively from Supabase
    await fetchResumesFromSupabase(false);

    state.dbConnected = true;
    state.lastSyncError = null;

    // If database tables were just created and are completely empty, seed them automatically!
    if (apps.length === 0 && strats.length === 0 && chk.length === 0) {
      await seedDefaultDataToSupabase(false);
      return;
    }

    state.applications = apps.map(normalizeAppRow);
    state.strategies = hydrateStrategiesWithRemarks(
      strats.length > 0 ? strats : structuredClone(DEFAULT_STRATEGIES)
    );
    state.checklist = chk.length > 0 ? chk : structuredClone(DEFAULT_CHECKLIST);

    saveLocalCache();
    updateSupabaseStatusBadge(
      "connected",
      `Supabase Live (${state.applications.length} apps · ${state.latexResumes.length} resumes)`
    );
    renderAll();
    if (showFeedbackToast) {
      showToast(
        `Synced ${state.applications.length} applications, ${state.latexResumes.length} resumes & ${state.strategies.length} country playbooks from Supabase!`
      );
    }
  } catch (err) {
    state.dbConnected = false;
    state.lastSyncError = err;
    console.warn("Supabase fetch notice:", err.message);
    loadLocalCacheOrDefaults();
    // Still attempt to fetch resumes directly from Supabase in case only another table failed
    await fetchResumesFromSupabase(false);

    const isMissingTable =
      String(err.code) === "42P01" ||
      String(err.code) === "PGRST205" ||
      /relation .* does not exist|Could not find the table/i.test(err.message);

    if (isMissingTable) {
      updateSupabaseStatusBadge("warning", "Supabase: Run sql_schema.sql (Click to Setup)");
      if (showFeedbackToast) {
        showToast("Tables not created yet — run sql_schema.sql in your Supabase SQL Editor.");
      }
    } else {
      updateSupabaseStatusBadge("warning", "Offline Cache Mode (Click for Supabase Status)");
    }
    renderAll();
  }
}

async function seedDefaultDataToSupabase(notifyUser = true) {
  try {
    updateSupabaseStatusBadge("warning", "Seeding Supabase tables...");
    await sbUpsert("country_strategies", DEFAULT_STRATEGIES, "country");
    await sbUpsert("resume_checklist", DEFAULT_CHECKLIST, "id");
    if (state.applications.length === 0) {
      await sbUpsert("job_applications", DEFAULT_APPLICATIONS, "id");
    } else {
      await sbUpsert("job_applications", state.applications, "id");
    }
    await fetchAllFromSupabase(false);
    if (notifyUser) {
      showToast("Seeded 24 global country playbooks, checklist & applications to Supabase!");
    }
  } catch (err) {
    showToast(`Could not seed Supabase: ${err.message}. Please run sql_schema.sql in Supabase SQL Editor first.`);
  }
}

function subscribeRealtime() {
  if (!state.sbClient || typeof state.sbClient.channel !== "function") return;
  try {
    state.sbClient
      .channel("public-job-tracker-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "job_applications" }, () => {
        fetchAllFromSupabase(false);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "country_strategies" }, () => {
        fetchAllFromSupabase(false);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "resume_checklist" }, () => {
        fetchAllFromSupabase(false);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "latex_resumes" }, () => {
        fetchResumesFromSupabase(false);
      })
      .subscribe();
  } catch {
    // Realtime optional
  }
}

function normalizeAppRow(row) {
  const countryName = row.country || row.Country || "Germany";
  const meta = resolveCountryMeta(countryName);
  return {
    id: row.id || row.ID || generateNextAppId(),
    country: countryName,
    iso_code: row.iso_code || meta.iso_code,
    region: row.region || row.Region || meta.region,
    city: row.city || row.City || "",
    work_mode: row.work_mode || row.Work_Mode || "On-site / Relocation",
    company: row.company || row.Company || "",
    role: row.role || row.Role || "",
    resume_track: row.resume_track || row.Resume_Track || "Java / Spring Boot Backend",
    status: row.status || row.Status || "Applied",
    priority: row.priority || row.Priority || "High",
    visa_sponsorship: row.visa_sponsorship || row.Visa_Sponsorship || "Verified Sponsor",
    visa_type: row.visa_type || row.Visa_Type || meta.visa,
    salary_range: row.salary_range || row.Salary_Range || "",
    currency: row.currency || row.Currency || meta.currency,
    applied_date: row.applied_date || row.Applied_Date || getTodayIso(),
    follow_up_date: row.follow_up_date || row.Follow_Up_Date || addDaysIso(getTodayIso(), 7),
    job_url: row.job_url || row.Job_URL || "",
    contact_recruiter: row.contact_recruiter || row.Contact_Recruiter || "",
    notes: row.notes || row.Notes || "",
    excitement_score: Number(row.excitement_score || row.Excitement_Score || 5)
  };
}

function generateNextAppId() {
  let maxNum = 0;
  for (const app of state.applications) {
    const match = String(app.id || "").match(/(\d+)/);
    if (match) {
      const n = Number.parseInt(match[1], 10);
      if (n > maxNum) maxNum = n;
    }
  }
  return `APP-${String(maxNum + 1).padStart(3, "0")}`;
}

/* ==========================================================================
   WORLD COUNTRIES DATALIST & FILTERING
   ========================================================================== */

function populateWorldCountriesDatalist() {
  const datalist = document.getElementById("world-countries-datalist");
  if (!datalist) return;

  const entries = Array.from(WORLD_DIRECTORY.values());
  // Sort with playbooks first, then alphabetical
  const playbookSet = new Set(DEFAULT_STRATEGIES.map((s) => s.country.toLowerCase()));
  entries.sort((a, b) => {
    const aHas = playbookSet.has(a.country.toLowerCase()) ? 0 : 1;
    const bHas = playbookSet.has(b.country.toLowerCase()) ? 0 : 1;
    if (aHas !== bHas) return aHas - bHas;
    return a.country.localeCompare(b.country);
  });

  const seen = new Set();
  const optionsHtml = [];
  for (const item of entries) {
    if (seen.has(item.country)) continue;
    seen.add(item.country);
    optionsHtml.push(
      `<option value="${escapeHtml(item.country)}">${escapeHtml(item.flag)} ${escapeHtml(item.region)} — ${escapeHtml(item.visa)}</option>`
    );
  }
  datalist.innerHTML = optionsHtml.join("");
}

function getFilteredApplications() {
  const q = state.searchQuery.trim().toLowerCase();
  return state.applications.filter((app) => {
    if (state.selectedRegion !== "ALL" && app.region !== state.selectedRegion) {
      return false;
    }
    if (state.selectedCountry !== "ALL" && app.country.toLowerCase() !== state.selectedCountry.toLowerCase()) {
      return false;
    }
    if (state.resumeFilter !== "ALL" && app.resume_track !== state.resumeFilter) {
      return false;
    }
    if (state.statusFilter !== "ALL" && app.status !== state.statusFilter) {
      return false;
    }
    if (state.priorityFilter !== "ALL" && app.priority !== state.priorityFilter) {
      return false;
    }
    if (q) {
      const haystack = [
        app.id,
        app.country,
        app.region,
        app.city,
        app.company,
        app.role,
        app.resume_track,
        app.status,
        app.visa_sponsorship,
        app.visa_type,
        app.contact_recruiter,
        app.notes
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/* ==========================================================================
   RENDERING: REGION CHIPS, COUNTRY PILLS, STRATEGY BANNER & KPIS
   ========================================================================== */

function renderRegionAndCountryPills() {
  // Update active state on region chips
  document.querySelectorAll(".region-chip").forEach((btn) => {
    const isMatch = btn.dataset.region === state.selectedRegion;
    btn.classList.toggle("active", isMatch);
  });

  const container = document.getElementById("country-pills-container");
  if (!container) return;

  // Count applications per country (respecting region filter if active)
  const countsByCountry = new Map();
  for (const app of state.applications) {
    if (state.selectedRegion !== "ALL" && app.region !== state.selectedRegion) continue;
    countsByCountry.set(app.country, (countsByCountry.get(app.country) || 0) + 1);
  }

  // Build union of countries from applications + country_strategies + any currently selected country
  const countryMap = new Map();
  for (const strat of state.strategies) {
    if (state.selectedRegion !== "ALL" && strat.region !== state.selectedRegion) continue;
    countryMap.set(strat.country.toLowerCase(), {
      country: strat.country,
      flag: strat.flag || resolveCountryMeta(strat.country).flag,
      region: strat.region,
      count: countsByCountry.get(strat.country) || 0
    });
  }

  for (const app of state.applications) {
    if (state.selectedRegion !== "ALL" && app.region !== state.selectedRegion) continue;
    const key = app.country.toLowerCase();
    if (!countryMap.has(key)) {
      const meta = resolveCountryMeta(app.country);
      countryMap.set(key, {
        country: app.country,
        flag: meta.flag,
        region: app.region || meta.region,
        count: countsByCountry.get(app.country) || 0
      });
    }
  }

  if (state.selectedCountry !== "ALL") {
    const key = state.selectedCountry.toLowerCase();
    if (!countryMap.has(key)) {
      const meta = resolveCountryMeta(state.selectedCountry);
      countryMap.set(key, {
        country: meta.country,
        flag: meta.flag,
        region: meta.region,
        count: countsByCountry.get(meta.country) || 0
      });
    }
  }

  const list = Array.from(countryMap.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.country.localeCompare(b.country);
  });

  const totalInRegion = state.applications.filter(
    (a) => state.selectedRegion === "ALL" || a.region === state.selectedRegion
  ).length;

  const tabAppsBadge = document.getElementById("tab-count-apps");
  if (tabAppsBadge) tabAppsBadge.textContent = String(state.applications.length);
  const tabHubsBadge = document.getElementById("tab-count-hubs");
  if (tabHubsBadge) tabHubsBadge.textContent = String(state.strategies.length);

  const pillsHtml = [
    `<button type="button" class="country-pill ${state.selectedCountry === "ALL" ? "active" : ""}" data-country="ALL">
      <span>🌍 All Countries</span>
      <span class="pill-count">${totalInRegion}</span>
    </button>`
  ];

  let hiddenZeroCount = 0;
  for (const item of list) {
    const isActive = state.selectedCountry.toLowerCase() === item.country.toLowerCase();
    if (!state.showAllCountryPills && item.count === 0 && !isActive) {
      hiddenZeroCount++;
      continue;
    }
    pillsHtml.push(
      `<button type="button" class="country-pill ${isActive ? "active" : ""}" data-country="${escapeHtml(item.country)}">
        <span>${escapeHtml(item.flag)} ${escapeHtml(item.country)}</span>
        <span class="pill-count">${item.count}</span>
      </button>`
    );
  }

  if (hiddenZeroCount > 0 || state.showAllCountryPills) {
    pillsHtml.push(
      `<button type="button" class="country-pill country-pill-toggle" data-toggle-all-countries="true">
        <span>${state.showAllCountryPills ? "▴ Hide 0-App Hubs" : `+ ${hiddenZeroCount} More Visa Hubs`}</span>
      </button>`
    );
  }

  container.innerHTML = pillsHtml.join("");
}

function renderActiveCountryBanner() {
  const banner = document.getElementById("active-country-banner");
  if (!banner) return;

  if (state.selectedCountry === "ALL") {
    banner.hidden = true;
    return;
  }

  const strat = state.strategies.find(
    (s) => s.country.toLowerCase() === state.selectedCountry.toLowerCase()
  );
  const meta = resolveCountryMeta(state.selectedCountry);

  const flag = strat?.flag || meta.flag;
  const country = strat?.country || meta.country;
  const region = strat?.region || meta.region;
  const tier = strat?.tier || "Worldwide Target Market";
  const visa = strat?.primary_visa_route || meta.visa;
  const salary = strat?.min_salary_threshold || `Local Market Compensation (${meta.currency})`;
  const tax = strat?.tax_relocation_perk || "Eligible for international skilled worker relocation";
  const portals = strat?.top_job_portals || "LinkedIn, Relocate.me, Wellfound, Company Career Portals";
  const companies = strat?.tier_1_sponsor_companies || "Global Tech MNCs, FinTechs & High-Growth Startups";
  const tip =
    strat?.application_tip ||
    `Highlight your 4+ YoE at Airtel (350M+ scale), NIT Bhopal B.Tech CSE degree, and dual Java 21 / Agentic AI skill set. Click 'Customize Country Playbook' to save custom rules for ${country} to Supabase.`;

  banner.hidden = false;
  banner.innerHTML = `
    <div class="banner-top">
      <div class="banner-title">
        <span style="font-size: 1.75rem">${escapeHtml(flag)}</span>
        <h3>${escapeHtml(country)} — Visa &amp; Relocation Intelligence</h3>
        <span class="tier-badge">${escapeHtml(region)} · ${escapeHtml(tier)}</span>
      </div>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        <button type="button" class="btn btn-secondary btn-sm" data-edit-playbook="${escapeHtml(country)}">
          ✏️ Customize ${escapeHtml(country)} Playbook
        </button>
        <button type="button" class="btn btn-primary btn-sm" data-quick-add-country="${escapeHtml(country)}">
          ➕ Add ${escapeHtml(country)} Application
        </button>
      </div>
    </div>
    <div class="banner-grid">
      <div class="banner-item">
        <span>Primary Visa / Work Permit Route</span>
        <strong>${escapeHtml(visa)}</strong>
      </div>
      <div class="banner-item">
        <span>Salary Benchmark / Threshold</span>
        <strong>${escapeHtml(salary)}</strong>
      </div>
      <div class="banner-item">
        <span>Tax / PR / Relocation Advantage</span>
        <strong>${escapeHtml(tax)}</strong>
      </div>
      <div class="banner-item">
        <span>Top Job Portals</span>
        <strong>${escapeHtml(portals)}</strong>
      </div>
      <div class="banner-item">
        <span>Tier-1 Visa Sponsor Employers</span>
        <strong>${escapeHtml(companies)}</strong>
      </div>
      <div class="banner-item">
        <span>Insider Application Strategy</span>
        <strong>${escapeHtml(tip)}</strong>
      </div>
    </div>
    <div class="strategy-remarks-box" style="margin-top: 0.75rem;">
      <div class="strategy-remarks-head">
        <label class="strategy-remarks-label" for="banner-remark-box-${escapeHtml(meta.iso_code || country.replace(/\s+/g, "-"))}">
          📝 My Remarks for ${escapeHtml(country)}
        </label>
        <div class="strategy-remarks-controls">
          <span class="strategy-remarks-status ${strat?.user_remarks ? "is-saved" : ""}" data-remark-status="${escapeHtml(country)}">
            ${strat?.user_remarks ? "✓ Saved" : "Auto-saves on blur"}
          </span>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-save-country-remark="${escapeHtml(country)}"
            title="Save your personal remarks for ${escapeHtml(country)}"
          >
            💾 Save Remark
          </button>
        </div>
      </div>
      <textarea
        id="banner-remark-box-${escapeHtml(meta.iso_code || country.replace(/\s+/g, "-"))}"
        class="country-remarks-input"
        data-country-remarks-input="${escapeHtml(country)}"
        rows="2"
        placeholder="Add your personal remarks, contacts, visa notes, or target salary expectations for ${escapeHtml(country)}..."
      >${escapeHtml(strat?.user_remarks || getCountryRemarksCache()[country.toLowerCase()] || "")}</textarea>
    </div>
  `;
}

const PRESET_RESUME_TRACKS = [
  "Java / Spring Boot Backend",
  "GenAI / Agentic AI Engineer",
  "Distributed Systems / Cloud / SRE",
  "Full-Stack (React + Java/Python)",
  "Python / FastAPI Backend",
  "Data Engineering / Kafka Streaming",
  "FinTech / High-Throughput Payments",
  "Staff / Tech Lead / Architecture"
];

function getResumeTrackBadge(trackRaw) {
  const track = String(trackRaw || "Java / Spring Boot Backend").trim();
  const lower = track.toLowerCase();

  if (/genai|agent|llm|rag|ai|ml/.test(lower)) {
    return {
      badgeClass: "badge-genai",
      icon: "🤖",
      shortLabel: "🤖 GenAI / Agentic",
      kanbanLabel: "🤖 GenAI",
      fullLabel: track
    };
  }
  if (/sre|distributed|cloud|platform|devops|infra|k8s|kubernetes|reliability/.test(lower)) {
    return {
      badgeClass: "badge-sre",
      icon: "☁️",
      shortLabel: "☁️ DistSys / SRE",
      kanbanLabel: "☁️ SRE / Cloud",
      fullLabel: track
    };
  }
  if (/full[- ]?stack|react|frontend|typescript|node|next/.test(lower)) {
    return {
      badgeClass: "badge-fullstack",
      icon: "🌐",
      shortLabel: "🌐 Full-Stack",
      kanbanLabel: "🌐 Full-Stack",
      fullLabel: track
    };
  }
  if (/python|fastapi|django|flask/.test(lower)) {
    return {
      badgeClass: "badge-genai",
      icon: "🐍",
      shortLabel: "🐍 Python / FastAPI",
      kanbanLabel: "🐍 Python",
      fullLabel: track
    };
  }
  if (/data|kafka|stream|spark|pipeline|analytics/.test(lower)) {
    return {
      badgeClass: "badge-sre",
      icon: "📊",
      shortLabel: "📊 Data / Streaming",
      kanbanLabel: "📊 Data",
      fullLabel: track
    };
  }
  if (/fintech|payment|trading|bank|ledger/.test(lower)) {
    return {
      badgeClass: "badge-java",
      icon: "💳",
      shortLabel: "💳 FinTech / Payments",
      kanbanLabel: "💳 FinTech",
      fullLabel: track
    };
  }
  if (/staff|principal|lead|architect|manager|em/.test(lower)) {
    return {
      badgeClass: "badge-fullstack",
      icon: "🏛️",
      shortLabel: "🏛️ Staff / Lead",
      kanbanLabel: "🏛️ Staff",
      fullLabel: track
    };
  }
  if (/java|spring/.test(lower)) {
    return {
      badgeClass: "badge-java",
      icon: "☕",
      shortLabel: "☕ Java 21 / Spring",
      kanbanLabel: "☕ Java",
      fullLabel: track
    };
  }
  const truncated = track.length > 22 ? `${track.slice(0, 20)}…` : track;
  return {
    badgeClass: "badge-custom",
    icon: "📄",
    shortLabel: `📄 ${truncated}`,
    kanbanLabel: `📄 ${truncated}`,
    fullLabel: track
  };
}

function getAllKnownResumeTracks() {
  const seen = new Set();
  const result = [];
  const addTrack = (t) => {
    const clean = String(t || "").trim();
    if (!clean) return;
    const key = clean.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    result.push(clean);
  };

  for (const r of state.latexResumes || []) {
    addTrack(r.track_type);
  }
  for (const preset of PRESET_RESUME_TRACKS) {
    addTrack(preset);
  }
  for (const app of state.applications || []) {
    addTrack(app.resume_track);
  }
  return result;
}

function populateResumeTrackControls() {
  const allTracks = getAllKnownResumeTracks();

  // 1. Populate global <datalist id="resume-tracks-datalist">
  const datalist = document.getElementById("resume-tracks-datalist");
  if (datalist) {
    datalist.innerHTML = allTracks
      .map((tr) => {
        const badge = getResumeTrackBadge(tr);
        const matchingRes = (state.latexResumes || []).find(
          (r) => String(r.track_type || "").toLowerCase() === tr.toLowerCase()
        );
        const sub = matchingRes ? `Base LaTeX: ${matchingRes.name}` : "Custom / Specialized Track";
        return `<option value="${escapeHtml(tr)}">${escapeHtml(badge.icon)} ${escapeHtml(sub)}</option>`;
      })
      .join("");
  }

  // 2. Populate pipeline filter dropdown <select id="filter-resume">
  const filterSelect = document.getElementById("filter-resume");
  if (filterSelect) {
    const currentVal = state.resumeFilter || "ALL";
    const optionsHtml = [
      `<option value="ALL">All Resume Tracks (${allTracks.length} Active)</option>`,
      ...allTracks.map((tr) => {
        const badge = getResumeTrackBadge(tr);
        return `<option value="${escapeHtml(tr)}">${escapeHtml(badge.icon)} ${escapeHtml(tr)}</option>`;
      })
    ];
    filterSelect.innerHTML = optionsHtml.join("");
    filterSelect.value = allTracks.includes(currentVal) ? currentVal : "ALL";
  }

  // 3. Populate header track chips (#header-track-chips)
  const headerChips = document.getElementById("header-track-chips");
  if (headerChips) {
    const resumes = state.latexResumes || [];
    if (resumes.length === 0) {
      headerChips.innerHTML = `<span class="track-chip" title="Fetched from Supabase public.latex_resumes">Supabase Resumes (0)</span>`;
    } else {
      const chipHtml = resumes.slice(0, 5).map((r) => {
        const badge = getResumeTrackBadge(r.track_type);
        return `<span class="track-chip ${badge.badgeClass === "badge-genai" ? "track-genai" : "track-java"}" title="${escapeHtml(r.name)} (${escapeHtml(r.track_type)})">${escapeHtml(badge.shortLabel)}</span>`;
      });
      if (resumes.length > 5) {
        chipHtml.push(`<span class="track-chip track-genai">+${resumes.length - 5} More</span>`);
      }
      headerChips.innerHTML = chipHtml.join("");
    }
  }
}

function renderResumeShowcaseGrid() {
  const grid = document.getElementById("resume-tracks-showcase-grid");
  const countBadge = document.getElementById("showcase-resume-count");
  if (countBadge) {
    countBadge.textContent = String(state.latexResumes.length);
  }
  const savedBadge = document.getElementById("saved-resumes-count-badge");
  if (savedBadge) {
    savedBadge.textContent = String(state.latexResumes.length);
  }
  if (!grid) return;

  if (!state.latexResumes || state.latexResumes.length === 0) {
    grid.innerHTML = `
      <article class="resume-showcase-card" style="grid-column: 1 / -1;">
        <div class="resume-card-header">
          <span class="badge badge-custom">🗄️ Supabase Database (public.latex_resumes)</span>
        </div>
        <h4>No Base LaTeX Resumes Found in Supabase</h4>
        <p class="cell-sub" style="margin-bottom:0.75rem;">
          Hardcoded resumes have been removed. All base LaTeX resumes are fetched directly from the <code>public.latex_resumes</code> table in your Supabase database. Run <code>update_sql_schema.sql</code> in the Supabase SQL Editor or add a new resume variant below.
        </p>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button type="button" class="btn btn-primary btn-sm" data-open-resume-manager="true">
            ➕ Add Resume to Supabase
          </button>
          <button type="button" class="btn btn-secondary btn-sm" data-sync-supabase-resumes="true">
            🔄 Sync Resumes from Supabase
          </button>
        </div>
      </article>
    `;
    return;
  }

  grid.innerHTML = (state.latexResumes || [])
    .map((r) => {
      const badge = getResumeTrackBadge(r.track_type);
      const appCount = (state.applications || []).filter(
        (a) => String(a.resume_track || "").toLowerCase() === String(r.track_type || "").toLowerCase()
      ).length;

      // Extract a clean preview of bullet points or skills from LaTeX code
      const itemMatches = Array.from(String(r.latex_code || "").matchAll(/\\item\s+([^\n]+)/g))
        .slice(0, 3)
        .map((m) =>
          m[1]
            .replace(/\\textbf\{([^}]*)\}/g, "$1")
            .replace(/\\textit\{([^}]*)\}/g, "$1")
            .replace(/\\%/g, "%")
            .replace(/\\&/g, "&")
            .replace(/\\[a-zA-Z]+/g, "")
            .replace(/[{}]/g, "")
            .trim()
        );

      const bulletsHtml =
        itemMatches.length > 0
          ? `<ul class="resume-highlights">${itemMatches.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`
          : `<p class="cell-sub">Custom LaTeX template (${r.latex_code.length.toLocaleString()} chars)</p>`;

      return `
        <article class="resume-showcase-card ${badge.badgeClass === "badge-genai" ? "genai-card" : "java-card"}">
          <div class="resume-card-header">
            <span class="badge ${badge.badgeClass}">${escapeHtml(badge.icon)} ${escapeHtml(r.track_type)}</span>
            <span class="resume-file-tag">${escapeHtml(r.id)} · ${appCount} ${appCount === 1 ? "app" : "apps"}</span>
          </div>
          <h4>${escapeHtml(r.name)}</h4>
          ${bulletsHtml}
          <div style="display:flex; gap:0.45rem; flex-wrap:wrap; margin-top:0.85rem;">
            <button type="button" class="btn btn-primary btn-sm" data-showcase-use-tailor="${escapeHtml(r.id)}">
              🤖 Open in AI Tailor
            </button>
            <button type="button" class="btn btn-secondary btn-sm" data-showcase-edit-tex="${escapeHtml(r.id)}">
              ✏️ Edit .tex
            </button>
            <button type="button" class="btn btn-ghost btn-sm" data-duplicate-latex-id="${escapeHtml(r.id)}" title="Clone this resume into a new track variant">
              📋 Clone Variant
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderKpis(filteredApps) {
  const total = filteredApps.length;
  const uniqueCountries = new Set(filteredApps.map((a) => a.country)).size;

  const submittedStages = new Set([
    "Applied",
    "OA / Coding Test",
    "Recruiter Screen",
    "Technical Interview",
    "Final Round",
    "Offer"
  ]);
  const interviewStages = new Set([
    "OA / Coding Test",
    "Recruiter Screen",
    "Technical Interview",
    "Final Round",
    "Offer"
  ]);

  const submittedCount = filteredApps.filter((a) => submittedStages.has(a.status)).length;
  const wishlistCount = filteredApps.filter((a) => a.status === "Wishlist").length;
  const interviewingCount = filteredApps.filter((a) => interviewStages.has(a.status)).length;
  const conversionRate = submittedCount > 0 ? Math.round((interviewingCount / submittedCount) * 100) : 0;

  const sponsorCount = filteredApps.filter((a) => {
    const v = String(a.visa_sponsorship || "").toLowerCase();
    return v.includes("yes") || v.includes("relocation") || v.includes("sponsor");
  }).length;

  const activeTracksInApps = new Set(filteredApps.map((a) => String(a.resume_track || "Java / Spring Boot Backend").trim()));
  const baseResumeCount = (state.latexResumes || []).length;

  const today = getTodayIso();
  const threeDaysOut = addDaysIso(today, 3);
  const dueFollowUps = filteredApps.filter((a) => {
    if (!a.follow_up_date) return false;
    if (a.status === "Rejected" || a.status === "Offer") return false;
    return a.follow_up_date <= threeDaysOut;
  }).length;

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("kpi-total", String(total));
  const countrySubText = `Across ${uniqueCountries} ${
    uniqueCountries === 1 ? "country" : "countries"
  } (${state.strategies.length} global hubs ready)`;
  setText("kpi-total-sub", countrySubText);
  setText("kpi-countries-covered", countrySubText);

  setText("kpi-applied", String(submittedCount));
  setText("kpi-applied-sub", `${wishlistCount} in wishlist queue`);
  setText("kpi-wishlist-count", `${wishlistCount} in wishlist queue`);

  setText("kpi-interviews", String(interviewingCount));
  setText("kpi-interviewing", String(interviewingCount));
  setText("kpi-interviews-sub", `${conversionRate}% interview conversion`);
  setText("kpi-conversion-rate", `${conversionRate}% interview conversion`);

  setText("kpi-sponsors", String(sponsorCount));
  setText("kpi-sponsors-sub", "Relocation / Work Permit Ready");

  setText("kpi-split", `${baseResumeCount} Resumes`);
  setText("kpi-resume-split", `${baseResumeCount} Resumes`);
  setText("kpi-split-sub", `${activeTracksInApps.size} tracks in pipeline`);

  setText("kpi-followups", String(dueFollowUps));
  setText("kpi-followups-sub", dueFollowUps > 0 ? `${dueFollowUps} due within 3 days` : "All follow-ups on track");
}

/* ==========================================================================
   VIEW 1: APPLICATIONS TABLE
   ========================================================================== */

function getStatusBadgeClass(status) {
  const map = {
    Wishlist: "status-wishlist",
    Applied: "status-applied",
    "OA / Coding Test": "status-oa",
    "Recruiter Screen": "status-screen",
    "Technical Interview": "status-tech",
    "Final Round": "status-final",
    Offer: "status-offer",
    Rejected: "status-rejected"
  };
  return map[status] || "status-applied";
}

function renderTable(filteredApps) {
  const tbody = document.getElementById("jobs-table-body");
  const emptyStateEl = document.getElementById("table-empty-state");
  if (!tbody) return;

  if (filteredApps.length === 0) {
    tbody.innerHTML = "";
    if (emptyStateEl) {
      emptyStateEl.hidden = false;
    } else {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="empty-state">
            <p>No job applications match your current filters.</p>
            <button type="button" class="btn btn-primary btn-sm" id="btn-empty-add-job">
              ➕ Add Application for Any Country Worldwide
            </button>
          </td>
        </tr>
      `;
    }
    return;
  }

  if (emptyStateEl) {
    emptyStateEl.hidden = true;
  }

  const today = getTodayIso();
  tbody.innerHTML = filteredApps
    .map((app) => {
      const meta = resolveCountryMeta(app.country);
      const trackBadge = getResumeTrackBadge(app.resume_track);
      const stars = "★".repeat(Math.max(1, Math.min(5, app.excitement_score || 5)));
      const isOverdue =
        app.follow_up_date &&
        app.follow_up_date <= today &&
        app.status !== "Rejected" &&
        app.status !== "Offer";

      const stageOptions = KANBAN_STAGES.map(
        (st) => `<option value="${escapeHtml(st)}" ${app.status === st ? "selected" : ""}>${escapeHtml(st)}</option>`
      ).join("");

      return `
        <tr>
          <td class="cell-id">${escapeHtml(app.id)}</td>
          <td>
            <div class="cell-country">${escapeHtml(meta.flag)} ${escapeHtml(app.country)}</div>
            <div class="cell-city">${escapeHtml(app.city)} · ${escapeHtml(app.region)}</div>
            <div class="cell-sub">${escapeHtml(app.work_mode || "On-site / Relocation")}</div>
          </td>
          <td>
            <div class="cell-company">${escapeHtml(app.company)}</div>
            <div class="cell-role">${escapeHtml(app.role)}</div>
            ${
              app.job_url
                ? `<div class="cell-sub"><a href="${escapeHtml(app.job_url)}" target="_blank" rel="noopener noreferrer" class="job-link">🔗 Job Posting ↗</a></div>`
                : ""
            }
          </td>
          <td>
            <span class="badge ${trackBadge.badgeClass}" title="${escapeHtml(trackBadge.fullLabel)}">
              ${escapeHtml(trackBadge.shortLabel)}
            </span>
          </td>
          <td>
            <select
              class="inline-status-select ${getStatusBadgeClass(app.status)}"
              data-inline-status-id="${escapeHtml(app.id)}"
              aria-label="Update stage for ${escapeHtml(app.company)}"
            >
              ${stageOptions}
            </select>
          </td>
          <td>
            <div>
              <span class="priority-dot priority-${escapeHtml(app.priority)}"></span><strong>${escapeHtml(app.priority)}</strong>
            </div>
            <div class="excitement-stars" title="Fit & Excitement Score">${stars}</div>
          </td>
          <td>
            <span class="badge badge-sponsor">${escapeHtml(app.visa_sponsorship)}</span>
            <div class="cell-sub" style="margin-top:0.2rem">${escapeHtml(app.visa_type || meta.visa)}</div>
            <div class="cell-salary" style="margin-top:0.2rem">${escapeHtml(app.salary_range || "Market Comp")} <small class="cell-sub">(${escapeHtml(app.currency || meta.currency)})</small></div>
          </td>
          <td>
            <div class="cell-sub"><strong>Applied:</strong> ${escapeHtml(app.applied_date || "—")}</div>
            <div class="cell-sub" style="${isOverdue ? "color: var(--warning); font-weight: 700;" : ""}">
              <strong>Follow-up:</strong> ${escapeHtml(app.follow_up_date || "—")} ${isOverdue ? "⏰" : ""}
            </div>
          </td>
          <td class="cell-notes">
            ${app.contact_recruiter ? `<div class="cell-sub"><strong>👤 ${escapeHtml(app.contact_recruiter)}</strong></div>` : ""}
            <div>${escapeHtml(app.notes || "—")}</div>
          </td>
          <td>
            <div class="row-actions">
              <button type="button" class="btn btn-primary btn-sm" data-tailor-id="${escapeHtml(app.id)}" title="Scrape Job Link, Check ATS & Relatability across all ${state.latexResumes.length} Resumes, Tailor LaTeX & Build PDF">
                🤖 Tailor
              </button>
              <button type="button" class="btn btn-secondary btn-sm" data-pitch-id="${escapeHtml(app.id)}" title="Generate LinkedIn & Email Outreach Pitch">
                ⚡ Pitch
              </button>
              <button type="button" class="btn btn-secondary btn-sm" data-edit-id="${escapeHtml(app.id)}" title="Edit Application">
                ✏️
              </button>
              <button type="button" class="btn btn-danger btn-sm" data-delete-id="${escapeHtml(app.id)}" title="Delete from Supabase">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

/* ==========================================================================
   VIEW 2: KANBAN PIPELINE
   ========================================================================== */

function renderKanban(filteredApps) {
  const board = document.getElementById("kanban-container") || document.getElementById("kanban-board-container");
  if (!board) return;

  board.innerHTML = KANBAN_STAGES.map((stage) => {
    const stageApps = filteredApps.filter((a) => a.status === stage);
    const cardsHtml =
      stageApps.length === 0
        ? `<div class="cell-sub" style="padding:0.75rem; text-align:center;">No roles in ${escapeHtml(stage)}</div>`
        : stageApps
            .map((app) => {
              const meta = resolveCountryMeta(app.country);
              const trackBadge = getResumeTrackBadge(app.resume_track);
              return `
                <article class="kanban-card" data-edit-id="${escapeHtml(app.id)}">
                  <div class="kanban-card-top">
                    <span class="kanban-company">${escapeHtml(meta.flag)} ${escapeHtml(app.company)}</span>
                    <span class="cell-id">${escapeHtml(app.id)}</span>
                  </div>
                  <div class="kanban-role">${escapeHtml(app.role)}</div>
                  <div class="cell-sub">${escapeHtml(app.city)}, ${escapeHtml(app.country)} · ${escapeHtml(app.salary_range || app.currency)}</div>
                  <div class="kanban-meta">
                    <span class="badge ${trackBadge.badgeClass}" title="${escapeHtml(trackBadge.fullLabel)}">
                      ${escapeHtml(trackBadge.kanbanLabel)}
                    </span>
                    <span class="cell-sub">${escapeHtml(app.visa_type || app.visa_sponsorship)}</span>
                  </div>
                </article>
              `;
            })
            .join("");

    return `
      <div class="kanban-column">
        <div class="kanban-col-header">
          <span>${escapeHtml(stage)}</span>
          <span class="pill-count">${stageApps.length}</span>
        </div>
        <div class="kanban-cards">
          ${cardsHtml}
        </div>
      </div>
    `;
  }).join("");
}

/* ==========================================================================
   VIEW 3: WORLDWIDE VISA & TECH HUB EXPLORER
   ========================================================================== */

function renderStrategyCards() {
  const container = document.getElementById("strategy-cards-container");
  if (!container) return;

  const q = state.strategySearchQuery.trim().toLowerCase();
  const filteredStrategies = state.strategies.filter((s) => {
    if (state.selectedRegion !== "ALL" && s.region !== state.selectedRegion) return false;
    if (state.selectedCountry !== "ALL" && s.country.toLowerCase() !== state.selectedCountry.toLowerCase()) {
      return false;
    }
    if (!q) return true;
    const hay = [
      s.country,
      s.region,
      s.tier,
      s.primary_visa_route,
      s.min_salary_threshold,
      s.tax_relocation_perk,
      s.top_job_portals,
      s.tier_1_sponsor_companies,
      s.application_tip,
      s.user_remarks || ""
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });

  if (filteredStrategies.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <p>No country playbooks match "${escapeHtml(state.strategySearchQuery || state.selectedCountry)}".</p>
        <button type="button" class="btn btn-primary btn-sm" id="btn-empty-add-playbook">
          🌍 + Add Custom Playbook for ${escapeHtml(state.selectedCountry !== "ALL" ? state.selectedCountry : "Any Country")}
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredStrategies
    .map((s) => {
      const appCount = state.applications.filter(
        (a) => a.country.toLowerCase() === s.country.toLowerCase()
      ).length;
      const slug = String(s.iso_code || s.country || "country").replace(/[^a-zA-Z0-9_-]/g, "-");
      const currentRemark = s.user_remarks || "";
      return `
        <article class="strategy-card">
          <div class="strategy-card-header">
            <h3>${escapeHtml(s.flag || "🌍")} ${escapeHtml(s.country)}</h3>
            <span class="tier-badge">${escapeHtml(s.region)} · ${escapeHtml(s.tier)}</span>
          </div>
          <div class="strategy-card-body">
            <div class="strategy-row">
              <strong>Primary Work Visa / Permit Route</strong>
              <p>${escapeHtml(s.primary_visa_route)}</p>
            </div>
            <div class="strategy-row">
              <strong>Salary Benchmark &amp; Tax / PR Advantage</strong>
              <p><strong>${escapeHtml(s.min_salary_threshold)}</strong> — ${escapeHtml(s.tax_relocation_perk)}</p>
            </div>
            <div class="strategy-row">
              <strong>Recommended Resume Angle</strong>
              <p>${escapeHtml(s.best_resume_track)}</p>
            </div>
            <div class="strategy-row">
              <strong>Top Job Portals</strong>
              <p>${escapeHtml(s.top_job_portals)}</p>
            </div>
            <div class="strategy-row">
              <strong>Tier-1 Visa Sponsor Companies</strong>
              <p>${escapeHtml(s.tier_1_sponsor_companies)}</p>
            </div>
            <div class="strategy-row">
              <strong>Insider Application Strategy</strong>
              <p>${escapeHtml(s.application_tip)}</p>
            </div>
            <div class="strategy-remarks-box">
              <div class="strategy-remarks-head">
                <label class="strategy-remarks-label" for="remark-box-${escapeHtml(slug)}">
                  📝 My Remarks for ${escapeHtml(s.country)}
                </label>
                <div class="strategy-remarks-controls">
                  <span class="strategy-remarks-status ${currentRemark ? "is-saved" : ""}" data-remark-status="${escapeHtml(s.country)}">
                    ${currentRemark ? "✓ Saved" : "Auto-saves on blur"}
                  </span>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    data-save-country-remark="${escapeHtml(s.country)}"
                    title="Save your personal remarks for ${escapeHtml(s.country)}"
                  >
                    💾 Save Remark
                  </button>
                </div>
              </div>
              <textarea
                id="remark-box-${escapeHtml(slug)}"
                class="country-remarks-input"
                data-country-remarks-input="${escapeHtml(s.country)}"
                rows="2"
                placeholder="Add your personal remarks, contacts, visa notes, or target salary expectations for ${escapeHtml(s.country)}..."
              >${escapeHtml(currentRemark)}</textarea>
            </div>
            <div class="strategy-card-actions">
              <button type="button" class="btn btn-primary btn-sm" data-quick-add-country="${escapeHtml(s.country)}">
                ➕ Log ${escapeHtml(s.country)} Role (${appCount})
              </button>
              <button type="button" class="btn btn-secondary btn-sm" data-filter-country="${escapeHtml(s.country)}">
                🔍 Filter Pipeline
              </button>
              <button type="button" class="btn btn-ghost btn-sm" data-edit-playbook="${escapeHtml(s.country)}">
                ✏️ Edit
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

/* ==========================================================================
   VIEW 4: GLOBAL ANALYTICS & FOLLOW-UP RADAR
   ========================================================================== */

function renderAnalytics(filteredApps) {
  const regionBarsEl =
    document.getElementById("chart-country-bars") || document.getElementById("analytics-region-bars");
  const stageBarsEl =
    document.getElementById("chart-stage-bars") || document.getElementById("analytics-stage-bars");
  const resumeBarsEl =
    document.getElementById("chart-track-split") || document.getElementById("analytics-resume-comparison");
  const radarEl =
    document.getElementById("followup-radar-list") || document.getElementById("analytics-followup-radar");
  if (!regionBarsEl || !stageBarsEl || !resumeBarsEl || !radarEl) return;

  const total = Math.max(1, filteredApps.length);

  // 1. Applications by Country & Region
  const byCountry = new Map();
  for (const app of filteredApps) {
    byCountry.set(app.country, (byCountry.get(app.country) || 0) + 1);
  }
  const sortedCountries = Array.from(byCountry.entries()).sort((a, b) => b[1] - a[1]);

  regionBarsEl.innerHTML =
    sortedCountries.length === 0
      ? `<p class="cell-sub">No applications tracked yet.</p>`
      : sortedCountries
          .map(([country, count]) => {
            const meta = resolveCountryMeta(country);
            const pct = Math.round((count / total) * 100);
            return `
              <div class="bar-row">
                <div class="bar-label-line">
                  <span>${escapeHtml(meta.flag)} ${escapeHtml(country)} <small style="color:var(--text-muted)">(${escapeHtml(meta.region)})</small></span>
                  <span>${count} (${pct}%)</span>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style="width: ${pct}%"></div>
                </div>
              </div>
            `;
          })
          .join("");

  // 2. Funnel Stage Breakdown
  stageBarsEl.innerHTML = KANBAN_STAGES.map((stage) => {
    const count = filteredApps.filter((a) => a.status === stage).length;
    const pct = filteredApps.length > 0 ? Math.round((count / total) * 100) : 0;
    return `
      <div class="bar-row">
        <div class="bar-label-line">
          <span>${escapeHtml(stage)}</span>
          <span>${count} (${pct}%)</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill alt" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }).join("");

  // 3. Multi-Track Resume Performance Split (dynamic across all base resumes + any custom tracks in applications)
  const trackMap = new Map();
  for (const r of state.latexResumes || []) {
    const key = String(r.track_type || "").trim();
    if (key && !trackMap.has(key)) {
      trackMap.set(key, { track: key, label: `${getResumeTrackBadge(key).icon} ${r.name} (${key})`, apps: [] });
    }
  }
  for (const app of filteredApps) {
    const key = String(app.resume_track || "Java / Spring Boot Backend").trim();
    if (!trackMap.has(key)) {
      const b = getResumeTrackBadge(key);
      trackMap.set(key, { track: key, label: `${b.icon} ${key}`, apps: [] });
    }
    trackMap.get(key).apps.push(app);
  }

  const trackEntries = Array.from(trackMap.values()).sort((a, b) => b.apps.length - a.apps.length);
  resumeBarsEl.innerHTML = trackEntries
    .map((entry) => {
      const count = entry.apps.length;
      const pct = filteredApps.length > 0 ? Math.round((count / total) * 100) : 0;
      const interviews = entry.apps.filter((a) =>
        ["OA / Coding Test", "Recruiter Screen", "Technical Interview", "Final Round", "Offer"].includes(a.status)
      ).length;
      return `
        <div class="bar-row">
          <div class="bar-label-line">
            <span>${escapeHtml(entry.label)}</span>
            <span>${count} apps (${pct}%) · ${interviews} interviewing</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    })
    .join("");

  // 4. Recruiter Follow-Up Radar
  const today = getTodayIso();
  const actionable = filteredApps
    .filter((a) => a.status !== "Rejected" && a.status !== "Offer")
    .sort((a, b) => String(a.follow_up_date || "9999").localeCompare(String(b.follow_up_date || "9999")))
    .slice(0, 6);

  radarEl.innerHTML =
    actionable.length === 0
      ? `<p class="cell-sub">No pending follow-ups.</p>`
      : actionable
          .map((app) => {
            const meta = resolveCountryMeta(app.country);
            const isDue = app.follow_up_date && app.follow_up_date <= today;
            return `
              <div class="followup-item">
                <div class="followup-item-info">
                  <strong>${escapeHtml(meta.flag)} ${escapeHtml(app.company)} — ${escapeHtml(app.role)}</strong>
                  <span>${escapeHtml(app.city)}, ${escapeHtml(app.country)} · Follow-up: ${escapeHtml(app.follow_up_date || "Not set")} ${
              isDue ? "🔥 DUE NOW" : ""
            }</span>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" data-pitch-id="${escapeHtml(app.id)}">
                  ⚡ Generate Pitch
                </button>
              </div>
            `;
          })
          .join("");
}

/* ==========================================================================
   VIEW 5: INTERACTIVE PITCH STUDIO & SUPABASE ATS CHECKLIST
   ========================================================================== */

function populatePitchStudioSelector() {
  const select = document.getElementById("pitch-select-app");
  if (!select) return;
  const currentVal = select.value;
  const opts = [`<option value="">— Custom / Manual Input —</option>`];
  for (const app of state.applications) {
    const meta = resolveCountryMeta(app.country);
    opts.push(
      `<option value="${escapeHtml(app.id)}">${escapeHtml(meta.flag)} ${escapeHtml(app.company)} — ${escapeHtml(app.role)} (${escapeHtml(app.country)})</option>`
    );
  }
  select.innerHTML = opts.join("");
  if (currentVal && state.applications.some((a) => a.id === currentVal)) {
    select.value = currentVal;
  }
}

function getTrackPitchHooks(trackRaw) {
  const lower = String(trackRaw || "").toLowerCase();
  if (/genai|agent|llm|rag|ai|ml/.test(lower)) {
    return {
      shortTag: "Agentic AI / LLM + Java",
      liSummary: "production Agentic AI (90% MTTR drop) & Java 21 microservices",
      coreHook:
        "Production Multi-Agent SRE AI systems (CrewAI, ReAct, GPT-4/Claude, RAG) cutting incident RCA time by 90% alongside Java 21/Spring Boot 3"
    };
  }
  if (/sre|distributed|cloud|platform|devops|infra|k8s/.test(lower)) {
    return {
      shortTag: "Distributed Systems / SRE & AI Observability",
      liSummary: "350M+ user Distributed Systems, Kafka/Aerospike & AI SRE automation (90% RCA drop)",
      coreHook:
        "high-availability Distributed Systems, Event-Driven Kafka/RabbitMQ/Solace pipelines, Aerospike/MongoDB Change Streams (35% latency cut), and AI-driven SRE observability"
    };
  }
  if (/full[- ]?stack|react|frontend|typescript|node/.test(lower)) {
    return {
      shortTag: "Full-Stack (React + Java 21 / FastAPI)",
      liSummary: "React.js + Java 21/Spring Boot 3 & FastAPI full-stack platforms for 350M+ users",
      coreHook:
        "end-to-end Full-Stack platforms combining React.js dashboards, Java 21/Spring Boot 3 & Python FastAPI backends, and real-time MongoDB Change Streams at 350M+ user scale"
    };
  }
  if (/java|spring/.test(lower)) {
    return {
      shortTag: "Java 21 / Spring Boot 3",
      liSummary: "Java 21/Spring Boot 3 & Kafka systems for 350M+ users",
      coreHook:
        "Java 21 (Virtual Threads), Spring Boot 3, and Kafka/Aerospike microservices at 350M+ user scale (40% latency cut)"
    };
  }
  return {
    shortTag: trackRaw || "Senior Software Engineering",
    liSummary: `${trackRaw || "high-scale backend & AI"} systems for 350M+ users (40% latency cut)`,
    coreHook: `${trackRaw || "distributed backend"} architecture paired with Java 21, Spring Boot 3, Kafka, and Agentic AI automation at 350M+ user scale`
  };
}

function updatePitchTemplates() {
  const company = document.getElementById("pitch-company")?.value.trim() || "your team";
  const role = document.getElementById("pitch-role")?.value.trim() || "Senior Software Engineer";
  const location = document.getElementById("pitch-country")?.value.trim() || "your engineering hub";
  const visa = document.getElementById("pitch-visa")?.value.trim() || "Fast-Track Work Permit (Anabin H+NIT Bhopal)";
  const track = document.getElementById("pitch-track")?.value || "Java / Spring Boot Backend";

  const hooks = getTrackPitchHooks(track);

  const linkedInNote = `Hi! I just applied for the ${role} role at ${company} (${location}). I have 4+ YoE at Airtel building ${hooks.liSummary}. Fully eligible for ${visa}. Would love to connect! — Anil`;

  const coldEmail = `Subject: Application: ${role} (${location}) — Senior SWE @ Airtel (350M+ Scale | ${hooks.shortTag})

Hi Hiring Team at ${company},

I recently applied for the ${role} position in ${location} and wanted to share a quick summary of why my production background is a strong fit:

• Scale & Architecture: Senior Software Engineer at Airtel Digital (4+ YoE, B.Tech CSE from NIT Bhopal) scaling high-throughput systems for 350M+ users.
• Technical Impact (${track}): Led ${hooks.coreHook}.
• Smooth Relocation / Visa Readiness: My B.Tech CSE degree from NIT Bhopal (Institute of National Importance) qualifies for expedited ${visa} processing.

I have attached my tailored CV and would welcome a brief 10-minute chat this week.

Best regards,
Anil Kumar
+91-8989845501 | anilkumarmzp1@gmail.com`;

  const referralAsk = `Hi! Hope you're doing great at ${company} in ${location}!

I came across the ${role} opening at ${company} and noticed how closely it matches my work over the past 4+ years at Airtel Digital (${hooks.coreHook}).

If you feel comfortable, would you be open to referring me for this role? I have my tailored resume (${track}) and the job link ready to share. Either way, thanks so much for your time!

Best,
Anil Kumar (NIT Bhopal CSE / Senior SWE @ Airtel)`;

  const liEl = document.getElementById("tpl-linkedin-note");
  const emailEl = document.getElementById("tpl-cold-email");
  const refEl = document.getElementById("tpl-followup-msg") || document.getElementById("tpl-referral-msg");
  const counterEl = document.getElementById("pitch-li-counter");

  if (liEl) liEl.textContent = linkedInNote;
  if (emailEl) emailEl.textContent = coldEmail;
  if (refEl) refEl.textContent = referralAsk;
  if (counterEl) {
    counterEl.textContent = `${linkedInNote.length} / 300 chars`;
  }
}

function loadAppIntoPitchStudio(appId) {
  const app = state.applications.find((a) => a.id === appId);
  if (!app) return;
  document.getElementById("pitch-select-app").value = app.id;
  document.getElementById("pitch-company").value = app.company;
  document.getElementById("pitch-role").value = app.role;
  document.getElementById("pitch-country").value = `${app.city}, ${app.country}`;
  document.getElementById("pitch-visa").value = app.visa_type || app.visa_sponsorship;
  document.getElementById("pitch-track").value = app.resume_track;
  updatePitchTemplates();
  switchView("resumes");
  showToast(`Loaded ${app.company} (${app.country}) into Outreach Pitch Studio!`);
}

function isChecklistDone(val) {
  return val === true || String(val).toLowerCase() === "yes" || String(val).toLowerCase() === "true";
}

function renderChecklist() {
  const tbody = document.getElementById("checklist-table-body");
  if (!tbody) return;

  const totalCount = state.checklist.length;
  const doneCount = state.checklist.filter((item) => isChecklistDone(item.done)).length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
  const progressEl = document.getElementById("checklist-progress-label");
  if (progressEl) {
    progressEl.textContent = `${doneCount} of ${totalCount} completed (${pct}%) — synced to Supabase`;
  }

  tbody.innerHTML = state.checklist
    .map((item) => {
      const done = isChecklistDone(item.done);
      return `
      <tr style="${done ? "opacity: 0.68;" : ""}">
        <td>
          <input
            type="checkbox"
            class="checklist-checkbox"
            data-check-id="${escapeHtml(item.id)}"
            ${done ? "checked" : ""}
            aria-label="Mark ${escapeHtml(item.action_item)} as completed"
          >
        </td>
        <td><span class="badge badge-java">${escapeHtml(item.resume_track)}</span></td>
        <td><strong>${escapeHtml(item.category)}</strong></td>
        <td style="${done ? "text-decoration: line-through;" : ""}">${escapeHtml(item.action_item)}</td>
        <td class="cell-sub">${escapeHtml(item.impact)}</td>
        <td>
          <button type="button" class="btn btn-danger btn-sm" data-del-check-id="${escapeHtml(item.id)}" aria-label="Delete checklist item">
            🗑️
          </button>
        </td>
      </tr>
    `;
    })
    .join("");
}

/* ==========================================================================
   MASTER RENDER & VIEW SWITCHING (WITH hidden="until-found" & beforematch)
   ========================================================================== */

function renderAll() {
  populateResumeTrackControls();
  renderRegionAndCountryPills();
  renderActiveCountryBanner();
  const filteredApps = getFilteredApplications();
  renderKpis(filteredApps);
  renderTable(filteredApps);
  renderKanban(filteredApps);
  renderStrategyCards();
  renderAnalytics(filteredApps);
  renderResumeShowcaseGrid();
  populatePitchStudioSelector();
  populateTailorJobSelector();
  renderTailorResumeBadgeCount();
  updatePitchTemplates();
  renderChecklist();
}

function switchView(viewName) {
  state.activeView = viewName;
  document.querySelectorAll(".view-tab").forEach((tab) => {
    const isTarget = tab.dataset.view === viewName;
    tab.classList.toggle("active", isTarget);
    tab.setAttribute("aria-selected", isTarget ? "true" : "false");
  });

  // Show pipeline KPI & filter command bar only on pipeline-centric views (table, kanban, analytics)
  const pipelineChrome = document.getElementById("pipeline-overview-chrome");
  if (pipelineChrome) {
    const showChrome = viewName === "table" || viewName === "kanban" || viewName === "analytics";
    pipelineChrome.hidden = !showChrome;
  }

  const panelMap = {
    table: "view-table",
    tailor: "view-tailor",
    kanban: "view-kanban",
    strategy: "view-strategy",
    analytics: "view-analytics",
    resumes: "view-resumes"
  };

  const supportsBeforeMatch = "onbeforematch" in HTMLElement.prototype;

  for (const [key, panelId] of Object.entries(panelMap)) {
    const el = document.getElementById(panelId);
    if (!el) continue;
    if (key === viewName) {
      el.removeAttribute("hidden");
    } else if (supportsBeforeMatch) {
      el.setAttribute("hidden", "until-found");
    } else {
      el.hidden = true;
    }
  }
}

/* ==========================================================================
   CRUD ACTIONS: ADD / EDIT / DELETE APPLICATION & COUNTRY PLAYBOOK
   ========================================================================== */

function getElVal(ids, fallback = "") {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && el.value !== undefined) return el.value;
  }
  return fallback;
}

function setElVal(ids, value) {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) el.value = value ?? "";
  }
}

function openApplicationModal(appToEdit = null, prefillCountry = null) {
  const dialog = document.getElementById("application-dialog");
  const form = document.getElementById("application-form");
  const title = document.getElementById("dialog-app-title");
  if (!dialog || !form) return;

  form.reset();
  form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));

  if (appToEdit) {
    if (title) title.textContent = `Edit Application (${appToEdit.id})`;
    setElVal(["field-id"], appToEdit.id);
    setElVal(["field-country"], appToEdit.country);
    setElVal(["field-region"], appToEdit.region);
    setElVal(["field-city"], appToEdit.city);
    setElVal(["field-work-mode"], appToEdit.work_mode || "On-site / Relocation");
    setElVal(["field-company"], appToEdit.company);
    setElVal(["field-role"], appToEdit.role);
    setElVal(["field-resume"], appToEdit.resume_track || "Java / Spring Boot Backend");
    setElVal(["field-status"], appToEdit.status);
    setElVal(["field-priority"], appToEdit.priority);
    setElVal(["field-sponsorship", "field-visa-status"], appToEdit.visa_sponsorship);
    setElVal(["field-visa-type", "field-visa"], appToEdit.visa_type || "");
    setElVal(["field-salary"], appToEdit.salary_range || "");
    setElVal(["field-currency"], appToEdit.currency || "EUR");
    setElVal(["field-excitement"], String(appToEdit.excitement_score || 5));
    setElVal(["field-applied-date", "field-date"], appToEdit.applied_date || getTodayIso());
    setElVal(["field-followup-date", "field-followup"], appToEdit.follow_up_date || addDaysIso(getTodayIso(), 7));
    setElVal(["field-url"], appToEdit.job_url || "");
    setElVal(["field-contact"], appToEdit.contact_recruiter || "");
    setElVal(["field-notes"], appToEdit.notes || "");
  } else {
    if (title) title.textContent = "Add Worldwide Job Application";
    setElVal(["field-id"], "");
    const targetCountry =
      prefillCountry || (state.selectedCountry !== "ALL" ? state.selectedCountry : "Netherlands");
    setElVal(["field-country"], targetCountry);
    setElVal(["field-resume"], state.latexResumes[0]?.track_type || "Java / Spring Boot Backend");
    applyCountryDefaultsToAppForm(targetCountry);
    setElVal(["field-applied-date", "field-date"], getTodayIso());
    setElVal(["field-followup-date", "field-followup"], addDaysIso(getTodayIso(), 7));
  }

  dialog.showModal();
}

function applyCountryDefaultsToAppForm(countryName) {
  const meta = resolveCountryMeta(countryName);
  const strat = state.strategies.find(
    (s) => s.country.toLowerCase() === String(countryName || "").trim().toLowerCase()
  );
  const regionEl = document.getElementById("field-region");
  const visaEl = document.getElementById("field-visa-type") || document.getElementById("field-visa");
  const currencyEl = document.getElementById("field-currency");
  if (regionEl) regionEl.value = strat?.region || meta.region;
  if (visaEl && !visaEl.value) visaEl.value = strat?.primary_visa_route || meta.visa;
  if (currencyEl) currencyEl.value = meta.currency;
}

async function handleSaveApplication(e) {
  e.preventDefault();
  const form = document.getElementById("application-form");
  let isValid = true;
  form.querySelectorAll("[required], input[type='url']").forEach((input) => {
    const field = input.closest(".field");
    if (!input.checkValidity()) {
      field?.classList.add("invalid");
      isValid = false;
    } else {
      field?.classList.remove("invalid");
    }
  });
  if (!isValid) return;

  const existingId = getElVal(["field-id"]).trim();
  const countryName = getElVal(["field-country"], "Netherlands").trim();
  const meta = resolveCountryMeta(countryName);

  const row = {
    id: existingId || generateNextAppId(),
    country: countryName,
    iso_code: meta.iso_code,
    region: getElVal(["field-region"], meta.region),
    city: getElVal(["field-city"]).trim(),
    work_mode: getElVal(["field-work-mode"], "On-site / Relocation"),
    company: getElVal(["field-company"]).trim(),
    role: getElVal(["field-role"]).trim(),
    resume_track: getElVal(["field-resume"], "Java / Spring Boot Backend").trim() || "Java / Spring Boot Backend",
    status: getElVal(["field-status"], "Applied"),
    priority: getElVal(["field-priority"], "High"),
    visa_sponsorship: getElVal(["field-sponsorship", "field-visa-status"], "Verified Sponsor"),
    visa_type: getElVal(["field-visa-type", "field-visa"]).trim() || meta.visa,
    salary_range: getElVal(["field-salary"]).trim(),
    currency: getElVal(["field-currency"]).trim() || meta.currency,
    excitement_score: Number.parseInt(getElVal(["field-excitement"], "5"), 10) || 5,
    applied_date: getElVal(["field-applied-date", "field-date"]) || getTodayIso(),
    follow_up_date: getElVal(["field-followup-date", "field-followup"]) || null,
    job_url: getElVal(["field-url"]).trim(),
    contact_recruiter: getElVal(["field-contact"]).trim(),
    notes: getElVal(["field-notes"]).trim()
  };

  const idx = state.applications.findIndex((a) => a.id === row.id);
  if (idx >= 0) {
    state.applications[idx] = row;
  } else {
    state.applications.unshift(row);
  }
  saveLocalCache();
  document.getElementById("application-dialog")?.close();
  renderAll();

  try {
    await sbUpsert("job_applications", row, "id");
    updateSupabaseStatusBadge(
      "connected",
      `Supabase Live (${state.applications.length} apps · ${state.strategies.length} hubs)`
    );
    showToast(`Saved ${row.company} (${row.country}) to Supabase PostgreSQL!`);
  } catch (err) {
    showToast(`Saved locally — Supabase sync error: ${err.message}`);
  }
}

async function handleDeleteApplication(appId) {
  const target = state.applications.find((a) => a.id === appId);
  if (!target) return;
  state.applications = state.applications.filter((a) => a.id !== appId);
  saveLocalCache();
  renderAll();

  try {
    await sbDelete("job_applications", "id", appId);
    showToast(`Deleted ${target.company} (${appId}) from Supabase!`);
  } catch (err) {
    showToast(`Removed locally — Supabase error: ${err.message}`);
  }
}

async function handleInlineStatusChange(appId, newStatus) {
  const app = state.applications.find((a) => a.id === appId);
  if (!app) return;
  app.status = newStatus;
  saveLocalCache();
  renderAll();

  try {
    await sbUpsert("job_applications", app, "id");
    showToast(`Updated ${app.company} stage to "${newStatus}" in Supabase!`);
  } catch (err) {
    showToast(`Updated locally — Supabase error: ${err.message}`);
  }
}

function openCountryPlaybookModal(countryName = "") {
  const dialog = document.getElementById("country-playbook-dialog") || document.getElementById("country-dialog");
  const form = document.getElementById("country-playbook-form") || document.getElementById("country-form");
  if (!dialog || !form) return;

  form.reset();
  const existing = state.strategies.find(
    (s) => s.country.toLowerCase() === String(countryName || "").toLowerCase()
  );
  const meta = resolveCountryMeta(countryName || "Austria");
  const cachedRemark = countryName ? getCountryRemarksCache()[String(countryName).trim().toLowerCase()] || "" : "";

  if (existing) {
    setElVal(["cp-country"], existing.country);
    setElVal(["cp-region"], existing.region);
    setElVal(["cp-flag"], existing.flag);
    setElVal(["cp-tier"], existing.tier);
    setElVal(["cp-visa"], existing.primary_visa_route);
    setElVal(["cp-salary"], existing.min_salary_threshold);
    setElVal(["cp-tax"], existing.tax_relocation_perk);
    setElVal(["cp-track", "cp-timeline"], existing.best_resume_track);
    setElVal(["cp-portals"], existing.top_job_portals);
    setElVal(["cp-companies"], existing.tier_1_sponsor_companies);
    setElVal(["cp-tip", "cp-pitch"], existing.application_tip);
    setElVal(["cp-remarks"], existing.user_remarks || cachedRemark || "");
  } else if (countryName) {
    setElVal(["cp-country"], meta.country);
    setElVal(["cp-region"], meta.region);
    setElVal(["cp-flag"], meta.flag);
    setElVal(["cp-visa"], meta.visa);
    setElVal(["cp-remarks"], cachedRemark);
  }

  dialog.showModal();
}

async function upsertCountryStrategyWithFallback(row) {
  try {
    await sbUpsert("country_strategies", row, "country");
    return { syncedFullRow: true };
  } catch (err) {
    const msg = String(err?.message || "");
    if (/user_remarks/i.test(msg)) {
      const { user_remarks: _ignored, ...rowWithoutRemarks } = row;
      await sbUpsert("country_strategies", rowWithoutRemarks, "country");
      return { syncedFullRow: false };
    }
    throw err;
  }
}

async function saveCountryRemark(countryName, remarkText, showFeedbackToast = true) {
  const cleanCountry = String(countryName || "").trim();
  if (!cleanCountry) return;
  const cleanRemark = String(remarkText || "").trim();

  setCountryRemarkInCache(cleanCountry, cleanRemark);

  let strat = state.strategies.find((s) => s.country.toLowerCase() === cleanCountry.toLowerCase());
  if (!strat) {
    const meta = resolveCountryMeta(cleanCountry);
    strat = {
      country: meta.country || cleanCountry,
      iso_code: meta.iso_code,
      flag: meta.flag,
      region: meta.region,
      tier: "Tier 1 — High ROI",
      primary_visa_route: meta.visa,
      min_salary_threshold: `Market Competitive (${meta.currency})`,
      tax_relocation_perk: "Eligible for international skilled worker relocation",
      best_resume_track: "All Tracks (Java / GenAI / SRE / Full-Stack)",
      top_job_portals: "LinkedIn, Relocate.me, Company Career Portals",
      tier_1_sponsor_companies: "Global Tech MNCs & High-Growth Startups",
      application_tip: "Highlight Airtel 350M+ scale & NIT Bhopal degree.",
      user_remarks: cleanRemark
    };
    state.strategies.push(strat);
  } else {
    strat.user_remarks = cleanRemark;
  }

  saveLocalCache();

  // Keep any matching textareas and status badges in sync without losing cursor focus
  document.querySelectorAll("[data-country-remarks-input]").forEach((el) => {
    if (
      String(el.dataset.countryRemarksInput || "").toLowerCase() === cleanCountry.toLowerCase() &&
      document.activeElement !== el
    ) {
      el.value = cleanRemark;
    }
  });

  document.querySelectorAll("[data-remark-status]").forEach((badge) => {
    if (String(badge.dataset.remarkStatus || "").toLowerCase() === cleanCountry.toLowerCase()) {
      badge.textContent = cleanRemark ? "✓ Saved" : "Cleared";
      badge.classList.remove("is-dirty");
      badge.classList.add("is-saved");
    }
  });

  try {
    await upsertCountryStrategyWithFallback(strat);
    if (showFeedbackToast) {
      showToast(
        cleanRemark
          ? `Saved your personal remarks for ${strat.flag || "🌍"} ${strat.country}!`
          : `Cleared personal remarks for ${strat.flag || "🌍"} ${strat.country}.`
      );
    }
  } catch (err) {
    if (showFeedbackToast) {
      showToast(`Saved remarks for ${strat.country} locally (Supabase sync notice: ${err.message})`);
    }
  }
}

async function handleSaveCountryPlaybook(e) {
  e.preventDefault();
  const country = getElVal(["cp-country"]).trim();
  const visa = getElVal(["cp-visa"]).trim();
  if (!country || !visa) return;

  const meta = resolveCountryMeta(country);
  const existing = state.strategies.find((s) => s.country.toLowerCase() === country.toLowerCase());
  const remarksInputEl = document.getElementById("cp-remarks");
  const userRemarks = remarksInputEl ? remarksInputEl.value.trim() : existing?.user_remarks || "";

  setCountryRemarkInCache(country, userRemarks);

  const row = {
    country,
    iso_code: meta.iso_code,
    flag: getElVal(["cp-flag"]).trim() || meta.flag,
    region: getElVal(["cp-region"]) || meta.region,
    tier: getElVal(["cp-tier"]) || "Tier 1 — High ROI",
    primary_visa_route: visa,
    min_salary_threshold: getElVal(["cp-salary"]).trim() || "Market Competitive",
    tax_relocation_perk: getElVal(["cp-tax"]).trim() || "International Relocation Package",
    best_resume_track: getElVal(["cp-track", "cp-timeline"]).trim() || "All Tracks (Java / GenAI / SRE / Full-Stack)",
    top_job_portals: getElVal(["cp-portals"]).trim() || "LinkedIn, Relocate.me",
    tier_1_sponsor_companies: getElVal(["cp-companies"]).trim() || "Top Tech Employers",
    application_tip: getElVal(["cp-tip", "cp-pitch"]).trim() || "Highlight Airtel 350M+ scale & NIT Bhopal degree.",
    user_remarks: userRemarks
  };

  const idx = state.strategies.findIndex((s) => s.country.toLowerCase() === country.toLowerCase());
  if (idx >= 0) {
    state.strategies[idx] = row;
  } else {
    state.strategies.push(row);
  }
  saveLocalCache();
  (document.getElementById("country-playbook-dialog") || document.getElementById("country-dialog"))?.close();
  renderAll();

  try {
    await upsertCountryStrategyWithFallback(row);
    showToast(`Saved ${row.flag} ${row.country} playbook & remarks to Supabase!`);
  } catch (err) {
    showToast(`Saved ${row.country} playbook locally — Supabase error: ${err.message}`);
  }
}

/* ==========================================================================
   EXCEL (.XLSX) BACKUP EXPORT & IMPORT TO SUPABASE
   ========================================================================== */

function exportToExcelBackup() {
  if (typeof XLSX === "undefined") {
    showToast("SheetJS library is still loading. Please try again in a moment.");
    return;
  }
  const wb = XLSX.utils.book_new();
  const wsApps = XLSX.utils.json_to_sheet(state.applications);
  const wsStrats = XLSX.utils.json_to_sheet(state.strategies);
  const wsChk = XLSX.utils.json_to_sheet(state.checklist);
  XLSX.utils.book_append_sheet(wb, wsApps, "Applications");
  XLSX.utils.book_append_sheet(wb, wsStrats, "Country_Strategy");
  XLSX.utils.book_append_sheet(wb, wsChk, "Resume_Checklist");
  XLSX.writeFile(wb, "job_tracker_supabase_backup.xlsx");
  showToast("Exported job_tracker_supabase_backup.xlsx!");
}

async function importExcelToSupabase(file) {
  if (!file || typeof XLSX === "undefined") return;
  const buffer = await file.arrayBuffer();
  const wb = XLSX.read(buffer, { type: "array" });
  const sheetName = wb.SheetNames[0];
  const rawRows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
  if (!rawRows.length) {
    showToast("Selected Excel file had no rows.");
    return;
  }
  const normalized = rawRows.map(normalizeAppRow);
  state.applications = normalized;
  saveLocalCache();
  renderAll();

  try {
    await sbUpsert("job_applications", normalized, "id");
    showToast(`Imported & synced ${normalized.length} applications to Supabase!`);
  } catch (err) {
    showToast(`Imported ${normalized.length} rows locally — Supabase error: ${err.message}`);
  }
}

/* ==========================================================================
   THEME TOGGLE & EVENT LISTENERS
   ========================================================================== */

function initThemeToggle() {
  const btn = document.getElementById("btn-theme-toggle");
  const label = document.getElementById("theme-toggle-label");
  const meta = document.querySelector('meta[name="color-scheme"]');

  function updateLabel() {
    const current = localStorage.getItem(STORAGE_KEYS.theme) || "auto";
    if (label) {
      label.textContent =
        current === "dark" ? "🌙 Dark" : current === "light" ? "☀️ Light" : "🌓 Auto";
    }
  }
  updateLabel();

  btn?.addEventListener("click", () => {
    const current = localStorage.getItem(STORAGE_KEYS.theme) || "auto";
    const next = current === "auto" ? "dark" : current === "dark" ? "light" : "auto";
    if (next === "auto") {
      localStorage.removeItem(STORAGE_KEYS.theme);
      delete document.documentElement.dataset.theme;
      if (meta) meta.content = "light dark";
    } else {
      localStorage.setItem(STORAGE_KEYS.theme, next);
      document.documentElement.dataset.theme = next;
      if (meta) meta.content = next;
    }
    updateLabel();
  });
}

function bindEvents() {
  // Region filter bar
  document.getElementById("region-pills-container")?.addEventListener("click", (e) => {
    const chip = e.target.closest(".region-chip");
    if (!chip) return;
    state.selectedRegion = chip.dataset.region || "ALL";
    state.selectedCountry = "ALL";
    renderAll();
  });

  // Country quick jump input (supports all 195+ countries)
  const jumpInput = document.getElementById("global-country-jump");
  jumpInput?.addEventListener("change", () => {
    const val = jumpInput.value.trim();
    if (!val) return;
    const meta = resolveCountryMeta(val);
    state.selectedRegion = "ALL";
    state.selectedCountry = meta.country;
    jumpInput.value = "";
    renderAll();
  });

  // Country pills
  document.getElementById("country-pills-container")?.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest("[data-toggle-all-countries]");
    if (toggleBtn) {
      state.showAllCountryPills = !state.showAllCountryPills;
      renderRegionAndCountryPills();
      return;
    }
    const pill = e.target.closest(".country-pill");
    if (!pill) return;
    state.selectedCountry = pill.dataset.country || "ALL";
    renderAll();
  });

  // View tabs
  document.querySelectorAll(".view-tab").forEach((tab) => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  // MANDATORY: Listen for beforematch on hidden="until-found" view panels so Find-in-Page activates the tab
  document.querySelectorAll(".view-panel").forEach((panel) => {
    panel.addEventListener("beforematch", () => {
      const viewKey = panel.id.replace("view-", "");
      switchView(viewKey);
    });
  });

  // Search & filter controls
  document.getElementById("search-query")?.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderAll();
  });
  document.getElementById("filter-resume")?.addEventListener("change", (e) => {
    state.resumeFilter = e.target.value;
    renderAll();
  });
  document.getElementById("filter-status")?.addEventListener("change", (e) => {
    state.statusFilter = e.target.value;
    renderAll();
  });
  document.getElementById("filter-priority")?.addEventListener("change", (e) => {
    state.priorityFilter = e.target.value;
    renderAll();
  });
  document.getElementById("btn-reset-filters")?.addEventListener("click", () => {
    state.selectedRegion = "ALL";
    state.selectedCountry = "ALL";
    state.searchQuery = "";
    state.resumeFilter = "ALL";
    state.statusFilter = "ALL";
    state.priorityFilter = "ALL";
    document.getElementById("search-query").value = "";
    document.getElementById("filter-resume").value = "ALL";
    document.getElementById("filter-status").value = "ALL";
    document.getElementById("filter-priority").value = "ALL";
    renderAll();
  });

  // Strategy search
  document.getElementById("strategy-search-input")?.addEventListener("input", (e) => {
    state.strategySearchQuery = e.target.value;
    renderStrategyCards();
  });

  // Header & Modal buttons
  document.getElementById("btn-add-job")?.addEventListener("click", () => openApplicationModal());
  document.getElementById("btn-close-app-dialog")?.addEventListener("click", () => {
    document.getElementById("application-dialog")?.close();
  });
  document.getElementById("btn-cancel-app-dialog")?.addEventListener("click", () => {
    document.getElementById("application-dialog")?.close();
  });
  document.getElementById("application-form")?.addEventListener("submit", handleSaveApplication);

  // Auto-fill region, currency & visa when user selects/types any country in Add Application form
  document.getElementById("field-country")?.addEventListener("change", (e) => {
    applyCountryDefaultsToAppForm(e.target.value);
  });

  // Country Playbook modal
  document.getElementById("btn-add-country-modal")?.addEventListener("click", () =>
    openCountryPlaybookModal(state.selectedCountry !== "ALL" ? state.selectedCountry : "")
  );
  document.getElementById("btn-add-country-inline")?.addEventListener("click", () =>
    openCountryPlaybookModal(state.selectedCountry !== "ALL" ? state.selectedCountry : "")
  );
  ["btn-close-country-dialog", "btn-cancel-country-dialog"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", () => {
      document.getElementById("country-playbook-dialog")?.close();
      document.getElementById("country-dialog")?.close();
    });
  });
  document.getElementById("country-playbook-form")?.addEventListener("submit", handleSaveCountryPlaybook);
  document.getElementById("country-form")?.addEventListener("submit", handleSaveCountryPlaybook);

  ["cp-country", "country-field-name"].forEach((id) => {
    document.getElementById(id)?.addEventListener("change", (e) => {
      const meta = resolveCountryMeta(e.target.value);
      setElVal(["cp-region", "country-field-region"], meta.region);
      setElVal(["cp-flag", "country-field-flag"], meta.flag);
      if (!getElVal(["cp-visa", "country-field-visa"])) {
        setElVal(["cp-visa", "country-field-visa"], meta.visa);
      }
    });
  });

  // Delegated actions across tables, banners, resume library & cards
  document.addEventListener("click", (e) => {
    const editBtn = e.target.closest("[data-edit-id]");
    if (editBtn) {
      const app = state.applications.find((a) => a.id === editBtn.dataset.editId);
      if (app) openApplicationModal(app);
      return;
    }

    const delBtn = e.target.closest("[data-delete-id]");
    if (delBtn) {
      handleDeleteApplication(delBtn.dataset.deleteId);
      return;
    }

    const pitchBtn = e.target.closest("[data-pitch-id]");
    if (pitchBtn) {
      loadAppIntoPitchStudio(pitchBtn.dataset.pitchId);
      return;
    }

    const tailorBtn = e.target.closest("[data-tailor-id]");
    if (tailorBtn) {
      loadTrackedJobIntoTailor(tailorBtn.dataset.tailorId, true);
      return;
    }

    const forceTailorBtn = e.target.closest("[data-force-tailor-resume-id]");
    if (forceTailorBtn) {
      const resumeId = forceTailorBtn.dataset.forceTailorResumeId;
      handleForceTailorWithResume(resumeId);
      return;
    }

    const editLatexBtn = e.target.closest("[data-edit-latex-id]");
    if (editLatexBtn) {
      loadLatexResumeIntoForm(editLatexBtn.dataset.editLatexId);
      return;
    }

    const dupLatexBtn = e.target.closest("[data-duplicate-latex-id]");
    if (dupLatexBtn) {
      duplicateLatexResume(dupLatexBtn.dataset.duplicateLatexId);
      return;
    }

    const delLatexBtn = e.target.closest("[data-del-latex-id]");
    if (delLatexBtn) {
      deleteLatexResume(delLatexBtn.dataset.delLatexId);
      return;
    }

    const showcaseEditBtn = e.target.closest("[data-showcase-edit-tex]");
    if (showcaseEditBtn) {
      const resId = showcaseEditBtn.dataset.showcaseEditTex;
      openAiTailorSettingsModal();
      loadLatexResumeIntoForm(resId);
      return;
    }

    const showcaseTailorBtn = e.target.closest("[data-showcase-use-tailor]");
    if (showcaseTailorBtn) {
      const resId = showcaseTailorBtn.dataset.showcaseUseTailor;
      const r = state.latexResumes.find((item) => item.id === resId);
      if (r) {
        state.tailor.selectedResumeId = r.id;
        const editorEl = document.getElementById("tailor-latex-editor");
        if (editorEl) editorEl.value = r.latex_code;
        const badgeEl = document.getElementById("tailor-selected-resume-badge");
        if (badgeEl) badgeEl.textContent = r.name;
        const workbench = document.getElementById("tailor-workbench-grid");
        if (workbench) workbench.hidden = false;
        switchView("tailor");
        showToast(`Loaded "${r.name}" (${r.track_type}) into AI Resume Tailor!`);
      }
      return;
    }

    const syncResumesBtn = e.target.closest("[data-sync-supabase-resumes]");
    if (syncResumesBtn) {
      fetchResumesFromSupabase(true);
      return;
    }

    const openResumeMgrBtn = e.target.closest("[data-open-resume-manager]");
    if (openResumeMgrBtn) {
      openAiTailorSettingsModal();
      return;
    }

    const presetChip = e.target.closest(".preset-track-chip");
    if (presetChip) {
      const trackVal = presetChip.dataset.presetTrack || presetChip.dataset.track || "";
      const trackInput = document.getElementById("lr-track");
      if (trackInput && trackVal) {
        trackInput.value = trackVal;
      }
      const idInput = document.getElementById("lr-id");
      if (idInput && !idInput.value.trim() && presetChip.dataset.id) {
        idInput.value = presetChip.dataset.id;
      }
      const nameInput = document.getElementById("lr-name");
      if (nameInput && !nameInput.value.trim()) {
        nameInput.value = presetChip.dataset.name || (trackVal ? `Resume — ${trackVal}` : "");
      }
      return;
    }

    const quickPromptBtn = e.target.closest(".ai-quick-prompt-btn");
    if (quickPromptBtn) {
      const promptText = quickPromptBtn.dataset.prompt;
      const inputEl = document.getElementById("ai-companion-input");
      if (inputEl && promptText) {
        inputEl.value = promptText;
        handleCompanionSubmit(new Event("submit"));
      }
      return;
    }

    const quickAddCountryBtn = e.target.closest("[data-quick-add-country]");
    if (quickAddCountryBtn) {
      openApplicationModal(null, quickAddCountryBtn.dataset.quickAddCountry);
      return;
    }

    const filterCountryBtn = e.target.closest("[data-filter-country]");
    if (filterCountryBtn) {
      state.selectedCountry = filterCountryBtn.dataset.filterCountry;
      switchView("table");
      renderAll();
      return;
    }

    const editPlaybookBtn = e.target.closest("[data-edit-playbook]");
    if (editPlaybookBtn) {
      openCountryPlaybookModal(editPlaybookBtn.dataset.editPlaybook);
      return;
    }

    const saveCountryRemarkBtn = e.target.closest("[data-save-country-remark]");
    if (saveCountryRemarkBtn) {
      const countryName = saveCountryRemarkBtn.dataset.saveCountryRemark;
      const box = saveCountryRemarkBtn
        .closest(".strategy-remarks-box")
        ?.querySelector("[data-country-remarks-input]");
      const remarkVal = box ? box.value : "";
      saveCountryRemark(countryName, remarkVal, true);
      return;
    }

    if (e.target.closest("#btn-empty-add-job")) {
      openApplicationModal();
      return;
    }

    if (e.target.closest("#btn-empty-add-playbook")) {
      openCountryPlaybookModal(state.selectedCountry !== "ALL" ? state.selectedCountry : "");
      return;
    }

    const copyBtn = e.target.closest(".copy-tpl-btn");
    if (copyBtn) {
      const targetId = copyBtn.dataset.copyTarget;
      const text = document.getElementById(targetId)?.textContent || "";
      navigator.clipboard?.writeText(text);
      showToast("Copied outreach template to clipboard!");
      return;
    }

    const delChkBtn = e.target.closest("[data-del-check-id]");
    if (delChkBtn) {
      const chkId = delChkBtn.dataset.delCheckId;
      state.checklist = state.checklist.filter((c) => c.id !== chkId);
      saveLocalCache();
      renderChecklist();
      sbDelete("resume_checklist", "id", chkId).catch(() => {});
    }
  });

  // Inline status change in table
  document.getElementById("jobs-table-body")?.addEventListener("change", (e) => {
    const select = e.target.closest("[data-inline-status-id]");
    if (!select) return;
    handleInlineStatusChange(select.dataset.inlineStatusId, select.value);
  });

  // Country playbook personal remarks live status & auto-save on blur/Cmd+Enter
  document.addEventListener("input", (e) => {
    const remarkInput = e.target.closest("[data-country-remarks-input]");
    if (!remarkInput) return;
    const countryName = remarkInput.dataset.countryRemarksInput;
    const statusBadge = remarkInput
      .closest(".strategy-remarks-box")
      ?.querySelector("[data-remark-status]");
    if (statusBadge) {
      statusBadge.textContent = "Unsaved changes...";
      statusBadge.classList.remove("is-saved");
      statusBadge.classList.add("is-dirty");
    }
    // Keep cache updated as the user types so nothing is ever lost
    setCountryRemarkInCache(countryName, remarkInput.value);
  });

  document.addEventListener("change", (e) => {
    const remarkInput = e.target.closest("[data-country-remarks-input]");
    if (!remarkInput) return;
    saveCountryRemark(remarkInput.dataset.countryRemarksInput, remarkInput.value, true);
  });

  document.addEventListener("keydown", (e) => {
    const remarkInput = e.target.closest("[data-country-remarks-input]");
    if (!remarkInput) return;
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      saveCountryRemark(remarkInput.dataset.countryRemarksInput, remarkInput.value, true);
    }
  });

  // Checklist checkbox toggle
  document.getElementById("checklist-table-body")?.addEventListener("change", async (e) => {
    const cb = e.target.closest("[data-check-id]");
    if (!cb) return;
    const item = state.checklist.find((c) => c.id === cb.dataset.checkId);
    if (!item) return;
    item.done = cb.checked ? "Yes" : "No";
    saveLocalCache();
    renderChecklist();
    try {
      await sbUpsert("resume_checklist", item, "id");
    } catch {
      // Saved in local cache
    }
  });

  // Add new checklist item
  document.getElementById("add-checklist-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const catInput = document.getElementById("new-chk-category");
    const itemInput = document.getElementById("new-chk-item");
    const category = catInput.value.trim();
    const actionItem = itemInput.value.trim();
    if (!category || !actionItem) return;

    const newItem = {
      id: `CHK-${Date.now().toString().slice(-4)}`,
      done: "No",
      resume_track: "Global / All Resume Tracks",
      category,
      action_item: actionItem,
      impact: "Custom milestone synced to Supabase",
      sort_order: state.checklist.length + 1
    };
    state.checklist.push(newItem);
    catInput.value = "";
    itemInput.value = "";
    saveLocalCache();
    renderChecklist();
    try {
      await sbUpsert("resume_checklist", newItem, "id");
      showToast("Added checklist item to Supabase!");
    } catch {
      showToast("Added checklist item locally.");
    }
  });

  // Pitch Studio interactive controls
  document.getElementById("pitch-select-app")?.addEventListener("change", (e) => {
    if (e.target.value) loadAppIntoPitchStudio(e.target.value);
  });
  ["pitch-company", "pitch-role", "pitch-country", "pitch-visa", "pitch-track"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", updatePitchTemplates);
    document.getElementById(id)?.addEventListener("change", updatePitchTemplates);
  });

  // AI Resume Tailor & Companion Event Listeners
  document.getElementById("btn-open-ai-tailor")?.addEventListener("click", () => {
    switchView("tailor");
  });

  document.getElementById("tailor-load-tracked-job")?.addEventListener("change", (e) => {
    if (e.target.value) {
      loadTrackedJobIntoTailor(e.target.value, false);
    }
  });

  document.getElementById("btn-run-ai-tailor")?.addEventListener("click", () => {
    runFullAiTailorPipeline(false);
  });

  document.getElementById("btn-tailor-scrape-only")?.addEventListener("click", () => {
    runFullAiTailorPipeline(true);
  });

  document.getElementById("btn-tailor-reset")?.addEventListener("click", () => {
    resetAiTailorStudio();
  });

  document.getElementById("btn-tailor-save-job")?.addEventListener("click", () => {
    saveScrapedJobToSupabaseTracker(false);
  });

  document.getElementById("btn-copy-latex")?.addEventListener("click", () => {
    const tex = document.getElementById("tailor-latex-editor")?.value || "";
    if (!tex) {
      showToast("No LaTeX code to copy yet.");
      return;
    }
    navigator.clipboard?.writeText(tex);
    showToast("Copied tailored LaTeX (.tex) source to clipboard!");
  });

  document.getElementById("btn-download-tex")?.addEventListener("click", () => {
    const tex = document.getElementById("tailor-latex-editor")?.value || "";
    if (!tex) {
      showToast("No LaTeX code to download yet.");
      return;
    }
    const baseName = (state.tailor.pdfFilename || "AnilKumarResume.pdf").replace(/\.pdf$/i, "");
    const blob = new Blob([tex], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}.tex`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    showToast(`Downloaded ${baseName}.tex!`);
  });

  document.getElementById("btn-recompile-latex")?.addEventListener("click", async () => {
    const tex = document.getElementById("tailor-latex-editor")?.value || "";
    if (!tex.trim()) {
      showToast("Paste or generate LaTeX source code first.");
      return;
    }
    state.tailor.tailoredTex = tex;
    const companyName = state.tailor.jobDetails?.company_name || "Tailored";
    await compileAndPreviewPdf(tex, companyName);
  });

  document.getElementById("btn-download-tailored-pdf")?.addEventListener("click", () => {
    if (!state.tailor.pdfBlobUrl) {
      showToast("Compile or generate the PDF first.");
      return;
    }
    const a = document.createElement("a");
    a.href = state.tailor.pdfBlobUrl;
    a.download = state.tailor.pdfFilename || "AnilKumarResume.pdf";
    a.click();
    showToast(`Downloaded ${state.tailor.pdfFilename}!`);
  });

  document.getElementById("btn-open-pdf-tab")?.addEventListener("click", () => {
    if (!state.tailor.pdfBlobUrl) return;
    window.open(state.tailor.pdfBlobUrl, "_blank", "noopener,noreferrer");
  });

  document.getElementById("btn-apply-and-track")?.addEventListener("click", async () => {
    await saveScrapedJobToSupabaseTracker(true);
  });

  // AI Companion Chat
  document.getElementById("ai-companion-form")?.addEventListener("submit", handleCompanionSubmit);
  document.getElementById("btn-clear-companion-chat")?.addEventListener("click", () => {
    state.tailor.companionHistory = [];
    const box = document.getElementById("ai-companion-messages");
    if (box) {
      box.innerHTML = `
        <div class="ai-msg ai-msg-assistant">
          <strong>🤖 AI Companion (gpt-5-chat-himanshuL):</strong>
          <p>Chat cleared! Paste any job link above or ask me anything about tailoring any of your saved LaTeX resumes (${state.latexResumes.length} variants available), ATS keywords, or relocation strategy.</p>
        </div>
      `;
    }
  });

  // Manage Base LaTeX Resumes & AI Settings Modal
  document.getElementById("btn-manage-latex-resumes")?.addEventListener("click", openAiTailorSettingsModal);
  document.getElementById("btn-open-resume-library-from-view")?.addEventListener("click", openAiTailorSettingsModal);
  document.getElementById("btn-close-tailor-settings")?.addEventListener("click", () => {
    document.getElementById("ai-tailor-settings-dialog")?.close();
  });
  document.getElementById("btn-close-tailor-settings-footer")?.addEventListener("click", () => {
    document.getElementById("ai-tailor-settings-dialog")?.close();
  });
  document.getElementById("latex-resume-form")?.addEventListener("submit", handleSaveLatexResumeForm);
  document.getElementById("btn-reset-default-resumes")?.addEventListener("click", handleResetDefaultLatexResumes);
  document.getElementById("btn-new-blank-resume")?.addEventListener("click", handleNewBlankLatexResume);
  document.getElementById("btn-ai-generate-base-tex")?.addEventListener("click", handleAiGenerateBaseLatexResume);
  document.getElementById("btn-save-ai-config")?.addEventListener("click", handleSaveAiConfig);
  document.getElementById("btn-test-ai-companion")?.addEventListener("click", handleTestAiCompanionConnection);

  // Supabase Settings & Sync buttons
  document.getElementById("btn-refresh-supabase")?.addEventListener("click", () => {
    fetchAllFromSupabase(true);
  });

  const openSbDialog = () => {
    document.getElementById("sb-url").value = state.supabaseUrl;
    document.getElementById("sb-key").value = state.supabaseKey;
    const diag = document.getElementById("sb-diagnostic-box");
    if (diag) {
      if (state.lastSyncError) {
        diag.hidden = false;
        diag.className = "gh-diagnostic error";
        diag.textContent = `Last Supabase Notice: ${state.lastSyncError.message}. If you haven't created the tables yet, open the Supabase SQL Editor above and run sql_schema.sql followed by update_sql_schema.sql.`;
      } else {
        diag.hidden = false;
        diag.className = "gh-diagnostic success";
        diag.textContent = `Connected to ${state.supabaseUrl} (${state.applications.length} applications, ${state.strategies.length} country playbooks, ${state.latexResumes.length} LaTeX resumes).`;
      }
    }
    document.getElementById("supabase-settings-dialog")?.showModal();
  };

  document.getElementById("btn-supabase-settings")?.addEventListener("click", openSbDialog);
  document.getElementById("supabase-backend-status")?.addEventListener("click", openSbDialog);
  document.getElementById("btn-close-sb-dialog")?.addEventListener("click", () => {
    document.getElementById("supabase-settings-dialog")?.close();
  });
  document.getElementById("btn-cancel-sb-dialog")?.addEventListener("click", () => {
    document.getElementById("supabase-settings-dialog")?.close();
  });

  document.getElementById("btn-seed-supabase-now")?.addEventListener("click", () => {
    seedDefaultDataToSupabase(true);
  });

  document.getElementById("btn-test-sb-conn")?.addEventListener("click", async () => {
    const diag = document.getElementById("sb-diagnostic-box");
    state.supabaseUrl = document.getElementById("sb-url").value.trim().replace(/\/+$/, "");
    state.supabaseKey = document.getElementById("sb-key").value.trim();
    try {
      const rows = await sbSelect("job_applications", "select=id&limit=5");
      diag.hidden = false;
      diag.className = "gh-diagnostic success";
      diag.textContent = `✅ Connection successful! Supabase table public.job_applications is live (${rows.length} sample rows verified).`;
    } catch (err) {
      diag.hidden = false;
      diag.className = "gh-diagnostic error";
      diag.textContent = `⚠️ Connected to Supabase host, but query returned: "${err.message}". Run sql_schema.sql and update_sql_schema.sql in your Supabase SQL Editor to initialize the tables.`;
    }
  });

  document.getElementById("supabase-settings-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    state.supabaseUrl = document.getElementById("sb-url").value.trim().replace(/\/+$/, "");
    state.supabaseKey = document.getElementById("sb-key").value.trim();
    localStorage.setItem(
      STORAGE_KEYS.sbConfig,
      JSON.stringify({ url: state.supabaseUrl, key: state.supabaseKey })
    );
    initSupabaseClient();
    document.getElementById("supabase-settings-dialog")?.close();
    fetchAllFromSupabase(true);
  });

  // Excel backup export/import
  document.getElementById("btn-export-excel")?.addEventListener("click", exportToExcelBackup);
  document.getElementById("btn-import-excel")?.addEventListener("click", () => {
    document.getElementById("excel-file-input")?.click();
  });
  document.getElementById("excel-file-input")?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (file) importExcelToSupabase(file);
    e.target.value = "";
  });

  document.getElementById("btn-close-toast")?.addEventListener("click", () => {
    const popover = document.getElementById("toast-popover");
    try {
      popover?.hidePopover();
    } catch {
      if (popover) popover.style.display = "none";
    }
  });
}

/* ==========================================================================
   VIEW 6: AI RESUME TAILOR, JOB LINK SCRAPER, ATS & RELATABILITY GATE,
           GENERATOR <-> SUPERVISOR LATEX LOOP, PDF COMPILER & AI COMPANION
   ========================================================================== */

function renderTailorResumeBadgeCount() {
  const el = document.getElementById("tailor-resumes-count");
  if (el) {
    el.textContent = String(state.latexResumes.length || 0);
  }
}

function populateTailorJobSelector() {
  const select = document.getElementById("tailor-load-tracked-job");
  if (!select) return;
  const currentVal = select.value;
  const opts = [`<option value="">— Or Pick a Tracked Job from Pipeline —</option>`];
  for (const app of state.applications) {
    const meta = resolveCountryMeta(app.country);
    opts.push(
      `<option value="${escapeHtml(app.id)}">${escapeHtml(meta.flag)} ${escapeHtml(app.company)} — ${escapeHtml(app.role)} (${escapeHtml(app.city || app.country)})</option>`
    );
  }
  select.innerHTML = opts.join("");
  if (currentVal && state.applications.some((a) => a.id === currentVal)) {
    select.value = currentVal;
  }
}

function findBestMatchingBaseResumeForTrack(trackStr) {
  const norm = String(trackStr || "").toLowerCase().trim();
  if (!norm) return state.latexResumes[0];
  // 1. Exact track match
  const exact = state.latexResumes.find((r) => String(r.track_type || "").toLowerCase().trim() === norm);
  if (exact) return exact;
  // 2. Partial keyword match
  const partial = state.latexResumes.find((r) => {
    const rt = String(r.track_type || "").toLowerCase();
    return (
      rt.includes(norm) ||
      norm.includes(rt) ||
      (norm.includes("genai") && rt.includes("genai")) ||
      ((norm.includes("sre") || norm.includes("distributed") || norm.includes("cloud")) &&
        (rt.includes("sre") || rt.includes("distributed") || rt.includes("cloud"))) ||
      ((norm.includes("full-stack") || norm.includes("fullstack") || norm.includes("react")) &&
        (rt.includes("full-stack") || rt.includes("fullstack") || rt.includes("react"))) ||
      (norm.includes("java") && rt.includes("java"))
    );
  });
  return partial || state.latexResumes[0];
}

function loadTrackedJobIntoTailor(appId, switchTab = true) {
  const app = state.applications.find((a) => a.id === appId);
  if (!app) return;
  const urlInput = document.getElementById("tailor-job-url");
  const selectEl = document.getElementById("tailor-load-tracked-job");
  const rawJdEl = document.getElementById("tailor-raw-jd");
  if (selectEl) selectEl.value = app.id;
  if (urlInput) urlInput.value = app.job_url || "";

  // Also pre-populate context in raw JD box so even if the job link is a generic careers root or behind login, the AI has rich context
  if (rawJdEl && !rawJdEl.value.trim()) {
    rawJdEl.value = [
      `Company: ${app.company}`,
      `Role / Title: ${app.role}`,
      `Location: ${app.city}, ${app.country} (${app.region})`,
      `Preferred Resume Track: ${app.resume_track}`,
      `Visa Route: ${app.visa_type || app.visa_sponsorship}`,
      `Compensation: ${app.salary_range || app.currency}`,
      `Key Role Notes & Technical Context: ${app.notes || ""}`
    ].join("\n");
  }

  // Pre-load the corresponding base LaTeX resume into the editor so the user can see it immediately
  const matchingResume = findBestMatchingBaseResumeForTrack(app.resume_track);
  if (matchingResume) {
    state.tailor.selectedResumeId = matchingResume.id;
    const editorEl = document.getElementById("tailor-latex-editor");
    if (editorEl && !editorEl.value.trim()) {
      editorEl.value = matchingResume.latex_code;
    }
    const badgeEl = document.getElementById("tailor-selected-resume-badge");
    if (badgeEl) badgeEl.textContent = matchingResume.name;
  }

  if (switchTab) {
    switchView("tailor");
    showToast(`Loaded ${app.company} — ${app.role} into AI Resume Tailor! Click "⚡ Scrape, Check ATS & Tailor PDF" to start.`);
  }
}

function appendTailorLog(message) {
  const logBox = document.getElementById("tailor-log-box");
  const card = document.getElementById("tailor-progress-card");
  if (card) card.hidden = false;
  if (!logBox) return;
  const timeStr = new Date().toLocaleTimeString([], { hour12: false });
  logBox.textContent += `\n[${timeStr}] ${message}`;
  logBox.scrollTop = logBox.scrollHeight;
}

function setTailorStepState(stepNumber, status) {
  const card = document.getElementById("tailor-progress-card");
  if (card) card.hidden = false;
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`tailor-step-${i}`);
    if (!el) continue;
    if (i < stepNumber) {
      el.classList.remove("active", "error");
      el.classList.add("done");
    } else if (i === stepNumber) {
      el.classList.remove("active", "done", "error");
      if (status === "active") el.classList.add("active");
      if (status === "done") el.classList.add("done");
      if (status === "error") el.classList.add("error");
    } else if (stepNumber === 1 && status === "active") {
      el.classList.remove("active", "done", "error");
    }
  }
}

function updateTailorStatusBadge(text) {
  const el = document.getElementById("tailor-status-badge");
  if (el) el.textContent = text;
}

/**
 * Calls the user's Azure OpenAI Companion endpoint (`gpt-5-chat-himanshuL`).
 * Automatically handles JSON-mode and gracefully retries without optional params if needed.
 */
async function callAzureOpenAI(messages, maxTokens = 4096, jsonMode = false) {
  const endpoint = (state.aiConfig.endpoint || DEFAULT_AZURE_OPENAI_ENDPOINT).trim();
  const apiKey = (state.aiConfig.apiKey || DEFAULT_AZURE_OPENAI_KEY).trim();
  if (!apiKey) {
    throw new Error(
      "Azure OpenAI API Key is not configured. Click '📚 Base LaTeX Resumes' in the header and paste your Azure OpenAI API Key under Section A."
    );
  }

  const makeRequest = async (includeOptionalParams) => {
    const body = {
      messages,
      max_completion_tokens: maxTokens
    };
    if (includeOptionalParams) {
      body.temperature = 0.3;
      if (jsonMode) {
        body.response_format = { type: "json_object" };
      }
    }
    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify(body)
    });
  };

  let res = await makeRequest(true);
  if (!res.ok && res.status === 400) {
    // Retry with minimal payload matching exact curl command
    res = await makeRequest(false);
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Azure OpenAI HTTP ${res.status}: ${errText.slice(0, 260)}`);
  }

  const data = await res.json();
  const choice = data.choices?.[0];
  if (!choice) {
    throw new Error("Empty response from Azure OpenAI deployment.");
  }
  return choice.message?.content || "";
}

function parseJSONFromAI(raw) {
  let cleaned = String(raw || "").trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }
  return JSON.parse(cleaned);
}

/**
 * Multi-tier Job URL Scraper:
 * Tier 1: Jina Reader API (`https://r.jina.ai/<url>`) — converts live job pages into clean markdown/text with CORS enabled.
 * Tier 2: AllOrigins CORS proxy (`https://api.allorigins.win/get?url=...`) + DOMParser HTML text & JSON-LD extractor.
 */
async function scrapeJobUrl(jobUrl) {
  const cleanUrl = String(jobUrl || "").trim();
  if (!cleanUrl) return "";

  // Tier 1: r.jina.ai
  try {
    appendTailorLog(`Scraping job page via Jina Reader: ${cleanUrl} ...`);
    const jinaRes = await fetch(`https://r.jina.ai/${cleanUrl}`, {
      method: "GET",
      headers: {
        Accept: "text/plain"
      }
    });
    if (jinaRes.ok) {
      const text = (await jinaRes.text()).trim();
      if (text.length > 180 && !/Access Denied|Cloudflare|Just a moment/i.test(text.slice(0, 350))) {
        appendTailorLog(`✅ Scraped ${text.length.toLocaleString()} chars of job page content.`);
        return text.slice(0, 15000);
      }
    }
  } catch (err) {
    appendTailorLog(`Jina reader notice (${err.message}), trying AllOrigins HTML proxy...`);
  }

  // Tier 2: AllOrigins proxy + DOMParser
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(cleanUrl)}`;
    const proxyRes = await fetch(proxyUrl);
    if (proxyRes.ok) {
      const data = await proxyRes.json();
      const html = data?.contents || "";
      if (html) {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const parts = [];
        if (doc.title) parts.push(`PAGE TITLE: ${doc.title}`);

        // Extract any JSON-LD JobPosting schema
        doc.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
          if (s.textContent && s.textContent.includes("JobPosting")) {
            parts.push(`JSON-LD JOB POSTING: ${s.textContent.trim()}`);
          }
        });

        // Meta description
        const metaDesc =
          doc.querySelector('meta[name="description"]')?.getAttribute("content") ||
          doc.querySelector('meta[property="og:description"]')?.getAttribute("content");
        if (metaDesc) parts.push(`META DESCRIPTION: ${metaDesc}`);

        doc
          .querySelectorAll("script, style, noscript, svg, img, nav, footer, header, iframe")
          .forEach((el) => el.remove());

        const bodyText = (doc.body?.innerText || doc.body?.textContent || "")
          .replace(/\s+/g, " ")
          .trim();
        if (bodyText) parts.push(bodyText);

        const combined = parts.join("\n\n").trim();
        if (combined.length > 120) {
          appendTailorLog(`✅ Extracted ${combined.length.toLocaleString()} chars from HTML & JSON-LD.`);
          return combined.slice(0, 15000);
        }
      }
    }
  } catch (err) {
    appendTailorLog(`HTML proxy notice: ${err.message}`);
  }

  return "";
}

/* ==========================================================================
   AI PROMPTS (PORTED FROM CHROME EXTENSION ai_tailor_resume/background.js)
   ========================================================================== */

const PROMPT_EXTRACT_JOB = `You are a job description parser. Given raw text from a webpage (or job notes), extract the structured job posting information. Ignore navigation, footers, ads, cookie banners, and unrelated content.

Also infer:
1. "seniority_level": the expected seniority from the title, years-of-experience requirement, and tone (e.g. "Intern", "Junior / Entry-Level (0-2 yrs)", "Mid-Level (2-5 yrs)", "Senior (5-8 yrs)", "Staff / Principal (8+ yrs)", "Lead / Manager").
2. "role_summary": a 1-2 sentence plain-English summary of what this person will actually do day-to-day.
3. "implied_skills": skills not literally written in the posting but strongly implied by the tech stack or responsibilities.
4. "country" and "city": infer the country and city of the job (default to "Germany" / "Berlin" or "Netherlands" / "Amsterdam" only if unspecified).

Respond ONLY with valid JSON in this exact format:
{
  "job_title": "...",
  "company_name": "...",
  "country": "...",
  "city": "...",
  "seniority_level": "...",
  "role_summary": "...",
  "must_have_skills": ["skill1", "skill2"],
  "nice_to_have_skills": ["skill1", "skill2"],
  "implied_skills": ["skill1", "skill2"],
  "responsibilities": ["resp1", "resp2"],
  "requirements": ["req1", "req2"],
  "ats_keywords": ["kw1", "kw2"]
}`;

const PROMPT_SKILL_MATCH_GATE = `You are a strict, realistic technical recruiter performing a pre-screen gate check. Given a candidate's LaTeX resume and extracted job details, evaluate TWO things:
1. SKILL MATCH — how well the candidate's existing skills cover the job requirements.
2. EXPERIENCE RELATABILITY — whether the candidate's actual work experience, projects, and domain background are genuinely relatable to what this role demands day-to-day.

RULES FOR SKILL MATCHING:
- Count a skill as "matched" if the candidate has the exact skill OR a directly equivalent/transferable technology in the same category (e.g., MySQL <-> PostgreSQL, RabbitMQ <-> Kafka, AWS <-> GCP, Spring Boot <-> Micronaut).
- Do NOT count a skill as matched if it is from a completely different domain (e.g., Java backend does NOT match React Native / iOS / Android).

RULES FOR EXPERIENCE RELATABILITY:
Break down into 5 domain dimensions (0-100):
  a) "domain_alignment" — Same problem space?
  b) "tech_stack_depth" — Production experience with core stack?
  c) "scale_and_complexity" — Similar scale/distributed complexity?
  d) "role_type_fit" — IC backend vs GenAI/ML vs frontend vs infra?
  e) "seniority_calibration" — Candidate YoE (~4 years at Airtel) vs role expectation?

Respond ONLY with valid JSON:
{
  "must_have_matched": ["skill1"],
  "must_have_missing": ["skill2"],
  "nice_to_have_matched": ["skill1"],
  "nice_to_have_missing": ["skill2"],
  "implied_matched": ["skill1"],
  "implied_missing": ["skill2"],
  "must_have_match_pct": 85,
  "overall_match_pct": 82,
  "experience_relatability": {
    "domain_alignment": 85,
    "tech_stack_depth": 90,
    "scale_and_complexity": 88,
    "role_type_fit": 90,
    "seniority_calibration": 85,
    "relatability_score": 88,
    "relatable_experiences": ["..."],
    "experience_gaps": ["..."],
    "transferability_verdict": "..."
  },
  "verdict": "PROCEED or STOP",
  "verdict_reason": "Clear 1-2 sentence explanation."
}`;

const PROMPT_GENERATOR_INITIAL = `You are an expert ATS Resume Optimizer and LaTeX specialist. Given a base LaTeX resume, extracted job details, and the skill-match analysis, produce a deeply tailored LaTeX resume that reads as if the candidate naturally built their career toward this exact role.

CRITICAL RULES:
1. Return ONLY the complete, compilable LaTeX code — no markdown fences, no commentary.
2. Preserve the EXACT LaTeX preamble (everything before \\begin{document}) character-for-character. Do NOT add or remove packages or change margins/geometry.
3. Maintain exact LaTeX command definitions (\\resumeItem, \\resumeSubheading, \\resumeProjectHeading, etc.).
4. NEVER fabricate companies, job titles, dates, degrees, or metrics. Keep all factual anchors intact (Airtel, NIT Bhopal, dates, 40%, 35%, 90%, etc.).
5. Aggressively weave matched & implied ATS keywords from the JD into Technical Skills, Work Experience bullets, and Key Projects using the JD's exact terminology.
6. Re-order bullets within each role so the most relevant bullet to this JD comes FIRST.
7. HARD ONE-PAGE LIMIT: The tailored resume MUST fit on a SINGLE A4 page. Keep bullet lengths concise and impactful.`;

const PROMPT_SUPERVISOR = `You are a strict ATS Resume Supervisor & Quality Auditor. Given the tailored LaTeX resume, the original base resume, and the target job details, audit the tailored resume across 5 dimensions (each 1-10):
1. ats_keyword_coverage
2. experience_relatability
3. bullet_impact
4. latex_validity
5. authenticity_and_page_fit

Respond ONLY with valid JSON:
{
  "scores": {
    "ats_keyword_coverage": 9,
    "experience_relatability": 9,
    "bullet_impact": 9,
    "latex_validity": 10,
    "authenticity_and_page_fit": 9
  },
  "overall_score": 9.2,
  "missing_keywords": [],
  "weak_bullets": [],
  "relatability_issues": [],
  "latex_issues": [],
  "page_fit_risk": "LOW",
  "specific_fixes": []
}`;

const PROMPT_GENERATOR_REVISE = `You are an expert ATS Resume Optimizer and LaTeX specialist. Revise the current LaTeX resume to fix every issue raised by the Supervisor audit while keeping the exact LaTeX preamble, factual history, and strict 1-page limit. Return ONLY raw compilable LaTeX code (no markdown fences).`;

function cleanLatexResponse(raw) {
  let cleaned = String(raw || "").trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:latex|tex)?\s*/i, "").replace(/\s*```$/, "");
  }
  const docIdx = cleaned.indexOf("\\documentclass");
  if (docIdx > 0) {
    cleaned = cleaned.slice(docIdx);
  }
  return cleaned;
}

function injectOnePageGuard(tex) {
  const guardSnippet =
    "\\usepackage{everypage}\n\\AddEverypageHook{\\ifnum\\value{page}>1 \\errmessage{Resume exceeds 1 page}\\fi}";
  if (tex.includes("Resume exceeds 1 page")) return tex;
  const idx = tex.indexOf("\\begin{document}");
  if (idx === -1) return tex;
  return tex.slice(0, idx) + guardSnippet + "\n" + tex.slice(idx);
}

/* ==========================================================================
   FULL END-TO-END AI RESUME TAILOR PIPELINE
   ========================================================================== */

function resetAiTailorStudio() {
  state.tailor.jobUrl = "";
  state.tailor.rawPageText = "";
  state.tailor.jobDetails = null;
  state.tailor.gateResults = [];
  state.tailor.finalEvaluation = null;

  const urlInput = document.getElementById("tailor-job-url");
  const jdInput = document.getElementById("tailor-raw-jd");
  const jobSelect = document.getElementById("tailor-load-tracked-job");
  if (urlInput) urlInput.value = "";
  if (jdInput) jdInput.value = "";
  if (jobSelect) jobSelect.value = "";

  const progCard = document.getElementById("tailor-progress-card");
  const intelCard = document.getElementById("tailor-job-intel-card");
  const gateCard = document.getElementById("tailor-gate-card");
  if (progCard) progCard.hidden = true;
  if (intelCard) intelCard.hidden = true;
  if (gateCard) gateCard.hidden = true;

  const editorEl = document.getElementById("tailor-latex-editor");
  if (editorEl && state.latexResumes[0]) {
    editorEl.value = state.latexResumes[0].latex_code;
  }
  updateTailorStatusBadge("Ready");
  showToast("Reset AI Resume Tailor Studio.");
}

async function runFullAiTailorPipeline(gateOnly = false) {
  if (state.tailor.running) {
    showToast("AI Tailor pipeline is already running...");
    return;
  }

  const jobUrlInput = document.getElementById("tailor-job-url")?.value.trim() || "";
  const rawJdInput = document.getElementById("tailor-raw-jd")?.value.trim() || "";

  if (!jobUrlInput && !rawJdInput) {
    showToast("Please paste a Job Link URL or paste a Job Description in the text override box.");
    document.getElementById("tailor-job-url")?.focus();
    return;
  }

  state.tailor.running = true;
  state.tailor.jobUrl = jobUrlInput;
  const runBtn = document.getElementById("btn-run-ai-tailor");
  const scrapeBtn = document.getElementById("btn-tailor-scrape-only");
  if (runBtn) {
    runBtn.disabled = true;
    runBtn.textContent = gateOnly ? "⚡ Scrape, Check ATS & Tailor PDF" : "⏳ Running AI Pipeline...";
  }
  if (scrapeBtn) {
    scrapeBtn.disabled = true;
    if (gateOnly) scrapeBtn.textContent = "⏳ Checking ATS Gate...";
  }

  const logBox = document.getElementById("tailor-log-box");
  if (logBox) logBox.textContent = `[${new Date().toLocaleTimeString([], { hour12: false })}] Starting AI Resume Tailor & ATS Pipeline...`;

  try {
    // STEP 1: Scrape Job Link or Read JD Text
    setTailorStepState(1, "active");
    updateTailorStatusBadge("Step 1/5: Scraping Job Link...");
    let scrapedText = "";
    if (jobUrlInput) {
      scrapedText = await scrapeJobUrl(jobUrlInput);
    }

    const combinedPageText = [
      jobUrlInput ? `JOB URL: ${jobUrlInput}` : "",
      rawJdInput ? `USER / TRACKER JOB CONTEXT:\n${rawJdInput}` : "",
      scrapedText ? `SCRAPED WEBPAGE CONTENT:\n${scrapedText}` : ""
    ]
      .filter(Boolean)
      .join("\n\n");

    if (combinedPageText.length < 40) {
      document.getElementById("tailor-raw-jd-details")?.setAttribute("open", "open");
      throw new Error(
        "This job board blocked automated scraping (e.g. login wall). Please paste the Job Description text into the 'Paste / Override Raw Job Description Text' box above and click Run again."
      );
    }
    state.tailor.rawPageText = combinedPageText;
    setTailorStepState(1, "done");

    // STEP 2: Extract Structured Job Details via Azure OpenAI
    setTailorStepState(2, "active");
    updateTailorStatusBadge("Step 2/5: Extracting Job Intelligence...");
    appendTailorLog("Calling Azure OpenAI (gpt-5-chat-himanshuL) to extract structured JD & ATS keywords...");

    const extractRaw = await callAzureOpenAI(
      [
        { role: "system", content: PROMPT_EXTRACT_JOB },
        { role: "user", content: combinedPageText.slice(0, 14000) }
      ],
      2048,
      true
    );
    const jobDetails = parseJSONFromAI(extractRaw);
    state.tailor.jobDetails = jobDetails;
    renderExtractedJobIntel(jobDetails);
    appendTailorLog(
      `✅ Extracted Role: "${jobDetails.job_title}" at "${jobDetails.company_name}" (${jobDetails.city || ""}, ${jobDetails.country || ""}) — ${(jobDetails.must_have_skills || []).length} must-have skills, ${(jobDetails.ats_keywords || []).length} ATS keywords.`
    );
    setTailorStepState(2, "done");

    // STEP 3: Parallel Multi-Resume ATS & Relatability Gate (Fetched strictly from Supabase)
    setTailorStepState(3, "active");
    updateTailorStatusBadge("Step 3/5: Evaluating ATS & Relatability Gate...");
    if (state.latexResumes.length === 0) {
      appendTailorLog("Fetching base LaTeX resumes from Supabase (public.latex_resumes)...");
      await fetchResumesFromSupabase(false);
    }
    const resumesToCheck = state.latexResumes;
    if (resumesToCheck.length === 0) {
      throw new Error(
        "No base LaTeX resumes found in Supabase (`public.latex_resumes`). Run `update_sql_schema.sql` in the Supabase SQL Editor or click '📚 Base LaTeX Resumes' to save a resume to Supabase first."
      );
    }
    appendTailorLog(`Running parallel ATS & Experience Relatability Gate across ${resumesToCheck.length} Supabase LaTeX resume(s)...`);

    const gateResults = await Promise.all(
      resumesToCheck.map(async (resObj) => {
        const rawGate = await callAzureOpenAI(
          [
            { role: "system", content: PROMPT_SKILL_MATCH_GATE },
            {
              role: "user",
              content: `CANDIDATE BASE RESUME (${resObj.name}):\n${resObj.latex_code}\n\nJOB DETAILS:\n${JSON.stringify(jobDetails, null, 2)}`
            }
          ],
          2048,
          true
        );
        const parsed = parseJSONFromAI(rawGate);
        const relScore = parsed.experience_relatability?.relatability_score ?? 0;
        const compositeScore = Math.round((parsed.overall_match_pct || 0) * 0.5 + relScore * 0.5);
        const hardPassed =
          (parsed.must_have_match_pct ?? 0) >= 60 &&
          (parsed.overall_match_pct ?? 0) >= 65 &&
          relScore >= 60 &&
          parsed.verdict === "PROCEED";
        return {
          resumeId: resObj.id,
          resumeName: resObj.name,
          trackType: resObj.track_type,
          matchResult: parsed,
          relScore,
          compositeScore,
          hardPassed
        };
      })
    );

    gateResults.sort((a, b) => b.compositeScore - a.compositeScore);
    state.tailor.gateResults = gateResults;
    const bestGate = gateResults[0];
    state.tailor.selectedResumeId = bestGate.resumeId;
    renderMultiResumeGateComparison(gateResults, bestGate.resumeId);
    setTailorStepState(3, "done");

    appendTailorLog(
      `🏆 Best matching resume: "${bestGate.resumeName}" — ATS Match: ${bestGate.matchResult.overall_match_pct}%, Experience Relatability: ${bestGate.relScore}%, Composite: ${bestGate.compositeScore}%.`
    );

    if (gateOnly) {
      updateTailorStatusBadge(`✅ Gate Checked (${bestGate.compositeScore}% Fit)`);
      showToast(`ATS Gate Complete! Best track: ${bestGate.resumeName} (${bestGate.compositeScore}% fit).`);
      return;
    }

    // Run Step 4 & Step 5 using the winning resume
    await runTailoringAndCompileForResume(bestGate.resumeId, bestGate.matchResult);
  } catch (err) {
    console.error("AI Tailor Pipeline Error:", err);
    appendTailorLog(`❌ Pipeline Error: ${err.message}`);
    updateTailorStatusBadge("Pipeline Error");
    showToast(`AI Tailor Error: ${err.message}`);
  } finally {
    state.tailor.running = false;
    if (runBtn) {
      runBtn.disabled = false;
      runBtn.textContent = "⚡ Scrape, Check ATS & Tailor PDF";
    }
    if (scrapeBtn) {
      scrapeBtn.disabled = false;
      scrapeBtn.textContent = "🔍 Scrape & Check ATS Gate Only";
    }
  }
}

async function handleForceTailorWithResume(resumeId) {
  if (state.tailor.running) {
    showToast("Please wait for the current AI operation to finish.");
    return;
  }
  const resumeObj = state.latexResumes.find((r) => r.id === resumeId);
  if (!resumeObj || !state.tailor.jobDetails) return;

  state.tailor.selectedResumeId = resumeId;
  renderMultiResumeGateComparison(state.tailor.gateResults, resumeId);
  const gateEntry = state.tailor.gateResults.find((g) => g.resumeId === resumeId);

  state.tailor.running = true;
  try {
    await runTailoringAndCompileForResume(resumeId, gateEntry?.matchResult || null);
  } catch (err) {
    appendTailorLog(`❌ Error: ${err.message}`);
    showToast(`Error: ${err.message}`);
  } finally {
    state.tailor.running = false;
  }
}

async function runTailoringAndCompileForResume(resumeId, matchResult) {
  if (state.latexResumes.length === 0) {
    await fetchResumesFromSupabase(false);
  }
  const resumeObj = state.latexResumes.find((r) => r.id === resumeId) || state.latexResumes[0];
  if (!resumeObj) {
    throw new Error("No base LaTeX resume found in Supabase (`public.latex_resumes`).");
  }
  const jobDetails = state.tailor.jobDetails;
  const maxRounds = Number.parseInt(document.getElementById("tailor-max-rounds")?.value || "2", 10);

  const workbench = document.getElementById("tailor-workbench-grid");
  if (workbench) workbench.hidden = false;
  const selBadge = document.getElementById("tailor-selected-resume-badge");
  if (selBadge) selBadge.textContent = resumeObj.name;

  // STEP 4: Generator <-> Supervisor Loop
  setTailorStepState(4, "active");
  updateTailorStatusBadge(`Step 4/5: Tailoring ${resumeObj.id} (Gen ↔ Sup)...`);
  appendTailorLog(`Generating initial tailored LaTeX from "${resumeObj.name}"...`);

  const rel = matchResult?.experience_relatability || {};
  const matchContext = matchResult
    ? `\n\nSKILL & RELATABILITY ANALYSIS:
- Matched Must-Have Skills: ${(matchResult.must_have_matched || []).join(", ")}
- Matched Nice-to-Have Skills: ${(matchResult.nice_to_have_matched || []).join(", ")}
- Matched Implied Skills: ${(matchResult.implied_matched || []).join(", ")}
- Relatable Experiences to Highlight First: ${(rel.relatable_experiences || []).join("; ")}
- Transferability Strategy: ${rel.transferability_verdict || "Emphasize high-scale production impact at Airtel."}`
    : "";

  const genInitRaw = await callAzureOpenAI(
    [
      { role: "system", content: PROMPT_GENERATOR_INITIAL },
      {
        role: "user",
        content: `BASE RESUME (LaTeX):\n${resumeObj.latex_code}\n\nJOB DETAILS:\n${JSON.stringify(jobDetails, null, 2)}${matchContext}`
      }
    ],
    4096,
    false
  );

  let currentTex = cleanLatexResponse(genInitRaw);
  const editorEl = document.getElementById("tailor-latex-editor");
  if (editorEl) editorEl.value = currentTex;

  let evaluation = null;
  for (let round = 1; round <= maxRounds; round++) {
    updateTailorStatusBadge(`Step 4/5: Supervisor Audit (Round ${round}/${maxRounds})...`);
    appendTailorLog(`Supervisor auditing tailored LaTeX (Round ${round}/${maxRounds})...`);

    const supRaw = await callAzureOpenAI(
      [
        { role: "system", content: PROMPT_SUPERVISOR },
        {
          role: "user",
          content: `TAILORED RESUME (LaTeX):\n${currentTex}\n\nORIGINAL BASE RESUME (LaTeX):\n${resumeObj.latex_code}\n\nJOB DETAILS:\n${JSON.stringify(jobDetails, null, 2)}`
        }
      ],
      2048,
      true
    );
    evaluation = parseJSONFromAI(supRaw);
    state.tailor.finalEvaluation = evaluation;

    const scoreBadge = document.getElementById("tailor-supervisor-score-badge");
    if (scoreBadge) {
      scoreBadge.textContent = `Supervisor Score: ${evaluation.overall_score}/10 (${evaluation.page_fit_risk || "LOW"} page risk)`;
    }
    appendTailorLog(
      `Supervisor Round ${round} Score: ${evaluation.overall_score}/10 (ATS: ${evaluation.scores?.ats_keyword_coverage}/10, Relatability: ${evaluation.scores?.experience_relatability}/10, Page Risk: ${evaluation.page_fit_risk}).`
    );

    if (evaluation.overall_score >= 8.6 && evaluation.page_fit_risk !== "HIGH") {
      appendTailorLog(`✅ Supervisor approved tailored LaTeX at Round ${round}!`);
      break;
    }

    if (round < maxRounds) {
      appendTailorLog(`Applying ${(evaluation.specific_fixes || []).length} Supervisor fixes in Generator revision...`);
      const revRaw = await callAzureOpenAI(
        [
          { role: "system", content: PROMPT_GENERATOR_REVISE },
          {
            role: "user",
            content: `CURRENT RESUME (LaTeX):\n${currentTex}\n\nORIGINAL BASE RESUME (LaTeX):\n${resumeObj.latex_code}\n\nJOB DETAILS:\n${JSON.stringify(jobDetails, null, 2)}\n\nSUPERVISOR AUDIT:\n${JSON.stringify(evaluation, null, 2)}`
          }
        ],
        4096,
        false
      );
      currentTex = cleanLatexResponse(revRaw);
      if (editorEl) editorEl.value = currentTex;
    }
  }

  currentTex = injectOnePageGuard(currentTex);
  state.tailor.tailoredTex = currentTex;
  if (editorEl) editorEl.value = currentTex;
  setTailorStepState(4, "done");

  // STEP 5: Compile Tailored LaTeX to PDF
  const companySlug = jobDetails?.company_name || "Company";
  await compileAndPreviewPdf(currentTex, companySlug);
}

/**
 * Compiles LaTeX source to a 1-page PDF using the user's Supabase Edge Function
 * (`https://vaggbwodamenwlbxdicj.supabase.co/functions/v1/latexToPdfConverter`)
 * with automatic fallback to `https://latex.ytotech.com/builds/sync`.
 */
async function compileAndPreviewPdf(texSource, companyName = "Company") {
  setTailorStepState(5, "active");
  updateTailorStatusBadge("Step 5/5: Compiling LaTeX → PDF...");
  const pdfStatusEl = document.getElementById("tailor-pdf-status-badge");
  if (pdfStatusEl) pdfStatusEl.textContent = "Compiling PDF...";

  const sanitizedCompany = String(companyName || "Company").replace(/[^a-zA-Z0-9_-]/g, "");
  const filenameBase = `AnilKumarResume_${sanitizedCompany || "Tailored"}`;
  const fullPdfName = `${filenameBase}.pdf`;
  state.tailor.pdfFilename = fullPdfName;

  const fnLabel = document.getElementById("tailor-pdf-filename-label");
  if (fnLabel) fnLabel.textContent = fullPdfName;

  appendTailorLog(`Compiling LaTeX to PDF (${fullPdfName})...`);

  let pdfBlob = null;
  const primaryEndpoint = (state.aiConfig.pdfEndpoint || DEFAULT_LATEX_PDF_ENDPOINT).trim();
  const primaryKey = (state.aiConfig.pdfKey || DEFAULT_LATEX_PDF_KEY).trim();

  // Attempt 1: User's Supabase Edge Function `latexToPdfConverter`
  try {
    const res = await fetch(primaryEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${primaryKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tex: texSource,
        filename: filenameBase
      })
    });
    if (res.ok) {
      const contentType = res.headers.get("Content-Type") || "";
      if (contentType.includes("application/pdf")) {
        pdfBlob = await res.blob();
        appendTailorLog(`✅ Compiled PDF via Supabase latexToPdfConverter (${(pdfBlob.size / 1024).toFixed(1)} KB).`);
      }
    } else {
      const errDetail = await res.text().catch(() => "");
      appendTailorLog(`latexToPdfConverter status ${res.status} (${errDetail.slice(0, 120)}), using direct YtoTech XeLaTeX/pdfLaTeX compiler...`);
    }
  } catch (err) {
    appendTailorLog(`Primary PDF endpoint notice (${err.message}), using direct YtoTech LaTeX compiler...`);
  }

  // Attempt 2: Direct call to `https://latex.ytotech.com/builds/sync` (same engine used inside the edge function)
  if (!pdfBlob) {
    for (const compiler of ["pdflatex", "xelatex"]) {
      try {
        const ytoRes = await fetch(FALLBACK_YTOTECH_PDF_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            compiler,
            resources: [{ main: true, content: texSource }]
          })
        });
        if (ytoRes.ok && (ytoRes.headers.get("Content-Type") || "").includes("application/pdf")) {
          pdfBlob = await ytoRes.blob();
          appendTailorLog(`✅ Compiled 1-page PDF via ${compiler} (${(pdfBlob.size / 1024).toFixed(1)} KB).`);
          break;
        }
        // If 1-page everypage hook triggered an error, strip the hook and retry once with tightened spacing
        const errJson = await ytoRes.json().catch(() => ({}));
        const logStr = String(errJson?.logs || errJson?.error || "");
        if (logStr.includes("Resume exceeds 1 page")) {
          appendTailorLog(`⚠️ 1-page guard triggered; auto-tightening vertical spacing to fit 1 page...`);
          texSource = texSource
            .replace(/\\AddEverypageHook\{[^}]*\}\}/g, "")
            .replace(/top=0\.4in/g, "top=0.32in")
            .replace(/bottom=0\.4in/g, "bottom=0.32in")
            .replace(/itemsep=1pt/g, "itemsep=0pt");
        }
      } catch (innerErr) {
        console.warn(`Compiler ${compiler} attempt failed:`, innerErr);
      }
    }
  }

  if (!pdfBlob) {
    setTailorStepState(5, "error");
    if (pdfStatusEl) pdfStatusEl.textContent = "PDF Compile Error";
    throw new Error("LaTeX-to-PDF compilation failed. Check the LaTeX syntax in the editor and click Recompile.");
  }

  if (state.tailor.pdfBlobUrl) {
    URL.revokeObjectURL(state.tailor.pdfBlobUrl);
  }
  const blobUrl = URL.createObjectURL(pdfBlob);
  state.tailor.pdfBlob = pdfBlob;
  state.tailor.pdfBlobUrl = blobUrl;

  const iframe = document.getElementById("tailor-pdf-iframe");
  const placeholder = document.getElementById("tailor-pdf-placeholder");
  if (iframe) {
    iframe.src = blobUrl;
    iframe.hidden = false;
  }
  if (placeholder) placeholder.hidden = true;

  const dlBtn = document.getElementById("btn-download-tailored-pdf");
  const openBtn = document.getElementById("btn-open-pdf-tab");
  if (dlBtn) dlBtn.disabled = false;
  if (openBtn) openBtn.disabled = false;

  setTailorStepState(5, "done");
  updateTailorStatusBadge("✅ Tailored PDF Ready!");
  if (pdfStatusEl) pdfStatusEl.textContent = `✅ Ready (${(pdfBlob.size / 1024).toFixed(0)} KB)`;
  showToast(`Tailored PDF (${fullPdfName}) compiled and ready to download & apply!`);
}

function renderExtractedJobIntel(jd) {
  const card = document.getElementById("tailor-job-intel-card");
  if (!card || !jd) return;
  card.hidden = false;

  const meta = resolveCountryMeta(jd.country || "Germany");
  const titleEl = document.getElementById("tailor-intel-title");
  const senEl = document.getElementById("tailor-intel-seniority");
  const sumEl = document.getElementById("tailor-intel-summary");

  if (titleEl) {
    titleEl.textContent = `${meta.flag} ${jd.company_name || "Company"} — ${jd.job_title || "Software Engineer"} (${jd.city || meta.country})`;
  }
  if (senEl) senEl.textContent = jd.seniority_level || "Senior";
  if (sumEl) sumEl.textContent = jd.role_summary || "";

  const renderPills = (arr) =>
    (arr || []).length === 0
      ? `<span class="cell-sub">None specified</span>`
      : (arr || []).map((s) => `<span class="skill-pill">${escapeHtml(s)}</span>`).join("");

  const mustEl = document.getElementById("tailor-intel-must");
  const niceEl = document.getElementById("tailor-intel-nice");
  const impEl = document.getElementById("tailor-intel-implied");
  if (mustEl) mustEl.innerHTML = renderPills(jd.must_have_skills);
  if (niceEl) niceEl.innerHTML = renderPills(jd.nice_to_have_skills);
  if (impEl) impEl.innerHTML = renderPills([...(jd.implied_skills || []), ...(jd.ats_keywords || []).slice(0, 8)]);
}

function renderMultiResumeGateComparison(gateResults, selectedResumeId) {
  const card = document.getElementById("tailor-gate-card");
  const grid = document.getElementById("tailor-gate-comparison-grid");
  const verdictBadge = document.getElementById("tailor-gate-verdict-badge");
  if (!card || !grid) return;
  card.hidden = false;

  const best = gateResults[0];
  if (verdictBadge && best) {
    verdictBadge.className = `badge ${best.hardPassed ? "badge-java" : "badge-genai"}`;
    verdictBadge.textContent = best.hardPassed
      ? `✅ GATE PASSED — Best Fit: ${best.resumeName} (${best.compositeScore}% Fit)`
      : `⚠️ PARTIAL FIT — Best Track: ${best.resumeName} (${best.compositeScore}% Fit)`;
  }

  const domainLabels = [
    ["domain_alignment", "Domain Alignment"],
    ["tech_stack_depth", "Tech Stack Depth"],
    ["scale_and_complexity", "Scale & Complexity"],
    ["role_type_fit", "Role Type Fit"],
    ["seniority_calibration", "Seniority Fit"]
  ];

  grid.innerHTML = gateResults
    .map((item) => {
      const m = item.matchResult || {};
      const rel = m.experience_relatability || {};
      const isWinner = item.resumeId === selectedResumeId;

      const domainBarsHtml = domainLabels
        .map(([key, label]) => {
          const val = Number(rel[key] ?? 0);
          return `
            <div class="domain-gate-row">
              <span>${escapeHtml(label)}</span>
              <div class="domain-gate-bar">
                <div class="domain-gate-fill" style="width: ${Math.min(100, Math.max(0, val))}%"></div>
              </div>
              <strong>${val}%</strong>
            </div>
          `;
        })
        .join("");

      const matchedPills = (m.must_have_matched || [])
        .map((s) => `<span class="skill-pill matched">✓ ${escapeHtml(s)}</span>`)
        .join("");
      const missingPills = (m.must_have_missing || [])
        .map((s) => `<span class="skill-pill missing">✗ ${escapeHtml(s)}</span>`)
        .join("");

      return `
        <article class="resume-gate-card ${isWinner ? "winner" : ""} ${!item.hardPassed ? "rejected" : ""}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
            <div>
              <h4 style="font-size:0.95rem; font-weight:700;">${escapeHtml(item.resumeName)}</h4>
              <span class="cell-sub">${escapeHtml(item.trackType)}</span>
            </div>
            <span class="badge ${isWinner ? "badge-java" : "badge-sponsor"}">
              ${isWinner ? "🏆 Active Track" : `${item.compositeScore}% Composite`}
            </span>
          </div>

          <div class="gate-Circular-scores">
            <div class="gate-metric-box">
              <strong>${m.must_have_match_pct ?? 0}%</strong>
              <span>Must-Have (≥60%)</span>
            </div>
            <div class="gate-metric-box">
              <strong>${m.overall_match_pct ?? 0}%</strong>
              <span>Overall ATS (≥65%)</span>
            </div>
            <div class="gate-metric-box">
              <strong>${item.relScore}%</strong>
              <span>Relatability (≥60%)</span>
            </div>
          </div>

          <div class="domain-bars-wrap">
            ${domainBarsHtml}
          </div>

          <p class="cell-sub" style="margin-bottom:0.5rem;">
            <strong>Verdict (${escapeHtml(m.verdict || "PROCEED")}):</strong> ${escapeHtml(m.verdict_reason || rel.transferability_verdict || "")}
          </p>

          <div class="tailor-skill-pills" style="margin-bottom:0.75rem;">
            ${matchedPills}
            ${missingPills}
          </div>

          <div style="display:flex; justify-content:flex-end;">
            <button type="button" class="btn ${isWinner ? "btn-secondary" : "btn-primary"} btn-sm" data-force-tailor-resume-id="${escapeHtml(item.resumeId)}">
              ${isWinner ? "🔄 Re-Tailor with This Resume" : "✨ Switch & Tailor with This Resume"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

async function saveScrapedJobToSupabaseTracker(andOpenApplyLink = false) {
  const jd = state.tailor.jobDetails;
  const jobUrl = document.getElementById("tailor-job-url")?.value.trim() || state.tailor.jobUrl || "";
  const selectedRes = state.latexResumes.find((r) => r.id === state.tailor.selectedResumeId);
  const bestGate = state.tailor.gateResults.find((g) => g.resumeId === state.tailor.selectedResumeId) || state.tailor.gateResults[0];

  const countryName = jd?.country || (state.selectedCountry !== "ALL" ? state.selectedCountry : "Netherlands");
  const meta = resolveCountryMeta(countryName);

  const newRow = {
    id: generateNextAppId(),
    country: meta.country,
    iso_code: meta.iso_code,
    region: meta.region,
    city: jd?.city || "",
    work_mode: "On-site / Relocation",
    company: jd?.company_name || "Target Company",
    role: jd?.job_title || "Senior Software Engineer",
    resume_track: selectedRes?.track_type || "Java / Spring Boot Backend",
    status: andOpenApplyLink ? "Applied" : "Wishlist",
    priority: "High",
    visa_sponsorship: "Verified Sponsor",
    visa_type: meta.visa,
    salary_range: "Market Competitive",
    currency: meta.currency,
    applied_date: getTodayIso(),
    follow_up_date: addDaysIso(getTodayIso(), 7),
    job_url: jobUrl,
    contact_recruiter: "",
    notes: [
      bestGate ? `AI ATS Match: ${bestGate.matchResult?.overall_match_pct ?? 0}% | Relatability: ${bestGate.relScore}%` : "",
      state.tailor.finalEvaluation ? `Supervisor Score: ${state.tailor.finalEvaluation.overall_score}/10` : "",
      jd?.role_summary || ""
    ]
      .filter(Boolean)
      .join(" · "),
    excitement_score: 5
  };

  state.applications.unshift(newRow);
  saveLocalCache();
  renderAll();

  try {
    await sbUpsert("job_applications", newRow, "id");
    showToast(`Saved ${newRow.company} (${newRow.role}) to Supabase Tracker!`);
  } catch (err) {
    showToast(`Saved ${newRow.company} locally — Supabase notice: ${err.message}`);
  }

  if (andOpenApplyLink) {
    if (state.tailor.pdfBlobUrl) {
      const a = document.createElement("a");
      a.href = state.tailor.pdfBlobUrl;
      a.download = state.tailor.pdfFilename || "AnilKumarResume.pdf";
      a.click();
    }
    if (jobUrl) {
      window.open(jobUrl, "_blank", "noopener,noreferrer");
    }
  }
}

/* ==========================================================================
   AI CAREER & RESUME COMPANION CHAT (AZURE OPENAI GPT-5-CHAT)
   ========================================================================== */

async function handleCompanionSubmit(e) {
  e.preventDefault();
  const inputEl = document.getElementById("ai-companion-input");
  const msgContainer = document.getElementById("ai-companion-messages");
  const sendBtn = document.getElementById("btn-send-companion");
  if (!inputEl || !msgContainer) return;

  const userText = inputEl.value.trim();
  if (!userText) return;
  inputEl.value = "";

  msgContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="ai-msg ai-msg-user"><strong>👤 You:</strong><p>${escapeHtml(userText)}</p></div>`
  );
  msgContainer.scrollTop = msgContainer.scrollHeight;

  if (sendBtn) {
    sendBtn.disabled = true;
    sendBtn.textContent = "Thinking...";
  }

  try {
    const savedTracksSummary = state.latexResumes
      .map((r) => `${r.name} [Track: ${r.track_type}]`)
      .join("; ");
    const contextSummary = [
      `Candidate: Anil Kumar, Senior Software Engineer at Airtel (July 2022–Present, 4+ YoE), B.Tech CSE from NIT Bhopal (CGPA 8.30/10, AIR 6599 JEE Mains).`,
      `Saved Base LaTeX Resumes (${state.latexResumes.length}): ${savedTracksSummary}`,
      `Core Production Metrics: Java 8/21, Spring Boot 2/3 (40% perf gain), Kafka, RabbitMQ, Solace, Aerospike, MongoDB Change Streams (35% latency cut), MySQL, React, Docker, Kubernetes, Agentic AI SRE Platform (Python, CrewAI, FastAPI, GPT-4, Claude, RAG, FAISS — 90% RCA reduction).`,
      state.tailor.jobDetails
        ? `Current Target Job: ${JSON.stringify(state.tailor.jobDetails)}`
        : "No specific job scraped yet in this session.",
      state.tailor.gateResults?.length
        ? `Latest ATS Gate Results: ${JSON.stringify(
            state.tailor.gateResults.map((g) => ({
              resume: g.resumeName,
              track: g.trackType,
              atsMatch: g.matchResult?.overall_match_pct,
              relatability: g.relScore,
              missingMustHaves: g.matchResult?.must_have_missing
            }))
          )}`
        : ""
    ]
      .filter(Boolean)
      .join("\n");

    const messages = [
      {
        role: "system",
        content: `You are Anil Kumar's dedicated AI Career & Resume Companion powered by Azure OpenAI (gpt-5-chat-himanshuL). Give specific, actionable, high-converting advice tailored to his exact Airtel metrics, NIT Bhopal degree, international visa routes, and the currently loaded job description.\n\nCONTEXT:\n${contextSummary}`
      },
      ...state.tailor.companionHistory.slice(-6),
      { role: "user", content: userText }
    ];

    const reply = await callAzureOpenAI(messages, 1200, false);
    state.tailor.companionHistory.push({ role: "user", content: userText }, { role: "assistant", content: reply });

    msgContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="ai-msg ai-msg-assistant"><strong>🤖 AI Companion:</strong><p style="white-space:pre-wrap;">${escapeHtml(reply)}</p></div>`
    );
    msgContainer.scrollTop = msgContainer.scrollHeight;
  } catch (err) {
    msgContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="ai-msg ai-msg-assistant"><strong>⚠️ AI Companion Error:</strong><p>${escapeHtml(err.message)}</p></div>`
    );
  } finally {
    if (sendBtn) {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send to AI ↗";
    }
  }
}

/* ==========================================================================
   BASE LATEX RESUMES MANAGER & AI SETTINGS MODAL (UNLIMITED RESUME TRACKS)
   ========================================================================== */

function openAiTailorSettingsModal() {
  const dialog = document.getElementById("ai-tailor-settings-dialog");
  if (!dialog) return;

  document.getElementById("ai-endpoint-input").value = state.aiConfig.endpoint || DEFAULT_AZURE_OPENAI_ENDPOINT;
  document.getElementById("ai-apikey-input").value = state.aiConfig.apiKey || DEFAULT_AZURE_OPENAI_KEY;
  document.getElementById("pdf-endpoint-input").value = state.aiConfig.pdfEndpoint || DEFAULT_LATEX_PDF_ENDPOINT;
  document.getElementById("pdf-apikey-input").value = state.aiConfig.pdfKey || DEFAULT_LATEX_PDF_KEY;

  populateResumeTrackControls();
  renderLatexResumesManagerList();
  dialog.showModal();
}

function renderLatexResumesManagerList() {
  const container = document.getElementById("latex-resumes-manager-list");
  const savedBadge = document.getElementById("saved-resumes-count-badge");
  if (savedBadge) {
    savedBadge.textContent = String(state.latexResumes.length);
  }
  if (!container) return;

  if (!state.latexResumes || state.latexResumes.length === 0) {
    container.innerHTML = `
      <div class="latex-resume-item">
        <div class="latex-resume-item-info">
          <strong>No Base LaTeX Resumes Found in Supabase (<code>public.latex_resumes</code>)</strong>
          <span>Run <code>update_sql_schema.sql</code> in the Supabase SQL Editor or use the form below to save a resume directly to Supabase.</span>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = state.latexResumes
    .map((r) => {
      const badge = getResumeTrackBadge(r.track_type);
      return `
      <div class="latex-resume-item">
        <div class="latex-resume-item-info">
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <strong>${escapeHtml(r.name)} <span class="cell-id">(${escapeHtml(r.id)})</span></strong>
            <span class="badge ${badge.badgeClass}">${escapeHtml(badge.shortLabel)}</span>
          </div>
          <span>Track: ${escapeHtml(r.track_type)} · ${(r.latex_code || "").length.toLocaleString()} chars LaTeX · Synced from Supabase</span>
        </div>
        <div class="row-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-edit-latex-id="${escapeHtml(r.id)}" title="Load into form to edit">
            ✏️ Edit .tex
          </button>
          <button type="button" class="btn btn-secondary btn-sm" data-duplicate-latex-id="${escapeHtml(r.id)}" title="Clone this resume into a new variant in Supabase">
            📋 Clone
          </button>
          <button type="button" class="btn btn-danger btn-sm" data-del-latex-id="${escapeHtml(r.id)}" title="Delete this resume variant from Supabase">
            🗑️
          </button>
        </div>
      </div>
    `;
    })
    .join("");
}

function loadLatexResumeIntoForm(resumeId) {
  const r = state.latexResumes.find((item) => item.id === resumeId);
  if (!r) return;
  document.getElementById("lr-id").value = r.id;
  document.getElementById("lr-name").value = r.name;
  document.getElementById("lr-track").value = r.track_type;
  document.getElementById("lr-code").value = r.latex_code;
  document.getElementById("lr-name")?.focus();
}

function handleNewBlankLatexResume() {
  const nextNum = state.latexResumes.length + 1;
  const letter = String.fromCharCode(64 + Math.min(26, nextNum));
  const templateBase = state.latexResumes[0]?.latex_code || "";
  document.getElementById("lr-id").value = `RES-CUSTOM-${Date.now().toString().slice(-4)}`;
  document.getElementById("lr-name").value = `Resume ${letter} — Custom Track Variant`;
  document.getElementById("lr-track").value = "";
  document.getElementById("lr-code").value = templateBase;
  document.getElementById("lr-track")?.focus();
  showToast("Prepared a new resume variant! Enter any custom Track / Role Specialization or click ✨ AI-Generate Base .tex.");
}

async function duplicateLatexResume(resumeId) {
  const src = state.latexResumes.find((item) => item.id === resumeId);
  if (!src) return;
  const newId = `${src.id}-COPY-${Date.now().toString().slice(-3)}`;
  const copyRow = {
    id: newId,
    name: `${src.name} (Copy)`,
    track_type: src.track_type,
    latex_code: src.latex_code,
    is_default: false
  };
  try {
    await sbUpsert("latex_resumes", copyRow, "id");
    await fetchResumesFromSupabase(false);
    renderAll();
    loadLatexResumeIntoForm(newId);
    showToast(`Cloned "${src.name}" as ${newId} in Supabase!`);
  } catch (err) {
    showToast(`Failed to clone resume in Supabase: ${err.message}`);
  }
}

async function handleAiGenerateBaseLatexResume() {
  const trackVal = document.getElementById("lr-track")?.value.trim() || "";
  const nameInput = document.getElementById("lr-name");
  const codeInput = document.getElementById("lr-code");
  const idInput = document.getElementById("lr-id");
  const btn = document.getElementById("btn-ai-generate-base-tex");

  if (!trackVal) {
    showToast("Type or pick a Track / Role Specialization first (e.g. 'Staff Backend Architect' or 'FinTech & Payments'), then click ✨ AI-Generate!");
    document.getElementById("lr-track")?.focus();
    return;
  }

  if (nameInput && !nameInput.value.trim()) {
    nameInput.value = `Resume — ${trackVal}`;
  }
  if (idInput && !idInput.value.trim()) {
    const slug = trackVal
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 10);
    idInput.value = `RES-${slug || Date.now().toString().slice(-4)}`;
  }

  const origText = btn?.textContent || "✨ AI-Generate Base .tex for This Track";
  if (btn) {
    btn.disabled = true;
    btn.textContent = "⏳ Generating 1-Page Base .tex via AI...";
  }

  try {
    const referenceResumes = state.latexResumes
      .slice(0, 2)
      .map((r) => `--- ${r.name} (${r.track_type}) ---\n${r.latex_code}`)
      .join("\n\n");

    const prompt = `You are an expert technical resume writer and LaTeX typesetter.
Create a complete, standalone, 1-page compilable LaTeX resume for ANIL KUMAR tailored specifically to the target track/specialization: "${trackVal}".

STRICT RULES:
1. Preserve 100% factual accuracy from Anil Kumar's real background (Senior Software Engineer at Airtel July 2022–Present, B.Tech CSE at NIT Bhopal CGPA 8.30/10, AIR 6599 JEE Mains).
2. Re-angle the Summary, Technical Skills grouping, Experience bullet ordering/emphasis, and Key Projects to maximize ATS & recruiter resonance for "${trackVal}".
3. Output ONLY valid LaTeX code starting with \\documentclass and ending with \\end{document}. No markdown fences.`;

    const rawTex = await callAzureOpenAI(
      [
        { role: "system", content: prompt },
        {
          role: "user",
          content: referenceResumes
            ? `TARGET TRACK: ${trackVal}\n\nREFERENCE BASE RESUMES FROM SUPABASE:\n${referenceResumes}`
            : `TARGET TRACK: ${trackVal}`
        }
      ],
      4000,
      false
    );
    const cleaned = injectOnePageGuard(cleanLatexResponse(rawTex));
    if (codeInput) codeInput.value = cleaned;
    showToast(`✨ Generated base LaTeX resume for "${trackVal}"! Click "💾 Save Base LaTeX Resume" below to store it in Supabase.`);
  } catch (err) {
    showToast(`AI Base Resume Generator Error: ${err.message}`);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = origText;
    }
  }
}

async function handleSaveLatexResumeForm(e) {
  e.preventDefault();
  const idVal = document.getElementById("lr-id").value.trim() || `RES-${Date.now().toString().slice(-4)}`;
  const nameVal = document.getElementById("lr-name").value.trim();
  const trackVal = document.getElementById("lr-track").value.trim() || "Custom Engineering Track";
  const codeVal = document.getElementById("lr-code").value.trim();
  if (!nameVal || !codeVal) return;

  const row = {
    id: idVal,
    name: nameVal,
    track_type: trackVal,
    latex_code: codeVal,
    is_default: idVal === "RES-JAVA"
  };

  try {
    await sbUpsert("latex_resumes", row, "id");
    await fetchResumesFromSupabase(false);
    renderAll();
    document.getElementById("latex-resume-form")?.reset();
    showToast(`Saved "${row.name}" (${row.track_type}) to Supabase!`);
  } catch (err) {
    showToast(`Failed to save resume to Supabase: ${err.message}`);
  }
}

async function deleteLatexResume(resumeId) {
  try {
    await sbDelete("latex_resumes", "id", resumeId);
    await fetchResumesFromSupabase(false);
    renderAll();
    showToast(`Deleted resume ${resumeId} from Supabase.`);
  } catch (err) {
    showToast(`Failed to delete resume from Supabase: ${err.message}`);
  }
}

async function handleResetDefaultLatexResumes() {
  await fetchResumesFromSupabase(true);
  renderAll();
}

function handleSaveAiConfig() {
  state.aiConfig = {
    endpoint: document.getElementById("ai-endpoint-input").value.trim() || DEFAULT_AZURE_OPENAI_ENDPOINT,
    apiKey: document.getElementById("ai-apikey-input").value.trim() || DEFAULT_AZURE_OPENAI_KEY,
    pdfEndpoint: document.getElementById("pdf-endpoint-input").value.trim() || DEFAULT_LATEX_PDF_ENDPOINT,
    pdfKey: document.getElementById("pdf-apikey-input").value.trim() || DEFAULT_LATEX_PDF_KEY
  };
  saveLocalCache();
  const diag = document.getElementById("ai-config-diagnostic");
  if (diag) {
    diag.hidden = false;
    diag.className = "gh-diagnostic success";
    diag.textContent = "✅ Saved Azure OpenAI & LaTeX-to-PDF endpoints!";
  }
  showToast("Saved AI Companion & PDF Converter settings!");
}

async function handleTestAiCompanionConnection() {
  handleSaveAiConfig();
  const diag = document.getElementById("ai-config-diagnostic");
  if (diag) {
    diag.hidden = false;
    diag.className = "gh-diagnostic";
    diag.textContent = "Testing Azure OpenAI gpt-5-chat-himanshuL connection...";
  }
  try {
    const reply = await callAzureOpenAI([{ role: "user", content: "Hello from client! Reply in 1 short sentence." }], 100, false);
    if (diag) {
      diag.className = "gh-diagnostic success";
      diag.textContent = `✅ Azure OpenAI Connected! Response: "${reply.trim()}"`;
    }
  } catch (err) {
    if (diag) {
      diag.className = "gh-diagnostic error";
      diag.textContent = `❌ Connection failed: ${err.message}`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  populateWorldCountriesDatalist();
  loadLocalCacheOrDefaults();
  initSupabaseClient();
  bindEvents();
  renderAll();
  fetchAllFromSupabase(false);
  subscribeRealtime();
});
