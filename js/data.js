/* ===========================================================================
   SITE DATA — THE ONE FILE YOU EDIT TO UPDATE THE SITE.
   ---------------------------------------------------------------------------
   The Work cards, the Services table, the Latest feed and the Notes page are
   all generated from the lists below. Add an item here and it appears on
   the site. No HTML editing needed.

   It's plain JavaScript (not JSON) on purpose: it loads even when you open
   index.html by double-clicking it from your desktop.

   RULES
   - Dates are "YYYY-MM-DD" or "YYYY-MM". Lists are sorted by date for you,
     so order inside the file doesn't matter.
   - Put a comma between items. No comma after the last one in a list.
   - Text goes inside "double quotes". If your text needs a double quote,
     write it as \" (or just use single quotes inside the text).

   BEFORE GOING LIVE, search this file for  CHECK  and fix each one.
   =========================================================================== */

var SITE = {

  /* -------------------------------------------------------------------------
     1. SITE SETTINGS
  ------------------------------------------------------------------------- */
  site: {
    name:     "Alex Williams",
    email:    "alexjdwilliams@gmail.com",           // shown on the Contact button; "" hides it
    linkedin: "https://www.linkedin.com/in/alexjdwilliams",
    revision: "2026.11"                              // shown in the header + footer; bump it after big updates
  },

  /* Items newer than this many days get a red NEW tag in the Latest feed. */
  NEW_DAYS: 30,

  /* How many Latest items the homepage shows (Notes page shows all). */
  HOMEPAGE_LATEST_COUNT: 3,

  /* -------------------------------------------------------------------------
     2. CATEGORIES — the color key
     Each project's `discipline` must match one of these `key` values exactly.
     `tint` is the tag/filter color. Add a category by copying a line.
  ------------------------------------------------------------------------- */
  disciplines: [
    { key: "web",        label: "WEB & SEO",            tint: "#dcefd2" },
    { key: "analysis",   label: "ANALYSIS",             tint: "#d9e5fb" },
    { key: "strategy",   label: "STRATEGY & SECURITY",  tint: "#fbe0da" },
    { key: "curriculum", label: "CURRICULUM",           tint: "#fcf0bd" }
  ],

  /* -------------------------------------------------------------------------
     3. PROJECTS — the Work section
     Figure numbers (FIG. 01, 02 …) follow the order of this list, so put
     your strongest work first.

     To add a project, copy this block into the list:

        {
          discipline: "analysis",                 // a key from section 2
          title:   "Project title",
          summary: "Two sentences: what it is and what it found or changed.",
          specs: {                                // any labels you like, in order
            "Format": "Slide deck",
            "Tools":  "Python, SQL",
            "Year":   "2026"
          },
          links: [ { label: "Visit the site", url: "https://example.com" } ],
          file:  "work/your-file.pdf",            // drop the PDF in the work/ folder
          fileLabel: "Read the report",           // optional button text for the file
          image: "img/your-screenshot.jpg",       // optional; shown above the text
          draft: true                             // hidden from the site until you delete this line
        },

     DRAFTS: a project with  draft: true  stays in this file but doesn't
     appear on the site. When a piece is fixed, export the PDF into work/,
     set `file`, and delete the draft line. It goes live on the next upload.
     Figure numbers only count the projects that are showing.
  ------------------------------------------------------------------------- */
  projects: [
    {
      discipline: "web",
      title:   "Forest Floor Foraging: E-commerce Site, SEO & Analytics",
      summary: "Brought an established Etsy moss and terrarium shop (11k+ Etsy sales) onto its own Wix store, then built the search and measurement layer around it: keyword research, meta descriptions, product copy and images, Search Console, Google Analytics and Merchant Center, plus ongoing sales and traffic review.",
      specs: {
        "Role":  "Site, SEO & analytics",
        "Tools": "Wix, Search Console, Google Analytics, Merchant Center",
        "Since": "2026"
      },
      links: [ { label: "Visit the site", url: "https://forestfloorforaging.com" } ],
      file:  "",
      image: ""
    },
    {
      discipline: "web",
      title:   "Walnut Creek Kinderworld: Website & Local Search",
      summary: "Rebuilt a large family home daycare's website on Wix and set up its local search presence: Google Business listing, Yelp, reviews, blog content and enquiry emails. The program runs at full enrollment with a standing waitlist.",
      specs: {
        "Role":  "Website, local search, content",
        "Tools": "Wix, Google Business Profile, Yelp",
        "Since": "2019"
      },
      links: [ { label: "Visit the site", url: "https://wckw.org" } ],
      file:  "",
      image: ""
    },
    {
      /* DRAFT until fixed: correct the BIPA slide (the case was dismissed in
         2023; there was no $50M settlement), replace "(CITE)", fill the
         References slide, fix the typos. Then export as
         work/mcdonalds-ai-strategy.pdf and delete the draft line. */
      discipline: "strategy",
      title:   "AI & Data Strategy at McDonald's",
      summary: "A strategy deck on how McDonald's uses AI and customer data (personalization, demand forecasting, voice ordering), pairing every gain with its privacy, legal or operational cost, then turning that into recommendations for leadership. Student capstone; not affiliated with McDonald's.",
      specs: {
        "Format":  "Slide deck",
        "Context": "Capstone, San José State University",
        "Year":    "2025"
      },
      links: [],
      file:  "work/mcdonalds-ai-strategy.pdf",
      fileLabel: "View the deck",
      image: "",
      draft: true
    },
    {
      /* Ready. Optional polish in the source file: "CEST" should be CSET
         (CISA's Cyber Security Evaluation Tool); ISO 27001 has continuity
         controls, but a full BCP is ISO 22301; "incidences" -> "incidents". */
      discipline: "strategy",
      title:   "Fullsoft: Security Plan for Leadership (ISO 27001)",
      summary: "A leadership briefing for a healthcare-software company recovering from a USB malware breach: which laws apply (HIPAA, SOX, PCI DSS, GLBA, with CCPA, GDPR and COPPA ahead), why ISO 27001 as the framework, a gap-analysis plan against ISO/IEC 27002, and the countermeasures to take first.",
      specs: {
        "Format":    "Slide deck",
        "Framework": "ISO/IEC 27001, 27002",
        "Context":   "Coursework, San José State University",
        "Year":      "2025"
      },
      links: [],
      file:  "work/fullsoft-iso27001.pdf",
      fileLabel: "View the deck",
      image: ""
    },
    {
      /* DRAFT until fixed. Use the Project Component 1 deck, not the final
         executive presentation. Fixes: say the FedEx benefits are single
         sign-on as well as MFA (or swap in an MFA-specific example); CISA
         issues guidance, not regulations, and isn't in the references;
         Jahnukainen is 2024 not 2014; add one slide with cost per user and
         two alternatives (e.g. Duo, Microsoft Authenticator); "Miniscule"
         -> "Minuscule". Export as work/xenco-mfa-business-case.pdf. */
      discipline: "strategy",
      title:   "MFA Business Case: Xenco × Okta",
      summary: "A business case for adding Okta multi-factor authentication at a case-study company: why password-only logins fail, what FedEx gained from Okta, and a phased rollout that starts with the most vulnerable accounts.",
      specs: {
        "Format":  "Slide deck",
        "Context": "Coursework, San José State University",
        "Year":    "2025"
      },
      links: [],
      file:  "work/xenco-mfa-business-case.pdf",
      fileLabel: "View the deck",
      image: "",
      draft: true
    },
    {
      /* DRAFT until fixed: rewrite the correlation and Key Findings slides
         so the conclusion matches the evidence (the data is synthetic, so
         the lead / chemical-industry "findings" are noise). Use the Keynote
         version. Export as work/hurt-dirt-soil-analysis.pdf. */
      discipline: "analysis",
      title:   "Hurt Dirt: A Soil Pollution Analysis",
      summary: "Exploratory analysis of a 3,000-record soil pollution dataset in Python, with interactive Plotly box plots and line charts, and a test of whether the data could support real-world conclusions at all.",
      specs: {
        "Format": "Slide deck",
        "Tools":  "Python: matplotlib, seaborn, Plotly",
        "Year":   "2025"
      },
      links: [],
      file:  "work/hurt-dirt-soil-analysis.pdf",
      fileLabel: "View the deck",
      image: "",
      draft: true
    },
    {
      /* DRAFT until fixed: curry figure (text 4.4 vs chart ~4.1), ratings
         vs popularity, the top-100-per-country comparison, Nissin/Myojo
         history, curly quotes and regex=True in the code. CHECK the year.
         Export as work/ramen-ratings-report.pdf. */
      discipline: "analysis",
      title:   "What Makes a Highly Rated Instant Ramen?",
      summary: "An analysis of 2,580 instant-ramen reviews, most written by a single reviewer (The Ramen Rater): how ratings vary by flavor, brand, country of origin and packaging.",
      specs: {
        "Format": "Written report",
        "Tools":  "Python: pandas, matplotlib",
        "Year":   "2024"
      },
      links: [],
      file:  "work/ramen-ratings-report.pdf",
      fileLabel: "Read the report",
      image: "",
      draft: true
    },
    {
      /* Scope is stated honestly on purpose: you did layout and usability;
         FlyNexia's team owned vocabulary and lesson flow. A before/after
         image pair would make this card much stronger. */
      discipline: "curriculum",
      title:   "Eiken Lesson Slides & Workbooks",
      summary: "Reworked FlyNexia's Eiken test-prep slides and workbooks for live online classes: separating elements by function, making activities usable on screen, and swapping decoration for things that help the lesson.",
      specs: {
        "Client": "FlyNexia (online English school)",
        "Scope":  "Layout & usability",
        "Year":   "2026"
      },
      links: [],
      file:  "",
      image: ""
    }

    /* Removed for now: DataU business continuity plan. Bring it back only
       after the RTO/RPO table has units, the backup schedule supports the
       RPOs, and hot/cold sites are used correctly.
    ,{
      discipline: "strategy",
      title:   "Business Continuity Plan: DataU",
      summary: "...",
      specs: { "Format": "Plan document", "Context": "Coursework, San José State University", "Year": "2024" },
      links: [], file: "", image: "", draft: true
    } */
  ],

  /* -------------------------------------------------------------------------
     4. SERVICES — the table on the homepage
     Status is whatever is true: "Available", "Limited", "By referral".
     Anything containing "Available" gets a green dot.
  ------------------------------------------------------------------------- */
  services: [
    {
      group: "Websites & SEO",
      items: [
        { name: "SEO audit and on-page fixes: keyword research, titles, meta descriptions, product copy", format: "Project", status: "Available" },
        { name: "Small-business website build or rebuild (Wix)",                                        format: "Project", status: "Available" },
        { name: "Search Console, Google Analytics and Merchant Center setup",                           format: "Project", status: "Available" }
      ]
    },
    {
      group: "Analysis & reporting",
      items: [
        { name: "Sales and traffic reporting for small online shops",             format: "Project or monthly", status: "Available" },
        { name: "Dataset or survey analysis, written up as a plain-English report", format: "Project",           status: "Available" }
      ]
    },
    {
      group: "Writing & curriculum",
      items: [
        { name: "Editorial and SEO content writing",                       format: "Per piece or retainer", status: "Available" },
        { name: "Lesson slide and workbook redesign for online classes",  format: "Project",               status: "Available" }
      ]
    }
  ],

  /* -------------------------------------------------------------------------
     5. LATEST — "What I've been working on"
     Homepage shows the newest few; notes.html shows everything. Blog posts
     from section 6 are mixed in automatically, so don't list them twice.

     To add an entry, copy this block into the list:

        {
          date:  "2026-12-01",
          title: "Short headline",
          desc:  "One sentence on what it is and why it mattered.",
          url:   ""                    // optional link; leave "" for none
        },
  ------------------------------------------------------------------------- */
  latest: [
    {
      date:  "2026-11-09",
      title: "Portfolio rebuilt",
      desc:  "Projects, services and notes in one place, hand-built in HTML, CSS and JavaScript.",
      url:   ""
    },
    {
      date:  "2026-01",
      title: "Started on forestfloorforaging.com",
      desc:  "Took on the shop's Wix site, search setup and analytics.",
      url:   "https://forestfloorforaging.com"
    },
    {
      date:  "2025-08",
      title: "B.S. Information Science & Data Analytics",
      desc:  "Graduated cum laude from San José State University.",
      url:   ""
    }
  ],

  /* -------------------------------------------------------------------------
     6. NOTES — the blog (notes.html)

     TO PUBLISH A POST:
       Step 1. Copy notes/_TEMPLATE.html to notes/your-post-slug.html and
               write the post inside it.
       Step 2. Copy this block into the list and point `url` at that file:

        {
          date:  "2026-12-01",
          title: "Post title",
          desc:  "One-line summary shown in the list.",
          tag:   "DATA",                       // short label, shown in mono
          url:   "notes/your-post-slug.html"
        }

     The post then shows on notes.html AND in the homepage Latest feed.
     Empty for now: the page says "No posts yet" until you add one.
  ------------------------------------------------------------------------- */
  notes: []

};
