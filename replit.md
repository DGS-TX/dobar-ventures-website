# Dobar Ventures LLC Website

## Overview
A clean, professional website for Dobar Ventures LLC - a holding company and venture studio focused on healthcare-adjacent technology, operational tools, and small businesses.

## Project Architecture

### Technology Stack
- **Frontend**: Static HTML, CSS, JavaScript
- **Backend**: Node.js with Express
- **AI Integration**: OpenAI via Replit AI Integrations (for content generation)

### File Structure
```
├── index.html      # Main website page
├── style.css       # Brand-compliant styling
├── script.js       # Frontend JavaScript for AI content regeneration
├── server.js       # Express server with AI content generation endpoints
└── replit.md       # Project documentation
```

### Key Features
1. **Static Content**: Pre-populated with Dobar Ventures brand content
2. **AI Content Regeneration**: Each section has a regenerate button that uses OpenAI to generate fresh, brand-aligned content
3. **Responsive Design**: Mobile-friendly layout
4. **Brand Compliance**: Colors, fonts, and tone match the brand guidelines

## Brand Guidelines

### Colors
- Primary (Deep Slate Blue): `#1F2A37`
- Secondary (Warm Off-White): `#F8FAFC`
- Accent (Muted Olive Green): `#6B7F5A`
- Neutral (Soft Gray): `#9CA3AF`

### Typography
- Font: Inter
- Headings: Medium to Semibold weight
- Body: Regular weight, line-height 1.6

### Tone
- Calm, not loud
- Competent, not clever
- Human, not hype
- Ethical, not extractive

### Words to Avoid
"Disrupting", "Revolutionary", "Next-gen", "Unprecedented"

### Words to Prefer
"We build", "We operate", "We focus on", "Designed for real use"

## API Endpoints

### POST /api/generate-content
Regenerates content for a specific section.
- **Body**: `{ section: "hero" | "what-we-do" | "how-we-work" | "current-focus" }`
- **Response**: JSON with section-specific content

### POST /api/generate-all
Regenerates all website content at once.
- **Response**: JSON with all sections' content

## Running the Project
The server runs on port 5000. Start with:
```bash
node server.js
```

## Recent Changes
- December 2025: Enhanced visual design with gradients, animations, and polished styling
- December 2024: Initial website build with AI content generation
