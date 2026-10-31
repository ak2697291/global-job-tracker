#!/usr/bin/env python3
"""
Generates jobs_tracker.xlsx (multi-sheet OpenXML Excel workbook) using only
the Python standard library so it runs anywhere without external dependencies.
Sheets:
  1. Applications
  2. Country_Strategy
  3. Resume_Checklist
"""

import zipfile
from xml.sax.saxutils import escape

APPLICATIONS_HEADERS = [
    "ID",
    "Country",
    "City",
    "Company",
    "Role",
    "Resume_Track",
    "Status",
    "Priority",
    "Visa_Sponsorship",
    "Visa_Type",
    "Salary_Range",
    "Applied_Date",
    "Follow_Up_Date",
    "Job_URL",
    "Contact_Recruiter",
    "Notes",
]

APPLICATIONS_ROWS = [
    [
        "APP-001", "Germany", "Berlin", "Zalando",
        "Senior Backend Engineer (Java 21 / Kafka)", "Java / Spring Boot Backend",
        "Applied", "High", "Verified Sponsor", "EU Blue Card",
        "€85,000 - €98,000", "2026-10-28", "2026-11-05",
        "https://jobs.zalando.com", "Talent Acquisition - Order Platform",
        "Highlighted Airtel Order Management System & Java 21 Virtual Threads 40% runtime boost. Anabin H+ attached."
    ],
    [
        "APP-002", "Germany", "Berlin", "Delivery Hero",
        "Senior Platform Engineer - Logistics", "Java / Spring Boot Backend",
        "Recruiter Screen", "High", "Verified Sponsor", "EU Blue Card",
        "€82,000 - €95,000", "2026-10-24", "2026-11-02",
        "https://careers.deliveryhero.com", "Sarah M. (Tech Recruiter)",
        "Recruiter screen scheduled. Emphasize RabbitMQ + Kafka event-driven architecture & Resilience4j."
    ],
    [
        "APP-003", "Germany", "Munich", "Celonis",
        "Senior AI Agent Engineer", "GenAI / Agentic AI",
        "Wishlist", "High", "Verified Sponsor", "EU Blue Card",
        "€90,000 - €110,000", "2026-10-31", "2026-11-07",
        "https://www.celonis.com/careers", "Engineering Manager - Process AI",
        "Strong match for CrewAI multi-agent architecture & RAG pipeline experience."
    ],
    [
        "APP-004", "Netherlands", "Amsterdam", "Booking.com",
        "Senior Software Engineer - Core Backend", "Java / Spring Boot Backend",
        "OA / Coding Test", "High", "Verified Sponsor", "Kennismigrant (30% Ruling)",
        "€95,000 - €115,000", "2026-10-22", "2026-11-01",
        "https://careers.booking.com", "Booking Tech Recruiting",
        "HackerRank system design + coding test received. Eligible for 30% tax ruling & full relocation package."
    ],
    [
        "APP-005", "Netherlands", "Amsterdam", "Adyen",
        "Senior Java Engineer - High Throughput Payments", "Java / Spring Boot Backend",
        "Applied", "High", "Verified Sponsor", "Kennismigrant (30% Ruling)",
        "€92,000 - €112,000", "2026-10-29", "2026-11-06",
        "https://careers.adyen.com", "Fintech Platform Team",
        "Emphasized 85% to 99% transactional consistency checks & low-latency Java concurrency."
    ],
    [
        "APP-006", "United Kingdom", "London", "Revolut",
        "Senior Backend Engineer (Java / Spring Boot)", "Java / Spring Boot Backend",
        "Applied", "High", "Verified Sponsor", "Skilled Worker Visa",
        "£85,000 - £105,000", "2026-10-27", "2026-11-04",
        "https://www.revolut.com/careers", "Referral via NIT Alumni",
        "Home Office licensed sponsor. Highlighted high-scale event processing & config-driven onboarding."
    ],
    [
        "APP-007", "United Kingdom", "London", "Synthesia",
        "Senior AI Platform & Agent Engineer", "GenAI / Agentic AI",
        "Wishlist", "Medium", "Verified Sponsor", "Skilled Worker Visa",
        "£90,000 - £115,000", "2026-10-31", "2026-11-08",
        "https://www.synthesia.io/careers", "AI Platform Lead",
        "Use Resume B (GenAI). Highlight GPT-4/Claude orchestration, FastAPI & production RAG."
    ],
    [
        "APP-008", "Ireland", "Dublin", "Stripe",
        "Senior Software Engineer - Reliability & Backend", "Java / Spring Boot Backend",
        "Applied", "High", "Verified Sponsor", "Critical Skills Permit (CSEP)",
        "€92,000 - €115,000", "2026-10-26", "2026-11-03",
        "https://stripe.com/jobs", "Dublin Infrastructure Team",
        "CSEP leads to Stamp 4 PR in 2 years. Highlighted Circuit Breaker (Resilience4j) & 90% RCA reduction."
    ],
    [
        "APP-009", "Ireland", "Dublin", "Intercom",
        "Senior AI Engineer - Fin Agent Team", "GenAI / Agentic AI",
        "Wishlist", "High", "Verified Sponsor", "Critical Skills Permit (CSEP)",
        "€88,000 - €108,000", "2026-10-31", "2026-11-07",
        "https://www.intercom.com/careers", "AI Engineering Recruiter",
        "Direct match for Autonomous Agent reasoning chains, ReAct prompting, and tool integration."
    ],
    [
        "APP-010", "UAE", "Dubai", "Careem",
        "Senior Platform Software Engineer (Java)", "Java / Spring Boot Backend",
        "Technical Interview", "High", "Verified Sponsor", "UAE Work Visa (0% Tax)",
        "AED 28,000 - 34,000 / mo", "2026-10-18", "2026-11-01",
        "https://www.careem.com/en-AE/careers/", "Omar K. (Talent Partner)",
        "Round 1 cleared! System design round next week focusing on Kafka/MongoDB Change Streams."
    ],
    [
        "APP-011", "UAE", "Abu Dhabi", "Core42 / G42",
        "Senior Applied GenAI & Agentic Systems Engineer", "GenAI / Agentic AI",
        "Applied", "High", "Verified Sponsor", "UAE Work Visa / Golden Visa",
        "AED 32,000 - 40,000 / mo", "2026-10-29", "2026-11-05",
        "https://core42.ai/careers", "Abu Dhabi AI Talent Team",
        "Salary >30k AED qualifies for 10-year UAE Golden Visa. Sent GenAI resume highlighting CrewAI & FAISS."
    ],
    [
        "APP-012", "Singapore", "Singapore", "Grab",
        "Senior Backend Engineer - Regional Platform", "Java / Spring Boot Backend",
        "Applied", "High", "Verified Sponsor", "Employment Pass (COMPASS)",
        "SGD 10,500 - 13,500 / mo", "2026-10-25", "2026-11-03",
        "https://grab.careers", "SG Regional Tech Recruiter",
        "NIT Bhopal earns top COMPASS qualification points; Airtel super-app experience maps directly to Grab."
    ],
    [
        "APP-013", "Singapore", "Singapore", "DBS Bank",
        "Senior GenAI & Backend Platform Engineer", "GenAI / Agentic AI",
        "Wishlist", "Medium", "Verified Sponsor", "Employment Pass (COMPASS SOL)",
        "SGD 10,000 - 12,500 / mo", "2026-10-31", "2026-11-09",
        "https://www.dbs.com/careers", "Tech & AI Division",
        "AI Engineer is on Singapore Shortage Occupation List (+20 COMPASS bonus points)."
    ],
    [
        "APP-014", "Australia", "Sydney", "Atlassian",
        "Senior Software Engineer (Java / Cloud Platform)", "Java / Spring Boot Backend",
        "Applied", "High", "Verified Sponsor", "Subclass 482 (Specialist Skills)",
        "AUD 155,000 - 180,000", "2026-10-28", "2026-11-06",
        "https://www.atlassian.com/company/careers", "Sydney Platform Recruiting",
        "Specialist Skills stream (>AUD 135k) gets 7-day visa processing. Highlighted Jira API & SRE AI project."
    ],
    [
        "APP-015", "Australia", "Sydney", "Canva",
        "Senior Backend / AI Infrastructure Engineer", "GenAI / Agentic AI",
        "Wishlist", "Medium", "Verified Sponsor", "Subclass 482",
        "AUD 150,000 - 175,000", "2026-10-31", "2026-11-08",
        "https://www.lifeatcanva.com", "Canva AI Platform",
        "Combine Java 21 backend scale with LLM orchestration in cover note."
    ],
    [
        "APP-016", "Canada", "Toronto", "Cohere",
        "Senior Software Engineer - Enterprise Agentic AI", "GenAI / Agentic AI",
        "Applied", "High", "Verified Sponsor", "Global Talent Stream (LMIA Cat B)",
        "CAD 145,000 - 175,000", "2026-10-29", "2026-11-06",
        "https://cohere.com/careers", "Enterprise AI Team",
        "2-week fast-track work permit under Global Talent Stream. Strong match for multi-agent RAG."
    ],
    [
        "APP-017", "Canada", "Vancouver", "Amazon (AWS)",
        "Software Development Engineer II (Java / Distributed Systems)", "Java / Spring Boot Backend",
        "Wishlist", "Medium", "Verified Sponsor", "Global Talent Stream",
        "CAD 150,000 - 180,000", "2026-10-31", "2026-11-09",
        "https://www.amazon.jobs", "AWS Vancouver Recruiting",
        "Reach out to NIT Bhopal alumni in AWS Vancouver for referral ID before submitting."
    ],
    [
        "APP-018", "Switzerland", "Zurich", "Google",
        "Senior Software Engineer - Cloud & AI Reliability", "GenAI / Agentic AI",
        "Wishlist", "High", "Verified Sponsor", "Swiss B-Permit (Quota Sponsor)",
        "CHF 155,000 - 190,000", "2026-10-31", "2026-11-10",
        "https://careers.google.com", "Zurich Site Reliability / AI",
        "Big Tech Zurich can sponsor non-EU B-Permit quota. Emphasize SRE Agentic AI & Java 21 scale."
    ],
    [
        "APP-019", "USA", "San Francisco (Remote / O-1A)", "YC AI Startup (WorkAtAStartup)",
        "Founding Senior Agentic AI Engineer", "GenAI / Agentic AI",
        "Applied", "High", "Remote USD", "Remote USD -> O-1A Visa",
        "$110,000 - $145,000", "2026-10-30", "2026-11-05",
        "https://www.workatastartup.com", "Founder Direct Message",
        "Applied via YC Work at a Startup. Remote USD initially with O-1A visa sponsorship pathway."
    ],
    [
        "APP-020", "USA", "Bengaluru -> Seattle (Transfer)", "Uber / Stripe (L-1B Track)",
        "Senior Backend Engineer (L-1B Transfer Track)", "Java / Spring Boot Backend",
        "Wishlist", "High", "Internal Transfer / L-1", "L-1B Intracompany Transfer",
        "$165,000 - $210,000 (Post-Transfer)", "2026-10-31", "2026-11-12",
        "https://www.uber.com/us/en/careers/", "India-to-US Mobility Track",
        "Backup US strategy: Join US MNC in India and transfer to Seattle/SF after 12 months via L-1B."
    ],
]

