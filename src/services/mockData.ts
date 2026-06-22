import { v4 as uuidv4 } from "uuid";
import type {
  AnalysisInput,
  AnalysisReport,
  Competitor,
  Lead,
  SourceReference,
} from "@/types";

const LOCATIONS = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "London, UK",
  "Berlin, Germany",
  "Toronto, Canada",
  "Singapore",
  "Sydney, Australia",
];

function extractProductName(input: AnalysisInput): string {
  if (input.companyName) return input.companyName;
  const idea = input.productIdea;
  const words = idea.split(/\s+/).slice(0, 3);
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function inferCategory(idea: string): string {
  const lower = idea.toLowerCase();
  if (lower.includes("ai") || lower.includes("machine learning")) return "AI/ML";
  if (lower.includes("crm") || lower.includes("sales")) return "Sales & CRM";
  if (lower.includes("analytics") || lower.includes("data")) return "Analytics";
  if (lower.includes("project") || lower.includes("task")) return "Productivity";
  if (lower.includes("marketing")) return "Marketing";
  if (lower.includes("hr") || lower.includes("hiring")) return "HR Tech";
  return "SaaS";
}

function generateSources(productName: string): SourceReference[] {
  const now = new Date().toISOString();
  return [
    {
      id: uuidv4(),
      title: `${productName} Market Analysis - G2`,
      url: "https://www.g2.com/categories",
      accessedAt: now,
    },
    {
      id: uuidv4(),
      title: "Crunchbase Company Profiles",
      url: "https://www.crunchbase.com",
      accessedAt: now,
    },
    {
      id: uuidv4(),
      title: "Product Hunt Trending Products",
      url: "https://www.producthunt.com",
      accessedAt: now,
    },
    {
      id: uuidv4(),
      title: "CB Insights Market Map",
      url: "https://www.cbinsights.com/research",
      accessedAt: now,
    },
    {
      id: uuidv4(),
      title: "LinkedIn Industry Insights",
      url: "https://www.linkedin.com/pulse",
      accessedAt: now,
    },
  ];
}

function generateCompetitors(
  productName: string,
  category: string,
  sources: SourceReference[]
): Competitor[] {
  const templates: Omit<Competitor, "id" | "sourceIds">[] = [
    {
      name: "Salesforce",
      website: "https://www.salesforce.com",
      description: `Enterprise CRM leader with extensive ecosystem for ${category} workflows.`,
      pricing: "$25–$300/user/mo",
      targetAudience: "Enterprise & Mid-Market",
      features: ["CRM", "Automation", "Analytics", "AI Assistant", "Integrations"],
      strengths: ["Market leader", "Extensive integrations", "Strong brand"],
      weaknesses: ["Complex setup", "High cost", "Steep learning curve"],
      valueProposition: "Complete customer platform for enterprises",
      positioning: { easeOfUse: 45, featureRichness: 95 },
      marketCategory: "market_leader",
      confidenceScore: 88,
      type: "Verified Information",
    },
    {
      name: "HubSpot",
      website: "https://www.hubspot.com",
      description: `Inbound marketing and sales platform competing in the ${category} space.`,
      pricing: "Free–$3,600/mo",
      targetAudience: "SMB to Mid-Market",
      features: ["CRM", "Marketing Hub", "Sales Hub", "Content Tools", "Reporting"],
      strengths: ["Easy onboarding", "Free tier", "Strong content marketing"],
      weaknesses: ["Costs scale quickly", "Limited enterprise features"],
      valueProposition: "Grow better with inbound methodology",
      positioning: { easeOfUse: 80, featureRichness: 70 },
      marketCategory: "market_leader",
      confidenceScore: 85,
      type: "Verified Information",
    },
    {
      name: "Notion",
      website: "https://www.notion.so",
      description: `Flexible workspace tool with growing ${category} capabilities.`,
      pricing: "Free–$15/user/mo",
      targetAudience: "Startups & Teams",
      features: ["Docs", "Databases", "Templates", "Collaboration", "API"],
      strengths: ["Highly flexible", "Great UX", "Strong community"],
      weaknesses: ["Not purpose-built", "Performance at scale"],
      valueProposition: "All-in-one workspace for teams",
      positioning: { easeOfUse: 90, featureRichness: 65 },
      marketCategory: "emerging",
      confidenceScore: 82,
      type: "AI Inference",
    },
    {
      name: "Monday.com",
      website: "https://monday.com",
      description: `Work OS platform with visual project management for ${category} teams.`,
      pricing: "$9–$19/user/mo",
      targetAudience: "SMB & Mid-Market",
      features: ["Project Boards", "Automations", "Dashboards", "Integrations", "Time Tracking"],
      strengths: ["Visual interface", "Quick setup", "Customizable workflows"],
      weaknesses: ["Can get expensive", "Limited advanced analytics"],
      valueProposition: "Make work work for your team",
      positioning: { easeOfUse: 85, featureRichness: 72 },
      marketCategory: "emerging",
      confidenceScore: 80,
      type: "AI Inference",
    },
    {
      name: "Zoho CRM",
      website: "https://www.zoho.com/crm",
      description: `Affordable CRM solution targeting budget-conscious ${category} buyers.`,
      pricing: "Free–$52/user/mo",
      targetAudience: "SMB & Budget Buyers",
      features: ["CRM", "Email", "Social", "AI", "Workflow Rules"],
      strengths: ["Competitive pricing", "Feature-rich free tier", "Zoho ecosystem"],
      weaknesses: ["Dated UI", "Complex product suite"],
      valueProposition: "CRM that grows with your business",
      positioning: { easeOfUse: 60, featureRichness: 75 },
      marketCategory: "budget",
      confidenceScore: 78,
      type: "AI Inference",
    },
    {
      name: "Microsoft Dynamics 365",
      website: "https://dynamics.microsoft.com",
      description: `Enterprise-grade business applications integrated with Microsoft ecosystem.`,
      pricing: "$65–$210/user/mo",
      targetAudience: "Enterprise",
      features: ["CRM", "ERP", "Power Platform", "AI Copilot", "Azure Integration"],
      strengths: ["Microsoft integration", "Enterprise security", "AI capabilities"],
      weaknesses: ["Complex implementation", "Requires Microsoft ecosystem"],
      valueProposition: "Intelligent business applications",
      positioning: { easeOfUse: 40, featureRichness: 92 },
      marketCategory: "enterprise",
      confidenceScore: 86,
      type: "Verified Information",
    },
    {
      name: "Airtable",
      website: "https://www.airtable.com",
      description: `Spreadsheet-database hybrid popular among ${category} startups.`,
      pricing: "Free–$45/user/mo",
      targetAudience: "Startups & Creators",
      features: ["Databases", "Views", "Automations", "Interfaces", "Extensions"],
      strengths: ["Intuitive interface", "Flexible data model", "Strong templates"],
      weaknesses: ["Not enterprise-ready", "Limited reporting"],
      valueProposition: "Build apps that fit your workflow",
      positioning: { easeOfUse: 88, featureRichness: 68 },
      marketCategory: "emerging",
      confidenceScore: 79,
      type: "AI Inference",
    },
  ];

  return templates.slice(0, 7).map((t) => ({
    ...t,
    id: uuidv4(),
    sourceIds: [sources[0].id, sources[1].id],
    description: t.description.replace("category", category),
  }));
}

function generateLeads(productName: string, category: string): Lead[] {
  const companies = [
    { name: "Stripe", domain: "stripe.com", industry: "FinTech", size: "5,000+" },
    { name: "Figma", domain: "figma.com", industry: "Design Tools", size: "1,000-5,000" },
    { name: "Canva", domain: "canva.com", industry: "Design SaaS", size: "3,000+" },
    { name: "Notion Labs", domain: "notion.so", industry: "Productivity", size: "500-1,000" },
    { name: "Linear", domain: "linear.app", industry: "Dev Tools", size: "50-200" },
    { name: "Vercel", domain: "vercel.com", industry: "Developer Platform", size: "200-500" },
    { name: "Ramp", domain: "ramp.com", industry: "FinTech", size: "500-1,000" },
    { name: "Deel", domain: "deel.com", industry: "HR Tech", size: "1,000-5,000" },
    { name: "Brex", domain: "brex.com", industry: "FinTech", size: "1,000-5,000" },
    { name: "Airtable", domain: "airtable.com", industry: "SaaS", size: "500-1,000" },
    { name: "Loom", domain: "loom.com", industry: "Video SaaS", size: "200-500" },
    { name: "Miro", domain: "miro.com", industry: "Collaboration", size: "1,000-5,000" },
  ];

  const contacts = [
    { name: "Sarah Chen", title: "VP of Product" },
    { name: "Michael Torres", title: "Head of Operations" },
    { name: "Emily Watson", title: "Director of Engineering" },
    { name: "James Park", title: "Chief Revenue Officer" },
    { name: "Lisa Anderson", title: "VP of Sales" },
    { name: "David Kim", title: "Head of Growth" },
    { name: "Rachel Green", title: "CTO" },
    { name: "Tom Bradley", title: "VP of Marketing" },
    { name: "Anna Patel", title: "Director of Business Development" },
    { name: "Chris Morgan", title: "Head of Partnerships" },
    { name: "Jessica Lee", title: "COO" },
    { name: "Ryan O'Brien", title: "VP of Customer Success" },
  ];

  return companies.map((company, i) => {
    const contact = contacts[i];
    const confidence = 65 + Math.floor(Math.random() * 25);
    const valueScore = 70 + Math.floor(Math.random() * 28);
    return {
      id: uuidv4(),
      companyName: company.name,
      website: `https://www.${company.domain}`,
      industry: company.industry || category,
      employeeSize: company.size,
      location: LOCATIONS[i % LOCATIONS.length],
      contactPerson: contact.name,
      jobTitle: contact.title,
      linkedIn: `https://www.linkedin.com/in/${contact.name.toLowerCase().replace(" ", "-")}`,
      confidenceScore: confidence,
      type: confidence > 80 ? "Verified Information" : "AI Inference",
      valueScore,
    } as Lead;
  });
}

export function generateMockAnalysis(input: AnalysisInput): AnalysisReport {
  const productName = extractProductName(input);
  const category = inferCategory(input.productIdea);
  const sources = generateSources(productName);
  const competitors = generateCompetitors(productName, category, sources);
  const leads = generateLeads(productName, category);

  const productFeatures = [
    "User Dashboard",
    "Analytics & Reporting",
    "Team Collaboration",
    "API Integrations",
    "Automation Workflows",
    "Mobile App",
    "AI-Powered Insights",
    "Custom Branding",
  ];

  const allCompetitorFeatures = new Set(competitors.flatMap((c) => c.features));
  const featureGaps = Array.from(allCompetitorFeatures)
    .filter((f) => !productFeatures.some((pf) => pf.toLowerCase().includes(f.toLowerCase().split(" ")[0])))
    .slice(0, 6)
    .map((feature) => ({
      id: uuidv4(),
      feature,
      competitorsWithFeature: competitors
        .filter((c) => c.features.includes(feature))
        .map((c) => c.name),
      adoptionRate: 40 + Math.floor(Math.random() * 50),
      confidenceScore: 72 + Math.floor(Math.random() * 18),
      type: "AI Inference" as const,
    }));

  const topThreat = competitors.find((c) => c.marketCategory === "market_leader") ?? competitors[0];
  const topLeads = [...leads].sort((a, b) => b.valueScore - a.valueScore).slice(0, 5);

  return {
    id: uuidv4(),
    generatedAt: new Date().toISOString(),
    input,
    productName,
    productFeatures,
    metrics: {
      competitorsFound: competitors.length,
      opportunitiesFound: 5,
      recommendedFeatures: 5,
      highValueLeads: leads.filter((l) => l.valueScore >= 85).length,
    },
    competitors,
    leads,
    featureRecommendations: [
      {
        id: uuidv4(),
        feature: "AI-Powered Competitive Monitoring",
        reason: `3 of ${competitors.length} competitors offer AI features. Adding real-time competitive intelligence would differentiate ${productName}.`,
        impact: "High",
        priority: "Critical",
        confidenceScore: 87,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        feature: "One-Click Integrations Hub",
        reason: "Integration ecosystem is a top buying criterion. HubSpot and Salesforce lead with 1000+ integrations.",
        impact: "High",
        priority: "High",
        confidenceScore: 84,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        feature: "Self-Serve Onboarding Wizard",
        reason: "Ease of use is the #1 factor for SMB buyers. Competitors with strong onboarding have 2x conversion rates.",
        impact: "High",
        priority: "High",
        confidenceScore: 81,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        feature: "Advanced Analytics Dashboard",
        reason: "Data-driven decision making is increasingly expected. 78% of buyers prioritize analytics capabilities.",
        impact: "Medium",
        priority: "Medium",
        confidenceScore: 79,
        type: "Assumption",
      },
      {
        id: uuidv4(),
        feature: "White-Label / Multi-Tenant Support",
        reason: "Enterprise and agency buyers require white-labeling. Opens up a higher-ACV segment.",
        impact: "Medium",
        priority: "Medium",
        confidenceScore: 76,
        type: "Assumption",
      },
    ],
    competitiveAdvantages: [
      {
        id: uuidv4(),
        advantage: "Niche Focus",
        description: `Specialized ${category} positioning vs. generalist competitors like Salesforce.`,
        confidenceScore: 83,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        advantage: "Speed to Value",
        description: "Faster time-to-insight compared to enterprise solutions requiring months of implementation.",
        confidenceScore: 80,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        advantage: "Modern UX",
        description: "Clean, intuitive interface targeting users frustrated with legacy competitor UIs.",
        confidenceScore: 78,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        advantage: "Transparent Pricing",
        description: "Simple, predictable pricing vs. competitors with complex tier structures.",
        confidenceScore: 75,
        type: "Assumption",
      },
      {
        id: uuidv4(),
        advantage: "AI-Native Architecture",
        description: "Built with AI at the core rather than bolted-on AI features.",
        confidenceScore: 82,
        type: "AI Inference",
      },
    ],
    marketOpportunities: [
      {
        id: uuidv4(),
        opportunity: "SMB Market Underserved",
        description: "Enterprise tools are too complex and expensive for 30M+ SMBs globally.",
        confidenceScore: 85,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        opportunity: "Remote Work Acceleration",
        description: "Distributed teams need cloud-native collaboration tools more than ever.",
        confidenceScore: 82,
        type: "Verified Information",
      },
      {
        id: uuidv4(),
        opportunity: "AI Adoption Wave",
        description: "Companies actively seeking AI-powered tools to improve productivity.",
        confidenceScore: 88,
        type: "Verified Information",
      },
      {
        id: uuidv4(),
        opportunity: "Vertical SaaS Expansion",
        description: `Industry-specific ${category} solutions command 2-3x higher willingness to pay.`,
        confidenceScore: 79,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        opportunity: "International Markets",
        description: "Emerging markets in APAC and LATAM show 25%+ YoY SaaS growth.",
        confidenceScore: 76,
        type: "Assumption",
      },
    ],
    marketRisks: [
      {
        id: uuidv4(),
        risk: "Incumbent Competition",
        description: `${topThreat.name} could add similar features and leverage existing customer base.`,
        severity: "High",
        confidenceScore: 86,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        risk: "Market Saturation",
        description: `The ${category} market has 50+ established players competing for attention.`,
        severity: "Medium",
        confidenceScore: 80,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        risk: "Customer Acquisition Cost",
        description: "Rising CAC in SaaS may make unit economics challenging without strong differentiation.",
        severity: "High",
        confidenceScore: 78,
        type: "Assumption",
      },
      {
        id: uuidv4(),
        risk: "Data Privacy Regulations",
        description: "GDPR, CCPA, and emerging regulations increase compliance burden.",
        severity: "Medium",
        confidenceScore: 82,
        type: "Verified Information",
      },
      {
        id: uuidv4(),
        risk: "Economic Downturn",
        description: "Budget cuts during downturns disproportionately affect new vendor adoption.",
        severity: "Medium",
        confidenceScore: 74,
        type: "Assumption",
      },
    ],
    salesRecommendations: topLeads.map((lead) => ({
      id: uuidv4(),
      companyName: lead.companyName,
      contactPerson: lead.contactPerson,
      jobTitle: lead.jobTitle,
      reason: `${lead.companyName} in ${lead.industry} (${lead.employeeSize} employees) shows high fit based on industry alignment and growth stage.`,
      confidenceScore: lead.confidenceScore,
      type: lead.type,
    })),
    decisionMakers: topLeads.slice(0, 5).map((lead) => ({
      id: uuidv4(),
      companyName: lead.companyName,
      contactPerson: lead.contactPerson,
      jobTitle: lead.jobTitle,
      reason: `${lead.contactPerson} (${lead.jobTitle}) is the primary decision maker for tools in this category at ${lead.companyName}.`,
      confidenceScore: lead.confidenceScore,
      type: "AI Inference" as const,
    })),
    featureGaps,
    marketLandscape: {
      marketLeaders: competitors.filter((c) => c.marketCategory === "market_leader").map((c) => c.name),
      emergingPlayers: competitors.filter((c) => c.marketCategory === "emerging").map((c) => c.name),
      budgetPlayers: competitors.filter((c) => c.marketCategory === "budget").map((c) => c.name),
      enterprisePlayers: competitors.filter((c) => c.marketCategory === "enterprise").map((c) => c.name),
    },
    founderDecisions: [
      {
        id: uuidv4(),
        question: "What should I build next?",
        answer: `Prioritize "AI-Powered Competitive Monitoring" — it's the highest-impact feature gap with strong market demand in ${category}.`,
        actionItems: [
          "Prototype AI monitoring MVP in 2 weeks",
          "Validate with 5 target customers",
          "Benchmark against top 3 competitors",
        ],
        confidenceScore: 87,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        question: "Biggest competitor threat?",
        answer: `${topThreat.name} poses the greatest threat due to market dominance, extensive integrations, and brand recognition in ${category}.`,
        actionItems: [
          `Monitor ${topThreat.name} product releases monthly`,
          "Differentiate on speed and simplicity",
          "Target segments they underserve",
        ],
        confidenceScore: 86,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        question: "Best opportunity?",
        answer: "SMB market is underserved — enterprise tools are too complex. Position as the simple, affordable alternative.",
        actionItems: [
          "Create SMB-focused landing page",
          "Offer free tier with clear upgrade path",
          "Build case studies with early SMB customers",
        ],
        confidenceScore: 85,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        question: "Best leads?",
        answer: `Top targets: ${topLeads.slice(0, 3).map((l) => l.companyName).join(", ")}. These companies are in growth stage with high tool adoption rates.`,
        actionItems: [
          `Reach out to ${topLeads[0].contactPerson} at ${topLeads[0].companyName}`,
          "Prepare personalized demo for each top 5 lead",
          "Connect on LinkedIn before cold outreach",
        ],
        confidenceScore: 82,
        type: "AI Inference",
      },
      {
        id: uuidv4(),
        question: "What should I do today?",
        answer: "Focus on customer discovery: schedule 3 calls with potential buyers from your top leads list and validate your top feature hypothesis.",
        actionItems: [
          "Send 5 personalized outreach emails",
          "Set up competitor monitoring alerts",
          "Draft landing page copy highlighting key differentiators",
        ],
        confidenceScore: 80,
        type: "AI Inference",
      },
    ],
    sources,
    usedMockData: true,
  };
}
