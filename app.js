/**
 * Global Job Application & Visa Strategy Tracker
 * Backend: Multi-sheet Excel workbook (jobs_tracker.xlsx)
 *   - Sheet 1: Applications
 *   - Sheet 2: Country_Strategy
 *   - Sheet 3: Resume_Checklist
 */

const TARGET_COUNTRIES = [
  { name: "Germany", flag: "🇩🇪", defaultVisa: "EU Blue Card" },
  { name: "Netherlands", flag: "🇳🇱", defaultVisa: "Kennismigrant (30% Ruling)" },
  { name: "United Kingdom", flag: "🇬🇧", defaultVisa: "Skilled Worker Visa" },
  { name: "UAE", flag: "🇦🇪", defaultVisa: "UAE Work Visa (0% Tax)" },
  { name: "Ireland", flag: "🇮🇪", defaultVisa: "Critical Skills Permit (CSEP)" },
  { name: "Singapore", flag: "🇸🇬", defaultVisa: "Employment Pass (COMPASS)" },
  { name: "Australia", flag: "🇦🇺", defaultVisa: "Subclass 482" },
  { name: "Canada", flag: "🇨🇦", defaultVisa: "Global Talent Stream (LMIA Cat B)" },
  { name: "Switzerland", flag: "🇨🇭", defaultVisa: "Swiss B-Permit (Quota Sponsor)" },
  { name: "USA", flag: "🇺🇸", defaultVisa: "Remote USD -> O-1A / L-1B" },
];

const KANBAN_STAGES = [
  "Wishlist",
  "Applied",
  "OA / Coding Test",
  "Recruiter Screen",
  "Technical Interview",
  "Final Round",
  "Offer",
  "Rejected",
];

const DEFAULT_APPLICATIONS = [
  {
    ID: "APP-001", Country: "Germany", City: "Berlin", Company: "Zalando",
    Role: "Senior Backend Engineer (Java 21 / Kafka)", Resume_Track: "Java / Spring Boot Backend",
    Status: "Applied", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "EU Blue Card",
    Salary_Range: "€85,000 - €98,000", Applied_Date: "2026-10-28", Follow_Up_Date: "2026-11-05",
    Job_URL: "https://jobs.zalando.com", Contact_Recruiter: "Talent Acquisition - Order Platform",
    Notes: "Highlighted Airtel Order Management System & Java 21 Virtual Threads 40% runtime boost. Anabin H+ attached."
  },
  {
    ID: "APP-002", Country: "Germany", City: "Berlin", Company: "Delivery Hero",
    Role: "Senior Platform Engineer - Logistics", Resume_Track: "Java / Spring Boot Backend",
    Status: "Recruiter Screen", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "EU Blue Card",
    Salary_Range: "€82,000 - €95,000", Applied_Date: "2026-10-24", Follow_Up_Date: "2026-11-02",
    Job_URL: "https://careers.deliveryhero.com", Contact_Recruiter: "Sarah M. (Tech Recruiter)",
    Notes: "Recruiter screen scheduled. Emphasize RabbitMQ + Kafka event-driven architecture & Resilience4j."
  },
  {
    ID: "APP-003", Country: "Germany", City: "Munich", Company: "Celonis",
    Role: "Senior AI Agent Engineer", Resume_Track: "GenAI / Agentic AI",
    Status: "Wishlist", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "EU Blue Card",
    Salary_Range: "€90,000 - €110,000", Applied_Date: "2026-10-31", Follow_Up_Date: "2026-11-07",
    Job_URL: "https://www.celonis.com/careers", Contact_Recruiter: "Engineering Manager - Process AI",
    Notes: "Strong match for CrewAI multi-agent architecture & RAG pipeline experience."
  },
  {
    ID: "APP-004", Country: "Netherlands", City: "Amsterdam", Company: "Booking.com",
    Role: "Senior Software Engineer - Core Backend", Resume_Track: "Java / Spring Boot Backend",
    Status: "OA / Coding Test", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Kennismigrant (30% Ruling)",
    Salary_Range: "€95,000 - €115,000", Applied_Date: "2026-10-22", Follow_Up_Date: "2026-11-01",
    Job_URL: "https://careers.booking.com", Contact_Recruiter: "Booking Tech Recruiting",
    Notes: "HackerRank system design + coding test received. Eligible for 30% tax ruling & full relocation package."
  },
  {
    ID: "APP-005", Country: "Netherlands", City: "Amsterdam", Company: "Adyen",
    Role: "Senior Java Engineer - High Throughput Payments", Resume_Track: "Java / Spring Boot Backend",
    Status: "Applied", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Kennismigrant (30% Ruling)",
    Salary_Range: "€92,000 - €112,000", Applied_Date: "2026-10-29", Follow_Up_Date: "2026-11-06",
    Job_URL: "https://careers.adyen.com", Contact_Recruiter: "Fintech Platform Team",
    Notes: "Emphasized 85% to 99% transactional consistency checks & low-latency Java concurrency."
  },
  {
    ID: "APP-006", Country: "United Kingdom", City: "London", Company: "Revolut",
    Role: "Senior Backend Engineer (Java / Spring Boot)", Resume_Track: "Java / Spring Boot Backend",
    Status: "Applied", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Skilled Worker Visa",
    Salary_Range: "£85,000 - £105,000", Applied_Date: "2026-10-27", Follow_Up_Date: "2026-11-04",
    Job_URL: "https://www.revolut.com/careers", Contact_Recruiter: "Referral via NIT Alumni",
    Notes: "Home Office licensed sponsor. Highlighted high-scale event processing & config-driven onboarding."
  },
  {
    ID: "APP-007", Country: "United Kingdom", City: "London", Company: "Synthesia",
    Role: "Senior AI Platform & Agent Engineer", Resume_Track: "GenAI / Agentic AI",
    Status: "Wishlist", Priority: "Medium", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Skilled Worker Visa",
    Salary_Range: "£90,000 - £115,000", Applied_Date: "2026-10-31", Follow_Up_Date: "2026-11-08",
    Job_URL: "https://www.synthesia.io/careers", Contact_Recruiter: "AI Platform Lead",
    Notes: "Use Resume B (GenAI). Highlight GPT-4/Claude orchestration, FastAPI & production RAG."
  },
  {
    ID: "APP-008", Country: "Ireland", City: "Dublin", Company: "Stripe",
    Role: "Senior Software Engineer - Reliability & Backend", Resume_Track: "Java / Spring Boot Backend",
    Status: "Applied", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Critical Skills Permit (CSEP)",
    Salary_Range: "€92,000 - €115,000", Applied_Date: "2026-10-26", Follow_Up_Date: "2026-11-03",
    Job_URL: "https://stripe.com/jobs", Contact_Recruiter: "Dublin Infrastructure Team",
    Notes: "CSEP leads to Stamp 4 PR in 2 years. Highlighted Circuit Breaker (Resilience4j) & 90% RCA reduction."
  },
  {
    ID: "APP-009", Country: "Ireland", City: "Dublin", Company: "Intercom",
    Role: "Senior AI Engineer - Fin Agent Team", Resume_Track: "GenAI / Agentic AI",
    Status: "Wishlist", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Critical Skills Permit (CSEP)",
    Salary_Range: "€88,000 - €108,000", Applied_Date: "2026-10-31", Follow_Up_Date: "2026-11-07",
    Job_URL: "https://www.intercom.com/careers", Contact_Recruiter: "AI Engineering Recruiter",
    Notes: "Direct match for Autonomous Agent reasoning chains, ReAct prompting, and tool integration."
  },
  {
    ID: "APP-010", Country: "UAE", City: "Dubai", Company: "Careem",
    Role: "Senior Platform Software Engineer (Java)", Resume_Track: "Java / Spring Boot Backend",
    Status: "Technical Interview", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "UAE Work Visa (0% Tax)",
    Salary_Range: "AED 28,000 - 34,000 / mo", Applied_Date: "2026-10-18", Follow_Up_Date: "2026-11-01",
    Job_URL: "https://www.careem.com/en-AE/careers/", Contact_Recruiter: "Omar K. (Talent Partner)",
    Notes: "Round 1 cleared! System design round next week focusing on Kafka/MongoDB Change Streams."
  },
  {
    ID: "APP-011", Country: "UAE", City: "Abu Dhabi", Company: "Core42 / G42",
    Role: "Senior Applied GenAI & Agentic Systems Engineer", Resume_Track: "GenAI / Agentic AI",
    Status: "Applied", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "UAE Work Visa / Golden Visa",
    Salary_Range: "AED 32,000 - 40,000 / mo", Applied_Date: "2026-10-29", Follow_Up_Date: "2026-11-05",
    Job_URL: "https://core42.ai/careers", Contact_Recruiter: "Abu Dhabi AI Talent Team",
    Notes: "Salary >30k AED qualifies for 10-year UAE Golden Visa. Sent GenAI resume highlighting CrewAI & FAISS."
  },
  {
    ID: "APP-012", Country: "Singapore", City: "Singapore", Company: "Grab",
    Role: "Senior Backend Engineer - Regional Platform", Resume_Track: "Java / Spring Boot Backend",
    Status: "Applied", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Employment Pass (COMPASS)",
    Salary_Range: "SGD 10,500 - 13,500 / mo", Applied_Date: "2026-10-25", Follow_Up_Date: "2026-11-03",
    Job_URL: "https://grab.careers", Contact_Recruiter: "SG Regional Tech Recruiter",
    Notes: "NIT Bhopal earns top COMPASS qualification points; Airtel super-app experience maps directly to Grab."
  },
  {
    ID: "APP-013", Country: "Singapore", City: "Singapore", Company: "DBS Bank",
    Role: "Senior GenAI & Backend Platform Engineer", Resume_Track: "GenAI / Agentic AI",
    Status: "Wishlist", Priority: "Medium", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Employment Pass (COMPASS SOL)",
    Salary_Range: "SGD 10,000 - 12,500 / mo", Applied_Date: "2026-10-31", Follow_Up_Date: "2026-11-09",
    Job_URL: "https://www.dbs.com/careers", Contact_Recruiter: "Tech & AI Division",
    Notes: "AI Engineer is on Singapore Shortage Occupation List (+20 COMPASS bonus points)."
  },
  {
    ID: "APP-014", Country: "Australia", City: "Sydney", Company: "Atlassian",
    Role: "Senior Software Engineer (Java / Cloud Platform)", Resume_Track: "Java / Spring Boot Backend",
    Status: "Applied", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Subclass 482 (Specialist Skills)",
    Salary_Range: "AUD 155,000 - 180,000", Applied_Date: "2026-10-28", Follow_Up_Date: "2026-11-06",
    Job_URL: "https://www.atlassian.com/company/careers", Contact_Recruiter: "Sydney Platform Recruiting",
    Notes: "Specialist Skills stream (>AUD 135k) gets 7-day visa processing. Highlighted Jira API & SRE AI project."
  },
  {
    ID: "APP-015", Country: "Australia", City: "Sydney", Company: "Canva",
    Role: "Senior Backend / AI Infrastructure Engineer", Resume_Track: "GenAI / Agentic AI",
    Status: "Wishlist", Priority: "Medium", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Subclass 482",
    Salary_Range: "AUD 150,000 - 175,000", Applied_Date: "2026-10-31", Follow_Up_Date: "2026-11-08",
    Job_URL: "https://www.lifeatcanva.com", Contact_Recruiter: "Canva AI Platform",
    Notes: "Combine Java 21 backend scale with LLM orchestration in cover note."
  },
  {
    ID: "APP-016", Country: "Canada", City: "Toronto", Company: "Cohere",
    Role: "Senior Software Engineer - Enterprise Agentic AI", Resume_Track: "GenAI / Agentic AI",
    Status: "Applied", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Global Talent Stream (LMIA Cat B)",
    Salary_Range: "CAD 145,000 - 175,000", Applied_Date: "2026-10-29", Follow_Up_Date: "2026-11-06",
    Job_URL: "https://cohere.com/careers", Contact_Recruiter: "Enterprise AI Team",
    Notes: "2-week fast-track work permit under Global Talent Stream. Strong match for multi-agent RAG."
  },
  {
    ID: "APP-017", Country: "Canada", City: "Vancouver", Company: "Amazon (AWS)",
    Role: "Software Development Engineer II (Java / Distributed Systems)", Resume_Track: "Java / Spring Boot Backend",
    Status: "Wishlist", Priority: "Medium", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Global Talent Stream",
    Salary_Range: "CAD 150,000 - 180,000", Applied_Date: "2026-10-31", Follow_Up_Date: "2026-11-09",
    Job_URL: "https://www.amazon.jobs", Contact_Recruiter: "AWS Vancouver Recruiting",
    Notes: "Reach out to NIT Bhopal alumni in AWS Vancouver for referral ID before submitting."
  },
  {
    ID: "APP-018", Country: "Switzerland", City: "Zurich", Company: "Google",
    Role: "Senior Software Engineer - Cloud & AI Reliability", Resume_Track: "GenAI / Agentic AI",
    Status: "Wishlist", Priority: "High", Visa_Sponsorship: "Verified Sponsor", Visa_Type: "Swiss B-Permit (Quota Sponsor)",
    Salary_Range: "CHF 155,000 - 190,000", Applied_Date: "2026-10-31", Follow_Up_Date: "2026-11-10",
    Job_URL: "https://careers.google.com", Contact_Recruiter: "Zurich Site Reliability / AI",
    Notes: "Big Tech Zurich can sponsor non-EU B-Permit quota. Emphasize SRE Agentic AI & Java 21 scale."
  },
  {
    ID: "APP-019", Country: "USA", City: "San Francisco (Remote / O-1A)", Company: "YC AI Startup (WorkAtAStartup)",
    Role: "Founding Senior Agentic AI Engineer", Resume_Track: "GenAI / Agentic AI",
    Status: "Applied", Priority: "High", Visa_Sponsorship: "Remote USD", Visa_Type: "Remote USD -> O-1A Visa",
    Salary_Range: "$110,000 - $145,000", Applied_Date: "2026-10-30", Follow_Up_Date: "2026-11-05",
    Job_URL: "https://www.workatastartup.com", Contact_Recruiter: "Founder Direct Message",
    Notes: "Applied via YC Work at a Startup. Remote USD initially with O-1A visa sponsorship pathway."
  },
  {
    ID: "APP-020", Country: "USA", City: "Bengaluru -> Seattle (Transfer)", Company: "Uber / Stripe (L-1B Track)",
    Role: "Senior Backend Engineer (L-1B Transfer Track)", Resume_Track: "Java / Spring Boot Backend",
    Status: "Wishlist", Priority: "High", Visa_Sponsorship: "Internal Transfer / L-1", Visa_Type: "L-1B Intracompany Transfer",
    Salary_Range: "$165,000 - $210,000 (Post-Transfer)", Applied_Date: "2026-10-31", Follow_Up_Date: "2026-11-12",
    Job_URL: "https://www.uber.com/us/en/careers/", Contact_Recruiter: "India-to-US Mobility Track",
    Notes: "Backup US strategy: Join US MNC in India and transfer to Seattle/SF after 12 months via L-1B."
  },
];