STRATEGY_HEADERS = [
    "Country",
    "Flag",
    "Tier",
    "Primary_Visa",
    "Min_Salary_Rule",
    "Best_Resume",
    "Top_Portals",
    "Target_Companies",
    "Key_Requirement",
]

STRATEGY_ROWS = [
    [
        "Germany", "🇩🇪", "Tier 1 (High ROI)",
        "EU Blue Card / Chancenkarte",
        "€41,041.80+ (IT Shortage) | Market: €75k-€95k",
        "Java / Spring Boot Backend (70%) & GenAI (30%)",
        "Honeypot.io, Relocate.me, Arbeitnow, GermanTechJobs.de, LinkedIn",
        "Zalando, Delivery Hero, N26, SAP, Personio, Trade Republic, Celonis, Auto1",
        "NIT Bhopal is H+ on Anabin (no ZAB delay). Include 1-page Cover Letter + Anabin H+ PDF."
    ],
    [
        "Netherlands", "🇳🇱", "Tier 1 (High ROI)",
        "Highly Skilled Migrant (Kennismigrant)",
        "€4,171/mo (<30) or €5,688/mo (30+) | Market: €80k-€115k",
        "Java / Spring Boot Backend",
        "Relocate.me, IamExpat.nl, Techleap.nl, LinkedIn",
        "Booking.com, Adyen, Uber, Databricks, ING, ABN AMRO, Miro, Mollie, ASML",
        "Employer must be on IND Recognized Sponsor list. Qualifies for 30%/27% tax-free expat ruling."
    ],
    [
        "United Kingdom", "🇬🇧", "Tier 1 (High ROI)",
        "Skilled Worker Visa / Global Talent",
        "£38,700+ or SOC 2134 Going Rate (~£49.4k+) | Market: £75k-£115k",
        "Both (Java for Fintech, GenAI for AI Startups)",
        "Otta.com, Cord.co, UKTierSponsors.co.uk, LinkedIn",
        "Revolut, Monzo, Wise, Checkout.com, JPMorgan, Goldman Sachs, Synthesia, ElevenLabs",
        "Verify employer on UK Home Office Licensed Sponsors register. English proficiency via degree/IELTS."
    ],
    [
        "UAE", "🇦🇪", "Tier 1 (High ROI)",
        "Employer Work Visa / 10-Yr Golden Visa",
        "No statutory min (Golden Visa: AED 30,000+/mo) | 0% Income Tax",
        "Both (Java in Dubai, GenAI in Abu Dhabi)",
        "LinkedIn (Direct Recruiter Outreach), NaukriGulf, Bayt",
        "Careem, Talabat, Noon, Emirates NBD, FAB, G42, Core42, AI71, Presight, TII",
        "Fast 2-week visa processing. Attest NIT Bhopal B.Tech degree (MEA + UAE Embassy)."
    ],
    [
        "Ireland", "🇮🇪", "Tier 2 (English Hub)",
        "Critical Skills Employment Permit (CSEP)",
        "€38,000+ (with CS degree) | Market: €75k-€105k",
        "Java / Spring Boot Backend & GenAI SRE",
        "IrishJobs.ie, TechIreland, LinkedIn (Dublin)",
        "Stripe, Workday, Intercom, Amazon (AWS Dublin), Mastercard, Toast, HubSpot, Fidelity",
        "ICT roles are on Critical Skills list. Gives Stamp 4 Permanent Residency in just 2 years."
    ],
    [
        "Singapore", "🇸🇬", "Tier 2 (Asian Hub)",
        "Employment Pass (EP via COMPASS)",
        "SGD 5,600+/mo qualifying | Market: SGD 9,500-14,000/mo",
        "Both (GenAI gets +20 COMPASS Shortage Bonus)",
        "NodeFlair, MyCareersFuture.gov.sg, TechInAsia, LinkedIn",
        "Grab, Shopee, Lazada, ByteDance/TikTok, Coupang, DBS, Standard Chartered, OCBC",
        "Must score 40 pts on COMPASS. NIT Bhopal scores top education points + AI Engineer gets +20 SOL bonus."
    ],
    [
        "Australia", "🇦🇺", "Tier 2 (English Hub)",
        "Skills in Demand (Subclass 482) / PR 189 & 190",
        "AUD 73,150+ (Core) / AUD 135,000+ (Specialist 7-day track)",
        "Java / Spring Boot Backend & GenAI",
        "Seek.com.au (filter: 482 sponsorship), LinkedIn (Sydney/Melbourne)",
        "Atlassian, Canva, Block/Afterpay, Macquarie, CommBank, WiseTech, Xero, Airwallex",
        "482 requires 1-2+ yrs exp. For direct PR (189/190), complete ACS Skills Assessment + PTE/IELTS."
    ],
    [
        "Canada", "🇨🇦", "Tier 2 (North America)",
        "Global Talent Stream (LMIA Cat B) / Express Entry PNP",
        "Prevailing wage (~CAD 95k-165k)",
        "GenAI / Agentic AI & Java / Spring Boot Backend",
        "VanHack, JobBank.gc.ca, Wellfound, LinkedIn (Toronto/Vancouver)",
        "Shopify, Cohere, Wealthsimple, Amazon Vancouver, Uber Toronto, RBC, Clio",
        "Global Talent Stream processes work permits in 14 days for NOC 21232 (SWE) & 21211 (AI/Data)."
    ],
    [
        "Switzerland", "🇨🇭", "Tier 3 (High Barrier)",
        "Non-EU B-Permit (Subject to Annual Quota)",
        "Cantonal prevailing wage (~CHF 130,000 - 190,000+)",
        "GenAI / Agentic AI & High-Scale Distributed Systems",
        "SwissDevJobs.ch (filter: Visa Sponsor), CERN Careers, LinkedIn",
        "Google Zurich, Apple, Meta, Microsoft, Anthropic Zurich, CERN, Oracle Labs",
        "Strict non-EU quota; target Big Tech in Zurich or relocate to Germany/NL first and move later."
    ],
    [
        "USA", "🇺🇸", "Tier 3 (Strategic Entry)",
        "L-1B Intracompany Transfer / O-1A / Remote USD",
        "$110k-$150k (Remote USD) | $165k-$240k+ (On-site US)",
        "GenAI / Agentic AI (O-1A/Remote) & Java (L-1B MNC)",
        "WorkAtAStartup (YC), Wellfound, Turing, LinkedIn",
        "YC AI Startups, Uber, Stripe, Amazon, Microsoft, Salesforce, Confluent, Rubrik",
        "Avoid cold H-1B dependency. Target YC Remote USD -> O-1A (using Airtel awards) or MNC L-1B transfer."
    ],
]

