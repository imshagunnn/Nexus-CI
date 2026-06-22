# Nexus CI — Competitor Intelligence & Lead Discovery Platform

Nexus CI is an AI-powered business intelligence platform designed to help founders, startups, and product teams understand their competitive landscape, identify market opportunities, discover potential customers, and make data-driven product decisions.

## Features

### Competitor Analysis

* Identify and analyze relevant competitors
* Compare product offerings, features, pricing, and positioning
* Visualize competitor strengths and weaknesses
* Perform feature gap and market landscape analysis

### Lead Generation

* Discover potential customer companies
* Identify relevant decision-makers
* Prioritize leads using confidence-based scoring

### Recommendation Engine

* Feature prioritization recommendations
* Competitive advantage analysis
* Market opportunity identification
* Risk assessment and sales recommendations

### Founder Dashboard

* Executive-level insights and recommendations
* Competitive threat analysis
* High-priority leads and opportunities
* Action-oriented decision support

### Export Functionality

* Export competitor analysis reports
* Export lead data as CSV
* Generate shareable reports

## Technology Stack

* **Frontend:** Next.js, TypeScript, Tailwind CSS
* **UI Components:** shadcn/ui-inspired components
* **Charts & Visualizations:** Recharts
* **Data Fetching:** TanStack React Query
* **Validation:** Zod
* **Export Tools:** jsPDF, PapaParse
* **Backend:** Next.js API Routes
* **Deployment:** Vercel

## Getting Started

### Installation

```bash
git clone <repository-url>
cd nexus-ci
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production Build

```bash
npm run build
npm start
```

## Environment Variables

The application supports optional third-party integrations:

* OPENAI_API_KEY
* TAVILY_API_KEY
* FIRECRAWL_API_KEY
* NEXT_PUBLIC_SUPABASE_URL
* NEXT_PUBLIC_SUPABASE_ANON_KEY

The platform includes intelligent mock data generation and can function without external API keys.

## Architecture

The application follows a modular architecture with dedicated layers for:

* Competitor Analysis
* Lead Generation
* Recommendation Engine
* Dashboard & Visualization
* Export Services
* Validation & Caching

## Assumptions

* Competitor insights may contain AI-generated inferences when public information is unavailable.
* Lead information is intended for demonstration purposes and may not represent verified contact data.
* Confidence scores indicate the estimated reliability of generated insights.
* The MVP uses in-memory caching and does not require a database.

## Live Demo

**Application:** https://nexus-ci-u5x9.vercel.app/

## GitHub Repository

**Repository:** https://github.com/imshagunnn/Nexus-CI

## Future Enhancements

* Real-time competitor monitoring
* CRM integrations
* Advanced lead enrichment
* Historical market tracking
* Team collaboration features

---

Developed as part of the Nexus Internship Assignment.