const DEFAULT_STRATEGIES = [
  {
    Country: "Germany", Flag: "🇩🇪", Tier: "Tier 1 (High ROI)",
    Primary_Visa: "EU Blue Card / Chancenkarte",
    Min_Salary_Rule: "€41,041.80+ (IT Shortage) | Market: €75k-€95k",
    Best_Resume: "Java / Spring Boot Backend (70%) & GenAI (30%)",
    Top_Portals: "Honeypot.io, Relocate.me, Arbeitnow, GermanTechJobs.de, LinkedIn",
    Target_Companies: "Zalando, Delivery Hero, N26, SAP, Personio, Trade Republic, Celonis, Auto1",
    Key_Requirement: "NIT Bhopal is H+ on Anabin (no ZAB delay). Include 1-page Cover Letter + Anabin H+ PDF."
  },
  {
    Country: "Netherlands", Flag: "🇳🇱", Tier: "Tier 1 (High ROI)",
    Primary_Visa: "Highly Skilled Migrant (Kennismigrant)",
    Min_Salary_Rule: "€4,171/mo (<30) or €5,688/mo (30+) | Market: €80k-€115k",
    Best_Resume: "Java / Spring Boot Backend",
    Top_Portals: "Relocate.me, IamExpat.nl, Techleap.nl, LinkedIn",
    Target_Companies: "Booking.com, Adyen, Uber, Databricks, ING, ABN AMRO, Miro, Mollie, ASML",
    Key_Requirement: "Employer must be on IND Recognized Sponsor list. Qualifies for 30%/27% tax-free expat ruling."
  },
  {
    Country: "United Kingdom", Flag: "🇬🇧", Tier: "Tier 1 (High ROI)",
    Primary_Visa: "Skilled Worker Visa / Global Talent",
    Min_Salary_Rule: "£38,700+ or SOC 2134 Going Rate (~£49.4k+) | Market: £75k-£115k",
    Best_Resume: "Both (Java for Fintech, GenAI for AI Startups)",
    Top_Portals: "Otta.com, Cord.co, UKTierSponsors.co.uk, LinkedIn",
    Target_Companies: "Revolut, Monzo, Wise, Checkout.com, JPMorgan, Goldman Sachs, Synthesia, ElevenLabs",
    Key_Requirement: "Verify employer on UK Home Office Licensed Sponsors register. English proficiency via degree/IELTS."
  },
  {
    Country: "UAE", Flag: "🇦🇪", Tier: "Tier 1 (High ROI)",
    Primary_Visa: "Employer Work Visa / 10-Yr Golden Visa",
    Min_Salary_Rule: "No statutory min (Golden Visa: AED 30,000+/mo) | 0% Income Tax",
    Best_Resume: "Both (Java in Dubai, GenAI in Abu Dhabi)",
    Top_Portals: "LinkedIn (Direct Recruiter Outreach), NaukriGulf, Bayt",
    Target_Companies: "Careem, Talabat, Noon, Emirates NBD, FAB, G42, Core42, AI71, Presight, TII",
    Key_Requirement: "Fast 2-week visa processing. Attest NIT Bhopal B.Tech degree (MEA + UAE Embassy)."
  },
  {
    Country: "Ireland", Flag: "🇮🇪", Tier: "Tier 2 (English Hub)",
    Primary_Visa: "Critical Skills Employment Permit (CSEP)",
    Min_Salary_Rule: "€38,000+ (with CS degree) | Market: €75k-€105k",
    Best_Resume: "Java / Spring Boot Backend & GenAI SRE",
    Top_Portals: "IrishJobs.ie, TechIreland, LinkedIn (Dublin)",
    Target_Companies: "Stripe, Workday, Intercom, Amazon (AWS Dublin), Mastercard, Toast, HubSpot, Fidelity",
    Key_Requirement: "ICT roles are on Critical Skills list. Gives Stamp 4 Permanent Residency in just 2 years."
  },
  {
    Country: "Singapore", Flag: "🇸🇬", Tier: "Tier 2 (Asian Hub)",
    Primary_Visa: "Employment Pass (EP via COMPASS)",
    Min_Salary_Rule: "SGD 5,600+/mo qualifying | Market: SGD 9,500-14,000/mo",
    Best_Resume: "Both (GenAI gets +20 COMPASS Shortage Bonus)",
    Top_Portals: "NodeFlair, MyCareersFuture.gov.sg, TechInAsia, LinkedIn",
    Target_Companies: "Grab, Shopee, Lazada, ByteDance/TikTok, Coupang, DBS, Standard Chartered, OCBC",
    Key_Requirement: "Must score 40 pts on COMPASS. NIT Bhopal scores top education points + AI Engineer gets +20 SOL bonus."
  },
  {
    Country: "Australia", Flag: "🇦🇺", Tier: "Tier 2 (English Hub)",
    Primary_Visa: "Skills in Demand (Subclass 482) / PR 189 & 190",
    Min_Salary_Rule: "AUD 73,150+ (Core) / AUD 135,000+ (Specialist 7-day track)",
    Best_Resume: "Java / Spring Boot Backend & GenAI",
    Top_Portals: "Seek.com.au (filter: 482 sponsorship), LinkedIn (Sydney/Melbourne)",
    Target_Companies: "Atlassian, Canva, Block/Afterpay, Macquarie, CommBank, WiseTech, Xero, Airwallex",
    Key_Requirement: "482 requires 1-2+ yrs exp. For direct PR (189/190), complete ACS Skills Assessment + PTE/IELTS."
  },
  {
    Country: "Canada", Flag: "🇨🇦", Tier: "Tier 2 (North America)",
    Primary_Visa: "Global Talent Stream (LMIA Cat B) / Express Entry PNP",
    Min_Salary_Rule: "Prevailing wage (~CAD 95k-165k)",
    Best_Resume: "GenAI / Agentic AI & Java / Spring Boot Backend",
    Top_Portals: "VanHack, JobBank.gc.ca, Wellfound, LinkedIn (Toronto/Vancouver)",
    Target_Companies: "Shopify, Cohere, Wealthsimple, Amazon Vancouver, Uber Toronto, RBC, Clio",
    Key_Requirement: "Global Talent Stream processes work permits in 14 days for NOC 21232 (SWE) & 21211 (AI/Data)."
  },
  {
    Country: "Switzerland", Flag: "🇨🇭", Tier: "Tier 3 (High Barrier)",
    Primary_Visa: "Non-EU B-Permit (Subject to Annual Quota)",
    Min_Salary_Rule: "Cantonal prevailing wage (~CHF 130,000 - 190,000+)",
    Best_Resume: "GenAI / Agentic AI & High-Scale Distributed Systems",
    Top_Portals: "SwissDevJobs.ch (filter: Visa Sponsor), CERN Careers, LinkedIn",
    Target_Companies: "Google Zurich, Apple, Meta, Microsoft, Anthropic Zurich, CERN, Oracle Labs",
    Key_Requirement: "Strict non-EU quota; target Big Tech in Zurich or relocate to Germany/NL first and move later."
  },
  {
    Country: "USA", Flag: "🇺🇸", Tier: "Tier 3 (Strategic Entry)",
    Primary_Visa: "L-1B Intracompany Transfer / O-1A / Remote USD",
    Min_Salary_Rule: "$110k-$150k (Remote USD) | $165k-$240k+ (On-site US)",
    Best_Resume: "GenAI / Agentic AI (O-1A/Remote) & Java (L-1B MNC)",
    Top_Portals: "WorkAtAStartup (YC), Wellfound, Turing, LinkedIn",
    Target_Companies: "YC AI Startups, Uber, Stripe, Amazon, Microsoft, Salesforce, Confluent, Rubrik",
    Key_Requirement: "Avoid cold H-1B dependency. Target YC Remote USD -> O-1A (using Airtel awards) or MNC L-1B transfer."
  },
];