CHECKLIST_HEADERS = ["Resume_Track", "Category", "Checklist_Item", "Impact", "Status"]

CHECKLIST_ROWS = [
    [
        "Both Resumes", "ATS Keywords",
        "Add Docker, Kubernetes (K8s), and Cloud (AWS / GCP / Azure) explicitly to Technical Skills",
        "Critical — 80%+ international backend/AI JD filters screen for containers & cloud.", "Pending"
    ],
    [
        "Both Resumes", "Company Context",
        "Add 1-line descriptor under Airtel: 'Global Top-3 Telecom Operator serving 350M+ subscribers'",
        "High — Helps EU/UK/US/AU recruiters immediately understand Airtel's massive scale.", "Pending"
    ],
    [
        "Both Resumes", "Header & Mobility",
        "Add 'Gurugram, India | Open to International Relocation' and verify LinkedIn URL matches track",
        "High — Signals explicit relocation intent to international sourcers.", "Pending"
    ],
    [
        "Java / Spring Boot Backend", "Scale Metrics",
        "Add concrete RPS / daily event volume (e.g., '10M+ daily order events, <50ms p99 latency')",
        "High — Calibrates you for Senior SWE (L5) bands in Germany, NL, UK, and Singapore.", "Pending"
    ],
    [
        "GenAI / Agentic AI", "Production Eval & Guardrails",
        "Mention LLM evaluation (RAGAS/LangSmith), latency/token cost optimization, and guardrails",
        "High — Distinguishes production AI engineers from prototype builders.", "Pending"
    ],
    [
        "Germany / Switzerland", "Relocation Dossier",
        "Download Anabin H+ confirmation PDF for NIT Bhopal (MANIT) and attach with applications",
        "Critical — Proves instant EU Blue Card & Chancenkarte eligibility to German HR.", "Pending"
    ],
]


