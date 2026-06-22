# Nexus CI — Competitor Intelligence & Lead Discovery Platform

A production-quality MVP that helps founders analyze competitors, discover leads, and get AI-powered business recommendations.

## Features

- **Competitor Analysis** — 7+ competitors with pricing, features, positioning charts, and feature gap analysis
- **Lead Generation** — Ranked target companies with decision-maker contacts and confidence scores
- **Recommendation Engine** — Feature roadmap, competitive advantages, opportunities, risks, and sales targets
- **Founder Dashboard** — Executive decision cards answering key strategic questions
- **Export** — PDF reports and CSV exports for leads and competitors
- **Mock Data Fallback** — Works fully without external APIs

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15+, TypeScript, Tailwind CSS, shadcn/ui-style components |
| Charts | Recharts |
| Data Fetching | TanStack React Query |
| Validation | Zod |
| Export | jsPDF, PapaParse |
| Backend | Next.js API Routes |
| Deployment | Vercel |

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd nexus-ci

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | OpenAI API key for enhanced AI analysis |
| `TAVILY_API_KEY` | No | Tavily API for web research |
| `FIRECRAWL_API_KEY` | No | Firecrawl API for web scraping |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key |

> The app works fully without any API keys using intelligent mock data generation.

## Architecture Overview

```
src/
├── app/
│   ├── api/analyze/        # POST endpoint for analysis
│   ├── dashboard/          # Dashboard page
│   ├── page.tsx            # Landing page
│   └── providers.tsx       # React Query provider
├── components/
│   ├── charts/             # Recharts visualizations
│   ├── common/             # Shared UI (badges, exports, errors)
│   ├── competitors/        # Competitor module components
│   ├── dashboard/          # Metrics & founder dashboard
│   ├── leads/              # Lead generation components
│   ├── recommendations/    # Recommendation engine UI
│   └── ui/                 # Base UI components (shadcn-style)
├── hooks/
│   ├── useAnalysis.ts      # Analysis mutation hook
│   └── useDebounce.ts      # Input debouncing
├── services/
│   ├── competitorService.ts
│   ├── leadService.ts
│   ├── recommendationService.ts
│   └── mockData.ts         # Mock data generator
├── types/
│   └── index.ts            # TypeScript interfaces
└── utils/
    ├── cache.ts            # In-memory response cache
    ├── export.ts           # CSV/PDF export
    └── validation.ts       # Zod schemas & sanitization
```

### Data Flow

1. User enters product idea on landing page
2. Dashboard page calls `POST /api/analyze` with validated input
3. API checks cache → calls OpenAI (if configured) → falls back to mock data
4. Full `AnalysisReport` returned and rendered across dashboard modules
5. User can export results as PDF or CSV

## Assumptions

1. **Mock data is realistic** — When external APIs are unavailable, the system generates contextually relevant mock data based on the product idea keywords
2. **Pricing is estimated** — Competitor pricing shown as ranges, parsed for chart visualization
3. **Lead contacts are illustrative** — Contact names and LinkedIn URLs are AI-generated placeholders, not verified real contacts
4. **Confidence scores reflect data quality** — Verified Information (80-95%), AI Inference (70-88%), Assumption (65-80%)
5. **OpenAI integration is optional** — When configured, it attempts AI analysis but still structures output consistently
6. **No persistent storage** — Analysis results are cached in-memory for 30 minutes; no database required for MVP
7. **Single-user session** — No authentication required for MVP demo

## Deployment Instructions

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables from `.env.example` (optional)
4. Deploy

```bash
# Or deploy via CLI
npm i -g vercel
vercel
```

### Environment on Vercel

- Set `OPENAI_API_KEY` in Vercel project settings if you want live AI analysis
- No environment variables required for demo mode

## API Reference

### `POST /api/analyze`

**Request:**
```json
{
  "productIdea": "AI-powered project management for remote teams",
  "websiteUrl": "https://example.com",
  "companyName": "MyStartup"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "productName": "MyStartup",
    "competitors": [...],
    "leads": [...],
    "featureRecommendations": [...],
    "founderDecisions": [...],
    "metrics": { ... }
  }
}
```

**Error Codes:**
| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Invalid input |
| `EMPTY_INPUT` | Missing product idea |
| `TIMEOUT` | Analysis exceeded 28s |
| `API_FAILURE` | Server error |

## License

MIT — Built for the Nexus Internship Assignment.