const DEFAULT_CHECKLIST = [
  {
    Resume_Track: "Both Resumes", Category: "ATS Keywords",
    Checklist_Item: "Add Docker, Kubernetes (K8s), and Cloud (AWS / GCP / Azure) explicitly to Technical Skills",
    Impact: "Critical — 80%+ international backend/AI JD filters screen for containers & cloud.", Status: "Pending"
  },
  {
    Resume_Track: "Both Resumes", Category: "Company Context",
    Checklist_Item: "Add 1-line descriptor under Airtel: 'Global Top-3 Telecom Operator serving 350M+ subscribers'",
    Impact: "High — Helps EU/UK/US/AU recruiters immediately understand Airtel's massive scale.", Status: "Pending"
  },
  {
    Resume_Track: "Both Resumes", Category: "Header & Mobility",
    Checklist_Item: "Add 'Gurugram, India | Open to International Relocation' and verify LinkedIn URL matches track",
    Impact: "High — Signals explicit relocation intent to international sourcers.", Status: "Pending"
  },
  {
    Resume_Track: "Java / Spring Boot Backend", Category: "Scale Metrics",
    Checklist_Item: "Add concrete RPS / daily event volume (e.g., '10M+ daily order events, <50ms p99 latency')",
    Impact: "High — Calibrates you for Senior SWE (L5) bands in Germany, NL, UK, and Singapore.", Status: "Pending"
  },
  {
    Resume_Track: "GenAI / Agentic AI", Category: "Production Eval & Guardrails",
    Checklist_Item: "Mention LLM evaluation (RAGAS/LangSmith), latency/token cost optimization, and guardrails",
    Impact: "High — Distinguishes production AI engineers from prototype builders.", Status: "Pending"
  },
  {
    Resume_Track: "Germany / Switzerland", Category: "Relocation Dossier",
    Checklist_Item: "Download Anabin H+ confirmation PDF for NIT Bhopal (MANIT) and attach with applications",
    Impact: "Critical — Proves instant EU Blue Card & Chancenkarte eligibility to German HR.", Status: "Pending"
  },
];

const STORAGE_KEYS = {
  APPS: "anil_global_tracker_apps_v1",
  STRATEGIES: "anil_global_tracker_strategies_v1",
  CHECKLIST: "anil_global_tracker_checklist_v1",
  DIRTY: "anil_global_tracker_dirty_v1",
  GH_CONFIG: "anil_global_tracker_gh_config_v1",
};

const state = {
  applications: [],
  strategies: [],
  checklist: [],
  selectedCountry: "ALL",
  activeView: "table",
  searchQuery: "",
  filterResume: "ALL",
  filterStatus: "ALL",
  filterPriority: "ALL",
  fileHandle: null,
  hasUnsavedChanges: false,
};

/* =========================================================================
   1. Modern Web Guidance Polyfills & Fallbacks
   ========================================================================= */

// Fallback for <dialog closedby="any"> in browsers without native closedBy support
function initDialogLightDismissFallback() {
  if ("closedBy" in HTMLDialogElement.prototype) return;
  document.querySelectorAll("dialog[closedby='any']").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (isDialogContent) return;
      dialog.close();
    });
  });
}

// Validate Input After Interaction (:user-invalid fallback + ARIA sync)
const UserInvalidFallback = (() => {
  const dirtyState = new WeakMap();

  const updateState = (input) => {
    const isValid = input.checkValidity();
    input.classList.toggle("user-invalid-fallback", !isValid);
    input.classList.toggle("user-valid-fallback", isValid);
    if (!isValid) {
      input.setAttribute("aria-invalid", "true");
    } else {
      input.removeAttribute("aria-invalid");
    }
  };

  const handleEvent = (event) => {
    const input = event.target;
    if (event.type === "reset") {
      const controls = input.elements || [];
      for (const control of controls) {
        dirtyState.delete(control);
        control.classList.remove("user-invalid-fallback", "user-valid-fallback");
        control.removeAttribute("aria-invalid");
      }
      return;
    }
    if (!input || typeof input.checkValidity !== "function") return;

    if (event.type === "input" || event.type === "change") {
      const st = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
      st.hasInteracted = true;
      dirtyState.set(input, st);
      if (st.hasBlurred) updateState(input);
    } else if (event.type === "blur") {
      const st = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
      st.hasBlurred = true;
      dirtyState.set(input, st);
      if (st.hasInteracted) updateState(input);
    }
  };

  const init = (root = document) => {
    // Sync aria-invalid even when native :user-invalid is supported
    root.addEventListener(
      "blur",
      (e) => {
        const el = e.target;
        if (el && el.matches) {
          try {
            if (CSS.supports("selector(:user-invalid)")) {
              el.setAttribute("aria-invalid", el.matches(":user-invalid") ? "true" : "false");
            }
          } catch (_) {
            // ignore
          }
        }
        handleEvent(e);
      },
      true
    );
    root.addEventListener("input", handleEvent);
    root.addEventListener("change", handleEvent);
    root.addEventListener("reset", handleEvent, true);
  };

  return { init };
})();