def col_letter(col_idx: int) -> str:
    """1-based column index to Excel column letter (A, B, ..., Z, AA...)."""
    result = ""
    while col_idx > 0:
        col_idx, rem = divmod(col_idx - 1, 26)
        result = chr(65 + rem) + result
    return result


def build_sheet_xml(headers, rows) -> str:
    all_rows = [headers] + rows
    lines = [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">',
        '  <sheetData>',
    ]
    for r_idx, row in enumerate(all_rows, start=1):
        style_attr = ' s="1"' if r_idx == 1 else ' s="0"'
        lines.append(f'    <row r="{r_idx}">')
        for c_idx, val in enumerate(row, start=1):
            ref = f"{col_letter(c_idx)}{r_idx}"
            escaped = escape(str(val or ""))
            lines.append(
                f'      <c r="{ref}" t="inlineStr"{style_attr}><is><t>{escaped}</t></is></c>'
            )
        lines.append("    </row>")
    lines.append("  </sheetData>")
    lines.append("</worksheet>")
    return "\n".join(lines)


def create_xlsx(output_path="jobs_tracker.xlsx"):
    sheets = [
        ("Applications", APPLICATIONS_HEADERS, APPLICATIONS_ROWS),
        ("Country_Strategy", STRATEGY_HEADERS, STRATEGY_ROWS),
        ("Resume_Checklist", CHECKLIST_HEADERS, CHECKLIST_ROWS),
    ]

    content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet3.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>"""

    root_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>"""

    workbook_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
          xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Applications" sheetId="1" r:id="rId1"/>
    <sheet name="Country_Strategy" sheetId="2" r:id="rId2"/>
    <sheet name="Resume_Checklist" sheetId="3" r:id="rId3"/>
  </sheets>
</workbook>"""

    workbook_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet3.xml"/>
  <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>"""

    styles_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="10"/><color rgb="FF1E293B"/><name val="Calibri"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>
  </fonts>
  <fills count="3">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF0F172A"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="1">
    <border><left/><right/><top/><bottom/><diagonal/></border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="2">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>
  </cellXfs>
</styleSheet>"""

    with zipfile.ZipFile(output_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types)
        zf.writestr("_rels/.rels", root_rels)
        zf.writestr("xl/workbook.xml", workbook_xml)
        zf.writestr("xl/_rels/workbook.xml.rels", workbook_rels)
        zf.writestr("xl/styles.xml", styles_xml)
        for idx, (_, headers, rows) in enumerate(sheets, start=1):
            zf.writestr(f"xl/worksheets/sheet{idx}.xml", build_sheet_xml(headers, rows))

    print(f"Successfully generated {output_path} with {len(sheets)} sheets.")


if __name__ == "__main__":
    create_xlsx("jobs_tracker.xlsx")
