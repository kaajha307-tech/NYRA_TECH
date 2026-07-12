export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  gradient: string;
  capabilities: string[];
  workflow: { step: string; detail: string }[];
  caseStudies: {
    client: string;
    challenge: string;
    solution: string;
    impact: string;
    before: string;
    after: string;
  }[];
  gallery: { title: string; description: string }[];
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    tagline: "High-performance web experiences",
    description:
      "Lightning-fast, SEO-optimized web platforms engineered with modern frameworks and cinematic interactions.",
    icon: "Globe",
    gradient: "from-cyan-400 to-blue-600",
    capabilities: ["Next.js & React", "Headless CMS", "Edge rendering", "Core Web Vitals 95+"],
    workflow: [
      { step: "Discovery", detail: "Strategy, audience and KPI mapping." },
      { step: "Design", detail: "Wireframes, prototypes, design system." },
      { step: "Build", detail: "Componentized, accessible, performant code." },
      { step: "Launch", detail: "CI/CD, observability, post-launch optimization." },
    ],
    caseStudies: [
      {
        client: "Helix Capital",
        challenge: "Legacy site loaded in 7.2s and bounced 68% of visitors.",
        solution: "Edge-rendered Next.js stack with progressive media and predictive prefetch.",
        impact: "+212% qualified leads · LCP 0.9s · 47% lower bounce.",
        before: "Slow, fragmented marketing site",
        after: "Sub-second, conversion-tuned platform",
      },
    ],
    gallery: [
      { title: "Enterprise Marketing Site", description: "Edge-rendered, 100/100 Lighthouse." },
      { title: "Investor Portal", description: "Secure, real-time data dashboards." },
      { title: "Product Microsite", description: "Cinematic scroll storytelling." },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Native-grade iOS & Android",
    description: "Cross-platform apps that feel native, ship faster and scale globally.",
    icon: "Smartphone",
    gradient: "from-violet-500 to-fuchsia-500",
    capabilities: ["React Native", "Swift / Kotlin", "Offline-first", "Push + Realtime"],
    workflow: [
      { step: "Product strategy", detail: "Define jobs-to-be-done." },
      { step: "Design sprints", detail: "Prototype motion + UX." },
      { step: "Engineering", detail: "Modular architecture." },
      { step: "Distribution", detail: "Store ops, analytics, A/B." },
    ],
    caseStudies: [
      {
        client: "Vega Health",
        challenge: "Patient adherence under 30% with paper workflows.",
        solution: "Cross-platform companion app with biometric sign-in and AI nudges.",
        impact: "78% adherence · 4.9★ rating · 220k installs in 90 days.",
        before: "Manual reminders, low compliance",
        after: "AI-driven engagement, retention up 2.6x",
      },
    ],
    gallery: [
      { title: "Fintech Companion", description: "Realtime trading on the go." },
      { title: "Logistics OS", description: "Offline-first field operations." },
      { title: "Consumer Loyalty", description: "Gamified rewards experience." },
    ],
  },
  {
    slug: "erp-solutions",
    title: "ERP Solutions",
    tagline: "Unified business operating system",
    description: "Connect HR, finance, inventory, sales and projects into a single source of truth.",
    icon: "Network",
    gradient: "from-blue-500 to-cyan-400",
    capabilities: ["Workflow automation", "Custom modules", "Realtime BI", "API gateway"],
    workflow: [
      { step: "Audit", detail: "Process mapping across departments." },
      { step: "Configure", detail: "Modules, roles, automations." },
      { step: "Migrate", detail: "Data, integrations, parallel run." },
      { step: "Optimize", detail: "Continuous improvement loop." },
    ],
    caseStudies: [
      {
        client: "Northwind Manufacturing",
        challenge: "12 disconnected systems, 9-day month-end close.",
        solution: "Unified ERP with realtime cost rollups and procurement automation.",
        impact: "Close in 36 hours · 18% margin lift · 31% fewer stockouts.",
        before: "Spreadsheet sprawl, blind decisions",
        after: "Live ops command center",
      },
    ],
    gallery: [
      { title: "Finance Suite", description: "Realtime consolidation." },
      { title: "Inventory Mesh", description: "Multi-warehouse intelligence." },
      { title: "HR Operating System", description: "Lifecycle automation." },
    ],
  },
  {
    slug: "crm-solutions",
    title: "CRM Solutions",
    tagline: "Pipeline intelligence",
    description: "AI-augmented CRM that surfaces the next best action for every customer.",
    icon: "Users",
    gradient: "from-pink-500 to-violet-500",
    capabilities: ["Lead scoring", "Conversation AI", "Revenue forecasting", "Omnichannel"],
    workflow: [
      { step: "Map", detail: "Customer journey blueprint." },
      { step: "Model", detail: "Scoring + segmentation." },
      { step: "Activate", detail: "Automations across channels." },
      { step: "Iterate", detail: "Learn, refine, scale." },
    ],
    caseStudies: [
      {
        client: "Orbit SaaS",
        challenge: "23-day sales cycle, 6% conversion.",
        solution: "AI lead scoring + sequenced playbooks across sales and marketing.",
        impact: "12-day cycle · 17% conversion · $4.8M added ARR.",
        before: "Reactive selling, leaky funnel",
        after: "Predictive revenue engine",
      },
    ],
    gallery: [
      { title: "Revenue Cockpit", description: "Forecast confidence intervals." },
      { title: "Inbox AI", description: "Drafts that convert." },
      { title: "Health Scoring", description: "Churn before it happens." },
    ],
  },
  {
    slug: "ai-llm-development",
    title: "AI & LLM Development",
    tagline: "Custom intelligence, fine-tuned",
    description: "Production-grade LLM agents, RAG systems and copilots tailored to your data.",
    icon: "Sparkles",
    gradient: "from-cyan-400 to-violet-500",
    capabilities: ["Custom models", "RAG pipelines", "Agentic workflows", "Eval & guardrails"],
    workflow: [
      { step: "Use case", detail: "Identify high-leverage workflows." },
      { step: "Data", detail: "Ingest, embed, evaluate." },
      { step: "Agent", detail: "Tools, memory, orchestration." },
      { step: "Ship", detail: "Observability + safety rails." },
    ],
    caseStudies: [
      {
        client: "Atlas Legal",
        challenge: "Associates spent 11 hrs/week on contract review.",
        solution: "Domain-tuned RAG copilot trained on 1.4M precedents.",
        impact: "84% faster review · $2.1M annual savings · 99.2% citation accuracy.",
        before: "Manual clause hunting",
        after: "Instant precedent synthesis",
      },
    ],
    gallery: [
      { title: "Domain Copilot", description: "Embedded in your stack." },
      { title: "Voice Agents", description: "Realtime, low latency." },
      { title: "Eval Harness", description: "Ship safely at scale." },
    ],
  },
  {
    slug: "plm-solutions",
    title: "PLM Solutions",
    tagline: "Product lifecycle, accelerated",
    description: "Engineering BOMs, change management and supplier collaboration in one cockpit.",
    icon: "Layers",
    gradient: "from-emerald-400 to-cyan-500",
    capabilities: ["BOM control", "ECO workflow", "CAD integration", "Supplier portal"],
    workflow: [
      { step: "Capture", detail: "Designs + revisions." },
      { step: "Govern", detail: "Approvals + compliance." },
      { step: "Collaborate", detail: "Suppliers + manufacturing." },
      { step: "Analyze", detail: "Cost + sustainability." },
    ],
    caseStudies: [
      {
        client: "Skyline Hardware",
        challenge: "Engineering changes took 14 days, 6% rework rate.",
        solution: "Automated ECO routing with CAD-aware diffs and supplier sync.",
        impact: "2.1 day cycle · 1.4% rework · 19% cost-of-goods reduction.",
        before: "Email-driven revisions",
        after: "Single source of engineering truth",
      },
    ],
    gallery: [
      { title: "BOM Explorer", description: "Where-used in milliseconds." },
      { title: "Change Cockpit", description: "Approve with full context." },
      { title: "Supplier Hub", description: "Realtime collaboration." },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Performance + brand, in concert",
    description: "Full-funnel growth engineering powered by creative, data and automation.",
    icon: "TrendingUp",
    gradient: "from-orange-400 to-pink-500",
    capabilities: ["Paid acquisition", "SEO & content", "Lifecycle", "Attribution"],
    workflow: [
      { step: "Insight", detail: "Audience + competitor research." },
      { step: "Creative", detail: "Story, system, assets." },
      { step: "Launch", detail: "Channel orchestration." },
      { step: "Compound", detail: "Test, learn, scale." },
    ],
    caseStudies: [
      {
        client: "Lumen DTC",
        challenge: "CAC plateaued at $74, ROAS 1.2.",
        solution: "Creative testing engine + server-side attribution + lifecycle journeys.",
        impact: "CAC $31 · ROAS 4.6 · 9.8x revenue in 11 months.",
        before: "Vanity metrics, opaque ROI",
        after: "Compounding growth flywheel",
      },
    ],
    gallery: [
      { title: "Creative Lab", description: "30+ variants weekly." },
      { title: "Attribution Mesh", description: "Truth across channels." },
      { title: "Lifecycle Journeys", description: "Revenue on autopilot." },
    ],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    tagline: "Resilient, scalable, secure",
    description: "Cloud architecture, migrations and SRE practices that deliver 99.99% uptime.",
    icon: "Cloud",
    gradient: "from-sky-400 to-indigo-500",
    capabilities: ["Multi-cloud", "Kubernetes", "Zero-trust", "FinOps"],
    workflow: [
      { step: "Assess", detail: "Workload + risk inventory." },
      { step: "Architect", detail: "Reference architectures." },
      { step: "Migrate", detail: "Zero-downtime cutovers." },
      { step: "Operate", detail: "SRE + cost governance." },
    ],
    caseStudies: [
      {
        client: "Quantum Logistics",
        challenge: "On-prem outages cost $48k/hour.",
        solution: "Multi-region Kubernetes with chaos-tested failover and FinOps.",
        impact: "99.997% uptime · 38% lower spend · zero incident SLA breaches.",
        before: "Brittle, expensive infrastructure",
        after: "Self-healing, cost-aware platform",
      },
    ],
    gallery: [
      { title: "Landing Zone", description: "Secure-by-default foundation." },
      { title: "Observability Mesh", description: "Trace every request." },
      { title: "FinOps Dashboard", description: "Spend you can predict." },
    ],
  },
  {
    slug: "2d-design",
    title: "2D Design Services",
    tagline: "Visual systems with intent",
    description: "Illustration, iconography and editorial design that elevates every touchpoint.",
    icon: "Palette",
    gradient: "from-rose-400 to-amber-400",
    capabilities: ["Illustration", "Iconography", "Editorial", "Packaging"],
    workflow: [
      { step: "Brief", detail: "Voice + audience." },
      { step: "Concept", detail: "Mood + direction." },
      { step: "Craft", detail: "Pixel-perfect execution." },
      { step: "Deliver", detail: "Production-ready files." },
    ],
    caseStudies: [
      {
        client: "Folklore Press",
        challenge: "Book sales stagnant; covers felt generic.",
        solution: "Bespoke illustration system across 14-book catalog.",
        impact: "+63% sell-through · 3 design awards · 2 NYT bestsellers.",
        before: "Stock imagery, low recall",
        after: "Distinctive, ownable visual language",
      },
    ],
    gallery: [
      { title: "Editorial Series", description: "Award-winning covers." },
      { title: "Iconography", description: "Cohesive 240-icon set." },
      { title: "Packaging", description: "Shelf-ready brand identity." },
    ],
  },
  {
    slug: "3d-design",
    title: "3D Design & Visualization",
    tagline: "Photoreal worlds, on demand",
    description: "Product, architectural and conceptual 3D that sells before it ships.",
    icon: "Box",
    gradient: "from-cyan-400 to-emerald-400",
    capabilities: ["Product viz", "ArchViz", "Concept art", "Realtime configurators"],
    workflow: [
      { step: "Reference", detail: "Materials + lighting study." },
      { step: "Model", detail: "Topology + UV." },
      { step: "Shade", detail: "PBR materials." },
      { step: "Render", detail: "Stills + turntables." },
    ],
    caseStudies: [
      {
        client: "Aurora Furniture",
        challenge: "Photo shoots cost $180k/season, slow to iterate.",
        solution: "Realtime configurator with photoreal PBR shaders.",
        impact: "$140k saved/season · +44% AOV · 11x faster catalog updates.",
        before: "Static photography",
        after: "Interactive, infinite variants",
      },
    ],
    gallery: [
      { title: "Product Configurator", description: "Materialize any SKU." },
      { title: "ArchViz Suite", description: "Walk through unbuilt spaces." },
      { title: "Concept Worlds", description: "Pitch cinematic IP." },
    ],
  },
  {
    slug: "vfx",
    title: "VFX Solutions",
    tagline: "Cinematic visual effects",
    description: "From compositing to CG, we craft VFX that elevates films, ads and experiences.",
    icon: "Wand2",
    gradient: "from-fuchsia-500 to-cyan-400",
    capabilities: ["Compositing", "CG integration", "Simulations", "Color science"],
    workflow: [
      { step: "Previz", detail: "Storyboards + animatics." },
      { step: "Capture", detail: "On-set supervision." },
      { step: "Build", detail: "CG, sim, comp." },
      { step: "Finish", detail: "Color + DI." },
    ],
    caseStudies: [
      {
        client: "Halcyon Studios",
        challenge: "Need 240 VFX shots for streaming series in 9 weeks.",
        solution: "Distributed pipeline with realtime previz and AI roto.",
        impact: "Delivered on time · 38% under budget · 2 Emmy nominations.",
        before: "Manual roto, missed deadlines",
        after: "AI-accelerated VFX pipeline",
      },
    ],
    gallery: [
      { title: "Series Reel", description: "240 shots, 9 weeks." },
      { title: "Brand Spot", description: "CG hero, photoreal sim." },
      { title: "Concept Showreel", description: "Pitch-winning previz." },
    ],
  },
  {
    slug: "digital-art",
    title: "Digital Art & Creative Design",
    tagline: "Original creative direction",
    description: "Concept art, character design and matte paintings for games, film and brands.",
    icon: "Brush",
    gradient: "from-violet-500 to-pink-400",
    capabilities: ["Concept art", "Character design", "Matte painting", "Style frames"],
    workflow: [
      { step: "Discover", detail: "World + tone." },
      { step: "Explore", detail: "Thumbnails + tests." },
      { step: "Refine", detail: "Final illustrations." },
      { step: "Adapt", detail: "Cross-media systems." },
    ],
    caseStudies: [
      {
        client: "Nova Game Studio",
        challenge: "Needed 80 unique characters in 6 weeks.",
        solution: "Style-locked AI-assisted ideation + human master finals.",
        impact: "Shipped on time · publisher signed · 1.2M wishlists.",
        before: "Bottlenecked art direction",
        after: "Studio-grade output at indie speed",
      },
    ],
    gallery: [
      { title: "Character Sheets", description: "80 hero designs." },
      { title: "Environment Concepts", description: "Cinematic worlds." },
      { title: "Style Frames", description: "Tone-perfect mood." },
    ],
  },
  {
    slug: "branding",
    title: "Branding & Creative Media",
    tagline: "Identity systems that scale",
    description: "Naming, identity, motion and content systems that turn brands into ecosystems.",
    icon: "Sparkle",
    gradient: "from-amber-400 to-rose-500",
    capabilities: ["Strategy", "Identity", "Motion", "Content systems"],
    workflow: [
      { step: "Strategy", detail: "Positioning + voice." },
      { step: "Identity", detail: "Logo, type, color." },
      { step: "Motion", detail: "Brand in motion." },
      { step: "Roll-out", detail: "Guidelines + ops." },
    ],
    caseStudies: [
      {
        client: "Pulse Health",
        challenge: "Acquired 4 companies, 4 disjointed brands.",
        solution: "Unified master brand with modular sub-brand system.",
        impact: "+58% unaided recall · 2.1x media efficiency · culture aligned.",
        before: "Fragmented brand architecture",
        after: "One coherent, ownable identity",
      },
    ],
    gallery: [
      { title: "Identity System", description: "Modular & scalable." },
      { title: "Motion Toolkit", description: "Brand alive on screen." },
      { title: "Content OS", description: "Templates teams love." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