// Toast Notification Helper (popover="manual")
let toastTimer = null;
function showToast(message) {
  const toastEl = document.getElementById("toast-popover");
  const msgEl = document.getElementById("toast-message");
  if (!toastEl || !msgEl) return;

  msgEl.textContent = message;
  if (typeof toastEl.showPopover === "function") {
    try {
      toastEl.showPopover();
    } catch (_) {
      toastEl.classList.add("toast-fallback-open");
    }
  } else {
    toastEl.classList.add("toast-fallback-open");
  }

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => hideToast(), 3800);
}

function hideToast() {
  const toastEl = document.getElementById("toast-popover");
  if (!toastEl) return;
  if (typeof toastEl.hidePopover === "function") {
    try {
      toastEl.hidePopover();
    } catch (_) {
      // ignore
    }
  }
  toastEl.classList.remove("toast-fallback-open");
}

/* =========================================================================
   2. Built-in Zero-Dependency OpenXML (.xlsx) Builder & Parser Fallback
      (Works even if SheetJS CDN is offline!)
   ========================================================================= */

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createStoredZip(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const dataBytes = typeof file.content === "string" ? encoder.encode(file.content) : file.content;
    const crc = crc32(dataBytes);
    const size = dataBytes.length;

    const localHeader = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(localHeader.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0, true);
    lv.setUint16(8, 0, true); // stored (no compression needed)
    lv.setUint16(10, 0, true);
    lv.setUint16(12, 0, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, size, true);
    lv.setUint32(22, size, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);
    localHeader.set(nameBytes, 30);

    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(centralHeader.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, 0, true);
    cv.setUint16(14, 0, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, size, true);
    cv.setUint32(24, size, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0, true);
    cv.setUint32(42, offset, true);
    centralHeader.set(nameBytes, 46);

    localParts.push(localHeader, dataBytes);
    centralParts.push(centralHeader);
    offset += localHeader.length + dataBytes.length;
  }

  let centralSize = 0;
  for (const part of centralParts) centralSize += part.length;

  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);
  ev.setUint16(20, 0, true);

  const totalLength = offset + centralSize + 22;
  const out = new Uint8Array(totalLength);
  let pos = 0;
  for (const p of localParts) {
    out.set(p, pos);
    pos += p.length;
  }
  for (const p of centralParts) {
    out.set(p, pos);
    pos += p.length;
  }
  out.set(eocd, pos);
  return out;
}

function escapeXml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function colIndexToLetter(colIdx1Based) {
  let n = colIdx1Based;
  let res = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    res = String.fromCharCode(65 + rem) + res;
    n = Math.floor((n - 1) / 26);
  }
  return res;
}

function buildWorksheetXmlFromObjects(objects, headers) {
  const rows = [headers];
  for (const obj of objects) {
    rows.push(headers.map((h) => obj[h] ?? ""));
  }
  const lines = [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">',
    "  <sheetData>",
  ];
  rows.forEach((row, rIdx) => {
    const rNum = rIdx + 1;
    const styleAttr = rNum === 1 ? ' s="1"' : ' s="0"';
    lines.push(`    <row r="${rNum}">`);
    row.forEach((cellVal, cIdx) => {
      const ref = `${colIndexToLetter(cIdx + 1)}${rNum}`;
      lines.push(
        `      <c r="${ref}" t="inlineStr"${styleAttr}><is><t>${escapeXml(cellVal)}</t></is></c>`
      );
    });
    lines.push("    </row>");
  });
  lines.push("  </sheetData>", "</worksheet>");
  return lines.join("\n");
}

function generateWorkbookBytes() {
  const appHeaders = [
    "ID", "Country", "City", "Company", "Role", "Resume_Track",
    "Status", "Priority", "Visa_Sponsorship", "Visa_Type",
    "Salary_Range", "Applied_Date", "Follow_Up_Date", "Job_URL",
    "Contact_Recruiter", "Notes",
  ];
  const stratHeaders = [
    "Country", "Flag", "Tier", "Primary_Visa", "Min_Salary_Rule",
    "Best_Resume", "Top_Portals", "Target_Companies", "Key_Requirement",
  ];
  const checkHeaders = ["Resume_Track", "Category", "Checklist_Item", "Impact", "Status"];

  if (window.XLSX) {
    const wb = window.XLSX.utils.book_new();
    const wsApps = window.XLSX.utils.json_to_sheet(state.applications, { header: appHeaders });
    const wsStrat = window.XLSX.utils.json_to_sheet(state.strategies, { header: stratHeaders });
    const wsCheck = window.XLSX.utils.json_to_sheet(state.checklist, { header: checkHeaders });
    window.XLSX.utils.book_append_sheet(wb, wsApps, "Applications");
    window.XLSX.utils.book_append_sheet(wb, wsStrat, "Country_Strategy");
    window.XLSX.utils.book_append_sheet(wb, wsCheck, "Resume_Checklist");
    const arrayBuf = window.XLSX.write(wb, { bookType: "xlsx", type: "array" });
    return new Uint8Array(arrayBuf);
  }

  // Native fallback OpenXML (.xlsx) generator
  const files = [
    {
      name: "[Content_Types].xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet3.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>`,
    },
    {
      name: "_rels/.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
    },
    {
      name: "xl/workbook.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Applications" sheetId="1" r:id="rId1"/>
    <sheet name="Country_Strategy" sheetId="2" r:id="rId2"/>
    <sheet name="Resume_Checklist" sheetId="3" r:id="rId3"/>
  </sheets>
</workbook>`,
    },
    {
      name: "xl/_rels/workbook.xml.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet3.xml"/>
  <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`,
    },
    {
      name: "xl/styles.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="10"/><name val="Calibri"/></font>
    <font><b/><sz val="11"/><name val="Calibri"/></font>
  </fonts>
  <fills count="2">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
  </fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="2">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
  </cellXfs>
</styleSheet>`,
    },
    {
      name: "xl/worksheets/sheet1.xml",
      content: buildWorksheetXmlFromObjects(state.applications, appHeaders),
    },
    {
      name: "xl/worksheets/sheet2.xml",
      content: buildWorksheetXmlFromObjects(state.strategies, stratHeaders),
    },
    {
      name: "xl/worksheets/sheet3.xml",
      content: buildWorksheetXmlFromObjects(state.checklist, checkHeaders),
    },
  ];
  return createStoredZip(files);
}

// Native ZIP/XLSX reader fallback when SheetJS CDN is unavailable
async function parseXlsxBufferFallback(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const view = new DataView(arrayBuffer);
  const decoder = new TextDecoder();
  const entries = {};

  let i = 0;
  while (i < bytes.length - 4) {
    const sig = view.getUint32(i, true);
    if (sig !== 0x04034b50) break;
    const method = view.getUint16(i + 8, true);
    const compSize = view.getUint32(i + 18, true);
    const nameLen = view.getUint16(i + 26, true);
    const extraLen = view.getUint16(i + 28, true);
    const name = decoder.decode(bytes.subarray(i + 30, i + 30 + nameLen));
    const dataStart = i + 30 + nameLen + extraLen;
    const rawData = bytes.subarray(dataStart, dataStart + compSize);

    if (method === 0) {
      entries[name] = decoder.decode(rawData);
    } else if (method === 8 && typeof DecompressionStream !== "undefined") {
      const ds = new DecompressionStream("deflate-raw");
      const writer = ds.writable.getWriter();
      writer.write(rawData);
      writer.close();
      const resp = new Response(ds.readable);
      entries[name] = await resp.text();
    }
    i = dataStart + compSize;
  }

  const parseSheetXml = (xmlStr) => {
    if (!xmlStr) return [];
    const doc = new DOMParser().parseFromString(xmlStr, "application/xml");
    const rowNodes = Array.from(doc.querySelectorAll("row"));
    if (rowNodes.length < 2) return [];
    const extractRowValues = (rNode) =>
      Array.from(rNode.querySelectorAll("c")).map((c) => c.textContent || "");
    const headers = extractRowValues(rowNodes[0]);
    return rowNodes.slice(1).map((rNode) => {
      const vals = extractRowValues(rNode);
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = vals[idx] ?? "";
      });
      return obj;
    });
  };

  return {
    applications: parseSheetXml(entries["xl/worksheets/sheet1.xml"]),
    strategies: parseSheetXml(entries["xl/worksheets/sheet2.xml"]),
    checklist: parseSheetXml(entries["xl/worksheets/sheet3.xml"]),
  };
}

async function parseExcelArrayBuffer(arrayBuffer) {
  if (window.XLSX) {
    const wb = window.XLSX.read(arrayBuffer, { type: "array" });
    const appsSheet = wb.Sheets["Applications"] || wb.Sheets[wb.SheetNames[0]];
    const stratSheet = wb.Sheets["Country_Strategy"] || wb.Sheets[wb.SheetNames[1]];
    const checkSheet = wb.Sheets["Resume_Checklist"] || wb.Sheets[wb.SheetNames[2]];

    return {
      applications: appsSheet ? window.XLSX.utils.sheet_to_json(appsSheet, { defval: "" }) : [],
      strategies: stratSheet ? window.XLSX.utils.sheet_to_json(stratSheet, { defval: "" }) : [],
      checklist: checkSheet ? window.XLSX.utils.sheet_to_json(checkSheet, { defval: "" }) : [],
    };
  }
  return parseXlsxBufferFallback(arrayBuffer);
}

/* =========================================================================
   3. Data Loading & Persistence (Excel Backend + LocalStorage Cache)
   ========================================================================= */

function saveToLocalCache(markDirty = true) {
  localStorage.setItem(STORAGE_KEYS.APPS, JSON.stringify(state.applications));
  localStorage.setItem(STORAGE_KEYS.STRATEGIES, JSON.stringify(state.strategies));
  localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(state.checklist));
  if (markDirty) {
    state.hasUnsavedChanges = true;
    localStorage.setItem(STORAGE_KEYS.DIRTY, "true");
  }
  updateExcelBackendStatusUI();
}

function updateExcelBackendStatusUI() {
  const statusText = document.getElementById("excel-status-text");
  const statusPill = document.getElementById("excel-backend-status");
  if (!statusText || !statusPill) return;

  if (state.fileHandle) {
    statusText.innerHTML = `Linked File: <code>${escapeXml(state.fileHandle.name)}</code>`;
  } else if (state.hasUnsavedChanges) {
    statusText.innerHTML = `Backend: <code>jobs_tracker.xlsx</code> (Unsaved edits — click Save .xlsx)`;
  } else {
    statusText.innerHTML = `Synced: <code>jobs_tracker.xlsx</code> (${state.applications.length} rows)`;
  }
}

async function loadInitialExcelBackend(forceRepoReload = false) {
  if (!forceRepoReload) {
    const cachedApps = localStorage.getItem(STORAGE_KEYS.APPS);
    const cachedStrategies = localStorage.getItem(STORAGE_KEYS.STRATEGIES);
    const cachedChecklist = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
    if (cachedApps) {
      try {
        state.applications = JSON.parse(cachedApps);
        state.strategies = cachedStrategies ? JSON.parse(cachedStrategies) : [...DEFAULT_STRATEGIES];
        state.checklist = cachedChecklist ? JSON.parse(cachedChecklist) : [...DEFAULT_CHECKLIST];
        state.hasUnsavedChanges = localStorage.getItem(STORAGE_KEYS.DIRTY) === "true";
        renderAll();
        updateExcelBackendStatusUI();
        return;
      } catch (_) {
        // Proceed to fetch from ./jobs_tracker.xlsx
      }
    }
  }

  try {
    const response = await fetch("./jobs_tracker.xlsx", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    const parsed = await parseExcelArrayBuffer(buffer);
    state.applications = parsed.applications.length ? parsed.applications : structuredClone(DEFAULT_APPLICATIONS);
    state.strategies = parsed.strategies.length ? parsed.strategies : structuredClone(DEFAULT_STRATEGIES);
    state.checklist = parsed.checklist.length ? parsed.checklist : structuredClone(DEFAULT_CHECKLIST);
    state.hasUnsavedChanges = false;
    localStorage.setItem(STORAGE_KEYS.DIRTY, "false");
    saveToLocalCache(false);
    renderAll();
    if (forceRepoReload) {
      showToast("Reloaded jobs_tracker.xlsx from repository!");
    }
  } catch (_) {
    // Fallback when opened via file:// protocol
    state.applications = structuredClone(DEFAULT_APPLICATIONS);
    state.strategies = structuredClone(DEFAULT_STRATEGIES);
    state.checklist = structuredClone(DEFAULT_CHECKLIST);
    state.hasUnsavedChanges = false;
    saveToLocalCache(false);
    renderAll();
  }
}

/* =========================================================================
   4. Rendering UI Views
   ========================================================================= */

function getCountryFlag(countryName) {
  const found = TARGET_COUNTRIES.find((c) => c.name.toLowerCase() === String(countryName || "").toLowerCase());
  return found ? found.flag : "🌍";
}

function getFilteredApplications() {
  return state.applications.filter((app) => {
    if (state.selectedCountry !== "ALL" && app.Country !== state.selectedCountry) {
      return false;
    }
    if (state.filterResume !== "ALL" && app.Resume_Track !== state.filterResume) {
      return false;
    }
    if (state.filterStatus !== "ALL" && app.Status !== state.filterStatus) {
      return false;
    }
    if (state.filterPriority !== "ALL" && app.Priority !== state.filterPriority) {
      return false;
    }
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase();
      const hay = [
        app.ID, app.Country, app.City, app.Company, app.Role,
        app.Resume_Track, app.Visa_Type, app.Notes, app.Contact_Recruiter,
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function renderCountryPills() {
  const container = document.getElementById("country-pills-container");
  if (!container) return;

  const counts = { ALL: state.applications.length };
  for (const c of TARGET_COUNTRIES) counts[c.name] = 0;
  for (const app of state.applications) {
    counts[app.Country] = (counts[app.Country] || 0) + 1;
  }

  const allBtn = `
    <button type="button" class="country-pill" data-country="ALL" aria-pressed="${state.selectedCountry === "ALL"}">
      <span>🌍 All 10 Countries</span>
      <span class="country-count">${counts.ALL}</span>
    </button>
  `;

  const countryBtns = TARGET_COUNTRIES.map((c) => {
    const pressed = state.selectedCountry === c.name;
    return `
      <button type="button" class="country-pill" data-country="${escapeXml(c.name)}" aria-pressed="${pressed}">
        <span>${c.flag} ${escapeXml(c.name)}</span>
        <span class="country-count">${counts[c.name] || 0}</span>
      </button>
    `;
  }).join("");

  container.innerHTML = allBtn + countryBtns;
}

function renderActiveCountryBanner() {
  const banner = document.getElementById("active-country-banner");
  if (!banner) return;

  if (state.selectedCountry === "ALL") {
    banner.hidden = true;
    return;
  }

  const strat = state.strategies.find((s) => s.Country === state.selectedCountry);
  if (!strat) {
    banner.hidden = true;
    return;
  }

  banner.hidden = false;
  banner.innerHTML = `
    <div class="banner-block">
      <h2>${strat.Flag} ${escapeXml(strat.Country)} Strategy <span class="pill-inline">${escapeXml(strat.Tier)}</span></h2>
      <p class="pretty-text" style="font-size:0.82rem; color:var(--text-secondary);">
        ${escapeXml(strat.Key_Requirement)}
      </p>
    </div>
    <div class="banner-block">
      <span class="banner-label">Primary Visa &amp; Comp Threshold</span>
      <div class="banner-val">${escapeXml(strat.Primary_Visa)}</div>
      <div style="font-size:0.78rem; color:var(--text-secondary);">${escapeXml(strat.Min_Salary_Rule)}</div>
    </div>
    <div class="banner-block">
      <span class="banner-label">Recommended Resume Track</span>
      <div class="banner-val">${escapeXml(strat.Best_Resume)}</div>
      <div style="font-size:0.78rem; color:var(--text-secondary);">Top Portals: ${escapeXml(strat.Top_Portals)}</div>
    </div>
    <div class="banner-block">
      <span class="banner-label">Top Visa-Sponsoring Employers</span>
      <div class="banner-val" style="font-size:0.8rem;">${escapeXml(strat.Target_Companies)}</div>
    </div>
  `;
}

function renderKPIs(filteredApps) {
  const totalEl = document.getElementById("kpi-total");
  const countriesEl = document.getElementById("kpi-countries-covered");
  const appliedEl = document.getElementById("kpi-applied");
  const wishlistEl = document.getElementById("kpi-wishlist-count");
  const interviewingEl = document.getElementById("kpi-interviewing");
  const conversionEl = document.getElementById("kpi-conversion-rate");
  const resumeSplitEl = document.getElementById("kpi-resume-split");
  const followupsEl = document.getElementById("kpi-followups");

  const total = filteredApps.length;
  const uniqueCountries = new Set(filteredApps.map((a) => a.Country)).size;
  const wishlistCount = filteredApps.filter((a) => a.Status === "Wishlist").length;
  const submittedCount = filteredApps.filter((a) => a.Status !== "Wishlist").length;
  const interviewStages = new Set(["OA / Coding Test", "Recruiter Screen", "Technical Interview", "Final Round", "Offer"]);
  const interviewingCount = filteredApps.filter((a) => interviewStages.has(a.Status)).length;
  const conversionRate = submittedCount > 0 ? Math.round((interviewingCount / submittedCount) * 100) : 0;

  const javaCount = filteredApps.filter((a) => String(a.Resume_Track).includes("Java")).length;
  const genaiCount = filteredApps.filter((a) => String(a.Resume_Track).includes("GenAI")).length;

  const todayStr = new Date().toISOString().slice(0, 10);
  const dueFollowups = filteredApps.filter(
    (a) => a.Follow_Up_Date && a.Follow_Up_Date <= todayStr && a.Status !== "Rejected" && a.Status !== "Offer"
  ).length;

  if (totalEl) totalEl.textContent = String(total);
  if (countriesEl) countriesEl.textContent = `Across ${uniqueCountries} country market(s)`;
  if (appliedEl) appliedEl.textContent = String(submittedCount);
  if (wishlistEl) wishlistEl.textContent = `${wishlistCount} in wishlist queue`;
  if (interviewingEl) interviewingEl.textContent = String(interviewingCount);
  if (conversionEl) conversionEl.textContent = `${conversionRate}% interview conversion`;
  if (resumeSplitEl) resumeSplitEl.textContent = `${javaCount} Java / ${genaiCount} AI`;
  if (followupsEl) followupsEl.textContent = String(dueFollowups);
}

function renderTable(filteredApps) {
  const tbody = document.getElementById("jobs-table-body");
  if (!tbody) return;

  if (filteredApps.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align:center; padding:2rem; color:var(--text-secondary);">
          No applications match the current filters. Click <strong>➕ Add Application</strong> or reset filters.
        </td>
      </tr>
    `;
    return;
  }

  const todayStr = new Date().toISOString().slice(0, 10);

  tbody.innerHTML = filteredApps
    .map((app) => {
      const flag = getCountryFlag(app.Country);
      const isJava = String(app.Resume_Track).includes("Java");
      const resumeBadgeClass = isJava ? "badge-java" : "badge-genai";
      const resumeShort = isJava ? "☕ Java 21 / Spring" : "🤖 GenAI / Agentic";
      const isOverdue =
        app.Follow_Up_Date &&
        app.Follow_Up_Date <= todayStr &&
        app.Status !== "Rejected" &&
        app.Status !== "Offer";

      const stageOptions = KANBAN_STAGES.map(
        (st) => `<option value="${escapeXml(st)}" ${app.Status === st ? "selected" : ""}>${escapeXml(st)}</option>`
      ).join("");

      return `
        <tr data-id="${escapeXml(app.ID)}">
          <td><code>${escapeXml(app.ID)}</code></td>
          <td>
            <strong>${flag} ${escapeXml(app.Country)}</strong>
            <div class="role-sub">${escapeXml(app.City)}</div>
          </td>
          <td class="company-cell">
            <strong>
              ${
                app.Job_URL
                  ? `<a href="${escapeXml(app.Job_URL)}" target="_blank" rel="noopener noreferrer">${escapeXml(app.Company)} ↗</a>`
                  : escapeXml(app.Company)
              }
            </strong>
            <div class="role-sub">${escapeXml(app.Role)}</div>
          </td>
          <td>
            <span class="badge ${resumeBadgeClass}">${resumeShort}</span>
          </td>
          <td>
            <select class="status-select-inline" data-action="quick-status" data-id="${escapeXml(app.ID)}" aria-label="Change status for ${escapeXml(app.Company)}">
              ${stageOptions}
            </select>
            <div class="role-sub" style="margin-top:0.2rem;">Priority: <strong>${escapeXml(app.Priority)}</strong></div>
          </td>
          <td>
            <strong>${escapeXml(app.Visa_Type)}</strong>
            <div class="role-sub">${escapeXml(app.Visa_Sponsorship)}</div>
          </td>
          <td>
            <strong>${escapeXml(app.Salary_Range || "TBD")}</strong>
          </td>
          <td>
            <div>Applied: ${escapeXml(app.Applied_Date || "—")}</div>
            <div class="role-sub ${isOverdue ? "followup-overdue" : ""}">
              Follow-up: ${escapeXml(app.Follow_Up_Date || "—")} ${isOverdue ? "⚠️" : ""}
            </div>
          </td>
          <td class="notes-cell">
            <div>${escapeXml(app.Notes)}</div>
            ${
              app.Contact_Recruiter
                ? `<div style="margin-top:0.25rem; font-weight:600; color:var(--text-primary);">👤 ${escapeXml(app.Contact_Recruiter)}</div>`
                : ""
            }
          </td>
          <td>
            <div class="row-actions">
              <button type="button" class="btn btn-secondary btn-sm" data-action="edit" data-id="${escapeXml(app.ID)}">Edit</button>
              <button type="button" class="btn btn-ghost btn-sm" data-action="delete" data-id="${escapeXml(app.ID)}" aria-label="Delete ${escapeXml(app.Company)}">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderKanban(filteredApps) {
  const board = document.getElementById("kanban-board-container");
  if (!board) return;

  board.innerHTML = KANBAN_STAGES.map((stage) => {
    const items = filteredApps.filter((a) => a.Status === stage);
    const cardsHtml = items.length
      ? items
          .map((app) => {
            const flag = getCountryFlag(app.Country);
            const isJava = String(app.Resume_Track).includes("Java");
            return `
              <article class="kanban-card">
                <div class="kanban-card-top">
                  <span>${flag} ${escapeXml(app.Country)} · ${escapeXml(app.City)}</span>
                  <code>${escapeXml(app.ID)}</code>
                </div>
                <strong>${escapeXml(app.Company)}</strong>
                <div class="role-sub">${escapeXml(app.Role)}</div>
                <div>
                  <span class="badge ${isJava ? "badge-java" : "badge-genai"}">
                    ${isJava ? "☕ Java 21" : "🤖 GenAI"}
                  </span>
                </div>
                <div class="role-sub">🛂 ${escapeXml(app.Visa_Type)}</div>
                <div class="row-actions" style="margin-top:0.35rem;">
                  <button type="button" class="btn btn-secondary btn-sm" data-action="edit" data-id="${escapeXml(app.ID)}">Edit</button>
                </div>
              </article>
            `;
          })
          .join("")
      : `<p class="role-sub">No applications in this stage.</p>`;

    return `
      <div class="kanban-col">
        <div class="kanban-col-header">
          <h3>${escapeXml(stage)}</h3>
          <span class="pill-inline">${items.length}</span>
        </div>
        ${cardsHtml}
      </div>
    `;
  }).join("");
}

function renderStrategyCards() {
  const container = document.getElementById("strategy-cards-container");
  if (!container) return;

  container.innerHTML = state.strategies
    .map(
      (s) => `
      <article class="strategy-card">
        <div class="strategy-card-head">
          <h3><span>${s.Flag}</span> ${escapeXml(s.Country)}</h3>
          <span class="pill-inline">${escapeXml(s.Tier)}</span>
        </div>
        <div class="strategy-detail">
          <strong>Primary Work Permit / Visa</strong>
          ${escapeXml(s.Primary_Visa)}
        </div>
        <div class="strategy-detail">
          <strong>Salary &amp; Tax Benchmark</strong>
          ${escapeXml(s.Min_Salary_Rule)}
        </div>
        <div class="strategy-detail">
          <strong>Best Resume Track</strong>
          ${escapeXml(s.Best_Resume)}
        </div>
        <div class="strategy-detail">
          <strong>Top Sponsorship Job Portals</strong>
          ${escapeXml(s.Top_Portals)}
        </div>
        <div class="strategy-detail">
          <strong>Target Sponsor Employers</strong>
          ${escapeXml(s.Target_Companies)}
        </div>
        <div class="strategy-detail">
          <strong>Key Application Requirement</strong>
          <p class="pretty-text">${escapeXml(s.Key_Requirement)}</p>
        </div>
        <div style="margin-top:auto; padding-top:0.5rem;">
          <button type="button" class="btn btn-secondary btn-sm" data-filter-country="${escapeXml(s.Country)}">
            Filter ${escapeXml(s.Country)} Jobs →
          </button>
        </div>
      </article>
    `
    )
    .join("");
}

function renderChecklist() {
  const tbody = document.getElementById("checklist-table-body");
  if (!tbody) return;

  tbody.innerHTML = state.checklist
    .map((item, idx) => {
      const isDone = item.Status === "Done";
      return `
        <tr>
          <td>
            <input
              type="checkbox"
              data-checklist-idx="${idx}"
              ${isDone ? "checked" : ""}
              aria-label="Mark ${escapeXml(item.Checklist_Item)} as done"
            >
          </td>
          <td><strong>${escapeXml(item.Resume_Track)}</strong></td>
          <td><span class="pill-inline">${escapeXml(item.Category)}</span></td>
          <td style="${isDone ? "text-decoration:line-through; opacity:0.65;" : ""}">
            ${escapeXml(item.Checklist_Item)}
          </td>
          <td class="notes-cell">${escapeXml(item.Impact)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderAll() {
  const filteredApps = getFilteredApplications();
  renderCountryPills();
  renderActiveCountryBanner();
  renderKPIs(filteredApps);
  renderTable(filteredApps);
  renderKanban(filteredApps);
  renderStrategyCards();
  renderChecklist();
}

/* =========================================================================
   5. Event Handlers: CRUD, Excel Import/Export, GitHub API Direct Commit
   ========================================================================= */

function getNextAppId() {
  let maxNum = 0;
  for (const app of state.applications) {
    const m = String(app.ID || "").match(/(\d+)/);
    if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
  }
  return `APP-${String(maxNum + 1).padStart(3, "0")}`;
}

function openApplicationModal(editId = null) {
  const dialog = document.getElementById("application-dialog");
  const form = document.getElementById("application-form");
  const title = document.getElementById("dialog-app-title");
  if (!dialog || !form) return;

  form.reset();
  const todayStr = new Date().toISOString().slice(0, 10);
  const nextWeekStr = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);

  if (editId) {
    const existing = state.applications.find((a) => a.ID === editId);
    if (!existing) return;
    title.textContent = `Edit Application (${existing.ID})`;
    document.getElementById("field-id").value = existing.ID;
    document.getElementById("field-country").value = existing.Country || "Germany";
    document.getElementById("field-city").value = existing.City || "";
    document.getElementById("field-company").value = existing.Company || "";
    document.getElementById("field-role").value = existing.Role || "";
    document.getElementById("field-resume").value = existing.Resume_Track || "Java / Spring Boot Backend";
    document.getElementById("field-status").value = existing.Status || "Applied";
    document.getElementById("field-priority").value = existing.Priority || "High";
    document.getElementById("field-sponsorship").value = existing.Visa_Sponsorship || "Verified Sponsor";
    document.getElementById("field-visa-type").value = existing.Visa_Type || "";
    document.getElementById("field-salary").value = existing.Salary_Range || "";
    document.getElementById("field-applied-date").value = existing.Applied_Date || todayStr;
    document.getElementById("field-followup-date").value = existing.Follow_Up_Date || nextWeekStr;
    document.getElementById("field-url").value = existing.Job_URL || "";
    document.getElementById("field-contact").value = existing.Contact_Recruiter || "";
    document.getElementById("field-notes").value = existing.Notes || "";
  } else {
    title.textContent = "Add New International Job Application";
    document.getElementById("field-id").value = "";
    const defaultCountry = state.selectedCountry !== "ALL" ? state.selectedCountry : "Germany";
    document.getElementById("field-country").value = defaultCountry;
    const countryMeta = TARGET_COUNTRIES.find((c) => c.name === defaultCountry);
    document.getElementById("field-visa-type").value = countryMeta ? countryMeta.defaultVisa : "EU Blue Card";
    document.getElementById("field-applied-date").value = todayStr;
    document.getElementById("field-followup-date").value = nextWeekStr;
  }

  dialog.showModal();
}

async function exportOrSaveExcelWorkbook() {
  const bytes = generateWorkbookBytes();

  // If user linked a local file handle via File System Access API, write directly to it
  if (state.fileHandle && typeof state.fileHandle.createWritable === "function") {
    try {
      const writable = await state.fileHandle.createWritable();
      await writable.write(bytes);
      await writable.close();
      state.hasUnsavedChanges = false;
      localStorage.setItem(STORAGE_KEYS.DIRTY, "false");
      updateExcelBackendStatusUI();
      showToast(`Saved directly to ${state.fileHandle.name}!`);
      return;
    } catch (_) {
      // Fall back to standard browser download
    }
  }

  const blob = new Blob([bytes], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "jobs_tracker.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  state.hasUnsavedChanges = false;
  localStorage.setItem(STORAGE_KEYS.DIRTY, "false");
  updateExcelBackendStatusUI();
  showToast("Downloaded updated jobs_tracker.xlsx!");
}

async function pushExcelToGitHubRepo() {
  const owner = document.getElementById("gh-owner").value.trim();
  const repo = document.getElementById("gh-repo").value.trim();
  const branch = document.getElementById("gh-branch").value.trim() || "main";
  const path = document.getElementById("gh-path").value.trim() || "jobs_tracker.xlsx";
  const token = document.getElementById("gh-token").value.trim();

  if (!owner || !repo || !token) {
    showToast("Please provide GitHub Username, Repo, and Personal Access Token.");
    return;
  }

  localStorage.setItem(
    STORAGE_KEYS.GH_CONFIG,
    JSON.stringify({ owner, repo, branch, path, token })
  );

  const pushBtn = document.getElementById("btn-push-gh-now");
  if (pushBtn) pushBtn.disabled = true;

  try {
    const apiBase = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path}`;
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    };

    // 1. Check current file SHA if it already exists in repo
    let sha = undefined;
    const getResp = await fetch(`${apiBase}?ref=${encodeURIComponent(branch)}`, { headers });
    if (getResp.ok) {
      const existingData = await getResp.json();
      sha = existingData.sha;
    }

    // 2. Encode updated jobs_tracker.xlsx bytes to Base64
    const bytes = generateWorkbookBytes();
    let binaryStr = "";
    for (let i = 0; i < bytes.length; i++) {
      binaryStr += String.fromCharCode(bytes[i]);
    }
    const base64Content = btoa(binaryStr);

    // 3. Commit updated jobs_tracker.xlsx to GitHub
    const putResp = await fetch(apiBase, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Update ${path} via Global Job Tracker Dashboard (${state.applications.length} applications)`,
        content: base64Content,
        branch,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!putResp.ok) {
      const errJson = await putResp.json().catch(() => ({}));
      throw new Error(errJson.message || `GitHub API HTTP ${putResp.status}`);
    }

    state.hasUnsavedChanges = false;
    localStorage.setItem(STORAGE_KEYS.DIRTY, "false");
    updateExcelBackendStatusUI();
    document.getElementById("github-sync-dialog").close();
    showToast(`Committed ${path} to ${owner}/${repo} (${branch})!`);
  } catch (err) {
    showToast(`GitHub Sync Error: ${err.message}`);
  } finally {
    if (pushBtn) pushBtn.disabled = false;
  }
}

/* =========================================================================
   6. Theme Toggle (Two-State Control per Modern Web Guidance)
   ========================================================================= */

function initThemeToggle() {
  const btn = document.getElementById("btn-theme-toggle");
  const label = document.getElementById("theme-toggle-label");
  const metaScheme = document.querySelector('meta[name="color-scheme"]');
  const darkMql = window.matchMedia("(prefers-color-scheme: dark)");

  const updateThemeButtonLabel = () => {
    const pinned = localStorage.getItem("color-scheme");
    if (!pinned) {
      label.textContent = `Theme: System (${darkMql.matches ? "Dark" : "Light"})`;
    } else {
      label.textContent = `Theme: ${pinned === "dark" ? "🌙 Dark" : "☀️ Light"}`;
    }
  };

  darkMql.addEventListener("change", updateThemeButtonLabel);
  updateThemeButtonLabel();

  btn?.addEventListener("click", () => {
    const pinned = localStorage.getItem("color-scheme");
    const systemIsDark = darkMql.matches;
    const oppositeOfSystem = systemIsDark ? "light" : "dark";

    if (!pinned) {
      // Pin the opposite of the current system setting
      localStorage.setItem("color-scheme", oppositeOfSystem);
      metaScheme.content = oppositeOfSystem;
      document.documentElement.dataset.theme = oppositeOfSystem;
    } else {
      // Return to system setting
      localStorage.removeItem("color-scheme");
      metaScheme.content = "light dark";
      delete document.documentElement.dataset.theme;
    }
    updateThemeButtonLabel();
  });
}

/* =========================================================================
   7. Initialization & DOM Event Wiring
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initDialogLightDismissFallback();
  UserInvalidFallback.init(document);
  initThemeToggle();
  loadInitialExcelBackend(false);

  // Country filter pills
  document.getElementById("country-pills-container")?.addEventListener("click", (e) => {
    const pill = e.target.closest("button[data-country]");
    if (!pill) return;
    state.selectedCountry = pill.getAttribute("data-country");
    renderAll();
  });

  // View tabs
  document.querySelectorAll(".view-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetView = tab.getAttribute("data-view");
      state.activeView = targetView;

      document.querySelectorAll(".view-tab").forEach((t) => {
        const isCurrent = t === tab;
        t.classList.toggle("active", isCurrent);
        t.setAttribute("aria-selected", String(isCurrent));
      });

      document.getElementById("view-table").hidden = targetView !== "table";
      document.getElementById("view-kanban").hidden = targetView !== "kanban";
      document.getElementById("view-strategy").hidden = targetView !== "strategy";
      document.getElementById("view-resumes").hidden = targetView !== "resumes";
    });
  });

  // Search & Filter Controls
  document.getElementById("search-query")?.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderAll();
  });
  document.getElementById("filter-resume")?.addEventListener("change", (e) => {
    state.filterResume = e.target.value;
    renderAll();
  });
  document.getElementById("filter-status")?.addEventListener("change", (e) => {
    state.filterStatus = e.target.value;
    renderAll();
  });
  document.getElementById("filter-priority")?.addEventListener("change", (e) => {
    state.filterPriority = e.target.value;
    renderAll();
  });
  document.getElementById("btn-reset-filters")?.addEventListener("click", () => {
    state.selectedCountry = "ALL";
    state.searchQuery = "";
    state.filterResume = "ALL";
    state.filterStatus = "ALL";
    state.filterPriority = "ALL";
    document.getElementById("search-query").value = "";
    document.getElementById("filter-resume").value = "ALL";
    document.getElementById("filter-status").value = "ALL";
    document.getElementById("filter-priority").value = "ALL";
    renderAll();
  });

  // Table & Kanban delegated actions (Edit, Delete, Quick Status)
  document.querySelector(".dashboard-main")?.addEventListener("click", (e) => {
    const actionBtn = e.target.closest("button[data-action]");
    if (actionBtn) {
      const action = actionBtn.getAttribute("data-action");
      const id = actionBtn.getAttribute("data-id");
      if (action === "edit") {
        openApplicationModal(id);
      } else if (action === "delete") {
        state.applications = state.applications.filter((a) => a.ID !== id);
        saveToLocalCache(true);
        renderAll();
        showToast(`Removed application ${id}`);
      }
      return;
    }

    const filterCountryBtn = e.target.closest("button[data-filter-country]");
    if (filterCountryBtn) {
      state.selectedCountry = filterCountryBtn.getAttribute("data-filter-country");
      document.querySelector('.view-tab[data-view="table"]')?.click();
      renderAll();
    }
  });

  document.getElementById("jobs-table-body")?.addEventListener("change", (e) => {
    const statusSelect = e.target.closest("select[data-action='quick-status']");
    if (!statusSelect) return;
    const id = statusSelect.getAttribute("data-id");
    const app = state.applications.find((a) => a.ID === id);
    if (app) {
      app.Status = statusSelect.value;
      saveToLocalCache(true);
      renderAll();
      showToast(`Updated ${app.Company} status to "${app.Status}"`);
    }
  });

  // Checklist checkbox toggle
  document.getElementById("checklist-table-body")?.addEventListener("change", (e) => {
    const cb = e.target.closest("input[type='checkbox'][data-checklist-idx]");
    if (!cb) return;
    const idx = parseInt(cb.getAttribute("data-checklist-idx"), 10);
    if (state.checklist[idx]) {
      state.checklist[idx].Status = cb.checked ? "Done" : "Pending";
      saveToLocalCache(true);
      renderChecklist();
      showToast("Updated resume checklist in workbook state!");
    }
  });

  // Copy outreach templates
  document.querySelectorAll(".copy-tpl-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-copy-target");
      const codeEl = document.getElementById(targetId);
      if (codeEl && navigator.clipboard) {
        navigator.clipboard.writeText(codeEl.textContent || "");
        showToast("Copied outreach pitch to clipboard!");
      }
    });
  });

  // Add / Edit Application Modal
  document.getElementById("btn-add-job")?.addEventListener("click", () => openApplicationModal(null));
  document.getElementById("btn-close-app-dialog")?.addEventListener("click", () => {
    document.getElementById("application-dialog")?.close();
  });
  document.getElementById("btn-cancel-app-dialog")?.addEventListener("click", () => {
    document.getElementById("application-dialog")?.close();
  });

  // Auto-fill default Visa Type when Country changes in form
  document.getElementById("field-country")?.addEventListener("change", (e) => {
    const found = TARGET_COUNTRIES.find((c) => c.name === e.target.value);
    const visaInput = document.getElementById("field-visa-type");
    if (found && visaInput) {
      visaInput.value = found.defaultVisa;
    }
  });

  document.getElementById("application-form")?.addEventListener("submit", (e) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      const firstInvalid = form.querySelector(":invalid");
      if (firstInvalid) {
        firstInvalid.classList.add("user-invalid-fallback");
        firstInvalid.focus();
      }
      return;
    }

    e.preventDefault();
    const existingId = document.getElementById("field-id").value;
    const record = {
      ID: existingId || getNextAppId(),
      Country: document.getElementById("field-country").value,
      City: document.getElementById("field-city").value.trim(),
      Company: document.getElementById("field-company").value.trim(),
      Role: document.getElementById("field-role").value.trim(),
      Resume_Track: document.getElementById("field-resume").value,
      Status: document.getElementById("field-status").value,
      Priority: document.getElementById("field-priority").value,
      Visa_Sponsorship: document.getElementById("field-sponsorship").value,
      Visa_Type: document.getElementById("field-visa-type").value.trim(),
      Salary_Range: document.getElementById("field-salary").value.trim(),
      Applied_Date: document.getElementById("field-applied-date").value,
      Follow_Up_Date: document.getElementById("field-followup-date").value,
      Job_URL: document.getElementById("field-url").value.trim(),
      Contact_Recruiter: document.getElementById("field-contact").value.trim(),
      Notes: document.getElementById("field-notes").value.trim(),
    };

    if (existingId) {
      const idx = state.applications.findIndex((a) => a.ID === existingId);
      if (idx !== -1) state.applications[idx] = record;
      showToast(`Updated ${record.Company} (${record.ID})`);
    } else {
      state.applications.unshift(record);
      showToast(`Added ${record.Company} (${record.Country}) to tracker!`);
    }

    saveToLocalCache(true);
    renderAll();
    document.getElementById("application-dialog")?.close();
  });

  // Import / Link .xlsx File
  document.getElementById("btn-import-excel")?.addEventListener("click", async () => {
    if (typeof window.showOpenFilePicker === "function") {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [
            {
              description: "Excel Workbook (.xlsx)",
              accept: {
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
              },
            },
          ],
        });
        state.fileHandle = handle;
        const file = await handle.getFile();
        const buf = await file.arrayBuffer();
        const parsed = await parseExcelArrayBuffer(buf);
        if (parsed.applications.length) state.applications = parsed.applications;
        if (parsed.strategies.length) state.strategies = parsed.strategies;
        if (parsed.checklist.length) state.checklist = parsed.checklist;
        state.hasUnsavedChanges = false;
        saveToLocalCache(false);
        renderAll();
        showToast(`Linked local Excel backend: ${file.name}`);
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }
    document.getElementById("excel-file-input")?.click();
  });

  document.getElementById("excel-file-input")?.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const buf = await file.arrayBuffer();
    const parsed = await parseExcelArrayBuffer(buf);
    if (parsed.applications.length) state.applications = parsed.applications;
    if (parsed.strategies.length) state.strategies = parsed.strategies;
    if (parsed.checklist.length) state.checklist = parsed.checklist;
    state.hasUnsavedChanges = false;
    saveToLocalCache(false);
    renderAll();
    showToast(`Imported ${state.applications.length} rows from ${file.name}!`);
    e.target.value = "";
  });

  // Export / Save jobs_tracker.xlsx
  document.getElementById("btn-export-excel")?.addEventListener("click", exportOrSaveExcelWorkbook);

  // Reload Repo Excel
  document.getElementById("btn-reset-demo")?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.APPS);
    localStorage.removeItem(STORAGE_KEYS.STRATEGIES);
    localStorage.removeItem(STORAGE_KEYS.CHECKLIST);
    localStorage.removeItem(STORAGE_KEYS.DIRTY);
    loadInitialExcelBackend(true);
  });

  // GitHub Sync Modal
  document.getElementById("btn-github-sync")?.addEventListener("click", () => {
    const saved = localStorage.getItem(STORAGE_KEYS.GH_CONFIG);
    if (saved) {
      try {
        const cfg = JSON.parse(saved);
        document.getElementById("gh-owner").value = cfg.owner || "";
        document.getElementById("gh-repo").value = cfg.repo || "";
        document.getElementById("gh-branch").value = cfg.branch || "main";
        document.getElementById("gh-path").value = cfg.path || "jobs_tracker.xlsx";
        document.getElementById("gh-token").value = cfg.token || "";
      } catch (_) {
        // ignore
      }
    }
    document.getElementById("github-sync-dialog")?.showModal();
  });

  document.getElementById("btn-close-gh-dialog")?.addEventListener("click", () => {
    document.getElementById("github-sync-dialog")?.close();
  });
  document.getElementById("btn-cancel-gh-dialog")?.addEventListener("click", () => {
    document.getElementById("github-sync-dialog")?.close();
  });
  document.getElementById("btn-save-gh-config")?.addEventListener("click", () => {
    const cfg = {
      owner: document.getElementById("gh-owner").value.trim(),
      repo: document.getElementById("gh-repo").value.trim(),
      branch: document.getElementById("gh-branch").value.trim() || "main",
      path: document.getElementById("gh-path").value.trim() || "jobs_tracker.xlsx",
      token: document.getElementById("gh-token").value.trim(),
    };
    localStorage.setItem(STORAGE_KEYS.GH_CONFIG, JSON.stringify(cfg));
    showToast("Saved GitHub repository settings locally!");
  });

  document.getElementById("github-sync-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    pushExcelToGitHubRepo();
  });

  document.getElementById("btn-close-toast")?.addEventListener("click", hideToast);
});
